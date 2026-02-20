let salList = [];
let salLogoData = null;
let salLanguage = "bn";
let salOrientation = "p";

function openSalModal() {
    document.getElementById('salaryMakerModal').style.display = 'flex';
    if(typeof setActiveMode === "function") setActiveMode('mode-salary');
    
    if (salList.length === 0) {
        const defaultName = salLanguage === 'bn' ? "নাম লিখুন" : "Enter Name";
        const defaultDesig = salLanguage === 'bn' ? "পদবী" : "Designation";
        salList = [["1", defaultName, defaultDesig, "0", "0", "0", "0", "0"]];
    }
    setSalLang(salLanguage);
}

function closeSalModal() {
    document.getElementById('salaryMakerModal').style.display = 'none';
}

function setSalLang(lang) {
    salLanguage = lang;
    document.getElementById('sal-btn-bn').classList.toggle('active', lang === 'bn');
    document.getElementById('sal-btn-en').classList.toggle('active', lang === 'en');
    
    salList.forEach(row => {
        if (lang === 'en') {
            if (row[1] === "নাম লিখুন") row[1] = "Enter Name";
            if (row[2] === "পদবী") row[2] = "Designation";
        } else {
            if (row[1] === "Enter Name") row[1] = "নাম লিখুন";
            if (row[2] === "Designation") row[2] = "পদবী";
        }
    });

    const ui = {
        bn: {
            title: "স্যালারি শীট মেকার",
            step1: "১. প্রতিষ্ঠানের তথ্য",
            step2: "২. সেটিংস",
            inst: "প্রতিষ্ঠানের নাম লিখুন",
            month: "মাস ও বছর (উদা: জানুয়ারি - ২০২৬)",
            add: "+ কর্মচারী যোগ",
            print: "প্রিন্ট",
            reset: "রিসেট",
            orientP: "লম্বালম্বি প্রিন্ট (P)",
            orientL: "আড়াআড়ি প্রিন্ট (L)"
        },
        en: {
            title: "Salary Sheet Maker",
            step1: "1. Institution Info",
            step2: "2. Settings",
            inst: "Enter Institution Name",
            month: "Month & Year (e.g. Jan - 2026)",
            add: "+ Add Employee",
            print: "Print",
            reset: "Reset",
            orientP: "Portrait Print (P)",
            orientL: "Landscape Print (L)"
        }
    };

    document.getElementById('sal-ui-title').innerText = ui[lang].title;
    document.getElementById('lbl-sal-step1').innerText = ui[lang].step1;
    document.getElementById('lbl-sal-step2').innerText = ui[lang].step2;
    document.getElementById('sal-inst-name').placeholder = ui[lang].inst;
    document.getElementById('sal-sub-title').placeholder = ui[lang].month;
    document.getElementById('btn-add-sal').innerText = ui[lang].add;
    document.getElementById('btn-sal-print-ui').innerHTML = `<i class='fa-solid fa-print'/> ${ui[lang].print}`;
    document.getElementById('btn-sal-reset-ui').innerHTML = `<i class='fa-solid fa-trash-can'/> ${ui[lang].reset}`;
    
    const sel = document.getElementById('sal-orient');
    sel.options[0].text = ui[lang].orientP;
    sel.options[1].text = ui[lang].orientL;

    drawSal();
}

function loadSalLogo(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        salLogoData = e.target.result;
        document.getElementById('sal-logo-pv').src = salLogoData;
        document.getElementById('sal-logo-pv').style.display = 'block';
        document.getElementById('sal-plus-ico').style.display = 'none';
        drawSal();
    };
    reader.readAsDataURL(event.target.files[0]);
}

function addSalRow() {
    let sl = salList.length + 1;
    salList.push([sl.toString(), "", "", "0", "0", "0", "0", "0"]);
    drawSal();
}

function updateSalData(r, c, val) {
    salList[r][c] = val;
    if (c >= 3 && c <= 6) {
        let b = parseFloat(salList[r][3]) || 0;
        let a = parseFloat(salList[r][4]) || 0;
        let bo = parseFloat(salList[r][5]) || 0;
        let d = parseFloat(salList[r][6]) || 0;
        salList[r][7] = (b + a + bo - d).toString();
    }
    drawSal();
}

function toSalBN(n) {
    if (salLanguage !== 'bn') return n;
    return n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

function setSalOrient(orient) {
    salOrientation = orient;
    drawSal();
}

function drawSal() {
    const inst = document.getElementById('sal-inst-name').value || (salLanguage === 'bn' ? "প্রতিষ্ঠানের নাম" : "Institution Name");
    const sub = document.getElementById('sal-sub-title').value || (salLanguage === 'bn' ? "বেতন তালিকা - ২০২৬" : "Salary Sheet - 2026");
    const renderArea = document.getElementById('sal-render-area');
    renderArea.className = salOrientation === 'p' ? 'sal-p-size' : 'sal-l-size';

    const headers = salLanguage === 'bn' ? 
        ["ক্র.নং", "নাম", "পদবী", "মূল বেতন", "ভাতা", "বোনাস", "কর্তন", "নিট বেতন"] : 
        ["SL", "Name", "Designation", "Basic", "Allow.", "Bonus", "Deduc.", "Net Pay"];

    let table = `<table><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
    salList.forEach((row, rIdx) => {
        table += '<tr>';
        row.forEach((cell, cIdx) => {
            const isReadonly = (cIdx === 0 || cIdx === 7);
            const displayValue = (cIdx >= 3) ? toSalBN(cell) : (cIdx === 0 ? toSalBN(cell) : cell);
            table += `<td ${!isReadonly ? 'contenteditable="true"' : ''} onblur="updateSalData(${rIdx}, ${cIdx}, this.innerText)">${displayValue}</td>`;
        });
        table += '</tr>';
    });
    table += '</tbody></table>';

    renderArea.innerHTML = `
        <div style="text-align:center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
            ${salLogoData ? `<img src="${salLogoData}" style="height:50px; margin-bottom:5px;">` : ''}
            <h1 style="margin:0; font-size:22px; font-weight:900;">${inst}</h1>
            <h2 style="margin:5px 0 0; font-size:16px; color:#333;">${sub}</h2>
        </div>
        ${table}
        <div style="margin-top:60px; display:flex; justify-content:space-between; font-weight:bold; font-size:13px; padding: 0 30px;">
            <div style="text-align:center; border-top:1px solid #000; width:150px; padding-top:5px;">${salLanguage==='bn'?'ক্যাশিয়ার':'Cashier'}</div>
            <div style="text-align:center; border-top:1px solid #000; width:150px; padding-top:5px;">${salLanguage==='bn'?'অধ্যক্ষ/মালিক':'Owner/Principal'}</div>
        </div>`;
}

function printSalPaper() {
    const content = document.getElementById('sal-render-area').innerHTML;
    const isL = salOrientation === 'l';
    const pWin = window.open('', '', 'height=850,width=1100');
    pWin.document.write('<html><head><title>Salary Sheet</title>');
    pWin.document.write('<link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">');
    // প&#2509;র&#2495;ন&#2509;ট সিএসএস য&#2494; অট&#2507;ম&#2503;ট&#2495;ক ম&#2494;র&#2509;জ&#2495;ন ও প&#2503;জ ব&#2509;র&#2503;ক ম&#2503;ইনট&#2503;ইন করব&#2503;
    pWin.document.write(`<style>
        @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
        body { margin: 0; padding: 0; background: #fff; }
        #p-wrap { 
            width: ${isL ? '297mm' : '210mm'}; 
            padding: 15mm; 
            margin: 0 auto;
            box-sizing: border-box; 
            font-family: "SolaimanLipi", Arial, sans-serif !important;
        }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; border: 1.5px solid #000; table-layout: auto; page-break-inside: auto; }
        tr { page-break-inside: avoid; page-break-after: auto; }
        th, td { border: 1px solid #000; padding: 6px; font-size: 13px; text-align: center; color: #000; }
        thead { display: table-header-group; background: #f2f2f2; }
        @page { size: A4 ${isL ? 'landscape' : 'portrait'}; margin: 15mm 10mm; }
    </style></head><body><div id="p-wrap">${content}</div></body></html>`);
    pWin.document.close();
    setTimeout(() => { pWin.print(); pWin.close(); }, 800);
}

function resetSalTool() {
    document.getElementById('sal-inst-name').value = "";
    document.getElementById('sal-sub-title').value = "";
    salLogoData = null;
    
    document.getElementById('fq-logo-pv').style.display = 'none';
    document.getElementById('fq-plus-ico').style.display = 'block';
    
    const defaultName = salLanguage === 'bn' ? "নাম লিখুন" : "Enter Name";
    const defaultDesig = salLanguage === 'bn' ? "পদবী" : "Designation";
    
    salList = [["1", defaultName, defaultDesig, "0", "0", "0", "0", "0"]];
    
    drawSal();
}
