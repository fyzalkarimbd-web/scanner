let leafLang = "bn";
let textIsRotated = false;

let sizes = {
    title: 80,
    body: 30,
    footer: 40
};

function openLeafletModal() {
    if(typeof setActiveMode === 'function') setActiveMode('mode-leaflet');
    document.getElementById('leafletModal').style.display = 'flex';
    setLeafLang('bn'); 
}

function closeLeafletModal() {
    document.getElementById('leafletModal').style.display = 'none';
}

function changeSize(section, amount) {
    sizes[section] += amount;
    if(sizes[section] < 10) sizes[section] = 10;
    document.getElementById(section + '-size-val').innerText = sizes[section] + 'px';
    updateLeaflet();
}

function toggleTextRotation() {
    textIsRotated = !textIsRotated;
    const content = document.getElementById('leaflet-content-rotate');
    const page = document.getElementById('a4-portrait-page');
    if (textIsRotated) {
        content.style.transform = "rotate(90deg)";
        content.style.width = page.offsetHeight + "px";
        content.style.height = page.offsetWidth + "px";
    } else {
        content.style.transform = "rotate(0deg)";
        content.style.width = "100%";
        content.style.height = "100%";
    }
    updateLeaflet();
}

const leafletTemplates = {
    bn: {
        // --- আগের গুলো ---
        'to-let': { title: "বাসা ভাড়া", body: "২ রুম, ড্রয়িং, ডাইনিং, কিচেন ও বাথরুমসহ ছিমছাম ফ্ল্যাট ভাড়া দেওয়া হবে।\n(শুধুমাত্র ছোট পরিবার)", footer: "যোগাযোগ: ০১৭১২-৩৪৫৬৭৮" },
        'teacher': { title: "শিক্ষক চাই", body: "অষ্টম ও দশম শ্রেণীর ছাত্রকে পড়ানোর জন্য একজন অভিজ্ঞ গৃহশিক্ষক আবশ্যক।\nবিষয়: গণিত ও বিজ্ঞান।", footer: "মোবাইল: ০১৮৩৪-০৩০৫৪৪" },
        'no-parking': { title: "গাড়ি রাখা নিষেধ", body: "এখানে গাড়ি পার্কিং করা সম্পূর্ণ নিষেধ।\nআদেশক্রমে কর্তৃপক্ষ।", footer: "গাড়ি রাখবেন না" },
        'no-entry': { title: "প্রবেশ নিষেধ", body: "অনুমতি ব্যতীত ভিতরে প্রবেশ সম্পূর্ণ নিষেধ।", footer: "কর্তৃপক্ষ" },
        'cctv': { title: "সতর্কবার্তা", body: "আপনি এখন সিসিটিভি ক্যামেরার আওতাধীন আছেন।", footer: "সিসিটিভি ক্যামেরা চলছে" },
        'shoes': { title: "জুতা বাহিরে রাখুন", body: "পবিত্রতা বজায় রাখতে আপনার জুতা অনুগ্রহ করে বাহিরে নির্দিষ্ট স্থানে রাখুন।", footer: "ধন্যবাদ" },
        'discount': { title: "বিরাট মূল্যছাড়", body: "সকল পণ্যের উপর ৫০% পর্যন্ত বিশেষ মূল্যছাড় চলছে! আজই চলে আসুন।", footer: "সীমিত সময়ের জন্য" },
        'danger': { title: "সাবধান!", body: "উচ্চ ভোল্টেজ এলাকা। বৈদ্যুতিক তার স্পর্শ করা বিপদজনক।", footer: "বিপদ এড়ান" },
        'silence': { title: "নীরবতা বজায় রাখুন", body: "হাসপাতাল এলাকা, হর্ন বাজানো নিষেধ।\nঅনুগ্রহ করে নীরবতা বজায় রাখুন।", footer: "ধন্যবাদ" },
        'no-smoking': { title: "ধূমপান নিষেধ", body: "এটি একটি ধূমপান মুক্ত এলাকা। এখানে ধূমপান করা আইনত দণ্ডনীয় অপরাধ।", footer: "ধূমপান ত্যাগ করুন" },
        'house-sale': { title: "বাড়ি বিক্রয়", body: "৩ শতাংশ জমির উপর নির্মিত ২ তলা একটি সুদৃশ্য বাড়ি জরুরি ভিত্তিতে বিক্রয় করা হবে।", footer: "যোগাযোগ: ০১৭১২-XXXXXX" },
        'staff-wanted': { title: "লোক আবশ্যক", body: "দোকান পরিচালনার জন্য ২ জন চটপটে সেলসম্যান আবশ্যক।\nবেতন আলোচনা সাপেক্ষে।", footer: "সাক্ষাৎকার চলছে" },
        'dog': { title: "কুকুর হতে সাবধান", body: "ভিতরে প্রবেশের আগে সতর্ক হোন। গেটের ভিতরে কুকুর আছে।", footer: "সতর্ক থাকুন" },
        'mask': { title: "জরুরি নির্দেশিকা", body: "মাস্ক ব্যতীত প্রবেশ নিষেধ। আপনার ও আপনার পরিবারের সুরক্ষা নিশ্চিত করুন।", footer: "মাস্ক পরুন" },
        'office-rent': { title: "অফিস ভাড়া", body: "১২০০ স্কয়ার ফিটের একটি সুপরিসর কমার্শিয়াল স্পেস অফিস হিসেবে ভাড়া দেওয়া হবে।", footer: "Call: 017XXXXXXXX" },

        // --- নতুন টেমপ্লেট (বুদ্ধি খাটিয়ে যুক্ত করা) ---
        'sublet': { title: "সাবলেট ভাড়া", body: "আগামী মাস থেকে ১টি বড় রুম (সংযুক্ত বাথরুম ও বারান্দাসহ) সাবলেট দেওয়া হবে।\nবিদ্যুৎ ও পানি বিল ফিক্সড।", footer: "যোগাযোগ: ০১৬XXXXXXXX" },
        'shop-rent': { title: "দোকান ভাড়া", body: "বাজারের মেইন রোডে নিচতলায় একটি সুপরিসর দোকান ঘর দীর্ঘ মেয়াদী ভাড়া দেওয়া হবে।", footer: "যোগাযোগ করুন: ০১৯XXXXXXXX" },
        'garage-rent': { title: "গ্যারেজ ভাড়া", body: "একটি প্রাইভেট কার বা বাইক রাখার জন্য নিরাপদ ও সিসিটিভি নিয়ন্ত্রিত গ্যারেজ খালি আছে।", footer: "যোগাযোগ: ০১৭XXXXXXXX" },
        'hostel': { title: "ছাত্রাবাস", body: "ছাত্রদের থাকার জন্য ছিমছাম ও মনোরম পরিবেশে সিট খালি আছে।\n(ওয়াইফাই ও মিল সিস্টেম সুবিধা আছে)", footer: "যোগাযোগ: ০১৫XXXXXXXX" },
        'coaching': { title: "ভর্তি চলছে", body: "নতুন ব্যাচে ৬ষ্ঠ থেকে ১০ম শ্রেণী পর্যন্ত ভর্তি চলছে। স্পেশাল কেয়ার ও সাপ্তাহিক পরীক্ষা।", footer: "স্থান: এ বি সি কোচিং সেন্টার" },
        'computer': { title: "কম্পিউটার কোর্স", body: "বেসিক অফিস অ্যাপ্লিকেশন, গ্রাফিক্স ডিজাইন ও ডিজিটাল মার্কেটিং কোর্সে দ্রুত ভর্তি হন।", footer: "যোগাযোগ: ০১৮XXXXXXXX" },
        'arabic': { title: "কুরআন শিক্ষা", body: "সহিহ শুদ্ধভাবে কুরআন শিক্ষার জন্য একজন অভিজ্ঞ হাফেজ সাহেব/শিক্ষক আবশ্যক।", footer: "ফোন: ০১৭১XXXXXXX" },
        'opening': { title: "শুভ উদ্বোধন", body: "আগামী শুক্রবার আমাদের শোরুমের শুভ উদ্বোধন উপলক্ষে সবাইকে আমন্ত্রণ ও স্পেশাল গিফট।", footer: "স্থান: সিটি সেন্টার মার্কেট" },
        'buy-one-get-one': { title: "বিরাট অফার", body: "১টি কিনলে ১টি ফ্রি! সীমিত সময়ের জন্য এই অফারটি সকল পোশাকে প্রযোজ্য।", footer: "আজই ভিজিট করুন" },
        'blood-needed': { title: "রক্তের প্রয়োজন", body: "জরুরি ভিত্তিতে ১ ব্যাগ পজেটিভ (B+) রক্ত প্রয়োজন।\nরোগী: ঢাকা মেডিকেল কলেজে চিকিৎসাধীন।", footer: "যোগাযোগ: ০১৭XXXXXXXX" },
        'lost-found': { title: "হারিয়ে গেছে", body: "একটি কালো রঙের মানিব্যাগ যার ভেতর জরুরি ডকুমেন্টস ছিল তা হারিয়ে গেছে। কেউ পেলে যোগাযোগ করুন।", footer: "পুরস্কার দেওয়া হবে" },
        'milad': { title: "মিলাদ মাহফিল", body: "আগামী ১০ই মে বাদ মাগরিব আমাদের বাসভবনে এক দোয়া ও মিলাদ মাহফিলের আয়োজন করা হয়েছে।", footer: "আমন্ত্রণে: আবুল কাশেম" },
        'wifi': { title: "WiFi পাসওয়ার্ড", body: "এই প্রতিষ্ঠানের ফ্রি ওয়াইফাই ব্যবহার করতে নিচের পাসওয়ার্ডটি দিন।\nPassword: user1234", footer: "ধন্যবাদ - কর্তৃপক্ষ" },
        'garbage': { title: "ময়লা ফেলবেন না", body: "এখানে ময়লা আবর্জনা ফেলা সম্পূর্ণ নিষেধ। আইন ভঙ্গকারীর বিরুদ্ধে ব্যবস্থা নেওয়া হবে।", footer: "আদেশক্রমে: সিটি কর্পোরেশন" },
        'toilet': { title: "টয়লেট", body: "পরিচ্ছন্নতা বজায় রাখুন। ব্যবহারের পর পানি ঢালুন। বাহিরে জুতা রাখুন।", footer: "ধন্যবাদ" },
        'maintenance': { title: "কাজ চলছে", body: "সতর্ক থাকুন! মেরামতের কাজ চলছে। বিকল্প রাস্তা ব্যবহার করুন।", footer: "বিপদ এড়ান" },
        'lift-out': { title: "লিফট বন্ধ", body: "যান্ত্রিক ত্রুটির কারণে লিফট সাময়িকভাবে বন্ধ আছে। সাময়িক অসুবিধার জন্য আমরা দুঃখিত।", footer: "আদেশক্রমে: কর্তৃপক্ষ" },
        'no-mobile': { title: "মোবাইল ব্যবহার নিষেধ", body: "জরুরি প্রয়োজন ব্যতীত এখানে মোবাইল ফোনে কথা বলা সম্পূর্ণ নিষেধ।", footer: "কর্তৃপক্ষ" },
        'clinic': { title: "ফ্রি চেকআপ", body: "আগামী রবিবার সকাল ১০টা থেকে দুপুর ২টা পর্যন্ত বিনামূল্যে ডায়াবেটিস পরীক্ষা করা হবে।", footer: "স্থান: মর্ডান ক্লিনিক" },
        'sale-off': { title: "বিরাট সেল", body: "দোকান ক্লোজিং উপলক্ষে সকল মালামাল উৎপাদন খরচে বিক্রয় করা হচ্ছে।", footer: "স্টক শেষ হওয়ার আগে আসুন" }
    },
    en: {
        // --- Existing ---
        'to-let': { title: "HOUSE FOR RENT", body: "A beautiful flat with 2 rooms, drawing, dining, kitchen, and bathroom will be rented. (Small family only)", footer: "Contact: 01712-345678" },
        'teacher': { title: "TEACHER WANTED", body: "An experienced tutor is required for a student of Class 8 and 10. Subjects: Math & Science.", footer: "Mobile: 01834-030544" },
        'no-parking': { title: "NO PARKING", body: "Parking is strictly prohibited here. By order of the authority.", footer: "DO NOT PARK" },
        'no-entry': { title: "NO ENTRY", body: "Entry without permission is strictly prohibited.", footer: "AUTHORITY" },
        'cctv': { title: "CCTV AREA", body: "You are under CCTV surveillance. Please be careful.", footer: "PROTECTED" },
        'shoes': { title: "SHOES OFF", body: "Please keep your shoes outside in the designated area.", footer: "THANK YOU" },
        'discount': { title: "BIG DISCOUNT", body: "Special discount up to 50% on all products! Visit us today.", footer: "LIMITED TIME" },
        'danger': { title: "DANGER!", body: "High voltage area. Touching electrical wires is dangerous.", footer: "DANGER 440V" },
        'silence': { title: "KEEP SILENCE", body: "Hospital area, blowing horn is prohibited. Please maintain silence.", footer: "SILENCE PLEASE" },
        'no-smoking': { title: "NO SMOKING", body: "This is a smoke-free area. Smoking here is a punishable offense.", footer: "DON'T SMOKE" },
        'house-sale': { title: "HOUSE FOR SALE", body: "A beautiful 2-story house built on 3 decimals of land is for urgent sale.", footer: "Call: 01712-XXXXXX" },
        'staff-wanted': { title: "STAFF WANTED", body: "2 smart salesmen are required for shop management. Salary negotiable.", footer: "INTERVIEW ONGOING" },
        'dog': { title: "BEWARE OF DOG", body: "Be careful before entering. There is a dog inside the gate.", footer: "WATCH OUT" },
        'mask': { title: "NOTICE", body: "No entry without a mask. Ensure the safety of yourself and your family.", footer: "WEAR A MASK" },
        'office-rent': { title: "OFFICE RENT", body: "A spacious 1200 sq. ft. commercial space will be rented as an office.", footer: "Call: 017XXXXXXXX" },

        // --- New Templates ---
        'sublet': { title: "SUBLET FOR RENT", body: "1 large room with attached bathroom and balcony will be sublet from next month.", footer: "Contact: 016XXXXXXXX" },
        'shop-rent': { title: "SHOP FOR RENT", body: "A spacious ground floor shop on the main road is available for long-term rent.", footer: "Call: 019XXXXXXXX" },
        'garage-rent': { title: "GARAGE RENT", body: "Safe and CCTV-monitored parking space available for private cars or bikes.", footer: "Contact: 017XXXXXXXX" },
        'hostel': { title: "HOSTEL SEAT", body: "Seats are available in a clean hostel environment for students. (WiFi & Meal available)", footer: "Call: 015XXXXXXXX" },
        'coaching': { title: "ADMISSION OPEN", body: "Admission ongoing for Class 6 to 10. Special care and weekly model tests.", footer: "At: ABC Coaching Center" },
        'computer': { title: "COMPUTER COURSE", body: "Enroll in Basic Office, Graphics Design, or Digital Marketing courses today!", footer: "Contact: 018XXXXXXXX" },
        'arabic': { title: "ARABIC TEACHER", body: "An experienced tutor is required for teaching the Holy Quran with Tajweed.", footer: "Call: 017XXXXXXXX" },
        'opening': { title: "GRAND OPENING", body: "Join us for the grand opening of our new showroom. Gifts for first 50 visitors!", footer: "Venue: City Center Market" },
        'buy-one-get-one': { title: "SPECIAL OFFER", body: "Buy 1 Get 1 Free! This offer is valid on all clothing items for a limited time.", footer: "VISIT TODAY" },
        'blood-needed': { title: "BLOOD NEEDED", body: "Emergency 1 bag of B+ blood is needed for a patient at DMCH.", footer: "Contact: 017XXXXXXXX" },
        'lost-found': { title: "LOST ITEM", body: "A black wallet containing important documents was lost. Please contact if found.", footer: "REWARD WILL BE GIVEN" },
        'milad': { title: "Dua & Milad", body: "A Dua and Milad Mahfil has been organized at our residence this Friday after Maghrib.", footer: "Invited by: Abul Kashem" },
        'wifi': { title: "FREE WiFi", body: "To use our free WiFi, please use the following password.\nPassword: user1234", footer: "BY AUTHORITY" },
        'garbage': { title: "NO DUSTBIN", body: "Dumping garbage here is strictly prohibited. Violators will be prosecuted.", footer: "ORDER BY CITY CORP" },
        'toilet': { title: "TOILET", body: "Keep it clean. Use water after use. Leave your shoes outside.", footer: "THANK YOU" },
        'maintenance': { title: "UNDER REPAIR", body: "Work in progress. Please be careful and use the alternative route.", footer: "STAY SAFE" },
        'lift-out': { title: "LIFT OUT OF ORDER", body: "The lift is temporarily out of order due to maintenance. Sorry for the inconvenience.", footer: "BY AUTHORITY" },
        'no-mobile': { title: "NO MOBILE PHONES", body: "Using mobile phones is strictly prohibited here except for emergencies.", footer: "AUTHORITY" },
        'clinic': { title: "FREE CHECKUP", body: "Free diabetes screening will be held next Sunday from 10 AM to 2 PM.", footer: "Venue: Modern Clinic" },
        'sale-off': { title: "CLOSING SALE", body: "Everything must go! All items are being sold at production cost.", footer: "VISIT BEFORE STOCK ENDS" }
    }
};

function setLeafLang(lang) {
    leafLang = lang;
    document.getElementById('leaf-bn-btn').classList.toggle('active', lang === 'bn');
    document.getElementById('leaf-en-btn').classList.toggle('active', lang === 'en');
    
    const ui = {
        bn: { mainTitle: "A4 লিফলেট মেকার", rotate: "লেখা ঘোরান (৯০° ডিগ্রী)", temp: "টেমপ্লেট নির্বাচন করুন", title: "শিরোনাম / হেডলাইন", body: "বিস্তারিত তথ্য", footer: "যোগাযোগ / ফুটার", align: "এলাইনমেন্ট (Alignment)", print: "প্রিন্ট করুন (A4)", reset: "সব মুছুন", c: "মাঝখানে", l: "বামে", r: "ডানে" },
        en: { mainTitle: "A4 Leaflet Maker", rotate: "Rotate Text (90°)", temp: "Select Template", title: "Heading / Title", body: "Details Description", footer: "Contact / Footer", align: "Text Alignment", print: "Print (A4)", reset: "Clear All", c: "Center", l: "Left", r: "Right" }
    }[lang];

    document.getElementById('leaf-ui-main-title').innerHTML = "<i class='fa-solid fa-file-invoice'/> " + ui.mainTitle;
    document.getElementById('lbl-leaf-rotate').innerText = ui.rotate;
    document.getElementById('lbl-leaf-temp').innerText = ui.temp;
    document.getElementById('lbl-leaf-title').innerText = ui.title;
    document.getElementById('lbl-leaf-body').innerText = ui.body;
    document.getElementById('lbl-leaf-footer').innerText = ui.footer;
    document.getElementById('lbl-leaf-align').innerText = ui.align;
    document.getElementById('lbl-leaf-print').innerText = ui.print;
    document.getElementById('lbl-leaf-reset').innerText = ui.reset;
    document.getElementById('opt-center').innerText = ui.c;
    document.getElementById('opt-left').innerText = ui.l;
    document.getElementById('opt-right').innerText = ui.r;

    const select = document.getElementById('leaf-template-select');
    select.innerHTML = "";
    for (let key in leafletTemplates[lang]) {
        let opt = document.createElement('option');
        opt.value = key;
        opt.innerText = leafletTemplates[lang][key].title;
        select.appendChild(opt);
    }
    applyLeafTemplate(select.value);
}

function applyLeafTemplate(key) {
    const data = leafletTemplates[leafLang][key];
    document.getElementById('leaf-title').value = data.title;
    document.getElementById('leaf-body').value = data.body;
    document.getElementById('leaf-footer').value = data.footer;
    updateLeaflet();
}

function updateLeaflet() {
    const align = document.getElementById('leaf-align').value;
    const previewScale = 0.5;

    // শিরোনাম (Title)
    const titleEl = document.getElementById('lp-title');
    titleEl.innerText = document.getElementById('leaf-title').value;
    titleEl.style.fontSize = (sizes.title * previewScale) + "px";
    titleEl.style.color = document.getElementById('leaf-title-clr').value;
    titleEl.style.textAlign = align;

    // বডি (Body)
    const bodyEl = document.getElementById('lp-body');
    bodyEl.innerText = document.getElementById('leaf-body').value;
    bodyEl.style.fontSize = (sizes.body * previewScale) + "px";
    bodyEl.style.color = document.getElementById('leaf-body-clr').value;
    bodyEl.style.textAlign = align;
    // বডি যেহেতু ফ্লেক্সবক্স ব্যবহার করছে, তাই justify-content ও পরিবর্তন করতে হবে
    if(align === 'center') bodyEl.style.justifyContent = 'center';
    else if(align === 'left') bodyEl.style.justifyContent = 'flex-start';
    else if(align === 'right') bodyEl.style.justifyContent = 'flex-end';

    // ফুটার (Footer)
    const footerEl = document.getElementById('lp-footer');
    footerEl.innerText = document.getElementById('leaf-footer').value;
    footerEl.style.fontSize = (sizes.footer * previewScale) + "px";
    footerEl.style.color = document.getElementById('leaf-footer-clr').value;
    footerEl.style.borderTopColor = document.getElementById('leaf-footer-clr').value;
    footerEl.style.textAlign = align;
}

function printLeaflet() {
    const title = document.getElementById('leaf-title').value;
    const body = document.getElementById('leaf-body').value;
    const footer = document.getElementById('leaf-footer').value;
    const align = document.getElementById('leaf-align').value;
    const clrTitle = document.getElementById('leaf-title-clr').value;
    const clrBody = document.getElementById('leaf-body-clr').value;
    const clrFooter = document.getElementById('leaf-footer-clr').value;

    let flexAlign = align === 'center' ? 'center' : (align === 'left' ? 'flex-start' : 'flex-end');

    const win = window.open('', '', 'height=900,width=800');
    let rotationStyle = textIsRotated ? 
        `transform: rotate(90deg); width: 297mm; height: 210mm; position: absolute; top: 50%; left: 50%; margin-top: -105mm; margin-left: -148.5mm;` : 
        `width: 210mm; height: 297mm;`;

    win.document.write('<html><head><title>Print</title>');
    win.document.write('<style>@import url("https://fonts.maateen.me/solaiman-lipi/font.css"); body{margin:0; padding:0; background:#fff;} .a4-page{width:210mm; height:297mm; position:relative; overflow:hidden;} .content-box{'+ rotationStyle +' padding:20mm; box-sizing:border-box; display:flex; flex-direction:column; justify-content:space-between; text-align:' + align + '; font-family:"SolaimanLipi", sans-serif;} #pt{font-size:'+ sizes.title +'px; font-weight:900; line-height:1.1; color:'+ clrTitle +';} #pb{font-size:'+ sizes.body +'px; font-weight:700; flex:1; display:flex; align-items:center; justify-content:'+ flexAlign +'; white-space:pre-wrap; margin:15mm 0; color:'+ clrBody +';} #pf{font-size:'+ sizes.footer +'px; font-weight:900; border-top:6px solid '+ clrFooter +'; padding-top:10mm; color:'+ clrFooter +';}</style>');
    win.document.write('</head><body><div class="a4-page"><div class="content-box">');
    win.document.write('<div id="pt">' + title + '</div>');
    win.document.write('<div id="pb">' + body + '</div>');
    win.document.write('<div id="pf">' + footer + '</div>');
    win.document.write('</div></div></body></html>');
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
}

function resetLeaflet() {
    document.getElementById('leaf-title').value = "";
    document.getElementById('leaf-body').value = "";
    document.getElementById('leaf-footer').value = "";
    updateLeaflet();
}
