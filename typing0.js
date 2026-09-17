/* =========================================
   A4 Document Writer - Complete JavaScript
========================================= */

/* --- হেল্পার ফাংশন: পপআপ অ্যালার্ট দেখানো --- */
function triggerAlert(msg) {
    // আপনার সাইটে যদি কোনো কাস্টম পপআপ থাকে, সেটি ব্যবহার করা হবে
    const popup = document.getElementById('customPopup');
    const msgEl = document.getElementById('popupMessage');
    if (popup && msgEl) {
        msgEl.innerText = msg;
        popup.classList.add('active');
        // ৩ সেকেন্ড পর অটোমেটিক বন্ধ হবে
        setTimeout(() => {
            popup.classList.remove('active');
        }, 3000);
    } else {
        // কাস্টম পপআপ না থাকলে সাধারণ ব্রাউজার অ্যালার্ট
        alert(msg);
    }
}


/* --- মেইন ফাংশন: মডাল ওপেন/ক্লোজ --- */
function openWriterModal() {
    const modal = document.getElementById('writerModal');
    if (modal) {
        modal.style.display = 'flex';
        // যদি আপনার সাইটে মোড চেঞ্জ করার কোনো ফাংশন থাকে
        if (typeof setActiveMode === 'function') setActiveMode('mode-writer');

        const pagesList = document.getElementById('pages-list');
        // যদি কোনো পেজ না থাকে, তবে একটি নতুন পেজ তৈরি হবে
        if (pagesList.innerHTML.trim() === "") {
            addNewPage();
        }
    }
}

function closeWriterModal() {
    document.getElementById('writerModal').style.display = 'none';
}


/* --- এডিটর কমান্ড ফাংশন (Formatting) --- */
function execCmd(command, value = null) {
    // ব্রাউজারের বিল্ট-ইন কমান্ড চালানো (যেমন: bold, italic)
    document.execCommand(command, false, value);
    
    // কমান্ড চালানোর পর এডিটরে ফোকাস ফেরত আনা
    const activePage = document.querySelector('.page-body:focus') || document.querySelector('.page-body');
    if(activePage) activePage.focus();
}

/* নতুন ফন্ট ফ্যামিলি অ্যাপ্লাই করার ফাংশন */
function applyFontFamily(fontName) {
    // CSS স্টাইল ব্যবহার করার জন্য কমান্ড
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('fontName', false, fontName);
    document.execCommand('styleWithCSS', false, false);
}


/* --- ফন্ট সাইজ কন্ট্রোল (পিক্সেল অনুযায়ী) --- */

// ১. প্লাস/মাইনাস বাটন দিয়ে সাইজ পরিবর্তন
function changeFontSize(amount) {
    const input = document.getElementById('fontSizeInput');
    // বর্তমান ভ্যালু নেওয়া, না থাকলে ১৮ ধরা হবে
    let currentVal = parseInt(input.value) || 18;
    let newVal = currentVal + amount;

    // সাইজ লিমিট চেক (৮ এর নিচে বা ৭২ এর উপরে যাবে না)
    if (newVal < 8) newVal = 8;
    if (newVal > 72) newVal = 72;

    // ইনপুট ফিল্ড আপডেট করা এবং নতুন সাইজ অ্যাপ্লাই করা
    input.value = newVal;
    applyPageFontSize(newVal + 'px');
}

// ২. ইনপুট ফিল্ড থেকে সাইজ অ্যাপ্লাই করা
function applyPageFontSize(sizeVal) {
    // যদি শুধু নাম্বার আসে, 'px' যুক্ত করা হবে
    if(!String(sizeVal).includes('px')) {
        sizeVal = sizeVal + 'px';
    }

    const selection = window.getSelection();
    // চেক করা কিছু সিলেক্ট করা আছে কিনা
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        // একটি নতুন স্প্যান তৈরি করে তাতে ফন্ট সাইজ দেওয়া
        const span = document.createElement('span');
        span.style.fontSize = sizeVal;

        try {
             // সিলেক্ট করা অংশকে স্প্যান দিয়ে ঘিরে ফেলা
            range.surroundContents(span);
        } catch (e) {
            // জটিল সিলেকশন হলে (যেমন একাধিক প্যারাগ্রাফ), সাধারণ কমান্ড ব্যবহার করা হবে
            console.warn("Complex selection, falling back to default size command.");
            document.execCommand('fontSize', false, '3'); // '3' মানে নরমাল সাইজ
        }
    } else {
        // কিছু সিলেক্ট না থাকলে ইউজারকে সতর্ক করা
         triggerAlert("Please select some text first to change font size.");
    }
}


/* --- বুলেট লাইব্রেরি ফাংশন --- */

// ড্রপডাউন মেনু দেখানো/লুকানো
function toggleBulletMenu() {
    document.getElementById('bulletDropdown').classList.toggle('active');
}

// মেনুর বাইরে ক্লিক করলে মেনু বন্ধ হবে
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('bulletDropdown');
    // যদি ক্লিক ড্রপডাউনের ভেতরে না হয়
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// নির্দিষ্ট বুলেট স্টাইল অ্যাপ্লাই করা
function applyBullet(type, isOrdered = false) {
    // প্রথমে সাধারণ লিস্ট কমান্ড চালানো
    if (isOrdered) {
        execCmd('insertOrderedList'); // নাম্বারিং এর জন্য
    } else {
        execCmd('insertUnorderedList'); // বুলেটের জন্য
    }

    // এরপর স্টাইল পরিবর্তন করার চেষ্টা করা (যেমন: circle, square)
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let anchorNode = selection.anchorNode;
        // উপরের দিকে গিয়ে নিকটতম UL বা OL ট্যাগ খোঁজা
        while (anchorNode && anchorNode.nodeName !== 'UL' && anchorNode.nodeName !== 'OL' && anchorNode.nodeName !== 'DIV') {
            anchorNode = anchorNode.parentNode;
        }

        if (anchorNode && (anchorNode.nodeName === 'UL' || anchorNode.nodeName === 'OL')) {
            // লিস্ট স্টাইল টাইপ অ্যাপ্লাই করা
            anchorNode.style.listStyleType = type;
        }
    }
    // কাজ শেষে মেনু বন্ধ করা
    toggleBulletMenu();
}


/* --- পেজ ম্যানেজমেন্ট (নতুন পেজ, ডিলিট, ক্লিয়ার) --- */

function addNewPage() {
    const pagesList = document.getElementById('pages-list');
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page-unit';
    
    // নতুন পেজেও বর্তমান ফন্ট সাইজ অ্যাপ্লাই হবে
    const defaultSize = document.getElementById('fontSizeInput').value + 'px';

    // নতুন পেজের HTML স্ট্রাকচার
    pageDiv.innerHTML = `
        <button class="del-page-icon" onclick="removeThisPage(this)" title="Delete Page" type="button"><i class="fa-solid fa-xmark"></i></button>
        <div contenteditable="true" class="page-body" style="font-size:${defaultSize}" data-placeholder="Start writing here... Supports SolaimanLipi, Nikosh, SutonnyMG etc." spellcheck="false"></div>
    `;
    
    // লিস্টে পেজ যুক্ত করা
    pagesList.appendChild(pageDiv);
    
    // নতুন পেজে ফোকাস এবং স্ক্রল করা
    const newEditor = pageDiv.querySelector('.page-body');
    newEditor.focus();
    pageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeThisPage(btn) {
    const pages = document.querySelectorAll('.page-unit');
    // অন্তত একটি পেজ থাকতেই হবে
    if (pages.length > 1) {
        if(confirm("Are you sure you want to delete this page?")) {
             btn.parentElement.remove();
        }
    } else {
        triggerAlert("At least one page is required.");
    }
}

function clearWriter() {
    if(confirm("Are you sure you want to clear all contents? This cannot be undone.")) {
        document.getElementById('pages-list').innerHTML = "";
        addNewPage(); // সব মুছে একটি নতুন পেজ তৈরি হবে
    }
}


/* --- প্রিন্ট ফাংশন --- */
function printWriterContent() {
    const pages = document.querySelectorAll('.page-body');
    let allHtml = "";
    let hasContent = false;

    pages.forEach((page) => {
        // শুধু যেসব পেজে লেখা বা ছবি আছে, সেগুলো নেওয়া হবে
        if(page.innerText.trim() !== "" || page.querySelector('img')) {
            // পেজের ভেতরের স্টাইল (ফন্ট, সাইজ) সহ HTML নেওয়া হচ্ছে
            allHtml += `<div class="p-wrap" style="${page.getAttribute('style')}">${page.innerHTML}</div>`;
            hasContent = true;
        }
    });

    if (!hasContent) {
        triggerAlert("Document is empty. Please write something.");
        return;
    }

    // প্রিন্টের জন্য নতুন উইন্ডো ওপেন করা
    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <title>Document_Print_View</title>
                <style>
                    /* প্রিন্টের জন্য প্রয়োজনীয় ফন্ট এবং CSS */
                    @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600&display=swap');
                    @import url('https://fonts.maateen.me/solaiman-lipi/font.css');

                    @page { size: A4; margin: 0; }
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        box-sizing: border-box;
                    }
                    body { margin: 0; padding: 0; background: #eee; }
                    .p-wrap {
                        width: 210mm; min-height: 297mm; padding: 25mm 20mm; /* A4 মার্জিন */
                        margin: 20px auto; background: #fff;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                        font-family: 'SolaimanLipi', Arial, sans-serif;
                        line-height: 1.6; color: #000; word-wrap: break-word; text-align: left;
                        page-break-after: always; /* প্রতি পেজের পর ব্রেক */
                    }
                    /* ছবি যেন পেজের বাইরে না যায় */
                    .p-wrap img { max-width: 100%; height: auto; }
                    /* আন্ডারলাইন এবং লিস্ট স্টাইল ফিক্স */
                    u, [style*="underline"] { text-decoration: underline !important; text-underline-offset: 3px; }
                    ul, ol { margin-top: 0; margin-bottom: 10px; padding-left: 40px; }
                    li { margin-bottom: 5px; }
                    .p-wrap:last-child { page-break-after: auto; margin-bottom: 0; }

                    @media print {
                       body { background: #fff; }
                       .p-wrap { margin: 0; box-shadow: none; }
                    }
                </style>
            </head>
            <body>
                ${allHtml}
                <script>
                    // কন্টেন্ট লোড হওয়ার জন্য একটু সময় দেওয়া
                    window.onload = function() {
                        setTimeout(function(){
                            window.print();
                        }, 800);
                    };
                <\/script>
            </body>
        </html>
    `);
    printWin.document.close();
}


/* =========================================
   নতুন ফাংশন: ওয়ার্ড ফাইলে সেভ করা (Save as Word .doc)
========================================= */
function saveAsWord() {
    const pages = document.querySelectorAll('.page-body');
    let contentHtml = "";
    let hasContent = false;

    // সব পেজের কন্টেন্ট সংগ্রহ করা
    pages.forEach(page => {
         if(page.innerText.trim() !== "" || page.querySelector('img')) {
             // ওয়ার্ডে পেজ ব্রেক এবং প্যাডিং এর জন্য স্টাইল যুক্ত করা
             contentHtml += `<div class="word-page" style="${page.getAttribute('style')}; page-break-after: always; padding: 20mm;">${page.innerHTML}</div>`;
             hasContent = true;
         }
    });

    if (!hasContent) { triggerAlert("Nothing to save!"); return; }

    // ওয়ার্ড ফাইলের জন্য প্রয়োজনীয় হেডার এবং মেটাডাটা
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'>
    <title>Document</title>
    <!-- ওয়ার্ডের জন্য নির্দিষ্ট স্টাইল -->
    <style>
        body { font-family: Arial, sans-serif; }
        /* বাংলা ফন্টগুলো চিনিয়ে দেওয়া, যাতে ওয়ার্ডে ঠিকমতো দেখায় (যদি পিসিতে থাকে) */
        .word-page, .page-body, span { font-family: 'SolaimanLipi', 'SutonnyMG', 'Nikosh', 'Hind Siliguri', sans-serif; }
        /* জাস্টিফাই টেক্সট ঠিক রাখা */
        div[style*="text-align: justify"] { text-align: justify; text-justify: inter-word; }
        /* লিস্ট স্টাইল */
        ul { list-style-type: disc; } ol { list-style-type: decimal; }
    </style>
    </head><body>`;

    const footer = "</body></html>";
    const sourceHTML = header + contentHtml + footer;

    // ফাইল তৈরি এবং ডাউনলোড করার প্রক্রিয়া
    // Blob ব্যবহার করা হচ্ছে যাতে বড় ফাইলও সমস্যা না করে
    const blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
    });
    
    // ডাউনলোডের জন্য একটি অস্থায়ী লিঙ্ক তৈরি
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    
    // Blob থেকে URL তৈরি (আধুনিক ব্রাউজারের জন্য)
    if(window.navigator.msSaveOrOpenBlob) {
         window.navigator.msSaveOrOpenBlob(blob, 'document.doc');
    } else {
         fileDownload.href = URL.createObjectURL(blob);
         fileDownload.download = 'document.doc'; // ফাইলের নাম ও এক্সটেনশন
         fileDownload.click();
    }
    
    // কাজ শেষে লিঙ্কটি মুছে ফেলা
    document.body.removeChild(fileDownload);
}
