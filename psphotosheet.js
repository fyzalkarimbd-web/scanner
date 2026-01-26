let psOriginalImage = null;

function openPhotoSheetModal() {
setActiveMode('mode-photo-sheet');
    document.getElementById('photoSheetModal').style.display = 'flex';
}

function closePhotoSheetModal() {
    document.getElementById('photoSheetModal').style.display = 'none';
    resetPhotoSheet();
}

function resetPhotoSheet() {
    psOriginalImage = null;
    document.getElementById('psInput').value = '';
    document.getElementById('a4-preview-area').innerHTML = '<p id="ps-empty-msg" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #94a3b8; font-size: 12px;">No Image Selected</p>';
    document.getElementById('psActionBtns').style.display = 'none';
}

function loadPsImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            psOriginalImage = e.target.result;
            document.getElementById('psActionBtns').style.display = 'flex';
            updatePsPreview();
        }
        reader.readAsDataURL(file);
    }
}

// Layout Calculation Logic
function getLayoutCoords(layout) {
    const mX = 3.5; // Left margin
    const mY = 3;   // Top margin (Reduced as per instruction)
    const ppW = 40; const ppH = 50;
    const stW = 20; const stH = 25;
    let coords = [];

    if (layout === "3pp_3st") {
        let gap = 5;
        for(let i=0; i<3; i++) coords.push({w: ppW, h: ppH, x: mX + (i*(ppW+gap)), y: mY});
        for(let i=0; i<3; i++) coords.push({w: stW, h: stH, x: mX + (3*(ppW+gap)) + (i*(stW+gap)), y: mY});
    } else if (layout === "3pp_3st_2r") {
        let gap = 5;
        for(let r=0; r<2; r++) {
            for(let i=0; i<3; i++) coords.push({w: ppW, h: ppH, x: mX + (i*(ppW+gap)), y: mY + (r*55)});
            for(let i=0; i<3; i++) coords.push({w: stW, h: stH, x: mX + (3*(ppW+gap)) + (i*(stW+gap)), y: mY + (r*55)});
        }
    } else if (layout === "5pp_10st") {
        for(let i=0; i<5; i++) coords.push({w: ppW, h: ppH, x: mX + (i*41), y: mY});
        for(let i=0; i<10; i++) coords.push({w: stW, h: stH, x: mX + (i*20.5), y: mY + ppH + 2});
    } else if (layout === "5pp") {
        for(let i=0; i<5; i++) coords.push({w: ppW, h: ppH, x: mX + (i*41), y: mY});
    } else if (layout === "10pp") {
        for(let r=0; r<2; r++) for(let c=0; c<5; c++) coords.push({w: ppW, h: ppH, x: mX + (c*41), y: mY + (r*51)});
    } else if (layout === "full_pp") {
        for(let r=0; r<5; r++) for(let c=0; c<5; c++) coords.push({w: ppW, h: ppH, x: mX + (c*41), y: mY + (r*51)});
    }
    return coords;
}

function updatePsPreview() {
    if (!psOriginalImage) return;
    const previewArea = document.getElementById('a4-preview-area');
    const layout = document.getElementById('psLayout').value;
    const showBorder = document.getElementById('psBorder').checked;
    const coords = getLayoutCoords(layout);
    
    previewArea.innerHTML = ''; 
    const scale = previewArea.clientWidth / 210; 

    coords.forEach(p => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.width = (p.w * scale) + 'px';
        div.style.height = (p.h * scale) + 'px';
        div.style.left = (p.x * scale) + 'px';
        div.style.top = (p.y * scale) + 'px';
        div.style.backgroundImage = "url(" + psOriginalImage + ")";
        div.style.backgroundSize = 'cover';
        if(showBorder) div.style.border = '0.5px solid #bbb';
        previewArea.appendChild(div);
    });
}

// Function 1: Direct Print
function directPrintSheet() {
    const layout = document.getElementById('psLayout').value;
    const showBorder = document.getElementById('psBorder').checked;
    const coords = getLayoutCoords(layout);
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Direct Print - Studio Pro</title>');
    printWindow.document.write('<style>@page { margin: 0; size: A4; } body { margin: 0; padding: 0; }</style></head><body>');
    
    coords.forEach(p => {
        let borderStyle = showBorder ? 'border: 0.1mm solid #ccc;' : '';
        printWindow.document.write(`
            <div style="position: absolute; left: ${p.x}mm; top: ${p.y}mm; width: ${p.w}mm; height: ${p.h}mm; ${borderStyle}">
                <img src="${psOriginalImage}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        `);
    });

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
}

// Function 2: Save as PDF
async function generatePhotoSheetPDF() {
    const { jsPDF } = window.jspdf;
    const layout = document.getElementById('psLayout').value;
    const showBorder = document.getElementById('psBorder').checked;
    const coords = getLayoutCoords(layout);

    const pdf = new jsPDF('p', 'mm', 'a4');
    coords.forEach(p => {
        pdf.addImage(psOriginalImage, 'JPEG', p.x, p.y, p.w, p.h);
        if(showBorder) {
            pdf.setDrawColor(200, 200, 200);
            pdf.setLineWidth(0.1);
            pdf.rect(p.x, p.y, p.w, p.h);
        }
    });
    pdf.save("PhotoSheet_" + Date.now() + ".pdf");
}
