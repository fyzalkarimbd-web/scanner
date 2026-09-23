  let isF2LibLoaded = false;

  // ১৬টি সম্পূর্ণ অফিশিয়াল নির্দেশাবলী প্রফেশনাল সংক্ষিপ্ত অনুবাদ (NEW UPDATE)
  const officialNidInstructions = 
    "(১) আবেদনপত্রে প্রদত্ত আবেদনকারীর স্বাক্ষর কমিশনে সংরক্ষিত তথ্য-উপাত্তে আবেদনকারীর স্বাক্ষরের অনুরূপ হইতে হইবে।<br/>" +
    "(২) আঠারো বৎসরের কম বয়সী বা অপ্রকৃতিস্থ ঘোষিত কার্ডধারীর ক্ষেত্রে আইনানুগ অভিভাবক স্বাক্ষর করিবেন এবং তাহার NID এর সত্যায়িত কপি জমা দিতে হইবে।<br/>" +
    "(৩) প্রবিধান ১১ অনুযায়ী নির্ধারিত ফি জমা দিয়ে রশিদ সংযুক্ত করিতে হইবে। আবেদনপত্রের সহিত জাতীয় পরিচয়পত্রের মূল কপি অবশ্যই জমা দিতে হইবে।<br/>" +
    "(৪) আবেদন দাখিলের সময় দায়িত্বপ্রাপ্ত কর্মকর্তা আবেদনকারীর ব্যক্তিগত শুনানি গ্রহণ করিবেন। আবেদন নামঞ্জুর হইলে ৪৫ কার্যদিবসের মধ্যে কমিশন বরাবর আপিল করা যাইবে।<br/>" +
    "(৫) নাম (বাংলা/ইংরেজি) ও জন্মতারিখ সংশোধনে ন্যূনতম এসএসসি/সমমান সনদ; চাকুরীরত হইলে সার্ভিস বুক/MPO; অন্যান্য ক্ষেত্রে পাসপোর্ট/জন্ম নিবন্ধন/ড্রাইভিং লাইসেন্স/কাবিননামা এবং নাম পরিবর্তন বা ধর্ম পরিবর্তনের ক্ষেত্রে ম্যাজিস্ট্রেট কোর্টের হলফনামা ও পত্রিকায় বিজ্ঞপ্তির কপি প্রয়োজন।<br/>" +
    "(৬) বিবাহ বা তালাক বা অন্য কারণে কোনো মহিলা স্বামীর নাম সংযোজন, বিয়োজন বা সংশোধন করিতে চাহিলে কাবিননামা/তালাকনামা/মৃত্যু সনদ/ম্যাজিস্ট্রেট কোর্টের হলফনামা/বিবাহ বিচ্ছেদ ডিক্রির সত্যায়িত অনুলিপি জমা দিতে হইবে। প্রয়োজনে সরেজমিন তদন্ত করা হইবে।<br/>" +
    "(৭) পিতা/মাতার নাম সংশোধনে আবেদনকারীর এসএসসি/এইচএসসি বা সমমান সনদপত্র এবং পিতা, মাতা, ভাই ও বোনের NID এর সত্যায়িত অনুলিপি দিতে হইবে। নামের পূর্বে 'মৃত' সংযোজন বা বিয়োজনে মৃত্যু সনদ বা জীবিত থাকার সমর্থনে ইউপি চেয়ারম্যান/মেয়র/কাউন্সিলরের প্রত্যয়নপত্র প্রয়োজন।<br/>" +
    "(৮) ঠিকানা সংশোধনে বাড়ির দলিল/টেলিফোন, গ্যাস বা পানির বিল/বাড়িভাড়ার চুক্তিপত্র বা রশিদের সত্যায়িত অনুলিপি; রক্তের গ্রুপ সংশোধনে ডাক্তারী সনদপত্র; শিক্ষাগত যোগ্যতা সংশোধনে সর্বোচ্চ শিক্ষাগত যোগ্যতার সনদপত্র এবং টিআইএন/ড্রাইভিং লাইসেন্স/পাসপোর্ট সংশোধনে সংশ্লিষ্ট দলিলের সত্যায়িত অনুলিপি দিতে হইবে।<br/>" +
    "(৯) আবেদনপত্রের সহিত দাখিলকৃত অনুলিপিসমূহ সংসদ সদস্য, স্থানীয় সরকারের নির্বাচিত জনপ্রতিনিধি, গেজেটেড সরকারি কর্মকর্তা অথবা মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা প্রতিষ্ঠানের প্রধান কর্তৃক সত্যায়িত হইতে হইবে। অসম্পূর্ণ বা ত্রুটিপূর্ণ আবেদন সরাসরি বাতিল বলিয়া গণ্য হইবে।";

  // মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক
  function openForm2Modal() {
      setActiveMode('mode-form2-maker'); // ড্যাশবোর্ড বাটন হাইলাইট করবে
      const modal = document.getElementById('form2Modal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে [1.1.2]
          setupDefaultF2Dates(); // ডিফল্ট ডেট সেট করবে
          updateForm2Preview(); // ইনিশিয়াল প্রিভিউ রেন্ডার করবে
      }
  }

  function closeForm2Modal() {
      const modal = document.getElementById('form2Modal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল সচল হবে [1.1.2]
          clearForm2Form(); // মেমোরি ক্যাশ ক্লিয়ার করবে
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

  // রিয়াল-টাইম ইনপুট ডেটা প্রিভিউ আপডেট লজিক
  function updateForm2Preview() {
      // ডম মেমোরি লিক ও ক্র্যাশ এড়াতে নিরাপদ ভ্যালু রিডার
      const getVal = (id, fallback) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : fallback;
      };

      const setTxt = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.innerText = val;
      };

      // ১. ডাটা রিড করবে
      const holderName = getVal('f2HolderName', '') || '';
      const holderNid = getVal('f2HolderNid', '') || '';
      const guardName = getVal('f2GuardName', '') || '';
      const guardNid = getVal('f2GuardNid', '') || '';

      const curNameBn = getVal('f2CurNameBn', '') || '';
      const chgNameBn = getVal('f2ChgNameBn', '') || '';
      const docNameBn = getVal('f2DocNameBn', '') || '';

      const curNameEn = getVal('f2CurNameEn', '') || '';
      const chgNameEn = getVal('f2ChgNameEn', '') || '';
      const docNameEn = getVal('f2DocNameEn', '') || '';

      const curFather = getVal('f2CurFather', '') || '';
      const chgFather = getVal('f2ChgFather', '') || '';
      const docFather = getVal('f2DocFather', '') || '';

      const curMother = getVal('f2CurMother', '') || '';
      const chgMother = getVal('f2ChgMother', '') || '';
      const docMother = getVal('f2DocMother', '') || '';

      const curSpouse = getVal('f2CurSpouse', '') || '';
      const chgSpouse = getVal('f2ChgSpouse', '') || '';
      const docSpouse = getVal('f2DocSpouse', '') || '';

      const curDob = getVal('f2CurDob', '') || '';
      const chgDob = getVal('f2ChgDob', '') || '';
      const docDob = getVal('f2DocDob', '') || '';

      const curAddress = getVal('f2CurAddress', '') || '';
      const chgAddress = getVal('f2ChgAddress', '') || '';
      const docAddress = getVal('f2DocAddress', '') || '';

      const curBlood = getVal('f2CurBlood', '') || '';
      const chgBlood = getVal('f2ChgBlood', '') || '';
      const docBlood = getVal('f2DocBlood', '') || '';

      const curOther = getVal('f2CurOther', '') || '';
      const chgOther = getVal('f2ChgOther', '') || '';
      const docOther = getVal('f2DocOther', '') || '';

      const feeAmount = getVal('f2FeeAmount', '') || '';
      const feeReceipt = getVal('f2FeeReceipt', '') || '';
      const docsList = getVal('f2DocsList', '') || '';

      const appName = getVal('f2AppName', '') || '';
      const appPhone = getVal('f2AppPhone', '') || '';
      const appAddress = getVal('f2AppAddress', '') || '';
      const appEmail = getVal('f2AppEmail', '') || '';

      const guardSignName = getVal('f2GuardSignName', '') || '';
      const guardSignPhone = getVal('f2GuardSignPhone', '') || '';
      const guardSignAddress = getVal('f2GuardSignAddress', '') || '';
      const guardSignEmail = getVal('f2GuardSignEmail', '') || '';

      // ২. পেপার প্রিভিউ আপডেট করবে (খালি থাকলে ব্লাঙ্ক থাকবে)
      setTxt('p-holder-name', holderName);
      setTxt('p-holder-nid', holderNid);
      setTxt('p-guard-name', guardName);
      setTxt('p-guard-nid', guardNid);

      setTxt('p-cur-name-bn', curNameBn);
      setTxt('p-chg-name-bn', chgNameBn);
      setTxt('p-doc-name-bn', docNameBn);

      setTxt('p-cur-name-en', curNameEn);
      setTxt('p-chg-name-en', chgNameEn);
      setTxt('p-doc-name-en', docNameEn);

      setTxt('p-cur-father', curFather);
      setTxt('p-chg-father', chgFather);
      setTxt('p-doc-father', docFather);

      setTxt('p-cur-mother', curMother);
      setTxt('p-chg-mother', chgMother);
      setTxt('p-doc-mother', docMother);

      setTxt('p-cur-spouse', curSpouse);
      setTxt('p-chg-spouse', chgSpouse);
      setTxt('p-doc-spouse', docSpouse);

      setTxt('p-cur-dob', curDob);
      setTxt('p-chg-dob', chgDob);
      setTxt('p-doc-dob', docDob);

      setTxt('p-cur-address', curAddress);
      setTxt('p-chg-address', chgAddress);
      setTxt('p-doc-address', docAddress);

      setTxt('p-cur-blood', curBlood);
      setTxt('p-chg-blood', chgBlood);
      setTxt('p-doc-blood', docBlood);

      setTxt('p-cur-other', curOther);
      setTxt('p-chg-other', chgOther);
      setTxt('p-doc-other', docOther);

      setTxt('p-fee-amount', feeAmount);
      setTxt('p-fee-receipt', feeReceipt);
      setTxt('p-docs-list', docsList);

      setTxt('p-a-sign-name', appName);
      setTxt('p-a-sign-phone', appPhone);
      setTxt('p-a-sign-address', appAddress);
      setTxt('p-a-sign-email', appEmail);

      setTxt('p-g-sign-name', guardSignName);
      setTxt('p-g-sign-phone', guardSignPhone);
      setTxt('p-g-sign-address', guardSignAddress);
      setTxt('p-g-sign-email', guardSignEmail);

      // ৩. হিডেন পিডিএফ টেমপ্লেট ও আপডেট করবে
      setTxt('pdf-f2-holder-name', holderName);
      setTxt('pdf-f2-holder-nid', holderNid);
      setTxt('pdf-f2-guard-name', guardName);
      setTxt('pdf-f2-guard-nid', guardNid);

      setTxt('pdf-f2-cur-name-bn', curNameBn);
      setTxt('pdf-f2-chg-name-bn', chgNameBn);
      setTxt('pdf-f2-doc-name-bn', docNameBn);

      setTxt('pdf-f2-cur-name-en', curNameEn);
      setTxt('pdf-f2-chg-name-en', chgNameEn);
      setTxt('pdf-f2-doc-name-en', docNameEn);

      setTxt('pdf-f2-cur-father', curFather);
      setTxt('pdf-f2-chg-father', chgFather);
      setTxt('pdf-f2-doc-father', docFather);

      setTxt('pdf-f2-cur-mother', curMother);
      setTxt('pdf-f2-chg-mother', chgMother);
      setTxt('pdf-f2-doc-mother', docMother);

      setTxt('pdf-f2-cur-spouse', curSpouse);
      setTxt('pdf-f2-chg-spouse', chgSpouse);
      setTxt('pdf-f2-doc-spouse', docSpouse);

      setTxt('pdf-f2-cur-dob', curDob);
      setTxt('pdf-f2-chg-dob', chgDob);
      setTxt('pdf-f2-doc-dob', docDob);

      setTxt('pdf-f2-cur-address', curAddress);
      setTxt('pdf-f2-chg-address', chgAddress);
      setTxt('pdf-f2-doc-address', docAddress);

      setTxt('pdf-f2-cur-blood', curBlood);
      setTxt('pdf-f2-chg-blood', chgBlood);
      setTxt('pdf-f2-doc-blood', docBlood);

      setTxt('pdf-f2-cur-other', curOther);
      setTxt('pdf-f2-chg-other', chgOther);
      setTxt('pdf-f2-doc-other', docOther);

      setTxt('pdf-f2-fee-amount', feeAmount);
      setTxt('pdf-f2-fee-receipt', feeReceipt);
      setTxt('pdf-f2-docs-list', docsList);

      setTxt('pdf-f2-a-sign-name', appName);
      setTxt('pdf-f2-a-sign-phone', appPhone);
      setTxt('pdf-f2-a-sign-address', appAddress);
      setTxt('pdf-f2-a-sign-email', appEmail);

      setTxt('pdf-f2-g-sign-name', guardSignName);
      setTxt('pdf-f2-g-sign-phone', guardSignPhone);
      setTxt('pdf-f2-g-sign-address', guardSignAddress);
      setTxt('pdf-f2-g-sign-email', guardSignEmail);

      // ৪. ডাইনামিক ১৬টি নির্দেশাবলী ইনজেকশন (NEW UPDATE)
      const pBox = document.getElementById('p-instructions-box');
      const pdfBox = document.getElementById('pdf-instructions-box');
      if (pBox) pBox.innerHTML = officialNidInstructions;
      if (pdfBox) pdfBox.innerHTML = officialNidInstructions;
  }

  // রিয়াল-টাইম ২-পৃষ্ঠা ৪কে ভেক্টর পিডিএফ জেনারেশন ও ডাউনলোড/প্রিন্ট (গ্যারান্টিড রান লজিক)
  async function startForm2Generation(action) {
      const statusEl = document.getElementById('form2Status');
      const generateBtn = document.getElementById('f2GenerateBtn');
      const printBtn = document.getElementById('f2PrintBtn');

      statusEl.innerText = 'পিডিএফ তৈরি করা হচ্ছে...';
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          // জেনারেট করার ঠিক আগে রি-সিঙ্ক করবে
          updateForm2Preview();

          const page1 = document.getElementById('f2PdfPage1');
          const page2 = document.getElementById('f2PdfPage2');
          
          // গ্লোবাল নেমস্পেস অটো-রিকোভারি চেকার (CORS/Blogger-ফ্রেন্ডলি) [2]
          let jsPDFClass = null;
          if (window.jspdf && window.jspdf.jsPDF) {
              jsPDFClass = window.jspdf.jsPDF;
          } else if (window.jsPDF) {
              jsPDFClass = window.jsPDF;
          }

          if (!jsPDFClass || typeof window.html2canvas === 'undefined') {
              throw new Error("পিডিএফ লোড হচ্ছে অনুগ্রহ করে ৫ সেকেন্ড অপেক্ষা করুন।");
          }

          const pdf = new jsPDFClass('p', 'mm', 'a4');

          // ১. প্রথম পেজ স্ন্যাপশট নেবে (allowTaint যুক্ত করা হয়েছে সিকিউরড ইমেজ রেন্ডারিংয়ের জন্য) [2]
          html2canvas(page1, {
              scale: 2, 
              useCORS: true,
              allowTaint: true, // ব্রাউজার সিকিউরিটি পলিসি বাইপাস করবে [2]
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
                  allowTaint: true, // ব্রাউজার সিকিউরিটি পলিসি বাইপাস করবে [2]
                  logging: false
              }).then(function(canvas2) {
                  const imgData2 = canvas2.toDataURL('image/jpeg', 1.0);
                  pdf.addImage(imgData2, 'JPEG', 0, 0, 210, 297);

                  // কাস্টমারের নাম ইনপুট না থাকলে ডিফল্ট 'Draft' নামে সেভ হবে (ভ্যালিডেশন ওয়ার্নিং বাইপাস)
                  const rawName = document.getElementById('f2AppName').value.trim();
                  const cleanName = rawName ? rawName.replace(/\s+/g, '_') : 'Draft';
                  const fileName = `nid_form_2_${cleanName}.pdf`;

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
                      statusEl.innerText = 'পিডিএফ হিসেবে সেভ করা হচ্ছে...';
                      pdf.save(fileName);
                      statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> ফরম সফলভাবে তৈরি হয়েছে!</span>';
                  }

                  generateBtn.disabled = false;
                  printBtn.disabled = false;
              }).catch(function(err) {
                  console.error("Page 2 render failed", err);
                  statusEl.innerText = 'পিডিএফ জেনারেট করতে সমস্যা হয়েছে';
                  generateBtn.disabled = false;
                  printBtn.disabled = false;
              });
          }).catch(function(err) {
              console.error("Page 1 render failed", err);
              statusEl.innerText = 'পিডিএফ জেনারেট করতে সমস্যা হয়েছে';
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

  // ফর্ম ক্লিয়ার লজিক (কোম্পানির ডেটা ও ডিফল্ট তথ্য মুছবে না) [1.1.2]
  function clearForm2Form() {
      // সমস্ত ইনপুট ফিল্ড খালি করবে [1.1.2]
      const inputs = document.querySelectorAll('.f2-form-scroll input');
      inputs.forEach(input => input.value = '');

      setupDefaultF2Dates();
      updateForm2Preview(); // ক্লিয়ার প্রিভিউ
      
      document.getElementById('form2Status').innerText = 'ফরম ডাউনলোড বা প্রিন্ট করার জন্য প্রস্তুত';
      document.getElementById('f2GenerateBtn').disabled = false;
      document.getElementById('f2PrintBtn').disabled = false;
  }

  // সাকসেস ডেট সেটিংস (অটো-ডেট উইদাউট এরর) [1.1.2]
  function setupDefaultF2Dates() {
      // Form-2 doesn't strictly have initial date inputs to autofill except maybe just triggering render
  }
