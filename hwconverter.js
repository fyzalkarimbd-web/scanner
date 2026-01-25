function openUnitModal() {
    setActiveMode('mode-unit-conv');
    document.getElementById('unitModal').style.display = 'flex';
}

function closeUnitModal() {
    document.getElementById('unitModal').style.display = 'none';
    resetUnitConverter();
}

// Reset Logic
function resetUnitConverter() {
    document.getElementById('h-feet').value = '';
    document.getElementById('h-inch').value = '';
    document.getElementById('w-kg').value = '';
    document.getElementById('res-cm').innerText = '0.00';
    document.getElementById('res-lbs').innerText = '0.00';
}

// Height Calculation (Feet/Inch to CM)
function calculateHeight() {
    const feet = parseFloat(document.getElementById('h-feet').value) || 0;
    const inch = parseFloat(document.getElementById('h-inch').value) || 0;
    
    // 1 foot = 30.48 cm, 1 inch = 2.54 cm
    const cm = (feet * 30.48) + (inch * 2.54);
    document.getElementById('res-cm').innerText = cm.toFixed(2);
}

// Weight Calculation (KG to Lbs)
function calculateWeight() {
    const kg = parseFloat(document.getElementById('w-kg').value) || 0;
    
    // 1 kg = 2.20462 lbs
    const lbs = kg * 2.20462;
    document.getElementById('res-lbs').innerText = lbs.toFixed(2);
}

// Copy Logic with Text Change (No Alert)
function copyUnitRes(elementId, btn) {
    const text = document.getElementById(elementId).innerText;
    const originalBtnText = btn.innerText;

    if (text && text !== "0.00") {
        navigator.clipboard.writeText(text).then(() => {
            btn.innerText = "Copied!"; // টেক্সট পরিবর্তন
            btn.style.background = "#059669"; // গ্রিন কালার (সফলতা বোঝাতে)

            // ২ সেকেন্ড পর আবার আগের অবস্থায় ফিরে আসবে
            setTimeout(() => {
                btn.innerText = originalBtnText;
                btn.style.background = (elementId === 'res-cm') ? "#0d9488" : "#475569";
            }, 2000);
        });
    }
}
