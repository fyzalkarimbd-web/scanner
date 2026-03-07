let jState = {
    L: { img: null, zoom: 1, rot: 0, straighten: 0, flip: 1, x: 0, y: 0, br: 100, ct: 100, st: 100 },
    R: { img: null, zoom: 1, rot: 0, straighten: 0, flip: 1, x: 0, y: 0, br: 100, ct: 100, st: 100 }
}, jCanvas, jCtx, jActiveSide = null, isJDragging = !1, jStartX, jStartY, jLastMoveTime = 0, hasMovedJ = !1, jInputLock = 0;

// MediaPipe Variable
let jSelfieSegmentation = null;
let jGlobalBG = "#ffffff", jBorderWidth = 0;

async function openJointProModal() {
    if (typeof setActiveMode === "function") setActiveMode("mode-joint-pro");
    document.getElementById("jointProModal").style.display = "flex";
    document.body.style.overflow = "hidden";
    jCanvas = document.getElementById("jointProCanvas");
    jCtx = jCanvas.getContext("2d");
    jCanvas.width = 570;
    jCanvas.height = 450;
    
    // AI ইঞ্জিন আগে থেকে রেডি করা
    initJointAI();
    
    setupJEvents();
    renderJPro();
}

// ১. এআই ইঞ্জিন ইনিশিয়ালাইজ করা (ফ্রি ও আনলিমিটেড)
function initJointAI() {
    if (!jSelfieSegmentation && typeof SelfieSegmentation !== "undefined") {
        jSelfieSegmentation = new SelfieSegmentation({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
        });
        jSelfieSegmentation.setOptions({ modelSelection: 1 });
    }
}

function closeJointProModal() {
    document.getElementById("jointProModal").style.display = "none";
    document.body.style.overflow = "auto";
}

function handleJCanvasClick(t) {
    let e = Date.now();
    if (e - jInputLock < 500 || hasMovedJ || isJDragging || e - jLastMoveTime < 300) return;
    let a = jCanvas.getBoundingClientRect(),
        n = t.changedTouches ? t.changedTouches[0].clientX : t.clientX,
        o = (n - a.left) * (jCanvas.width / a.width),
        i = o < jCanvas.width / 2 ? "L" : "R";
    if (null === jState[i].img) {
        jInputLock = e;
        document.getElementById("jInput" + i).click();
    }
}

function renderJPro() {
    if (!jCtx) return;
    jCtx.fillStyle = jGlobalBG;
    jCtx.fillRect(0, 0, jCanvas.width, jCanvas.height);
    drawJSide("L", 0, 285);
    drawJSide("R", 285, 285);
    if (jBorderWidth > 0) {
        jCtx.strokeStyle = "#000000";
        jCtx.lineWidth = 2 * jBorderWidth;
        jCtx.strokeRect(0, 0, jCanvas.width, jCanvas.height);
    }
}

function drawJSide(t, e, a) {
    let n = jState[t];
    if (n.img) {
        jCtx.save();
        jCtx.beginPath();
        jCtx.rect(e, 0, a, jCanvas.height);
        jCtx.clip();
        jCtx.translate(e + a / 2 + n.x, jCanvas.height / 2 + n.y);
        jCtx.rotate((n.rot + n.straighten) * Math.PI / 180);
        jCtx.scale(n.zoom * n.flip, n.zoom);
        jCtx.filter = `brightness(${n.br}%) contrast(${n.ct}%) saturate(${n.st}%)`;
        jCtx.drawImage(n.img, -n.img.width / 2, -n.img.height / 2);
        jCtx.restore();
    }
}

function rotateJoint(t) { jState[t].rot = (jState[t].rot + 90) % 360; renderJPro(); }
function flipJoint(t) { jState[t].flip *= -1; renderJPro(); }

function setupJEvents() {
    let getCoord = t => {
        let e = jCanvas.getBoundingClientRect(),
            a = t.touches && t.touches[0] ? t.touches[0].clientX : t.clientX,
            n = t.touches && t.touches[0] ? t.touches[0].clientY : t.clientY;
        return { x: (a - e.left) * (jCanvas.width / e.width), rawX: a, rawY: n };
    };

    let onStart = e => {
        if ("INPUT" === e.target.tagName || "range" === e.target.type) { isJDragging = !1; return; }
        let a = getCoord(e);
        jActiveSide = a.x < jCanvas.width / 2 ? "L" : "R";
        hasMovedJ = !1;
        if (e.target === jCanvas && jState[jActiveSide].img) {
            isJDragging = !0; jStartX = a.rawX; jStartY = a.rawY;
        }
    };

    let onMove = e => {
        if (!isJDragging) return;
        let a = getCoord(e);
        if (Math.abs(a.rawX - jStartX) > 5 || Math.abs(a.rawY - jStartY) > 5) {
            hasMovedJ = !0; jLastMoveTime = Date.now();
            jState[jActiveSide].x += a.rawX - jStartX;
            jState[jActiveSide].y += a.rawY - jStartY;
            jStartX = a.rawX; jStartY = a.rawY;
            renderJPro();
        }
        if (e.cancelable) e.preventDefault();
    };

    let onEnd = t => {
        if (isJDragging) isJDragging = !1;
        else if (t.target === jCanvas) handleJCanvasClick(t);
        setTimeout(() => { hasMovedJ = !1; }, 150);
    };

    jCanvas.onmousedown = onStart;
    jCanvas.addEventListener("touchstart", onStart, { passive: !1 });
    window.addEventListener("mousemove", onMove, { passive: !1 });
    window.addEventListener("touchmove", onMove, { passive: !1 });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    ["Br", "Ct", "St", "Straighten", "Zoom"].forEach(t => {
        let e = "Straighten" === t ? "straighten" : t.toLowerCase();
        ["L", "R"].forEach(side => {
            let el = document.getElementById("j" + t + side);
            if (el) {
                el.oninput = n => {
                    let val = "Zoom" === t ? parseFloat(n.target.value) : parseInt(n.target.value);
                    jState[side][e] = val;
                    document.getElementById("v-j" + t + side).innerText = val + ("Straighten" === t ? "°" : "Zoom" === t ? "x" : "%");
                    renderJPro();
                };
            }
        });
    });

    document.getElementById("jBorder").oninput = t => {
        jBorderWidth = parseInt(t.target.value);
        document.getElementById("v-jBorder").innerText = jBorderWidth + "px";
        renderJPro();
    };

    document.getElementById("jInputL").onchange = t => loadJImg(t.target.files[0], "L");
    document.getElementById("jInputR").onchange = t => loadJImg(t.target.files[0], "R");
}

function loadJImg(file, side) {
    if (!file) return;
    let reader = new FileReader();
    reader.onload = e => {
        let img = new Image();
        img.onload = () => {
            jState[side].img = img; jState[side].x = 0; jState[side].y = 0;
            document.getElementById("jHint" + side).style.display = "none";
            renderJPro();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// ২. সংশোধিত ব্যাকগ্রাউন্ড রিমুভাল ফাংশন (MediaPipe Local AI)
async function removeJointBg(side) {
    if (!jState[side].img) {
        alert("Please add photo first!");
        return;
    }

    let btn = document.getElementById("jAiBtn" + side), 
        oldText = btn.innerHTML;

    btn.disabled = true; 
    btn.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> AI Processing...";

    if (!jSelfieSegmentation) initJointAI();

    const imgElement = jState[side].img;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    // প্রসেসিং স্পিডের জন্য ছবি বেশি বড় হলে রিসাইজ করা (Max 1080px)
    const maxDim = 1080;
    let w = imgElement.width;
    let h = imgElement.height;
    if(w > h && w > maxDim){ h *= maxDim/w; w = maxDim; }
    else if(h > maxDim){ w *= maxDim/h; h = maxDim; }
    
    tempCanvas.width = w;
    tempCanvas.height = h;

    jSelfieSegmentation.onResults((results) => {
        tempCtx.save();
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(results.segmentationMask, 0, 0, tempCanvas.width, tempCanvas.height);

        tempCtx.globalCompositeOperation = 'source-in';
        tempCtx.drawImage(results.image, 0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.restore();

        const resultImg = new Image();
        resultImg.onload = () => {
            jState[side].img = resultImg;
            renderJPro();
            btn.disabled = false;
            btn.innerHTML = oldText;
        };
        resultImg.src = tempCanvas.toDataURL("image/png");
    });

    await jSelfieSegmentation.send({ image: imgElement });
}

function downloadJointPro(t) {
    if (!jState.L.img || !jState.R.img) {
        alert("Please add both photos first!");
        return;
    }

    let rows = parseInt(document.getElementById("jRows").value) || 1,
        cols = parseInt(document.getElementById("jCols").value) || 1,
        n = jCanvas.toDataURL("image/jpeg", 0.95);

    if ("jpg" === t) {
        let link = document.createElement("a");
        link.download = "Joint_Photo.jpg";
        link.href = n;
        link.click();
    } else {
        let { jsPDF: i } = window.jspdf,
            pdf = new i("p", "mm", "a4");

        const imgW = 48.26; 
        const imgH = 38.1;  
        const startX = 2;   
        const startY = 3;   
        const gapX = 3;   
        const gapY = 3; 

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                let x = startX + (imgW + gapX) * c;
                let y = startY + (imgH + gapY) * r;
                if (x + imgW <= 208 && y + imgH <= 290) { 
                    pdf.addImage(n, "JPEG", x, y, imgW, imgH);
                }
            }
        }

        if ("print" === t) {
            pdf.autoPrint();
            const blobUrl = pdf.output('bloburl');
            window.open(blobUrl, '_blank');
        } else {
            pdf.save("Joint_Photo_A4.pdf");
        }
    }
}

window.adjustJLayout = function(id, val) {
    let el = document.getElementById(id), 
        n = parseInt(el.value) || 1;
    n += val;
    if (id === "jRows") n = Math.max(1, Math.min(7, n));
    else if (id === "jCols") n = Math.max(1, Math.min(4, n));
    el.value = n;
};

window.setGlobalJBG = function(color) { jGlobalBG = color; renderJPro(); };

function deleteJointImage(t) {
    if (!jState[t].img) {
        alert("No image to delete!");
        return;
    }
    jState[t] = { img: null, zoom: 1, rot: 0, straighten: 0, flip: 1, x: 0, y: 0, br: 100, ct: 100, st: 100 };
    ["Br", "Ct", "St", "Straighten", "Zoom"].forEach(ctrl => {
        let inputEl = document.getElementById("j" + ctrl + t);
        let labelEl = document.getElementById("v-j" + ctrl + t);
        if (inputEl) inputEl.value = (ctrl === "Zoom" ? 1 : ctrl === "Straighten" ? 0 : 100);
        if (labelEl) labelEl.innerText = (ctrl === "Zoom" ? "1.00x" : ctrl === "Straighten" ? "0°" : "100%");
    });
    document.getElementById("jInput" + t).value = "";
    document.getElementById("jHint" + t).style.display = "flex";
    renderJPro();
}
