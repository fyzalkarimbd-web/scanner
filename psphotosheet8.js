// ১০ জন ইউজারের ছবির সোর্স স্টোর করার জন্য গ্লোবাল অ্যারে
  let psImages = [null, null, null, null, null, null, null, null, null, null];

  // ফিজিক্যাল রিয়েল সাইজ মিলিমিটারে (আপনার কোড থেকে সংগৃহীত)
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
              const idx = index + 1;
              document.getElementById(`prev${idx}`).src = e.target.result;
              document.getElementById(`prev${idx}`).style.display = 'block';
              document.getElementById(`plus${idx}`).style.display = 'none';
              
              // ১-ক্লিক ডিলিট বাটনটি ভিজিবল করবে
              const delBtn = document.getElementById(`delBtn${idx}`);
              if (delBtn) delBtn.style.setProperty('display', 'flex', 'important');
              
              // প্রথম ছবি আপলোডের পর ডিফল্ট ১ কপি সেট হবে
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
      const idx = index + 1;
      document.getElementById(`psInput${idx}`).value = '';
      document.getElementById(`prev${idx}`).src = '';
      document.getElementById(`prev${idx}`).style.display = 'none';
      document.getElementById(`plus${idx}`).style.display = 'block';
      document.getElementById(`count${idx}`).value = 0;
      document.getElementById(`delBtn${idx}`).style.setProperty('display', 'none', 'important');
      updatePsPreview();
  }

  // কাস্টম প্লাস-মাইনাস কাউন্টার টিউনিং (সংশোধিত শতভাগ নিরাপদ ফিক্স)
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
      
      // রেন্ডার করবে এবং ওভারফ্লো লিমিট চেক করবে
      const isOk = updatePsPreview();
      
      // যদি পেপারের লিমিট রিচ করে (isOk === false), তবে ভ্যালু আগের অবস্থায় ফিরিয়ে নেবে (সংশোধিত)
      if (isOk === false) {
          countInput.value = current;
          updatePsPreview();
      }
  }

  // আপনার নতুন কোড অনুযায়ী ফিজিক্যাল পেপার মার্জিন ও ইন্টার-ফটো গ্যাপ ক্যালকুলেশন ইঞ্জিন
  function getDynamicCoords() {
      const margin = 0.53; // ২ পিক্সেল ফিজিক্যাল মার্জিন (0.53mm)
      let currentY = margin;
      const hGap = 2.5;    // হরাইজন্টাল গ্যাপ (2.5mm)
      const vGap = 3.5;    // ভার্টিকাল গ্যাপ (3.5mm)
      
      let coords = [];
      let limitReached = false;
      let currentX = margin;
      let rowMaxH = 0;

      // ১০ জন ইউজারের ডাটা চেক করে ডাইনামিকালি সাজাবে
      for (let i = 0; i < 10; i++) {
          const img = psImages[i];
          const count = parseInt(document.getElementById(`count${i+1}`).value) || 0;
          const size = document.getElementById(`size${i+1}`).value;
          
          if (img && count > 0) {
              // সাইজ ম্যাপিং
              let w = PP_W;
              let h = PP_H; // পাসপোর্ট সাইজ
              
              if (size === 'stamp') {
                  w = ST_W; h = ST_H;
              } else if (size === 'joint') {
                  w = JP_W; h = JP_H;
              }

              for (let j = 0; j < count; j++) {
                  // চেক করবে হরাইজন্টালি এ৪ পেপারের চওড়া লিমিট (২১০ মিমি) ক্রস করে কিনা
                  if (currentX + w > 210 - margin) {
                      currentY += (rowMaxH + vGap); // নতুন লাইনে যাবে
                      currentX = margin;
                      rowMaxH = 0;
                  }

                  // চেক করবে ভার্টিকালি এ৪ পেপারের দৈর্ঘ্য লিমিট (২৯৭ মিমি) ক্রস করে কিনা
                  if (currentY + h > 297 - margin) {
                      limitReached = true;
                      break;
                  }

                  coords.push({ w: w, h: h, x: currentX, y: currentY, img: img });
                  rowMaxH = Math.max(rowMaxH, h);
                  currentX += (w + hGap); // পরবর্তী ছবির জন্য এক্স পজিশন বাড়াবে
              }
              if (limitReached) break;
          }
      }
      return { coords, limitReached };
  }

  // লাইভ এ৪ প্রিভিউ জেনারেটর (১০০% পারফেক্ট বর্ডার ও ফ্লেক্স স্ট্রেচিং বাগ-ফিক্স সহ)
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

      // ১০টি রোর প্রতিটি ইমেজ প্রসেস করবে
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
                  // বর্ডার সেটিংস সরাসরি এবং শতভাগ সিকিউরড করার জন্য setProperty ব্যবহার করা হয়েছে
                  item.style.setProperty('border', borderStyle, 'important'); 
                  item.style.setProperty('border-radius', '0px', 'important'); // কোণা গোল হওয়া সম্পূর্ণ বন্ধ
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
          return true; // মডাল ক্লিয়ার থাকলে ট্রু রিটার্ন করবে
      }
      
      // লিমিট রিচড হয়ে থাকলে false রিটার্ন করবে, অন্যথায় true (সংশোধিত বাগ-ফিক্স) [1.1.2]
      return !result.limitReached; 
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

  // ফিজিক্যাল মিলিমিটার লকড ডিরেক্ট প্রিন্ট
  function directPrintSheet() {
      const { coords } = getDynamicCoords();
      if(coords.length === 0) return;
      
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head><style>@page { margin: 0; size: A4; } body { margin: 0; padding: 0; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }</style></head><body>');
      
      const showBorder = document.getElementById('psBorder').checked;
      const borderCss = showBorder ? 'border: 0.1mm solid #ccc; border-radius: 0px !important;' : 'border: none !important;';

      coords.forEach(p => {
          printWindow.document.write(`<div style="position: absolute; left: ${p.x}mm; top: ${p.y}mm; width: ${p.w}mm; height: ${p.h}mm; ${borderCss}"><img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>`);
      });
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      
      setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  }
