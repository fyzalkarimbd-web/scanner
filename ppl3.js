// ৫ জন ব্যক্তির ডেটা রাখার স্টোর
let psPersons = [
    { img: null, size: '3.5,4.5', count: 0 },
    { img: null, size: '3.5,4.5', count: 0 },
    { img: null, size: '3.5,4.5', count: 0 },
    { img: null, size: '3.5,4.5', count: 0 },
    { img: null, size: '3.5,4.5', count: 0 }
];

function openPhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'flex';
}

function closePhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'none';
}

// ছবি লোড
function loadPsImage(event, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            psPersons[index].img = e.target.result;
            // ছবি আপলোড করলেই ডিফল্ট ১টি ছবি কাউন্ট হবে
            if (psPersons[index].count === 0) {
                psPersons[index].count = 1;
                document.getElementById('countVal' + (index + 1)).value = 1;
            }
            document.getElementById('prev' + (index + 1)).src = e.target.result;
            document.getElementById('prev' + (index + 1)).style.display = 'block';
            document.getElementById('plus' + (index + 1)).style.display = 'none';

            updatePsPreview();
        };
        reader.readAsDataURL(file);
    }
}

// ছবি ডিলেট
function removePsImage(index) {
    psPersons[index].img = null;
    psPersons[index].count = 0;
    document.getElementById('psInput' + (index + 1)).value = '';
    document.getElementById('countVal' + (index + 1)).value = 0;
    document.getElementById('prev' + (index + 1)).style.display = 'none';
    document.getElementById('plus' + (index + 1)).style.display = 'block';
    updatePsPreview();
}

// প্লাস-মাইনাস বাটন
function changePsCount(index, delta) {
    if (!psPersons[index].img && delta > 0) {
        triggerAlert("Please upload a photo for Person " + (index + 1) + " first!");
        return;
    }

    let oldCount = psPersons[index].count;
    let newCount = oldCount + delta;
    if (newCount < 0) newCount = 0;

    psPersons[index].count = newCount;

    // প্রিভিউ রেন্ডার করে চেক করা পেজ উপচে পড়ছে কি না
    let isOverflow = renderPsPreview();

    if (isOverflow && delta > 0) {
        // লিমিট পার হয়ে গেলে মান রুলব্যাক করবে
        psPersons[index].count = oldCount;
        renderPsPreview();
        triggerAlert("Limit Reached! Adding more photos will overflow the A4 sheet.");
    } else {
        document.getElementById('countVal' + (index + 1)).value = psPersons[index].count;
    }
}

function updatePsPreview() {
    for (let i = 0; i < 5; i++) {
        const sizeEl = document.getElementById('size' + (i + 1));
        if (sizeEl) psPersons[i].size = sizeEl.value;
    }
    renderPsPreview();
}

// A4 প্রিভিউ জেনারেট এবং ওভারফ্লো চেক
function renderPsPreview() {
    const previewArea = document.getElementById('a4-preview-area');
    if (!previewArea) return false;

    previewArea.innerHTML = '';
    const showBorder = document.getElementById('psBorder') ? document.getElementById('psBorder').checked : true;
    let hasPhotos = false;

    // 210mm x 297mm A4 পেজের সাথে আনুপাতিক হিসাব (Percentage Based)
    psPersons.forEach((person) => {
        if (person.img && person.count > 0) {
            hasPhotos = true;
            const [wCm, hCm] = person.size.split(',').map(Number);
            
            // A4 Width 21cm, Height 29.7cm
            const widthPct = (wCm / 21) * 100;
            const heightPct = (hCm / 29.7) * 100;

            for (let c = 0; c < person.count; c++) {
                const item = document.createElement('div');
                item.style.width = `calc(${widthPct}% - 3px)`;
                item.style.height = `calc(${heightPct}% - 3px)`;
                item.style.border = showBorder ? '1px solid #000' : 'none';
                item.style.boxSizing = 'border-box';
                item.style.overflow = 'hidden';
                item.style.display = 'flex';

                const img = document.createElement('img');
                img.src = person.img;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';

                item.appendChild(img);
                previewArea.appendChild(item);
            }
        }
    });

    // পেজ ওভারফ্লো চেক
    const isOverflow = previewArea.scrollHeight > previewArea.clientHeight + 2;
    document.getElementById('limitWarning').style.display = isOverflow ? 'inline' : 'none';
    document.getElementById('footerNote').style.display = isOverflow ? 'block' : 'none';
    document.getElementById('psActionBtns').style.display = hasPhotos ? 'flex' : 'none';

    return isOverflow;
}

// ডিরেক্ট প্রিন্ট
function directPrintSheet() {
    let contentHtml = '';
    const showBorder = document.getElementById('psBorder') ? document.getElementById('psBorder').checked : true;

    psPersons.forEach(person => {
        if (person.img && person.count > 0) {
            const [wCm, hCm] = person.size.split(',').map(Number);
            const wMm = wCm * 10;
            const hMm = hCm * 10;

            for (let i = 0; i < person.count; i++) {
                contentHtml += `
                    <div style="width: ${wMm}mm; height: ${hMm}mm; border: ${showBorder ? '1px solid #000' : 'none'}; box-sizing: border-box; overflow: hidden; display: flex;">
                        <img src="${person.img}" style="width: 100%; height: 100%; object-fit: cover;" />
                    </div>
                `;
            }
        }
    });

    if (!contentHtml) {
        triggerAlert("No photos to print!");
        return;
    }

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <title>A4_Photo_Sheet_Print</title>
                <style>
                    @page { size: A4; margin: 0; }
                    body { margin: 0; padding: 5mm; background: #fff; box-sizing: border-box; }
                    #print-wrapper {
                        width: 200mm;
                        height: 287mm;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 2mm;
                        align-content: flex-start;
                    }
                </style>
            </head>
            <body>
                <div id="print-wrapper">${contentHtml}</div>
            </body>
        </html>
    `);
    printWin.document.close();
    setTimeout(() => { printWin.print(); printWin.close(); }, 800);
}
