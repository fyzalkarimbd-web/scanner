let costLang = "en";

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
function toBengaliNumber(n) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return n.toString().replace(/\d/g, digit => bengaliDigits[digit]);
}

function openCostCalcModal() {
    // আগের ফাংশনটির মতোই
    if(typeof setActiveMode === "function") setActiveMode('mode-cost-calc');
    document.getElementById('costCalcModal').style.display = 'flex';
    calculatePrintingCost();
}

function closeCostCalcModal() {
    document.getElementById('costCalcModal').style.display = 'none';
}

function setCostLang(lang) {
    costLang = lang;
    document.getElementById('cost-en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('cost-bn-btn').classList.toggle('active', lang === 'bn');

    const strings = {
        en: {
            title: "Photocopy & Print Cost Calculator",
            paper: "Paper Rim Price (BDT)",
            ink: "Ink/Toner Price",
            yield: "Page Yield (Approx)",
            elec: "Electricity/Bill (Per Page)",
            sell: "Selling Price (Per Page)",
            costPer: "Cost Per Page:",
            profitPer: "Profit Per Page:",
            unit: "BDT",
            tip: "Tip: Generally, one Rim has 500 sheets. Calculation is based on single-side print."
        },
        bn: {
            title: "ফটোকপি ও প্রিন্টিং খরচ ক্যালকুলেটর",
            paper: "কাগজের রিমের দাম (টাকা)",
            ink: "কালি বা টোনারের দাম",
            yield: "মোট প্রিন্ট সংখ্যা (আনুমানিক)",
            elec: "বিদ্যুৎ ও অন্যান্য (প্রতি পেইজ)",
            sell: "বিক্রয় মূল্য (প্রতি পেইজ)",
            costPer: "প্রতি পেইজ খরচ:",
            profitPer: "প্রতি পেইজ লাভ:",
            unit: "টাকা",
            tip: "টিপস: সাধারণত ১ রিমে ৫০০ টি কাগজ থাকে। হিসাবটি এক পাশের প্রিন্টের জন্য।"
        }
    };

    document.getElementById('cost-title').innerText = strings[lang].title;
    document.getElementById('lbl-paper-price').innerText = strings[lang].paper;
    document.getElementById('lbl-ink-price').innerText = strings[lang].ink;
    document.getElementById('lbl-ink-yield').innerText = strings[lang].yield;
    document.getElementById('lbl-electricity').innerText = strings[lang].elec;
    document.getElementById('lbl-sell-price').innerText = strings[lang].sell;
    document.getElementById('txt-cost-per-page').innerText = strings[lang].costPer;
    document.getElementById('txt-profit-per-page').innerText = strings[lang].profitPer;
    document.getElementById('cost-tip').innerText = strings[lang].tip;
    
    // কারেন্সি সিম্বল বা ইউনিট আপডেট
    document.getElementById('unit-cost').innerText = strings[lang].unit;
    document.getElementById('unit-profit').innerText = strings[lang].unit;

    calculatePrintingCost(); // ভাষা পরিবর্তনের সাথে সাথে সংখ্যা আপডেট হবে
}

function calculatePrintingCost() {
    const paperPrice = parseFloat(document.getElementById('paper-price').value) || 0;
    const inkPrice = parseFloat(document.getElementById('ink-price').value) || 0;
    const inkYield = parseFloat(document.getElementById('ink-yield').value) || 1;
    const elecCost = parseFloat(document.getElementById('elec-cost').value) || 0;
    const sellPrice = parseFloat(document.getElementById('sell-price').value) || 0;

    const paperCostPerPage = paperPrice / 500;
    const inkCostPerPage = inkPrice / inkYield;
    const totalCost = paperCostPerPage + inkCostPerPage + elecCost;
    const netProfit = sellPrice - totalCost;

    let finalCost = totalCost.toFixed(2);
    let finalProfit = netProfit.toFixed(2);

    // যদি ভাষা বাংলা হয়, তবে সংখ্যা পরিবর্তন করো
    if (costLang === 'bn') {
        finalCost = toBengaliNumber(finalCost);
        finalProfit = toBengaliNumber(finalProfit);
    }

    document.getElementById('res-total-cost').innerText = finalCost;
    document.getElementById('res-net-profit').innerText = finalProfit;
}
