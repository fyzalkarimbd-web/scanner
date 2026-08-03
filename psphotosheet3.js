// ১০ জন ইউজারের ছবির সোর্স স্টোর করার জন্য গ্লোবাল অ্যারে (সংশোধিত)
  let psImages = [null, null, null, null, null, null, null, null, null, null];

function openPhotoSheetModal() {
    if(typeof setActiveMode === 'function') setActiveMode('mode-photo-sheet');
    document.getElementById('photoSheetModal').style.display = 'flex';
}


  function closePhotoSheetModal() {
      document.getElementById('photoSheetModal').style.display = 'none';
  }

  // আপলোড করা ছবি ব্যাকএন্ড অ্যারেতে লোড করা
  function loadPsImage(event, index) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              psImages[index] = e.target.result;
              
              // কাস্টম ইমেজ থাম্বনেইল আপডেট
              document.getElementById(`prev${index+1}`).src = e.target.result;
              document.getElementById(`prev${index+1}`).style.display = 'block';
              document.getElementById(`plus${index+1}`).style.display = 'none';
              
              // ১-ক্লিক ডিলিট বাটনটি ভিজিবল করবে
              const delBtn = document.getElementById(`delBtn${index+1}`);
              if (delBtn) delBtn.style.display = 'flex';
              
              // প্রথম ছবি আপলোডের পর ডিফল্ট ১ কপি সেট হবে
              const countInput = document.getElementById(`count${index+1}`);
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
      document.getElementById(`psInput${index+1}`).value = '';
      document.getElementById(`prev${index+1}`).src = '';
      document.getElementById(`prev${index+1}`).style.display = 'none';
      document.getElementById(`plus${index+1}`).style.display = 'block';
      document.getElementById(`count${index+1}`).value = 0;
      
      // ছবি ডিলিট হয়ে যাওয়ার পর বাটনটি পুনরায় হাইড করে দেবে
      const delBtn = document.getElementById(`delBtn${index+1}`);
      if (delBtn) delBtn.style.display = 'none';
      
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
      
      // লিমিট চেক
      countInput.value = target;
      
      // প্রিভিউ জেনারেট করবে
      const isOk = updatePsPreview();
      
      // যদি পেপারের বাউন্ডারি ক্রস করে, তবে আগের ভ্যালু ফিরিয়ে আনবে
      if (!isOk) {
          countInput.value = current;
          updatePsPreview();
      }
  }

  // লাইভ এ৪ প্রিভিউ জেনারেটর (১০০% পারফেক্ট বর্ডার ও স্ট্রেচিং অপ্টিমাইজেশন সহ)
  function updatePsPreview() {
      const previewArea = document.getElementById('a4-preview-area');
      const limitWarning = document.getElementById('limitWarning');
      const footerNote = document.getElementById('footerNote');
      
      if (!previewArea) return true;
      
      previewArea.innerHTML = ''; // ক্লিয়ার করবে
      limitWarning.style.display = 'none';
      footerNote.style.display = 'none';

      let hasAnyPhoto = false;
      const showBorder = document.getElementById('psBorder').checked;
      
      // বর্ডার চেকবক্সটি যাতে ১০০% কাজ করে এবং ফিজিক্যালি ১ পিক্সেল হয় (সংশোধিত বাগ-ফিক্স)
      const borderStyle = showBorder ? '1px solid #000000' : 'none';

      // ১০টি রোর প্রতিটি ইমেজ প্রসেস করবে (সংশোধিত)
      for (let i = 0; i < 10; i++) {
          if (psImages[i]) {
              hasAnyPhoto = true;
              const count = parseInt(document.getElementById(`count${i+1}`).value) || 0;
              const size = document.getElementById(`size${i+1}`).value;
              
              // ওমানি/বাংলাদেশি স্ট্যান্ডার্ড মিলিমিটার ডাইমেনশনকে ডাইনামিক পার্সেন্টেজে রূপান্তর
              let widthPercent = "18.5%"; // পাসপোর্ট (৫ কপি এক লাইনে ধরবে)
              let aspectRatio = "40 / 50";
              
              if (size === 'stamp') {
                  widthPercent = "9.25%"; // স্ট্যাম্প (১০ কপি এক লাইনে ধরবে)
                  aspectRatio = "20 / 25";
              } else if (size === 'joint') {
                  widthPercent = "27.75%"; // জয়েন্ট (৩ কপি এক লাইনে ধরবে)
                  aspectRatio = "60 / 50";
              }

              for (let j = 0; j < count; j++) {
                  const item = document.createElement('div');
                  item.className = 'grid-photo-item';
                  item.style.width = widthPercent;
                  item.style.aspectRatio = aspectRatio;
                  item.style.border = borderStyle; // বর্ডার সেটিংস সরাসরি রান করবে
                  item.style.borderRadius = "0px"; // কোণা গোল হওয়া সম্পূর্ণ বন্ধ
                  item.innerHTML = `<img src="${psImages[i]}" style="width:100%; height:100%; object-fit:cover;" />`;
                  previewArea.appendChild(item);

                  // ওভারফ্লো বা পেপার লিমিট চেকার
                  const containerHeight = previewArea.clientHeight;
                  const totalScrollHeight = previewArea.scrollHeight;

                  if (totalScrollHeight > containerHeight + 5) {
                      previewArea.removeChild(item);
                      limitWarning.style.display = 'inline';
                      footerNote.style.display = 'block';
                      return false; // লিমিট শেষ হলে আর আইটেম এড হতে দেবে না
                  }
              }
          }
      }

      if (!hasAnyPhoto) {
          previewArea.innerHTML = `<div style="padding: 100px 0; color: #94a3b8; width:100%; text-align:center; font-weight:700;">Upload photos to see the A4 sheet preview</div>`;
      }
      return true;
  }

  // A4 ভেক্টর পিডিএফ জেনারেশন
  function generatePhotoSheetPDF() {
      const activeCount = psImages.filter(img => img !== null).length;
      if (activeCount === 0) {
          alert("Please upload at least one photo to save PDF!");
          return;
      }
      
      const statusEl = document.getElementById('payslipGeneratorStatus') || document.createElement('div');
      statusEl.innerText = "Generating high-definition PDF sheet...";
      
      const template = document.getElementById('a4-preview-area');
      
      // html2canvas দিয়ে ৩ গুণ ডেনসিটিতে ক্রিস্প স্ন্যাপশট নেবে
      html2canvas(template, {
          scale: 3,
          useCORS: true,
          logging: false
      }).then(canvas => {
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          const { jsPDF } = window.jspdf;
          
          // স্ট্যান্ডার্ড এ৪ সাইজ পিডিএফ
          const pdf = new jsPDF('p', 'mm', 'a4');
          pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
          pdf.save(`photo_print_sheet_${Date.now()}.pdf`);
          statusEl.innerText = "Ready to generate";
      });
  }

  // ফিজিক্যাল মিলিমিটার লকড ডিরেক্ট প্রিন্ট (১০০% নিখুঁত স্টুডিও সাইজ প্রিন্ট আউটপুট - প্রিন্ট কপিতেও স্ট্রেচিং বন্ধ করা হয়েছে)
  function directPrintSheet() {
      const activeCount = psImages.filter(img => img !== null).length;
      if (activeCount === 0) {
          alert("Please upload at least one photo to print!");
          return;
      }

      const showBorder = document.getElementById('psBorder').checked;
      const borderCss = showBorder ? 'border: 1px solid #000000 !important; border-radius: 0px !important;' : 'border: none !important;';
      let itemsHTML = '';

      // প্রিন্টিং পেজে মিলিমিটার মাপে ইমেজ ট্যাগ সাজাবে (সংশোধিত ১০ জন ইউজার)
      for (let i = 0; i < 10; i++) {
          if (psImages[i]) {
              const count = parseInt(document.getElementById(`count${i+1}`).value) || 0;
              const size = document.getElementById(`size${i+1}`).value;
              
              let widthMm = 40;
              let heightMm = 50; // পাসপোর্ট সাইজ
              
              if (size === 'stamp') {
                  widthMm = 20; heightMm = 25;
              } else if (size === 'joint') {
                  widthMm = 60; heightMm = 50;
              }

              for (let j = 0; j < count; j++) {
                  // align-self: flex-start !important; যুক্ত করা হয়েছে প্রিন্টিং কপিতেও স্ট্রেচিং বন্ধ করতে
                  itemsHTML += `
                      <div class="print-photo-item" style="width: ${widthMm}mm; height: ${heightMm}mm; ${borderCss} box-sizing: border-box; overflow: hidden; display: inline-block; margin: 1.5mm; align-self: flex-start !important;">
                          <img src="${psImages[i]}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
                      </div>
                  `;
              }
          }
      }

      // নতুন প্রিন্ট ফ্রেন্ডলি উইন্ডো জেনারেট করবে
      const printWin = window.open('', '_blank');
      // align-items: flex-start !important; যুক্ত করা হয়েছে প্রিন্টিং এ৪ ফ্রেমেও স্ট্রেচিং বন্ধ করতে
      printWin.document.write(`
          <html>
              <head>
                  <title>Photo_Print_Sheet_${Date.now()}</title>
                  <style>
                      @page { size: A4; margin: 0; }
                      body { margin: 0; padding: 8mm 10mm; background: #fff; box-sizing: border-box; }
                      #print-container {
                          width: 190mm; /* A4 width 210mm - 20mm margin */
                          display: flex;
                          flex-wrap: wrap;
                          gap: 1mm;
                          align-content: flex-start;
                          align-items: flex-start !important;
                      }
                      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                  </style>
              </head>
              <body>
                  <div id="print-container">${itemsHTML}</div>
              </body>
          </html>
      `);
      printWin.document.close();
      
      // রেন্ডারিং ও প্রিলোডের জন্য সামান্য সময় নিয়ে প্রিন্ট উইন্ডো ফোকাস করবে
      setTimeout(() => {
          printWin.print();
          printWin.close();
      }, 800);
  }
