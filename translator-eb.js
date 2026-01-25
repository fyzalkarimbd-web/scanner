let translationMode = 'en-bn';

function openTranslatorModal() {
    setActiveMode('mode-translator');
    document.getElementById('translatorModal').style.display = 'flex';
}

// ক্লোজ করলে সম্পূর্ণ রিসেট হবে
function closeTranslatorModal() {
    document.getElementById('translatorModal').style.display = 'none';
    resetTranslator(); // রিসেট ফাংশন কল
}

// রিসেট ফাংশন
function resetTranslator() {
    translationMode = 'en-bn';
    document.getElementById('transInput').value = '';
    document.getElementById('transOutput').innerText = 'অনুবাদ এখানে দেখা যাবে...';
    document.getElementById('transInput').placeholder = 'Type English here...';
    
    // মোড লেবেল রিসেট
    const sourceLbl = document.getElementById('label-source');
    const targetLbl = document.getElementById('label-target');
    sourceLbl.innerText = 'ENGLISH';
    sourceLbl.style.color = '#4f46e5';
    targetLbl.innerText = 'BENGALI';
    targetLbl.style.color = '#059669';
    
    // বাটন রিসেট
    document.getElementById('copy-btn-text').innerText = 'Copy';
    document.getElementById('btn-swap').style.transform = 'rotate(0deg)';
}

function swapTranslationMode() {
    const sourceLbl = document.getElementById('label-source');
    const targetLbl = document.getElementById('label-target');
    const inputArea = document.getElementById('transInput');
    const outputArea = document.getElementById('transOutput');
    const swapBtn = document.getElementById('btn-swap');

    swapBtn.style.transform = swapBtn.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';

    if (translationMode === 'en-bn') {
        translationMode = 'bn-en';
        sourceLbl.innerText = 'BENGALI';
        sourceLbl.style.color = '#059669';
        targetLbl.innerText = 'ENGLISH';
        targetLbl.style.color = '#4f46e5';
        inputArea.placeholder = 'এখানে বাংলা লিখুন...';
        outputArea.innerText = 'Translation will appear here...';
    } else {
        translationMode = 'en-bn';
        sourceLbl.innerText = 'ENGLISH';
        sourceLbl.style.color = '#4f46e5';
        targetLbl.innerText = 'BENGALI';
        targetLbl.style.color = '#059669';
        inputArea.placeholder = 'Type English here...';
        outputArea.innerText = 'অনুবাদ এখানে দেখা যাবে...';
    }
    inputArea.value = '';
}

async function processTranslation() {
    const text = document.getElementById('transInput').value.trim();
    const outputDiv = document.getElementById('transOutput');
    const btn = document.getElementById('btnTranslate');

    if (!text) return;

    let sl = 'en', tl = 'bn';
    if (translationMode === 'bn-en') {
        sl = 'bn'; tl = 'en';
    }

    try {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        outputDiv.innerHTML = translationMode === 'en-bn' ? "অনুবাদ করা হচ্ছে..." : "Translating...";

        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();

        let translatedText = "";
        data[0].forEach(item => {
            if (item[0]) translatedText += item[0];
        });

        outputDiv.innerText = translatedText;
    } catch (error) {
        outputDiv.innerHTML = "<span style='color:red;'>Error! Check internet.</span>";
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-bolt"></i> Translate Now';
    }
}

// কপি ফাংশন (অ্যালার্ট ছাড়া টেক্সট চেঞ্জ)
function copyTranslation() {
    const text = document.getElementById('transOutput').innerText;
    const btnText = document.getElementById('copy-btn-text');
    const placeholder = translationMode === 'en-bn' ? "অনুবাদ এখানে দেখা যাবে..." : "Translation will appear here...";

    if (text && text !== placeholder && !text.includes("Processing")) {
        navigator.clipboard.writeText(text).then(() => {
            btnText.innerText = "Copied!"; // টেক্সট পরিবর্তন
            
            // ২ সেকেন্ড পর আবার আগের লেখা ফিরিয়ে আনা
            setTimeout(() => {
                btnText.innerText = "Copy";
            }, 2000);
        });
    }
}
