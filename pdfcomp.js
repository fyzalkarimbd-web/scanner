let uploadedPdfFile = null;
  let isLibrariesLoaded = false;

  // মোডাল ওপেন ও ক্লোজ করার ফাংশন (ওপেন হওয়ার সাথে সাথেই লাইব্রেরি লোড শুরু হবে)
  async function openPdfCompressModal() {
      document.getElementById('pdfCompressModal').style.display = 'flex';
      await initPdfCompressorLibraries();
  }
  
  function closePdfCompressModal() {
      document.getElementById('pdfCompressModal').style.display = 'none';
      clearPdfCompressTool();
  }

  // লাইব্রেরি ডাইনামিক লোড করার হেল্পার ফাংশন
  function loadPwaScript(url) {
      return new Promise((resolve, reject) => {
          let script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
      });
  }

  // ইঞ্জিন ইনিশিয়ালাইজেশন
  async function initPdfCompressorLibraries() {
      if (isLibrariesLoaded) return;
      const statusEl = document.getElementById('pdfCompressStatus');
      statusEl.innerText = 'Loading engines, please wait...';
      try {
          if (typeof pdfjsLib === 'undefined') {
              await loadPwaScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js');
          }
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
          
          if (typeof window.jspdf === 'undefined') {
              await loadPwaScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
          }
          isLibrariesLoaded = true;
          statusEl.innerText = 'Engines loaded. Ready to compress.';
      } catch (err) {
          statusEl.innerText = 'Engine load failed. Check internet.';
          console.error(err);
      }
  }

  // ফাইল সাইজ ফর্ম্যাটিং হেল্পার
  function formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // স্ট্যাটাস বার ক্লিয়ারেন্স
  function clearStatus() {
      if (uploadedPdfFile) {
          document.getElementById('pdfCompressStatus').innerText = 'Ready to compress';
      }
  }

  // ড্র্যাগ অ্যান্ড ড্রপ লজিক সক্রিয়করণ
  const pdfDropZone = document.getElementById('pdfDropZone');
  const pdfInput = document.getElementById('pdfCompressFileInput');

  if (pdfDropZone && pdfInput) {
      pdfDropZone.addEventListener('dragover', (e) => {
          e.preventDefault();
          pdfDropZone.style.borderColor = '#4f46e5';
          pdfDropZone.style.background = '#f5f3ff';
      });

      pdfDropZone.addEventListener('dragleave', () => {
          pdfDropZone.style.borderColor = '';
          pdfDropZone.style.background = '';
      });

      pdfDropZone.addEventListener('drop', (e) => {
          e.preventDefault();
          pdfDropZone.style.borderColor = '';
          pdfDropZone.style.background = '';
          if (e.dataTransfer.files.length > 0) {
              handlePdfFile(e.dataTransfer.files[0]);
          }
      });

      pdfInput.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
              handlePdfFile(e.target.files[0]);
          }
      });
  }

  // ফাইল সিলেকশন হ্যান্ডেল
  async function handlePdfFile(file) {
      if (file.type !== 'application/pdf') {
          alert('Please upload only a valid PDF (.pdf) file.');
          return;
      }
      uploadedPdfFile = file;
      document.getElementById('pdfCompressFileName').innerText = file.name;
      document.getElementById('pdfCompressStatus').innerText = 'File loaded successfully';

      const metaText = document.getElementById('pdfMetaText');
      metaText.innerHTML = `
        <div style="color: #1e293b; font-weight: 700; margin-bottom: 5px; word-break: break-all;">File Name: ${file.name}</div>
        <div style="color: #4b5563;">Original Size: <strong style="color: #ef4444;">${formatFileSize(file.size)}</strong></div>
        <div id="pdfPageCountText" style="color: #64748b; font-size: 13px; margin-top: 5px;"><i class="fa-solid fa-spinner fa-spin"></i> Reading pages...</div>
      `;

      try {
          await initPdfCompressorLibraries();
          const fileReader = new FileReader();
          fileReader.onload = function() {
              const typedarray = new Uint8Array(this.result);
              pdfjsLib.getDocument({ data: typedarray }).promise.then(function(pdf) {
                  const pageText = document.getElementById('pdfPageCountText');
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
  async function startPdfCompression() {
      if (!uploadedPdfFile) {
          alert('Please upload a PDF file first.');
          return;
      }

      const statusEl = document.getElementById('pdfCompressStatus');
      const compressBtn = document.getElementById('pdfCompressBtn');
      const compLevel = document.getElementById('pdfCompressLevel').value;

      statusEl.innerText = 'Preparing compression engines...';
      compressBtn.disabled = true;

      try {
          await initPdfCompressorLibraries();

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
                  a.download = `compressed_${uploadedPdfFile.name}`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);

                  statusEl.innerHTML = `<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> Success! New Size: ~${formatFileSize(compressedSize)}</span>`;
                  compressBtn.disabled = false;

              } catch (e) {
                  statusEl.innerText = 'Error processing document';
                  compressBtn.disabled = false;
                  console.error(e);
              }
          };
          fileReader.readAsArrayBuffer(uploadedPdfFile);

      } catch (err) {
          statusEl.innerText = 'Failed to load engines';
          compressBtn.disabled = false;
      }
  }

  // রিসেট লজিক
  function clearPdfCompressTool() {
      uploadedPdfFile = null;
      document.getElementById('pdfCompressFileInput').value = '';
      document.getElementById('pdfCompressFileName').innerText = 'Select or Drag PDF File';
      document.getElementById('pdfMetaText').innerText = 'No PDF selected yet.';
      document.getElementById('pdfCompressStatus').innerText = 'Ready to compress';
      document.getElementById('pdfCompressBtn').disabled = false;
  }
