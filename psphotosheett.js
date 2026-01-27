let psImages = [null, null, null, null, null];

// Real Size in mm
const PP_W = 38.1; // 1.5 inch
const PP_H = 48.26; // 1.9 inch
const ST_W = 22;
const ST_H = 27;

function openPhotoSheetModal() {
    if(typeof setActiveMode === 'function') setActiveMode('mode-photo-sheet');
    document.getElementById('photoSheetModal').style.display = 'flex';
}

function closePhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'none';
    resetPhotoSheet();
}

function resetPhotoSheet() {
    for(let i=0; i<5; i++) removePsImage(i);
}

function loadPsImage(event, index) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            psImages[index] = e.target.result;
            const idx = index + 1;
            document.getElementById('prev' + idx).src = e.target.result;
            document.getElementById('prev' + idx).style.display = 'block';
            document.getElementById('plus' + idx).style.display = 'none';
            document.getElementById('delBtn' + idx).style.display = 'flex';
            document.getElementById('psActionBtns').style.display = 'flex';
            updatePsPreview();
        }
        reader.readAsDataURL(file);
    }
}

function removePsImage(index) {
    psImages[index] = null;
    const idx = index + 1;
    document.getElementById('psInput' + idx).value = '';
    document.getElementById('prev' + idx).style.display = 'none';
    document.getElementById('plus' + idx).style.display = 'block';
    document.getElementById('delBtn' + idx).style.display = 'none';
    
    if(psImages.filter(x => x !== null).length === 0) 
        document.getElementById('psActionBtns').style.display = 'none';
    updatePsPreview();
}

function getDynamicCoords() {
    const margin = 0.53; // 2px Margin
    let currentY = margin;
    const hGap = 2.5; 
    const vGap = 3.5; 
    let coords = [];
    let limitReached = false;

    for (let i = 0; i < 5; i++) {
        const img = psImages[i];
        const layout = document.getElementById('layout' + (i + 1)).value;
        
        if (img && layout !== 'none') {
            if (currentY + PP_H > 296) { limitReached = true; break; }

            if (layout === '5pp') {
                for (let c = 0; c < 5; c++) coords.push({ w: PP_W, h: PP_H, x: margin + (c * (PP_W + hGap)), y: currentY, img: img });
                currentY += (PP_H + vGap);
            } 
            else if (layout === '3pp_3st') {
                for (let c = 0; c < 3; c++) coords.push({ w: PP_W, h: PP_H, x: margin + (c * (PP_W + hGap)), y: currentY, img: img });
                for (let c = 0; c < 3; c++) coords.push({ w: ST_W, h: ST_H, x: margin + (3 * (PP_W + hGap)) + (c * (ST_W + hGap)), y: currentY, img: img });
                currentY += (PP_H + vGap);
            }
            else if (layout === '8st') {
                for (let c = 0; c < 8; c++) coords.push({ w: ST_W, h: ST_H, x: margin + (c * (ST_W + hGap)), y: currentY, img: img });
                currentY += (ST_H + vGap);
            }
            else if (layout === '10pp') {
                for (let r = 0; r < 2; r++) {
                    if (currentY + PP_H > 296) { limitReached = true; break; }
                    for (let c = 0; c < 5; c++) coords.push({ w: PP_W, h: PP_H, x: margin + (c * (PP_W + hGap)), y: currentY, img: img });
                    currentY += (PP_H + vGap);
                }
            }
        }
    }
    return { coords, limitReached };
}

function updatePsPreview() {
    const previewArea = document.getElementById('a4-preview-area');
    const result = getDynamicCoords();
    const coords = result.coords;
    
    document.getElementById('limitWarning').style.display = result.limitReached ? 'block' : 'none';
    document.getElementById('footerNote').style.display = result.limitReached ? 'block' : 'none';

    previewArea.innerHTML = ''; 
    if(coords.length === 0) {
        previewArea.innerHTML = '<p style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #94a3b8; font-size: 12px;">No Image Selected</p>';
        return;
    }

    const scale = previewArea.clientWidth / 210; 
    coords.forEach(p => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.width = (p.w * scale) + 'px';
        div.style.height = (p.h * scale) + 'px';
        div.style.left = (p.x * scale) + 'px';
        div.style.top = (p.y * scale) + 'px';
        div.style.backgroundImage = "url(" + p.img + ")";
        div.style.backgroundSize = 'cover';
        div.style.backgroundPosition = 'center';
        if(document.getElementById('psBorder').checked) div.style.border = '0.5px solid #000';
        previewArea.appendChild(div);
    });
}

function directPrintSheet() {
    const { coords } = getDynamicCoords();
    if(coords.length === 0) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><style>@page { margin: 0; size: A4; } body { margin: 0; padding: 0; }</style></head><body>');
    coords.forEach(p => {
        let border = document.getElementById('psBorder').checked ? 'border: 0.1mm solid #ccc;' : '';
        printWindow.document.write(`<div style="position: absolute; left: ${p.x}mm; top: ${p.y}mm; width: ${p.w}mm; height: ${p.h}mm; ${border}"><img src="${p.img}" style="width: 100%; height: 100%; object-fit: cover;"></div>`);
    });
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
}

async function generatePhotoSheetPDF() {
    const { jsPDF } = window.jspdf;
    const { coords } = getDynamicCoords();
    if(coords.length === 0) return;
    const pdf = new jsPDF('p', 'mm', 'a4');
    coords.forEach(p => {
        pdf.addImage(p.img, 'JPEG', p.x, p.y, p.w, p.h);
        if(document.getElementById('psBorder').checked) {
            pdf.setDrawColor(200, 200, 200); pdf.setLineWidth(0.1); pdf.rect(p.x, p.y, p.w, p.h);
        }
    });
    pdf.save("PhotoSheet_Professional.pdf");
}
