let fqQuestions = [];
let fqLogoSrc = null;
let fqLang = "bn";

function openFqModal() {
    const modal = document.getElementById('fqMakerModal');
    if (modal) {
        modal.style.display = 'flex';
        if(typeof setActiveMode === "function") setActiveMode('mode-fq-maker');
        setFqLang(fqLang);
    }
}

function closeFqModal() {
    document.getElementById('fqMakerModal').style.display = 'none';
}

function toFqNum(n) {
    if (fqLang !== 'bn') return n;
    const digits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return n.toString().replace(/\d/g, d => digits[d]);
}

function setFqLang(lang) {
    fqLang = lang;
    document.getElementById('fq-btn-bn').classList.toggle('active', lang === 'bn');
    document.getElementById('fq-btn-en').classList.toggle('active', lang === 'en');
    
    const ui = {
        bn: { title: "পরীক্ষার প্রশ্নপত্র মেকার", step1: "১. প্রতিষ্ঠানের তথ্য", step2: "২. প্রশ্নপত্র তৈরি করুন", btnP: "প্রিন্ট করুন", btnR: "সব মুছুন", inst: "প্রতিষ্ঠানের নাম", exam: "পরীক্ষার নাম", cls: "শ্রেণি", sub: "বিষয়", time: "সময়", marks: "পূর্ণমান", addDesc: "+ বড় প্রশ্ন", addMcq: "+ MCQ প্রশ্ন" },
        en: { title: "Exam Question Paper Maker", step1: "1. Institution Info", step2: "2. Create Questions", btnP: "Direct Print", btnR: "Clear All", inst: "Institution Name", exam: "Exam Title", cls: "Class", sub: "Subject", time: "Time", marks: "Marks", addDesc: "+ Descriptive Q.", addMcq: "+ MCQ Question" }
    };
    
    document.getElementById('fq-main-title').innerText = ui[lang].title;
    document.getElementById('lbl-step1').innerText = ui[lang].step1;
    document.getElementById('lbl-step2').innerText = ui[lang].step2;
    document.getElementById('fq-name').placeholder = ui[lang].inst;
    document.getElementById('fq-exam-title').placeholder = ui[lang].exam;
    document.getElementById('fq-class').placeholder = ui[lang].cls;
    document.getElementById('fq-sub').placeholder = ui[lang].sub;
    document.getElementById('fq-time').placeholder = ui[lang].time;
    document.getElementById('fq-marks').placeholder = ui[lang].marks;
    document.getElementById('btn-add-desc').innerText = ui[lang].addDesc;
    document.getElementById('btn-add-mcq').innerText = ui[lang].addMcq;
    document.getElementById('btn-fq-print').innerHTML = `<i class='fa-solid fa-print'></i> ${ui[lang].btnP}`;
    document.getElementById('btn-fq-reset').innerHTML = `<i class='fa-solid fa-trash-can'></i> ${ui[lang].btnR}`;
    
    renderFqInputs();
    drawFq();
}

function loadFqLogo(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
        fqLogoSrc = e.target.result;
        document.getElementById('fq-logo-pv').src = fqLogoSrc;
        document.getElementById('fq-logo-pv').style.display = 'block';
        document.getElementById('fq-plus-ico').style.display = 'none';
        drawFq();
    };
    reader.readAsDataURL(event.target.files[0]);
}

function addFqItem(type) {
    fqQuestions.push({ id: Date.now(), type, qText: '', options: ['', '', '', ''], marks: '' });
    renderFqInputs();
    drawFq();
}

function removeFqItem(id) {
    fqQuestions = fqQuestions.filter(q => q.id !== id);
    renderFqInputs();
    drawFq();
}

function updateFqData(id, field, val, optIdx = null) {
    const q = fqQuestions.find(i => i.id === id);
    if (optIdx !== null) q.options[optIdx] = val;
    else q[field] = val;
    drawFq();
}

function renderFqInputs() {
    const container = document.getElementById('fq-questions-container');
    if (!container) return;
    container.innerHTML = "";

    fqQuestions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = "fq-q-card";

        const qLabel = (fqLang === 'bn') ? 'প্রশ্ন' : 'Question';
        const qPlace = (fqLang === 'bn') ? 'প্রশ্ন লিখুন...' : 'Type question...';
        const optPlace = (fqLang === 'bn') ? 'অপশন' : 'Option';
        const marksPlace = (fqLang === 'bn') ? 'মার্কস' : 'Marks';

        let html = `<button class="fq-rem-btn" onclick="removeFqItem(${q.id})">&times;</button>
            <small style="font-weight:800; color:#4f46e5;">${qLabel} ${toFqNum(index+1)} (${q.type === 'mcq' ? 'MCQ' : (fqLang === 'bn' ? 'বড়' : 'Descriptive')})</small>
            <textarea placeholder="${qPlace}" oninput="updateFqData(${q.id}, 'qText', this.value)">${q.qText}</textarea>`;
        
        if (q.type === 'mcq') {
            html += `<div class="fq-grid-2">
                ${q.options.map((opt, i) => `
                    <input placeholder="${optPlace} ${toFqNum(i+1)}" value="${opt}" oninput="updateFqData(${q.id}, 'options', this.value, ${i})"/>
                `).join('')}
            </div>`;
        }

        html += `<input placeholder="${marksPlace}" value="${q.marks}" oninput="updateFqData(${q.id}, 'marks', this.value)" style="width:85px; margin-top:5px; font-weight:bold;"/>`;
        
        div.innerHTML = html;
        container.appendChild(div);
    });
}

function drawFq() {
    const inst = document.getElementById('fq-name').value || (fqLang === 'bn' ? "প্রতিষ্ঠানের নাম" : "Institution Name");
    const exam = document.getElementById('fq-exam-title').value || (fqLang === 'bn' ? "পরীক্ষার নাম" : "Exam Title");
    const labels = fqLang === 'bn' ? ['শ্রেণি', 'বিষয়', 'সময়', 'পূর্ণমান'] : ['Class', 'Subject', 'Time', 'Marks'];
    const optLabels = fqLang === 'bn' ? ['(ক)', '(খ)', '(গ)', '(ঘ)'] : ['(a)', '(b)', '(c)', '(d)'];

    let html = `<div style="text-align:center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 10px;">
                    ${fqLogoSrc ? `<img src="${fqLogoSrc}" style="height:45px; margin-bottom:5px;">` : ''}
                    <h1 style="margin:0; font-size:20px;">${inst}</h1>
                    <h2 style="margin:2px 0; font-size:15px;">${exam}</h2>
                </div>
                <div style="display:flex; justify-content:space-between; font-weight:bold; border-bottom: 1px solid #000; padding-bottom:5px; margin-bottom:15px; font-size:13px;">
                    <span>${labels[0]}: ${document.getElementById('fq-class').value}</span>
                    <span>${labels[1]}: ${document.getElementById('fq-sub').value}</span>
                    <span>${labels[2]}: ${document.getElementById('fq-time').value}</span>
                    <span>${labels[3]}: ${toFqNum(document.getElementById('fq-marks').value)}</span>
                </div>`;

    fqQuestions.forEach((q, index) => {
        html += `<div style="margin-bottom:10px; line-height:1.4;">
                    <div style="display:flex; justify-content:space-between;">
                        <span><b>${toFqNum(index+1)}.</b> ${q.qText}</span>
                        <b>${toFqNum(q.marks)}</b>
                    </div>
                    ${q.type === 'mcq' ? `<div style="display:grid; grid-template-columns: 1fr 1fr; margin-left:20px; font-size:12px;">
                        ${q.options.map((opt, i) => `<span>${optLabels[i]} ${opt}</span>`).join('')}
                    </div>` : ''}
                </div>`;
    });
    document.getElementById('fq-render-area').innerHTML = html;
}

function printFqPaper() {
    const printContent = document.getElementById('fq-render-area').innerHTML;
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Question Paper</title>');
    printWindow.document.write('<link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">');
    printWindow.document.write('<style>body{margin:0;padding:0;background:#fff;}#print-wrapper{width:210mm;height:297mm;padding:20mm;box-sizing:border-box;font-family:"SolaimanLipi",Arial,sans-serif!important;font-size:14px;color:#000;}#print-wrapper * {font-family:"SolaimanLipi",Arial,sans-serif!important;} @page{size:A4;margin:0;}h1,h2{margin:5px 0;text-align:center;}</style></head><body>');
    printWindow.document.write('<div id="print-wrapper">' + printContent + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 700);
}

function resetFqTool() {
    document.querySelectorAll('#fqMakerModal input').forEach(i => i.value = "");
    document.querySelectorAll('#fqMakerModal textarea').forEach(i => i.value = "");
    fqQuestions = []; fqLogoSrc = null;
    document.getElementById('fq-logo-pv').style.display = 'none';
    document.getElementById('fq-plus-ico').style.display = 'block';
    renderFqInputs(); drawFq();
}
