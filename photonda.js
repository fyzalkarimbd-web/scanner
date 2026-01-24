let pndMainImage = null;
let pndCurrentLang = 'en';

function openPndModal() {
    if (typeof setActiveMode === "function") setActiveMode('mode-pnd');
    document.getElementById('pndModal').style.display = 'flex';
}

function closePndModal() {
    document.getElementById('pndModal').style.display = 'none';
}

function setPndLang(lang) {
    pndCurrentLang = lang;
    const modal = document.getElementById('pndModal');
    
    modal.querySelectorAll('.ph-tab').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`pnd-${lang}-btn`).classList.add('active');
    
    const nameInp = document.getElementById('pnd-name');
    const dateInp = document.getElementById('pnd-date');

    if (lang === 'bn') {
        document.getElementById('pnd-main-title').innerHTML = '<i class="fa-solid fa-file-signature"></i> ফটো নাম ও তারিখ এডার';
        document.getElementById('pnd-upload-text').innerText = 'ছবি আপলোড করতে ক্লিক করুন';
        document.getElementById('lbl-pnd-name').innerText = 'পূর্ণ নাম (বাংলায়)';
        document.getElementById('lbl-pnd-date').innerText = 'তারিখ (বাংলায়)';
        document.getElementById('lbl-pnd-line').innerText = 'মাঝখানে লাইন যোগ করুন';
        document.getElementById('pnd-intro-text').innerHTML = 'এখান থেকে ছবিটি ডাউনলোড করে আমাদের <b>পাসপোর্ট ফটো মেকার</b> দিয়ে এ৪ পেপারে সাজিয়ে প্রিন্ট করে নিতে পারবেন।';
        
        nameInp.placeholder = 'মোঃ ফয়জুল করিম';
        dateInp.placeholder = '২৪/০১/২০২৬';
        nameInp.style.fontFamily = "'SolaimanLipi', sans-serif";
        dateInp.style.fontFamily = "'SolaimanLipi', sans-serif";
    } else {
        document.getElementById('pnd-main-title').innerHTML = '<i class="fa-solid fa-file-signature"></i> Photo Name & Date Adder';
        document.getElementById('pnd-upload-text').innerText = 'Click to Upload Photo';
        document.getElementById('lbl-pnd-name').innerText = 'Type Full Name';
        document.getElementById('lbl-pnd-date').innerText = 'Type Date';
        document.getElementById('lbl-pnd-line').innerText = 'Add Separator Line';
        document.getElementById('pnd-intro-text').innerHTML = 'Download your edited photo from here and use our <b>Passport Photo Maker</b> tool to print it on A4 paper.';
        
        nameInp.placeholder = 'MD. FYZAL KARIM';
        dateInp.placeholder = '24/01/2026';
        nameInp.style.fontFamily = "inherit";
        dateInp.style.fontFamily = "inherit";
    }
    drawPndCanvas();
}

function loadPndImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        pndMainImage = new Image();
        pndMainImage.onload = function() {
            // Show preview box only when image is loaded
            document.getElementById('pnd-preview-box-wrapper').style.display = 'flex';
            drawPndCanvas();
        };
        pndMainImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function drawPndCanvas() {
    if (!pndMainImage) return;

    const canvas = document.getElementById('pnd-canvas');
    const ctx = canvas.getContext('2d');
    
    const name = document.getElementById('pnd-name').value;
    const date = document.getElementById('pnd-date').value;
    const nameColor = document.getElementById('pnd-name-color').value;
    const dateColor = document.getElementById('pnd-date-color').value;
    const showLine = document.getElementById('pnd-show-line').checked;
    const lineColor = document.getElementById('pnd-line-color').value;
    const fontSize = document.getElementById('pnd-font-size').value;

    canvas.width = pndMainImage.width;
    canvas.height = pndMainImage.height;

    ctx.drawImage(pndMainImage, 0, 0);

    // Footer white box logic (Only if name or date or line is present)
    if (name || date || showLine) {
        const boxHeight = canvas.height * 0.20;
        ctx.fillStyle = "white";
        ctx.fillRect(0, canvas.height - boxHeight, canvas.width, boxHeight);

        ctx.textAlign = "center";
        const fontFam = pndCurrentLang === 'bn' ? 'SolaimanLipi' : 'Arial';
        const responsiveFS = fontSize * (canvas.width / 400);

        // Draw Name
        ctx.fillStyle = nameColor;
        ctx.font = `bold ${responsiveFS}px ${fontFam}`;
        ctx.fillText(name, canvas.width / 2, canvas.height - (boxHeight * 0.62));

        // Draw Line (Separator Line Fix)
        if (showLine) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            // Line width adjusted for image resolution
            ctx.lineWidth = Math.max(1.5, canvas.width / 250); 
            const lineY = canvas.height - (boxHeight * 0.45);
            ctx.moveTo(canvas.width * 0.1, lineY);
            ctx.lineTo(canvas.width * 0.9, lineY);
            ctx.stroke();
            ctx.closePath();
        }

        // Draw Date
        ctx.fillStyle = dateColor;
        ctx.font = `${responsiveFS * 0.85}px ${fontFam}`;
        ctx.fillText(date, canvas.width / 2, canvas.height - (boxHeight * 0.18));
    }
}

function downloadPndImage() {
    if (!pndMainImage) return alert("Please upload a photo first!");
    const canvas = document.getElementById('pnd-canvas');
    const link = document.createElement('a');
    link.download = 'IDScannerPro_Photo.jpg';
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
}

function resetPnd() {
    pndMainImage = null;
    document.getElementById('pnd-name').value = '';
    document.getElementById('pnd-date').value = '';
    document.getElementById('pnd-input').value = '';
    document.getElementById('pnd-show-line').checked = false;
    // Hide preview box on reset
    document.getElementById('pnd-preview-box-wrapper').style.display = 'none';
    
    // Clear Canvas
    const canvas = document.getElementById('pnd-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
