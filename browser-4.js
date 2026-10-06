let activeBrowserCategory = 'all';

  // ==================== COMPREHENSIVE BROWSER DATABASE WITH OFFICIAL IMAGE LOGOS (64 ITEMS) ====================
  const browserDb = [
      // Category: Popular
      { name: "Google Chrome", category: "popular", logo: "https://www.google.com/chrome/static/images/chrome-logo-m100.svg", engine: "Blink (Chromium)", desc: "বিশ্বের সবচেয়ে জনপ্রিয় ও দ্রুতগতির ওয়েব ব্রাউজার। গুগল কর্তৃক তৈরি এই ব্রাউজারে রয়েছে সমৃদ্ধ এক্সটেনশন স্টোর এবং সর্বোচ্চ স্থিতিশীলতা।", url: "https://www.google.com/chrome/", win: true, android: true, ios: true, linux: true },
      { name: "Microsoft Edge", category: "popular", logo: "https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/section-images/2c3f3c46bd764335beec466a0acfde0e-png-w639.avif", engine: "Blink (Chromium)", desc: "মাইক্রোসফট-এর তৈরি আধুনিক ব্রাউজার, যাতে রয়েছে উন্নত এআই অ্যাসিস্ট্যান্ট, ব্যাটারি সেভিং মোড এবং দারুণ পারফরম্যান্স।", url: "https://www.microsoft.com/edge", win: true, android: true, ios: true, linux: true },
      { name: "Mozilla Firefox", category: "popular", logo: "https://play-lh.googleusercontent.com/jQAmlGUkuJGc4TjZs2OEUeB5Gy3dCpKCWqfgVmab5NvM_43oed2qhVhrlEajccjJV6VkDFCEXws_6t6StKKLTY4=w240-h480", engine: "Gecko", desc: "সম্পূর্ণ ওপেন-সোর্স ও স্বাধীন ওয়েব ব্রাউজার। ব্যবহারকারীর গোপনীয়তা রক্ষা ও অসাধারণ কাস্টমাইজেশন সুবিধার জন্য বিশ্বজুড়ে সমাদৃত।", url: "https://www.mozilla.org/firefox/", win: true, android: true, ios: true, linux: true },
      { name: "Apple Safari", category: "popular", logo: "https://www.apple.com/v/safari/u/images/overview/privacy_icon_safari__gdqq6axl0d6y_large.png", engine: "WebKit", desc: "অ্যাপল ডিভাইসের নিজস্ব বিল্ট-ইন ব্রাউজার। এটি আইফোন ও ম্যাকবুকের চার্জ সবচেয়ে সাশ্রয় করে এবং অত্যন্ত দ্রুত কাজ করে।", url: "https://www.apple.com/safari/", win: false, android: false, ios: true, linux: false },
      { name: "Opera", category: "popular", logo: "https://www-static-blogs.operacdn.com/news/wp-content/themes/opera-2022/static/img/logo.64d9b43037de76c75fa0a1a04d91f14e.svg", engine: "Blink (Chromium)", desc: "বিল্ট-ইন ফ্রি ভিপিএন, অ্যাড-ব্লকার, পপ-আপ মেসেঞ্জার এবং কাস্টম সাইডবার সম্পন্ন একটি প্রফেশনাল ব্রাউজার।", url: "https://www.opera.com/", win: true, android: true, ios: true, linux: true },
      { name: "Brave", category: "popular", logo: "https://brave.com/static-assets/images/brave-logo-sans-text.svg", engine: "Blink (Chromium)", desc: "ব্যক্তিগত নিরাপত্তা ও প্রাইভেসি রক্ষায় সেরা। এটি যেকোনো ওয়েবসাইটের বিজ্ঞাপন ও ট্র্যাকার স্বয়ংক্রিয়ভাবে ব্লক করে পেজের স্পিড বাড়িয়ে দেয়।", url: "https://brave.com/", win: true, android: true, ios: true, linux: true },
      { name: "Vivaldi", category: "popular", logo: "https://play-lh.googleusercontent.com/RNTChezdp-FkUkw6pldhlIi3uCeP_J6fQ0x5NwWfVV9tTdFZidR-z1V9MNVHww4sNdNLOQLw0yW6NJjVF1H0Fw=w240-h480", engine: "Blink (Chromium)", desc: "পাওয়ার ইউজার বা প্রফেশনালদের জন্য সেরা। এর ট্যাব ম্যানেজমেন্ট, বিল্ট-ইন নোটস এবং কাস্টমাইজেশন ফিচার সত্যিই দুর্দান্ত।", url: "https://vivaldi.com/", win: true, android: true, ios: true, linux: true },
      { name: "Arc Browser", category: "popular", logo: "https://arc.net/_next/image?url=%2Fapp-icon-windows.png&w=128&q=75", engine: "Blink (Chromium)", desc: "একটি বৈপ্লবিক ও দৃষ্টিনন্দন প্রোডাক্টিভিটি ব্রাউজার। এর আধুনিক সাইডবার, স্পেস এবং ট্যাব ম্যানেজমেন্ট কাজের গতি বাড়িয়ে দেয়।", url: "https://arc.net/", win: true, android: false, ios: true, linux: false },
      { name: "DuckDuckGo", category: "popular", logo: "https://play-lh.googleusercontent.com/R9-3PbO5ywKx6dA5OQI2wkesOpmgY9CzKhB_1Eqn-GC_vRjeqwtG-CLVs2o55wuRhiLS0pd1Sui_kUyn7Q4dng=w240-h480", engine: "Blink / WebKit", desc: "কোনো ট্র্যাকিং ছাড়াই নিরাপদ সার্চ ও ব্রাউজিংয়ের সুবিধা। এটি আপনার ব্রাউজিং ডাটা এক ক্লিকে সম্পূর্ণ ডিলিট করে দেয়।", url: "https://duckduckgo.com/app", win: true, android: true, ios: true, linux: false },
      { name: "Samsung Internet", category: "popular", logo: "https://play-lh.googleusercontent.com/mOALIZAY5JGaI1txlkeVvluM3QTRGmTbjGZcmrjqYdlz2f7asSPko05A5xCHZ_uczulElA_kOJq2rfjgoCyN=w240-h480", engine: "Blink (Chromium)", desc: "স্যামসাং মোবাইলের নিজস্ব ফাস্ট ব্রাউজার। এর ডার্ক মোড এবং সিকিউরিটি সেটিংস মোবাইল ইউজারদের কাছে অত্যন্ত জনপ্রিয়।", url: "https://www.samsung.com/us/apps/samsung-internet/", win: true, android: true, ios: false, linux: false },
      { name: "Yandex Browser", category: "popular", logo: "https://download-paranja.yandex.net/img/logo.svg", engine: "Blink (Chromium)", desc: "রাশিয়ান ডিজাইনের একটি দ্রুত ও সুরক্ষিত ব্রাউজার। এতে রয়েছে ক্লাউড হোস্টিং নিরাপত্তা এবং টার্বো মোড সুবিধা।", url: "https://browser.yandex.com/", win: true, android: true, ios: true, linux: true },
      { name: "UC Browser", category: "popular", logo: "https://play-lh.googleusercontent.com/afU1NqJY2fhNFsFs5PWZ6BdJ0Z0j6UWGLIDiXBu5fHQDySUWwMrvKP-oPXXlFFUUPOBCQsLBKaXy0dO0DE6INA=s160", engine: "U3 Engine", desc: "মোবাইলে হাই-স্পিড ডাউনলোডিং ও ডাটা সাশ্রয়ী ক্লাউড কম্প্রেসর সমৃদ্ধ একটি ক্লাসিক মোবাইল ব্রাউজার।", url: "https://www.ucweb.com/", win: true, android: true, ios: true, linux: false },
      { name: "Maxthon", category: "popular", logo: "https://play-lh.googleusercontent.com/H12Ij3IbS_GeqOky6acZKen0AeXmdLG3D1tFmOvjvYR8qZBwHzxhCCV-5yPkZhMn6iwOmAyXYXKdshvBC3Su7H0=w240-h480", engine: "Blink &amp; Trident", desc: "ক্লাউড সিনক্রোনাইজেশন, স্ক্রিন ক্যাপচার ও পাসওয়ার্ড ম্যানেজার সহ ডুয়াল-ইঞ্জিন বিশিষ্ট একটি জনপ্রিয় ব্রাউজার।", url: "https://www.maxthon.com/", win: true, android: true, ios: true, linux: true },
      { name: "Avast Secure Browser", category: "popular", logo: "https://www.avast.com/content/dam/avast/icon/40/secure-browser-color-1.svg", engine: "Blink (Chromium)", desc: "অ্যাভাস্ট অ্যান্টিভাইরাস টিম কর্তৃক তৈরি একটি অত্যন্ত নিরাপদ ব্রাউজার, যা ফিশিং ও ক্ষতিকর ম্যালওয়্যার ব্লক করে।", url: "https://www.avast.com/secure-browser", win: true, android: true, ios: true, linux: false },
      { name: "AVG Secure Browser", category: "popular", logo: "https://play-lh.googleusercontent.com/MUEPenG8G2r1HDdg3frgMkxYXv92Zy87kmLGux6tyKY3p0kikK27rmEtWYZNXy4upDUvg9ssNbbjvz1Bqjbh=w240-h480", engine: "Blink (Chromium)", desc: "এভিজি সিকিউরিটি ল্যাব দ্বারা প্রস্তুতকৃত বিশেষ নিরাপদ ব্রাউজার, যা ট্র্যাকিং ও বিজ্ঞাপন রোধ করে ব্রাউজিং নিরাপদ রাখে।", url: "https://www.avg.com/secure-browser", win: true, android: true, ios: true, linux: false },
      { name: "CCleaner Browser", category: "popular", logo: "https://cdn-uat.ccleaner.com/site/bfemltip/ccleaner_new_144x144.svg", engine: "Blink (Chromium)", desc: "একটি হালকা ও নিরাপদ ওয়েব ব্রাউজার, যাতে কম্পিউটারের অতিরিক্ত ক্যাশ ও আবর্জনা স্বয়ংক্রিয়ভাবে ক্লিন করার টুলস রয়েছে।", url: "https://www.ccleaner.com/ccleaner-browser", win: true, android: false, ios: false, linux: false },
{ 
    name: "Opera GX", 
    category: "popular", 
    logo: "https://images.seeklogo.com/logo-png/35/1/opera-gx-logo-png_seeklogo-354995.png", 
    engine: "Blink (Chromium)", 
    desc: "গেমারদের জন্য বিশেষভাবে তৈরি বিশ্বের প্রথম গেমিং ব্রাউজার। এতে রয়েছে সিপিইউ, র‍্যাম এবং নেটওয়ার্ক ব্যান্ডউইথ লিমিট করার বিশেষ গেমিং কন্ট্রোল প্যানেল।", 
    url: "https://www.opera.com/gx", 
    win: true, 
    android: true, 
    ios: true, 
    linux: false 
},
      // Category: Privacy
      { name: "Tor Browser", category: "privacy", logo: "https://img.alasofto.com/images/bKjR19M.png", engine: "Gecko (Firefox)", desc: "অনলাইন ট্র্যাকিং ও সেন্সরশিপ এড়ানোর শেষ কথা। এটি আপনার নেটওয়ার্ক ট্রাফিককে তিনটি আলাদা নোডে এনক্রিপ্ট করে নিরাপত্তা দেয়।", url: "https://www.torproject.org/", win: true, android: true, ios: false, linux: true },
      { name: "Mullvad Browser", category: "privacy", engine: "Gecko (Firefox)", desc: "টর টিমের সহায়তায় তৈরি করা হয়েছে। অনলাইন ট্র্যাকিং এড়াতে আপনার ডিজিটাল ফিঙ্গারপ্রিন্ট সম্পূর্ণ লুকিয়ে রাখে।", url: "https://mullvad.net/browser", win: true, android: false, ios: false, linux: true },
      { name: "LibreWolf", category: "privacy", logo: "https://img.alasofto.com/images/vY32b9M.png", engine: "Gecko", desc: "ফায়ারফক্সের একটি বিশেষ প্রাইভেট সংস্করণ। এতে ব্যাকগ্রাউন্ড ট্র্যাকিং এবং অপ্রয়োজনীয় ডাটা কালেকশন সম্পূর্ণ বন্ধ থাকে।", url: "https://librewolf.net/", win: true, android: false, ios: false, linux: true },
      { name: "Waterfox", category: "privacy", logo: "https://img.alasofto.com/images/6E4gRbd.png", engine: "Gecko", desc: "ফায়ারফক্সের একটি ক্লাসিক ও দ্রুতগতির সংস্করণ, যা পুরনো সব অ্যাড-অন এবং প্লাগইন সাপোর্ট করে।", url: "https://www.waterfox.com/", win: true, android: false, ios: false, linux: true },
      { name: "GNU IceCat", category: "privacy", engine: "Gecko", desc: "জিএনইউ (GNU) নির্দেশিকা মেনে তৈরি সম্পূর্ণ ফ্রি ব্রাউজার, যাতে কোনো ট্র্যাকিং স্ক্রিপ্ট বা ক্ষতিকর কোড থাকে না।", url: "https://www.gnu.org/software/gnuzilla/", win: false, android: false, ios: false, linux: true },
      { name: "Bromite", category: "privacy", engine: "Blink (Chromium)", desc: "অ্যান্ড্রয়েডের জন্য একটি সেরা ওপেন-সোর্স ব্রাউজার, যাতে রয়েছে বিল্ট-ইন শক্তিশালী অ্যাডব্লকার ও ডিএনএস সেটিংস।", url: "https://www.bromite.org/", win: false, android: true, ios: false, linux: false },
      { name: "Cromite", category: "privacy", engine: "Blink (Chromium)", desc: "ব্রোমাইটের আধুনিক উত্তরসূরি। এটি মোবাইলে বিজ্ঞাপন ও ট্র্যাকিং ব্লক করে অত্যন্ত দ্রুতগতির ব্রাউজিংয়ের নিশ্চয়তা দেয়।", url: "https://github.com/uazo/cromite", win: false, android: true, ios: false, linux: false },
      { name: "Epic Privacy Browser", category: "privacy", engine: "Blink (Chromium)", desc: "বিল্ট-ইন ফ্রি প্রক্সি, ট্র্যাকার ব্লক এবং কোনো সার্চ হিস্ট্রি সেভ না করার সুবিধা সম্পন্ন একটি অনন্য প্রাইভেট ব্রাউজার।", url: "https://epicbrowser.com/", win: true, android: true, ios: true, linux: false },
      { name: "Iridium Browser", category: "privacy", engine: "Blink (Chromium)", desc: "গুগলের সমস্ত গোপন ট্র্যাকিং কোড ছেঁটে ফেলে তৈরি করা একটি অতি সুরক্ষিত ডার্ক-থিম ক্রোমিয়াম ব্রাউজার।", url: "https://iridiumbrowser.de/", win: true, android: false, ios: false, linux: true },
      { name: "SRWare Iron", category: "privacy", engine: "Blink (Chromium)", desc: "গুগল ক্রোমের একটি চমৎকার বিকল্প। এটি ব্যাকগ্রাউন্ডে কোনো তথ্য গুগলে পাঠায় না এবং পিসিকে ফাস্ট রাখে।", url: "https://srware.net/iron/", win: true, android: true, ios: false, linux: true },
      { name: "Ghostery Browser", category: "privacy", engine: "Gecko (Firefox)", desc: "ঘোস্টারি ল্যাব কর্তৃক প্রস্তুতকৃত বিশেষ সিকিউরড ব্রাউজার, যা ট্র্যাকারদের সনাক্ত ও ব্লক করতে সক্ষম।", url: "https://www.ghostery.com/", win: true, android: true, ios: true, linux: false },
      { name: "Decentr Browser", category: "privacy", engine: "Blink (Chromium)", desc: "একটি ওয়েব-৩ ভিত্তিক ব্রাউজার, যা ব্যবহারকারীর সম্মতি নিয়ে ডেটা শেয়ারের মাধ্যমে ক্রিপ্টো টোকেন আয় করতে দেয়।", url: "https://decentr.net/", win: true, android: true, ios: true, linux: true },

      // Category: Firefox Forks
      { name: "Floorp", category: "firefox", logo: "https://img.alasofto.com/images/L7p4M0f.png", engine: "Gecko", desc: "জাপানের তৈরি ফায়ারফক্সের একটি আধুনিক রূপ। এর সাইডবার এবং কাস্টম ট্যাব সেটিংস প্রডাক্টিভিটি বাড়াতে সাহায্য করে।", url: "https://floorp.app/", win: true, android: false, ios: false, linux: true },
      { name: "Zen Browser", category: "firefox", logo: "https://img.alasofto.com/images/Yw1q7Lg.png", engine: "Gecko", desc: "অত্যন্ত আকর্ষণীয় ও মিনিমালিস্ট একটি ফায়ারফক্স ফোর্ক। এর ভার্টিকাল ট্যাব ও মেমোরি ম্যানেজমেন্ট অত্যন্ত চমৎকার।", url: "https://zen-browser.app/", win: true, android: false, ios: false, linux: true },
      { name: "Pale Moon", category: "firefox", engine: "Goanna (Firefox fork)", desc: "একটি ক্লাসিক লেআউট ব্রাউজার। এটি পুরনো ও হালকা ফায়ারফক্স থিম এবং অ্যাড-অনগুলোকে সমর্থন করে থাকে।", url: "https://www.palemoon.org/", win: true, android: false, ios: false, linux: true },
      { name: "Basilisk", category: "firefox", engine: "Goanna", desc: "পেল মুন ব্রাউজারের একটি সহযোগী ভার্সন। এটিও পুরনো ফায়ারফক্সের ক্লাসিক থিম এবং এক্সটেনশন চালাতে পারে।", url: "https://www.basilisk-browser.org/", win: true, android: false, ios: false, linux: true },
      { name: "SeaMonkey", category: "firefox", engine: "Gecko", desc: "অল-ইন-ওয়ান ইন্টারনেট সুইট। এটি একই সাথে ব্রাউজার, আইআরসি চ্যাট ক্লায়েন্ট, ই-মেইল রিডার ও এইচটিএমএল এডিটর হিসেবে কাজ করে।", url: "https://www.seamonkey-project.org/", win: true, android: false, ios: false, linux: true },
      { name: "Fennec F-Droid", category: "firefox", engine: "Gecko", desc: "অ্যান্ড্রয়েডের জন্য ফায়ারফক্সের একটি ট্র্যাকিং-মুক্ত রূপ। এটি সম্পূর্ণ ফ্রি এবং F-Droid স্টোরে পাওয়া যায়।", url: "https://f-droid.org/packages/org.mozilla.fennec_fdroid/", win: false, android: true, ios: false, linux: false },

      // Category: Chromium
      { name: "Chromium", category: "chromium", logo: "https://img.alasofto.com/images/o6vYgY9.png", engine: "Blink", desc: "গুগল ক্রোম এবং মাইক্রোসফট এজ থিমের মূল ওপেন-সোর্স সোর্স-কোড। এটি সম্পূর্ণ লাইটওয়েট এবং অতিরিক্ত গুগল ট্র্যাকিং মুক্ত।", url: "https://www.chromium.org/", win: true, android: false, ios: false, linux: true },
      { name: "Ungoogled Chromium", category: "chromium", engine: "Blink", desc: "গুগলের সমস্ত ব্যাকগ্রাউন্ড ট্র্যাকিং, ক্লাউড কানেকশন ও ডিপেন্ডেন্সি সম্পূর্ণ ছেঁটে ফেলে তৈরি করা একটি অতি সুরক্ষিত ক্রোমিয়াম।", url: "https://github.com/ungoogled-software/ungoogled-chromium", win: true, android: true, ios: false, linux: true },
      { name: "Thorium", category: "chromium", engine: "Blink (AVX optimized)", desc: "কম্পিউটারের প্রসেসরের গতিকে সর্বোচ্চ ব্যবহার করে তৈরি করা বিশ্বের অন্যতম দ্রুততম ও লাইটওয়েট ব্রাউজার।", url: "https://thorium.rocks/", win: true, android: false, ios: false, linux: true },
      { name: "Cent Browser", category: "chromium", engine: "Blink", desc: "একটি শক্তিশালী ক্রোমিয়াম ফোর্ক যাতে রয়েছে মাউস জেসচার, ট্যাব লেজি-লোডিং এবং মেমোরি অটো-রিলিজ ফিচার।", url: "https://www.centbrowser.com/", win: true, android: false, ios: false, linux: false },
      { name: "Slimjet", category: "chromium", engine: "Blink", desc: "বিল্ট-ইন ইউটিউব ডাউনলোডার, ফাইল কম্প্রেসর এবং শক্তিশালী অ্যাড-ব্লকার সমৃদ্ধ একটি হাই-স্পিড ক্রোমিয়াম ব্রাউজার।", url: "https://www.slimjet.com/", win: true, android: false, ios: false, linux: true },

      // Category: Lightweight
      { name: "Falkon", category: "lightweight", engine: "QtWebEngine", desc: "লিনাক্স ও কেডিই (KDE) ডেস্কটপের অতি হালকা ব্রাউজার। এটি খুবই কম র‍্যাম ব্যবহার করে চলে এবং অ্যাডব্লক যুক্ত রয়েছে।", url: "https://www.falkon.org/", win: true, android: false, ios: false, linux: true },
      { name: "Midori Browser", category: "lightweight", logo: "https://img.alasofto.com/images/67vK9rP.png", engine: "Webkit / Gecko", desc: "পুরনো কম্পিউটার বা লো-এন্ড পিসির জন্য বিশেষভাবে তৈরি একটি চমৎকার হালকা ওপেন-সোর্স ব্রাউজার।", url: "https://astian.org/midori-browser/", win: true, android: true, ios: false, linux: true },
      { name: "GNOME Web (Epiphany)", category: "lightweight", engine: "WebKit", desc: "লিনাক্স ডেক্সটপ এনভায়রনমেন্টের অফিশিয়াল মিনিমালিস্ট ব্রাউজার। এটি খুবই ক্লিন এবং জিপিইউ বুস্ট সাপোর্টেড।", url: "https://apps.gnome.org/Web/", win: false, android: false, ios: false, linux: true },
      { name: "Dillo", category: "lightweight", engine: "Dillo Engine", desc: "বিশ্বের অন্যতম ক্ষুদ্র ও দ্রুততম গ্রাফিক্যাল ব্রাউজার। এটি মাত্র কয়েক মেগাবাইটে পেজ লোড করে নিতে পারে।", url: "https://dillo-browser.github.io/", win: false, android: false, ios: false, linux: true },
      { name: "Dooble", category: "lightweight", engine: "QtWebEngine", desc: "একটি সুরক্ষিত ওপেন-সোর্স ব্রাউজার, যাতে কুকি ও থার্ড-পার্টি ট্র্যাকার স্বয়ংক্রিয়ভাবে ব্লক করার সুবিধা রয়েছে।", url: "https://textbrowser.github.io/dooble/", win: true, android: false, ios: false, linux: true },
      { name: "qutebrowser", category: "lightweight", engine: "QtWebEngine", desc: "কীবোর্ড-শর্টকাট প্রেমীদের জন্য বিশেষ ব্রাউজার। মাউস ছাড়াই সম্পূর্ণ কিবোর্ড দিয়ে ব্রাউজিং করা সম্ভব।", url: "https://qutebrowser.org/", win: false, android: false, ios: false, linux: true },
      { name: "Nyxt", category: "lightweight", engine: "WebKit", desc: "প্রোগ্রামারদের জন্য বিশেষভাবে তৈরি ব্রাউজার। এটি সম্পূর্ণ লিস্প (Lisp) কোডিং দিয়ে কাস্টমাইজ করা সম্ভব।", url: "https://nyxt.atlas.engineer/", win: false, android: false, ios: false, linux: true },
      { name: "Browsh", category: "lightweight", engine: "Text-Based", desc: "টার্মিনাল বা কমান্ড-লাইন কনসোলের ভেতর ছবি, ভিডিও এবং সম্পূর্ণ ওয়েব পেজ টেক্সট আকারে রেন্ডার করার ব্রাউজার।", url: "https://www.brow.sh/", win: false, android: false, ios: false, linux: true },
      { name: "BadWolf", category: "lightweight", engine: "WebKit", desc: "লিনাক্স ডিস্ট্রোর জন্য অত্যন্ত ক্ষুদ্র ও লাইটওয়েট একটি ব্রাউজার, যাতে রয়েছে কাস্টম জাভাস্ক্রিপ্ট অন/অফ টগল।", url: "https://hacktivis.me/projects/badwolf", win: false, android: false, ios: false, linux: true },

      // Category: AI & Productivity
      { name: "SigmaOS", category: "ai", engine: "WebKit", desc: "ম্যাক ও আইওএসের জন্য তৈরি এআই কো-পাইলট সম্পন্ন একটি দৃষ্টিনন্দন প্রডাক্টিভিটি ও ওয়ার্কস্পেস ব্রাউজার।", url: "https://sigmaos.com/", win: false, android: false, ios: true, linux: false },
      { name: "Dia Browser", category: "ai", engine: "Blink (Chromium)", desc: "ভয়েস নেভিগেশন ও এআই অটো-সামারাইজার সম্পন্ন একটি আধুনিক ও নিরাপদ মোবাইল ব্রাউজার।", url: "https://www.diabrowser.com/", win: false, android: true, ios: true, linux: false },
      { name: "Perplexity Comet", category: "ai", engine: "Blink", desc: "পারপ্লেক্সিটি এআই টিম কর্তৃক তৈরি বিশেষ ব্রাউজার ওয়ার্কস্পেস, যা নিখুঁত রিসার্চ ও ডাটা ফাইন্ড করতে সাহায্য করে।", url: "https://www.perplexity.ai/", win: true, android: false, ios: true, linux: false },
      { name: "Opera Neon", category: "ai", engine: "Blink (Chromium)", desc: "অপেরার তৈরি ফিউচারিস্টিক ব্রাউজার প্রোটোটাইপ। বাবল-ট্যাব ইন্টারফেসের কারণে এটি দেখতে অসাধারণ লাগে।", url: "https://www.opera.com/neon", win: true, android: false, ios: false, linux: false },
      { name: "Fellou AI", category: "ai", engine: "Blink", desc: "বিল্ট-ইন অন-ডিভাইস এআই মডেল সম্পন্ন একটি আধুনিক ও শক্তিশালী ব্রাউজার, যা কাজের গতি বাড়িয়ে দেয়।", url: "https://fellou.ai/", win: true, android: false, ios: false, linux: false },

      // Category: Mobile Only
      { name: "Opera Mini", category: "mobile", engine: "Presto / Opera Cloud", desc: "মোবাইলের মেমোরি ও ডাটা বাঁচাতে বিশ্বের সবচেয়ে জনপ্রিয় ও ঐতিহ্যবাহী লাইটওয়েট ক্লাউড ব্রাউজার।", url: "https://www.opera.com/mobile/mini", win: false, android: true, ios: true, linux: false },
      { name: "Kiwi Browser", category: "mobile", engine: "Blink (Chromium)", desc: "অ্যান্ড্রয়েড ফোনের জন্য সেরা ব্রাউজার। এটি মোবাইলেই কম্পিউটারের যেকোনো ক্রোম এক্সটেনশন ব্যবহার করার সুবিধা দেয়।", url: "https://kiwibrowser.com/", win: false, android: true, ios: false, linux: false }
  ];

  // ৩. ডাইনামিক ক্যাটাগরি সুইচিং লজিক
  function switchBrowserCategory(catId) {
      activeBrowserCategory = catId;
      
      // বাটনের অ্যাক্টিভ ক্লাস সিঙ্ক করবে
      document.querySelectorAll('.bd-tab-btn').forEach(btn => {
          btn.classList.remove('active');
      });
      const targetBtn = document.getElementById(`btn-cat-${catId}`);
      if (targetBtn) targetBtn.classList.add('active');

      // সার্চ ইনপুট ক্লিয়ার করবে
      document.getElementById('bdSearchInput').value = '';

      renderBrowserGrid(catId);
  }

  // ৪. ডাইনামিক ব্রাউজার রেন্ডারার
  function renderBrowserGrid(category) {
      const grid = document.getElementById('bdResultScrollGrid');
      if (!grid) return;
      grid.innerHTML = ''; // ক্লিয়ার লোডার

      const filtered = browserDb.filter(browser => {
          return category === 'all' || browser.category === category;
      });

      populateGridItems(filtered);
  }

  // ৫. লাইভ সার্চ এবং চ্যানেল গ্রিড পপুলেটর
  function filterBrowsersDirectory() {
      const query = document.getElementById('bdSearchInput').value.toLowerCase().trim();
      
      // সব ফিল্টারিং ক্লিয়ার করে ক্যাটাগরি 'All'-এ নিয়ে যাবে সার্চিং এর সময়
      document.querySelectorAll('.bd-tab-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById('btn-cat-all').classList.add('active');

      const filtered = browserDb.filter(browser => {
          return browser.name.toLowerCase().includes(query) || 
                 browser.engine.toLowerCase().includes(query) || 
                 browser.desc.toLowerCase().includes(query);
      });

      populateGridItems(filtered);
  }

  // ৬. ডম রেন্ডার করার হেল্পার ফাংশন (NEW UPDATE - লোগো এবং কালার ফিক্স সহ)
  function populateGridItems(list) {
      const grid = document.getElementById('bdResultScrollGrid');
      if (!grid) return;
      grid.innerHTML = ''; // ক্লিয়ার করবে

      if (list.length === 0) {
          grid.innerHTML = '<div style="color: #64748b; padding: 40px; text-align: center; grid-column: 1/-1;">কোনো ব্রাউজার খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম লিখে সার্চ করুন।</div>';
          return;
      }

      list.forEach(browser => {
          const card = document.createElement('div');
          card.className = 'bd-browser-card';

          // ফ্ল্যাটফর্ম কম্প্যাটিবিলিটি আইকন প্রিপারেশন
          const platformsHtml = `
            <i class="fa-brands fa-windows ${browser.win ? 'supported' : ''}" title="Windows Support"></i>
            <i class="fa-brands fa-android ${browser.android ? 'supported' : ''}" title="Android Support"></i>
            <i class="fa-brands fa-apple ${browser.ios ? 'supported' : ''}" title="iOS/macOS Support"></i>
            <i class="fa-brands fa-linux ${browser.linux ? 'supported' : ''}" title="Linux Support"></i>
          `;

          // লোগো রেন্ডারিং লজিক (ইমেজ থাকলে ইমেজ রেন্ডার হবে, না থাকলে নামের প্রথম অক্ষর বসবে)
          let logoHtml = `<div class="bd-icon-wrap">${browser.name.charAt(0)}</div>`;
          if (browser.logo && browser.logo.startsWith('http')) {
              logoHtml = `
                <div class="bd-icon-wrap">
                  <img src="${browser.logo}" alt="${browser.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                  <span class="channel-logo-fallback" style="display:none; font-size:18px; color:#2563eb; font-weight:bold;">${browser.name.charAt(0)}</span>
                </div>
              `;
          }

          card.innerHTML = `
            <div>
              <div class="bd-card-header">
                ${logoHtml}
                <div class="bd-title-box">
                  <h4 class="bd-name" title="${browser.name}">${browser.name}</h4>
                  <div class="bd-engine">Engine: ${browser.engine}</div>
                </div>
              </div>
              <p class="bd-desc" title="${browser.desc}">${browser.desc}</p>
            </div>
            <div>
              <div class="bd-platforms">
                ${platformsHtml}
              </div>
              <a class="bd-dl-btn" href="${browser.url}" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-cloud-arrow-down"></i> ডাউনলোড করুন
              </a>
            </div>
          `;
          grid.appendChild(card);
      });
  }

  // মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক (তাত্ক্ষণিকভাবে ওপেন হবে) [1.1.2]
  function openBrowserDirectoryModal() {
      setActiveMode('mode-browser-directory'); // বাটন হাইলাইট করবে
      const modal = document.getElementById('browserDirectoryModal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে [1.1.2]
          renderBrowserGrid('all'); // সব ব্রাউজার প্রথম লোডে রেন্ডার করবে
      }
  }

  function closeBrowserDirectoryModal() {
      const modal = document.getElementById('browserDirectoryModal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল পুনরায় সচল হবে [1.1.2]
          document.getElementById('bdSearchInput').value = ''; // সার্চ ক্লিয়ার করবে
      }
  }
