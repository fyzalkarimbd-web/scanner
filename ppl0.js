// ফটো শিটের ডাটা সংরক্ষণ করার অ্যারেকে রাখা হলো (সর্বোচ্চ ৫ জন)
let psData = [
    { img: null, count: 0, size: 'pp' },
    { img: null, count: 0, size: 'pp' },
    { img: null, count: 0, size: 'pp' },
    { img: null, count: 0, size: 'pp' },
    { img: null, count: 0, size: 'pp' }
];

// মোডাল ওপেন/ক্লোজ
function openPhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'block';
    updatePsPreview();
}

function closePhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'none';
}

// ছবি লোড করা
function loadPsImage(event, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            psData[index].img = e.target.result;
            if(psData[index].count === 0) {
                psData[index].count = 1; // আপলোড করার পর ডিফল্ট ১টি ছবি দেওয়া হবে
            }
            
            // প্রিভিউ থাম্বনেইল আপডেট
            document.getElementById(`prev${index + 1}`).src = e.target.result;
            document.getElementById(`prev${index + 1}`).style.display = 'block';
            document.getElementById(`plus${index + 1}`).style.display = 'none';
            document.getElementById(`count${index}`).value = psData[index].count;
            
            updatePsPreview();
        };
        reader.readAsDataURL(file);
    }
}

// ছবি রিমুভ বা ডিলিট করা
function removePsImage(index) {
    psData[index].img = null;
    psData[index].count = 0;
    
    document.getElementById(`psInput${index + 1}`).value = "";
    document.getElementById(`prev${index + 1}`).src = "";
    document.getElementById(`prev${index + 1}`).style.display = 'none';
    document.getElementById(`plus${index + 1}`).style.display = 'block';
    document.getElementById(`count${index}`).value = 0;
    
    updatePsPreview();
}

// প্লাস (+) এবং মাইনাস (-) বাটন প্রেসের লজিক
function changePsCount(index, val) {
    if (!psData[index].img && val > 0) {
        triggerAlert("অনুগ্রহ করে আগে ছবিটি আপলোড করুন!");
        return;
    }
    
    let newCount = psData[index].count + val;
    if (newCount < 0) newCount = 0;
    
    psData[index].count = newCount;
    document.getElementById(`count${index}`).value = newCount;
    
    updatePsPreview(index, val);
}

// সাইজ পরিবর্তন লজিক
function changePsSize(index, newSize) {
    psData[index].size = newSize;
    updatePsPreview();
}

// A4 প্রিভিউ আপডেট ফাংশন
function updatePsPreview(lastIndexChanged = null, delta = 0) {
    const previewBox = document.getElementById('a4-preview-area');
    const showBorder = document.getElementById('psBorder').checked;
    const warning = document.getElementById('limitWarning');
    
    previewBox.innerHTML = '';
    
    // বিভিন্ন সাইজের পিক্সেল রেশিও (A4 প্রিভিউ বক্সের জন্য)
    const sizes = {
        pp: { width: '18%', aspectRatio: '40 / 50' }, // Passport Size
        st: { width: '10.5%', aspectRatio: '20 / 25' }, // Stamp Size
        jp: { width: '23%', aspectRatio: '55 / 40' }  // Joint Photo Size
    };

    let totalItemsAdded = 0;

    psData.forEach((person) => {
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
                totalItemsAdded++;
            }
        }
    });

    // ওভারফ্লো বা A4 পেজের লিমিট চেক করা
    if (previewBox.scrollHeight > previewBox.clientHeight + 5) {
        warning.style.display = 'inline';
        if (lastIndexChanged !== null && delta > 0) {
            triggerAlert("A4 পেজের জায়গা শেষ! নতুন ছবি যোগ করলে তা পেজের বাইরে চলে যাবে।");
            psData[lastIndexChanged].count -= 1;
            document.getElementById(`count${lastIndexChanged}`).value = psData[lastIndexChanged].count;
            updatePsPreview(); // রি-রেন্ডার
        }
    } else {
        warning.style.display = 'none';
    }
}

// ডিরেক্ট প্রিন্ট ফাংশন (A4 সাইজ পেপারে প্রিন্ট করার জন্য)
function directPrintSheet() {
    let hasPhotos = psData.some(p => p.img && p.count > 0);
    if (!hasPhotos) {
        triggerAlert("প্রিন্ট করার জন্য অন্তত ১টি ছবি নির্বাচন করুন!");
        return;
    }
    
    const showBorder = document.getElementById('psBorder').checked;
    
    // প্রিন্ট মিডিয়া সাইজ স্ট্যান্ডার্ড (mm)
    const printSizes = {
        pp: { width: '38mm', height: '48mm' },
        st: { width: '20mm', height: '25mm' },
        jp: { width: '55mm', height: '40mm' }
    };

    let printHTML = '';
    psData.forEach((person) => {
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
