let teleCropper = null;
let teleCurrentMode = "photo";
let teleFinalBlob = null;

function openTeletalkModal() {
    document.getElementById('teletalkModal').style.display = 'flex';
    if(typeof setActiveMode === 'function') setActiveMode('mode-teletalk');
}

/* --- ১. পপ-আপ ক্লোজ করার সাথে রিসেট লজিক ফিক্সড --- */
function closeTeletalkModal() { 
    document.getElementById('teletalkModal').style.display = 'none'; 
    resetTele(); // এখানে রিসেট ফাংশনটি কল করা হয়েছে
}

function handleTeleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const cropImg = document.getElementById('tele-crop-image');
        
        if (teleCropper) {
            teleCropper.destroy();
            teleCropper = null;
        }

        cropImg.src = e.target.result;
        
        document.getElementById('tele-upload-area').style.display = 'none';
        document.getElementById('tele-controls').style.display = 'block';
        document.getElementById('tele-result-area').style.display = 'none';
        
        cropImg.onload = () => {
            teleCropper = new Cropper(cropImg, {
                aspectRatio: (teleCurrentMode === 'photo') ? 1 : (300 / 80),
                viewMode: 1,
                autoCropArea: 1,
                responsive: true,
                zoomOnWheel: false, 
                zoomOnTouch: false,
                toggleDragModeOnDblclick: false
            });
        };
    };
    reader.readAsDataURL(file);
}

function setTelePreset(mode) {
    teleCurrentMode = mode;
    document.querySelectorAll('.preset-card').forEach(card => card.classList.remove('active'));
    
    if(mode === 'photo') {
        document.getElementById('btn-preset-photo').classList.add('active');
    } else {
        document.getElementById('btn-preset-sig').classList.add('active');
    }
    
    if (teleCropper) {
        const ratio = (mode === 'photo') ? 1 : (300 / 80);
        teleCropper.setAspectRatio(ratio);
    }
}

async function processTeleCrop() {
    if (!teleCropper) return;
    
    const targetW = 300;
    const targetH = (teleCurrentMode === 'photo') ? 300 : 80;
    const maxKB = (teleCurrentMode === 'photo') ? 100 : 60;

    const canvas = teleCropper.getCroppedCanvas({
        width: targetW,
        height: targetH,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    });

    let quality = 0.90;
    let dataUrl = "";
    let finalKB = 0;

    for (let i = 0; i < 15; i++) {
        dataUrl = canvas.toDataURL("image/jpeg", quality);
        finalKB = Math.round((dataUrl.length * 3 / 4) / 1024);
        if (finalKB <= maxKB) break;
        quality -= 0.10;
        if (quality < 0.1) break;
    }

    const preview = document.getElementById('tele-result-preview');
    preview.src = dataUrl;
    teleFinalBlob = dataUrl;

    document.getElementById('tele-result-info').innerText = targetW + " x " + targetH + " Pixels | " + finalKB + " KB";
    document.getElementById('tele-result-area').style.display = 'block';
    document.getElementById('tele-result-area').scrollIntoView({ behavior: 'smooth' });
}

function downloadTeleImg() {
    if (!teleFinalBlob) return;
    const link = document.createElement('a');
    link.href = teleFinalBlob;
    link.download = "Teletalk_" + teleCurrentMode + ".jpg";
    link.click();
}

/* --- ২. সম্পূর্ণ রিসেট ফাংশন (উন্নত করা হয়েছে) --- */
function resetTele() {
    // ক্রপার বন্ধ করা
    if (teleCropper) {
        teleCropper.destroy();
        teleCropper = null;
    }
    
    // সব ভ্যালু এবং প্রিভিউ ক্লিয়ার করা
    document.getElementById('tele-upload-area').style.display = 'block';
    document.getElementById('tele-controls').style.display = 'none';
    document.getElementById('tele-result-area').style.display = 'none';
    document.getElementById('tele-input').value = "";
    document.getElementById('tele-crop-image').src = "";
    document.getElementById('tele-result-preview').src = "";
    
    // মোড ডিফল্ট ভাবে ফটোতে ফিরিয়ে আনা
    teleCurrentMode = "photo";
    document.querySelectorAll('.preset-card').forEach(card => card.classList.remove('active'));
    document.getElementById('btn-preset-photo').classList.add('active');
}
