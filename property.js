let propLang = "bn";

function openPropModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-property-calc');
    document.getElementById('propertyCalcModal').style.display = 'flex';
    setPropLang(propLang);
}

function closePropModal() {
    document.getElementById('propertyCalcModal').style.display = 'none';
}

function toPropN(n) {
    if (propLang !== 'bn') return n.toLocaleString();
    const d = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return n.toString().replace(/\d/g, x => d[x]);
}

function setPropLang(lang) {
    propLang = lang;
    document.getElementById('prop-bn-btn').classList.toggle('active', lang === 'bn');
    document.getElementById('prop-en-btn').classList.toggle('active', lang === 'en');
    
    const ui = {
        bn: {
            title: "সম্পত্তি বন্টন ক্যালকুলেটর (ফারায়েজ)",
            step1: "১. সম্পত্তির বিবরণ", step2: "২. জীবিত উত্তরাধিকারীগণ",
            land: "মোট জমি (শতাংশ)", cash: "মোট টাকা (নগদ)",
            wife: "স্ত্রী", husband: "স্বামী", son: "পুত্র", daughter: "কন্যা", father: "পিতা", mother: "মাতা",
            note: "<b>নির্দেশনা:</b> মৃত ব্যক্তির স্ত্রী, স্বামী, সন্তান বা পিতা-মাতা যারা বেঁচে আছেন তাদের পাশে টিক দিন এবং সংখ্যা লিখুন।",
            btnP: "প্রিন্ট রিপোর্ট", btnR: "সব মুছুন"
        },
        en: {
            title: "Property Distribution Calculator (Farayez)",
            step1: "1. Property Details", step2: "2. Living Heirs",
            land: "Total Land (Decimal)", cash: "Total Money (Cash)",
            wife: "Wife", husband: "Husband", son: "Son", daughter: "Daughter", father: "Father", mother: "Mother",
            note: "<b>Note:</b> Check the heirs who are alive and enter their quantity to calculate the shares.",
            btnP: "Print Report", btnR: "Clear All"
        }
    };

    const d = ui[lang];
    document.getElementById('prop-ui-title').innerText = d.title;
    document.getElementById('lbl-prop-step1').innerText = d.step1;
    document.getElementById('lbl-prop-step2').innerText = d.step2;
    document.getElementById('lbl-prop-land').innerText = d.land;
    document.getElementById('lbl-prop-cash').innerText = d.cash;
    document.getElementById('t-wife').innerText = d.wife;
    document.getElementById('t-husband').innerText = d.husband;
    document.getElementById('t-son').innerText = d.son;
    document.getElementById('t-daughter').innerText = d.daughter;
    document.getElementById('t-father').innerText = d.father;
    document.getElementById('t-mother').innerText = d.mother;
    document.getElementById('prop-info-note').innerHTML = d.note;
    document.getElementById('btn-prop-print').innerHTML = `<i class='fa-solid fa-print'></i> ${d.btnP}`;
    document.getElementById('btn-prop-reset').innerHTML = `<i class='fa-solid fa-trash-can'></i> ${d.btnR}`;

    calculateFarayez();
}

function calculateFarayez() {
    const land = parseFloat(document.getElementById('prop-land').value) || 0;
    const cash = parseFloat(document.getElementById('prop-cash').value) || 0;

    const wife = document.getElementById('h-wife').checked;
    const husband = document.getElementById('h-husband').checked;
    const father = document.getElementById('h-father').checked;
    const mother = document.getElementById('h-mother').checked;
    const hasSon = document.getElementById('h-son').checked;
    const hasDaughter = document.getElementById('h-daughter').checked;

    const qWife = parseInt(document.getElementById('q-wife').value) || 1;
    const qSon = parseInt(document.getElementById('q-son').value) || 0;
    const qDaughter = parseInt(document.getElementById('q-daughter').value) || 0;

    let heirs = [];
    let residue = 1.0;

    if (wife) {
        let share = (hasSon || hasDaughter) ? (1/8) : (1/4);
        heirs.push({ label: propLang==='bn'?'স্ত্রী':'Wife', count: qWife, totalShare: share });
        residue -= share;
    }

    if (husband) {
        let share = (hasSon || hasDaughter) ? (1/4) : (1/2);
        heirs.push({ label: propLang==='bn'?'স্বামী':'Husband', count: 1, totalShare: share });
        residue -= share;
    }

    if (mother) {
        let share = (hasSon || hasDaughter) ? (1/6) : (1/3);
        heirs.push({ label: propLang==='bn'?'মাতা':'Mother', count: 1, totalShare: share });
        residue -= share;
    }

    if (father) {
        let share = (hasSon || hasDaughter) ? (1/6) : 0; 
        if (share > 0) {
            heirs.push({ label: propLang==='bn'?'পিতা':'Father', count: 1, totalShare: share });
            residue -= share;
        }
    }

    if (hasSon || hasDaughter || (father && residue > 0)) {
        let totalUnits = (qSon * 2) + (qDaughter * 1);
        
        if (totalUnits === 0 && father) {
            let pIdx = heirs.findIndex(h => h.label === (propLang==='bn'?'পিতা':'Father'));
            if (pIdx !== -1) heirs[pIdx].totalShare += residue;
            else heirs.push({ label: propLang==='bn'?'পিতা':'Father', count: 1, totalShare: residue });
            residue = 0;
        } else if (totalUnits > 0) {
            let unitValue = residue / totalUnits;
            if (hasSon) heirs.push({ label: propLang==='bn'?'পুত্র':'Son', count: qSon, totalShare: unitValue * 2 * qSon });
            if (hasDaughter) heirs.push({ label: propLang==='bn'?'কন্যা':'Daughter', count: qDaughter, totalShare: unitValue * qDaughter });
            residue = 0;
        }
    }

    renderPropReport(heirs, land, cash);
}

function renderPropReport(heirs, land, cash) {
    const area = document.getElementById('prop-print-area');
    const labels = propLang === 'bn' ? 
        { h1: "উত্তরাধিকার বন্টননামা রিপোর্ট", h3: "সম্পত্তি বন্টনের বিস্তারিত হিসাব", th1: "উত্তরাধিকারী", th2: "অংশ", th3: "জমি (শতাংশ)", th4: "টাকা (নগদ)", empty: "উত্তরাধিকারী নির্বাচন করুন।" } :
        { h1: "Inheritance Distribution Report", h3: "Detailed Calculation of Property", th1: "Heir", th2: "Share", th3: "Land (Decimal)", th4: "Cash (Money)", empty: "Please select heirs to calculate." };

    if (heirs.length === 0) {
        area.innerHTML = `<p style="text-align:center; padding:100px; color:#94a3b8;">${labels.empty}</p>`;
        return;
    }

    let rows = "";
    heirs.forEach(h => {
        let pShare = (h.totalShare / h.count);
        rows += `<tr>
            <td>${h.label} ${h.count > 1 ? '('+toPropN(h.count)+')' : ''}</td>
            <td>${(pShare * 100).toFixed(3)}%</td>
            <td>${toPropN((pShare * land).toFixed(2))}</td>
            <td>${toPropN((pShare * cash).toFixed(2))}</td>
        </tr>`;
    });

    area.innerHTML = `
        <h1>${labels.h1}</h1>
        <h3>${labels.h3}</h3>
        <div style="margin-bottom:20px; font-weight:bold;">
            ${propLang === 'bn' ? 'মোট জমি:' : 'Total Land:'} ${toPropN(land)} | 
            ${propLang === 'bn' ? 'মোট নগদ:' : 'Total Cash:'} ${toPropN(cash)}
        </div>
        <table class="prop-table">
            <thead>
                <tr>
                    <th>${labels.th1}</th>
                    <th>${labels.th2}</th>
                    <th>${labels.th3}</th>
                    <th>${labels.th4}</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
        <div style="margin-top:50px; border-top:1px solid #ddd; padding-top:10px; font-size:12px; color:#666; text-align:center;">
            Generated by: ID Card Scanner Pro - www.idcardscannerpro.com
        </div>
    `;
}

function printPropPaper() {
    const printContent = document.getElementById('prop-print-area').innerHTML;
    const distName = document.getElementById('ram-district-select') ? document.getElementById('ram-district-select').value : '';
    
    const pWin = window.open('', '', 'height=900,width=1000');
    
    pWin.document.write('<html><head><title>Inheritance Report - www.idcardscannerpro.com</title>');
    
    pWin.document.write('<link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">');
    
    pWin.document.write('<style>');
    pWin.document.write(`
        body { margin: 0; padding: 0; background: #fff; }
        #p-wrapper { 
            width: 210mm; 
            min-height: 297mm; 
            padding: 20mm; 
            box-sizing: border-box; 
            font-family: "SolaimanLipi", Arial, sans-serif !important;
            color: #000;
        }
        h1 { font-size: 26px; text-align: center; margin-bottom: 5px; color: #059669; }
        h3 { font-size: 18px; text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
        .prop-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .prop-table th, .prop-table td { border: 1px solid #000; padding: 10px; text-align: center; font-weight: bold; font-size: 15px; }
        thead { background: #f2f2f2 !important; -webkit-print-color-adjust: exact; }
        @page { size: A4; margin: 0; }
        .footer-note { margin-top: 50px; text-align: center; font-size: 12px; border-top: 1px solid #ddd; padding-top: 10px; }
    `);
    pWin.document.write('</style></head><body>');
    
    pWin.document.write('<div id="p-wrapper">' + printContent + '</div>');
    pWin.document.write('</body></html>');
    
    pWin.document.close();
    
    setTimeout(() => {
        pWin.print();
        pWin.close();
    }, 700);
}

function resetPropTool() {
    document.getElementById('prop-land').value = "";
    document.getElementById('prop-cash').value = "";
    document.querySelectorAll('#propertyCalcModal input[type="checkbox"]').forEach(c => c.checked = false);
    calculateFarayez();
}
