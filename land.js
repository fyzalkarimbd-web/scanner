let landLang = 'en';
let landMode = 'rect';

function openLandModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-land');
    document.getElementById('landModal').style.display = 'flex';
}

function closeLandModal() {
    document.getElementById('landModal').style.display = 'none';
}

function setLandMode(mode) {
    landMode = mode;
    document.getElementById('rect-inputs').style.display = mode === 'rect' ? 'block' : 'none';
    document.getElementById('tri-inputs').style.display = mode === 'tri' ? 'block' : 'none';
    document.getElementById('btn-mode-rect').style.background = mode === 'rect' ? '#059669' : '#64748b';
    document.getElementById('btn-mode-tri').style.background = mode === 'tri' ? '#059669' : '#64748b';
    calculateLand();
}

function setLandLang(lang) {
    landLang = lang;
    document.getElementById('land-en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('land-bn-btn').classList.toggle('active', lang === 'bn');
    
    const d = {
        en: { title:"Land Area Calculator", len:"Average Length (Feet)", wid:"Average Width (Feet)", sa:"Side A", resHead:"Calculated Area:", sqft:"Sq. Feet:", decimal:"Decimal:", katha:"Katha:", bigha:"Bigha:", acre:"Acre:", printBtn:"Print A4 Report", resetBtn:"Reset", info:"Standard: 1 Decimal = 435.6 Sq. Ft" },
        bn: { title:"জমি পরিমাপ ক্যালকুলেটর", len:"গড় দৈর্ঘ্য (ফুট)", wid:"গড় প্রস্থ (ফুট)", sa:"আইল এ", resHead:"জমির মোট পরিমাপ:", sqft:"বর্গফুট:", decimal:"শতাংশ:", katha:"কাঠা:", bigha:"বিঘা:", acre:"একর:", printBtn:"প্রিন্ট রিপোর্ট (A4)", resetBtn:"সব মুছুন", info:"হিসাব: ১ শতাংশ = ৪৩৫.৬ বর্গফুট" }
    };
    const t = d[lang];
    document.getElementById('land-title').innerText = t.title;
    document.getElementById('lbl-len').innerText = t.len;
    document.getElementById('lbl-wid').innerText = t.wid;
    document.getElementById('res-head').innerText = t.resHead;
    document.getElementById('txt-sqft').innerText = t.sqft;
    document.getElementById('txt-decimal').innerText = t.decimal;
    document.getElementById('txt-katha').innerText = t.katha;
    document.getElementById('txt-bigha').innerText = t.bigha;
    document.getElementById('txt-acre').innerText = t.acre;
    document.getElementById('btn-print-text').innerText = t.printBtn;
    document.getElementById('btn-reset-text').innerText = t.resetBtn;
    document.getElementById('land-info').innerText = t.info;
    calculateLand();
}

function calculateLand() {
    let sqft = 0;
    if (landMode === 'rect') {
        sqft = (parseFloat(document.getElementById('land-len').value) || 0) * (parseFloat(document.getElementById('land-wid').value) || 0);
    } else {
        let a = parseFloat(document.getElementById('tri-a').value) || 0, b = parseFloat(document.getElementById('tri-b').value) || 0, c = parseFloat(document.getElementById('tri-c').value) || 0;
        if (a + b > c && a + c > b && b + c > a) {
            let s = (a + b + c) / 2;
            sqft = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        }
    }
    document.getElementById('res-sqft').innerText = sqft.toFixed(2);
    document.getElementById('res-decimal').innerText = (sqft / 435.6).toFixed(2);
    document.getElementById('res-katha').innerText = (sqft / 720).toFixed(2);
    document.getElementById('res-bigha').innerText = (sqft / 435.6 / 33).toFixed(2);
    document.getElementById('res-acre').innerText = (sqft / 435.6 / 100).toFixed(2);
}

function printLandReport() {
    calculateLand();
    const isBn = (landLang === 'bn');
    const sqft = document.getElementById('res-sqft').innerText;
    const decimal = document.getElementById('res-decimal').innerText;
    const katha = document.getElementById('res-katha').innerText;
    const bigha = document.getElementById('res-bigha').innerText;
    const acre = document.getElementById('res-acre').innerText;

    // আইফ্রেম তৈরি
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;

    // সিএসএস এবং এইচটিএমএল একসাথে ইনজেকশন
    const content = `
    <html>
    <head>
        <title>Print Report</title>
        <style>
            @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
            body { margin: 0; padding: 0; background: #fff; font-family: 'SolaimanLipi', Arial, sans-serif; }
            @page { size: A4; margin: 0; }
            .a4-page { width: 210mm; height: 297mm; padding: 20mm; box-sizing: border-box; background: #fff; margin: 0 auto; overflow: hidden; }
            .border-wrap { border: 4px solid #059669; height: 100%; padding: 15mm; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; }
            .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 10px; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 32px; color: #059669; font-weight: bold; }
            .header p { margin: 5px 0 0; font-size: 15px; color: #555; }
            .title { text-align: center; text-decoration: underline; font-size: 26px; margin-bottom: 40px; color: #000; font-weight: bold; }
            .section-head { background: #f3f4f6; padding: 10px; font-size: 19px; border-left: 6px solid #059669; margin-bottom: 20px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; font-size: 19px; }
            table td { border: 1px solid #cbd5e1; padding: 15px; color: #000; }
            .res-row { background: #f0fdf4; font-weight: bold; }
            .res-val { font-weight: 900; color: #059669; font-size: 22px; text-align: right; }
            .footer { border-top: 1px solid #eee; padding-top: 15px; font-size: 14px; color: #666; text-align: center; }
        </style>
    </head>
    <body>
        <div class="a4-page">
            <div class="border-wrap">
                <div>
                    <div class="header">
                        <h1>${isBn ? 'আইডি কার্ড স্ক্যানার প্রো' : 'ID CARD SCANNER PRO'}</h1>
                        <p>Professional Digital Studio Solutions | www.idcardscannerpro.com</p>
                    </div>
                    <div class="title">${isBn ? 'জমির পরিমাপের রিপোর্ট' : 'Land Measurement Report'}</div>
                    <div class="section-head">${isBn ? 'জমির মোট হিসাব:' : 'Final Calculation Result:'}</div>
                    <table>
                        <tr class="res-row"><td>${isBn ? 'মোট বর্গফুট' : 'Total Sq. Feet'}</td><td class="res-val">${sqft}</td></tr>
                        <tr><td>${isBn ? 'শতাংশ' : 'Decimal'}</td><td style="text-align:right;">${decimal}</td></tr>
                        <tr><td>${isBn ? 'কাঠা' : 'Katha'}</td><td style="text-align:right;">${katha}</td></tr>
                        <tr><td>${isBn ? 'বিঘা' : 'Bigha'}</td><td style="text-align:right;">${bigha}</td></tr>
                        <tr><td>${isBn ? 'একর' : 'Acre'}</td><td style="text-align:right;">${acre}</td></tr>
                    </table>
                </div>
                <div class="footer">
                    ${isBn ? '* হিসাবের নিয়ম: ১ শতাংশ = ৪৩৫.৬ বর্গফুট। এটি একটি কম্পিউটার জেনারেটেড রিপোর্ট।' : '* Standard Calculation: 1 Decimal = 435.6 Sq. Feet. Computer generated report.'}
                </div>
            </div>
        </div>
    </body>
    </html>`;

    doc.open();
    doc.write(content);
    doc.close();

    // লোড হওয়ার পর প্রিন্ট
    iframe.contentWindow.onload = function() {
        iframe.contentWindow.print();
        setTimeout(() => { document.body.removeChild(iframe); }, 1000);
    };
}

function resetLand() {
    document.querySelectorAll('#landModal input').forEach(i => i.value = '');
    calculateLand();
}
