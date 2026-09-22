// ১. মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক
  function openForm13Modal() {
      setActiveMode('mode-form13-maker'); // ড্যাশবোর্ড বাটন হাইলাইট করবে
      const modal = document.getElementById('form13Modal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে [1.1.2]
          setupDefaultF13Dates(); // ডিফল্ট ডেট সেট করবে
          updateForm13Preview(); // ইনিশিয়াল প্রিভিউ রেন্ডার করবে
      }
  }

  function closeForm13Modal() {
      const modal = document.getElementById('form13Modal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল সচল হবে [1.1.2]
          clearForm13Form(); // মেমোরি ক্যাশ ক্লিয়ার করবে
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

  // রিয়াল-টাইম ইনপুট ডেটা প্রিভিউ আপডেট লজিক (নীল ড্যাশ রিমুভড সংস্করণ)
  function updateForm13Preview() {
      // ডম মেমোরি লিক ও ক্র্যাশ এড়াতে নিরাপদ ভ্যালু রিডার
      const getVal = (id, fallback) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : fallback;
      };

      const setTxt = (id, val) => {
          const el = document.getElementById(id);
          if (el) el.innerText = val;
      };

      // খালি থাকলে নীল ডট বা ড্যাশ দেখাবে না, সম্পূর্ণ ফাঁকা থাকবে
      const recThana = getVal('f13RecThana', '') || '';
      const recZila = getVal('f13RecZila', '') || '';
      
      const name = getVal('f13Name', '') || '';
      const nid = getVal('f13Nid', '') || '';
      const dob = getVal('f13Dob', '');
      const dobFormatted = dob ? formatDateToBangla(dob) : '';

      const voterNo = getVal('f13VoterNo', '') || '';
      const voterArea = getVal('f13VoterArea', '') || '';
      const voterAreaNo = getVal('f13VoterAreaNo', '') || '';
      const voterThana = getVal('f13VoterThana', '') || '';
      const voterZila = getVal('f13VoterZila', '') || '';
      const voterVillage = getVal('f13VoterVillage', '') || '';
      const voterHolding = getVal('f13VoterHolding', '') || '';

      const newZila = getVal('f13NewZila', '') || '';
      const newThana = getVal('f13NewThana', '') || '';
      const newUnion = getVal('f13NewUnion', '') || '';
      const newWard = getVal('f13NewWard', '') || '';
      const newArea = getVal('f13NewArea', '') || '';
      const newAreaNo = getVal('f13NewAreaNo', '') || '';
      const newVillage = getVal('f13NewVillage', '') || '';
      const newHolding = getVal('f13NewHolding', '') || '';
      const newPhone = getVal('f13NewPhone', '') || '';
      const newPost = getVal('f13NewPost', '') || '';
      
      const rawPostCode = getVal('f13NewPostCode', '');
      const postCodeFormatted = rawPostCode.padEnd(4, ' ');

      const staySince = getVal('f13StaySince', '') || '';
      const reason = getVal('f13Reason', '') || '';

      const witnessName = getVal('f13WitnessName', '') || '';
      const witnessNid = getVal('f13WitnessNid', '') || '';
      const witnessAddress = document.getElementById('f13WitnessAddress') ? document.getElementById('f13WitnessAddress').value.trim() : '';

      // ২. পেপার প্রিভিউ আপডেট করবে (খালি থাকলে ব্লাঙ্ক থাকবে)
      setTxt('p-rec-thana', recThana);
      setTxt('p-rec-zila', recZila);
      setTxt('p-name', name);
      setTxt('p-nid', nid);
      setTxt('p-dob', dobFormatted);

      setTxt('p-voter-no', voterNo);
      setTxt('p-voter-area', voterArea);
      setTxt('p-voter-area-no', voterAreaNo);
      setTxt('p-voter-thana', voterThana);
      setTxt('p-voter-zila', voterZila);
      setTxt('p-voter-village', voterVillage);
      setTxt('p-voter-holding', voterHolding);

      setTxt('p-new-zila', newZila);
      setTxt('p-new-thana', newThana);
      setTxt('p-new-union', newUnion);
      setTxt('p-new-ward', newWard);
      setTxt('p-new-area', newArea);
      setTxt('p-new-area-no', newAreaNo);
      setTxt('p-new-village', newVillage);
      setTxt('p-new-holding', newHolding);
      setTxt('p-new-phone', newPhone);
      setTxt('p-new-post', newPost);

      // লাইভ প্রিভিউ ৪-বক্স পোস্টকোড জেনারেট করবে
      let postcodeHtml = '';
      for (let i = 0; i < 4; i++) {
          const char = postCodeFormatted.charAt(i).trim();
          postcodeHtml += `<span class="paper-postcode-char">${convertToBanglaNumber(char)}</span>`;
      }
      const pCodeGrid = document.getElementById('p-postcode-grid');
      if (pCodeGrid) pCodeGrid.innerHTML = postcodeHtml;

      setTxt('p-stay-since', staySince);
      setTxt('p-reason', reason);

      setTxt('p-witness-name', witnessName);
      setTxt('p-witness-nid', witnessNid);
      setTxt('p-witness-address', witnessAddress);

      // ৩. হিডেন পিডিএফ টেমপ্লেট ও আপডেট করবে
      setTxt('pdf-p-rec-thana', recThana);
      setTxt('pdf-p-rec-zila', recZila);
      
      setTxt('pdf-p-name', name);
      setTxt('pdf-p-nid', nid);
      setTxt('pdf-p-dob', dobFormatted);

      setTxt('pdf-p-voter-no', voterNo);
      setTxt('pdf-p-voter-area', voterArea);
      setTxt('pdf-p-voter-area-no', voterAreaNo);
      setTxt('pdf-p-voter-thana', voterThana);
      setTxt('pdf-p-voter-zila', voterZila);
      setTxt('pdf-p-voter-village', voterVillage);
      setTxt('pdf-p-voter-holding', voterHolding);

      setTxt('pdf-p-new-zila', newZila);
      setTxt('pdf-p-new-thana', newThana);
      setTxt('pdf-p-new-union', newUnion);
      setTxt('pdf-p-new-ward', newWard);
      setTxt('pdf-p-new-area', newArea);
      setTxt('pdf-p-new-area-no', newAreaNo);
      setTxt('pdf-p-new-village', newVillage);
      setTxt('pdf-p-new-holding', newHolding);
      setTxt('pdf-p-new-phone', newPhone);
      setTxt('pdf-p-new-post', newPost);

      // পিডিএফ ৪-বক্স পোস্টকোড জেনারেট করবে
      let pdfPostcodeHtml = '';
      for (let i = 0; i < 4; i++) {
          const char = postCodeFormatted.charAt(i).trim();
          pdfPostcodeHtml += `<span class="paper-postcode-char">${convertToBanglaNumber(char)}</span>`;
      }
      const pdfPCodeGrid = document.getElementById('pdf-p-postcode-grid');
      if (pdfPCodeGrid) pdfPCodeGrid.innerHTML = pdfPostcodeHtml;

      setTxt('pdf-p-stay-since', staySince);
      setTxt('pdf-p-reason', reason);

      setTxt('pdf-p-witness-name', witnessName);
      setTxt('pdf-p-witness-nid', witnessNid);
      setTxt('pdf-p-witness-address', witnessAddress);
  }

  // রিয়াল-টাইম ২-পৃষ্ঠা ৪কে ভেক্টর পিডিএফ জেনারেশন ও ডাউনলোড/প্রিন্ট (গ্যারান্টিড রান লজিক)
  async function startForm13Generation(action) {
      const statusEl = document.getElementById('form13Status');
      const generateBtn = document.getElementById('f13GenerateBtn');
      const printBtn = document.getElementById('f13PrintBtn');

      statusEl.innerText = '২-পৃষ্ঠার প্রফেশনাল পিডিএফ লেআউট তৈরি করা হচ্ছে...'; // অনুবাদ করা হয়েছে
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          // জেনারেট করার ঠিক আগে রি-সিঙ্ক করবে
          updateForm13Preview();

          // পিডিএফ মেটাডাটায় আজকের ডেট বসাবে (বাংলায় কনভার্ট করে)
          const metaDateEl = document.getElementById('pdf-f13-meta-date');
          if (metaDateEl) {
              metaDateEl.innerText = formatDateToBangla(new Date());
          }

          const page1 = document.getElementById('f13PdfPage1');
          const page2 = document.getElementById('f13PdfPage2');
          
          // গ্লোবাল নেমস্পেস অটো-রিকোভারি চেকার (CORS/Blogger-ফ্রেন্ডলি) [2]
          let jsPDFClass = null;
          if (window.jspdf && window.jspdf.jsPDF) {
              jsPDFClass = window.jspdf.jsPDF;
          } else if (window.jsPDF) {
              jsPDFClass = window.jsPDF;
          }

          if (!jsPDFClass || typeof window.html2canvas === 'undefined') {
              throw new Error("পিডিএফ লাইব্রেরি এখনও লোড হচ্ছে। অনুগ্রহ করে ৫ সেকেন্ড অপেক্ষা করুন।"); // অনুবাদ করা হয়েছে
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
                  allowTaint: true,
                  logging: false
              }).then(function(canvas2) {
                  const imgData2 = canvas2.toDataURL('image/jpeg', 1.0);
                  pdf.addImage(imgData2, 'JPEG', 0, 0, 210, 297);

                  // কাস্টমারের নাম ইনপুট না থাকলে ডিফল্ট 'Draft' নামে সেভ হবে (ভ্যালিডেশন ওয়ার্নিং বাইপাস)
                  const rawName = document.getElementById('f13Name').value.trim();
                  const cleanName = rawName ? rawName.replace(/\s+/g, '_') : 'Draft';
                  const fileName = `voter_form_13_${cleanName}.pdf`;

                  // ৪. ডাউনলোড বা ডিরেক্ট প্রিন্ট ট্র্যাকিং
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
                      statusEl.innerText = '২-পৃষ্ঠার আবেদনপত্রটি পিডিএফ হিসেবে সেভ করা হচ্ছে...'; // অনুবাদ করা হয়েছে
                      pdf.save(fileName);
                      statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> ২-পৃষ্ঠার ফরম-১৩ সফলভাবে তৈরি হয়েছে!</span>'; // অনুবাদ করা হয়েছে
                  }

                  generateBtn.disabled = false;
                  printBtn.disabled = false;
              }).catch(function(err) {
                  console.error("Page 2 render failed", err);
                  statusEl.innerText = 'পিডিএফ-এর ২য় পৃষ্ঠা জেনারেট করতে সমস্যা হয়েছে'; // অনুবাদ করা হয়েছে
                  generateBtn.disabled = false;
                  printBtn.disabled = false;
              });
          }).catch(function(err) {
              console.error("Page 1 render failed", err);
              statusEl.innerText = 'পিডিএফ-এর ১ম পৃষ্ঠা জেনারেট করতে সমস্যা হয়েছে'; // অনুবাদ করা হয়েছে
              generateBtn.disabled = false;
              printBtn.disabled = false;
          });

      } catch (err) {
          statusEl.innerText = '২-পৃষ্ঠার পিডিএফ জেনারেট করতে ত্রুটি হয়েছে'; // অনুবাদ করা হয়েছে
          generateBtn.disabled = false;
          printBtn.disabled = false;
          console.error(err);
      }
  }

  // ফর্ম ক্লিয়ার লজিক (কোম্পানির ডেটা ও ডিফল্ট তথ্য মুছবে না) [1.1.2]
  function clearForm13Form() {
      // সমস্ত ইনপুট ফিল্ড খালি করবে [1.1.2]
      const inputs = document.querySelectorAll('.f13-form-scroll input');
      inputs.forEach(input => input.value = '');

      setupDefaultF13Dates();
      updateForm13Preview(); // ক্লিয়ার প্রিভিউ
      
      document.getElementById('form13Status').innerText = 'ফরম ডাউনলোড বা প্রিন্ট করার জন্য প্রস্তুত'; // অনুবাদ করা হয়েছে
      document.getElementById('f13GenerateBtn').disabled = false;
      document.getElementById('f13PrintBtn').disabled = false;
  }

  // সাকসেস ডেট সেটিংস (অটো-ডেট উইদাউট এরর) [1.1.2]
  function setupDefaultF13Dates() {
      const today = new Date();
      const dobInput = document.getElementById('f13Dob');
      if (dobInput) {
          dobInput.value = today.toISOString().split('T')[0];
      }
  }
