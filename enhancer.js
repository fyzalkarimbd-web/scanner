let enhancedImgData = null;

function openEnhancerModal() {
    document.getElementById('enhancerModal').style.display = 'flex';
    if (typeof setActiveMode === 'function') setActiveMode('mode-ai-enhancer');
    initEnhancerEvents();
}

function closeEnhancerModal() {
    document.getElementById('enhancerModal').style.display = 'none';
}

function initEnhancerEvents() {
    const input = document.getElementById('enhancer-input');
    input.onchange = function(e) {
        if (e.target.files[0]) processEnhance(e.target.files[0]);
    };

    const slider = document.getElementById('comparison-slider');
    const afterBox = document.getElementById('img-after-box');
    const sliderBtn = document.querySelector('.slider-button');
    const sliderBar = document.querySelector('.slider-bar');

    let isDragging = false;

    const startDragging = (e) => {
        isDragging = true;
        sliderBtn.style.cursor = 'grabbing';
        // সিলেকশন বন্ধ করার জন্য
        if (e.cancelable) e.preventDefault(); 
    };

    const stopDragging = () => {
        isDragging = false;
    };

    const moveSlider = (e) => {
        if (!isDragging) return; 

        // ড্র্যাগ করার সময় নীল সিলেকশন বা স্ক্রল হওয়া বন্ধ করবে
        if (e.cancelable) e.preventDefault();

        let rect = slider.getBoundingClientRect();
        let pageX = (e.touches) ? e.touches[0].pageX : e.pageX;
        let x = pageX - rect.left - window.pageXOffset;

        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        let percent = (x / rect.width) * 100;
        afterBox.style.width = percent + "%";
        sliderBtn.style.left = percent + "%";
        sliderBar.style.left = percent + "%";
    };

    // মাউস ইভেন্টস
    sliderBtn.addEventListener('mousedown', startDragging);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('mousemove', moveSlider);

    // টাচ ইভেন্টস (মোবাইলের জন্য)
    sliderBtn.addEventListener('touchstart', startDragging, {passive: false});
    window.addEventListener('touchend', stopDragging);
    window.addEventListener('touchmove', moveSlider, {passive: false});
}

/* --- High-Compatibility AI Enhancer Logic --- */
async function processEnhance(file) {
    const uploadBox = document.getElementById('enhancer-upload-box');
    const loader = document.getElementById('enhancer-loader');
    const resultView = document.getElementById('enhancer-result-view');
    
    uploadBox.style.display = 'none';
    loader.style.display = 'block';

    const reader = new FileReader();
    reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            document.getElementById('img-before').src = img.src;
            
            setTimeout(() => {
                let src, dst, final;
                try {
                    // ১. ইমেজ রিড করা
                    src = cv.imread(img);
                    
                    // ২. ইমেজ টাইপ চেক ও নর্মালাইজেশন (এরর এড়াতে এটি সবচেয়ে গুরুত্বপূর্ণ)
                    // যদি ছবিতে ট্রান্সপারেন্সি থাকে তবে তা সরিয়ে ৩-চ্যানেল RGB করা হচ্ছে
                    if (src.channels() === 4) {
                        cv.cvtColor(src, src, cv.COLOR_RGBA2RGB);
                    }
                    
                    dst = new cv.Mat();
                    
                    // ৩. কালার এনহ্যান্সমেন্ট (Brightness & Contrast)
                    // alpha: 1.1 (হালকা কন্ট্রাস্ট), beta: 8 (হালকা উজ্জ্বলতা)
                    src.convertTo(dst, -1, 1.1, 8);

                    // ৪. এডভান্সড শার্পেনিং (Sharpening Filter)
                    // এটি ঝাপসা ডিটেইলস ক্লিয়ার করবে
                    let kernel = cv.matFromArray(3, 3, cv.CV_32F, [
                        0, -1, 0,
                        -1, 5, -1,
                        0, -1, 0
                    ]);
                    cv.filter2D(dst, dst, -1, kernel);
                    kernel.delete();

                    // ৫. বিল্যাটারাল নয়েজ রিডাকশন (Bilateral Filter)
                    // এটি স্কিন বা পিক্সেল স্মুথ করবে কিন্তু লেখা/চোখ ঝাপসা করবে না
                    final = new cv.Mat();
                    try {
                        cv.bilateralFilter(dst, final, 5, 50, 50);
                    } catch(e) {
                        // যদি বিল্যাটারাল ফিল্টার ফেল করে তবে শার্পেন ইমেজটিই নিবে
                        final = dst.clone();
                    }

                    // ৬. আউটপুট ক্যানভাসে দেখানো
                    cv.imshow('temp-canvas', final);
                    const enhancedUrl = document.getElementById('temp-canvas').toDataURL('image/jpeg', 0.92);
                    
                    document.getElementById('img-after').src = enhancedUrl;
                    enhancedImgData = enhancedUrl;

                    loader.style.display = 'none';
                    resultView.style.display = 'block';
                    
                    // মেমোরি ক্লিয়ার (Browser Hang হওয়া রোধ করবে)
                    src.delete(); dst.delete(); final.delete();

                } catch (err) {
                    console.error("OpenCV processing skipped to prevent crash.");
                    // যদি OpenCV সম্পূর্ণ ফেল করে, তবে অরিজিনাল ইমেজটিই আফটার বক্সে দেখাবে
                    document.getElementById('img-after').src = img.src;
                    enhancedImgData = img.src;
                    loader.style.display = 'none';
                    resultView.style.display = 'block';
                    if(src) src.delete(); if(dst) dst.delete();
                }
            }, 300);
        };
    };
    reader.readAsDataURL(file);
}

function downloadEnhancedImage() {
    if (!enhancedImgData) return;
    const link = document.createElement('a');
    link.href = enhancedImgData;
    link.download = 'Enhanced_by_IDScannerPro.jpg';
    link.click();
    if (typeof triggerAlert === 'function') triggerAlert("Success: Photo saved successfully!");
}

function resetEnhancer() {
    document.getElementById('enhancer-upload-box').style.display = 'block';
    document.getElementById('enhancer-result-view').style.display = 'none';
    document.getElementById('enhancer-input').value = "";
    document.getElementById('preview-img-container').style.display = 'none';
}
