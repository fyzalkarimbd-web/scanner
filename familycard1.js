function openFamilyCardModal() {
   setActiveMode('mode-family-card');
      document.getElementById('familyCardModa').style.display = 'flex';
      updateFamilyCard();    
  }

  function closeFamilyCardModal() {
      document.getElementById('familyCardModal').style.display = 'none';
  }

  // English to Bangla Number Converter Logic
  const engToBdNum = (str) => {
      const bnMap = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
      return str.replace(/[0-9]/g, match => bnMap[match]);
  };

  function updateFamilyCard() {
      // 1. ইনপুট ডাটা গ্রহণ
      let authority = document.getElementById('fc-authority').value || 'ওয়ার্ড মেম্বার';
      let union = document.getElementById('fc-union').value || '[ইউনিয়ন/পৌরসভার নাম]';
      let name = document.getElementById('fc-name').value || '.........................................................';
      let father = document.getElementById('fc-father').value || '...........................................................';
      let mother = document.getElementById('fc-mother').value || '.................................................................';
      let nid = document.getElementById('fc-nid').value || '......................................................';
      let mobile = document.getElementById('fc-mobile').value || '..............................................................';
      
      let vill = document.getElementById('fc-vill').value || '...........................';
      let po = document.getElementById('fc-po').value || '...........................';
      let wordRaw = document.getElementById('fc-word').value;
      let word = wordRaw ? engToBdNum(wordRaw) : '.........';
      let upz = document.getElementById('fc-upz').value || '...........................';
      let dist = document.getElementById('fc-dist').value || '...........................';

      let sonRaw = document.getElementById('fc-son').value;
      let daughterRaw = document.getElementById('fc-daughter').value;
      let son = sonRaw !== '' ? engToBdNum(sonRaw) : '......';
      let daughter = daughterRaw !== '' ? engToBdNum(daughterRaw) : '......';

      // 2. ডাইনামিক প্রিন্ট টেমপ্লেট (HTML এবং CSS সহ)
      const printContent = `
          <!-- ছবির ফ্রেম -->
          <div style="position: absolute; top: 20mm; right: 20mm; width: 40mm; height: 50mm; border: 1px dashed #000; display: flex; align-items: center; justify-content: center; text-align: center; padding: 5px; font-size: 12px; color: #4b5563;">
              পাসপোর্ট সাইজ ছবি<br/>(স্ট্যাপলার দিয়ে সংযুক্ত করুন)
          </div>

          <!-- টাইটেল -->
          <div style="text-align: center; margin-bottom: 25px; padding-right: 45mm;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 900; color: #000; display: inline-block; border-bottom: 1px solid #000; padding-bottom: 5px; margin-top: 10px;">ফ্যামিলি কার্ড প্রাপ্তির আবেদন</h1>
          </div>

          <!-- আবেদন বডি -->
          <div style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #000;">
              বরাবর,<br/>
              <span style="font-weight: 900; font-size: 18px;">${authority}</span><br/>
              <span style="font-weight: bold;">${union}</span><br/><br/>
              <b style="font-size: 17px;">বিষয়: ফ্যামিলি কার্ড / ফ্যামিলি কার্ড পাওয়ার আবেদন প্রসঙ্গে।</b><br/><br/>
              জনাব,<br/>
              বিনীত নিবেদন এই যে, আমি আপনার এলাকার একজন স্থায়ী বাসিন্দা। আমার পরিবারের বর্তমান আর্থ-সামাজিক অবস্থার প্রেক্ষিতে সরকারি সুবিধাদি ও রেশন পাওয়ার জন্য একটি ফ্যামিলি কার্ড পাওয়া আমার জন্য অত্যন্ত প্রয়োজন। নিচে আমার এবং আমার পরিবারের বিস্তারিত তথ্যাদি প্রদান করা হলো:
          </div>

          <div style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; color: #000;">
              ১। আবেদনকারীর নাম: <b style="font-size: 17px;">${name}</b><br/>
              ২। পিতা/স্বামীর নাম: <span>${father}</span><br/>
              ৩। মাতার নাম: <span>${mother}</span><br/>
              ৪। জাতীয় পরিচয়পত্র নং: <span>${nid}</span><br/>
              ৫। মোবাইল নম্বর: <span>${mobile}</span><br/>
          </div>

          <div style="font-size: 16px; margin-bottom: 8px; color: #000;"><b>৬। বর্তমান ও স্থায়ী ঠিকানা:</b></div>
          <div style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; padding-left: 20px; color: #000;">
              গ্রাম / মহল্লা: <span style="font-weight:bold;">${vill}</span>, 
              ডাকঘর: <span style="font-weight:bold;">${po}</span> <br/>
              ওয়ার্ড নং: <span style="font-weight:bold;">${word}</span>, 
              উপজেলা: <span style="font-weight:bold;">${upz}</span>, 
              জেলা: <span style="font-weight:bold;">${dist}</span>
          </div>

          <div style="font-size: 16px; margin-bottom: 8px; color: #000;"><b>৭। পরিবারের সদস্য বিবরণ:</b></div>
          <div style="font-size: 16px; line-height: 1.8; margin-bottom: 25px; padding-left: 20px; color: #000;">
              ছেলে সন্তান: <b>${son}</b> জন, 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; মেয়ে সন্তান: <b>${daughter}</b> জন।
          </div>

          <div style="font-size: 16px; line-height: 1.6; margin-bottom: 10px; color: #000;">
              অতএব, মহোদয়ের নিকট বিনীত প্রার্থনা, উপরোক্ত তথ্যাদি যাচাইপূর্বক আমাকে একটি ফ্যামিলি কার্ড প্রদানের প্রয়োজনীয় ব্যবস্থা গ্রহণে মর্জি হয়।
          </div>

          <!-- সিগনেচার -->
          <div style="display: flex; justify-content: space-between; font-size: 16px; color: #000; margin-top: auto; padding-top: 20px;">
              <div style="text-align: center; font-weight: bold;">
                  <br/>_______________________<br/>
                  স্বাক্ষর (প্রাপক / ওয়ার্ড প্রতিনিধি)
              </div>
              <div style="text-align: center; font-weight: bold;">
                  <br/>_______________________<br/>
                  আবেদনকারীর স্বাক্ষর
              </div>
          </div>
      `;

      // 3. এইচটিএমএল বক্সে ডাটা যুক্ত করা
      document.getElementById('fc-pdf-container').innerHTML = printContent;
  }

  function downloadFamilyCardPDF() {
    const element = document.getElementById('fc-pdf-container');
    const btn = document.getElementById('btn-fc-download');
    
    // Original styles to restore later
    const originalTransform = element.style.transform;
    const originalMarginBottom = element.style.marginBottom;
    const originalMarginLeft = element.style.marginLeft;
    const originalMarginRight = element.style.marginRight;
    const originalBoxShadow = element.style.boxShadow;

    // Loading state
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ডাউনলোডিং...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // Wait for fonts to be loaded before proceeding
    document.fonts.ready.then(() => {
        // Temporarily remove transform and box-shadow for cleaner capture
        element.style.transform = 'scale(1)'; // Set to full size for capture
        element.style.marginBottom = '0';
        element.style.marginLeft = '0';
        element.style.marginRight = '0';
        element.style.boxShadow = 'none';

        // Add a small delay to ensure browser re-renders with new styles
        setTimeout(() => {
            var opt = {
                margin:       0,
                filename:     'Family_Card_Form_2026.pdf',
                image:        { type: 'jpeg', quality: 1.0 },
                html2canvas:  { 
                    scale: 2, 
                    useCORS: true, 
                    scrollY: 0,
                    logging: true, 
                    allowTaint: true,
                    backgroundColor: null // Transparent background if not explicitly set in CSS
                }, 
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: 'avoid-all' }
            };

            html2pdf().set(opt).from(element).save().then(() => {
                // Restore original styles
                element.style.transform = originalTransform;
                element.style.marginBottom = originalMarginBottom;
                element.style.marginLeft = originalMarginLeft;
                element.style.marginRight = originalMarginRight;
                element.style.boxShadow = originalBoxShadow;
                
                // Restore button
                btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> PDF ডাউনলোড করুন';
                btn.style.opacity = '1';
                btn.disabled = false;
            }).catch(err => {
                console.error("PDF Error: ", err);
                
                // Restore original styles even on error
                element.style.transform = originalTransform;
                element.style.marginBottom = originalMarginBottom;
                element.style.marginLeft = originalMarginLeft;
                element.style.marginRight = originalMarginRight;
                element.style.boxShadow = originalBoxShadow;

                btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> PDF ডাউনলোড করুন';
                btn.style.opacity = '1';
                btn.disabled = false;
                alert("দুঃখিত, PDF তৈরি করতে সমস্যা হচ্ছে। বিস্তারিত জানতে Console চেক করুন।");
            });
        }, 100); // 100ms delay
    }).catch(err => {
        console.error("Font loading error: ", err);
        // Restore button if font loading fails
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> PDF ডাউনলোড করুন';
        btn.style.opacity = '1';
        btn.disabled = false;
        alert("ফন্ট লোড করতে সমস্যা হয়েছে। PDF তৈরি সম্ভব নয়। বিস্তারিত জানতে Console চেক করুন।");
    });
  }

  function resetFamilyCard() {
      const inputs = document.querySelectorAll('#familyCardModal input, #familyCardModal textarea');
      inputs.forEach(input => input.value = '');
      document.getElementById('fc-authority').value = 'ওয়ার্ড মেম্বার';
      updateFamilyCard();
  }

  // অটো ইনিশিয়ালাইজ করার জন্য
  window.addEventListener('load', function() {
      updateFamilyCard();
  });
