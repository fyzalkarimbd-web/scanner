let gdLang = "bn";

const gdTemplates = {
    bn: {
        mobile: { title: "মোবাইল ফোন হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আজ ইংরেজি {{time}} ঘটিকার সময় {{place}} হইতে আমার ব্যবহৃত মোবাইল ফোনটি অসাবধানতাবশত হারাইয়া গিয়াছে। ফোনটির বিবরণ: {{desc}}। অনেক খোঁজাখুঁজি করিয়াও ফোনটি পাওয়া যায় নাই। বিষয়টি আপনার থানায় সাধারণ ডায়েরিভুক্ত করার জন্য অনুরোধ জানাচ্ছি।" },
        nid: { title: "ভোটার আইডি (NID) কার্ড হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আজ ইংরেজি {{time}} ঘটিকার সময় {{place}} হইতে আমার মূল জাতীয় পরিচয়পত্র (NID Card) হারাইয়া গিয়াছে। কার্ডের বিবরণ: {{desc}}। আইনগত প্রয়োজনে বিষয়টি ডায়েরিভুক্ত করা একান্ত আবশ্যক। বিষয়টি থানায় সাধারণ ডায়েরিভুক্ত করার জন্য সবিনয় অনুরোধ করিতেছি।" },
        certificate: { title: "শিক্ষাগত সনদপত্র হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, অদ্য ইংরেজি {{time}} তারিখ {{place}} হইতে যাতায়াতের সময় আমার শিক্ষাগত যোগ্যতার মূল সনদপত্রটি হারাইয়া গিয়াছে। সার্টিফিকেটের বিবরণ: {{desc}}। বিষয়টি থানায় সাধারণ ডায়েরিভুক্ত করিয়া আমাকে বাধিত করিবেন।" },
        passport: { title: "পাসপোর্ট হারিয়ে যাওয়া", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, {{place}} হইতে যাতায়াতের পথে আমার আন্তর্জাতিক পাসপোর্টটি হারাইয়া গিয়াছে। পাসপোর্ট নম্বর: {{desc}}। উক্ত পাসপোর্টটি ভবিষ্যতে আইনগত সুরক্ষার জন্য আপনার থানায় সাধারণ ডায়েরিভুক্ত করা প্রয়োজন।" },
        license: { title: "ড্রাইভিং লাইসেন্স হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, ইংরেজি {{time}} ঘটিকায় {{place}} হইতে আমার মূল ড্রাইভিং লাইসেন্সটি হারাইয়া গিয়াছে। লাইসেন্স নম্বর: {{desc}}। বিষয়টি ডায়েরিভুক্ত করার আবেদন জানাচ্ছি।" },
        cheque: { title: "ব্যাংক চেক বই হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আমার নিম্নবর্ণিত ব্যাংক চেক বইটি হারাইয়া গিয়াছে। ব্যাংকের নাম ও অ্যাকাউন্ট নম্বর: {{desc}}। স্থান: {{place}}। উক্ত চেক বইটির অপব্যবহার রোধে বিষয়টি ডায়েরিভুক্ত করার অনুরোধ জানাচ্ছি।" },
        sim: { title: "সিম কার্ড হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আমার ব্যবহৃত সিম কার্ডটি {{place}} হইতে হারাইয়া গিয়াছে। সিম নম্বর: {{desc}}। সিমটি পুনরায় উত্তোলন করার লক্ষ্যে বিষয়টি থানায় ডায়েরিভুক্ত করার আবেদন জানাচ্ছি।" },
        money: { title: "নগদ টাকা ও মানিব্যাগ হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, {{place}} হইতে আমার ব্যবহৃত মানিব্যাগটি হারাইয়া গিয়াছে। ব্যাগের ভেতর নগদ ........... টাকা এবং {{desc}} ছিল। বিষয়টি আপনার থানায় ডায়েরিভুক্ত করার জন্য অনুরোধ করছি।" },
        deed: { title: "জমির দলিল হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, {{place}} হইতে যাতায়াতের সময় আমার নিম্নবর্ণিত জমির মূল দলিলটি হারাইয়া গিয়াছে। দলিলের বিবরণ: {{desc}}। বিষয়টি ডায়েরিভুক্ত করিয়া পরবর্তী ব্যবস্থা গ্রহণে বাধিত করিবেন।" },
        missing: { title: "ব্যক্তি নিখোঁজ সংবাদ", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আমার নিকটাত্মীয় {{name}} গত ইংরেজি {{time}} তারিখ হইতে {{place}} হইতে নিখোঁজ রহিয়াছেন। তাঁহার বিবরণ: {{desc}}। সম্ভাব্য সকল স্থানে সন্ধান করিয়াও তাঁহার খোঁজ পাওয়া যায় নাই। বিষয়টি ডায়েরিভুক্ত করার অনুরোধ জানাচ্ছি।" },
        threat: { title: "হুমকি সংক্রান্ত জিডি", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, গত ইংরেজি {{time}} তারিখ হইতে {{place}} এলাকায় কতিপয় অজ্ঞাত ব্যক্তি আমাকে প্রাণনাশের হুমকি প্রদান করিতেছে। বিবরণ: {{desc}}। বর্তমানে আমি নিরাপত্তাহীনতায় ভুগিতেছি। বিষয়টি ডায়েরিভুক্ত করিয়া আইনগত সুরক্ষা প্রদানের অনুরোধ জানাচ্ছি।" },
        land_issue: { title: "জমির সীমানা বিরোধ", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, আমার নিম্নবর্ণিত জমিতে বিবাদীগণ বেআইনিভাবে প্রবেশের চেষ্টা করিতেছে। জমির বিবরণ: {{desc}}। বিষয়টি শান্তি-শৃঙ্খলা বজায় রাখার স্বার্থে থানায় ডায়েরিভুক্ত করার আবেদন জানাচ্ছি।" },
        atm_card: { title: "এটিএম কার্ড হারানো", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, ইংরেজি {{time}} ঘটিকায় {{place}} হইতে আমার ডেবিট/ক্রেডিট কার্ডটি হারাইয়া গিয়াছে। কার্ডের বিবরণ: {{desc}}। বিষয়টি ডায়েরিভুক্ত করার অনুরোধ জানাচ্ছি।" },
        tenant: { title: "ভাড়াটিয়া তথ্য প্রদান", body: "আমি নিম্নস্বাক্ষরকারী অত্র বাড়ির মালিক। আমার বাড়িতে নতুন ভাড়াটিয়া নিয়োগ করা হইয়াছে। ভাড়াটিয়ার নাম ও এনআইডি নম্বর: {{desc}}। ঠিকানা: {{address}}। আইনগত নিয়ম পালনার্থে ভাড়াটিয়ার তথ্য আপনার থানায় ডায়েরিভুক্ত করার আবেদন জানাচ্ছি।" },
        general: { title: "সাধারণ হারানো সংবাদ", body: "আমি নিম্নস্বাক্ষরকারী এই মর্মে জানাচ্ছি যে, ইংরেজি {{time}} ঘটিকায় {{place}} হইতে আমার নিম্নবর্ণিত জিনিসটি হারাইয়া গিয়াছে। বিবরণ: {{desc}}। অনেক খোঁজাখুঁজি করিয়াও পাওয়া যায় নাই। বিষয়টি থানায় সাধারণ ডায়েরিভুক্ত করার অনুরোধ জানাচ্ছি।" }
    },
    en: {
        mobile: { title: "Loss of Mobile Phone", body: "I, the undersigned, would like to report that today at {{time}}, I lost my mobile phone at {{place}}. Mobile Details: {{desc}}. Despite a thorough search, I couldn't find it. I request you to record this in the General Diary (GD)." },
        nid: { title: "Loss of NID Card", body: "I, the undersigned, am reporting that my original National Identity (NID) Card was lost today at {{place}}. NID Details: {{desc}}. This GD is required for future legal procedures. I request you to record this matter." },
        certificate: { title: "Loss of Educational Certificate", body: "I, the undersigned, state that my original educational certificate was lost while traveling through {{place}} at {{time}}. Certificate Details: {{desc}}. Please record this in your station's General Diary." },
        passport: { title: "Loss of International Passport", body: "I, the undersigned, am reporting the loss of my International Passport at {{place}}. Passport No: {{desc}}. To avoid any future legal complications, I request you to record this GD." },
        license: { title: "Loss of Driving License", body: "I, the undersigned, report that my original Driving License was lost at {{place}} around {{time}}. License Details: {{desc}}. I request you to record this information in the GD." },
        bank_cheque: { title: "Loss of Bank Cheque Book", body: "I, the undersigned, report that my bank cheque book has been lost at {{place}}. Bank & A/C Details: {{desc}}. Please record this in the General Diary to prevent misuse." },
        money: { title: "Loss of Cash and Wallet", body: "I, the undersigned, state that I lost my wallet containing cash and documents at {{place}} at {{time}}. Wallet Details: {{desc}}. I request you to record this loss in the GD." },
        general: { title: "General Loss Report", body: "I, the undersigned, report that I lost the following item at {{place}} at {{time}}. Description: {{desc}}. I request you to record this in the General Diary for legal security." }
    }
};

function openGdModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-gd-maker');
    document.getElementById('gdMakerModal').style.display = 'flex';
    setGdLang(gdLang);
}

function closeGdModal() {
    document.getElementById('gdMakerModal').style.display = 'none';
}

function setGdLang(lang) {
    gdLang = lang;
    document.getElementById('gdm-btn-bn').classList.toggle('active', lang === 'bn');
    document.getElementById('gdm-btn-en').classList.toggle('active', lang === 'en');
    const isBN = lang === 'bn';
    
    // UI Labels
    document.getElementById('gdm-ui-title').innerText = isBN ? "পুলিশ জিডি আবেদন রাইটিং" : "Police GD Application Writing";
    document.getElementById('lbl-gdm-temp').innerText = isBN ? 'জিডির বিষয় নির্বাচন করুন' : 'Select GD Subject';
    document.getElementById('lbl-gdm-step1').innerText = isBN ? '১. থানা ও তারিখ' : '1. Station & Date';
    document.getElementById('lbl-gdm-step2').innerText = isBN ? '২. আবেদনকারীর তথ্য' : '2. Applicant Info';
    document.getElementById('lbl-gdm-step3').innerText = isBN ? '৩. হারানো জিনিসের বিবরণ' : '3. Details of Loss';
    
    document.getElementById('gdm-ps-name').placeholder = isBN ? "থানার নাম" : "Police Station Name";
    document.getElementById('gdm-date').placeholder = isBN ? "আবেদনের তারিখ" : "Application Date";
    document.getElementById('gdm-name').placeholder = isBN ? "আপনার পূর্ণ নাম" : "Full Name";
    document.getElementById('gdm-father').placeholder = isBN ? "পিতা/স্বামীর নাম" : "Father/Husband Name";
    document.getElementById('gdm-phone').placeholder = isBN ? "মোবাইল নম্বর" : "Mobile Number";
    document.getElementById('gdm-address').placeholder = isBN ? "পূর্ণ ঠিকানা (গ্রাম, ডাকঘর, উপজেলা, জেলা)" : "Full Address";
    document.getElementById('gdm-lost-place').placeholder = isBN ? "কোথা থেকে হারিয়েছে?" : "Place of loss?";
    document.getElementById('gdm-lost-time').placeholder = isBN ? "কখন হারিয়েছে? (সময় ও তারিখ)" : "Time & Date of loss?";
    document.getElementById('gdm-lost-desc').placeholder = isBN ? "ব্র্যান্ড, আইডি নম্বর বা অন্যান্য বিবরণ" : "Brand, ID No, or details";
    
    document.getElementById('btn-gdm-print').querySelector('span').innerText = isBN ? "প্রিন্ট করুন (A4)" : "Print (A4)";
    document.getElementById('btn-gdm-reset').querySelector('span').innerText = isBN ? "সব মুছুন" : "Clear All";

    const select = document.getElementById('gdm-template-select');
    select.innerHTML = '';
    const data = gdTemplates[lang];
    for (let key in data) {
        let opt = document.createElement('option');
        opt.value = key; opt.innerText = data[key].title;
        select.appendChild(opt);
    }
    applyGdTemplate(select.value);
}

function applyGdTemplate(key) {
    window.currentGdKey = key;
    updateGd();
}

function toGdN(n) {
    if (gdLang !== 'bn') return n;
    const d = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return n.toString().replace(/\d/g, x => d[x]);
}

function updateGd() {
    const val = (id) => document.getElementById(id).value;
    const data = gdTemplates[gdLang][window.currentGdKey] || gdTemplates[gdLang]['general'];
    
    const ps = val('gdm-ps-name') || ".......";
    const date = val('gdm-date') || "01/01/2026";
    const name = val('gdm-name') || ".......";
    const father = val('gdm-father') || ".......";
    const phone = val('gdm-phone') || ".......";
    const addr = val('gdm-address') || ".......";
    const place = val('gdm-lost-place') || ".......";
    const time = val('gdm-lost-time') || ".......";
    const desc = val('gdm-lost-desc') || ".......";

    let bodyText = data.body
        .replace(/{{time}}/g, `<b>${time}</b>`)
        .replace(/{{place}}/g, `<b>${place}</b>`)
        .replace(/{{desc}}/g, `<b>${desc}</b>`)
        .replace(/{{name}}/g, `<b>${name}</b>`)
        .replace(/{{address}}/g, `<b>${addr}</b>`);

    const html = `
        <div style="font-size:16px; line-height:1.8; color:#000;">
            <p>${gdLang === 'bn' ? 'তারিখ:' : 'Date:'} ${toGdN(date)}</p>
            <p>${gdLang === 'bn' ? 'বরাবর,<br>ভারপ্রাপ্ত কর্মকর্তা' : 'To,<br>The Officer In Charge'}<br>
            ${ps} ${gdLang === 'bn' ? 'থানা, বাংলাদেশ।' : 'Police Station, Bangladesh.'}</p>
            
            <p><b>${gdLang === 'bn' ? 'বিষয়: সাধারণ ডায়েরি (GD) করার জন্য আবেদন।' : 'Subject: Prayer for recording a General Diary (GD).'}</b></p>
            
            <p>${gdLang === 'bn' ? 'জনাব,' : 'Sir,'}</p>
            <p style="text-align:justify;">${bodyText}</p>
            
            <p style="margin-top:25px;">${gdLang === 'bn' ? 'আবেদনকারীর তথ্য:' : "Applicant's Details:"}<br>
            ${gdLang === 'bn' ? 'নাম:' : 'Name:'} ${name}<br>
            ${gdLang === 'bn' ? 'পিতা/স্বামী:' : 'Father/Husband:'} ${father}<br>
            ${gdLang === 'bn' ? 'ঠিকানা:' : 'Address:'} ${addr}</p>

            <div style="margin-top:60px;">
                <p>${gdLang === 'bn' ? 'বিনীত নিবেদক,' : 'Sincerely Yours,'}</p>
                <br>
                <p>____________________<br>
                (${name})<br>
                ${gdLang === 'bn' ? 'মোবাইল:' : 'Mobile:'} ${toGdN(phone)}</p>
            </div>
        </div>
    `;

    document.getElementById('gdm-render-area').innerHTML = html;
}

function printGd() {
    const printContent = document.getElementById('gdm-render-area').innerHTML;
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>Print GD Application</title>');
    printWindow.document.write('<link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">');
    printWindow.document.write('<style>body{margin:0;padding:0;background:#fff;}#wrap{width:210mm;height:297mm;padding:25mm;box-sizing:border-box;font-family:"SolaimanLipi",Arial,sans-serif!important;}</style></head><body>');
    printWindow.document.write('<div id="wrap">' + printContent + '</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 700);
}

function resetGd() {
    document.querySelectorAll('#gdm-input-panel input, #gdm-input-panel textarea').forEach(i => i.value = "");
    updateGd();
}
