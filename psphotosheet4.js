
  // ১০ জন ইউজারের ছবির সোর্স স্টোর করার জন্য গ্লোবাল অ্যারে
  let psImages = [null, null, null, null, null, null, null, null, null, null];

  // ▼▼▼ নতুন আপডেট: ১০টি ছবির ওরিয়েন্টেশন (লম্বা নাকি আড়াআড়ি) ট্র্যাক করার জন্য অ্যারে ▼▼▼
  // true = ডিফল্ট (লম্বালম্বি/Portrait), false = ঘোরানো (আড়াআড়ি/Landscape)
  let psIsPortrait = [true, true, true, true, true, true, true, true, true, true];
  // ▲▲▲ নতুন আপডেটের শেষ ▲▲▲

  // ফিজিক্যাল রিয়েল সাইজ মিলিমিটারে
  const PP_W = 38.1;  // ১.৫ ইঞ্চি (পাসপোর্ট সাইজ প্রস্থ)
  const PP_H = 48.26; // ১.৯ ইঞ্চি (পাসপোর্ট সাইজ উচ্চতা)
  const ST_W = 22.0;   // ২২ মিমি (স্ট্যাম্প সাইজ প্রস্থ)
  const ST_H = 27.0;   // ২৭ মিমি (স্ট্যাম্প সাইজ উচ্চতা)
  const JP_W = 48.26; // ১.৯ ইঞ্চি (যুগ্ম বা জয়েন্ট ফটো প্রস্থ)
  const JP_H = 38.1;  // ১.৫ ইঞ্চি (যুগ্ম বা জয়েন্ট ফটো উচ্চতা)

  function openPhotoSheetModal() {
      document.getElementById('photoSheetModal').style.display = 'flex';
      if(typeof setActiveMode === 'function') setActiveMode('mode-photo-sheet');
      updatePsPreview();
  }

  function closePhotoSheetModal() {
      document.getElementById('photoSheetModal').style.display = 'none';
      resetPhotoSheet();
  }

  function resetPhotoSheet() {
      for(let i=0; i<10; i++) removePsImage(i);
  }

  // আপলোড করা ছবি ব্যাকএন্ড অ্যারেতে লোড করা
  function loadPsImage(event, index) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              psImages[index] = e.target.result;
              // নতুন ছবি আপলোড হলে ওরিয়েন্টেশন রিসেট হবে
              psIsPortrait[index] = true; 

              const idx = index + 1;
              const prevImg = document.getElementById(`prev${idx}`);
              prevImg.src = e.target.result;
              prevImg.style.display = 'block';
              document.getElementById(`plus${idx}`).style.display = 'none';
              
              const delBtn = document.getElementById(`delBtn${idx}`);
              if (delBtn) delBtn.style.setProperty('display', 'flex', 'important');
              
              const countInput = document.getElementById(`count${idx}`);
              if (parseInt(countInput.value) === 0) {
                  countInput.value = 1;
              }
              
              updatePsPreview();
          };
          reader.readAsDataURL(file);
      }
  }

  // ছবি মুছে ফেলার লজিক
  function removePsImage(index) {
      psImages[index] = null;
      // ▼▼▼ আপডেট: ছবি মুছলে ওরিয়েন্টেশন রিসেট হবে ▼▼▼
      psIsPortrait[index] = true;
      // ▲▲▲ আপডেট শেষ ▲▲▲

      const idx = index + 1;
      document.getElementById(`psInput${idx}`).value = '';
      const prevImg = document.getElementById(`prev${idx}`);
      prevImg.src = '';
      prevImg.removeAttribute('src');
      prevImg.style.display = 'none';
      document.getElementById(`plus${idx}`).style.display = 'block';
      document.getElementById(`count${idx}`).value = 0;
      document.getElementById(`delBtn${idx}`).style.setProperty('display', 'none', 'important');
      updatePsPreview();
  }

  // কাস্টম প্লাস-মাইনাস কাউন্টার টিউনিং
  function adjustPhotoCount(index, val) {
      if (!psImages[index]) {
          alert("Please upload a photo for this row first!");
          return;
      }
      const countInput = document.getElementById(`count${index+1}`);
      let current = parseInt(countInput.value) || 0;
      let target = current + val;
      
      if (target < 0) target = 0;
      
      countInput.value = target;
      
      const isOk = updatePsPreview();
      
      if (isOk === false) {
          countInput.value = current;
          updatePsPreview();
      }
  }


// --- নতুন আপডেট: শক্তিশালী ছবি রোটেট করার ফাংশন ---
function rotatePsImage(index) {
    const previewImgElement = document.getElementById(`prev${index + 1}`);
    
    // ভ্যালিডেশন চেক
    if (!previewImgElement || previewImgElement.style.display === 'none' || !previewImgElement.src || !previewImgElement.src.startsWith('data:image/')) {
        alert("Please upload a photo for this row first to rotate!");
        return;
    }

    // ▼▼▼ নতুন আপডেট: ওরিয়েন্টেশন স্টেট টগল (Toggle) করা ▼▼▼
    // একবার ক্লিক করলে লম্বালম্বি থেকে আড়াআড়ি হবে, আবার ক্লিক করলে আগের অবস্থায় ফিরবে
    psIsPortrait[index] = !psIsPortrait[index];
    // ▲▲▲ নতুন আপডেটের শেষ ▲▲▲

    const currentSrc = previewImgElement.src;
    const img = new Image();
    
    img.onload = function() {
        // থাম্বনেইল প্রিভিউয়ের জন্য ফিজিক্যাল রোটেশন (Canvas দিয়ে)
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.height;
        canvas.height = img.width;

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        const rotatedDataURL = canvas.toDataURL('image/jpeg', 1.0);

        if (typeof psImages !== 'undefined' && Array.isArray(psImages)) {
            psImages[index] = rotatedDataURL;
        }

        previewImgElement.src = rotatedDataURL;
        
        // মেইন A4 প্রিভিউ আপডেট
        if (typeof updatePsPreview === 'function') {
            updatePsPreview();
        }
    };
    
    img.onerror = function() {
         alert("Error loading image for rotation. Please try re-uploading.");
    };

    img.src = currentSrc;
}
// --- নতুন আপডেটের শেষ ---

  // ▼▼▼ গুরুত্বপূর্ণ আপডেট: ডাইনামিক কো-অর্ডিনেট ক্যালকুলেশন ফাংশনে পরিবর্তন ▼▼▼
  function getDynamicCoords() {
      const margin = 0.53; 
      let currentY = margin;
      const hGap = 2.5;    
      const vGap = 3.5;    
      
      let coords = [];
      let limitReached = false;
      let currentX = margin;
      let rowMaxH = 0;

      for (let i = 0; i < 10; i++) {
          const img = psImages[i];
          const count = parseInt(document.getElementById(`count${i+1}`).value) || 0;
          const size = document.getElementById(`size${i+1}`).value;
          
          if (img && count > 0) {
              // ডিফল্ট সাইজ ম্যাপিং (লম্বালম্বি অবস্থা)
              let w = PP_W; let h = PP_H; // Passport
              
              if (size === 'stamp') {
                  w = ST_W; h = ST_H;
              } else if (size === 'joint') {
                  w = JP_W; h = JP_H;
              }

              // ▼▼▼ এখানে আসল পরিবর্তন: যদি ছবিটি রোটেট করা হয়ে থাকে (psIsPortrait false হয়),
              // তবে এর প্রস্থ (w) এবং উচ্চতা (h) অদল-বদল করে দেওয়া হবে। ▼▼▼
              if (psIsPortrait[i] === false) {
                  const tempW = w;
                  w = h;
                  h = tempW;
                  // এখন w হবে বড়, h হবে ছোট -> অর্থাৎ ছবিটি আড়াআড়ি হয়ে যাবে।
              }
              // ▲▲▲ পরিবর্তন শেষ ▲▲▲

              for (let j = 0; j < count; j++) {
                  // পেপার লিমিট চেক
                  if (currentX + w > 210 - margin) {
                      currentY += (rowMaxH + vGap); 
                      currentX = margin;
                      rowMaxH = 0;
                  }

                  if (currentY + h > 297 - margin) {
                      limitReached = true;
                      break;
                  }

                  coords.push({ w: w, h: h, x: currentX, y: currentY, img: img });
                  rowMaxH = Math.max(rowMaxH, h);
                  currentX += (w + hGap);
              }
              if (limitReached) break;
          }
      }
      return { coords, limitReached };
  }
  // ▲▲▲ গুরুত্বপূর্ণ আপডেটের শেষ ▲▲▲

  // লাইভ এ৪ প্রিভিউ জেনারেটর
  function updatePsPreview() {
      const previewArea = document.getElementById('a4-preview-area');
      const result = getDynamicCoords();
      const coords = result.coords;
      
      document.getElementById('limitWarning').style.display = result.limitReached ? 'block' : 'none';
      document.getElementById('footerNote').style.display = result.limitReached ? 'block' : 'none';

      previewArea.innerHTML = ''; 
      
      if(coords.length === 0) {
          previewArea.innerHTML = '<p style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #94a3b8; font-size: 12px; font-weight: 700;">No Image Selected</p>';
          return true; 
      }

      const scale = previewArea.clientWidth / 210; 
      const showBorder = document.getElementById('psBorder').checked;
      const borderStyle = showBorder ? '0.5px solid #000000' : 'none';

      coords.forEach(p => {
          const div = document.createElement('div');
          div.style.position = 'absolute';
          div.style.width = (p.w * scale) + 'px';
          div.style.height = (p.h * scale) + 'px';
          div.style.left = (p.x * scale) + 'px';
          div.style.top = (p.y * scale) + 'px';
          div.style.backgroundImage = "url(" + p.img + ")";
          div.style.backgroundSize = 'cover';
          div.style.backgroundPosition = 'center';
          div.style.setProperty('border', borderStyle, 'important'); 
          div.style.setProperty('border-radius', '0px', 'important'); 
          previewArea.appendChild(div);
      });

      return !result.limitReached; 
  }

  // A4 ভেক্টর পিডিএফ জেনারেশন
  async function generatePhotoSheetPDF() {
      const { jsPDF } = window.jspdf;
      const { coords } = getDynamicCoords();
      if(coords.length === 0) {
          alert("Please upload at least one photo to save PDF!");
          return;
      }
      
      const statusEl = document.getElementById('payslipGeneratorStatus') || document.createElement('div');
      statusEl.innerText = "Generating 100% original high-definition PDF...";
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const showBorder = document.getElementById('psBorder').checked;

      coords.forEach(p => {
          let imgFormat = 'JPEG';
          if (p.img.startsWith('data:image/png')) {
              imgFormat = 'PNG';
          }

          // এখানেও p.w এবং p.h আপডেটেড ভ্যালু পাবে, তাই পিডিএফ-এও ছবি আড়াআড়ি হবে
          pdf.addImage(p.img, imgFormat, p.x, p.y, p.w, p.h, undefined, 'FAST');
          
          if(showBorder) {
              pdf.setDrawColor(0, 0, 0); 
              pdf.setLineWidth(0.05);    
              pdf.rect(p.x, p.y, p.w, p.h);
          }
      });

      pdf.save(`PhotoSheet_Genuine_${Date.now()}.pdf`);
      statusEl.innerText = "Ready to generate";
  }

  // ফিজিক্যাল মিলিমিটার লকড ডিরেক্ট প্রিন্ট
  function directPrintSheet() {
      const { coords } = getDynamicCoords();
      if(coords.length === 0) return;
      
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head><style>@page { margin: 0; size: A4; } body { margin: 0; padding: 0; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }</style></head><body>');
      
      const showBorder = document.getElementById('psBorder').checked;
      const borderCss = showBorder ? 'border: 0.1mm solid #ccc; border-radius: 0px !important;' : 'border: none !important;';

      coords.forEach(p => {
          // এখানেও ডাইরেক্ট প্রিন্টে ছবি আড়াআড়িভাবে আসবে
          printWindow.document.write(`<div style="position: absolute; left: ${p.x}mm; top: ${p.y}mm; width: ${p.w}mm; height: ${p.h}mm; ${borderCss}"><img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>`);
      });
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      
      setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  }
