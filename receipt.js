let memoLang = "en";

function openMemoModal() {
    var modal = document.getElementById('memoModal');
    if (modal) {
        modal.style.display = 'flex';
        if (typeof setActiveMode === 'function') setActiveMode('mode-memo');
        loadMemoSettings();
        updateMemoDate();
    }
}

function getTodayDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

function updateMemoDate() {
    const dateLabel = document.getElementById('txt-date');
    if (dateLabel && dateLabel.nextSibling) {
        const today = getTodayDate();
        dateLabel.nextSibling.textContent = " " + convertDigits(today, memoLang);
    }
}

function closeMemoModal() { document.getElementById('memoModal').style.display = 'none'; }

const memoTranslations = {
    en: { title: "Cash Memo Pro", save: "Save Info", add: "Add Item", receipt: "Receipt No:", date: "Date:", sl: "SL", desc: "Description", qty: "Qty", rate: "Rate", total: "Total", grand: "Grand Total:", words: "In Words:", sigC: "Customer Signature", sigA: "Authorized Signature", name: "Name:", addr: "Address:", mob1: "Mobile:", termsP: "Terms & Conditions (Optional)" },
    bn: { title: "ক্যাশ মেমো প্রো", save: "তথ্য সেভ করুন", add: "আইটেম যোগ", receipt: "রশিদ নং:", date: "তারিখ:", sl: "ক্রমিঃ", desc: "বিবরণ", qty: "পরিমাণ", rate: "দর", total: "মোট", grand: "সর্বমোট:", words: "কথায়:", sigC: "ক্রেতার স্বাক্ষর", sigA: "বিক্রেতার স্বাক্ষর", name: "নাম:", addr: "ঠিকানা:", mob1: "মোবাইল:", termsP: "শর্তাবলী (ঐচ্ছিক)" }
};

function convertDigits(text, toLang) {
    if (!text) return "";
    const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    let res = text.toString();
    if (toLang === 'bn') {
        enDigits.forEach((en, i) => { res = res.split(en).join(bnDigits[i]); });
    } else {
        bnDigits.forEach((bn, i) => { res = res.split(bn).join(enDigits[i]); });
    }
    return res;
}

function handleTableInput(el) {
    if (memoLang === 'bn') {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const offset = range.startOffset;
        const original = el.innerText;
        const converted = convertDigits(original, 'bn');
        if (original !== converted) {
            el.innerText = converted;
            const newRange = document.createRange();
            const textNode = el.childNodes[0];
            if (textNode) {
                newRange.setStart(textNode, Math.min(offset, textNode.length));
                newRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(newRange);
            }
        }
    }
    calculateMemoTotal();
}

function switchMemoLang(lang) {
    memoLang = lang;
    const t = memoTranslations[lang];
    document.getElementById('memo-en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('memo-bn-btn').classList.toggle('active', lang === 'bn');
    document.getElementById('memo-tool-title').innerText = t.title;
    document.getElementById('txt-save-settings').innerText = t.save;
    document.getElementById('txt-add-item').innerText = t.add;
    document.getElementById('lbl-name').innerText = t.name;
    document.getElementById('lbl-addr').innerText = t.addr;
    document.getElementById('lbl-mob1').innerText = t.mob1;

    const rLabel = document.getElementById('txt-receipt');
    const dLabel = document.getElementById('txt-date');
    if(rLabel.nextSibling) rLabel.nextSibling.textContent = " " + convertDigits(rLabel.nextSibling.textContent.trim(), lang);
    if(dLabel.nextSibling) dLabel.nextSibling.textContent = " " + convertDigits(dLabel.nextSibling.textContent.trim(), lang);
    rLabel.innerText = t.receipt;
    dLabel.innerText = t.date;

    document.getElementById('txt-sl').innerText = t.sl;
    document.getElementById('txt-desc').innerText = t.desc;
    document.getElementById('txt-qty').innerText = t.qty;
    document.getElementById('txt-rate').innerText = t.rate;
    document.getElementById('txt-total').innerText = t.total;
    document.getElementById('txt-grand').innerText = t.grand;
    document.getElementById('txt-words-label').innerText = t.words;
    document.getElementById('txt-sig-cust').innerText = t.sigC;
    document.getElementById('txt-sig-auth').innerText = t.sigA;
    document.getElementById('txt-terms-placeholder').setAttribute('data-placeholder', t.termsP);

    document.querySelectorAll('#memo-body tr').forEach((row, i) => {
        row.cells[0].innerText = convertDigits(i + 1, lang);
        row.cells[2].innerText = convertDigits(row.cells[2].innerText, lang);
        row.cells[3].innerText = convertDigits(row.cells[3].innerText, lang);
    });
    calculateMemoTotal();
}

function calculateMemoTotal() {
    const rows = document.querySelectorAll('#memo-body tr');
    let grandTotal = 0;
    rows.forEach(row => {
        const qty = parseFloat(convertDigits(row.cells[2].innerText, 'en')) || 0;
        const rate = parseFloat(convertDigits(row.cells[3].innerText, 'en')) || 0;
        const total = qty * rate;
        row.cells[4].innerText = convertDigits(total.toFixed(2), memoLang);
        grandTotal += total;
    });
    document.getElementById('memo-grand-total').innerText = convertDigits(grandTotal.toFixed(2), memoLang);
    document.getElementById('memo-words-display').innerText = numberToWords(grandTotal, memoLang);
}

function numberToWords(amount, lang) {
    const mainAmount = Math.floor(amount);
    const paisaAmount = Math.round((amount - mainAmount) * 100);
    if (amount == 0) return lang === 'en' ? "Zero Taka only." : "শূণ্য টাকা মাত্র।";
    function toEnWords(n) {
        const a = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
        const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
        if (n < 1000) return toEnWords(Math.floor(n / 100)) + "Hundred " + (n % 100 !== 0 ? "and " + toEnWords(n % 100) : "");
        if (n < 100000) return toEnWords(Math.floor(n / 1000)) + "Thousand " + (n % 1000 !== 0 ? toEnWords(n % 1000) : "");
        if (n < 10000000) return toEnWords(Math.floor(n / 100000)) + "Lakh " + (n % 100000 !== 0 ? toEnWords(n % 100000) : "");
        return "Large Amount";
    }
    const bnNums = ["শূণ্য", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়", "দশ", "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোলো", "সতেরো", "আঠারো", "উনিশ", "বিশ", "একুশ", "বাইশ", "তেইশ", "চব্বিশ", "পঁচিশ", "ছাব্বিশ", "সাতাশ", "আটাশ", "ঊনত্রিশ", "ত্রিশ", "একত্রিশ", "বত্রিশ", "তেত্রিশ", "চৌত্রিশ", "পঁয়ত্রিশ", "ছত্রিশ", "সাঁইত্রিশ", "আটত্রিশ", "ঊনচল্লিশ", "চল্লিশ", "একচল্লিশ", "বিয়াল্লিশ", "তেতাল্লিশ", "চুয়াল্লিশ", "পঁয়তাল্লিশ", "ছেচল্লিশ", "সাতচল্লিশ", "আটচল্লিশ", "ঊনপঞ্চাশ", "পঞ্চাশ", "একান্ন", "বাহান্ন", "তিপ্পান্ন", "চুয়াল্লিশ", "পঞ্চান্ন", "ছাপ্পান্ন", "সাতান্ন", "আটান্ন", "ঊনষাট", "ষাট", "একষট্টি", "বাষট্টি", "তেষট্টি", "চৌষট্টি", "পঁয়ষট্টি", "ছেষট্টি", "সাতষট্টি", "আটষট্টি", "ঊনসত্তর", "সত্তর", "একাত্তর", "বাহাত্তর", "তেয়াত্তর", "চুয়াত্তর", "পঁচাত্তর", "ছেয়াত্তর", "সাতাত্তর", "আটাত্তর", "ঊনআশি", "আশি", "একাশি", "বিরাশি", "তিরাশি", "চুরাশি", "পঁচাশী", "ছেয়াশি", "সাতাশি", "আটাশি", "ঊননব্বই", "নব্বই", "একানব্বই", "বিরানব্বই", "তিরানব্বই", "চুরানব্বই", "পঁচানব্বই", "ছেয়ানব্বই", "সাতানব্বই", "আটানব্বই", "নিরানব্বই"];
    function toBnWords(n) {
        if (n == 0) return "";
        if (n < 100) return bnNums[n] + " ";
        if (n < 1000) return bnNums[Math.floor(n / 100)] + "শত " + toBnWords(n % 100);
        if (n < 100000) return toBnWords(Math.floor(n / 1000)) + "হাজার " + toBnWords(n % 1000);
        if (n < 10000000) return toBnWords(Math.floor(n / 100000)) + "লক্ষ " + toBnWords(n % 100000);
        return toBnWords(Math.floor(n / 10000000)) + "কোটি " + toBnWords(n % 10000000);
    }
    let res = "";
    if (lang === 'en') {
        res = toEnWords(mainAmount) + "Taka ";
        if (paisaAmount > 0) res += "and " + toEnWords(paisaAmount) + " Paisa ";
        res += "Only.";
    } else {
        res = toBnWords(mainAmount) + "টাকা ";
        if (paisaAmount > 0) res += convertDigits(paisaAmount, 'bn') + " পয়সা ";
        res += "মাত্র।";
    }
    return res;
}

function saveMemoSettings() {
    const shopData = {
        name: document.getElementById('set-shop-name').innerHTML,
        addr: document.getElementById('set-shop-addr').innerHTML,
        mob: document.getElementById('set-shop-mob').innerHTML,
        email: document.getElementById('set-shop-email').innerHTML,
        logo: document.getElementById('memo-img').src,
        // নতুন যুক্ত করা হলো শর্তাবলী সেভ করার জন্য
        terms: document.getElementById('txt-terms-placeholder').innerHTML 
    };
    
    // ব্রাউজারে ডাটা সেভ করা হচ্ছে
    localStorage.setItem('memo_shop_data_v3', JSON.stringify(shopData));
    
    if(typeof triggerAlert === 'function') {
        triggerAlert("Shop Info & Terms saved successfully!");
    } else {
        alert("Shop Info & Terms saved successfully!");
    }
}

function loadMemoSettings() {
    const data = JSON.parse(localStorage.getItem('memo_shop_data_v3'));
    if (data) {
        // দোকানের নাম, ঠিকানা, মোবাইল ও ইমেইল লোড
        if(data.name) document.getElementById('set-shop-name').innerHTML = data.name;
        if(data.addr) document.getElementById('set-shop-addr').innerHTML = data.addr;
        if(data.mob) document.getElementById('set-shop-mob').innerHTML = data.mob;
        if(data.email) document.getElementById('set-shop-email').innerHTML = data.email;
        
        // শর্তাবলী (Terms & Conditions) লোড
        if(data.terms) document.getElementById('txt-terms-placeholder').innerHTML = data.terms;
        
        // লোগো লোড
        if(data.logo && data.logo.startsWith('data:image')) {
            document.getElementById('memo-img').src = data.logo;
            document.getElementById('memo-img').style.display = 'block';
            document.getElementById('txt-logo-hint').style.display = 'none';
        }
    }
}

function addMemoRow() {
    const body = document.getElementById('memo-body');
    const row = document.createElement('tr');
    const sl = body.rows.length + 1;
    row.innerHTML = `<td>${convertDigits(sl, memoLang)}</td><td contenteditable='true' style='text-align:left'></td><td contenteditable='true' oninput='handleTableInput(this)'>${convertDigits(1, memoLang)}</td><td contenteditable='true' oninput='handleTableInput(this)'>${convertDigits(0, memoLang)}</td><td class='row-total'>${convertDigits("0.00", memoLang)}</td><td class='no-print' style='border:none;'><button onclick='removeMemoRow(this)' style='color:red; background:none; border:none; cursor:pointer; font-size:18px;'>&#215;</button></td>`;
    body.appendChild(row);
}

function removeMemoRow(btn) {
    if (document.querySelectorAll('#memo-body tr').length > 1) {
        btn.closest('tr').remove();
        document.querySelectorAll('#memo-body tr').forEach((r, i) => r.cells[0].innerText = convertDigits(i + 1, memoLang));
        calculateMemoTotal();
    }
}

function loadMemoLogo(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById('memo-img');
            img.src = e.target.result;
            img.style.display = 'block';
            document.getElementById('txt-logo-hint').style.display = 'none';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function updateMemoLayout() {
    const size = document.getElementById('memo-page-size').value;
    const page = document.getElementById('memo-page-unit');
    const dims = { a4: ["210mm", "297mm"], legal: ["216mm", "345mm"], a5: ["148mm", "210mm"], letter: ["216mm", "279mm"] };
    page.style.width = dims[size][0];
    page.style.minHeight = dims[size][1];
}

function printMemoContent() {
    const content = document.getElementById('memo-page-unit').innerHTML;
    const size = document.getElementById('memo-page-size').value;
    const dims = { 
        a4: "210mm 297mm", 
        legal: "216mm 345mm", 
        a5: "148mm 210mm", 
        letter: "216mm 279mm" 
    };

    let memoPdfCount = localStorage.getItem('memo_pdf_print_count') || 0;
    memoPdfCount = parseInt(memoPdfCount) + 1;
    localStorage.setItem('memo_pdf_print_count', memoPdfCount);

    const bnCount = convertDigits(memoPdfCount, 'bn'); 
    
    const customFileName = `Cash_Memo-www.idcardscannerpro.com-${bnCount}`;

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <title>${customFileName}</title>
                <style>
                    @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
                    
                    @page { 
                        size: ${dims[size]}; 
                        margin: 15mm 10mm; 
                    }
                    
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    
                    body { 
                        font-family: 'SolaimanLipi', Arial, sans-serif; 
                        padding: 0; margin: 0; background: #fff; 
                    }

                    table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin-top: 10px; 
                        border: none !important; 
                        page-break-inside: auto;
                    }
                    
                    thead { display: table-header-group; } 

                    tfoot { display: table-row-group !important; } 
                    
                    tr { page-break-inside: avoid; }

                    th, td { 
                        border: 1px solid #0d9488 !important; 
                        padding: 8px; 
                        text-align: center; 
                    }
                    
                    th { background:#0d9488 !important; color:#fff !important; }

                    .memo-header-top { display: flex; align-items: center; border-bottom: 1px solid #ff3c00; padding-bottom: 10px; margin-bottom: 15px; }
                    .logo-preview img { width: 80px; height: 80px; object-fit: contain; }
                    .shop-info { text-align: center; flex:1; }
                    .shop-info h1 { font-size: 24px; color: #0d9488; margin:0; }
                    .shop-details-row { display: flex; justify-content: center; gap: 8px; margin-top: 5px; }
                    .detail-box { border: 1px dashed #ff6000; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
                    .memo-sub-header { display: flex; justify-content: space-between; color: #000; border-bottom: 1px solid #0d9488; }
                    .memo-customer-container { 
                        border: 1px dashed #0d9488;
                        border-radius: 5px;
                        padding: 10px; 
                        margin-top: 20px !important; 
                        margin-bottom: 15px; 
                    }
                    .cust-info-row-inline { display: flex; gap: 10px; width: 100%; }
                    .cust-field-inline { border-bottom: 1px solid #eee; flex: 1; font-size: 13px; display: flex; gap: 5px; }
                    
                    .signature-row, .in-words-box, .memo-notes {
                        page-break-inside: avoid;
                    }

                    .signature-row { display: flex; justify-content: space-between; margin-top: 50px; }
                    .sig-box { border-top: 1px solid #0d9488;
                        width: 180px;
                        text-align: center;
                        font-size: 13px;
                        padding-top: 5px;
                        font-weight: 700;
                        color: #0d9488;
                    }
                    .in-words-box { margin-top: 20px; font-weight: bold; border-bottom: 1px dashed #0d9488; color: #000; }
                    .memo-notes {
                        margin-top: 35px;
                        font-size: 12px;
                        color: #f00;
                        border-top: 1px dashed #0d9488;
                        padding-top: 10px;
                        outline: none;
                        text-align: center;
                    }
                    .no-print { display:none !important; }
                </style>
            </head>
            <body>
                <div class="sheet-page-unit">${content}</div>
                <script>
                    window.onload = function() {
                        setTimeout(() => { 
                            window.print(); 
                            window.close(); 
                        }, 500);
                    };
                <\/script>
            </body>
        </html>
    `);
    printWin.document.close();
}

function resetMemo() {
    document.getElementById('memo-body').innerHTML = `
        <tr>
            <td class="sl-cell">${convertDigits(1, memoLang)}</td>
            <td contenteditable="true" style="text-align: left;"></td>
            <td contenteditable="true" oninput="handleTableInput(this)">${convertDigits(1, memoLang)}</td>
            <td contenteditable="true" oninput="handleTableInput(this)">${convertDigits(0, memoLang)}</td>
            <td class="row-total">${convertDigits("0.00", memoLang)}</td>
            <td class="no-print" style="border:none;">
                <button onclick="removeMemoRow(this)" style="color:red; background:none; border:none; cursor:pointer; font-size:18px;">&times;</button>
            </td>
        </tr>`;

    document.getElementById('memo-grand-total').innerText = convertDigits("0.00", memoLang);
    document.getElementById('memo-words-display').innerText = memoLang === 'en' ? "Zero Taka only." : "শূণ্য টাকা মাত্র।";

    document.getElementById('txt-cust-name').innerText = "";
    document.getElementById('txt-cust-addr').innerText = "";
    document.getElementById('txt-cust-mob1').innerText = "";

    if (typeof updateMemoDate === 'function') {
        updateMemoDate();
    }
}
