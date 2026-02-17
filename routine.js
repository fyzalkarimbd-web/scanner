let rtLang = "bn";
let rtPeriods = ["1st", "2nd", "3rd", "4th"];
let rtDaysKeys = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let rtData = {}; 

const bnSuffixMap = {
    1: "ম", 2: "য়", 3: "য়", 4: "র্থ", 5: "ম", 6: "ষ্ঠ", 7: "ম", 8: "ম", 9: "ম", 10: "ম",
    11: "শ", 12: "শ", 13: "শ", 14: "শ", 15: "শ"
};
const enSuffixMap = { 1: "st", 2: "nd", 3: "rd" };

function openRoutineModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-routine-maker');
    document.getElementById('routineMakerModal').style.display = 'flex';
    initializeRtData();
    setRtLang(rtLang);
}

function closeRoutineModal() {
    document.getElementById('routineMakerModal').style.display = 'none';
}

function initializeRtData() {
    rtDaysKeys.forEach(day => {
        if (!rtData[day]) rtData[day] = {};
        rtPeriods.forEach(p => {
            if (!rtData[day][p]) rtData[day][p] = "";
        });
    });
}

function formatPeriodName(n, lang) {
    let num = parseInt(n);
    if (isNaN(num)) return n;
    if (lang === 'bn') {
        const digits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
        let bnNum = num.toString().replace(/\d/g, d => digits[d]);
        return bnNum + (bnSuffixMap[num] || "তম");
    } else {
        return num + (enSuffixMap[num] || "th");
    }
}

function setRtLang(lang) {
    rtLang = lang;
    document.getElementById('rt-btn-bn').classList.toggle('active', lang === 'bn');
    document.getElementById('rt-btn-en').classList.toggle('active', lang === 'en');

    const ui = {
        bn: {
            title: "ক্লাস রুটিন মেকার", step1: "১. প্রতিষ্ঠানের তথ্য", step2: "২. পিরিয়ড ও সময়", step3: "৩. বিষয় বিন্যাস",
            inst: "প্রতিষ্ঠানের নাম", head: "রুটিনের শিরোনাম", cls: "শ্রেণি", ver: "শাখা/সেকশন",
            addP: "+ পিরিয়ড যোগ করুন", print: "প্রিন্ট করুন (A4)", reset: "সব মুছুন", 
            days: ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"]
        },
        en: {
            title: "Class Routine Maker", step1: "1. Institution Details", step2: "2. Periods & Time", step3: "3. Subjects Grid",
            inst: "Institution Name", head: "Routine Title", cls: "Class", ver: "Section/Shift",
            addP: "+ Add Period", print: "Print (A4)", reset: "Clear All", 
            days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        }
    };

    document.getElementById('rt-main-title').innerText = ui[lang].title;
    document.getElementById('lbl-rt-step1').innerText = ui[lang].step1;
    document.getElementById('lbl-rt-step2').innerText = ui[lang].step2;
    document.getElementById('lbl-rt-step3').innerText = ui[lang].step3;
    document.getElementById('rt-inst-name').placeholder = ui[lang].inst;
    document.getElementById('rt-sub-title').placeholder = ui[lang].head;
    document.getElementById('rt-class-info').placeholder = ui[lang].cls;
    document.getElementById('rt-version-info').placeholder = ui[lang].ver;
    document.getElementById('btn-add-period').innerText = ui[lang].addP;
    document.getElementById('btn-rt-print').innerHTML = `<i class='fa-solid fa-print'></i> ${ui[lang].print}`;
    document.getElementById('btn-rt-reset').innerHTML = `<i class='fa-solid fa-trash-can'></i> ${ui[lang].reset}`;

    renderRtInputs();
    updateRoutine();
}

function addRtPeriod() {
    if (rtPeriods.length >= 15) return;
    let n = rtPeriods.length + 1;
    rtPeriods.push(n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : n + "th");
    initializeRtData();
    renderRtInputs();
    updateRoutine();
}

function renderRtInputs() {
    const pContainer = document.getElementById('rt-periods-container');
    pContainer.innerHTML = "";
    rtPeriods.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = "rt-input-row";
        div.innerHTML = `<input value="${formatPeriodName(i + 1, rtLang)}" oninput="rtPeriods[${i}]=this.value; updateRoutine()"/>
                         <button onclick="rtPeriods.splice(${i},1); renderRtInputs(); updateRoutine()" style="border:none; background:#fee2e2; color:red; cursor:pointer;">&times;</button>`;
        pContainer.appendChild(div);
    });

    const dContainer = document.getElementById('rt-days-container');
    dContainer.innerHTML = "";
    const dayLabels = rtLang === 'bn' ? ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"] : ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    
    rtDaysKeys.forEach((dayKey, dIdx) => {
        const div = document.createElement('div');
        div.className = "rt-day-box";
        let html = `<p style="margin:0 0 8px; font-weight:800; font-size:12px; color:#4b5563;">${dayLabels[dIdx]}</p>
                    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap:5px;">`;
        rtPeriods.forEach((p, i) => {
            html += `<input placeholder="${formatPeriodName(i+1, rtLang)}" value="${rtData[dayKey][p] || ''}" oninput="rtData['${dayKey}']['${p}']=this.value; updateRoutine()"/>`;
        });
        html += `</div>`;
        div.innerHTML = html;
        dContainer.appendChild(div);
    });
}

function toBnN(n) {
    if (rtLang !== 'bn') return n;
    return n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

function updateRoutine() {
    const inst = document.getElementById('rt-inst-name').value || (rtLang === 'bn' ? "প্রতিষ্ঠানের নাম" : "Institution Name");
    const head = document.getElementById('rt-sub-title').value || (rtLang === 'bn' ? "রুটিনের শিরোনাম" : "Routine Title");
    const cls = document.getElementById('rt-class-info').value;
    const ver = document.getElementById('rt-version-info').value;
    const dayLabels = rtLang === 'bn' ? ["শনিবার", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার"] : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

    let html = `<div style="text-align:center; border-bottom:2px solid #000; padding-bottom:8px; margin-bottom:10px;">
                    <h1 style="margin:0; font-size:18px; font-weight:900;">${inst}</h1>
                    <h2 style="margin:2px 0; font-size:14px;">${head}</h2>
                    <div style="display:flex; justify-content:center; gap:20px; font-weight:bold; font-size:12px; margin-top:3px;">
                        <span>${rtLang === 'bn' ? 'শ্রেণি:' : 'Class:'} ${cls || '...'}</span>
                        <span>${rtLang === 'bn' ? 'শাখা:' : 'Section:'} ${ver || '...'}</span>
                    </div>
                </div>
                <table><thead><tr><th style="width:70px;">${rtLang === 'bn' ? 'দিন/বার' : 'Day'}</th>`;
    rtPeriods.forEach((p, i) => { html += `<th>${formatPeriodName(i + 1, rtLang)}</th>`; });
    html += `</tr></thead><tbody>`;

    rtDaysKeys.forEach((dayKey, i) => {
        html += `<tr><td><b>${dayLabels[i]}</b></td>`;
        rtPeriods.forEach(p => { html += `<td>${rtData[dayKey][p] || ''}</td>`; });
        html += `</tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('rt-render-area').innerHTML = html;
}

function printRoutinePaper() {
    const content = document.getElementById('rt-render-area').innerHTML;
    const pWin = window.open('', '', 'height=1100,width=850');
    pWin.document.write('<html><head><title>Routine Print</title>');
    pWin.document.write('<link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">');
    pWin.document.write(`<style>
        body{margin:0;padding:0;background:#fff;}
        #p-wrap{ width: 210mm; height: 297mm; padding: 20mm; box-sizing: border-box; font-family:"SolaimanLipi", Arial, sans-serif!important; }
        table{width:100%; border-collapse:collapse; table-layout:fixed; margin-top:15px;}
        th, td{border:1px solid #000; padding:6px; text-align:center; font-size:12px; font-family:"SolaimanLipi", Arial, sans-serif!important;}
        h1{font-size:22px; margin:0; text-align:center;} h2{font-size:16px; text-align:center;}
        @page { size: A4 portrait; margin: 0; }
    </style></head><body>`);
    pWin.document.write('<div id="p-wrap">' + content + '</div>');
    pWin.document.write('</body></html>');
    pWin.document.close();
    setTimeout(() => { pWin.print(); pWin.close(); }, 1000);
}

function resetRoutineTool() {
    document.querySelectorAll('#routineMakerModal input').forEach(i => i.value = "");
    rtData = {}; initializeRtData(); renderRtInputs(); updateRoutine();
}
