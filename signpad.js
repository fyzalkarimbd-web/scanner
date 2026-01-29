function openSigPadModal() {
    if(typeof setActiveMode === 'function') setActiveMode('mode-sig-pad');
    document.getElementById('sigPadModal').style.display = 'flex';
    initSpCanvas();
}

function closeSigPadModal() {
    document.getElementById('sigPadModal').style.display = 'none';
}

let spCanvas, spCtx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let spLang = 'en';

const spLabels = {
    "en": { title: "Digital Signature Pad", clear: "Clear", save: "Save PNG", close: "Close", hint: "Sign inside the box above using your Mouse or Finger", note: "The signature will be saved as a high-quality transparent PNG, perfect for online forms and documents." },
    "bn": { title: "ডিজিটাল সিগনেচার প্যাড", clear: "মুছে ফেলুন", save: "সেভ পিএনজি", close: "বন্ধ করুন", hint: "মাউস বা আঙুল দিয়ে উপরের বক্সের ভেতরে স্বাক্ষর করুন", note: "স্বাক্ষরটি স্বচ্ছ পিএনজি হিসেবে সেভ হবে, যা অনলাইন ফর্ম এবং ডকুমেন্টের জন্য উপযুক্ত।" }
};

function setSpLang(l) {
    spLang = l;
    document.getElementById('sp-en-btn').classList.toggle('active', l === 'en');
    document.getElementById('sp-bn-btn').classList.toggle('active', l === 'bn');
    const m = spLabels[l];
    document.getElementById('sp-title').innerText = m.title;
    document.getElementById('txt-sp-clear').innerText = m.clear;
    document.getElementById('txt-sp-save').innerText = m.save;
    document.getElementById('txt-sp-close').innerText = m.close;
    document.getElementById('sp-hint').innerText = m.hint;
    document.getElementById('sp-note-text').innerText = m.note;
}

function initSpCanvas() {
    spCanvas = document.getElementById('sp-canvas');
    spCtx = spCanvas.getContext('2d');
    
    const wrapper = document.getElementById('sp-canvas-wrapper');
    // Ensure canvas matches wrapper size
    spCanvas.width = wrapper.clientWidth;
    spCanvas.height = 300; 

    spCtx.lineCap = 'round';
    spCtx.lineJoin = 'round';
    updateSpSettings();

    // Mouse Events
    spCanvas.addEventListener('mousedown', startSpDrawing);
    spCanvas.addEventListener('mousemove', drawSpMove);
    window.addEventListener('mouseup', stopSpDrawing);

    // Touch Events (Improved for mobile)
    spCanvas.addEventListener('touchstart', (e) => {
        const rect = spCanvas.getBoundingClientRect();
        const touch = e.touches[0];
        startSpDrawing({ 
            offsetX: touch.clientX - rect.left, 
            offsetY: touch.clientY - rect.top 
        });
        e.preventDefault();
    }, { passive: false });

    spCanvas.addEventListener('touchmove', (e) => {
        const rect = spCanvas.getBoundingClientRect();
        const touch = e.touches[0];
        drawSpMove({ 
            offsetX: touch.clientX - rect.left, 
            offsetY: touch.clientY - rect.top 
        });
        e.preventDefault();
    }, { passive: false });

    spCanvas.addEventListener('touchend', stopSpDrawing);
}

function updateSpSettings() {
    spCtx.strokeStyle = document.getElementById('sp-color').value;
    spCtx.lineWidth = document.getElementById('sp-weight').value;
}

function startSpDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function drawSpMove(e) {
    if (!isDrawing) return;
    spCtx.beginPath();
    spCtx.moveTo(lastX, lastY);
    spCtx.lineTo(e.offsetX, e.offsetY);
    spCtx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopSpDrawing() {
    isDrawing = false;
}

function clearSpPad() {
    spCtx.clearRect(0, 0, spCanvas.width, spCanvas.height);
}

// Function to crop the signature (removes extra empty space)
function trimCanvas(canvas) {
    const context = canvas.getContext('2d');
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

    // Find the boundary of drawn signature
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const index = (y * canvas.width + x) * 4;
            const alpha = pixels[index + 3];
            if (alpha > 0) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    // Check if canvas is empty
    if (maxX < minX || maxY < minY) return null;

    // Add small padding (10px)
    const pad = 10;
    const finalWidth = (maxX - minX) + (pad * 2);
    const finalHeight = (maxY - minY) + (pad * 2);

    const trimmed = document.createElement('canvas');
    trimmed.width = finalWidth;
    trimmed.height = finalHeight;
    const trimmedCtx = trimmed.getContext('2d');

    trimmedCtx.drawImage(canvas, minX, minY, maxX - minX, maxY - minY, pad, pad, maxX - minX, maxY - minY);
    return trimmed;
}

function downloadSpPad() {
    const trimmedCanvas = trimCanvas(spCanvas);
    
    if (!trimmedCanvas) {
        alert(spLang === 'en' ? "Please draw a signature first!" : "অনুগ্রহ করে আগে স্বাক্ষর করুন!");
        return;
    }

    const link = document.createElement('a');
    link.download = 'digital-signature.png';
    link.href = trimmedCanvas.toDataURL('image/png');
    link.click();
}
