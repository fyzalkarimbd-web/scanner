const dhakaRamadanTimes = [
    { r: 1, date: "১৯ ফেব্রুয়ারি", day: "বৃহস্পতিবার", s: "5:12", i: "5:58", type: "রহমত" },
    { r: 2, date: "২০ ফেব্রুয়ারি", day: "শুক্রবার", s: "5:11", i: "5:58", type: "রহমত" },
    { r: 3, date: "২১ ফেব্রুয়ারি", day: "শনিবার", s: "5:11", i: "5:59", type: "রহমত" },
    { r: 4, date: "২২ ফেব্রুয়ারি", day: "রবিবার", s: "5:10", i: "5:59", type: "রহমত" },
    { r: 5, date: "২৩ ফেব্রুয়ারি", day: "সোমবার", s: "5:09", i: "6:00", type: "রহমত" },
    { r: 6, date: "২৪ ফেব্রুয়ারি", day: "মঙ্গলবার", s: "5:08", i: "6:00", type: "রহমত" },
    { r: 7, date: "২৫ ফেব্রুয়ারি", day: "বুধবার", s: "5:08", i: "6:01", type: "রহমত" },
    { r: 8, date: "২৬ ফেব্রুয়ারি", day: "বৃহস্পতিবার", s: "5:07", i: "6:01", type: "রহমত" },
    { r: 9, date: "২৭ ফেব্রুয়ারি", day: "শুক্রবার", s: "5:06", i: "6:02", type: "রহমত" },
    { r: 10, date: "২৮ ফেব্রুয়ারি", day: "শনিবার", s: "5:05", i: "6:02", type: "রহমত" },
    { r: 11, date: "০১ মার্চ", day: "রবিবার", s: "5:05", i: "6:03", type: "মাগফেরাত" },
    { r: 12, date: "০২ মার্চ", day: "সোমবার", s: "5:04", i: "6:03", type: "মাগফেরাত" },
    { r: 13, date: "০৩ মার্চ", day: "মঙ্গলবার", s: "5:03", i: "6:04", type: "মাগফেরাত" },
    { r: 14, date: "০৪ মার্চ", day: "বুধবার", s: "5:02", i: "6:04", type: "মাগফেরাত" },
    { r: 15, date: "০৫ মার্চ", day: "বৃহস্পতিবার", s: "5:01", i: "6:05", type: "মাগফেরাত" },
    { r: 16, date: "০৬ মার্চ", day: "শুক্রবার", s: "5:00", i: "6:05", type: "মাগফেরাত" },
    { r: 17, date: "০৭ মার্চ", day: "শনিবার", s: "4:59", i: "6:06", type: "মাগফেরাত" },
    { r: 18, date: "০৮ মার্চ", day: "রবিবার", s: "4:48", i: "6:06", type: "মাগফেরাত" },
    { r: 19, date: "০৯ মার্চ", day: "সোমবার", s: "4:57", i: "6:07", type: "মাগফেরাত" },
    { r: 20, date: "১০ মার্চ", day: "মঙ্গলবার", s: "4:57", i: "6:07", type: "মাগফেরাত" },
    { r: 21, date: "১১ মার্চ", day: "বুধবার", s: "4:56", i: "6:07", type: "নাজাত" },
    { r: 22, date: "১২ মার্চ", day: "বৃহস্পতিবার", s: "4:55", i: "6:08", type: "নাজাত" },
    { r: 23, date: "১৩ মার্চ", day: "শুক্রবার", s: "4:54", i: "6:08", type: "নাজাত" },
    { r: 24, date: "১৪ মার্চ", day: "শনিবার", s: "4:53", i: "6:09", type: "নাজাত" },
    { r: 25, date: "১৫ মার্চ", day: "রবিবার", s: "4:52", i: "6:09", type: "নাজাত" },
    { r: 26, date: "১৬ মার্চ", day: "সোমবার", s: "4:51", i: "6:10", type: "নাজাত" },
    { r: 27, date: "১৭ মার্চ", day: "মঙ্গলবার", s: "4:50", i: "6:10", type: "নাজাত" },
    { r: 28, date: "১৮ মার্চ", day: "বুধবার", s: "4:49", i: "6:10", type: "নাজাত" },
    { r: 29, date: "১৯ মার্চ", day: "বৃহস্পতিবার", s: "4:48", i: "6:11", type: "নাজাত" },
    { r: 30, date: "২০ মার্চ", day: "শুক্রবার", s: "4:47", i: "6:11", type: "নাজাত" }
];

const ramDistOffsets = {
    "ঢাকা": { s: 0, i: 0 },
    "ফরিদপুর": { s: 1, i: 2 }, "গাজীপুর": { s: -1, i: -1 }, "গোপালগঞ্জ": { s: 1, i: 2 }, "কিশোরগঞ্জ": { s: -3, i: -3 }, "মাদারীপুর": { s: 0, i: 1 }, "মানিকগঞ্জ": { s: 1, i: 1 }, "মুন্সীগঞ্জ": { s: -1, i: -1 }, "নারায়ণগঞ্জ": { s: -1, i: -1 }, "নরসিংদী": { s: -2, i: -3 }, "রাজবাড়ী": { s: 3, i: 3 }, "শরীয়তপুর": { s: -1, i: -1 }, "টাঙ্গাইল": { s: 1, i: 1 },
    "চট্টগ্রাম": { s: -7, i: -5 }, "বান্দরবান": { s: -10, i: -7 }, "ব্রাহ্মণবাড়িয়া": { s: -3, i: -3 }, "চাঁদপুর": { s: -2, i: -2 }, "কুমিল্লা": { s: -4, i: -3 }, "কক্সবাজার": { s: -9, i: -6 }, "ফেনী": { s: -5, i: -4 }, "খাগড়াছড়ি": { s: -7, i: -6 }, "লক্ষ্মীপুর": { s: -2, i: -2 }, "নোয়াখালী": { s: -4, i: -3 }, "রাঙ্গামাটি": { s: -9, i: -7 },
    "রাজশাহী": { s: 6, i: 6 }, "বগুড়া": { s: 3, i: 3 }, "জয়পুরহাট": { s: 5, i: 3 }, "নওগাঁ": { s: 6, i: 5 }, "নাটোর": { s: 5, i: 5 }, "চাঁপাইনবাবগঞ্জ": { s: 8, i: 7 }, "পাবনা": { s: 3, i: 3 }, "সিরাজগঞ্জ": { s: 3, i: 2 },
    "খুলনা": { s: 3, i: 4 }, "বাগেরহাট": { s: 2, i: 3 }, "চুয়াডাঙ্গা": { s: 6, i: 5 }, "যশোর": { s: 4, i: 5 }, "ঝিনাইদহ": { s: 4, i: 5 }, "কুষ্টিয়া": { s: 5, i: 5 }, "মাগুরা": { s: 3, i: 3 }, "মেহেরপুর": { s: 7, i: 6 }, "নড়াইল": { s: 3, i: 3 }, "সাতক্ষীরা": { s: 4, i: 5 },
    "বরিশাল": { s: -1, i: 1 }, "বরগুনা": { s: 0, i: 2 }, "ভোলা": { s: -3, i: -1 }, "ঝালকাঠি": { s: 0, i: 1 }, "পটুয়াখালী": { s: -1, i: 1 }, "পিরোজপুর": { s: 1, i: 1 },
    "সিলেট": { s: -8, i: -8 }, "হবিগঞ্জ": { s: -4, i: -5 }, "মৌলভীবাজার": { s: -7, i: -7 }, "সুনামগঞ্জ": { s: -4, i: -5 },
    "রংপুর": { s: 5, i: 2 }, "দিনাজপুর": { s: 5, i: 4 }, "গাইবান্ধা": { s: 4, i: 2 }, "কুড়িগ্রাম": { s: 3, i: 0 }, "লালমনিরহাট": { s: 4, i: 2 }, "নীলফামারী": { s: 6, i: 3 }, "পঞ্চগড়": { s: 8, i: 4 }, "ঠাকুরগাঁও": { s: 8, i: 6 },
    "ময়মনসিংহ": { s: -1, i: -1 }, "জামালপুর": { s: 2, i: 0 }, "নেত্রকোনা": { s: -3, i: -3 }, "শেরপুর": { s: 1, i: -1 }
};

function toBnNum(n) {
    return n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
}

// বর্তমান তারিখ ফরম্যাট করা (যেমন: ২০ ফেব্রুয়ারি)
function getTodayString() {
    const now = new Date();
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
    
    // তারিখ ২ ডিজিট করা (যেমন ১ এর জায়গায় ০১)
    const formattedDay = day < 10 ? "০" + toBnNum(day) : toBnNum(day);
    return formattedDay + " " + months[monthIndex];
}

function calculateTime(timeStr, offsetMins) {
    let [h, m] = timeStr.split(':').map(Number);
    let totalMinutes = h * 60 + m + offsetMins;
    let newH = Math.floor(totalMinutes / 60);
    let newM = totalMinutes % 60;
    
    // ১২ ঘণ্টার ফরম্যাট
    let displayH = newH > 12 ? newH - 12 : newH;
    if (displayH === 0) displayH = 12;
    
    return toBnNum(`${displayH}:${newM < 10 ? '0' + newM : newM}`);
}

function openRamadanModal() {
    document.getElementById('ramadanModal').style.display = 'flex';
    initDistrictSelector();
}

function closeRamadanModal() {
    document.getElementById('ramadanModal').style.display = 'none';
}

function initDistrictSelector() {
    const select = document.getElementById('ram-district-select');
    if (select.children.length > 0) return;
    
    const sortedDistricts = Object.keys(ramDistOffsets).sort((a, b) => a.localeCompare(b, 'bn'));
    sortedDistricts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.innerText = d;
        if(d === "ঢাকা") opt.selected = true;
        select.appendChild(opt);
    });
    changeDistrict();
}

function changeDistrict() {
    const dist = document.getElementById('ram-district-select').value;
    const offset = ramDistOffsets[dist];
    const body = document.getElementById('ram-table-body');
    const todayStr = getTodayString();
    
    body.innerHTML = "";
    let currentType = "";
    
    // আজকের ডেটা ড্যাশবোর্ডে দেখানোর জন্য ভ্যারিয়েবল
    let todayData = dhakaRamadanTimes[0]; // ডিফল্ট প্রথম দিন

    dhakaRamadanTimes.forEach(item => {
        if (item.type !== currentType) {
            currentType = item.type;
            body.innerHTML += `<tr class="section-header"><td colspan="5" style="background:#f1f5f9; color:#059669; font-weight:800; padding:10px;">${currentType} (১০ দিন)</td></tr>`;
        }

        const sehri = calculateTime(item.s, offset.s);
        const iftar = calculateTime(item.i, offset.i);
        
        // চেক করা হচ্ছে আজকের তারিখ কি না
        const isToday = item.date === todayStr;
        if(isToday) todayData = item;

        body.innerHTML += `<tr class="${isToday ? 'highlight-today' : ''}">
            <td>${toBnNum(item.r)}</td>
            <td>${item.date}</td>
            <td>${item.day}</td>
            <td>${sehri}</td>
            <td>${iftar}</td>
        </tr>`;
    });

    // ড্যাশবোর্ড আপডেট
    document.getElementById('today-sehri').innerText = calculateTime(todayData.s, offset.s);
    document.getElementById('today-iftar').innerText = calculateTime(todayData.i, offset.i);
    document.getElementById('current-location-info').innerText = `স্থান: ${dist} | আজকের তারিখ: ${todayStr}`;
}
