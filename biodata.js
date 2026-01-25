let bioPhotoBase64 = null;
let bioCurrentLang = 'en';
let bioType = 'job';

function openBiodataModal() {
    document.getElementById('biodataModal').style.display = 'flex';
    updateBioPreview();
}

function closeBiodataModal() {
    document.getElementById('biodataModal').style.display = 'none';
}

function setBioLang(lang) {
    bioCurrentLang = lang;
    document.getElementById('bio-en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('bio-bn-btn').classList.toggle('active', lang === 'bn');
    updateBioPreview();
}

function setBioType(type) {
    bioType = type;
    document.getElementById('type-job-btn').classList.toggle('active', type === 'job');
    document.getElementById('type-marriage-btn').classList.toggle('active', type === 'marriage');
    document.getElementById('marriage-fields').style.display = type === 'marriage' ? 'grid' : 'none';
    document.getElementById('job-exp-group').style.display = type === 'marriage' ? 'none' : 'block';
    updateBioPreview();
}

function loadBioPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            bioPhotoBase64 = e.target.result;
            updateBioPreview();
        };
        reader.readAsDataURL(file);
    }
}

// ইনপুট ইভেন্ট লিসেনার
const inputIds = ['bio-name', 'bio-father', 'bio-mother', 'bio-dob', 'bio-religion', 'bio-edu', 'bio-exp', 'bio-addr', 'bio-phone', 'bio-email', 'bio-height', 'bio-blood'];
inputIds.forEach(id => {
    document.getElementById(id).addEventListener('input', updateBioPreview);
});

function updateBioPreview() {
    const renderArea = document.getElementById('bio-render-area');
    
    // টাইটেল সেট করা
    const titleObj = {
        job: { en: 'CURRICULUM VITAE', bn: 'জীবনবৃত্তান্ত' },
        marriage: { en: 'BIODATA', bn: 'বায়োডাটা' }
    };
    document.getElementById('pre-title').innerText = titleObj[bioType][bioCurrentLang];
    
    // নাম সেট করা
    document.getElementById('pre-name').innerText = document.getElementById('bio-name').value || (bioCurrentLang === 'bn' ? 'আপনার নাম' : 'YOUR NAME');
    
    // ছবি সেট করা
    if(bioPhotoBase64) {
        document.getElementById('pre-img-box').innerHTML = `<img src="${bioPhotoBase64}" style="width:100%; height:100%; object-fit:cover;">`;
    }

    // ডিটেইলস ডাটা
    const labels = bioCurrentLang === 'bn' ? 
        {f:'পিতার নাম', m:'মাতার নাম', d:'জন্ম তারিখ', r:'ধর্ম', h:'উচ্চতা', b:'রক্তের গ্রুপ', p:'ফোন', e:'ইমেইল'} : 
        {f:"Father's Name", m:"Mother's Name", d:'Date of Birth', r:'Religion', h:'Height', b:'Blood Group', p:'Phone', e:'Email'};

    let detailsHtml = `
        <b>${labels.f}:</b> ${document.getElementById('bio-father').value}<br>
        <b>${labels.m}:</b> ${document.getElementById('bio-mother').value}<br>
        <b>${labels.d}:</b> ${document.getElementById('bio-dob').value}<br>
        <b>${labels.r}:</b> ${document.getElementById('bio-religion').value}<br>
    `;
    
    if(bioType === 'marriage') {
        detailsHtml += `<b>${labels.h}:</b> ${document.getElementById('bio-height').value}<br>`;
        detailsHtml += `<b>${labels.b}:</b> ${document.getElementById('bio-blood').value}<br>`;
    }
    detailsHtml += `<b>${labels.p}:</b> ${document.getElementById('bio-phone').value}<br>`;
    detailsHtml += `<b>${labels.e}:</b> ${document.getElementById('bio-email').value}`;
    document.getElementById('pre-details').innerHTML = detailsHtml;

    // সেকশন ডাটা
    let sectionsHtml = `
        <div style="margin-top:15px; border-top:1px solid #eee; padding-top:10px;">
            <h3 style="font-size:14px; color:#7c3aed; margin-bottom:5px; border-bottom:1px solid #f3f0ff; display:inline-block;">${bioCurrentLang === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Education'}</h3>
            <p style="white-space: pre-line; margin:0;">${document.getElementById('bio-edu').value}</p>
        </div>
    `;

    if(bioType === 'job') {
        sectionsHtml += `
            <div style="margin-top:15px;">
                <h3 style="font-size:14px; color:#7c3aed; margin-bottom:5px; border-bottom:1px solid #f3f0ff; display:inline-block;">${bioCurrentLang === 'bn' ? 'অভিজ্ঞতা ও দক্ষতা' : 'Experience & Skills'}</h3>
                <p style="white-space: pre-line; margin:0;">${document.getElementById('bio-exp').value}</p>
            </div>
        `;
    }

    sectionsHtml += `
        <div style="margin-top:15px;">
            <h3 style="font-size:14px; color:#7c3aed; margin-bottom:5px; border-bottom:1px solid #f3f0ff; display:inline-block;">${bioCurrentLang === 'bn' ? 'ঠিকানা' : 'Address'}</h3>
            <p style="white-space: pre-line; margin:0;">${document.getElementById('bio-addr').value}</p>
        </div>
    `;
    document.getElementById('pre-sections').innerHTML = sectionsHtml;
}

// পিডিএফ ডাউনলোড ফাংশন (নিখুঁত করার জন্য আপডেট করা হয়েছে)
async function downloadBiodataPDF() {
    const element = document.getElementById('bio-render-area');
    const btn = document.getElementById('download-btn');
    
    // বাটন সাময়িক পরিবর্তন
    const originalText = btn.innerHTML;
    btn.innerHTML = "Processing...";
    btn.style.opacity = "0.5";

    // পিডিএফ অপশন
    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'Biodata_ScannerPro.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
            scale: 3, 
            useCORS: true, 
            letterRendering: true,
            scrollX: 0,
            scrollY: 0
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        // html2pdf রান করা
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error("PDF Error:", error);
        alert("Could not generate PDF. Please try again.");
    } finally {
        btn.innerHTML = originalText;
        btn.style.opacity = "1";
    }
}

function resetBiodata() {
    // অ্যালার্ট ছাড়াই সরাসরি সব ইনপুট ক্লিয়ার করে দিবে
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
    
    bioPhotoBase64 = null;
    document.getElementById('pre-img-box').innerHTML = '<span style="color: #ccc; font-size: 10px;">Photo</span>';
    
    // প্রিভিউ আপডেট করে রিসেট অবস্থা দেখাবে
    updateBioPreview();
}
