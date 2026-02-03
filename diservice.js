const waServices = [
    { name: "এনআইডি কার্ড সার্ভার কপি", icon: "fa-id-card-clip" },
    { name: "এনআইডি কার্ড সাইন কপি", icon: "fa-pen-fancy" },
    { name: "হারানো এনআইডি কার্ড ডাউনলোড", icon: "fa-cloud-arrow-down" },
    { name: "ব্যক্তি ছাড়া এনআইডি কার্ড ডাউনলোড", icon: "fa-user-xmark" },
    { name: "স্মার্ট আইডি কার্ড পিডিএফ ডাউনলোড", icon: "fa-file-pdf" },
    { name: "নাম ঠিকানা দিয়ে এনআইডি কার্ড", icon: "fa-user-tag" },
    { name: "ফোন নাম্বার দিয়ে এনআইডি কার্ড", icon: "fa-mobile-screen-button" },
    { name: "এনআইডি সংশোধন ফর্ম ডাউনলোড", icon: "fa-file-pen" },
    { name: "এনআইডি ইউজার পাসওয়ার্ড সেট", icon: "fa-user-lock" },
    { name: "জন্ম নিবন্ধন দিয়ে এনআইডি", icon: "fa-id-card" },
    { name: "ডিজিটাল জন্ম নিবন্ধন ডাউনলোড", icon: "fa-baby" },
    { name: "জন্মনিবন্ধন ফোন নাম্বার পরিবর্তন", icon: "fa-phone-volume" },
    { name: "জন্মনিবন্ধন-জন্ম তারিখ অনুসন্ধান", icon: "fa-calendar-days" },
    { name: "সকল সিমের বায়োমেট্রিক", icon: "fa-fingerprint" },
    { name: "সকল সিমের কল লিস্ট", icon: "fa-list-ul" },
    { name: "নাম্বার লোকেশন ট্র্যাক", icon: "fa-location-crosshairs" },
    { name: "ফেসবুক লাইভ লোকেশন ট্র্যাক", icon: "fa-brands fa-facebook" },
    { name: "IMEI দিয়ে এক্টিভ ফোন নম্বর", icon: "fa-barcode" },
    { name: "বক্স দিয়ে হারানো ফোনের খোঁজ", icon: "fa-box" },
    { name: "এনআইডি দিয়ে সকল সিম নাম্বার", icon: "fa-sim-card" },
    { name: "নগদ একাউন্ট KYC ভেরিফাই", icon: "fa-wallet" },
    { name: "বিএমইটি ৭৮% ভেরিফাই", icon: "fa-circle-check" },
    { name: "ই-পাসপোর্ট ইনফরমেশন", icon: "fa-passport" },
    { name: "সুরক্ষা সার্টিফিকেট ডাউনলোড", icon: "fa-certificate" },
    { name: "টিন সাটিফিকেট ইনফরমেশন", icon: "fa-file-invoice-dollar" },
    { name: "টিন সার্টিফিকেট ডাউনলোড", icon: "fa-file-arrow-down" },
    { name: "টিন সার্টিফিকেট জিরো রিটার্ন", icon: "fa-0" },
    { name: "ব্রিলিয়ান্ট নাম্বার ইনফরমেশন", icon: "fa-star" },
    { name: "বিকাশ/নগদ/রকেট ইনফরমেশন", icon: "fa-hand-holding-dollar" },
    { name: "বিকাশ/নগদ/পিন রিসেট", icon: "fa-lock-open" },
    { name: "বিকাশ/নগদ/স্টেটমেন্ট", icon: "fa-chart-line" },
    { name: "ভূমি উন্নয়ন কর তথ্য", icon: "fa-landmark" },
    { name: "জমির মৌজা ম্যাপ", icon: "fa-map-location-dot" },
    { name: "কম্পিউটার ট্রেনিং সার্টিফিকেট", icon: "fa-computer" },
    { name: "সৌদি তাকামুল সার্টিফিকেট", icon: "fa-file-shield" },
    { name: "অব্যবহৃত সিম বন্ধ", icon: "fa-ban" }
];

function openDigitalSebaModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-digital-seba');
    document.getElementById('digitalSebaModal').style.display = 'flex';
    renderWaCards();
}

function closeDigitalSebaModal() {
    document.getElementById('digitalSebaModal').style.display = 'none';
}

function renderWaCards() {
    const container = document.getElementById("wa-master-grid");
    if(!container) return;
    container.innerHTML = "";

    waServices.forEach(service => {
        const card = document.createElement("div");
        card.className = "wa-card-item";
        card.innerHTML = `
            <i class="fa-solid ${service.icon}"></i>
            <span>${service.name}</span>
            <div class="btn-wa-order">অর্ডার করুন</div>
        `;
        card.onclick = () => sendWhatsApp(service.name);
        container.appendChild(card);
    });
}

function sendWhatsApp(service) {
    const phone = "8801335468084";
    const message = encodeURIComponent("হ্যালো, আমি (" + service + ") এই সার্ভিসটি নিতে চাই!");
    const url = "https://wa.me/" + phone + "?text=" + message;
    window.open(url, "_blank");
}
