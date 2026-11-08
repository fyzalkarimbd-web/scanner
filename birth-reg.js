// জন্ম নিবন্ধন আবেদন মেকার মোডাল অ্যাক্টিভেশন
  function openBirthRegModal() {
      setActiveMode('mode-birth-reg-maker'); // ড্যাশবোর্ড বাটন হাইলাইট করবে
      const modal = document.getElementById('birthRegModal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে [1.1.2]
          setupDefaultBrDates(); // ডিফল্ট ডেট সেট করবে
          updateBirthRegPreview(); // ইনিশিয়াল প্রিভিউ রেন্ডার করবে
      }
  }

  function closeBirthRegModal() {
      const modal = document.getElementById('birthRegModal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল পুনরায় সচল হবে [1.1.2]
          clearBirthRegForm(); // মেমোরি ক্যাশ ক্লিয়ার করবে
      }
  }

  // ১. মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক
  function openBirthRegModal() {
      setActiveMode('mode-birth-reg-maker');
      const modal = document.getElementById('birthRegModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক [1.1.2]
          setupDefaultBrDates();
          updateBirthRegPreview();
      }
  }

  function closeBirthRegModal() {
      const modal = document.getElementById('birthRegModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
          clearBirthRegForm();
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

  // ২. অটোমেটিক ঠিকানা কপি হ্যান্ডেলার (Auto-Fill Checkbox Logic)
  function handleSameAsBirthAddress() {
      const chk = document.getElementById('brSameAsBirth');
      if (chk && chk.checked) {
          document.getElementById('brPermCountry').value = document.getElementById('brBirthCountry').value;
          document.getElementById('brPermDiv').value = document.getElementById('brBirthDiv').value;
          document.getElementById('brPermDist').value = document.getElementById('brBirthDist').value;
          document.getElementById('brPermUpazila').value = document.getElementById('brBirthUpazila').value;
          document.getElementById('brPermUnion').value = document.getElementById('brBirthUnion').value;
          document.getElementById('brPermWard').value = document.getElementById('brBirthWard').value;
          document.getElementById('brPermPostBn').value = document.getElementById('brBirthPostBn').value;
          document.getElementById('brPermPostEn').value = document.getElementById('brBirthPostEn').value;
          document.getElementById('brPermVillageBn').value = document.getElementById('brBirthVillageBn').value;
          document.getElementById('brPermVillageEn').value = document.getElementById('brBirthVillageEn').value;
          document.getElementById('brPermRoadBn').value = document.getElementById('brBirthRoadBn').value;
          document.getElementById('brPermRoadEn').value = document.getElementById('brBirthRoadEn').value;
      }
      updateBirthRegPreview();
  }

  function handleSameAsPermAddress() {
      const chk = document.getElementById('brSameAsPerm');
      if (chk && chk.checked) {
          document.getElementById('brCurrCountry').value = document.getElementById('brPermCountry').value;
          document.getElementById('brCurrDiv').value = document.getElementById('brPermDiv').value;
          document.getElementById('brCurrDist').value = document.getElementById('brPermDist').value;
          document.getElementById('brCurrUpazila').value = document.getElementById('brPermUpazila').value;
          document.getElementById('brCurrUnion').value = document.getElementById('brPermUnion').value;
          document.getElementById('brCurrWard').value = document.getElementById('brPermWard').value;
          document.getElementById('brCurrPostBn').value = document.getElementById('brPermPostBn').value;
          document.getElementById('brCurrPostEn').value = document.getElementById('brPermPostEn').value;
          document.getElementById('brCurrVillageBn').value = document.getElementById('brPermVillageBn').value;
          document.getElementById('brCurrVillageEn').value = document.getElementById('brPermVillageEn').value;
          document.getElementById('brCurrRoadBn').value = document.getElementById('brPermRoadBn').value;
          document.getElementById('brCurrRoadEn').value = document.getElementById('brPermRoadEn').value;
      }
      updateBirthRegPreview();
  }

  // ৩. রিয়াল-টাইম ইনপুট ডেটা প্রিভিউ আপডেট লজিক
  function updateBirthRegPreview() {
      const getVal = (id, fallback) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : fallback;
      };

      const setTxt = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.innerText = val;
      };

      // ১. টার্গেট অফিস
      const targetOffice = getVal('brTargetOffice', 'জন্মস্থান');

      // ২. নিবন্ধনাধীন ব্যক্তি
      const fnBn = getVal('brFirstNameBn', '');
      const lnBn = getVal('brLastNameBn', '');
      const fullNameBn = (fnBn + ' ' + lnBn).trim() || '';
      
      const fnEn = getVal('brFirstNameEn', '');
      const lnEn = getVal('brLastNameEn', '');
      const fullNameEn = (fnEn + ' ' + lnEn).trim() || '';

      const dob = getVal('brDob', '');
      const dobFormatted = dob ? formatDateToBangla(dob) : '';
      const childOrder = getVal('brChildOrder', '1');
      const gender = getVal('brGender', 'পুরুষ');
      const nid = getVal('brNid', '');

      // ৩. জন্মস্থান
      const bCountry = getVal('brBirthCountry', 'বাংলাদেশ');
      const bDiv = getVal('brBirthDiv', '');
      const bDist = getVal('brBirthDist', '');
      const bUpazila = getVal('brBirthUpazila', '');
      const bUnion = getVal('brBirthUnion', '');
      const bWard = getVal('brBirthWard', '');
      const bPostBn = getVal('brBirthPostBn', '');
      const bPostEn = getVal('brBirthPostEn', '');
      const bVillBn = getVal('brBirthVillageBn', '');
      const bVillEn = getVal('brBirthVillageEn', '');
      const bRoadBn = getVal('brBirthRoadBn', '');
      const bRoadEn = getVal('brBirthRoadEn', '');

      // ৪. পিতা
      const fNid = getVal('brFatherNid', '');
      const fDob = getVal('brFatherDob', '');
      const fDobFormatted = fDob ? formatDateToBangla(fDob) : '';
      const fNameBn = getVal('brFatherNameBn', '');
      const fNameEn = getVal('brFatherNameEn', '');
      const fNat = getVal('brFatherNationality', 'বাংলাদেশী');

      // ৫. মাতা
      const mNid = getVal('brMotherNid', '');
      const mDob = getVal('brMotherDob', '');
      const mDobFormatted = mDob ? formatDateToBangla(mDob) : '';
      const mNameBn = getVal('brMotherNameBn', '');
      const mNameEn = getVal('brMotherNameEn', '');
      const mNat = getVal('brMotherNationality', 'বাংলাদেশী');

      // ৬. স্থায়ী ঠিকানা
      const pCountry = getVal('brPermCountry', 'বাংলাদেশ');
      const pDiv = getVal('brPermDiv', '');
      const pDist = getVal('brPermDist', '');
      const pUpazila = getVal('brPermUpazila', '');
      const pUnion = getVal('brPermUnion', '');
      const pWard = getVal('brPermWard', '');
      const pPostBn = getVal('brPermPostBn', '');
      const pPostEn = getVal('brPermPostEn', '');
      const pVillBn = getVal('brPermVillageBn', '');
      const pVillEn = getVal('brPermVillageEn', '');
      const pRoadBn = getVal('brPermRoadBn', '');
      const pRoadEn = getVal('brPermRoadEn', '');

      // ৭. বর্তমান ঠিকানা
      const cCountry = getVal('brCurrCountry', 'বাংলাদেশ');
      const cDiv = getVal('brCurrDiv', '');
      const cDist = getVal('brCurrDist', '');
      const cUpazila = getVal('brCurrUpazila', '');
      const cUnion = getVal('brCurrUnion', '');
      const cWard = getVal('brCurrWard', '');
      const cPostBn = getVal('brCurrPostBn', '');
      const cPostEn = getVal('brCurrPostEn', '');
      const cVillBn = getVal('brCurrVillageBn', '');
      const cVillEn = getVal('brCurrVillageEn', '');
      const cRoadBn = getVal('brCurrRoadBn', '');
      const cRoadEn = getVal('brCurrRoadEn', '');

      // ৮. আবেদনকারী
      const appName = getVal('brApplicantName', '');
      const appPhone = getVal('brApplicantPhone', '');

      // ==================== LIVE PREVIEW SYNCHRONIZATION ====================
      setTxt('p-br-office', targetOffice);

      setTxt('p-br-fullname-bn', fullNameBn);
      setTxt('p-br-fullname-en', fullNameEn);
      setTxt('p-br-dob', dobFormatted);
      setTxt('p-br-gender', gender);
      setTxt('p-br-child-order', convertToBanglaNumber(childOrder));
      setTxt('p-br-nid', nid ? convertToBanglaNumber(nid) : '');

      setTxt('p-br-birth-country', bCountry);
      setTxt('p-br-birth-div', bDiv);
      setTxt('p-br-birth-dist', bDist);
      setTxt('p-br-birth-upazila', bUpazila);
      setTxt('p-br-birth-union', bUnion);
      setTxt('p-br-birth-ward', bWard ? convertToBanglaNumber(bWard) : '');
      setTxt('p-br-birth-post-bn', bPostBn);
      setTxt('p-br-birth-post-en', bPostEn);
      setTxt('p-br-birth-village-bn', bVillBn);
      setTxt('p-br-birth-village-en', bVillEn);
      setTxt('p-br-birth-road-bn', bRoadBn);
      setTxt('p-br-birth-road-en', bRoadEn);

      setTxt('p-br-father-nid', fNid ? convertToBanglaNumber(fNid) : '');
      setTxt('p-br-father-dob', fDobFormatted);
      setTxt('p-br-father-name-bn', fNameBn);
      setTxt('p-br-father-name-en', fNameEn);
      setTxt('p-br-father-nat', fNat);

      setTxt('p-br-mother-nid', mNid ? convertToBanglaNumber(mNid) : '');
      setTxt('p-br-mother-dob', mDobFormatted);
      setTxt('p-br-mother-name-bn', mNameBn);
      setTxt('p-br-mother-name-en', mNameEn);
      setTxt('p-br-mother-nat', mNat);

      setTxt('p-br-perm-country', pCountry);
      setTxt('p-br-perm-div', pDiv);
      setTxt('p-br-perm-dist', pDist);
      setTxt('p-br-perm-upazila', pUpazila);
      setTxt('p-br-perm-union', pUnion);
      setTxt('p-br-perm-ward', pWard ? convertToBanglaNumber(pWard) : '');
      setTxt('p-br-perm-post-bn', pPostBn);
      setTxt('p-br-perm-post-en', pPostEn);
      setTxt('p-br-perm-village-bn', pVillBn);
      setTxt('p-br-perm-village-en', pVillEn);
      setTxt('p-br-perm-road-bn', pRoadBn);
      setTxt('p-br-perm-road-en', pRoadEn);

      setTxt('p-br-curr-country', cCountry);
      setTxt('p-br-curr-div', cDiv);
      setTxt('p-br-curr-dist', cDist);
      setTxt('p-br-curr-upazila', cUpazila);
      setTxt('p-br-curr-union', cUnion);
      setTxt('p-br-curr-ward', cWard ? convertToBanglaNumber(cWard) : '');
      setTxt('p-br-curr-post-bn', cPostBn);
      setTxt('p-br-curr-post-en', cPostEn);
      setTxt('p-br-curr-village-bn', cVillBn);
      setTxt('p-br-curr-village-en', cVillEn);
      setTxt('p-br-curr-road-bn', cRoadBn);
      setTxt('p-br-curr-road-en', cRoadEn);

      setTxt('p-br-app-name', appName);
      setTxt('p-br-app-phone', appPhone ? convertToBanglaNumber(appPhone) : '');

      // ==================== HIDDEN PDF TEMPLATE SYNCHRONIZATION ====================
      setTxt('pdf-br-office', targetOffice);

      setTxt('pdf-br-fullname-bn', fullNameBn);
      setTxt('pdf-br-fullname-en', fullNameEn);
      setTxt('pdf-br-dob', dobFormatted);
      setTxt('pdf-br-gender', gender);
      setTxt('pdf-br-child-order', convertToBanglaNumber(childOrder));
      setTxt('pdf-br-nid', nid ? convertToBanglaNumber(nid) : '');

      setTxt('pdf-br-birth-country', bCountry);
      setTxt('pdf-br-birth-div', bDiv);
      setTxt('pdf-br-birth-dist', bDist);
      setTxt('pdf-br-birth-upazila', bUpazila);
      setTxt('pdf-br-birth-union', bUnion);
      setTxt('pdf-br-birth-ward', bWard ? convertToBanglaNumber(bWard) : '');
      setTxt('pdf-br-birth-post-bn', bPostBn);
      setTxt('pdf-br-birth-post-en', bPostEn);
      setTxt('pdf-br-birth-village-bn', bVillBn);
      setTxt('pdf-br-birth-village-en', bVillEn);
      setTxt('pdf-br-birth-road-bn', bRoadBn);
      setTxt('pdf-br-birth-road-en', bRoadEn);

      setTxt('pdf-br-father-nid', fNid ? convertToBanglaNumber(fNid) : '');
      setTxt('pdf-br-father-dob', fDobFormatted);
      setTxt('pdf-br-father-name-bn', fNameBn);
      setTxt('pdf-br-father-name-en', fNameEn);
      setTxt('pdf-br-father-nat', fNat);

      setTxt('pdf-br-mother-nid', mNid ? convertToBanglaNumber(mNid) : '');
      setTxt('pdf-br-mother-dob', mDobFormatted);
      setTxt('pdf-br-mother-name-bn', mNameBn);
      setTxt('pdf-br-mother-name-en', mNameEn);
      setTxt('pdf-br-mother-nat', mNat);

      setTxt('pdf-br-perm-country', pCountry);
      setTxt('pdf-br-perm-div', pDiv);
      setTxt('pdf-br-perm-dist', pDist);
      setTxt('pdf-br-perm-upazila', pUpazila);
      setTxt('pdf-br-perm-union', pUnion);
      setTxt('pdf-br-perm-ward', pWard ? convertToBanglaNumber(pWard) : '');
      setTxt('pdf-br-perm-post-bn', pPostBn);
      setTxt('pdf-br-perm-post-en', pPostEn);
      setTxt('pdf-br-perm-village-bn', pVillBn);
      setTxt('pdf-br-perm-village-en', pVillEn);
      setTxt('pdf-br-perm-road-bn', pRoadBn);
      setTxt('pdf-br-perm-road-en', pRoadEn);

      setTxt('pdf-br-curr-country', cCountry);
      setTxt('pdf-br-curr-div', cDiv);
      setTxt('pdf-br-curr-dist', cDist);
      setTxt('pdf-br-curr-upazila', cUpazila);
      setTxt('pdf-br-curr-union', cUnion);
      setTxt('pdf-br-curr-ward', cWard ? convertToBanglaNumber(cWard) : '');
      setTxt('pdf-br-curr-post-bn', cPostBn);
      setTxt('pdf-br-curr-post-en', cPostEn);
      setTxt('pdf-br-curr-village-bn', cVillBn);
      setTxt('pdf-br-curr-village-en', cVillEn);
      setTxt('pdf-br-curr-road-bn', cRoadBn);
      setTxt('pdf-br-curr-road-en', cRoadEn);

      setTxt('pdf-br-app-name', appName);
      setTxt('pdf-br-app-phone', appPhone ? convertToBanglaNumber(appPhone) : '');
  }

  // ৪. ২-পৃষ্ঠার ৪কে এ৪ পিডিএফ জেনারেশন ও ডাউনলোড/প্রিন্ট মেথড
  async function startBirthRegGeneration(action) {
      const statusEl = document.getElementById('birthRegStatus');
      const generateBtn = document.getElementById('brGenerateBtn');
      const printBtn = document.getElementById('brPrintBtn');

      statusEl.innerText = '২-পৃষ্ঠার অফিশিয়াল জন্ম নিবন্ধন আবেদনপত্র তৈরি করা হচ্ছে...';
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          updateBirthRegPreview(); // রি-সিঙ্ক

          const page1 = document.getElementById('brPdfPage1');
          const page2 = document.getElementById('brPdfPage2');
          
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

          // ১. প্রথম পেজ স্ন্যাপশট নেবে (html2canvas ২.০x স্কেল সহ) [2]
          html2canvas(page1, {
              scale: 2, 
              useCORS: true,
              allowTaint: true,
              logging: false
          }).then(function(canvas1) {
              const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);
              pdf.addImage(imgData1, 'JPEG', 0, 0, 210, 297);

              // ২. দ্বিতীয় পেজের জন্য নতুন পাতা যুক্ত করবে
              pdf.addPage('a4', 'p');

              // ৩. দ্বিতীয় পেজ স্ন্যাপশট নেবে
              html2canvas(page2, {
                  scale: 2,
                  useCORS: true,
                  allowTaint: true,
                  logging: false
              }).then(function(canvas2) {
                  const imgData2 = canvas2.toDataURL('image/jpeg', 1.0);
                  pdf.addImage(imgData2, 'JPEG', 0, 0, 210, 297);

                  const rawName = document.getElementById('brFirstNameEn').value.trim() || document.getElementById('brFirstNameBn').value.trim();
                  const cleanName = rawName ? rawName.replace(/\s+/g, '_') : 'Draft';
                  const fileName = `birth_registration_app_${cleanName}.pdf`;

                  // ৪. ডাউনলোড বা ডিরেক্ট প্রিন্ট ট্র্যাকিং
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
                      statusEl.innerText = '২-পৃষ্ঠার আবেদনপত্রটি পিডিএফ হিসেবে সেভ করা হচ্ছে...';
                      pdf.save(fileName);
                      statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> ২-পৃষ্ঠার জন্ম নিবন্ধন ফরম সফলভাবে তৈরি হয়েছে!</span>';
                  }

                  generateBtn.disabled = false;
                  printBtn.disabled = false;
              });
          });

      } catch (err) {
          statusEl.innerText = '২-পৃষ্ঠার পিডিএফ জেনারেট করতে ত্রুটি হয়েছে';
          generateBtn.disabled = false;
          printBtn.disabled = false;
          console.error(err);
      }
  }

  // ৫. ফর্ম রিসেট লজিক
  function clearBirthRegForm() {
      const inputs = document.querySelectorAll('.br-form-scroll input');
      inputs.forEach(input => {
          if (input.type === 'checkbox') {
              input.checked = false;
          } else if (input.id === 'brBirthCountry' || input.id === 'brFatherNationality' || input.id === 'brMotherNationality' || input.id === 'brPermCountry' || input.id === 'brCurrCountry') {
              input.value = 'বাংলাদেশ';
          } else {
              input.value = '';
          }
      });

      setupDefaultBrDates();
      updateBirthRegPreview();
      
      document.getElementById('birthRegStatus').innerText = 'অফিশিয়াল ২-পৃষ্ঠার পিডিএফ তৈরি করার জন্য প্রস্তুত';
      document.getElementById('brGenerateBtn').disabled = false;
      document.getElementById('brPrintBtn').disabled = false;
  }

  // ডিফল্ট ডেট সেটিং
  function setupDefaultBrDates() {
      const today = new Date();
      const dateInput = document.getElementById('brDob');
      if (dateInput) {
          dateInput.value = today.toISOString().split('T')[0];
      }
  }
