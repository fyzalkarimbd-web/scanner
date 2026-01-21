function openBarcodeModal() {
    document.getElementById('barcodeModal').style.display = 'flex';
    if(typeof setActiveMode === 'function') setActiveMode('mode-barcode');
    generateBarcode(); // শুরুতে একবার জেনারেট করা
}

function closeBarcodeModal() {
    document.getElementById('barcodeModal').style.display = 'none';
}

function generateBarcode() {
    const text = document.getElementById('barcode-text').value;
    const format = document.getElementById('barcode-format').value;
    const width = document.getElementById('bar-width').value;
    const height = document.getElementById('bar-height').value;
    const color = document.getElementById('bar-color').value;
    const background = document.getElementById('bar-bg').value;
    const showText = document.getElementById('show-text').checked;
    const errorMsg = document.getElementById('barcode-error');

    if(!text) return;

    try {
        JsBarcode("#barcode-output", text, {
            format: format,
            width: parseInt(width),
            height: parseInt(height),
            displayValue: showText,
            lineColor: color,
            background: background,
            margin: 10,
            valid: function(valid) {
                if (valid) {
                    errorMsg.style.display = 'none';
                } else {
                    errorMsg.style.display = 'block';
                }
            }
        });
    } catch (err) {
        errorMsg.style.display = 'block';
    }
}

function downloadBarcode(type) {
    const svg = document.getElementById('barcode-output');
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(source)));
    
    img.onload = function() {
        canvas.width = img.width + 40;
        canvas.height = img.height + 40;
        
        context.fillStyle = document.getElementById('bar-bg').value;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 20, 20);
        
        const link = document.createElement('a');
        link.download = `Barcode_${document.getElementById('barcode-text').value}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        // এখানে কোনো triggerAlert বা alert রাখা হয়নি
    };
}

function resetBarcode() {
    // ইনপুটগুলো ডিফল্ট ভ্যালুতে ফিরিয়ে আনা
    document.getElementById('barcode-text').value = "12345678";
    document.getElementById('barcode-format').value = "CODE128";
    document.getElementById('bar-width').value = "2";
    document.getElementById('bar-height').value = "80";
    document.getElementById('bar-color').value = "#000000";
    document.getElementById('bar-bg').value = "#ffffff";
    document.getElementById('show-text').checked = true;
    
    // বারকোড পুনরায় জেনারেট করা
    generateBarcode();
    
    // এখানে কোনো কনফার্মেশন বা এলার্ট দেওয়া হয়নি
}
