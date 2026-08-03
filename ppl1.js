// গ্লোবাল ডাটা অবজেক্ট (window.psData দিয়ে সুরক্ষিত করা হলো)
window.psData = [
    { img: null, count: 0, size: 'pp' },
    { img: null, count: 0, size: 'pp' },
    { img: null, count: 0, size: 'pp' },
    { img: null, count: 0, size: 'pp' },
    { img: null, count: 0, size: 'pp' }
];

// মোডাল ওপেন ও ক্লোজ
function openPhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'block';
    updatePsPreview();
}

function closePhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'none';
}

// ছবি আপলোড লজিক
function loadPsImage(event, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // ডাটা সেভ করা
            window.psData[index].img = e.target.result;
            if (window.psData[index].count === 0) {
                window.psData[index].count = 1; // আপলোড করলেই ডিফল্ট ১টি ছবি সেট হবে
            }

            // UI আপডেট করা
            const prevImg = document.getElementById(`prev${index + 1}`);
            const plusIcon = document.getElementById(`plus${index + 1}`);
            const countInput = document.getElementById(`count${index}`);

            if (prevImg) {
                prevImg.src = e.target.result;
                prevImg.style.display = 'block';
            }
            if (plusIcon) plusIcon.style.display = 'none';
            if (countInput) countInput.value = window.psData[index].count;

            // লাইভ প্রিভিউ আপডেট
            updatePsPreview();
        };
        reader.readAsDataURL(file);
    }
}

// ছবি ডিলিট বা রিমুভ করা
function removePsImage(index) {
    window.psData[index].img = null;
    window.psData[index].count = 0;

    const input = document.getElementById(`psInput${index + 1}`);
    const prevImg = document.getElementById(`prev${index + 1}`);
    const plusIcon = document.getElementById(`plus${index + 1}`);
    const countInput = document.getElementById(`count${index}`);

    if (input) input.value = "";
    if (prevImg) {
        prevImg.src = "";
        prevImg.style.display = 'none';
    }
    if (plusIcon) plusIcon.style.display = 'block';
    if (countInput) countInput.value = 0;

    updatePsPreview();
}

// প্লাস (+) এবং মাইনাস (-) বাটন লজিক (সমস্যা সমাধানকৃত)
function changePsCount(index, val) {
    const prevImg = document.getElementById(`prev${index + 1}`);
    
    // ডাবল-চেক: window.psData তে ছবি আছে নাকি HTML প্রিভিউতে ছবি লোড হয়েছে
    const hasImage = (window.psData[index] && window.psData[index].img) || 
                     (prevImg && prevImg.src && prevImg.src.startsWith('data:image'));

    if (!hasImage && val > 0) {
        triggerAlert("অনুগ্রহ করে আগে ছবিটি আপলোড করুন!");
        return;
    }

    // ব্যাকআপ সিঙ্ক: যদি HTML-এ ছবি থাকে কিন্তু ডাটাতে মিস হয়
    if (hasImage && !window.psData[index].img && prevImg) {
        window.psData[index].img = prevImg.src;
    }

    let newCount = window.psData[index].count + val;
    if (newCount < 0) newCount = 0;

    window.psData[index].count = newCount;
    document.getElementById(`count${index}`).value = newCount;

    updatePsPreview(index, val);
}

// ছবির সাইজ পরিবর্তন করা
function changePsSize(index, newSize) {
    if (window.psData[index]) {
        window.psData[index].size = newSize;
        updatePsPreview();
    }
}

// A4 লাইভ প্রিভিউ আপডেট লজিক
function updatePsPreview(lastIndexChanged = null, delta = 0) {
    const previewBox = document.getElementById('a4-preview-area');
    const borderCheckbox = document.getElementById('psBorder');
    const warning = document.getElementById('limitWarning');

    if (!previewBox) return;

    const showBorder = borderCheckbox ? borderCheckbox.checked : true;
    previewBox.innerHTML = '';

    // ছবির সাইজ রেশিও
    const sizes = {
        pp: { width: '18%', aspectRatio: '40 / 50' },  // Passport Size
        st: { width: '10.5%', aspectRatio: '20 / 25' }, // Stamp Size
        jp: { width: '23%', aspectRatio: '55 / 40' }   // Joint Photo Size
    };

    window.psData.forEach((person) => {
        if (person.img && person.count > 0) {
            for (let i = 0; i < person.count; i++) {
                const item = document.createElement('div');
                item.style.width = sizes[person.size].width;
                item.style.aspectRatio = sizes[person.size].aspectRatio;
                item.style.boxSizing = 'border-box';
                item.style.border = showBorder ? '1px solid #000' : 'none';
                item.style.overflow = 'hidden';
                item.style.background = '#f8fafc';

                const img = document.createElement('img');
                img.src = person.img;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.display = 'block';

                item.appendChild(img);
                previewBox.appendChild(item);
            }
        }
    });

    // A4 পেজ লিমিট ওভারফ্লো চেক
    if (previewBox.scrollHeight > previewBox.clientHeight + 5) {
        if (warning) warning.style.display = 'inline';
        if (lastIndexChanged !== null && delta > 0) {
            triggerAlert("A4 পেজের জায়গা শেষ! নতুন ছবি যোগ করলে তা পেজের বাইরে চলে যাবে।");
            window.psData[lastIndexChanged].count -= 1;
            document.getElementById(`count${lastIndexChanged}`).value = window.psData[lastIndexChanged].count;
            updatePsPreview(); // রোলব্যাক রেন্ডার
        }
    } else {
        if (warning) warning.style.display = 'none';
    }
}

// ডিরেক্ট ప్రిન્ટ ফাংশন (A4 সাইজ)
function directPrintSheet() {
    let hasPhotos = window.psData.some(p => p.img && p.count > 0);
    if (!hasPhotos) {
        triggerAlert("প্রিন্ট করার জন্য অন্তত ১টি ছবি নির্বাচন করুন!");
        return;
    }

    const showBorder = document.getElementById('psBorder').checked;

    const printSizes = {
        pp: { width: '38mm', height: '48mm' },
        st: { width: '20mm', height: '25mm' },
        jp: { width: '55mm', height: '40mm' }
    };

    let printHTML = '';
    window.psData.forEach((person) => {
        if (person.img && person.count > 0) {
            for (let i = 0; i < person.count; i++) {
                let sz = printSizes[person.size];
                printHTML += `
                    <div style="width:${sz.width}; height:${sz.height}; border:${showBorder ? '1px solid #000' : 'none'}; box-sizing:border-box; overflow:hidden; display:inline-block;">
                        <img src="${person.img}" style="width:100%; height:100%; object-fit:cover; display:block;" />
                    </div>
                `;
            }
        }
    });

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <title>A4_Photo_Sheet_Print</title>
                <style>
                    @page { size: A4 portrait; margin: 0; }
                    body { margin: 0; padding: 10px; background: #fff; box-sizing: border-box; }
                    #wrapper { 
                        width: 210mm; 
                        min-height: 297mm; 
                        display: flex; 
                        flex-wrap: wrap; 
                        gap: 5px; 
                        justify-content: flex-start; 
                        align-content: flex-start;
                        box-sizing: border-box;
                    }
                </style>
            </head>
            <body>
                <div id="wrapper">${printHTML}</div>
            </body>
        </html>
    `);
    printWin.document.close();
    setTimeout(() => { 
        printWin.print(); 
        printWin.close(); 
    }, 500);
}
