// গ্লোবাল ডাটা অবজেক্ট
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
    setTimeout(updatePsPreview, 100); // প্রিভিউ বক্স লোড হওয়ার জন্য সাময়িক ডিলে
}

function closePhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'none';
}

// ছবি আপলোড করার ফাংশন
function loadPsImage(event, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            window.psData[index].img = e.target.result;
            if (window.psData[index].count === 0) {
                window.psData[index].count = 1; // আপলোড করলেই ডিফল্ট ১টি হবে
            }

            const prevImg = document.getElementById(`prev${index + 1}`);
            const plusIcon = document.getElementById(`plus${index + 1}`);
            const countInput = document.getElementById(`count${index}`);

            if (prevImg) {
                prevImg.src = e.target.result;
                prevImg.style.display = 'block';
            }
            if (plusIcon) plusIcon.style.display = 'none';
            if (countInput) countInput.value = window.psData[index].count;

            updatePsPreview();
        };
        reader.readAsDataURL(file);
    }
}

// ছবি রিমুভ করার ফাংশন
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

// প্লাস (+) ও মাইনাস (-) ক্লিক ফাংশন
function changePsCount(index, val) {
    const prevImg = document.getElementById(`prev${index + 1}`);
    const hasImage = (window.psData[index] && window.psData[index].img) || 
                     (prevImg && prevImg.src && prevImg.src.startsWith('data:image'));

    if (!hasImage && val > 0) {
        triggerAlert("অনুগ্রহ করে আগে ছবিটি আপলোড করুন!");
        return;
    }

    if (hasImage && !window.psData[index].img && prevImg) {
        window.psData[index].img = prevImg.src;
    }

    let newCount = window.psData[index].count + val;
    if (newCount < 0) newCount = 0;

    window.psData[index].count = newCount;
    document.getElementById(`count${index}`).value = newCount;

    updatePsPreview(index, val);
}

// সাইজ চেঞ্জ ফাংশন
function changePsSize(index, newSize) {
    if (window.psData[index]) {
        window.psData[index].size = newSize;
        updatePsPreview();
    }
}

// A4 লাইভ প্রিভিউ রেন্ডার করার ফাংশন (ফিক্সড)
function updatePsPreview(lastIndexChanged = null, delta = 0) {
    const previewBox = document.getElementById('a4-preview-area');
    const borderCheckbox = document.getElementById('psBorder');
    const warning = document.getElementById('limitWarning');

    if (!previewBox) return;

    const showBorder = borderCheckbox ? borderCheckbox.checked : true;
    previewBox.innerHTML = '';

    // সাইজ সেটিংস (উইথ এবং অ্যাসপেক্ট রেশিও)
    const sizes = {
        pp: { width: '18%', ratio: '4 / 5' },    // Passport Size
        st: { width: '10.8%', ratio: '4 / 5' },  // Stamp Size
        jp: { width: '23%', ratio: '5 / 4' }     // Joint Photo Size
    };

    window.psData.forEach((person) => {
        if (person.img && person.count > 0) {
            for (let i = 0; i < person.count; i++) {
                const item = document.createElement('div');
                item.style.width = sizes[person.size].width;
                item.style.aspectRatio = sizes[person.size].ratio;
                item.style.flexShrink = '0'; // সাইজ কমে যাওয়া বন্ধ করবে
                item.style.boxSizing = 'border-box';
                item.style.border = showBorder ? '1px solid #000' : 'none';
                item.style.overflow = 'hidden';
                item.style.background = '#fff';

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

    // সঠিক A4 পেজ লিমিট চেক (Height Collapse Bug Fix)
    const containerHeight = previewBox.clientHeight;
    
    // প্রিভিউ বক্সের হাইট ১০০ পিক্সেলের বেশি থাকলে কেবল লিমিট চেক কাজ করবে
    if (containerHeight > 100 && previewBox.scrollHeight > containerHeight + 3) {
        if (warning) warning.style.display = 'inline';
        
        // শুধু প্লাস বাটন চেপে ফুল হয়ে গেলে ১টি ছবি কমাবে
        if (lastIndexChanged !== null && delta > 0) {
            triggerAlert("A4 পেজের জায়গা শেষ! নতুন ছবি যোগ করলে তা পেজের বাইরে চলে যাবে।");
            window.psData[lastIndexChanged].count = Math.max(0, window.psData[lastIndexChanged].count - 1);
            document.getElementById(`count${lastIndexChanged}`).value = window.psData[lastIndexChanged].count;
            
            // রোলব্যাক রি-রেন্ডার
            updatePsPreview(); 
        }
    } else {
        if (warning) warning.style.display = 'none';
    }
}

// ডিরেক্ট প্রিন্ট ফাংশন
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
