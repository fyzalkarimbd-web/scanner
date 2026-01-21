let compOriginalImg = null;
let compressedResultData = null;

function openCompressorModal() {
    document.getElementById('compressorModal').style.display = 'flex';
    if(typeof setActiveMode === 'function') setActiveMode('mode-compressor');
}

function closeCompressorModal() {
    document.getElementById('compressorModal').style.display = 'none';
    resetCompressor(); // ক্লোজ করার সময় সব ক্লিয়ার হবে
}

// ফাইল হ্যান্ডলার
function handleCompFile(file) {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            compOriginalImg = img;
            document.getElementById('comp-orig-preview').src = img.src;
            document.getElementById('orig-size').innerText = "Original: " + (file.size / 1024).toFixed(2) + " KB";
            
            // UI কন্ট্রোল দেখানো
            document.getElementById('comp-upload-area').style.display = 'none';
            document.getElementById('comp-controls').style.display = 'block';
        };
    };
    reader.readAsDataURL(file);
}

// কমপ্রেশন লজিক (শুধুমাত্র কোয়ালিটি অ্যাডজাস্ট করবে)
async function processCompression() {
    if (!compOriginalImg) return;
    
    const targetKB = parseFloat(document.getElementById('target-kb').value);
    const loader = document.getElementById('comp-loader');
    const preview = document.getElementById('comp-result-preview');
    const resultSizeLabel = document.getElementById('result-size');
    const dlBtn = document.getElementById('btn-comp-dl');

    loader.style.display = 'block';
    preview.style.display = 'none';

    // অরিজিনাল রেজোলিউশনে ক্যানভাস তৈরি
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = compOriginalImg.width;
    canvas.height = compOriginalImg.height;
    ctx.drawImage(compOriginalImg, 0, 0);

    let quality = 0.92;
    let dataUrl = "";
    let sizeKB = 0;

    // ইটারেটিভ লুপ চালিয়ে সঠিক কেবি খোঁজা (ম্যাক্স ১৫ বার ট্রাই করবে)
    for (let i = 0; i < 15; i++) {
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        // Base64 থেকে আনুমানিক ফাইল সাইজ বের করা
        sizeKB = Math.round((dataUrl.length * 3 / 4) / 1024);
        
        if (sizeKB <= targetKB) break;
        quality -= 0.08; // প্রতিবার ৮% কোয়ালিটি কমবে
        if (quality < 0.1) break;
    }

    // প্রিভিউ আপডেট
    preview.src = dataUrl;
    preview.style.display = 'inline-block';
    loader.style.display = 'none';
    resultSizeLabel.innerText = "Compressed: " + sizeKB + " KB";
    
    // যদি টার্গেট পূরণ না হয় তবে লাল রঙ দেখাবে
    resultSizeLabel.style.color = (sizeKB <= targetKB) ? "#059669" : "#ef4444";
    
    compressedResultData = dataUrl;
    dlBtn.disabled = false;
}

// ডাউনলোড ফাংশন
function downloadCompressedImg() {
    if (!compressedResultData) return;
    const link = document.createElement('a');
    link.href = compressedResultData;
    link.download = "Compressed_by_IDScannerPro.jpg";
    link.click();
}

// ডিলিট/রিসেট ফাংশন
function resetCompressor() {
    document.getElementById('comp-upload-area').style.display = 'block';
    document.getElementById('comp-controls').style.display = 'none';
    document.getElementById('comp-input').value = "";
    document.getElementById('comp-orig-preview').src = "";
    document.getElementById('comp-result-preview').src = "";
    document.getElementById('btn-comp-dl').disabled = true;
    document.getElementById('result-size').innerText = "Size: 0 KB";
}
