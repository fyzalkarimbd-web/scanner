function openOmrModal() {
setActiveMode('mode-omr');
    document.getElementById('omrModal').style.display = 'flex';
}

let affLang = 'bn';

const affTemplates = {
  bn: {
    nid: { title: 'জাতীয় পরিচয়পত্র সংশোধনের হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, মাতা: {{mother}}, ঠিকানা: {{address}}। আমি একজন বাংলাদেশের জন্মসূত্রে স্থায়ী নাগরিক এবং অত্র এলাকার বাসিন্দা। আমি অত্র হলফনামা দ্বারা এই মর্মে শপথপূর্বক ঘোষণা করিতেছি যে, আমার জাতীয় পরিচয়পত্রে আমার তথ্য ভুলবশত {{wrong}} আসিয়াছে। প্রকৃতপক্ষে দাপ্তরিক ও পারিবারিক রেকর্ড অনুযায়ী আমার সঠিক তথ্য হইবে {{correct}}। উক্ত ভুল তথ্য সংশোধন করা আমার জন্য একান্ত আবশ্যক। অত্র হলফনামার মাধ্যমে আমি যথাযথ কর্তৃপক্ষের নিকট এই তথ্য সংশোধনের জোর দাবি জানাইতেছি। আমার এই ঘোষণা জ্ঞানত সত্য এবং সঠিক।' },
    name: { title: 'নাম পরিবর্তনের হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, ঠিকানা: {{address}}। এই মর্মে ঘোষণা করিতেছি যে, আমার প্রকৃত ও আইনসম্মত নাম হইল {{correct}}। কিন্তু আমার বিভিন্ন গুরুত্বপূর্ণ কাগজপত্রে এবং পূর্ববর্তী রেকর্ডে অসাবধানতাবশত আমার নাম {{wrong}} লিপিবদ্ধ হইয়াছে। অদ্য হইতে আমি সর্বক্ষেত্রে এবং সকল প্রকার দাপ্তরিক কার্যাদিতে আমার ভুল নামের পরিবর্তে সঠিক নাম {{correct}} ব্যবহার করিব। ইহা ব্যতীত অন্য কোন নাম আমার বলিয়া গণ্য হইবে না। অত্র হলফনামা দ্বারা আমি আমার নাম পরিবর্তনের আইনগত ঘোষণা প্রদান করিলাম।' },
    edu: { title: 'শিক্ষাগত সনদ সংশোধনের হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, মাতা: {{mother}}, ঠিকানা: {{address}}। ঘোষণা করিতেছি যে, আমার মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ডের সার্টিফিকেট ও অন্যান্য শিক্ষাগত সনদে আমার তথ্য ভুলবশত {{wrong}} লিপিবদ্ধ হইয়াছে। প্রকৃতপক্ষে আমার জন্ম নিবন্ধন ও অন্যান্য সঠিক রেকর্ড অনুযায়ী প্রকৃত তথ্য হইবে {{correct}}। অত্র হলফনামা দ্বারা আমি সংশ্লিষ্ট শিক্ষা বোর্ড ও কর্তৃপক্ষকে আমার সনদে এই তথ্য সংশোধনের জন্য অনুরোধ জানাইতেছি। ইহা সত্য এবং আমার জ্ঞানমতে কোন তথ্য গোপন করা হয় নাই।' },
    dob: { title: 'জন্ম তারিখ সংশোধনের হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, ঠিকানা: {{address}}। আমি এই মর্মে শপথপূর্বক ঘোষণা করিতেছি যে, আমার জন্ম নিবন্ধন ও ভোটার তালিকায় আমার জন্ম তারিখ ভুলবশত {{wrong}} মুদ্রিত হইয়াছে। প্রকৃতপক্ষে আমার মেডিকেল সার্টিফিকেট ও পারিবারিক সঠিক তথ্য অনুযায়ী আমার প্রকৃত জন্ম তারিখ হইবে {{correct}}। দাপ্তরিক প্রয়োজনে এই সংশোধন একান্ত জরুরি। আমি ঘোষণা করিতেছি যে, এই হলফনামার বর্ণনা আমার জানামতে সম্পূর্ণ সত্য ও নিখুঁত।' },
    warish: { title: 'ওয়ারিশ বা উত্তরাধিকার সংক্রান্ত হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, ঠিকানা: {{address}}। এই মর্মে হলফপূর্বক ঘোষণা করিতেছি যে, আমার নিকটাত্মীয় মরহুম {{wrong}} গত ইংরেজি তারিখ- ............. তারিখে মৃত্যুবরণ করিয়াছেন। মৃত্যুকালে তাঁহার একমাত্র বৈধ ওয়ারিশ বা উত্তরাধিকারীগণ হইলেন {{correct}}। আমরা ব্যতীত তাঁহার আর কোন ওয়ারিশ বা অংশীদার নাই। এই হলফনামা দ্বারা উত্তরাধিকারীগণ যথাযথ পাওনা ও সম্পদ বুঝিয়া লওয়ার আইনগত দাবিদার বলিয়া ঘোষিত হইলাম।' },
    religion: { title: 'ধর্ম পরিবর্তনের হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, ঠিকানা: {{address}}। আমি অত্র হলফনামা দ্বারা এই মর্মে ঘোষণা করিতেছি যে, আমি ইতিপূর্বে {{wrong}} ধর্মের অনুসারী ছিলাম। বর্তমানে আমি সজ্ঞানে ও স্বেচ্ছায় ইসলাম ধর্ম গ্রহণ করিয়াছি এবং আমার বর্তমান ধর্ম ইসলাম। ইসলাম ধর্ম গ্রহণপূর্বক আমার বর্তমান নাম রাখিয়াছি {{correct}}। অদ্য হইতে আমি ইসলামের সকল নিয়ম-কানুন মানিয়া চলিব এবং দাপ্তরিক সকল কাজে আমার বর্তমান নাম ও ধর্ম ব্যবহার করিব। ইসলাম ছাড়া অন্য কোন ধর্মের প্রতি আমার আর কোন আনুগত্য নাই।' },
    marriage: { title: 'বিবাহ বা কাবিননামা সংশোধনের হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, ঠিকানা: {{address}}। ঘোষণা করিতেছি যে, আমার কাবিননামা বা বিবাহ নিবন্ধনের নথিতে আমার বৈবাহিক তথ্যাদি ভুলবশত {{wrong}} লিপিবদ্ধ হইয়াছে। প্রকৃতপক্ষে শরিয়ত ও প্রচলিত আইন অনুযায়ী সঠিক তথ্য হইবে {{correct}}। অত্র হলফনামা দ্বারা আমি বিবাহের সঠিক নথিপত্র প্রস্তুত করার ঘোষণা প্রদান করিতেছি এবং সংশ্লিষ্ট রেজিস্টারকে তথ্য সংশোধনের জন্য অবহিত করিতেছি।' },
    passport: { title: 'পাসপোর্ট তথ্য সংশোধনের হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, ঠিকানা: {{address}}। এই মর্মে হলফপূর্বক ঘোষণা করিতেছি যে, আমার পুরাতন পাসপোর্ট অথবা জন্ম সনদে আমার তথ্য {{wrong}} লিপিবদ্ধ রহিয়াছে। বর্তমানে আমার জাতীয় পরিচয়পত্র (NID) ও আধুনিক রেকর্ড অনুযায়ী আমার সঠিক তথ্য হইবে {{correct}}। আমি আমার নতুন পাসপোর্টে উক্ত সঠিক তথ্য ব্যবহারের ঘোষণা প্রদান করিতেছি এবং পাসপোর্ট অধিদপ্তরকে ইহা সংশোধনের জন্য সবিনয় অনুরোধ করিতেছি।' },
    general: { title: 'সাধারণ বা বিবিধ হলফনামা', text: 'আমি, {{name}}, পিতা: {{father}}, মাতা: {{mother}}, ঠিকানা: {{address}}। আমি এই মর্মে শপথপূর্বক ঘোষণা করিতেছি যে, {{wrong}}। প্রকৃতপক্ষে সঠিক বিষয় হইল {{correct}}। অত্র হলফনামার যাবতীয় বর্ণনা আমার জ্ঞান ও বিশ্বাসমতে সত্য এবং কোন প্রকার তথ্য গোপন করা হয় নাই। দাপ্তরিক যে কোন প্রয়োজনে এই হলফনামা ব্যবহারের আইনগত ঘোষণা প্রদান করিলাম।' }
  },
  en: {
    nid: { title: 'Affidavit for NID Correction', text: 'I, {{name}}, Son/Daughter of {{father}}, Mother: {{mother}}, Address: {{address}}, do hereby solemnly affirm and declare on oath that I am a permanent citizen of Bangladesh. Due to a clerical error, my NID card displays {{wrong}} as my personal information. According to my legal documents and birth certificate, the correct information should be {{correct}}. I declare that this statement is true and correct to the best of my knowledge and I request the concerned authority to update my records accordingly.' },
    name: { title: 'Affidavit for Name Change', text: 'I, {{name}}, Son/Daughter of {{father}}, Address: {{address}}, do hereby solemnly declare that my real and legal name is {{correct}}. However, in some previous documents and official records, my name has been mistakenly mentioned as {{wrong}}. From today onwards, I shall be known by the name {{correct}} for all official, legal, and personal purposes. No other name shall be attributed to me hereafter. This affidavit serves as a legal declaration of my name change.' },
    dob: { title: 'Affidavit for Date of Birth Correction', text: 'I, {{name}}, Son/Daughter of {{father}}, Address: {{address}}, do hereby affirm on oath that in my academic records/NID, my date of birth is recorded as {{wrong}}. Based on my primary birth registration and medical records, my actual and correct date of birth is {{correct}}. This correction is essential for my future administrative and legal needs. I certify that this information is accurate and no facts have been concealed.' },
    edu: { title: 'Affidavit for Educational Certificate Correction', text: 'I, {{name}}, Son/Daughter of {{father}}, Mother: {{mother}}, Address: {{address}}, do hereby declare that in my SSC/HSC certificate, my details have been wrongly printed as {{wrong}}. My actual details as per the National Identity Card and Birth Certificate are {{correct}}. I hereby request the Education Board and concerned authorities to correct my academic certificates based on this legal affidavit.' },
    passport: { title: 'Affidavit for Passport Information Correction', text: 'I, {{name}}, Son/Daughter of {{father}}, Address: {{address}}, solemnly declare that there is a discrepancy in my passport records. My information is currently stated as {{wrong}}. According to my updated NID and legal documents, the correct data should be {{correct}}. I request the Passport Authority to issue my new passport with the rectified information. All statements made here are true and verified by me.' },
    marital: { title: 'Affidavit for Marital Status Declaration', text: 'I, {{name}}, Son/Daughter of {{father}}, Address: {{address}}, do hereby declare my marital status. In certain records, it is wrongly mentioned as {{wrong}}. The actual fact is that I am {{correct}} (Married/Single). I provide this statement as a legal declaration for official documentation and verify that all information provided is genuine.' },
    general: { title: 'General Affidavit', text: 'I, {{name}}, Son/Daughter of {{father}}, Mother: {{mother}}, Address: {{address}}, do hereby solemnly affirm and declare that {{wrong}}. The factual reality of the matter is {{correct}}. This affidavit is executed for legal purposes to be presented before the concerned authorities. I state that the contents of this affidavit are true to the best of my knowledge.' }
  }
};

function adjustAffPreviewScale() {
    const container = document.querySelector('.aff-preview-scroll');
    const wrapper = document.getElementById('aff-wrapper');
    const paper = document.getElementById('aff-editor-box');
    if (!container || !paper) return;
    const containerWidth = container.offsetWidth - 30;
    const paperWidth = 812; 
    if (containerWidth < paperWidth) {
        const scale = containerWidth / paperWidth;
        wrapper.style.transform = `scale(${scale})`;
        const newHeight = paper.offsetHeight * scale;
        container.style.height = (newHeight + 50) + "px";
    } else {
        wrapper.style.transform = 'scale(1)';
        container.style.height = "auto";
    }
}

window.addEventListener('resize', adjustAffPreviewScale);

function openAffidavitModal() {
     setActiveMode('mode-affidavit');
    document.getElementById('affidavitModal').style.display = 'flex';
    setAffLang('bn');
    setTimeout(adjustAffPreviewScale, 300);
}

document.getElementById('aff-body-ui').addEventListener('paste', function(e) {
    e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
});

function closeAffidavitModal() {
    document.getElementById('affidavitModal').style.display = 'none';
}

function setAffLang(lang) {
    affLang = lang;
    document.getElementById('aff-bn-btn').classList.toggle('active', lang === 'bn');
    document.getElementById('aff-en-btn').classList.toggle('active', lang === 'en');
    const isBN = lang === 'bn';
    
    // UI Label Switching
    document.getElementById('aff-main-title').innerHTML = isBN ? "<i class='fa-solid fa-file-contract'/> এফিডেভিট রাইটিং" : "<i class='fa-solid fa-file-contract'/> Affidavit Writing";
    document.getElementById('lbl-aff-temp').innerText = isBN ? 'টেমপ্লেট নির্বাচন করুন' : 'Select Template';
    document.getElementById('lbl-aff-name').innerText = isBN ? 'হলফকারীর নাম' : 'Name of Deponent';
    document.getElementById('lbl-aff-father').innerText = isBN ? 'পিতা/স্বামীর নাম' : 'Father/Husband Name';
    document.getElementById('lbl-aff-mother').innerText = isBN ? 'মাতার নাম' : 'Mother Name';
    document.getElementById('lbl-aff-addr').innerText = isBN ? 'ঠিকানা' : 'Full Address';
    document.getElementById('lbl-aff-wrong').innerText = isBN ? 'ভুল তথ্য (যা আছে)' : 'Incorrect Info';
    document.getElementById('lbl-aff-correct').innerText = isBN ? 'সঠিক তথ্য (যা হবে)' : 'Correct Info';
    document.getElementById('lbl-aff-margin').innerText = isBN ? 'স্ট্যাম্প টপ স্পেস (Inch)' : 'Stamp Top Space (Inch)';
    document.getElementById('lbl-sig-1').innerText = isBN ? 'তদন্তকারী কর্মকর্তা' : 'Attesting Officer';
    document.getElementById('lbl-sig-2').innerText = isBN ? 'হলফকারীর স্বাক্ষর' : 'Deponent Signature';
    document.getElementById('lbl-aff-preview-hint').innerText = isBN ? 'স্ট্যাম্প প্রিভিউ (ইমেজটি প্রিন্টে আসবে না)' : 'STAMP PREVIEW (IMAGE WILL NOT PRINT)';

    // Intro Box Switching
    document.getElementById('aff-intro-box').innerHTML = isBN ? 
        "<b>নির্দেশনা:</b> এটি লিগ্যাল সাইজ (২১৫ মিমি x ৩৪৫ মিম) স্ট্যাম্প পেপারের জন্য তৈরি। প্রিন্ট করার সময় শুধুমাত্র আপনার টাইপ করা লেখাগুলো প্রিন্ট হবে, স্ট্যাম্পের ব্যাকগ্রাউন্ড ইমেজটি প্রিন্ট হবে না।" : 
        "<b>Note:</b> This is designed for Legal Size (215mm x 345mm) stamp paper. Only your typed text will be printed; the stamp background image will not appear in the print.";

    const select = document.getElementById('aff-template-select');
    select.innerHTML = '';
    const data = affTemplates[lang];
    for (let key in data) {
        let opt = document.createElement('option');
        opt.value = key; opt.innerText = data[key].title;
        select.appendChild(opt);
    }
    applyAffTemplate(select.value);
}

function applyAffTemplate(key) {
    window.currentAffKey = key;
    updateAffPreview();
}

function updateAffPreview() {
    const data = affTemplates[affLang][window.currentAffKey];
    document.getElementById('aff-title-ui').innerText = data.title;
    const inputs = {
        name: document.getElementById('aff-name').value || '.......',
        father: document.getElementById('aff-father').value || '.......',
        mother: document.getElementById('aff-mother').value || '.......',
        address: document.getElementById('aff-address').value || '.......',
        wrong: document.getElementById('aff-wrong').value || '.......',
        correct: document.getElementById('aff-correct').value || '.......'
    };
    let body = data.text;
    for (let key in inputs) {
        body = body.replace(new RegExp(`{{${key}}}`, 'g'), `<b style="color:#000">${inputs[key]}</b>`);
    }
    document.getElementById('aff-body-ui').innerHTML = body;
}

function updateAffMargin(val) {
    document.getElementById('aff-top-margin').style.height = val + 'px';
    document.getElementById('aff-margin-val').innerText = (val / 100).toFixed(1) + " Inch";
}

function printAffidavit() {
    const marginHeight = document.getElementById('aff-top-margin').offsetHeight;
    const title = document.getElementById('aff-title-ui').innerText;
    const body = document.getElementById('aff-body-ui').innerHTML;
    const sig1 = document.getElementById('lbl-sig-1').innerText;
    const sig2 = document.getElementById('lbl-sig-2').innerText;

    const printWindow = window.open('', '', 'width=900,height=1000');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Affidavit</title>
            <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">
            <style>
                @page { size: 215mm 345mm; margin: 0; }
                body { margin: 0; padding: 0; background: #fff; -webkit-print-color-adjust: exact; }
                .print-container { width: 215mm; min-height: 345mm; margin: 0 auto; padding: 20mm; font-family: 'SolaimanLipi', Arial, sans-serif; box-sizing: border-box; color: #000; text-align: justify; position: relative; }
                .top-space { height: ${marginHeight}px; }
                .title { text-align: center; text-decoration: underline; font-size: 24px; margin-bottom: 30px; font-weight: bold; }
                .body-content { line-height: 1.8; font-size: 18px; min-height: 500px; word-wrap: break-word; overflow-wrap: break-word; white-space: pre-wrap; width: 100%; }
                .footer { margin-top: 80px; display: flex; justify-content: space-between; align-items: flex-start; font-weight: bold; font-size: 16px; width: 100%; }
                .sig-box { text-align: center; min-width: 150px; }
            </style>
        </head>
        <body>
            <div class="print-container">
                <div class="top-space"></div>
                <div class="title">${title}</div>
                <div class="body-content">${body}</div>
                <div class="footer">
                    <div class="sig-box"><br>________________<br>${sig1}</div>
                    <div class="sig-box"><br>________________<br>${sig2}</div>
                </div>
            </div>
            <script>window.onload = function() { setTimeout(() => { window.print(); window.close(); }, 700); };<\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function resetAffidavit() {
    // Reset all text inputs
    document.querySelectorAll('.aff-inputs input, .aff-inputs textarea').forEach(i => i.value = '');
    // Reset margin slider to default
    const slider = document.getElementById('aff-margin-slider');
    slider.value = 330;
    updateAffMargin(330);
    // Refresh preview
    updateAffPreview();
}
