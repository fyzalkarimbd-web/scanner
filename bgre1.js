let selfieSegmentation = null;

// ১. মোডাল ওপেন করার ফাংশন
async function openBgRemoverModal() {
    if (typeof setActiveMode === "function") setActiveMode("mode-bg-remover");
    var modal = document.getElementById("bgRemoverModal");
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
    // ইঞ্জিন আগে থেকে লোড করে রাখা
    if (!selfieSegmentation) {
        selfieSegmentation = new SelfieSegmentation({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`
        });
        selfieSegmentation.setOptions({ modelSelection: 1 }); 
    }
}

// ২. মোডাল ক্লোজ
function closeBgRemoverModal() {
    var modal = document.getElementById("bgRemoverModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
        document.getElementById("bgResultArea").style.display = "none";
        document.getElementById("bgInput").value = "";
    }
}

// ৩. মেইন প্রসেসিং (Fast & Free)
async function processBgRemoval() {
    let fileInput = document.getElementById("bgInput");
    let file = fileInput.files[0];
    let btn = document.getElementById("bgRemoveBtn");
    let loader = document.getElementById("bgLoader");
    let resultArea = document.getElementById("bgResultArea");
    let resultImg = document.getElementById("bgResultImage");
    let downloadBtn = document.getElementById("bgDownloadLink");

    if (!file) {
        alert("Please select an image!");
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing AI...';
    loader.style.display = "block";
    resultArea.style.display = "none";

    const inputImg = new Image();
    inputImg.src = URL.createObjectURL(file);

    inputImg.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        // ছবি অনেক বড় হলে প্রসেসিং স্পিড বাড়ানোর জন্য রিসাইজ করা
        const maxDim = 1080;
        let w = inputImg.width;
        let h = inputImg.height;
        if(w > h && w > maxDim){ h *= maxDim/w; w = maxDim; }
        else if(h > maxDim){ w *= maxDim/h; h = maxDim; }
        
        canvas.width = w;
        canvas.height = h;

        selfieSegmentation.onResults((results) => {
            ctx.save();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);

            // মাস্কিং লজিক
            ctx.globalCompositeOperation = 'source-in';
            ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
            ctx.restore();

            // রেজাল্ট দেখানো
            const finalData = canvas.toDataURL("image/png");
            resultImg.src = finalData;
            downloadBtn.href = finalData;
            
            resultArea.style.display = "block";
            loader.style.display = "none";
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Remove Background';
            resultArea.scrollIntoView({ behavior: "smooth" });
        });

        await selfieSegmentation.send({ image: inputImg });
    };
}

// ইনপুট চেঞ্জ হ্যান্ডলার
document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("bgInput");
    if (input) {
        input.addEventListener("change", function() {
            if (this.files && this.files[0]) {
                document.getElementById("bgFileName").innerText = this.files[0].name;
            }
        });
    }
});
