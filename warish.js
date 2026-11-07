let isWarishLibLoaded = false;
  let warishMemberCounter = 0;

  // ১. মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক
  function openWarishModal() {
      setActiveMode('mode-warish-maker');
      const modal = document.getElementById('warishModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক [1.1.2]
          setupDefaultWarishDates();
          
          // অন্তত ৬টি ডিফল্ট রো তৈরি করবে (ছবি কপির সাথে মেলাতে)
          const list = document.getElementById('warishInputRowsList');
          if (list && list.children.length === 0) {
              for (let i = 0; i < 6; i++) {
                  addWarishInputRow();
              }
          }
          updateWarishPreview();
      }
  }

  function closeWarishModal() {
      const modal = document.getElementById('warishModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
          clearWarishForm();
      }
  }

  // ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
  function convertToBanglaNumber(n) {
      const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
      return n.toString().replace(/[0-9]/g, function(w) {
          return banglaDigits[w] || w;
      });
  }

  // অবজেক্ট ডেটকে বাংলা ফরম্যাটে রূপান্তর করার ফাংশন
  function formatDateToBangla(rawDateStr) {
      if (!rawDateStr || rawDateStr === '-') return '';
      try {
          const dateObj = new Date(rawDateStr);
          if (isNaN(dateObj.getTime())) return '';
          
          const day = dateObj.getDate();
          const parts = dateObj.toISOString().split('T')[0].split('-');
          const monthNames = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
          const month = monthNames[parseInt(parts[1], 10) - 1];
          const year = parts[0];
          
          return convertToBanglaNumber(day) + " " + month + " " + convertToBanglaNumber(year);
      } catch (e) {
          return '';
      }
  }

  // ২. ডাইনামিক ওয়ারিশ সদস্য রো (Row) যুক্ত করার লজিক
  function addWarishInputRow() {
      const list = document.getElementById('warishInputRowsList');
      if (!list) return;
      
      warishMemberCounter++;
      const rowId = 'wmember-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      const slBangla = convertToBanglaNumber(list.children.length + 1);

      const card = document.createElement('div');
      card.className = 'warish-row-card';
      card.id = rowId;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 12.5px; font-weight: bold; color: #0d9488;">ওয়ারিশ সদস্য #${slBangla}</span>
          <button onclick="removeWarishInputRow('${rowId}')" style="background: transparent; border: none; color: #ef4444; font-size: 16px; cursor: pointer; padding: 2px 5px;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <div class="warish-field-item" style="margin-bottom: 8px;">
          <input type="text" class="wm-name" oninput="updateWarishPreview()" placeholder="ওয়ারিশের নাম" />
        </div>
        <div class="q-grid-3" style="margin-bottom: 8px;">
          <input type="text" class="wm-relation" oninput="updateWarishPreview()" placeholder="সম্পর্ক (যেমন: স্ত্রী/ছেলে/মেয়ে)" />
          <input type="text" class="wm-age" oninput="updateWarishPreview()" placeholder="বয়স (যেমন: ২৫)" />
          <input type="text" class="wm-occupation" oninput="updateWarishPreview()" placeholder="পেশা (যেমন: গৃহিনী/ছাত্র)" />
        </div>
        <div class="warish-field-item" style="margin: 0;">
          <input type="text" class="wm-nid" oninput="updateWarishPreview()" placeholder="NID বা জন্মনিবন্ধন নম্বর" />
        </div>
      `;

      list.appendChild(card);
      updateWarishRowIndexes();
      updateWarishPreview();
  }

  // সদস্য রো মুছে ফেলা
  function removeWarishInputRow(rowId) {
      const row = document.getElementById(rowId);
      if (row) {
          row.remove();
          updateWarishRowIndexes();
          updateWarishPreview();
      }
  }

  // সদস্য সূচিপত্র ইনডেক্স সিঙ্ক
  function updateWarishRowIndexes() {
      const list = document.getElementById('warishInputRowsList');
      if (!list) return;
      const cards = list.querySelectorAll('.warish-row-card');
      cards.forEach((card, idx) => {
          const titleSpan = card.querySelector('span');
          if (titleSpan) {
              titleSpan.innerText = `ওয়ারিশ সদস্য #${convertToBanglaNumber(idx + 1)}`;
          }
      });
  }

  // ৩. রিয়াল-টাইম ইনপুট ডেটা প্রিভিউ আপডেট লজিক
  function updateWarishPreview() {
      const getVal = (id, fallback) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : fallback;
      };

      const setTxt = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.innerText = val;
      };

      const deceased = getVal('wDeceasedName', '');
      const father = getVal('wFatherName', '');
      const mother = getVal('wMotherName', '');
      const ward = getVal('wWardNo', '');
      const village = getVal('wVillage', '');
      const post = getVal('wPostOffice', '');
      const thana = getVal('wThana', '');
      const zila = getVal('wZila', '');
      
      const rawDate = getVal('wDeathDate', '');
      const deathDateFormatted = rawDate ? formatDateToBangla(rawDate) : '';

      // ১. বডি টেক্সট সিঙ্ক
      setTxt('pw-deceased', deceased);
      setTxt('pw-father', father);
      setTxt('pw-mother', mother);
      setTxt('pw-ward', ward ? convertToBanglaNumber(ward) : '');
      setTxt('pw-village', village);
      setTxt('pw-post', post);
      setTxt('pw-thana', thana);
      setTxt('pw-zila', zila);
      setTxt('pw-death-date', deathDateFormatted);

      setTxt('pdf-pw-deceased', deceased);
      setTxt('pdf-pw-father', father);
      setTxt('pdf-pw-mother', mother);
      setTxt('pdf-pw-ward', ward ? convertToBanglaNumber(ward) : '');
      setTxt('pdf-pw-village', village);
      setTxt('pdf-pw-post', post);
      setTxt('pdf-pw-thana', thana);
      setTxt('pdf-pw-zila', zila);
      setTxt('pdf-pw-death-date', deathDateFormatted);

      // ২. টেবিল রো রেন্ডারিং লজিক (লাইভ প্রিভিউ ও পিডিএফ উভয়টির জন্য)
      const list = document.getElementById('warishInputRowsList');
      const previewTbody = document.getElementById('pw-table-body');
      const pdfTbody = document.getElementById('pdf-pw-table-body');

      if (!list || !previewTbody || !pdfTbody) return;

      const cards = list.querySelectorAll('.warish-row-card');
      let tableHtml = '';

      if (cards.length === 0) {
          // ডিফল্ট ৬টি খালি রো দেখাবে ছবিটির সাথে মেলাতে
          for (let i = 1; i <= 6; i++) {
              tableHtml += `
                <tr>
                  <td>${convertToBanglaNumber(i)}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              `;
          }
      } else {
          cards.forEach((card, idx) => {
              const name = card.querySelector('.wm-name').value.trim();
              const rel = card.querySelector('.wm-relation').value.trim();
              const age = card.querySelector('.wm-age').value.trim();
              const occ = card.querySelector('.wm-occupation').value.trim();
              const nid = card.querySelector('.wm-nid').value.trim();

              tableHtml += `
                <tr>
                  <td>${convertToBanglaNumber(idx + 1)}</td>
                  <td style="font-weight: bold;">${name}</td>
                  <td>${rel}</td>
                  <td>${age ? convertToBanglaNumber(age) : ''}</td>
                  <td>${occ}</td>
                  <td>${nid ? convertToBanglaNumber(nid) : ''}</td>
                  <td></td>
                </tr>
              `;
          });
      }

      previewTbody.innerHTML = tableHtml;
      pdfTbody.innerHTML = tableHtml;
  }

  // ৪. ৪কে ভেক্টর পিডিএফ জেনারেশন ও ডাউনলোড/প্রিন্ট (বাংলা বার্তা সহ)
  async function startWarishGeneration(action) {
      const statusEl = document.getElementById('warishStatus');
      const generateBtn = document.getElementById('wGenerateBtn');
      const printBtn = document.getElementById('wPrintBtn');

      statusEl.innerText = 'এ৪ প্রফেশনাল পিডিএফ লেআউট তৈরি করা হচ্ছে...'; // অনুবাদ করা হয়েছে
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          updateWarishPreview(); // রি-সিঙ্ক

          const page = document.getElementById('warishPdfPage1');
          
          let jsPDFClass = null;
          if (window.jspdf && window.jspdf.jsPDF) {
              jsPDFClass = window.jspdf.jsPDF;
          } else if (window.jsPDF) {
              jsPDFClass = window.jsPDF;
          }

          if (!jsPDFClass || typeof window.html2canvas === 'undefined') {
              throw new Error("পিডিএফ লাইব্রেরি এখনও লোড হচ্ছে। অনুগ্রহ করে ৫ সেকেন্ড অপেক্ষা করুন।");
          }

          const pdf = new jsPDFClass('p', 'mm', 'a4');

          // html2canvas দিয়ে সোলেমান লিপি ফন্ট অক্ষুণ্ণ রেখে ৪কে রেন্ডার করবে
          html2canvas(page, {
              scale: 2, 
              useCORS: true,
              allowTaint: true,
              logging: false
          }).then(function(canvas) {
              const imgData = canvas.toDataURL('image/jpeg', 1.0);
              pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

              const rawName = document.getElementById('wDeceasedName').value.trim();
              const cleanName = rawName ? rawName.replace(/\s+/g, '_') : 'Draft';
              const fileName = `warish_sonod_${cleanName}.pdf`;

              if (action === 'print') {
                  statusEl.innerText = 'ব্রাউজার প্রিন্ট ডায়ালগ ওপেন হচ্ছে...'; // অনুবাদ করা হয়েছে
                  pdf.autoPrint();
                  const pdfUrl = pdf.output('bloburl');
                  const printWindow = window.open(pdfUrl, '_blank');
                  if (printWindow) {
                      printWindow.focus();
                  }
                  statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> প্রিন্ট উইন্ডো সফলভাবে ওপেন হয়েছে!</span>'; // অনুবাদ করা হয়েছে
              } else {
                  statusEl.innerText = 'ওয়ারিশ সনদপত্রটি সেভ করা হচ্ছে...'; // অনুবাদ করা হয়েছে
                  pdf.save(fileName);
                  statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> ওয়ারিশ সনদপত্রটি সফলভাবে তৈরি হয়েছে!</span>'; // অনুবাদ করা হয়েছে
              }

              generateBtn.disabled = false;
              printBtn.disabled = false;
          });

      } catch (err) {
          statusEl.innerText = 'পিডিএফ তৈরি করতে ত্রুটি হয়েছে'; // অনুবাদ করা হয়েছে
          generateBtn.disabled = false;
          printBtn.disabled = false;
          console.error(err);
      }
  }

  // ৫. ফর্ম রিসেট লজিক (বাংলা বার্তা সহ)
  function clearWarishForm() {
      const inputs = document.querySelectorAll('.warish-form-scroll input');
      inputs.forEach(input => input.value = '');

      document.getElementById('warishInputRowsList').innerHTML = '';
      for (let i = 0; i < 6; i++) {
          addWarishInputRow();
      }

      setupDefaultWarishDates();
      updateWarishPreview();
      
      document.getElementById('warishStatus').innerText = 'অফিশিয়াল পিডিএফ তৈরি করার জন্য প্রস্তুত'; // অনুবাদ করা হয়েছে
      document.getElementById('wGenerateBtn').disabled = false;
      document.getElementById('wPrintBtn').disabled = false;
  }

  // ডিফল্ট ডেট সেটিং
  function setupDefaultWarishDates() {
      const today = new Date();
      const dateInput = document.getElementById('wDeathDate');
      if (dateInput) {
          dateInput.value = today.toISOString().split('T')[0];
      }
  }
