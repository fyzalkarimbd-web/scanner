const psShortcutsData = [
    // --- TOOLS (Single Key) ---
    { key: "V", category: "tool", bn: "মুভ টুল (Move Tool)", en: "Move Tool" },
    { key: "M", category: "tool", bn: "রেকট্যাঙ্গুলার/ইলিপটিক্যাল মার্কুই টুল", en: "Marquee Tool" },
    { key: "L", category: "tool", bn: "ল্যাসো টুল (Lasso/Polygonal/Magnetic)", en: "Lasso Tool" },
    { key: "W", category: "tool", bn: "ম্যাজিক ওয়ান্ড / কুইক সিলেকশন", en: "Magic Wand / Quick Selection" },
    { key: "C", category: "tool", bn: "ক্রপ টুল / স্লাইস টুল", en: "Crop / Slice Tool" },
    { key: "I", category: "tool", bn: "আইড্রপার / রুলার / নোট", en: "Eyedropper / Ruler" },
    { key: "J", category: "tool", bn: "স্পট হিলিং / প্যাচ / কনটেন্ট অ্যাওয়ার", en: "Spot Healing / Patch Tool" },
    { key: "B", category: "tool", bn: "ব্রাশ / পেন্সিল / কালার রিপ্লেসমেন্ট", en: "Brush / Pencil Tool" },
    { key: "S", category: "tool", bn: "ক্লোন স্ট্যাম্প / প্যাটার্ন স্ট্যাম্প", en: "Clone Stamp Tool" },
    { key: "Y", category: "tool", bn: "হিস্ট্রি ব্রাশ / আর্ট হিস্ট্রি ব্রাশ", en: "History Brush Tool" },
    { key: "E", category: "tool", bn: "ইরেজার টুল (Eraser)", en: "Eraser Tool" },
    { key: "G", category: "tool", bn: "গ্রেডিয়েন্ট / পেইন্ট বাকেট", en: "Gradient / Paint Bucket" },
    { key: "O", category: "tool", bn: "ডজ / বার্ন / স্পঞ্জ টুল", en: "Dodge / Burn Tool" },
    { key: "P", category: "tool", bn: "পেন টুল (Pen Tool)", en: "Pen Tool" },
    { key: "T", category: "tool", bn: "টাইপ টুল (Horizontal/Vertical Text)", en: "Type Tool" },
    { key: "A", category: "tool", bn: "পাথ সিলেকশন / ডিরেক্ট সিলেকশন", en: "Path / Direct Selection" },
    { key: "U", category: "tool", bn: "শেপ টুল (Rectangle/Ellipse/Line)", en: "Shape Tool" },
    { key: "K", category: "tool", bn: "ফ্রেম টুল (Frame Tool)", en: "Frame Tool" },
    { key: "H", category: "tool", bn: "হ্যান্ড টুল (Hand Tool)", en: "Hand Tool" },
    { key: "R", category: "tool", bn: "রোটেট ভিউ টুল (Rotate View)", en: "Rotate View Tool" },
    { key: "Z", category: "tool", bn: "জুম টুল (Zoom Tool)", en: "Zoom Tool" },
    { key: "D", category: "tool", bn: "ডিফল্ট কালার (সাদা-কালোর) রিসেট", en: "Default Colors" },
    { key: "X", category: "tool", bn: "ফোরগ্রাউন্ড ও ব্যাকগ্রাউন্ড কালার সুইচ", en: "Switch FG/BG Colors" },
    { key: "Q", category: "tool", bn: "কুইক মাস্ক মোড অন/অফ", en: "Quick Mask Mode" },
    { key: "F", category: "tool", bn: "স্ক্রিন মোড পরিবর্তন (Full Screen)", en: "Change Screen Mode" },
    { key: "Shift + Tool Key", category: "tool", bn: "একই গ্রুপের টুলের মধ্যে সুইচ করা", en: "Cycle Through Hidden Tools" },

    // --- FILE & APP MANAGEMENT ---
    { key: "Ctrl + N", category: "file", bn: "নতুন ফাইল বা ডকুমেন্ট তৈরি", en: "New Document" },
    { key: "Ctrl + O", category: "file", bn: "ফাইল ওপেন করা", en: "Open File" },
    { key: "Ctrl + Alt + O", category: "file", bn: "অ্যাডোবি ব্রিজ থেকে ওপেন", en: "Open in Bridge" },
    { key: "Ctrl + W", category: "file", bn: "বর্তমান ফাইলটি বন্ধ করা", en: "Close Document" },
    { key: "Ctrl + Alt + W", category: "file", bn: "সবগুলো ফাইল একসাথে বন্ধ করা", en: "Close All" },
    { key: "Ctrl + S", category: "file", bn: "ফাইল সেভ করা", en: "Save" },
    { key: "Ctrl + Shift + S", category: "file", bn: "সেভ অ্যাজ (Save As)", en: "Save As" },
    { key: "Ctrl + Alt + S", category: "file", bn: "কপি সেভ করা", en: "Save a Copy" },
    { key: "Ctrl + Shift + Alt + S", category: "file", bn: "ওয়েবের জন্য সেভ করা (Legacy)", en: "Save for Web" },
    { key: "Ctrl + P", category: "file", bn: "প্রিন্ট মেনু ওপেন", en: "Print" },
    { key: "Ctrl + K", category: "file", bn: "প্রেফারেন্স সেটিংস (Preferences)", en: "Preferences" },
    { key: "Ctrl + Q", category: "file", bn: "ফটোশপ থেকে বের হওয়া", en: "Exit Photoshop" },
    { key: "F12", category: "file", bn: "ফাইল রিভার্ট করা (Revert)", en: "Revert File" },

    // --- EDITING & TRANSFORMATION ---
    { key: "Ctrl + Z", category: "edit", bn: "আনডু / রিডু (Undo/Redo)", en: "Undo/Redo" },
    { key: "Ctrl + Alt + Z", category: "edit", bn: "ধাপে ধাপে পেছনে যাওয়া", en: "Step Backward" },
    { key: "Ctrl + Shift + Z", category: "edit", bn: "ধাপে ধাপে সামনে যাওয়া", en: "Step Forward" },
    { key: "Ctrl + C", category: "edit", bn: "কপি করা", en: "Copy" },
    { key: "Ctrl + X", category: "edit", bn: "কাট করা", en: "Cut" },
    { key: "Ctrl + V", category: "edit", bn: "পেস্ট করা", en: "Paste" },
    { key: "Ctrl + Shift + V", category: "edit", bn: "একই জায়গায় পেস্ট করা", en: "Paste in Place" },
    { key: "Ctrl + T", category: "edit", bn: "ফ্রি ট্রান্সফর্ম (ছোট/বড় করা)", en: "Free Transform" },
    { key: "Ctrl + Shift + T", category: "edit", bn: "আগের ট্রান্সফর্ম রিপিট করা", en: "Repeat Last Transform" },
    { key: "Ctrl + Alt + Shift + T", category: "edit", bn: "ট্রান্সফর্ম ডুপ্লিকেট রিপিট", en: "Duplicate & Repeat Transform" },
    { key: "Shift + F5", category: "edit", bn: "ফিল মেনু (Fill)", en: "Fill" },
    { key: "Alt + Backspace", category: "edit", bn: "ফোরগ্রাউন্ড কালার দিয়ে ফিল", en: "Fill with Foreground Color" },
    { key: "Ctrl + Backspace", category: "edit", bn: "ব্যাকগ্রাউন্ড কালার দিয়ে ফিল", en: "Fill with Background Color" },

    // --- IMAGE ADJUSTMENTS ---
    { key: "Ctrl + L", category: "adjust", bn: "লেভেলস ঠিক করা (Levels)", en: "Levels" },
    { key: "Ctrl + M", category: "adjust", bn: "কার্ভস ঠিক করা (Curves)", en: "Curves" },
    { key: "Ctrl + U", category: "adjust", bn: "হিউ / স্যাচুরেশন পরিবর্তন", en: "Hue/Saturation" },
    { key: "Ctrl + B", category: "adjust", bn: "কালার ব্যালেন্স (Color Balance)", en: "Color Balance" },
    { key: "Ctrl + Shift + L", category: "adjust", bn: "অটো লেভেলস (Auto Levels)", en: "Auto Levels" },
    { key: "Ctrl + Shift + Alt + L", category: "adjust", bn: "অটো কন্ট্রাস্ট", en: "Auto Contrast" },
    { key: "Ctrl + Shift + B", category: "adjust", bn: "অটো কালার (Auto Color)", en: "Auto Color" },
    { key: "Ctrl + I", category: "adjust", bn: "কালার ইনভার্ট (উল্টানো)", en: "Invert Color" },
    { key: "Ctrl + Shift + U", category: "adjust", bn: "সাদা-কালোর করা (Desaturate)", en: "Desaturate" },
    { key: "Ctrl + Alt + I", category: "adjust", bn: "ইমেজ সাইজ পরিবর্তন", en: "Image Size" },
    { key: "Ctrl + Alt + C", category: "adjust", bn: "ক্যানভাস সাইজ পরিবর্তন", en: "Canvas Size" },
    { key: "Ctrl + Shift + Alt + B", category: "adjust", bn: "ব্ল্যাক অ্যান্ড হোয়াইট অ্যাডজাস্ট", en: "Black & White" },

    // --- LAYERS ---
    { key: "Ctrl + J", category: "layer", bn: "লেয়ার কপি বা ডুপ্লিকেট করা", en: "Duplicate Layer" },
    { key: "Ctrl + Shift + J", category: "layer", bn: "কাট করে নতুন লেয়ারে নেওয়া", en: "Layer via Cut" },
    { key: "Ctrl + Shift + N", category: "layer", bn: "নতুন লেয়ার তৈরি", en: "New Layer" },
    { key: "Ctrl + G", category: "layer", bn: "লেয়ারগুলো গ্রুপ করা", en: "Group Layers" },
    { key: "Ctrl + Shift + G", category: "layer", bn: "লেয়ারগুলো আনগ্রুপ করা", en: "Ungroup Layers" },
    { key: "Ctrl + E", category: "layer", bn: "নিচের লেয়ারের সাথে যুক্ত করা", en: "Merge Down" },
    { key: "Ctrl + Shift + E", category: "layer", bn: "সব ভিজিবল লেয়ার এক করা", en: "Merge Visible" },
    { key: "Ctrl + Alt + Shift + E", category: "layer", bn: "সব লেয়ার এক করে নতুন লেয়ার", en: "Stamp Visible" },
    { key: "Ctrl + Alt + G", category: "layer", bn: "ক্লিপিং মাস্ক তৈরি/বাতিল", en: "Clipping Mask" },
    { key: "Ctrl + [", category: "layer", bn: "লেয়ার এক ধাপ নিচে নামানো", en: "Send Backward" },
    { key: "Ctrl + ]", category: "layer", bn: "লেয়ার এক ধাপ উপরে উঠানো", en: "Bring Forward" },
    { key: "Ctrl + Shift + [", category: "layer", bn: "লেয়ার সবার নিচে পাঠানো", en: "Send to Back" },
    { key: "Ctrl + Shift + ]", category: "layer", bn: "লেয়ার সবার উপরে আনা", en: "Bring to Front" },
    { key: "Alt + [ / ]", category: "layer", bn: "একটি লেয়ার থেকে অন্য লেয়ারে যাওয়া", en: "Select Layers" },
    { key: "Ctrl + /", category: "layer", bn: "লেয়ার লক বা আনলক করা", en: "Lock/Unlock Layer" },

    // --- SELECTION ---
    { key: "Ctrl + A", category: "select", bn: "সবকিছু সিলেক্ট করা", en: "Select All" },
    { key: "Ctrl + D", category: "select", bn: "সিলেকশন বাতিল (Deselect)", en: "Deselect" },
    { key: "Ctrl + Shift + D", category: "select", bn: "পুনরায় সিলেকশন করা (Reselect)", en: "Reselect" },
    { key: "Ctrl + Shift + I", category: "select", bn: "সিলেকশন উল্টানো (Inverse)", en: "Inverse Selection" },
    { key: "Ctrl + Alt + R", category: "select", bn: "সিলেক্ট অ্যান্ড মাস্ক / রিফাইন এজ", en: "Select and Mask" },
    { key: "Shift + F6", category: "select", bn: "ফেদার সিলেকশন (Feather)", en: "Feather" },

    // --- BRUSH & PAINTING ---
    { key: "[", category: "brush", bn: "ব্রাশের সাইজ কমানো", en: "Decrease Brush Size" },
    { key: "]", category: "brush", bn: "ব্রাশের সাইজ বাড়ানো", en: "Increase Brush Size" },
    { key: "{", category: "brush", bn: "ব্রাশের হার্ডনেস কমানো", en: "Decrease Hardness" },
    { key: "}", category: "brush", bn: "ব্রাশের হার্ডনেস বাড়ানো", en: "Increase Hardness" },
    { key: "0 - 9", category: "brush", bn: "ব্রাশের অপাসিটি পরিবর্তন (১০% - ১০০%)", en: "Change Opacity" },
    { key: "Shift + 0-9", category: "brush", bn: "ব্রাশের ফ্লো (Flow) পরিবর্তন", en: "Change Flow" },
    { key: ",", category: "brush", bn: "আগের ব্রাশে যাওয়া", en: "Previous Brush" },
    { key: ".", category: "brush", bn: "পরের ব্রাশে যাওয়া", en: "Next Brush" },
    { key: "Caps Lock", category: "brush", bn: "প্রিসিশন কার্সার অন/অফ", en: "Precise Cursor" },

    // --- VIEW & NAVIGATION ---
    { key: "Ctrl + R", category: "view", bn: "রুলার (Ruler) দেখানো বা লুকানো", en: "Rulers" },
    { key: "Ctrl + ;", category: "view", bn: "গাইড (Guides) দেখানো বা লুকানো", en: "Show Guides" },
    { key: "Ctrl + '", category: "view", bn: "গ্রিড (Grid) দেখানো বা লুকানো", en: "Show Grid" },
    { key: "Ctrl + 0", category: "view", bn: "স্ক্রিনের সাথে ইমেজ ফিট করা", en: "Fit on Screen" },
    { key: "Ctrl + 1", category: "view", bn: "আসল সাইজে দেখা (100%)", en: "Actual Pixels" },
    { key: "Ctrl + +", category: "view", bn: "জুম ইন (Zoom In)", en: "Zoom In" },
    { key: "Ctrl + -", category: "view", bn: "জুম আউট (Zoom Out)", en: "Zoom Out" },
    { key: "Spacebar (Hold)", category: "view", bn: "হ্যান্ড টুল নেভিগেশন", en: "Hand Tool (Hold)" },
    { key: "Tab", category: "view", bn: "সব প্যানেল লুকানো বা দেখানো", en: "Show/Hide Panels" },
    { key: "Shift + Tab", category: "view", bn: "শুধুমাত্র টুলবার ও ডান পাশের প্যানেল লুকানো", en: "Hide Side Panels" },

    // --- BLENDING MODES ---
    { key: "Shift + +", category: "blend", bn: "ব্লেন্ডিং মোড পরেরটিতে যাওয়া", en: "Next Blending Mode" },
    { key: "Shift + -", category: "blend", bn: "ব্লেন্ডিং মোড আগেরটিতে যাওয়া", en: "Previous Blending Mode" },
    { key: "Shift + Alt + N", category: "blend", bn: "নরমাল মোড (Normal Mode)", en: "Normal Mode" },
    { key: "Shift + Alt + M", category: "blend", bn: "মাল্টিপ্লাই মোড (Multiply)", en: "Multiply Mode" },
    { key: "Shift + Alt + S", category: "blend", bn: "স্ক্রিন মোড (Screen)", en: "Screen Mode" },
    { key: "Shift + Alt + O", category: "blend", bn: "ওভারলে মোড (Overlay)", en: "Overlay Mode" },
    { key: "Shift + Alt + H", category: "blend", bn: "হার্ড লাইট (Hard Light)", en: "Hard Light" },
    { key: "Shift + Alt + C", category: "blend", bn: "কালার মোড (Color)", en: "Color Blending" },

    // --- TEXT & TYPOGRAPHY ---
    { key: "Ctrl + Shift + L", category: "text", bn: "টেক্সট বামে রাখা (Align Left)", en: "Align Left" },
    { key: "Ctrl + Shift + C", category: "text", bn: "টেক্সট মাঝে রাখা (Align Center)", en: "Align Center" },
    { key: "Ctrl + Shift + R", category: "text", bn: "টেক্সট ডানে রাখা (Align Right)", en: "Align Right" },
    { key: "Ctrl + Shift + >", category: "text", bn: "টেক্সটের সাইজ বাড়ানো", en: "Increase Font Size" },
    { key: "Ctrl + Shift + <", category: "text", bn: "টেক্সটের সাইজ কমানো", en: "Decrease Font Size" },
    { key: "Alt + ↓ / ↑", category: "text", bn: "লাইন স্পেসিং পরিবর্তন (Leading)", en: "Change Leading" },
    { key: "Ctrl + Enter", category: "text", bn: "টেক্সট টাইপ সম্পন্ন করা (Commit)", en: "Commit Text Edit" },

    // --- FILTERS & SPECIAL ---
    { key: "Ctrl + Shift + X", category: "filter", bn: "লিকুইফাই ফিল্টার (Liquify)", en: "Liquify Filter" },
    { key: "Ctrl + Shift + A", category: "filter", bn: "ক্যামেরা র ফিল্টার (Camera Raw)", en: "Camera Raw Filter" },
    { key: "Ctrl + Alt + V", category: "filter", bn: "ভ্যানিশিং পয়েন্ট", en: "Vanishing Point" },
    { key: "Ctrl + F", category: "filter", bn: "সবশেষে ব্যবহৃত ফিল্টার আবার দেওয়া", en: "Apply Last Filter" }
];

let psLang = "bn";
let currentPsCat = "all";

function openPsShortcutsModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-ps-shortcuts');
    document.getElementById('psShortcutsModal').style.display = 'flex';
    renderPsShortcuts(psShortcutsData);
}

function closePsModal() {
    document.getElementById('psShortcutsModal').style.display = 'none';
}

function setPsLang(lang) {
    psLang = lang;
    document.getElementById('ps-btn-bn').classList.toggle('active', lang === 'bn');
    document.getElementById('ps-btn-en').classList.toggle('active', lang === 'en');
    
    const ui = {
        bn: { title: "ফটোশপ মাস্টার শর্টকাট", placeholder: "টুল বা কমান্ড লিখে সার্চ করুন..." },
        en: { title: "Photoshop Master Shortcuts", placeholder: "Search for tool or command..." }
    };
    
    document.getElementById('ps-ui-title').innerText = ui[lang].title;
    document.getElementById('ps-search-input').placeholder = ui[lang].placeholder;
    filterPsShortcuts();
}

function renderPsShortcuts(data) {
    const container = document.getElementById("ps-master-grid");
    container.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "ps-card-item";
        card.innerHTML = `
            <div class="ps-key-box">${item.key}</div>
            <div class="ps-desc-text">${psLang === 'bn' ? item.bn : item.en}</div>
        `;
        container.appendChild(card);
    });
}

function filterPsByCategory(cat) {
    currentPsCat = cat;
    document.querySelectorAll('.ps-cat-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase().includes(cat));
    });
    filterPsShortcuts();
}

function filterPsShortcuts() {
    const query = document.getElementById('ps-search-input').value.toLowerCase();
    const filtered = psShortcutsData.filter(item => {
        const matchesQuery = item.bn.toLowerCase().includes(query) || 
                             item.en.toLowerCase().includes(query) || 
                             item.key.toLowerCase().includes(query);
        const matchesCat = currentPsCat === "all" || item.category === currentPsCat;
        return matchesQuery && matchesCat;
    });
    renderPsShortcuts(filtered);
}
