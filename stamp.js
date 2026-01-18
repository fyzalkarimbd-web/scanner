function openStampModal() {
    var modal = document.getElementById('stampModal');
    if (modal) {
        modal.style.display = 'flex';
        if (typeof setActiveMode === 'function') setActiveMode('mode-stamp');
        const list = document.getElementById('stamp-pages-list');
        if (list.innerHTML.trim() === "") addNewStampPage();
    }
}

function closeStampModal() { document.getElementById('stampModal').style.display = 'none'; }

function execCmd(command, value = null) { document.execCommand(command, false, value); }

// সব পাতার মার্জিন একসাথে পরিবর্তন করার ফাংশন
function updateAllStampMargins(val) {
    const allPageBodies = document.querySelectorAll('.stamp-body');
    allPageBodies.forEach(body => {
        body.style.paddingTop = val + 'px';
    });
    document.getElementById('margin-val').innerText = (val/100).toFixed(1) + " Inch";
}

function addNewStampPage() {
    const list = document.getElementById('stamp-pages-list');
    const pageDiv = document.createElement('div');
    pageDiv.className = 'stamp-page-unit';
    
    // বর্তমান স্লাইডারের ভ্যালু নেওয়া
    const currentVal = document.getElementById('stamp-margin-slider').value;
    
    pageDiv.innerHTML = `
        <button class="del-page-icon" onclick="removeThisStampPage(this)" style="position:absolute; top:10px; right:10px; background:#ef4444; color:#fff; border:none; border-radius:50%; width:30px; height:30px; cursor:pointer; z-index:10;"><i class="fa-solid fa-xmark"></i></button>
        <div contenteditable="true" class="stamp-body" style="padding-top: ${currentVal}px" spellcheck="false"></div>
    `;
    list.appendChild(pageDiv);
    pageDiv.scrollIntoView({ behavior: 'smooth' });
}

function removeThisStampPage(btn) {
    const pages = document.querySelectorAll('.stamp-page-unit');
    if (pages.length > 1) {
        btn.parentElement.remove();
    } else {
        if (typeof triggerAlert === 'function') triggerAlert("At least one page is required.");
    }
}

function clearStampWriter() {
    document.getElementById('stamp-pages-list').innerHTML = "";
    addNewStampPage();
}

function printStampContent() {
    const pages = document.querySelectorAll('.stamp-page-unit');
    let allHtml = "";
    const currentMargin = document.getElementById('stamp-margin-slider').value;

    pages.forEach((page) => {
        const content = page.querySelector('.stamp-body').innerHTML;
        // সব পেজের জন্য একই মার্জিন ব্যবহার করা হয়েছে
        allHtml += `<div class="print-page" style="padding-top: ${currentMargin}px">${content}</div>`;
    });

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <title>Legal_Document_Print</title>
                <style>
                    @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
                    @page { size: 216mm 345mm; margin: 0; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    body { margin: 0; padding: 0; background: #fff; }
                    .print-page {
                        width: 215mm; height: 345mm;
                        padding: 20mm; margin: 0 auto;
                        font-family: 'SolaimanLipi', Arial, sans-serif;
                        font-size: 19px; line-height: 1.8;
                        color: #000; box-sizing: border-box;
                        word-wrap: break-word; text-align: justify;
                        page-break-after: always;
                        background: none !important;
                    }
                    u { text-decoration: underline !important; text-underline-offset: 4px; }
                    b, strong { font-weight: bold !important; }
                </style>
            </head>
            <body>
                ${allHtml}
                <script>
                    window.onload = function() {
                        setTimeout(() => { window.print(); window.close(); }, 500);
                    };
                <\/script>
            </body>
        </html>
    `);
    printWin.document.close();
}
