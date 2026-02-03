let currentHeicFiles = [];
let convertedHeicResults = [];

function openHeicModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-heic-converter');
    document.getElementById('heicConverterModal').style.display = 'flex';
}

function closeHeicModal() {
    document.getElementById('heicConverterModal').style.display = 'none';
}

// ফাইল সিলেক্ট করার লজিক
function handleHeicSelection(event) {
    const files = event.target.files;
    if (!files.length) return;
    
    currentHeicFiles = Array.from(files);
    const status = document.getElementById('heicStatus');
    status.style.display = "block";
    status.innerText = `${currentHeicFiles.length} file(s) selected. Click Convert to start.`;
    
    document.getElementById('convertHeicBtn').style.display = "block";
    document.getElementById('heicActionArea').style.display = "none";
    document.getElementById('previewHEIC').innerHTML = "";
    convertedHeicResults = [];
}

// কনভার্ট করার লজিক
async function processHeicConversion() {
    // ইমেজ আপলোড ছাড়া বাটন কাজ করবে না
    if (currentHeicFiles.length === 0) return;

    const btn = document.getElementById('convertHeicBtn');
    const actionArea = document.getElementById('heicActionArea');
    const status = document.getElementById('heicStatus');
    const format = document.getElementById('heicFormatSelect').value;
    const quality = parseFloat(document.getElementById('heicQualityRange').value);
    const previewArea = document.getElementById('previewHEIC');

    btn.style.display = "none";
    status.style.display = "block";
    previewArea.innerHTML = "";
    convertedHeicResults = [];

    for (let i = 0; i < currentHeicFiles.length; i++) {
        const file = currentHeicFiles[i];
        status.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing (${i + 1}/${currentHeicFiles.length}): ${file.name}`;

        try {
            // HEIC to Blob
            let resultBlob = await heic2any({
                blob: file,
                toType: format === 'image/webp' ? 'image/jpeg' : format,
                quality: quality
            });

            if (Array.isArray(resultBlob)) resultBlob = resultBlob[0];

            // WebP Support via Canvas
            if (format === 'image/webp') {
                resultBlob = await convertHeicToWebP(resultBlob, quality);
            }

            const url = URL.createObjectURL(resultBlob);
            const ext = format.split('/')[1].replace('jpeg', 'jpg');
            const newName = file.name.replace(/\.[^/.]+$/, "") + "." + ext;

            convertedHeicResults.push({ url, name: newName });

            // Preview UI
            const card = document.createElement('div');
            card.style = "background:#fff; border:1px solid #ddd; border-radius:12px; padding:8px; text-align:center; width:120px; box-shadow:0 2px 5px rgba(0,0,0,0.05);";
            card.innerHTML = `
                <img src="${url}" style="width:100px; height:100px; object-fit:cover; border-radius:8px; margin-bottom:5px;">
                <div style="font-size:9px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#4b5563; margin-bottom:5px;">${newName}</div>
                <a href="${url}" download="${newName}" style="display:inline-block; padding:4px 8px; background:#0ea5e9; color:#fff; border-radius:4px; font-size:9px; font-weight:800; text-decoration:none;" class="single-dl">DOWNLOAD</a>
            `;
            previewArea.appendChild(card);

        } catch (err) {
            console.error("Error converting " + file.name, err);
        }
    }

    status.innerText = "Conversion Finished!";
    actionArea.style.display = "grid";
}

// WebP Helper
function convertHeicToWebP(blob, quality) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(b => resolve(b), 'image/webp', quality);
        };
        img.src = URL.createObjectURL(blob);
    });
}

// ডাউনলোড লজিক
function downloadAllConvertedHeic() {
    if (convertedHeicResults.length === 0) return;
    
    convertedHeicResults.forEach((file, index) => {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = file.url;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, index * 500); // গ্যাপ রাখা হয়েছে যাতে ব্রাউজার ব্লক না করে
    });
}

function resetHeicTool() {
    currentHeicFiles = [];
    convertedHeicResults = [];
    document.getElementById('heicInput').value = "";
    document.getElementById('previewHEIC').innerHTML = "";
    document.getElementById('heicStatus').style.display = "none";
    document.getElementById('heicActionArea').style.display = "none";
    document.getElementById('convertHeicBtn').style.display = "block";
}
