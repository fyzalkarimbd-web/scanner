let isDeathLibLoaded = false;

  // ১. মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক
  function openDeathRegModal() {
      setActiveMode('mode-death-reg-maker');
      const modal = document.getElementById('deathRegModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক [1.1.2]
          setupDefaultDrDates();
          updateDeathRegPreview();
      }
  }

  function closeDeathRegModal() {
      const modal = document.getElementById('deathRegModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
          clearDeathRegForm();
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

  // ২. রিয়াল-টাইম ইনপুট ডেটা প্রিভিউ আপডেট লজিক
  function updateDeathRegPreview() {
      const getVal = (id, fallback) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : fallback;
      };

      const setTxt = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.innerText = val;
      };

      // ১. টার্গেট অফিস
      const targetOffice = getVal('drTargetOffice', 'মৃত্যুর স্থান');

      // ২. মৃত ব্যক্তির পরিচিতি
      const nid = getVal('drNid', '');
      const nameBn = getVal('drNameBn', '');
      const nameEn = getVal('drNameEn', '');
      const deathDate = getVal('drDeathDate', '');
      const deathDateFormatted = deathDate ? formatDateToBangla(deathDate) : '';
      const gender = getVal('drGender', 'পুরুষ');
      const deathPlace = getVal('drDeathPlace', '');
      const deathReason = getVal('drDeathReason', '');

      // ৩. পিতা
      const fNid = getVal('drFatherNid', '');
      const fNat = getVal('drFatherNat', 'বাংলাদেশী');
      const fNameBn = getVal('drFatherNameBn', '');
      const fNameEn = getVal('drFatherNameEn', '');

      // ৪. মাতা
      const mNid = getVal('drMotherNid', '');
      const mNat = getVal('drMotherNat', 'বাংলাদেশী');
      const mNameBn = getVal('drMotherNameBn', '');
      const mNameEn = getVal('drMotherNameEn', '');

      // ৫. স্বামী/স্ত্রী
      const sNid = getVal('drSpouseNid', '');
      const sNameBn = getVal('drSpouseNameBn', '');
      const sNameEn = getVal('drSpouseNameEn', '');

      // ৬. ঠিকানা
      const country = getVal('drCountry', 'বাংলাদেশ');
      const div = getVal('drDiv', '');
      const dist = getVal('drDist', '');
      const upazila = getVal('drUpazila', '');
      const union = getVal('drUnion', '');
      const ward = getVal('drWard', '');
      const postBn = getVal('drPostBn', '');
      const postEn = getVal('drPostEn', '');
      const villBn = getVal('drVillageBn', '');
      const villEn = getVal('drVillageEn', '');
      const roadBn = getVal('drRoadBn', '');
      const roadEn = getVal('drRoadEn', '');

      // ৭. আবেদনকারী
      const appName = getVal('drAppName', '');
      const appNid = getVal('drAppNid', '');
      const appRel = getVal('drAppRel', '');
      const appPhone = getVal('drAppPhone', '');

      // ==================== LIVE PREVIEW SYNCHRONIZATION ====================
      setTxt('p-dr-office', targetOffice);

      setTxt('p-dr-name-bn', nameBn);
      setTxt('p-dr-name-en', nameEn);
      setTxt('p-dr-death-date', deathDateFormatted);
      setTxt('p-dr-gender', gender);
      setTxt('p-dr-nid', nid ? convertToBanglaNumber(nid) : '');
      setTxt('p-dr-death-place', deathPlace);
      setTxt('p-dr-death-reason', deathReason);

      setTxt('p-dr-father-nid', fNid ? convertToBanglaNumber(fNid) : '');
      setTxt('p-dr-father-nat', fNat);
      setTxt('p-dr-father-name-bn', fNameBn);
      setTxt('p-dr-father-name-en', fNameEn);

      setTxt('p-dr-mother-nid', mNid ? convertToBanglaNumber(mNid) : '');
      setTxt('p-dr-mother-nat', mNat);
      setTxt('p-dr-mother-name-bn', mNameBn);
      setTxt('p-dr-mother-name-en', mNameEn);

      setTxt('p-dr-spouse-nid', sNid ? convertToBanglaNumber(sNid) : '');
      setTxt('p-dr-spouse-name-bn', sNameBn);
      setTxt('p-dr-spouse-name-en', sNameEn);

      setTxt('p-dr-country', country);
      setTxt('p-dr-div', div);
      setTxt('p-dr-dist', dist);
      setTxt('p-dr-upazila', upazila);
      setTxt('p-dr-union', union);
      setTxt('p-dr-ward', ward ? convertToBanglaNumber(ward) : '');
      setTxt('p-dr-post-bn', postBn);
      setTxt('p-dr-post-en', postEn);
      setTxt('p-dr-village-bn', villBn);
      setTxt('p-dr-village-en', villEn);
      setTxt('p-dr-road-bn', roadBn);
      setTxt('p-dr-road-en', roadEn);

      setTxt('p-dr-app-name', appName);
      setTxt('p-dr-app-nid', appNid ? convertToBanglaNumber(appNid) : '');
      setTxt('p-dr-app-rel', appRel);
      setTxt('p-dr-app-phone', appPhone ? convertToBanglaNumber(appPhone) : '');

      // ==================== HIDDEN PDF TEMPLATE SYNCHRONIZATION ====================
      setTxt('pdf-dr-office', targetOffice);

      setTxt('pdf-dr-name-bn', nameBn);
      setTxt('pdf-dr-name-en', nameEn);
      setTxt('pdf-dr-death-date', deathDateFormatted);
      setTxt('pdf-dr-gender', gender);
      setTxt('pdf-dr-nid', nid ? convertToBanglaNumber(nid) : '');
      setTxt('pdf-dr-death-place', deathPlace);
      setTxt('pdf-dr-death-reason', deathReason);

      setTxt('pdf-dr-father-nid', fNid ? convertToBanglaNumber(fNid) : '');
      setTxt('pdf-dr-father-nat', fNat);
      setTxt('pdf-dr-father-name-bn', fNameBn);
      setTxt('pdf-dr-father-name-en', fNameEn);

      setTxt('pdf-dr-mother-nid', mNid ? convertToBanglaNumber(mNid) : '');
      setTxt('pdf-dr-mother-nat', mNat);
      setTxt('pdf-dr-mother-name-bn', mNameBn);
      setTxt('pdf-dr-mother-name-en', mNameEn);

      setTxt('pdf-dr-spouse-nid', sNid ? convertToBanglaNumber(sNid) : '');
      setTxt('pdf-dr-spouse-name-bn', sNameBn);
      setTxt('pdf-dr-spouse-name-en', sNameEn);

      setTxt('pdf-dr-country', country);
      setTxt('pdf-dr-div', div);
      setTxt('pdf-dr-dist', dist);
      setTxt('pdf-dr-upazila', upazila);
      setTxt('pdf-dr-union', union);
      setTxt('pdf-dr-ward', ward ? convertToBanglaNumber(ward) : '');
      setTxt('pdf-dr-post-bn', postBn);
      setTxt('pdf-dr-post-en', postEn);
      setTxt('pdf-dr-village-bn', villBn);
      setTxt('pdf-dr-village-en', villEn);
      setTxt('pdf-dr-road-bn', roadBn);
      setTxt('pdf-dr-road-en', roadEn);

      setTxt('pdf-dr-app-name', appName);
      setTxt('pdf-dr-app-nid', appNid ? convertToBanglaNumber(appNid) : '');
      setTxt('pdf-dr-app-rel', appRel);
      setTxt('pdf-dr-app-phone', appPhone ? convertToBanglaNumber(appPhone) : '');
  }

  // ৩. ১-পৃষ্ঠার ৪কে এ৪ পিডিএফ জেনারেশন ও ডাউনলোড/প্রিন্ট মেথড (বাংলা স্ট্যাটাস বার্তা সহ)
  async function startDeathRegGeneration(action) {
      const statusEl = document.getElementById('deathRegStatus');
      const generateBtn = document.getElementById('drGenerateBtn');
      const printBtn = document.getElementById('drPrintBtn');

      const name = document.getElementById('drNameBn').value.trim() || document.getElementById('drNameEn').value.trim();

      statusEl.innerText = '১-পৃষ্ঠার প্রফেশনাল পিডিএফ লেআউট তৈরি করা হচ্ছে...';
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          updateDeathRegPreview(); // রি-সিঙ্ক

          const page1 = document.getElementById('drPdfPage1');
          
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

          // ১-পৃষ্ঠার স্ন্যাপশট নেবে (html2canvas ২.০x স্কেল সহ) [2]
          html2canvas(page1, {
              scale: 2, 
              useCORS: true,
              allowTaint: true,
              logging: false
          }).then(function(canvas1) {
              const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);
              pdf.addImage(imgData1, 'JPEG', 0, 0, 210, 297);

              const rawName = document.getElementById('drNameEn').value.trim() || document.getElementById('drNameBn').value.trim();
              const cleanName = rawName ? rawName.replace(/\s+/g, '_') : 'Draft';
              const fileName = `death_registration_app_${cleanName}.pdf`;

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
                  statusEl.innerText = '১-পৃষ্ঠার আবেদনপত্রটি পিডিএফ হিসেবে সেভ করা হচ্ছে...';
                  pdf.save(fileName);
                  statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> ১-পৃষ্ঠার মৃত্যু নিবন্ধন ফরমটি সফলভাবে তৈরি হয়েছে!</span>'; // বাংলা বার্তা
              }

              generateBtn.disabled = false;
              printBtn.disabled = false;
          });

      } catch (err) {
          statusEl.innerText = 'পিডিএফ জেনারেট করতে ত্রুটি হয়েছে';
          generateBtn.disabled = false;
          printBtn.disabled = false;
          console.error(err);
      }
  }

  // ৪. ফর্ম রিসেট লজিক
  function clearDeathRegForm() {
      const inputs = document.querySelectorAll('.dr-form-scroll input');
      inputs.forEach(input => {
          if (input.id === 'drCountry' || input.id === 'drFatherNat' || input.id === 'drMotherNat') {
              input.value = 'বাংলাদেশী';
          } else {
              input.value = '';
          }
      });

      setupDefaultDrDates();
      updateDeathRegPreview();
      
      document.getElementById('deathRegStatus').innerText = 'অফিশিয়াল ১-পৃষ্ঠার পিডিএফ তৈরি করার জন্য প্রস্তুত';
      document.getElementById('drGenerateBtn').disabled = false;
      document.getElementById('drPrintBtn').disabled = false;
  }

  // ডিফল্ট ডেট সেটিং
  function setupDefaultDrDates() {
      const today = new Date();
      const dateInput = document.getElementById('drDeathDate');
      if (dateInput) {
          dateInput.value = today.toISOString().split('T')[0];
      }
  }
