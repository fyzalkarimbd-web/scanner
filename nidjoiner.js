let nidFrontImg = null;
let nidBackImg = null;
let joinedOriginalImg = null; 
let joinMode = "h"; // Default Horizontal
let currentSide = "";
let phPoints = [{x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}];
let rawImgMat = null;
let phScale = 1;
let currentCropImg = null;

function openNidJoinerModal() {
    document.getElementById('nidJoinerModal').style.display = 'flex';
    if(typeof setActiveMode === 'function') setActiveMode('mode-nid-joiner');
}

function closeNidJoinerModal() { 
    document.getElementById('nidJoinerModal').style.display = 'none'; 
    cancelNidCrop();
}

function drawCropLines() {
    const canvas = document.getElementById('selection-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentCropImg, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#f43f5e";
    ctx.moveTo(phPoints[0].x, phPoints[0].y);
    ctx.lineTo(phPoints[1].x, phPoints[1].y);
    ctx.lineTo(phPoints[2].x, phPoints[2].y);
    ctx.lineTo(phPoints[3].x, phPoints[3].y);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
    ctx.fill();
}

function loadNidPart(input, side) {
    if (input.files && input.files[0]) {
        currentSide = side;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                currentCropImg = img;
                const overlay = document.getElementById('nid-crop-overlay');
                const canvas = document.getElementById('selection-canvas');
                overlay.style.display = 'flex';
                
                // Canvas limits for mobile friendliness
                const limitW = 750; 
                const limitH = 500; 
                const viewW = Math.min(window.innerWidth * 0.92, limitW);
                const viewH = Math.min(window.innerHeight * 0.7, limitH);
                
                phScale = Math.min(viewW / img.width, viewH / img.height);
                canvas.width = img.width * phScale;
                canvas.height = img.height * phScale;
                
                const pad = 20; 
                phPoints = [
                    {id: 'pt0', x: pad, y: pad},
                    {id: 'pt1', x: canvas.width - pad, y: pad},
                    {id: 'pt2', x: canvas.width - pad, y: canvas.height - pad},
                    {id: 'pt3', x: pad, y: canvas.height - pad}
                ];
                phPoints.forEach(p => {
                    const el = document.getElementById(p.id);
                    el.style.left = p.x + 'px'; el.style.top = p.y + 'px';
                    initDraggable(el, p);
                });
                if(rawImgMat) rawImgMat.delete();
                rawImgMat = cv.imread(img);
                drawCropLines();
            };
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// --- Zoom Glass Update Function (STRICT BOUNDARY CLAMPING) ---
function updateZoomGlass(x, y, clientX, clientY) {
    const glass = document.getElementById('zoom-glass');
    const zCanvas = document.getElementById('zoom-canvas');
    const zCtx = zCanvas.getContext('2d');
    
    // Use canvas as the STRICT boundary
    const boundaryEl = document.getElementById('selection-canvas');
    const boundaryRect = boundaryEl.getBoundingClientRect();
    
    // Zoom Logic
    const zoomFactor = 2.5; 
    
    // Get current glass size
    const glassRect = glass.getBoundingClientRect();
    const glassW = glassRect.width;
    const glassH = glassRect.height;
    
    // Draw Zoom Content
    const srcX = x / phScale;
    const srcY = y / phScale;
    const srcW = zCanvas.width / zoomFactor;
    const srcH = zCanvas.height / zoomFactor;
    
    zCtx.clearRect(0,0, zCanvas.width, zCanvas.height);
    zCtx.drawImage(currentCropImg, 
        srcX - srcW/2, srcY - srcH/2, srcW, srcH, 
        0, 0, zCanvas.width, zCanvas.height
    );
    
    // --- Step 1: Intelligent Positioning (Smart Flip) ---
    // Default position: Top-Right relative to cursor
    let posLeft = clientX + 30;
    let posTop = clientY - 30 - glassH;

    // Smart Flip Horizontal: If cursor is on the right half of canvas, put glass on left
    if (clientX > boundaryRect.left + (boundaryRect.width / 2)) {
        posLeft = clientX - 30 - glassW;
    }

    // Smart Flip Vertical: If cursor is near top of canvas, put glass below cursor
    if (clientY < boundaryRect.top + glassH + 20) {
         posTop = clientY + 40;
    }

    // --- Step 2: STRICT Clamping (The Solution) ---
    // This forces the glass to stay inside the canvas boundary no matter what
    
    // Force Left to be at least the canvas left edge
    if (posLeft < boundaryRect.left) {
        posLeft = boundaryRect.left;
    }
    // Force Right to not exceed canvas right edge
    if (posLeft + glassW > boundaryRect.right) {
        posLeft = boundaryRect.right - glassW;
    }
    
    // Force Top to be at least canvas top edge
    if (posTop < boundaryRect.top) {
        posTop = boundaryRect.top;
    }
    // Force Bottom to not exceed canvas bottom edge
    if (posTop + glassH > boundaryRect.bottom) {
        posTop = boundaryRect.bottom - glassH;
    }

    // Apply strict positions
    glass.style.left = posLeft + 'px';
    glass.style.top = posTop + 'px';
}

function initDraggable(el, pObj) {
    const glass = document.getElementById('zoom-glass');
    
    const move = (e) => {
        const rect = document.getElementById('selection-canvas').getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        
        pObj.x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        pObj.y = Math.max(0, Math.min(clientY - rect.top, rect.height));
        el.style.left = pObj.x + 'px'; el.style.top = pObj.y + 'px';
        
        drawCropLines();
        updateZoomGlass(pObj.x, pObj.y, clientX, clientY);
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
        updateZoomGlass(pObj.x, pObj.y, clientX, clientY);
    };

    el.onmousedown = start;
    el.ontouchstart = start;
}

function applyPerspectiveCrop() {
    try {
        let dst = new cv.Mat();
        let coords = [];
        phPoints.forEach(p => {
            coords.push(p.x / phScale);
            coords.push(p.y / phScale);
        });
        
        const stdW = 990, stdH = 630;
        
        let srcCoords = cv.matFromArray(4, 1, cv.CV_32FC2, coords);
        let dstCoords = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, stdW, 0, stdW, stdH, 0, stdH]);
        let M = cv.getPerspectiveTransform(srcCoords, dstCoords);
        cv.warpPerspective(rawImgMat, dst, M, new cv.Size(stdW, stdH));
        const tempCan = document.createElement('canvas');
        cv.imshow(tempCan, dst);
        const resImg = new Image();
        resImg.src = tempCan.toDataURL('image/jpeg', 0.95);
        resImg.onload = () => {
            if (currentSide === 'front') {
                nidFrontImg = resImg;
                document.getElementById('txt-f-status').innerText = "Front Cropped ✅";
            } else {
                nidBackImg = resImg;
                document.getElementById('txt-b-status').innerText = "Back Cropped ✅";
            }
            cancelNidCrop();
            drawJoinedNid();
        };
        dst.delete(); M.delete(); srcCoords.delete(); dstCoords.delete();
    } catch (e) { alert("Please select all 4 corners correctly."); }
}

function cancelNidCrop() { document.getElementById('nid-crop-overlay').style.display = 'none'; }

function setJoinMode(mode) {
    joinMode = mode;
    document.getElementById('btn-join-v').classList.toggle('active', mode === 'v');
    document.getElementById('btn-join-h').classList.toggle('active', mode === 'h');
    drawJoinedNid();
}

function updateDownloadButtons() {
    const isReady = (nidFrontImg !== null && nidBackImg !== null);
    const btnJpg = document.getElementById('btn-dl-jpg');
    const btnPdf = document.getElementById('btn-dl-pdf');
    
    if(isReady) {
        btnJpg.disabled = false;
        btnJpg.style.opacity = '1';
        btnJpg.style.cursor = 'pointer';
        
        btnPdf.disabled = false;
        btnPdf.style.opacity = '1';
        btnPdf.style.cursor = 'pointer';
    } else {
        btnJpg.disabled = true;
        btnJpg.style.opacity = '0.5';
        btnJpg.style.cursor = 'not-allowed';
        
        btnPdf.disabled = true;
        btnPdf.style.opacity = '0.5';
        btnPdf.style.cursor = 'not-allowed';
    }
}

function drawJoinedNid() {
    updateDownloadButtons();

    if (!nidFrontImg && !nidBackImg) return;

    const canvas = document.getElementById('nid-join-canvas');
    const ctx = canvas.getContext('2d');
    const hasBorder = document.getElementById('join-border').checked;
    
    document.getElementById('join-placeholder').style.display = 'none';
    canvas.style.display = 'inline-block';
    
    if (nidFrontImg && nidBackImg) {
        document.getElementById('nid-magic-controls').style.display = 'block';
    }

    const stdW = 990, stdH = 630, gap = 30;
    
    canvas.width = (joinMode === 'v') ? stdW + 60 : (stdW * 2) + gap + 60;
    canvas.height = (joinMode === 'v') ? (stdH * 2) + gap + 60 : stdH + 60;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function draw(img, x, y) {
        ctx.drawImage(img, x, y, stdW, stdH);
        if(hasBorder) {
            ctx.strokeStyle = "#000"; ctx.lineWidth = 3;
            ctx.strokeRect(x, y, stdW, stdH);
        }
    }

    if (nidFrontImg) {
        draw(nidFrontImg, 30, 30);
    }
    
    if (nidBackImg) {
        if (joinMode === 'v') {
            draw(nidBackImg, 30, stdH + gap + 30);
        } else {
            draw(nidBackImg, stdW + gap + 30, 30);
        }
    }

    if (nidFrontImg && nidBackImg) {
        joinedOriginalImg = new Image();
        joinedOriginalImg.src = canvas.toDataURL();
    }
}

function applyNidMagic() {
    if (!joinedOriginalImg) return;
    const canvas = document.getElementById('nid-join-canvas');
    let src = cv.imread(joinedOriginalImg);
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
    document.getElementById('nid-sat').value = 110;
    document.getElementById('nid-ct').value = 120;
    updateNidFilters();
}

function updateNidFilters() {
    const canvas = document.getElementById('nid-join-canvas');
    const sat = document.getElementById('nid-sat').value;
    const ct = document.getElementById('nid-ct').value;
    document.getElementById('v-nid-sat').innerText = sat + "%";
    document.getElementById('v-nid-ct').innerText = ct + "%";
    canvas.style.filter = `saturate(${sat}%) contrast(${ct}%) brightness(105%)`;
}

function downloadNidA4PDF() {
    if (!nidFrontImg || !nidBackImg) {
        alert("Please crop both Front and Back sides first.");
        return;
    }
    
    const canvas = document.getElementById('nid-join-canvas');
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

function downloadJoinedNid() {
    if (!nidFrontImg || !nidBackImg) {
        alert("Please crop both Front and Back sides first.");
        return;
    }

    const canvas = document.getElementById('nid-join-canvas');
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

function resetNidJoiner() {
    nidFrontImg = nidBackImg = null;
    document.getElementById('nid-front-in').value = "";
    document.getElementById('nid-back-in').value = "";
    document.getElementById('txt-f-status').innerText = "Upload Front Side";
    document.getElementById('txt-b-status').innerText = "Upload Back Side";
    document.getElementById('nid-join-canvas').style.display = 'none';
    document.getElementById('nid-magic-controls').style.display = 'none';
    document.getElementById('join-placeholder').style.display = 'block';
    
    updateDownloadButtons();
}
