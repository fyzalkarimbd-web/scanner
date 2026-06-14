let uploadedPcoFile = null;
  let isPcoLibrariesLoaded = false;

  // মোডাল ওপেন ও ক্লোজ করার ফাংশন
  async function openPcoCompressModal() {
      document.getElementById('pcoCompressModal').style.display = 'flex';
      await initPcoLibraries();
  }
  
  function closePcoCompressModal() {
      document.getElementById('pcoCompressModal').style.display = 'none';
      clearPcoCompressTool();
  }

  // লাইব্রেরি ডাইনামিক লোড করার হেল্পার ফাংশন
  function loadPcoScript(url) {
      return new Promise((resolve, reject) => {
          let script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
      });
  }

  // ইঞ্জিন ইনিশিয়ালাইজেশন
  async function initPcoLibraries() {
      if (isPcoLibrariesLoaded) return;
      const statusEl = document.getElementById('pcoCompressStatus');
      statusEl.innerText = 'Loading engines, please wait...';
      try {
          if (typeof pdfjsLib === 'undefined') {
              await loadPcoScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js');
          }
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
          
          if (typeof window.jspdf === 'undefined') {
              await loadPcoScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
          }
          isPcoLibrariesLoaded = true;
          statusEl.innerText = 'Engines loaded. Ready to compress.';
      } catch (err) {
          statusEl.innerText = 'Engine load failed. Check internet.';
          console.error(err);
      }
  }

  // ফাইল সাইজ ফর্ম্যাটিং হেল্পার
  function formatPcoFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // স্ট্যাটাস বার ক্লিয়ারেন্স
  function clearPcoStatus() {
      if (uploadedPcoFile) {
          document.getElementById('pcoCompressStatus').innerText = 'Ready to compress';
      }
  }

  // ড্র্যাগ অ্যান্ড ড্রপ লজিক সক্রিয়করণ
  const pcoDropZone = document.getElementById('pcoDropZone');
  const pcoInput = document.getElementById('pcoCompressFileInput');

  if (pcoDropZone && pcoInput) {
      pcoDropZone.addEventListener('dragover', (e) => {
          e.preventDefault();
          pcoDropZone.style.borderColor = '#4f46e5';
          pcoDropZone.style.background = '#f5f3ff';
      });

      pcoDropZone.addEventListener('dragleave', () => {
          pcoDropZone.style.borderColor = '';
          pcoDropZone.style.background = '';
      });

      pcoDropZone.addEventListener('drop', (e) => {
          e.preventDefault();
          pcoDropZone.style.borderColor = '';
          pcoDropZone.style.background = '';
          if (e.dataTransfer.files.length > 0) {
              handlePcoFile(e.dataTransfer.files[0]);
          }
      });

      pcoInput.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
              handlePcoFile(e.target.files[0]);
          }
      });
  }

  // ফাইল সিলেকশন হ্যান্ডেল
  async function handlePcoFile(file) {
      if (file.type !== 'application/pdf') {
          alert('Please upload only a valid PDF (.pdf) file.');
          return;
      }
      uploadedPcoFile = file;
      document.getElementById('pcoCompressFileName').innerText = file.name;
      document.getElementById('pcoCompressStatus').innerText = 'File loaded successfully';

      const metaText = document.getElementById('pcoMetaText');
      metaText.innerHTML = `
        <div style="color: #1e293b; font-weight: 700; margin-bottom: 5px; word-break: break-all;">File Name: ${file.name}</div>
        <div style="color: #4b5563;">Original Size: <strong style="color: #ef4444;">${formatPcoFileSize(file.size)}</strong></div>
        <div id="pcoPageCountText" style="color: #64748b; font-size: 13px; margin-top: 5px;"><i class="fa-solid fa-spinner fa-spin"></i> Reading pages...</div>
      `;

      try {
          await initPcoLibraries();
          const fileReader = new FileReader();
          fileReader.onload = function() {
              const typedarray = new Uint8Array(this.result);
              pdfjsLib.getDocument({ data: typedarray }).promise.then(function(pdf) {
                  const pageText = document.getElementById('pcoPageCountText');
                  if (pageText) {
                      pageText.innerHTML = `<i class="fa-solid fa-file-lines"></i> Total Pages: <strong>${pdf.numPages}</strong>`;
                  }
              });
          };
          fileReader.readAsArrayBuffer(file);
      } catch (err) {
          console.log('Error reading PDF pages');
      }
  }

  // কম্প্রেশন শুরু করার মেইন লজিক
  async function startPcoCompression() {
      if (!uploadedPcoFile) {
          alert('Please upload a PDF file first.');
          return;
      }

      const statusEl = document.getElementById('pcoCompressStatus');
      const compressBtn = document.getElementById('pcoCompressBtn');
      const compLevel = document.getElementById('pcoCompressLevel').value;

      statusEl.innerText = 'Preparing compression engines...';
      compressBtn.disabled = true;

      try {
          await initPcoLibraries();

          const fileReader = new FileReader();
          fileReader.onload = async function() {
              const typedarray = new Uint8Array(this.result);
              
              try {
                  const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
                  const totalPages = pdf.numPages;
                  const { jsPDF } = window.jspdf;
                  let doc = null;
                  
                  // ৬টি ডাইনামিক কম্প্রেশন কোয়ালিটি ও স্কেল ম্যাপিং
                  let currentScale = 1.0;
                  let currentQuality = 0.5;

                  if (compLevel === 'ultra') {
                      currentScale = 2.0;
                      currentQuality = 1.0;
                  } else if (compLevel === 'high') {
                      currentScale = 1.5;
                      currentQuality = 0.85;
                  } else if (compLevel === 'medium_high') {
                      currentScale = 1.2;
                      currentQuality = 0.7;
                  } else if (compLevel === 'medium') {
                      currentScale = 1.0;
                      currentQuality = 0.5;
                  } else if (compLevel === 'medium_low') {
                      currentScale = 0.85;
                      currentQuality = 0.4;
                  } else if (compLevel === 'extreme') {
                      currentScale = 0.65;
                      currentQuality = 0.25;
                  }

                  // প্রতিটি পেজ প্রসেস করবে
                  for (let i = 1; i <= totalPages; i++) {
                      statusEl.innerText = `Compressing Page ${i} of ${totalPages}...`;
                      
                      const page = await pdf.getPage(i);
                      const viewport = page.getViewport({ scale: currentScale });
                      
                      // অফ-স্ক্রিন ক্যানভাস তৈরি
                      const canvas = document.createElement('canvas');
                      const context = canvas.getContext('2d');
                      canvas.height = viewport.height;
                      canvas.width = viewport.width;

                      const renderContext = {
                          canvasContext: context,
                          viewport: viewport
                      };

                      await page.render(renderContext).promise;

                      // জেপিজি কম্প্রেশন রেন্ডার
                      const imgData = canvas.toDataURL('image/jpeg', currentQuality);

                      // নতুন পিডিএফে পেজ যুক্ত করা (px ইউনিট ডাইমেনশন ফিক্স)
                      if (i === 1) {
                          doc = new jsPDF({
                              orientation: viewport.width > viewport.height ? 'l' : 'p',
                              unit: 'px',
                              format: [viewport.width, viewport.height]
                          });
                      } else {
                          doc.addPage([viewport.width, viewport.height], viewport.width > viewport.height ? 'l' : 'p');
                      }
                      
                      doc.addImage(imgData, 'JPEG', 0, 0, viewport.width, viewport.height);
                  }

                  statusEl.innerText = 'Saving compressed file...';
                  
                  // আউটপুট ফাইল জেনারেট করবে
                  const compressedPdfBlob = doc.output('blob');
                  const compressedSize = compressedPdfBlob.size;

                  // ডাউনলোড ট্রিগার
                  const downloadUrl = URL.createObjectURL(compressedPdfBlob);
                  const a = document.createElement('a');
                  a.href = downloadUrl;
                  a.download = `compressed_${uploadedPcoFile.name}`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);

                  statusEl.innerHTML = `<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> Success! New Size: ~${formatPcoFileSize(compressedSize)}</span>`;
                  compressBtn.disabled = false;

              } catch (e) {
                  statusEl.innerText = 'Error processing document';
                  compressBtn.disabled = false;
                  console.error(e);
              }
          };
          fileReader.readAsArrayBuffer(uploadedPcoFile);

      } catch (err) {
          statusEl.innerText = 'Failed to load engines';
          compressBtn.disabled = false;
      }
  }

  // রিসেট লজিক
  function clearPcoCompressTool() {
      uploadedPcoFile = null;
      document.getElementById('pcoCompressFileInput').value = '';
      document.getElementById('pcoCompressFileName').innerText = 'Select or Drag PDF File';
      document.getElementById('pcoMetaText').innerText = 'No PDF selected yet.';
      document.getElementById('pcoCompressStatus').innerText = 'Ready to compress';
      document.getElementById('pcoCompressBtn').disabled = false;
  }
