function openSheetModal() {
    var modal = document.getElementById('sheetModal');
    if (modal) {
        modal.style.display = 'flex';
        if (typeof setActiveMode === 'function') setActiveMode('mode-sheet');
        setTimeout(initResizers, 100);
    }
}

function closeSheetModal() {
    document.getElementById('sheetModal').style.display = 'none';
}

function execCmd(command, value = null) {
    // জাস্টিফাই ফুল কমান্ডটি টেবিলের জন্য ফিক্সড করা হলো
    if (command === "justifyFull") {
        document.execCommand("justifyFull", false, value);
    } else {
        document.execCommand(command, false, value);
    }
    updateToolbarUI();
}

function autoSerialToggle() {
    const table = document.getElementById('editable-table');
    const rows = table.querySelectorAll('tr');
    const isHidden = rows[0].cells[0].classList.contains('hide-col');

    rows.forEach((row, index) => {
        const cell = row.cells[0];
        if (isHidden) {
            cell.classList.remove('hide-col');
            if (index > 0) cell.innerText = index;
        } else {
            cell.classList.add('hide-col');
        }
    });
}

function updateSheetLayout() {
    const size = document.getElementById('sheet-page-size').value;
    const page = document.getElementById('main-sheet-page');
    page.style.height = "auto"; 
    if (size === 'legal') {
        page.style.width = "216mm";
        page.style.minHeight = "345mm";
    } else {
        page.style.width = "210mm";
        page.style.minHeight = "297mm";
    }
}

function addRow() {
    const tableBody = document.getElementById('table-body');
    const rows = document.querySelectorAll('#editable-table tr');
    const colCount = rows[0].cells.length;
    const isSlHidden = rows[0].cells[0].classList.contains('hide-col');

    const newRow = document.createElement('tr');
    for (let i = 0; i < colCount; i++) {
        const cell = document.createElement('td');
        cell.contentEditable = "true";
        cell.style.fontFamily = "'SolaimanLipi', sans-serif";
        if (i === 0 && isSlHidden) cell.classList.add('hide-col');
        newRow.appendChild(cell);
    }
    tableBody.appendChild(newRow);
    
    if (!isSlHidden) {
        const allRows = document.querySelectorAll('#table-body tr');
        allRows.forEach((r, idx) => { r.cells[0].innerText = idx + 1; });
    }
}

function deleteRow() {
    const rows = document.querySelectorAll('#table-body tr');
    if (rows.length > 1) rows[rows.length - 1].remove();
}

function addColumn() {
    const table = document.getElementById('editable-table');
    const rows = table.querySelectorAll('tr');
    
    rows.forEach((row, index) => {
        const cell = document.createElement(index === 0 ? 'th' : 'td');
        cell.contentEditable = "true";
        cell.style.fontFamily = "'SolaimanLipi', sans-serif";
        
        // এটি নতুন যোগ করা হলো: নিশ্চিত করবে লেখা সবসময় সেন্টারে থাকবে
        cell.style.textAlign = "center"; 
        cell.style.verticalAlign = "middle";

        if (index === 0) {
            cell.innerHTML = "New"; // ডিফল্ট টেক্সট (ঐচ্ছিক)
        }
        
        row.appendChild(cell);
    });
    
    // নতুন কলামের জন্য রিসাইজার হ্যান্ডেল বসানো
    initResizers();
}

function deleteColumn() {
    const table = document.getElementById('editable-table');
    const rows = table.querySelectorAll('tr');
    if (rows[0].cells.length > 1) {
        rows.forEach(row => row.deleteCell(-1));
    }
}

function initResizers() {
    const table = document.getElementById('editable-table');
    const headerRow = table.querySelector('thead tr');
    if(!headerRow) return;
    const cols = headerRow.querySelectorAll('th');
    
    cols.forEach(col => {
        if (!col.querySelector('.resizer')) {
            const resizer = document.createElement('div');
            resizer.className = 'resizer';
            col.appendChild(resizer);
            
            let x = 0;
            let w = 0;
            const onMouseMove = (e) => {
                const dx = e.clientX - x;
                col.style.width = `${w + dx}px`;
            };
            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            resizer.addEventListener('mousedown', (e) => {
                x = e.clientX;
                const styles = window.getComputedStyle(col);
                w = parseInt(styles.width, 10);
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        }
    });
}

function resetTable() {
    document.querySelector('.sheet-header-box').innerHTML = "";
    document.querySelector('.sheet-sub-header-box').innerHTML = "";
    document.querySelector('.sheet-footer-box').innerHTML = "";
    
    const table = document.getElementById('editable-table');
    table.style.width = "100%"; 
    
    const tableHead = table.querySelector('thead');
    tableHead.innerHTML = `<tr><th class='sl-column' contenteditable='true' style='width: 50px;'>SL</th><th contenteditable='true'>Item Description</th><th contenteditable='true'>Qty</th><th contenteditable='true'>Price</th><th contenteditable='true'>Total</th></tr>`;
    
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = `<tr><td class='sl-column' contenteditable='true'>1</td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td><td contenteditable='true'></td></tr>`;
    
    document.querySelectorAll('.sl-column').forEach(cell => cell.classList.remove('hide-col'));
    document.getElementById('sheet-page-size').value = "a4";
    updateSheetLayout();
    
    setTimeout(initResizers, 100);
    const scrollArea = document.getElementById('sheet-scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;
}

// টুলবার UI সিঙ্ক লজিক - আপনার চাহিদা অনুযায়ী আপডেট করা হয়েছে
function updateToolbarUI() {
    // ১. ফন্ট সাইজ ডিটেকশন ও সিঙ্ক
    const fontSize = document.queryCommandValue("fontSize");
    const sizeSelector = document.getElementById('sheet-font-size');
    if (sizeSelector && fontSize) {
        sizeSelector.value = fontSize; 
    }

    // ২. টেক্সট কালার ডিটেকশন ও সিঙ্ক
    const foreColor = document.queryCommandValue("foreColor");
    const fontColorInput = document.getElementById('sheet-font-color');
    if (fontColorInput && foreColor) {
        fontColorInput.value = rgbToHex(foreColor);
    }

    // ৩. হাইলাইট কালার ডিটেকশন ও সিঙ্ক
    const bgColor = document.queryCommandValue("hiliteColor");
    const bgColorInput = document.getElementById('sheet-bg-color');
    if (bgColorInput && bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
        bgColorInput.value = rgbToHex(bgColor);
    }
}

// RGB থেকে HEX রূপান্তর ফাংশন
function rgbToHex(rgb) {
    if (!rgb || rgb.indexOf("rgb") === -1) return rgb.startsWith('#') ? rgb : "#000000";
    const parts = rgb.match(/\d+/g);
    const r = parseInt(parts[0]).toString(16).padStart(2, '0');
    const g = parseInt(parts[1]).toString(16).padStart(2, '0');
    const b = parseInt(parts[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

// সিলেকশন চেঞ্জ লিসেনার - এটিই আপনার ম্যাজিক লজিক
document.addEventListener('selectionchange', () => {
    const modal = document.getElementById('sheetModal');
    if (modal && modal.style.display === 'flex') {
        updateToolbarUI();
    }
});

/* --- ডাইনামিক ফাইলনাম সহ প্রিন্ট ফাংশন --- */
function printSheetContent() {
    const header = document.querySelector('.sheet-header-box').innerHTML;
    const subHeader = document.querySelector('.sheet-sub-header-box').innerHTML;
    const tableHtml = document.getElementById('editable-table').outerHTML;
    const footer = document.querySelector('.sheet-footer-box').innerHTML;
    
    const size = document.getElementById('sheet-page-size').value;
    const pageDim = (size === 'legal') ? '216mm 345mm' : 'A4';

    // --- ফাইলনাম কাউন্টার লজিক শুরু ---
    // ব্রাউজারে আগে কোনো নাম্বার সেভ আছে কি না চেক করা, না থাকলে ০ থেকে শুরু
    let currentNum = localStorage.getItem('table_sheet_count') || 0;
    currentNum = parseInt(currentNum) + 1; // নাম্বার ১ বাড়ানো
    localStorage.setItem('table_sheet_count', currentNum); // নতুন নাম্বার সেভ করা

    // আপনার চাহিদা অনুযায়ী ফাইল নাম তৈরি
    const customFileName = `Table-Sheet-www.idcardscannerpro.com-${currentNum}`;
    // --- ফাইলনাম কাউন্টার লজিক শেষ ---

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <!-- এখানে ফাইল নাম সেট করা হলো যা পিডিএফ সেভ করার সময় দেখাবে -->
                <title>${customFileName}</title>
                <style>
                    @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
                    @page { size: ${pageDim}; margin: 15mm; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    body { 
                        font-family: 'SolaimanLipi', Arial, sans-serif !important; 
                        background: #fff; margin: 0; padding: 0; text-align: justify;
                    }
                    .p-header { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 5px; font-family: 'SolaimanLipi' !important; }
                    .p-sub { font-size: 16px; margin-bottom: 20px; text-align: left; font-family: 'SolaimanLipi' !important; }
                    table { width: 100%; border-collapse: collapse; font-family: 'SolaimanLipi' !important; page-break-inside: auto; }
                    tr { page-break-inside: avoid; page-break-after: auto; }
                    thead { display: table-header-group; }
                    th, td { border: 1px solid #000; padding: 8px; text-align: center; font-size: 14px; word-wrap: break-word; }
                    th { background: #f1f5f9 !important; }
                    .p-footer { margin-top: 30px; font-size: 14px; font-family: 'SolaimanLipi' !important; }
                    .hide-col, .resizer { display: none !important; }
                    u { text-decoration: underline !important; text-underline-offset: 3px; }
                </style>
            </head>
            <body>
                <div class="p-header">${header}</div>
                <div class="p-sub">${subHeader}</div>
                ${tableHtml}
                <div class="p-footer">${footer}</div>
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
