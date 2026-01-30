let noticeLang = "bn";

function openNoticeModal() {
    if(typeof setActiveMode === 'function') setActiveMode('mode-notice');
    document.getElementById('noticeModal').style.display = 'flex';
    setNoticeLang('bn'); 
}

function closeNoticeModal() {
    document.getElementById('noticeModal').style.display = 'none';
}

function setNoticeLang(lang) {
    noticeLang = lang;
    document.getElementById('not-bn-btn').classList.toggle('active', lang === 'bn');
    document.getElementById('not-en-btn').classList.toggle('active', lang === 'en');
    
    const labels = {
        bn: {
            mTitle: "Ready Notice Maker Pro",
            inst: "প্রতিষ্ঠানের নাম", addr: "ঠিকানা", ref: "স্মারক নং", date: "তারিখ",
            subj: "নোটিশের বিষয়", body: "নোটিশের বিস্তারিত তথ্য", auth: "কর্তৃপক্ষের নাম ও পদবী",
            phInst: "প্রতিষ্ঠানের নাম লিখুন", phAddr: "অবস্থান/ঠিকানা", phRef: "স্মারক নম্বর",
            phSub: "নোটিশের বিষয় লিখুন", phBody: "এখানে বিস্তারিত লিখুন...", phAuth: "অধ্যক্ষ / পরিচালক",
            btnPrint: "প্রিন্ট করুন (A4)", btnReset: "সব মুছুন",
            defaultTitle: "নোটিশ"
        },
        en: {
            mTitle: "Ready Notice Maker Pro",
            inst: "Institution Name", addr: "Address", ref: "Ref No.", date: "Date",
            subj: "Notice Subject", body: "Notice Body Text", auth: "Authority Name & Title",
            phInst: "Example: ABC High School", phAddr: "Location", phRef: "REF/2024/01",
            phSub: "Ex: Holiday Notice", phBody: "Enter notice description here...", phAuth: "Principal / Manager",
            btnPrint: "Print A4 PDF", btnReset: "Clear All",
            defaultTitle: "NOTICE"
        }
    };

    const l = labels[lang];
    // UI Label Update
    document.getElementById('not-main-title').innerHTML = `<i class='fa-solid fa-bullhorn'/> ${l.mTitle}`;
    document.getElementById('lbl-not-inst').innerText = l.inst;
    document.getElementById('lbl-not-addr').innerText = l.addr;
    document.getElementById('lbl-not-ref').innerText = l.ref;
    document.getElementById('lbl-not-date').innerText = l.date;
    document.getElementById('lbl-not-subject').innerText = l.subj;
    document.getElementById('lbl-not-body').innerText = l.body;
    document.getElementById('lbl-not-auth').innerText = l.auth;
    
    // Placeholder Update
    document.getElementById('not-inst').placeholder = l.phInst;
    document.getElementById('not-addr').placeholder = l.phAddr;
    document.getElementById('not-ref').placeholder = l.phRef;
    document.getElementById('not-subject').placeholder = l.phSub;
    document.getElementById('not-body').placeholder = l.phBody;
    document.getElementById('not-auth').placeholder = l.phAuth;
    
    // Button Update
    document.getElementById('btn-not-print').innerHTML = `<i class='fa-solid fa-print'/> ${l.btnPrint}`;
    document.getElementById('btn-not-reset').innerHTML = `<i class='fa-solid fa-trash-can'/> ${l.btnReset}`;
    
    // Preview Title Update
    document.getElementById('p-title').innerText = l.defaultTitle;
    
    // Date Fix: English click must show English numerals
    document.getElementById('not-date').value = new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB');

    updateNotice();
}

function updateNotice() {
    const isBn = noticeLang === 'bn';
    document.getElementById('p-inst').innerText = document.getElementById('not-inst').value || (isBn ? "প্রতিষ্ঠানের নাম" : "INSTITUTION NAME");
    document.getElementById('p-addr').innerText = document.getElementById('not-addr').value || (isBn ? "এখানে ঠিকানা লিখুন" : "Address Line Here");
    document.getElementById('p-ref').innerText = (isBn ? "স্মারক: " : "Ref: ") + (document.getElementById('not-ref').value || "...");
    document.getElementById('p-date').innerText = (isBn ? "তারিখ: " : "Date: ") + (document.getElementById('not-date').value || "...");
    document.getElementById('p-subject').innerText = (isBn ? "বিষয়: " : "Subject: ") + (document.getElementById('not-subject').value || "...");
    document.getElementById('p-body').innerText = document.getElementById('not-body').value || (isBn ? "নোটিশের বিস্তারিত এখানে লিখুন..." : "Notice content here...");
    document.getElementById('p-auth').innerText = document.getElementById('not-auth').value || (isBn ? "স্বাক্ষর" : "Signature");
}

function printNotice() {
    const content = document.getElementById('a4-notice-preview').innerHTML;
    const win = window.open('', '', 'height=900,width=800');
    win.document.write('<html><head><title>Print Notice</title>');
    win.document.write('<style>@import url("https://fonts.maateen.me/solaiman-lipi/font.css"); @page { size: A4; margin: 20mm; } body{font-family: "SolaimanLipi", Arial, sans-serif; margin:0; padding:0;} #preview-content{display:flex; flex-direction:column; height: 257mm; box-sizing: border-box;} #p-inst{text-align:center; font-size:24px; text-transform: uppercase; margin:0;} #p-addr{text-align:center; margin-bottom:20px; font-size:14px;} #p-body{flex: 1; font-size:16px; line-height:1.6; text-align:justify; margin-bottom:20px;}</style>');
    win.document.write('</head><body>');
    win.document.write(content);
    win.document.write('</body></html>');
    win.document.close();
    setTimeout(() => { win.print(); win.close(); }, 700);
}

function resetNotice() {
    document.querySelectorAll('.notice-inputs input, .notice-inputs textarea').forEach(i => i.value = "");
    setNoticeLang(noticeLang);
}
