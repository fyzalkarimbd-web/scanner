let visaCropper = null;
let currentVisaWidthMM = 51;
let currentVisaHeightMM = 51;
let finalCroppedVisaBase64 = null;

// 100+ Countries Visa Photo Dimensions (Width x Height in mm)
const visaCountriesData = [
    { name: "United States (US)", w: 51, h: 51 },
    { name: "India", w: 51, h: 51 },
    { name: "United Kingdom (UK)", w: 35, h: 45 },
    { name: "Schengen (Europe)", w: 35, h: 45 },
    { name: "Canada (Visa)", w: 35, h: 45 },
    { name: "Canada (PR/Passport)", w: 50, h: 70 },
    { name: "Australia", w: 35, h: 45 },
    { name: "New Zealand", w: 35, h: 45 },
    { name: "China", w: 33, h: 48 },
    { name: "Japan", w: 35, h: 45 },
    { name: "Saudi Arabia", w: 40, h: 60 },
    { name: "United Arab Emirates (UAE)", w: 40, h: 60 },
    { name: "Malaysia", w: 35, h: 50 },
    { name: "Singapore", w: 35, h: 45 },
    { name: "South Korea", w: 35, h: 45 },
    { name: "Thailand", w: 35, h: 45 },
    { name: "South Africa", w: 35, h: 45 },
    { name: "Russia", w: 35, h: 45 },
    { name: "Brazil", w: 50, h: 70 },
    { name: "Argentina", w: 40, h: 40 },
    { name: "Bangladesh (Passport)", w: 40, h: 50 },
    { name: "Pakistan", w: 35, h: 45 },
    { name: "Nepal", w: 35, h: 45 },
    { name: "Sri Lanka", w: 35, h: 45 },
    { name: "Maldives", w: 35, h: 45 },
    { name: "Afghanistan", w: 35, h: 45 },
    { name: "Albania", w: 36, h: 47 },
    { name: "Algeria", w: 35, h: 45 },
    { name: "Angola", w: 35, h: 45 },
    { name: "Armenia", w: 35, h: 45 },
    { name: "Austria", w: 35, h: 45 },
    { name: "Azerbaijan", w: 35, h: 45 },
    { name: "Bahamas", w: 50, h: 50 },
    { name: "Bahrain", w: 40, h: 60 },
    { name: "Belarus", w: 35, h: 45 },
    { name: "Belgium", w: 35, h: 45 },
    { name: "Bolivia", w: 40, h: 40 },
    { name: "Bosnia", w: 35, h: 45 },
    { name: "Bulgaria", w: 35, h: 45 },
    { name: "Cambodia", w: 40, h: 60 },
    { name: "Cameroon", w: 40, h: 40 },
    { name: "Chile", w: 40, h: 40 },
    { name: "Colombia", w: 40, h: 40 },
    { name: "Costa Rica", w: 50, h: 50 },
    { name: "Croatia", w: 35, h: 45 },
    { name: "Cuba", w: 40, h: 40 },
    { name: "Cyprus", w: 35, h: 45 },
    { name: "Czech Republic", w: 35, h: 45 },
    { name: "Denmark", w: 35, h: 45 },
    { name: "Dominican Republic", w: 50, h: 50 },
    { name: "Ecuador", w: 40, h: 40 },
    { name: "Egypt", w: 40, h: 60 },
    { name: "Estonia", w: 35, h: 45 },
    { name: "Ethiopia", w: 40, h: 40 },
    { name: "Fiji", w: 35, h: 45 },
    { name: "Finland", w: 36, h: 47 },
    { name: "France", w: 35, h: 45 },
    { name: "Georgia", w: 35, h: 45 },
    { name: "Germany", w: 35, h: 45 },
    { name: "Greece", w: 35, h: 45 },
    { name: "Hong Kong", w: 40, h: 50 },
    { name: "Hungary", w: 35, h: 45 },
    { name: "Iceland", w: 36, h: 47 },
    { name: "Indonesia", w: 35, h: 45 },
    { name: "Iran", w: 40, h: 60 },
    { name: "Iraq", w: 40, h: 60 },
    { name: "Ireland", w: 35, h: 45 },
    { name: "Israel", w: 51, h: 51 },
    { name: "Italy", w: 35, h: 45 },
    { name: "Jamaica", w: 50, h: 50 },
    { name: "Jordan", w: 40, h: 60 },
    { name: "Kazakhstan", w: 40, h: 50 },
    { name: "Kenya", w: 35, h: 45 },
    { name: "Kuwait", w: 40, h: 60 },
    { name: "Lebanon", w: 40, h: 60 },
    { name: "Lithuania", w: 40, h: 50 },
    { name: "Luxembourg", w: 35, h: 45 },
    { name: "Macau", w: 40, h: 50 },
    { name: "Malta", w: 35, h: 45 },
    { name: "Mexico", w: 40, h: 40 },
    { name: "Morocco", w: 40, h: 60 },
    { name: "Myanmar", w: 40, h: 60 },
    { name: "Netherlands", w: 35, h: 45 },
    { name: "Nigeria", w: 35, h: 45 },
    { name: "Norway", w: 35, h: 45 },
    { name: "Oman", w: 40, h: 60 },
    { name: "Panama", w: 50, h: 50 },
    { name: "Peru", w: 50, h: 50 },
    { name: "Philippines", w: 35, h: 45 },
    { name: "Poland", w: 35, h: 45 },
    { name: "Portugal", w: 35, h: 45 },
    { name: "Qatar", w: 38, h: 48 },
    { name: "Romania", w: 35, h: 45 },
    { name: "Serbia", w: 35, h: 45 },
    { name: "Slovakia", w: 35, h: 45 },
    { name: "Spain", w: 35, h: 45 },
    { name: "Sweden", w: 35, h: 45 },
    { name: "Switzerland", w: 35, h: 45 },
    { name: "Syria", w: 40, h: 40 },
    { name: "Taiwan", w: 35, h: 45 },
    { name: "Turkey", w: 50, h: 60 },
    { name: "Ukraine", w: 35, h: 45 },
    { name: "Uruguay", w: 40, h: 40 },
    { name: "Uzbekistan", w: 35, h: 45 },
    { name: "Venezuela", w: 40, h: 40 },
    { name: "Vietnam", w: 40, h: 60 },
    { name: "Yemen", w: 40, h: 60 },
    { name: "Zimbabwe", w: 50, h: 50 }
];

// Initialize Modal & Dropdown
function openVisaModal() {
    setActiveMode('mode-visa-photo');
    document.getElementById('visaModal').style.display = 'flex';
    populateCountryList(visaCountriesData);
}

function closeVisaModal() {
    document.getElementById('visaModal').style.display = 'none';
    deleteVisaImage(); 
}

// Dropdown Logic
function toggleVisaDropdown() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
    if(menu.classList.contains('show')) {
        document.getElementById('visaSearchInput').focus();
    }
}

function populateCountryList(data) {
    const list = document.getElementById('visaCountryList');
    list.innerHTML = '';
    data.forEach(country => {
        let unit = (country.w === 51) ? 'inch' : 'mm';
        let displayW = (country.w === 51) ? '2' : country.w;
        let displayH = (country.h === 51) ? '2' : country.h;
        
        let li = document.createElement('li');
        li.innerHTML = `${country.name} <span>${displayW}x${displayH} ${unit}</span>`;
        li.onclick = () => selectCountry(country.name, country.w, country.h);
        list.appendChild(li);
    });
}

function filterVisaCountries() {
    const input = document.getElementById('visaSearchInput').value.toLowerCase();
    const filtered = visaCountriesData.filter(c => c.name.toLowerCase().includes(input));
    populateCountryList(filtered);
}

function selectCountry(name, w, h) {
    currentVisaWidthMM = w;
    currentVisaHeightMM = h;
    
    let unit = (w === 51 || w === 50) && h === 51 ? 'inch' : 'mm';
    let displayW = w === 51 ? '2' : w;
    let displayH = h === 51 ? '2' : h;
    
    document.getElementById('selected-country-text').innerText = `${name} (${displayW} x ${displayH} ${unit})`;
    document.getElementById('visa-specs-text').innerText = `${displayW} x ${displayH} ${unit}`;
    
    document.getElementById('dropdownMenu').classList.remove('show');

    if(visaCropper) {
        visaCropper.setAspectRatio(w / h);
    }
}

// Close dropdown when clicking outside
window.addEventListener('click', function(e) {
    if (!document.getElementById('visaDropdown').contains(e.target)) {
        document.getElementById('dropdownMenu').classList.remove('show');
    }
});


// Image & Cropper Logic
function loadVisaImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const image = document.getElementById('visa-image');
        image.src = e.target.result;
        
        document.getElementById('visa-placeholder').style.display = 'none';
        document.getElementById('visa-upload-btn').style.display = 'none';
        document.getElementById('visa-result-preview').style.display = 'none';
        image.style.display = 'block';
        
        document.getElementById('visa-precrop-actions').style.display = 'grid';
        document.getElementById('btn-visa-reset').style.display = 'none';
        document.getElementById('btn-visa-jpg').disabled = true;
        document.getElementById('btn-visa-pdf').disabled = true;
        finalCroppedVisaBase64 = null;

        if (visaCropper) {
            visaCropper.destroy();
        }

        const ratio = currentVisaWidthMM / currentVisaHeightMM;

        visaCropper = new Cropper(image, {
            aspectRatio: ratio,
            viewMode: 1,
            autoCropArea: 0.8,
            dragMode: 'move',
            guides: true,
            center: true,
            highlight: false,
            cropBoxMovable: true,
            cropBoxResizable: true,
            toggleDragModeOnDblclick: false,
            zoomOnWheel: false
        });
    };
    reader.readAsDataURL(file);
}

function getPxAt300DPI(mm) {
    return Math.round((mm / 25.4) * 300);
}

function performVisaCrop() {
    if (!visaCropper) return;
    
    const targetWidthPx = getPxAt300DPI(currentVisaWidthMM);
    const targetHeightPx = getPxAt300DPI(currentVisaHeightMM);

    const canvas = visaCropper.getCroppedCanvas({
        width: targetWidthPx,
        height: targetHeightPx,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    });

    finalCroppedVisaBase64 = canvas.toDataURL('image/jpeg', 1.0);

    visaCropper.destroy();
    visaCropper = null;
    document.getElementById('visa-image').style.display = 'none';
    
    const resultImg = document.getElementById('visa-result-preview');
    resultImg.src = finalCroppedVisaBase64;
    resultImg.style.display = 'block';

    document.getElementById('visa-precrop-actions').style.display = 'none';
    document.getElementById('btn-visa-reset').style.display = 'block';
    
    document.getElementById('btn-visa-jpg').disabled = false;
    document.getElementById('btn-visa-pdf').disabled = false;

    document.getElementById('visaDropdown').style.pointerEvents = 'none';
    document.getElementById('visaDropdown').style.opacity = '0.5';
}

function deleteVisaImage() {
    if(visaCropper) {
        visaCropper.destroy();
        visaCropper = null;
    }
    finalCroppedVisaBase64 = null;
    
    document.getElementById('visa-input').value = '';
    document.getElementById('visa-image').src = '';
    document.getElementById('visa-result-preview').src = '';
    
    document.getElementById('visa-image').style.display = 'none';
    document.getElementById('visa-result-preview').style.display = 'none';
    document.getElementById('visa-placeholder').style.display = 'block';
    document.getElementById('visa-upload-btn').style.display = 'block';
    
    document.getElementById('visa-precrop-actions').style.display = 'none';
    document.getElementById('btn-visa-reset').style.display = 'none';
    document.getElementById('btn-visa-jpg').disabled = true;
    document.getElementById('btn-visa-pdf').disabled = true;

    document.getElementById('visaDropdown').style.pointerEvents = 'auto';
    document.getElementById('visaDropdown').style.opacity = '1';
}

function downloadVisaSingle() {
    if (!finalCroppedVisaBase64) return;
    const link = document.createElement('a');
    link.download = `Visa_Photo_${currentVisaWidthMM}x${currentVisaHeightMM}.jpg`;
    link.href = finalCroppedVisaBase64;
    link.click();
}

function openVisaCopiesModal() {
    if (!finalCroppedVisaBase64) return;
    // Set default value to 6
    document.getElementById('visa-copy-count').value = 4;
    // Show the custom UI
    document.getElementById('visaCopiesModal').style.display = 'flex';
}

function closeVisaCopiesModal() {
    document.getElementById('visaCopiesModal').style.display = 'none';
}

function changeVisaCopies(amount) {
    let input = document.getElementById('visa-copy-count');
    let val = parseInt(input.value) || 0;
    val += amount;
    if (val < 1) val = 1;
    if (val > 100) val = 100; // Limit to maximum 100 copies
    input.value = val;
}

function executeVisaPDF() {
    // Hide the modal first
    closeVisaCopiesModal();
    
    // Get the quantity from our custom UI
    let copiesInput = document.getElementById('visa-copy-count').value;
    const totalCopies = parseInt(copiesInput);
    
    if (isNaN(totalCopies) || totalCopies <= 0) return;

    // Proceed with jsPDF generation
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ format: 'a4', unit: 'mm' });

    // A4 paper dimensions and margins
    const pageWidth = 210; 
    const pageHeight = 297; 
    const margin = 15; 
    const gap = 5; 

    let currentX = margin;
    let currentY = margin;

    // Automatic Grid Layout Logic
    for (let i = 0; i < totalCopies; i++) {
        
        // Check if next image exceeds right margin
        if (currentX + currentVisaWidthMM > pageWidth - margin) {
            currentX = margin;
            currentY += currentVisaHeightMM + gap;
        }
        
        // Check if next image exceeds bottom margin
        if (currentY + currentVisaHeightMM > pageHeight - margin) {
            doc.addPage();
            currentX = margin;
            currentY = margin;
        }
        
        // Add cut line (border)
        doc.setDrawColor(200, 200, 200);
        doc.rect(currentX - 0.2, currentY - 0.2, currentVisaWidthMM + 0.4, currentVisaHeightMM + 0.4);
        
        // Add cropped image
        doc.addImage(finalCroppedVisaBase64, 'JPEG', currentX, currentY, currentVisaWidthMM, currentVisaHeightMM);
        
        // Move X to the right for the next image
        currentX += currentVisaWidthMM + gap;
    }

    doc.save(`Visa_Print_A4_${currentVisaWidthMM}x${currentVisaHeightMM}.pdf`);
}
