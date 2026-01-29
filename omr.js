let currentOmrLang = 'en';

const omrTranslations = {
    en: {
        uiTitle: "OMR Sheet Generator",
        inst: "Institution Name",
        exam: "Exam Title",
        questions: "Total Questions",
        options: "Options",
        printBtn: "Generate & Print OMR",
        placeholder: "Type here...",
        // Print Version Texts
        pName: "Student Name",
        pRoll: "Roll Number / ID",
        pSubject: "Subject",
        pSet: "Set Code",
        pWarning: "* Use Black Ballpoint Pen only. Fill the circles completely. Do not fold this sheet."
    },
    bn: {
        uiTitle: "ওএমআর শিট জেনারেটর",
        inst: "প্রতিষ্ঠানের নাম",
        exam: "পরীক্ষার নাম",
        questions: "মোট প্রশ্ন সংখ্যা",
        options: "অপশন সংখ্যা",
        printBtn: "ওএমআর তৈরি ও প্রিন্ট",
        placeholder: "এখানে লিখুন...",
        // Print Version Texts
        pName: "শিক্ষার্থীর নাম",
        pRoll: "রোল নম্বর / আইডি",
        pSubject: "বিষয়",
        pSet: "সেট কোড",
        pWarning: "* শুধুমাত্র কালো বলপয়েন্ট কলম ব্যবহার করুন। বৃত্তগুলো সম্পূর্ণ ভরাট করুন। এই কাগজটি ভাঁজ করবেন না।"
    }
};

function openOmrModal() {
    document.getElementById('omrModal').style.display = 'flex';
}

function closeOmrModal() {
    document.getElementById('omrModal').style.display = 'none';
}

function setOmrLang(lang) {
    currentOmrLang = lang;
    const t = omrTranslations[lang];
    
    // Update UI Labels
    document.getElementById('omr-ui-title').innerText = t.uiTitle;
    document.getElementById('lbl-omr-inst').innerText = t.inst;
    document.getElementById('lbl-omr-exam').innerText = t.exam;
    document.getElementById('lbl-omr-q').innerText = t.questions;
    document.getElementById('lbl-omr-opt').innerText = t.options;
    document.getElementById('lbl-omr-print').innerText = t.printBtn;
    
    document.getElementById('omr-name').placeholder = t.placeholder;
    document.getElementById('omr-exam').placeholder = t.placeholder;

    // Toggle Button Styles
    document.getElementById('omr-en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('omr-bn-btn').classList.toggle('active', lang === 'bn');
}

function generateAndPrintOMR() {
    const inst = document.getElementById('omr-name').value || (currentOmrLang === 'en' ? "INSTITUTION NAME" : "প্রতিষ্ঠানের নাম");
    const exam = document.getElementById('omr-exam').value || (currentOmrLang === 'en' ? "EXAMINATION TITLE" : "পরীক্ষার নাম");
    const totalQ = parseInt(document.getElementById('omr-q-total').value);
    const totalOpt = parseInt(document.getElementById('omr-opt-total').value);
    const t = omrTranslations[currentOmrLang];
    
    const options = ["A", "B", "C", "D", "E"];
    const optionsBn = ["ক", "খ", "গ", "ঘ", "ঙ"];

    // ১. প্রিন্ট ফরম্যাটের CSS (সুলাইমান লিপি সহ)
    let style = `
    <style>
        @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
        body { font-family: ${currentOmrLang === 'bn' ? "'SolaimanLipi', Arial" : "'Arial'"}, sans-serif; margin: 0; padding: 0; background: #fff; color: #000; }
        .a4-page { width: 210mm; min-height: 297mm; padding: 12mm; margin: auto; box-sizing: border-box; border: 1px solid #eee; position: relative; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 20px; }
        .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; }
        .header p { margin: 5px 0; font-size: 18px; font-weight: bold; }
        
        .student-info-grid { display: flex; gap: 20px; margin-bottom: 25px; border: 1px solid #000; padding: 12px; }
        .fields { flex: 1.5; font-size: 15px; line-height: 2.2; }
        .roll-id-section { flex: 1; border-left: 1px solid #000; padding-left: 15px; text-align: center; }
        .roll-title { font-size: 12px; font-weight: bold; margin-bottom: 8px; text-decoration: underline; }
        .roll-bubbles { display: flex; gap: 3px; justify-content: center; }
        .roll-col { display: flex; flex-direction: column; gap: 3px; }
        .roll-digit { width: 17px; height: 17px; border: 1px solid #000; border-radius: 50%; font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; }

        .set-codes { margin-bottom: 20px; font-size: 14px; font-weight: bold; display: flex; align-items: center; gap: 10px; }
        .set-box { border: 1.5px solid #000; width: 25px; height: 25px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        .omr-body { display: grid; grid-template-columns: repeat(${totalQ > 50 ? 4 : 3}, 1fr); gap: 12px; border-top: 1px solid #000; padding-top: 15px; }
        .q-row { display: flex; align-items: center; margin-bottom: 5px; }
        .q-num { width: 28px; font-weight: bold; font-size: 14px; }
        .bubbles { display: flex; gap: 6px; }
        .bubble { width: 21px; height: 21px; border: 1.5px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; }
        
        .footer-note { margin-top: 30px; text-align: center; font-size: 12px; border: 1px solid #000; padding: 8px; border-radius: 5px; }
        @media print { .a4-page { border: none; margin: 0; padding: 10mm; } }
    </style>`;

    // ২. রোল নম্বর এবং ইনফো সেকশন
    let rollHtml = `
    <div class="student-info-grid">
        <div class="fields">
            ${t.pName}: _____________________________________<br>
            ${t.pSubject}: _______________________________________<br>
            ${t.pRoll}: _____________________________________
        </div>
        <div class="roll-id-section">
            <div class="roll-title">${t.pRoll} (0-9)</div>
            <div class="roll-bubbles">`;
    for (let c = 0; c < 6; c++) { 
        rollHtml += `<div class="roll-col">`;
        for (let r = 0; r < 10; r++) {
            rollHtml += `<div class="roll-digit">${r}</div>`;
        }
        rollHtml += `</div>`;
    }
    rollHtml += `</div></div></div>`;

    // ৩. সেট কোড সেকশন
    let setHtml = `
    <div class="set-codes">
        <span>${t.pSet}:</span>
        <div class="set-box">A</div> <div class="set-box">B</div> <div class="set-box">C</div> <div class="set-box">D</div>
    </div>`;

    // ৪. প্রশ্ন গ্রিড জেনারেট করা
    let omrGridHtml = `<div class="omr-body">`;
    for (let i = 1; i <= totalQ; i++) {
        omrGridHtml += `<div class="q-row">
            <div class="q-num">${currentOmrLang === 'bn' ? replaceToBnNum(i) : i}.</div>
            <div class="bubbles">`;
        for (let j = 0; j < totalOpt; j++) {
            omrGridHtml += `<div class="bubble">${currentOmrLang === 'bn' ? optionsBn[j] : options[j]}</div>`;
        }
        omrGridHtml += `</div></div>`;
    }
    omrGridHtml += `</div>`;

    // ৫. সব মিলিয়ে ফাইনাল HTML
    let finalHtml = `
    <html>
    <head>
        <title>OMR Sheet - ${inst}</title>
        ${style}
    </head>
    <body>
        <div class="a4-page">
            <div class="header">
                <h1>${inst}</h1>
                <p>${exam}</p>
            </div>
            ${rollHtml}
            ${setHtml}
            ${omrGridHtml}
            <div class="footer-note">${t.pWarning}</div>
        </div>
    </body>
    </html>`;

    // ৬. প্রিন্ট উইন্ডো প্রোসেস
    const printWin = window.open('', '_blank');
    printWin.document.write(finalHtml);
    printWin.document.close();
    
    printWin.onload = function() {
        printWin.focus();
        printWin.print();
    };
}

// সংখ্যাকে বাংলা করার ফাংশন
function replaceToBnNum(num) {
    const bnNums = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => bnNums[d] || d).join('');
}
