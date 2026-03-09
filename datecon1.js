(function() {
    let currentUI_Lang = 'bn';

    // ১. মোডাল কন্ট্রোল ফাংশন
    window.showDateConverter = function() {
        try { if (typeof setActiveMode === 'function') setActiveMode('mode-date-converter'); } catch(e) {}
        const modal = document.getElementById("dateConverterModal");
        const dateInput = document.getElementById('eng-date-input');
        
        if (modal) {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";

            // বর্তমান তারিখ (Today's Date) সিলেক্ট করার লজিক
            if (dateInput && !dateInput.value) {
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const dd = String(today.getDate()).padStart(2, '0');
                dateInput.value = `${yyyy}-${mm}-${dd}`;
            }

            switchDateLang('bn');
        }
    };

    window.hideDateConverter = function() {
        const modal = document.getElementById("dateConverterModal");
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    // ২. ভাষা পরিবর্তন
    window.switchDateLang = function(lang) {
        currentUI_Lang = lang;
        document.getElementById('dc-btn-bn').classList.toggle('active', lang === 'bn');
        document.getElementById('dc-btn-en').classList.toggle('active', lang === 'en');

        const labels = {
            bn: { title: "তারিখ কনভার্টার (অ্যাডভান্সড)", input: "ইংরেজি তারিখ নির্বাচন করুন:", en: "ইংরেজি তারিখ:", bn: "বাংলা তারিখ (বঙ্গাব্দ):", ar: "আরবি তারিখ (হিজরি):" },
            en: { title: "Advanced Date Converter", input: "Select English Date:", en: "English Date:", bn: "Bangla Date (Bengali):", ar: "Arabic Date (Hijri):" }
        };

        const t = labels[lang];
        document.getElementById('dc-ui-title').innerText = t.title;
        document.getElementById('dc-lbl-input').innerText = t.input;
        document.getElementById('dc-res-en-title').innerText = t.en;
        document.getElementById('dc-res-bn-title').innerText = t.bn;
        document.getElementById('dc-res-ar-title').innerText = t.ar;

        if (document.getElementById('eng-date-input').value) processAllDateConversions();
    };

    // ৩. মূল লজিক (৭ মার্চ = ১৭ রমজান = ২২ ফাল্গুন)
    window.processAllDateConversions = function() {
        const input = document.getElementById('eng-date-input').value;
        if (!input) return;

        const date = new Date(input);
        document.getElementById('dc-results').style.display = 'block';

        const bnNums = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
        const toBn = (n) => n.toString().split('').map(d => bnNums[d] || d).join('');

        // --- English ---
        const enVal = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        document.getElementById('res-en-num').innerText = enVal;

        // --- Arabic (Fixed Offset for 17 Ramadan) ---
        const arMonthsBn = ["মহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শাওয়াল", "জিলকদ", "জিলহজ"];
        const arMonthsEn = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"];
        
        const arDate = new Date(date.getTime() + (-1 * 24 * 60 * 60 * 1000)); // -1 day offset
        const arFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {day:'numeric', month:'numeric', year:'numeric'});
        const arParts = arFormatter.formatToParts(arDate);
        const hd = parseInt(arParts.find(p => p.type === 'day').value);
        const hm = parseInt(arParts.find(p => p.type === 'month').value);
        const hy = arParts.find(p => p.type === 'year').value;

        if (currentUI_Lang === 'bn') {
            document.getElementById('res-ar-num').innerText = toBn(hd) + "ই " + arMonthsBn[hm - 1] + " " + toBn(hy) + " হিজরি";
        } else {
            document.getElementById('res-ar-num').innerText = hd + " " + arMonthsEn[hm - 1] + " " + hy + " Hijri";
        }

        // --- Bangla (Government Revised Logic) ---
        const bnMonths = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
        const enBnMonths = ["Boishakh", "Jyaistha", "Asharh", "Srabon", "Bhadra", "Ashwin", "Kartika", "Agrahayana", "Pousha", "Magha", "Falgun", "Chaitra"];
        
        const bnDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 29, 30]; 
        let gy = date.getFullYear();
        if ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) bnDays[10] = 30;

        let bYear = gy - 593;
        let bishakh1 = new Date(gy, 3, 14);
        if (date < bishakh1) {
            bYear--;
            bishakh1 = new Date(gy - 1, 3, 14);
            let py = gy - 1;
            if ((py % 4 === 0 && py % 100 !== 0) || (py % 400 === 0)) bnDays[10] = 30; else bnDays[10] = 29;
        }

        let diff = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(bishakh1.getFullYear(), bishakh1.getMonth(), bishakh1.getDate())) / 86400000);
        let mi = 0;
        while (diff >= bnDays[mi]) { diff -= bnDays[mi]; mi++; }
        let bd = diff + 1;

        if (currentUI_Lang === 'bn') {
            document.getElementById('res-bn-num').innerText = toBn(bd) + "ই " + bnMonths[mi] + " " + toBn(bYear) + " বঙ্গাব্দ";
        } else {
            document.getElementById('res-bn-num').innerText = bd + " " + enBnMonths[mi] + " " + bYear + " Bangabda";
        }
    };

    window.resetDatePro = function() {
        document.getElementById('eng-date-input').value = '';
        document.getElementById('dc-results').style.display = 'none';
    };

    // --- আপডেট করা কপি লজিক ---
    window.copyDateResult = function(btn) {
        const en = document.getElementById('res-en-num').innerText;
        const bn = document.getElementById('res-bn-num').innerText;
        const ar = document.getElementById('res-ar-num').innerText;
        
        const textToCopy = (currentUI_Lang === 'bn') ? 
            `ইংরেজি: ${en}\nবাংলা: ${bn}\nআরবি: ${ar}` : 
            `English: ${en}\nBangla: ${bn}\nArabic: ${ar}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = btn.innerText;
            const originalBg = btn.style.background;
            
            btn.innerText = (currentUI_Lang === 'bn' ? "কপি হয়েছে!" : "Copied!");
            btn.style.background = "#10b981";

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = originalBg;
            }, 2000);
        }).catch(err => {
            console.error('Copy failed: ', err);
        });
    };

})();
