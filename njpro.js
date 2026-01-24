let njpro_frontImg = null;
let njpro_backImg = null;
let njpro_joinedImg = null; 
let njpro_mode = "h"; // CHANGED: Default "h"
let njpro_side = "";
let njpro_pts = [{x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}];
let njpro_rawMat = null;
let njpro_scale = 1;
let njpro_currImg = null;

function njpro_openModal() {
    document.getElementById('njpro_main_modal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
    if(typeof setActiveMode === 'function') setActiveMode('mode-nid-joiner');
}

function njpro_closeModal() { 
    document.getElementById('njpro_main_modal').style.display = 'none'; 
    document.body.style.overflow = ''; 
    njpro_cancelCrop();
}

function njpro_drawLines() {
    const canvas = document.getElementById('njpro_select_canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(njpro_currImg, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#f43f5e";
    ctx.moveTo(njpro_pts[0].x, njpro_pts[0].y);
    ctx.lineTo(njpro_pts[1].x, njpro_pts[1].y);
    ctx.lineTo(njpro_pts[2].x, njpro_pts[2].y);
    ctx.lineTo(njpro_pts[3].x, njpro_pts[3].y);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
    ctx.fill();
}

function njpro_loadPart(input, side) {
    if (input.files && input.files[0]) {
        njpro_side = side;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                njpro_currImg = img;
                const overlay = document.getElementById('njpro_crop_overlay');
                const canvas = document.getElementById('njpro_select_canvas');
                overlay.style.display = 'flex';
                
                const limitW = 750; 
                const limitH = 500; 
                const viewW = Math.min(window.innerWidth * 0.92, limitW);
                const viewH = Math.min(window.innerHeight * 0.7, limitH);
                
                njpro_scale = Math.min(viewW / img.width, viewH / img.height);
                canvas.width = img.width * njpro_scale;
                canvas.height = img.height * njpro_scale;
                
                const pad = 20; 
                njpro_pts = [
                    {id: 'njpro_pt0', x: pad, y: pad},
                    {id: 'njpro_pt1', x: canvas.width - pad, y: pad},
                    {id: 'njpro_pt2', x: canvas.width - pad, y: canvas.height - pad},
                    {id: 'njpro_pt3', x: pad, y: canvas.height - pad}
                ];
                njpro_pts.forEach(p => {
                    const el = document.getElementById(p.id);
                    el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
                    njpro_initDrag(el, p);
                });
                if(njpro_rawMat) njpro_rawMat.delete();
                njpro_rawMat = cv.imread(img);
                njpro_drawLines();
            };
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function njpro_updateZoom(x, y, clientX, clientY) {
    const glass = document.getElementById('njpro_zoom_glass');
    const zCanvas = document.getElementById('njpro_zoom_canvas');
    const zCtx = zCanvas.getContext('2d');
    
    const boundaryEl = document.getElementById('njpro_select_canvas');
    const boundaryRect = boundaryEl.getBoundingClientRect();
    
    const zoomFactor = 2.5; 
    const glassRect = glass.getBoundingClientRect();
    const glassW = glassRect.width;
    const glassH = glassRect.height;
    
    const srcX = x / njpro_scale;
    const srcY = y / njpro_scale;
    const srcW = zCanvas.width / zoomFactor;
    const srcH = zCanvas.height / zoomFactor;
    
    zCtx.clearRect(0,0, zCanvas.width, zCanvas.height);
    zCtx.drawImage(njpro_currImg, 
        srcX - srcW/2, srcY - srcH/2, srcW, srcH, 
        0, 0, zCanvas.width, zCanvas.height
    );
    
    let posLeft = clientX + 30;
    let posTop = clientY - 30 - glassH;

    if (clientX > boundaryRect.left + (boundaryRect.width / 2)) {
        posLeft = clientX - 30 - glassW;
    }
    if (clientY < boundaryRect.top + glassH + 20) {
         posTop = clientY + 40;
    }

    if (posLeft < boundaryRect.left) posLeft = boundaryRect.left;
    if (posLeft + glassW > boundaryRect.right) posLeft = boundaryRect.right - glassW;
    if (posTop < boundaryRect.top) posTop = boundaryRect.top;
    if (posTop + glassH > boundaryRect.bottom) posTop = boundaryRect.bottom - glassH;

    glass.style.left = posLeft + 'px';
    glass.style.top = posTop + 'px';
}

function njpro_initDrag(el, pObj) {
    const glass = document.getElementById('njpro_zoom_glass');
    const move = (e) => {
        const rect = document.getElementById('njpro_select_canvas').getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        pObj.x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        pObj.y = Math.max(0, Math.min(clientY - rect.top, rect.height));
        el.style.left = pObj.x + 'px'; el.style.top = pObj.y + 'px';
        njpro_drawLines();
        njpro_updateZoom(pObj.x, pObj.y, clientX, clientY);
    };
    const stop = () => {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('touchmove', move);
        glass.style.display = 'none';
    };
    const start = (e) => {
        if(e.cancelable) e.preventDefault();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        window.addEventListener('mousemove', move);
        window.addEventListener('touchmove', move);
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchend', stop);
        glass.style.display = 'block';
        njpro_updateZoom(pObj.x, pObj.y, clientX, clientY);
    };
    el.onmousedown = start;
    el.ontouchstart = start;
}

function njpro_applyCrop() {
    try {
        let dst = new cv.Mat();
        let coords = [];
        njpro_pts.forEach(p => {
            coords.push(p.x / njpro_scale);
            coords.push(p.y / njpro_scale);
        });
        const stdW = 990, stdH = 630;
        let srcCoords = cv.matFromArray(4, 1, cv.CV_32FC2, coords);
        let dstCoords = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, stdW, 0, stdW, stdH, 0, stdH]);
        let M = cv.getPerspectiveTransform(srcCoords, dstCoords);
        cv.warpPerspective(njpro_rawMat, dst, M, new cv.Size(stdW, stdH));
        const tempCan = document.createElement('canvas');
        cv.imshow(tempCan, dst);
        const resImg = new Image();
        resImg.src = tempCan.toDataURL('image/jpeg', 0.95);
        resImg.onload = () => {
            if (njpro_side === 'front') {
                njpro_frontImg = resImg;
                document.getElementById('njpro_txt_f_status').innerText = "Front Cropped ✅";
            } else {
                njpro_backImg = resImg;
                document.getElementById('njpro_txt_b_status').innerText = "Back Cropped ✅";
            }
            njpro_cancelCrop();
            njpro_drawJoined();
        };
        dst.delete(); M.delete(); srcCoords.delete(); dstCoords.delete();
    } catch (e) { alert("Please select all 4 corners correctly."); }
}

function njpro_cancelCrop() { document.getElementById('njpro_crop_overlay').style.display = 'none'; }

function njpro_setMode(mode) {
    njpro_mode = mode;
    document.getElementById('njpro_btn_v').classList.toggle('active', mode === 'v');
    document.getElementById('njpro_btn_h').classList.toggle('active', mode === 'h');
    njpro_drawJoined();
}

function njpro_updateBtns() {
    const isReady = (njpro_frontImg !== null && njpro_backImg !== null);
    const btnJpg = document.getElementById('njpro_dl_jpg');
    const btnPdf = document.getElementById('njpro_dl_pdf');
    if(isReady) {
        btnJpg.disabled = false; btnJpg.style.opacity = '1'; btnJpg.style.cursor = 'pointer';
        btnPdf.disabled = false; btnPdf.style.opacity = '1'; btnPdf.style.cursor = 'pointer';
    } else {
        btnJpg.disabled = true; btnJpg.style.opacity = '0.5'; btnJpg.style.cursor = 'not-allowed';
        btnPdf.disabled = true; btnPdf.style.opacity = '0.5'; btnPdf.style.cursor = 'not-allowed';
    }
}

function njpro_drawJoined() {
    njpro_updateBtns();
    if (!njpro_frontImg && !njpro_backImg) return;
    const canvas = document.getElementById('njpro_main_canvas');
    const ctx = canvas.getContext('2d');
    const hasBorder = document.getElementById('njpro_border_chk').checked;
    document.getElementById('njpro_placeholder').style.display = 'none';
    canvas.style.display = 'inline-block';
    if (njpro_frontImg && njpro_backImg) {
        document.getElementById('njpro_magic_controls').style.display = 'block';
    }
    const stdW = 990, stdH = 630, gap = 30;
    canvas.width = (njpro_mode === 'v') ? stdW + 60 : (stdW * 2) + gap + 60;
    canvas.height = (njpro_mode === 'v') ? (stdH * 2) + gap + 60 : stdH + 60;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    function draw(img, x, y) {
        ctx.drawImage(img, x, y, stdW, stdH);
        if(hasBorder) {
            ctx.strokeStyle = "#000"; ctx.lineWidth = 3; ctx.strokeRect(x, y, stdW, stdH);
        }
    }
    if (njpro_frontImg) draw(njpro_frontImg, 30, 30);
    if (njpro_backImg) {
        if (njpro_mode === 'v') draw(njpro_backImg, 30, stdH + gap + 30);
        else draw(njpro_backImg, stdW + gap + 30, 30);
    }
    if (njpro_frontImg && njpro_backImg) {
        njpro_joinedImg = new Image();
        njpro_joinedImg.src = canvas.toDataURL();
    }
}

function njpro_applyMagic() {
    if (!njpro_joinedImg) return;
    const canvas = document.getElementById('njpro_main_canvas');
    let src = cv.imread(njpro_joinedImg);
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGBA2RGB);
    let lab = new cv.Mat();
    cv.cvtColor(src, lab, cv.COLOR_RGB2Lab);
    let channels = new cv.MatVector();
    cv.split(lab, channels);
    let clahe = new cv.CLAHE(2.0, new cv.Size(8, 8));
    clahe.apply(channels.get(0), channels.get(0));
    cv.merge(channels, lab);
    cv.cvtColor(lab, dst, cv.COLOR_Lab2RGB);
    cv.imshow(canvas, dst);
    src.delete(); dst.delete(); lab.delete(); channels.delete(); clahe.delete();
    document.getElementById('njpro_range_sat').value = 110;
    document.getElementById('njpro_range_ct').value = 120;
    njpro_updateFilters();
}

function njpro_updateFilters() {
    const canvas = document.getElementById('njpro_main_canvas');
    const sat = document.getElementById('njpro_range_sat').value;
    const ct = document.getElementById('njpro_range_ct').value;
    document.getElementById('njpro_val_sat').innerText = sat + "%";
    document.getElementById('njpro_val_ct').innerText = ct + "%";
    canvas.style.filter = `saturate(${sat}%) contrast(${ct}%) brightness(105%)`;
}

function njpro_downloadPDF() {
    if (!njpro_frontImg || !njpro_backImg) { alert("Please crop both Front and Back sides first."); return; }
    const canvas = document.getElementById('njpro_main_canvas');
    if (canvas.style.display === 'none') return;
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tCtx = tempCanvas.getContext('2d');
    tCtx.filter = canvas.style.filter;
    tCtx.drawImage(canvas, 0, 0);
    const imgData = tempCanvas.toDataURL('image/jpeg', 1.0);
    const coreCardPx = 990; 
    const coreCardMm = 3.3 * 25.4; 
    const imgW = (canvas.width / coreCardPx) * coreCardMm;
    const imgH = (canvas.height / canvas.width) * imgW;
    const a4W = 210;
    const xPos = (a4W - imgW) / 2;
    pdf.addImage(imgData, 'JPEG', xPos, 5, imgW, imgH);
    pdf.save(`NID_Joined_A4_${Date.now()}.pdf`);
}

function njpro_downloadJPG() {
    if (!njpro_frontImg || !njpro_backImg) { alert("Please crop both Front and Back sides first."); return; }
    const canvas = document.getElementById('njpro_main_canvas');
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tCtx = tempCanvas.getContext('2d');
    tCtx.filter = canvas.style.filter;
    tCtx.drawImage(canvas, 0, 0);
    const link = document.createElement('a');
    link.download = `Joined_NID_${Date.now()}.jpg`;
    link.href = tempCanvas.toDataURL("image/jpeg", 0.95);
    link.click();
}

function njpro_resetAll() {
    njpro_frontImg = njpro_backImg = null;
    document.getElementById('njpro_front_in').value = "";
    document.getElementById('njpro_back_in').value = "";
    document.getElementById('njpro_txt_f_status').innerText = "Upload Front Side";
    document.getElementById('njpro_txt_b_status').innerText = "Upload Back Side";
    document.getElementById('njpro_main_canvas').style.display = 'none';
    document.getElementById('njpro_magic_controls').style.display = 'none';
    document.getElementById('njpro_placeholder').style.display = 'block';
    njpro_updateBtns();
}
