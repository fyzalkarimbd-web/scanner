// পারিবারিক সনদ মেকার মোডাল অ্যাক্টিভেশন
  function openFamilyModal() {
      setActiveMode('mode-family-maker'); // ড্যাশবোর্ড বাটন হাইলাইট করবে
      const modal = document.getElementById('familyModal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে [1.1.2]
          
          // অন্তত ৫টি ডিফল্ট রো তৈরি করবে
          const list = document.getElementById('familyInputRowsList');
          if (list && list.children.length === 0) {
              for (let i = 0; i < 5; i++) {
                  addFamilyMemberRow();
              }
          }
          updateFamilyPreview();
      }
  }

  function closeFamilyModal() {
      const modal = document.getElementById('familyModal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল পুনরায় সচল হবে [1.1.2]
          clearFamilyForm(); // মেমোরি ক্যাশ ক্লিয়ার করবে
      }
  }
  let isFamilyLibLoaded = false;

  // ১. মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক
  function openFamilyModal() {
      setActiveMode('mode-family-maker');
      const modal = document.getElementById('familyModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক [1.1.2]
          
          // অন্তত ৫টি ডিফল্ট রো তৈরি করবে
          const list = document.getElementById('familyInputRowsList');
          if (list && list.children.length === 0) {
              for (let i = 0; i < 5; i++) {
                  addFamilyMemberRow();
              }
          }
          updateFamilyPreview();
      }
  }

  function closeFamilyModal() {
      const modal = document.getElementById('familyModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
          clearFamilyForm();
      }
  }

  // ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
  function convertToBanglaNumber(n) {
      const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
      return n.toString().replace(/[0-9]/g, function(w) {
          return banglaDigits[w] || w;
      });
  }

  // ২. ডাইনামিক পারিবারিক সদস্য রো (Row) যুক্ত করার লজিক
  function addFamilyMemberRow() {
      const list = document.getElementById('familyInputRowsList');
      if (!list) return;
      
      const rowId = 'fmember-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      const slBangla = convertToBanglaNumber(list.children.length + 1);

      const card = document.createElement('div');
      card.className = 'family-row-card';
      card.id = rowId;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 12.5px; font-weight: bold; color: #0284c7;">পরিবারের সদস্য #${slBangla}</span>
          <button onclick="removeFamilyMemberRow('${rowId}')" style="background: transparent; border: none; color: #ef4444; font-size: 16px; cursor: pointer; padding: 2px 5px;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <div class="family-field-item" style="margin-bottom: 8px;">
          <input type="text" class="fm-name" oninput="updateFamilyPreview()" placeholder="সদস্যের নাম" />
        </div>
        <div class="q-grid-3" style="margin-bottom: 8px;">
          <input type="text" class="fm-relation" oninput="updateFamilyPreview()" placeholder="সম্পর্ক (যেমন: নিজ/স্ত্রী/ছেলে/মেয়ে)" />
          <input type="text" class="fm-age" oninput="updateFamilyPreview()" placeholder="বয়স (যেমন: ২৫)" />
          <input type="text" class="fm-remark" oninput="updateFamilyPreview()" placeholder="মন্তব্য (ঐচ্ছিক)" />
        </div>
        <div class="family-field-item" style="margin: 0;">
          <input type="text" class="fm-nid" oninput="updateFamilyPreview()" placeholder="NID বা জন্মনিবন্ধন নম্বর" />
        </div>
      `;

      list.appendChild(card);
      updateFamilyRowIndexes();
      updateFamilyPreview();
  }

  // সদস্য রো মুছে ফেলা
  function removeFamilyMemberRow(rowId) {
      const row = document.getElementById(rowId);
      if (row) {
          row.remove();
          updateFamilyRowIndexes();
          updateFamilyPreview();
      }
  }

  // সদস্য সূচিপত্র ইনডেক্স সিঙ্ক
  function updateFamilyRowIndexes() {
      const list = document.getElementById('familyInputRowsList');
      if (!list) return;
      const cards = list.querySelectorAll('.family-row-card');
      cards.forEach((card, idx) => {
          const titleSpan = card.querySelector('span');
          if (titleSpan) {
              titleSpan.innerText = `পরিবারের সদস্য #${convertToBanglaNumber(idx + 1)}`;
          }
      });
  }

  // ৩. রিয়াল-টাইম ইনপুট ডেটা প্রিভিউ আপডেট লজিক
  function updateFamilyPreview() {
      const getVal = (id, fallback) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : fallback;
      };

      const setTxt = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.innerText = val;
      };

      const unionName = getVal('fUnionName', '');
      const ward = getVal('fWardNo', '');
      const thana = getVal('fThana', '');
      const zila = getVal('fZila', '');

      const headName = getVal('fHeadName', '');
      const headGuardian = getVal('fHeadGuardian', '');
      const headMother = getVal('fHeadMother', '');
      const headNid = getVal('fHeadNid', '');
      const village = getVal('fVillage', '');
      const post = getVal('fPostOffice', '');

      // ১. বডি টেক্সট সিঙ্ক
      setTxt('pf-union-name', unionName);
      setTxt('pf-ward', ward ? convertToBanglaNumber(ward) : '');
      setTxt('pf-thana', thana);
      setTxt('pf-zila', zila);

      setTxt('pf-head-name', headName);
      setTxt('pf-head-guardian', headGuardian);
      setTxt('pf-head-mother', headMother);
      setTxt('pf-head-nid', headNid ? convertToBanglaNumber(headNid) : '');
      setTxt('pf-village', village);
      setTxt('pf-post', post);
      setTxt('pf-ward-inline', ward ? convertToBanglaNumber(ward) : '');
      setTxt('pf-thana-inline', thana);
      setTxt('pf-zila-inline', zila);

      setTxt('pdf-pf-union-name', unionName);
      setTxt('pdf-pf-ward', ward ? convertToBanglaNumber(ward) : '');
      setTxt('pdf-pf-thana', thana);
      setTxt('pdf-pf-zila', zila);

      setTxt('pdf-pf-head-name', headName);
      setTxt('pdf-pf-head-guardian', headGuardian);
      setTxt('pdf-pf-head-mother', headMother);
      setTxt('pdf-pf-head-nid', headNid ? convertToBanglaNumber(headNid) : '');
      setTxt('pdf-pf-village', village);
      setTxt('pdf-pf-post', post);
      setTxt('pdf-pf-ward-inline', ward ? convertToBanglaNumber(ward) : '');
      setTxt('pdf-pf-thana-inline', thana);
      setTxt('pdf-pf-zila-inline', zila);

      // ২. টেবিল রো রেন্ডারিং লজিক (লাইভ প্রিভিউ ও পিডিএফ উভয়টির জন্য)
      const list = document.getElementById('familyInputRowsList');
      const previewTbody = document.getElementById('pf-table-body');
      const pdfTbody = document.getElementById('pdf-pf-table-body');

      if (!list || !previewTbody || !pdfTbody) return;

      const cards = list.querySelectorAll('.family-row-card');
      let tableHtml = '';
      let validMemberCount = 0;

      if (cards.length === 0) {
          // ডিফল্ট ৫টি খালি রো দেখাবে
          for (let i = 1; i <= 5; i++) {
              tableHtml += `
                <tr>
                  <td>${convertToBanglaNumber(i)}</td>
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
              const name = card.querySelector('.fm-name').value.trim();
              const rel = card.querySelector('.fm-relation').value.trim();
              const age = card.querySelector('.fm-age').value.trim();
              const nid = card.querySelector('.fm-nid').value.trim();
              const remark = card.querySelector('.fm-remark').value.trim();

              if (name !== '') {
                  validMemberCount++;
              }

              tableHtml += `
                <tr>
                  <td>${convertToBanglaNumber(idx + 1)}</td>
                  <td style="font-weight: bold;">${name}</td>
                  <td>${rel}</td>
                  <td>${age ? convertToBanglaNumber(age) : ''}</td>
                  <td>${nid ? convertToBanglaNumber(nid) : ''}</td>
                  <td>${remark}</td>
                </tr>
              `;
          });
      }

      const totalMembersBangla = convertToBanglaNumber(validMemberCount || cards.length);
      setTxt('pf-member-count', totalMembersBangla);
      setTxt('pdf-pf-member-count', totalMembersBangla);

      previewTbody.innerHTML = tableHtml;
      pdfTbody.innerHTML = tableHtml;
  }

  // ৪. ৪কে ভেক্টর পিডিএফ জেনারেশন ও ডাউনলোড/প্রিন্ট (বাংলা বার্তা সহ)
  async function startFamilyGeneration(action) {
      const statusEl = document.getElementById('familyStatus');
      const generateBtn = document.getElementById('fGenerateBtn');
      const printBtn = document.getElementById('fPrintBtn');

      statusEl.innerText = 'এ৪ প্রফেশনাল পিডিএফ লেআউট তৈরি করা হচ্ছে...';
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          updateFamilyPreview(); // রি-সিঙ্ক

          const page = document.getElementById('familyPdfPage1');
          
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

              const rawName = document.getElementById('fHeadName').value.trim();
              const cleanName = rawName ? rawName.replace(/\s+/g, '_') : 'Draft';
              const fileName = `family_certificate_${cleanName}.pdf`;

              if (action === 'print') {
                  statusEl.innerText = 'ব্রাউজার প্রিন্ট ডায়ালগ ওপেন হচ্ছে...';
                  pdf.autoPrint();
                  const pdfUrl = pdf.output('bloburl');
                  const printWindow = window.open(pdfUrl, '_blank');
                  if (printWindow) {
                      printWindow.focus();
                  }
                  statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> প্রিন্ট উইন্ডো সফলভাবে ওপেন হয়েছে!</span>';
              } else {
                  statusEl.innerText = 'পারিবারিক সনদপত্রটি সেভ করা হচ্ছে...';
                  pdf.save(fileName);
                  statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> পারিবারিক সনদপত্রটি সফলভাবে তৈরি হয়েছে!</span>';
              }

              generateBtn.disabled = false;
              printBtn.disabled = false;
          });

      } catch (err) {
          statusEl.innerText = 'পিডিএফ তৈরি করতে ত্রুটি হয়েছে';
          generateBtn.disabled = false;
          printBtn.disabled = false;
          console.error(err);
      }
  }

  // ৫. ফর্ম রিসেট লজিক (বাংলা বার্তা সহ)
  function clearFamilyForm() {
      const inputs = document.querySelectorAll('.family-form-scroll input');
      inputs.forEach(input => input.value = '');

      document.getElementById('familyInputRowsList').innerHTML = '';
      for (let i = 0; i < 5; i++) {
          addFamilyMemberRow();
      }

      updateFamilyPreview();
      
      document.getElementById('familyStatus').innerText = 'অফিশিয়াল পিডিএফ তৈরি করার জন্য প্রস্তুত';
      document.getElementById('fGenerateBtn').disabled = false;
      document.getElementById('fPrintBtn').disabled = false;
  }
