let idmLogoImg = null;
let idmStudentImg = null;
let idmCurrentLang = 'en';
let idmOrient = 'h'; 

function openIdCardModal() {
    if (typeof setActiveMode === "function") setActiveMode('mode-student-id');
    document.getElementById('idCardModal').style.display = 'flex';
}

function closeIdCardModal() {
    document.getElementById('idCardModal').style.display = 'none';
}

function setIdOrient(mode) {
    idmOrient = mode;
    document.getElementById('idm-h-btn').classList.toggle('active', mode === 'h');
    document.getElementById('idm-v-btn').classList.toggle('active', mode === 'v');
    drawIdCard();
}

function setIdLang(lang) {
    idmCurrentLang = lang;
    const modal = document.getElementById('idCardModal');
    modal.querySelectorAll('.ph-tab').forEach(btn => {
        if(btn.id.includes('en') || btn.id.includes('bn')) btn.classList.remove('active');
    });
    document.getElementById(`idm-${lang}-btn`).classList.add('active');

    const elements = {
        'idm-main-title': lang === 'bn' ? '<i class="fa-solid fa-address-card"></i> স্টুডেন্ট আইডি কার্ড মেকার' : '<i class="fa-solid fa-address-card"></i> Student ID Card Maker',
        'lbl-inst-name': lang === 'bn' ? 'প্রতিষ্ঠানের নাম' : 'Institution Name',
        'txt-up-logo': lang === 'bn' ? 'লোগো আপলোড' : 'Upload Logo',
        'txt-up-photo': lang === 'bn' ? 'ছাত্রের ছবি' : 'Student Photo',
        'lbl-idm-name': lang === 'bn' ? 'ছাত্র/ছাত্রীর নাম' : 'Student Name',
        'lbl-idm-class': lang === 'bn' ? 'শ্রেণী' : 'Class',
        'lbl-idm-roll': lang === 'bn' ? 'রোল নং' : 'Roll No',
        'lbl-idm-father': lang === 'bn' ? 'পিতার নাম' : 'Father\'s Name',
        'lbl-idm-blood': lang === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group',
        'lbl-idm-phone': lang === 'bn' ? 'ফোন' : 'Phone',
        'lbl-idm-theme': lang === 'bn' ? 'কার্ডের থিম কালার' : 'Card Theme Color',
        'idm-intro-text': lang === 'bn' ? 'প্রফেশনাল আইডি কার্ড তৈরি করুন (৩.৩৭ x ২.১২৫ ইঞ্চি)। এটি স্টুডিও প্রিন্টিংয়ের জন্য উপযুক্ত।' : 'Professional Student ID Card (3.37 x 2.125 in). Ready for studio printing.'
    };

    for (let id in elements) {
        let el = document.getElementById(id);
        if(el) el.innerHTML = elements[id];
    }
    drawIdCard();
}

function loadIdAsset(event, type) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            if (type === 'logo') idmLogoImg = img;
            else idmStudentImg = img;
            document.getElementById('idm-canvas').style.display = 'block';
            document.getElementById('idm-placeholder').style.display = 'none';
            drawIdCard();
        };
        img.src = e.target.result;
    };
    if(event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
}

function drawIdCard() {
    const canvas = document.getElementById('idm-canvas');
    const ctx = canvas.getContext('2d');
    
    if(idmOrient === 'h') {
        canvas.width = 1012; canvas.height = 638;
    } else {
        canvas.width = 638; canvas.height = 1012;
    }

    const themeColor = document.getElementById('idm-color').value;
    const inst = document.getElementById('idm-inst').value || (idmCurrentLang === 'bn' ? 'প্রতিষ্ঠানের নাম' : 'INSTITUTION NAME');
    const name = document.getElementById('idm-name').value || (idmCurrentLang === 'bn' ? 'ছাত্রের নাম' : 'STUDENT NAME');
    const s_class = document.getElementById('idm-class').value;
    const roll = document.getElementById('idm-roll').value;
    const father = document.getElementById('idm-father').value;
    const blood = document.getElementById('idm-blood').value;
    const phone = document.getElementById('idm-phone').value;

    const fontBN = 'SolaimanLipi';
    const fontEN = 'Arial';
    const activeFont = idmCurrentLang === 'bn' ? fontBN : fontEN;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (idmOrient === 'h') {
        ctx.fillStyle = themeColor; ctx.fillRect(0, 0, canvas.width, 180);
        ctx.fillStyle = "#ffffff"; ctx.textAlign = "center";
        ctx.font = `bold 42px ${activeFont}`; ctx.fillText(inst, canvas.width / 2 + 50, 80);
        ctx.font = `24px ${activeFont}`; ctx.fillText(idmCurrentLang === 'bn' ? 'স্টুডেন্ট আইডি কার্ড' : 'Student ID Card', canvas.width / 2 + 50, 130);
        if (idmLogoImg) ctx.drawImage(idmLogoImg, 40, 30, 120, 120);
        ctx.strokeStyle = themeColor; ctx.lineWidth = 5; ctx.strokeRect(50, 220, 240, 290);
        if (idmStudentImg) ctx.drawImage(idmStudentImg, 55, 225, 230, 280);
        ctx.textAlign = "left"; ctx.fillStyle = themeColor;
        ctx.font = `bold 36px ${activeFont}`; ctx.fillText(name, 330, 260);
        ctx.fillStyle = "#374151"; ctx.font = `26px ${activeFont}`;
        let y = 320;
        const labels = idmCurrentLang === 'bn' ? ['শ্রেণী', 'রোল', 'পিতার নাম', 'রক্ত', 'ফোন'] : ['Class', 'Roll', 'Father', 'Blood', 'Phone'];
        const values = [s_class, roll, father, blood, phone];
        labels.forEach((l, i) => {
            ctx.fillStyle = "#6b7280"; ctx.fillText(l + " :", 330, y);
            ctx.fillStyle = "#111827"; ctx.font = `bold 26px ${activeFont}`;
            ctx.fillText(values[i] || '---', 480, y);
            y += 50;
        });
        ctx.fillStyle = themeColor; ctx.fillRect(0, 600, canvas.width, 38);
    } else {
        ctx.fillStyle = themeColor; ctx.fillRect(0, 0, canvas.width, 220);
        if (idmLogoImg) ctx.drawImage(idmLogoImg, canvas.width/2 - 50, 20, 100, 100);
        ctx.fillStyle = "#ffffff"; ctx.textAlign = "center";
        ctx.font = `bold 35px ${activeFont}`; ctx.fillText(inst, canvas.width / 2, 160);
        ctx.font = `20px ${activeFont}`; ctx.fillText(idmCurrentLang === 'bn' ? 'স্টুডেন্ট আইডি কার্ড' : 'Student ID Card', canvas.width / 2, 195);
        ctx.strokeStyle = themeColor; ctx.lineWidth = 5; ctx.strokeRect(canvas.width/2 - 110, 250, 220, 270);
        if (idmStudentImg) ctx.drawImage(idmStudentImg, canvas.width/2 - 105, 255, 210, 260);
        ctx.fillStyle = themeColor; ctx.font = `bold 34px ${activeFont}`; ctx.fillText(name, canvas.width/2, 580);
        ctx.textAlign = "left"; ctx.font = `24px ${activeFont}`;
        let y = 640;
        const labels = idmCurrentLang === 'bn' ? ['শ্রেণী', 'রোল', 'পিতা', 'রক্ত', 'ফোন'] : ['Class', 'Roll', 'Father', 'Blood', 'Phone'];
        const values = [s_class, roll, father, blood, phone];
        labels.forEach((l, i) => {
            ctx.fillStyle = "#6b7280"; ctx.fillText(l + ":", 100, y);
            ctx.fillStyle = "#111827"; ctx.font = `bold 24px ${activeFont}`; ctx.fillText(values[i] || '---', 220, y);
            y += 55;
        });
        ctx.fillStyle = themeColor; ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    }
}

function downloadIdCard() {
    const canvas = document.getElementById('idm-canvas');
    if (!idmStudentImg && !idmLogoImg) return alert("Please fill data and upload photo!");
    
    const link = document.createElement('a');
    link.download = 'ID_Card_ScannerPro.jpg';
    
    // এখানে ০.৯৮ এর জায়গায় ১.০ করা হয়েছে ফুল কোয়ালিটির জন্য
    link.href = canvas.toDataURL('image/jpeg', 1.0); 
    link.click();
}

function resetIdCard() {
    idmLogoImg = null; idmStudentImg = null;
    document.querySelectorAll('.idm-inputs-side input').forEach(i => i.value = '');
    document.getElementById('idm-canvas').style.display = 'none';
    document.getElementById('idm-placeholder').style.display = 'flex';
    setIdLang('en'); setIdOrient('h');
}
