
  let currentCategory = 'all';

  // ১. মোডাল অ্যাক্টিভেশন ও সিলেক্টিভ ওপেনিং লজিক
  function openCgptShortcodeModal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-chatgpt-shortcode');
      const modal = document.getElementById('cgptShortcodeModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক [1.1.2]
      }
      renderShortcodes(); // শর্টকোড ডাটা রেন্ডার করবে
  }

  function closeCgptShortcodeModal() {
      const modal = document.getElementById('cgptShortcodeModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল সচল [1.1.2]
      }
      hideCategoryMenu();
  }

  // ক্যাটাগরি মেনু টগল লজিক
  function toggleCategoryMenu() {
      const menu = document.getElementById('scCategoryMenu');
      if (menu) menu.classList.toggle('show');
  }

  function hideCategoryMenu() {
      const menu = document.getElementById('scCategoryMenu');
      if (menu) menu.classList.remove('show');
  }

  // Master Dataset (500+ Shortcodes)
  const shortcodeDb = [
    // ----------------- 🔥 TRENDING CAMERA ANGLES & PERSPECTIVES -----------------
    { code: "/WormsEye", bn: "একদম নিচ থেকে ওপরের দিকে ছবি", cat: "trending", isTrend: true },
    { code: "/BirdsEye", bn: "পাখির চোখের মতো ওপর থেকে দৃশ্য", cat: "trending", isTrend: true },
    { code: "/HighAngle", bn: "ওপর থেকে নিচের দিকে ছবি", cat: "trending", isTrend: true },
    { code: "/LowAngle", bn: "নিচ থেকে ওপরের দিকে ছবি", cat: "trending", isTrend: true },
    { code: "/EyeLevel", bn: "চোখের সমান উচ্চতা থেকে ছবি", cat: "trending", isTrend: true },
    { code: "/DutchAngle", bn: "ক্যামেরা কাত করে ছবি", cat: "trending", isTrend: true },
    { code: "/Overhead", bn: "সরাসরি মাথার ওপর থেকে ছবি", cat: "trending", isTrend: true },
    { code: "/TopDown", bn: "ওপর থেকে সরাসরি নিচের দৃশ্য", cat: "trending", isTrend: true },
    { code: "/GroundLevel", bn: "মাটির কাছ থেকে ছবি", cat: "trending", isTrend: true },
    { code: "/POV", bn: "নিজের চোখে দেখা দৃশ্যের মতো ছবি", cat: "trending", isTrend: true },
    { code: "/CloseUp", bn: "মুখের কাছের ছবি", cat: "trending", isTrend: true },
    { code: "/ExtremeCloseUp", bn: "মুখের খুব কাছের ছবি", cat: "trending", isTrend: true },
    { code: "/MediumShot", bn: "কোমর পর্যন্ত ছবি", cat: "trending", isTrend: true },
    { code: "/FullBody", bn: "মাথা থেকে পা পর্যন্ত ছবি", cat: "trending", isTrend: true },
    { code: "/WideShot", bn: "প্রশস্ত দৃশ্যসহ ছবি", cat: "trending", isTrend: true },
    { code: "/CinematicShot", bn: "সিনেমার মতো ফ্রেম", cat: "trending", isTrend: true },
    { code: "/HeroShot", bn: "শক্তিশালী Hero Pose", cat: "trending", isTrend: true },
    { code: "/SilhouetteShot", bn: "ছায়ামূর্তির মতো ছবি", cat: "trending", isTrend: true },
    { code: "/Bokeh", bn: "ব্যাকগ্রাউন্ডে সুন্দর Blur", cat: "trending", isTrend: true },
    { code: "/StandingPose", bn: "দাঁড়ানো পোজ", cat: "trending", isTrend: true },
    { code: "/SittingPose", bn: "বসা পোজ", cat: "trending", isTrend: true },
    { code: "/DroneShot", bn: "ড্রোন ক্যামেরার দৃশ্য", cat: "trending", isTrend: true },

    // ----------------- ১. Face & Skin Retouching -----------------
    { code: "/SkinRetouch", bn: "ত্বকের দাগছোপ দূর করে সুন্দর করা।", cat: "face" },
    { code: "/SkinSmoothing", bn: "ত্বক মসৃণ করা।", cat: "face" },
    { code: "/NaturalSkin", bn: "ত্বকের স্বাভাবিক টেক্সচার বজায় রাখা।", cat: "face" },
    { code: "/FaceRetouch", bn: "সম্পূর্ণ মুখের সৌন্দর্য বৃদ্ধি।", cat: "face" },
    { code: "/FaceEnhance", bn: "মুখের গুণগত মান উন্নত করা।", cat: "face" },
    { code: "/BlemishRemoval", bn: "মুখের ছোট দাগ দূর করা।", cat: "face" },
    { code: "/AcneRemoval", bn: "ব্রণের দাগ দূর করা।", cat: "face" },
    { code: "/PimpleRemoval", bn: "মুখের ব্রণ মুছে ফেলা।", cat: "face" },
    { code: "/DarkSpotRemoval", bn: "কালো দাগ দূর করা।", cat: "face" },
    { code: "/WrinkleRemoval", bn: "মুখের বলিরেখা কমানো।", cat: "face" },
    { code: "/FineLineRemoval", bn: "সূক্ষ্ম রেখা দূর করা।", cat: "face" },
    { code: "/UnderEyeCorrection", bn: "চোখের নিচের কালচে ভাব ঠিক করা।", cat: "face" },
    { code: "/DarkCircleRemoval", bn: "চোখের নিচের ডার্ক সার্কেল দূর করা।", cat: "face" },
    { code: "/EyeBagRemoval", bn: "চোখের নিচের ফোলা ভাব কমানো।", cat: "face" },
    { code: "/FaceBrightening", bn: "মুখ উজ্জ্বল করা।", cat: "face" },
    { code: "/SkinBrightening", bn: "ত্বকের উজ্জ্বলতা বাড়ানো।", cat: "face" },
    { code: "/SkinToneCorrection", bn: "ত্বকের রঙের ভারসাম্য ঠিক করা।", cat: "face" },
    { code: "/SkinToneEvening", bn: "ত্বকের অসম রঙ সমান করা।", cat: "face" },
    { code: "/ComplexionEnhance", bn: "মুখের সামগ্রিক রঙ উন্নত করা।", cat: "face" },
    { code: "/NaturalGlow", bn: "মুখে প্রাকৃতিক উজ্জ্বলতা আনা।", cat: "face" },
    { code: "/HealthySkin", bn: "স্বাস্থ্যোজ্জ্বল ত্বকের লুক তৈরি।", cat: "face" },
    { code: "/DewySkin", bn: "শিশিরভেজা উজ্জ্বল ত্বকের ইফেক্ট।", cat: "face" },
    { code: "/MatteSkin", bn: "অতিরিক্ত তেলতেলে ভাব ছাড়া ম্যাট লুক।", cat: "face" },
    { code: "/PorcelainSkin", bn: "মসৃণ চীনামাটির মতো ত্বকের ইফেক্ট।", cat: "face" },
    { code: "/FreckleRemoval", bn: "মুখের ছোট ছোট ছোপ দূর করা।", cat: "face" },
    { code: "/MoleRemoval", bn: "তিল অপসারণ করা।", cat: "face" },
    { code: "/ScarRemoval", bn: "ক্ষত বা পুরোনো দাগ দূর করা।", cat: "face" },
    { code: "/TexturePreserve", bn: "ত্বকের স্বাভাবিক টেক্সচার অক্ষুণ্ণ রাখা।", cat: "face" },
    { code: "/PoreReduction", bn: "ত্বকের দৃশ্যমান রোমকূপ কমানো।", cat: "face" },
    { code: "/OilControl", bn: "মুখের অতিরিক্ত তেলতেলে ভাব কমানো।", cat: "face" },
    { code: "/FaceSymmetry", bn: "মুখের দুই পাশের সামঞ্জস্য উন্নত করা।", cat: "face" },
    { code: "/JawlineEnhance", bn: "চোয়ালের গঠন স্পষ্ট করা।", cat: "face" },
    { code: "/CheekboneEnhance", bn: "গালের হাড়ের গঠন ফুটিয়ে তোলা।", cat: "face" },
    { code: "/ChinEnhance", bn: "থুতনির আকৃতি উন্নত করা।", cat: "face" },
    { code: "/NoseEnhance", bn: "নাকের দৃশ্যমান গঠন উন্নত করা।", cat: "face" },
    { code: "/LipEnhance", bn: "ঠোঁটের সৌন্দর্য ও স্পষ্টতা বাড়ানো।", cat: "face" },
    { code: "/LipColorCorrection", bn: "ঠোঁটের রঙ ঠিক করা।", cat: "face" },
    { code: "/TeethWhitening", bn: "দাঁত সাদা করা।", cat: "face" },
    { code: "/SmileEnhance", bn: "হাসির সৌন্দর্য বৃদ্ধি করা।", cat: "face" },
    { code: "/EyeEnhance", bn: "চোখের সৌন্দর্য ও স্পষ্টতা বাড়ানো।", cat: "face" },
    { code: "/EyeWhitening", bn: "চোখের সাদা অংশ পরিষ্কার দেখানো।", cat: "face" },
    { code: "/IrisEnhance", bn: "চোখের মণির রঙ ও ডিটেইল উন্নত করা।", cat: "face" },
    { code: "/EyebrowEnhance", bn: "ভ্রুর গঠন ও স্পষ্টতা বাড়ানো।", cat: "face" },
    { code: "/EyelashEnhance", bn: "চোখের পাপড়ি স্পষ্ট করা।", cat: "face" },
    { code: "/FaceSlimming", bn: "মুখের গঠন সরু দেখানো।", cat: "face" },
    { code: "/FaceReshape", bn: "মুখের আকৃতি পরিবর্তন করা।", cat: "face" },
    { code: "/DoubleChinRemoval", bn: "থুতনির নিচের অতিরিক্ত ভাঁজ কমানো।", cat: "face" },
    { code: "/ExpressionEnhance", bn: "মুখের অভিব্যক্তি উন্নত করা।", cat: "face" },
    { code: "/AgeReduction", bn: "তুলনামূলক কম বয়সী লুক তৈরি করা।", cat: "face" },
    { code: "/IdentityPreserve", bn: "ব্যক্তির আসল চেহারা ও পরিচয় অক্ষুণ্ণ রাখা।", cat: "face" },

    // ----------------- ২. Hair & Grooming -----------------
    { code: "/HairEnhance", bn: "চুলের গুণগত মান উন্নত করা।", cat: "hair" },
    { code: "/HairSmoothing", bn: "চুল মসৃণ করা।", cat: "hair" },
    { code: "/HairShine", bn: "চুলে উজ্জ্বলতা আনা।", cat: "hair" },
    { code: "/HairVolume", bn: "চুল ঘন দেখানো।", cat: "hair" },
    { code: "/HairDensity", bn: "চুলের ঘনত্ব বাড়ানো।", cat: "hair" },
    { code: "/HairColorChange", bn: "চুলের রঙ পরিবর্তন করা।", cat: "hair" },
    { code: "/HairColorCorrection", bn: "চুলের রঙ ঠিক করা।", cat: "hair" },
    { code: "/BlackHair", bn: "চুল কালো করা।", cat: "hair" },
    { code: "/BrownHair", bn: "চুল বাদামি করা।", cat: "hair" },
    { code: "/BlondeHair", bn: "চুল সোনালি করা।", cat: "hair" },
    { code: "/GrayHairRemoval", bn: "পাকা চুল কালো করা।", cat: "hair" },
    { code: "/HairlineCorrection", bn: "চুলের সামনের লাইন ঠিক করা।", cat: "hair" },
    { code: "/HairFlyawayRemoval", bn: "এলোমেলো চুল সরানো।", cat: "hair" },
    { code: "/SplitEndRemoval", bn: "চুলের ফাটা অংশ ঠিক করা।", cat: "hair" },
    { code: "/BaldSpotCorrection", bn: "মাথার ফাঁকা অংশে চুলের উপস্থিতি বাড়ানো।", cat: "hair" },
    { code: "/HairstyleChange", bn: "চুলের স্টাইল পরিবর্তন করা।", cat: "hair" },
    { code: "/ShortHair", bn: "ছোট চুলের স্টাইল তৈরি করা।", cat: "hair" },
    { code: "/LongHair", bn: "লম্বা চুলের স্টাইল তৈরি করা।", cat: "hair" },
    { code: "/CurlyHair", bn: "কোঁকড়ানো চুল তৈরি করা।", cat: "hair" },
    { code: "/StraightHair", bn: "সোজা চুল তৈরি করা।", cat: "hair" },
    { code: "/WavyHair", bn: "ঢেউ খেলানো চুল তৈরি করা।", cat: "hair" },
    { code: "/MessyHair", bn: "অগোছালো চুলের স্টাইল তৈরি করা।", cat: "hair" },
    { code: "/SidePartHair", bn: "এক পাশে সিঁথি করা।", cat: "hair" },
    { code: "/MiddlePartHair", bn: "মাঝখানে সিঁথি করা।", cat: "hair" },
    { code: "/UndercutHair", bn: "আন্ডারকাট হেয়ারস্টাইল তৈরি করা।", cat: "hair" },
    { code: "/FadeHaircut", bn: "ফেড হেয়ারকাট তৈরি করা।", cat: "hair" },
    { code: "/BuzzCut", bn: "খুব ছোট চুলের স্টাইল তৈরি করা।", cat: "hair" },
    { code: "/PompadourHair", bn: "পম্পাডর স্টাইল তৈরি করা।", cat: "hair" },
    { code: "/QuiffHair", bn: "কুইফ হেয়ারস্টাইল তৈরি করা।", cat: "hair" },
    { code: "/TexturedHair", bn: "চুলে টেক্সচার ও ডিটেইল যোগ করা।", cat: "hair" },
    { code: "/BeardEnhance", bn: "দাড়ির গঠন উন্নত করা।", cat: "hair" },
    { code: "/BeardRemoval", bn: "দাড়ি মুছে ফেলা।", cat: "hair" },
    { code: "/BeardTrim", bn: "দাড়ি ছাঁটা ও পরিপাটি করা।", cat: "hair" },
    { code: "/FullBeard", bn: "পূর্ণ দাড়ির লুক তৈরি করা।", cat: "hair" },
    { code: "/StubbleBeard", bn: "হালকা দাড়ির লুক তৈরি করা।", cat: "hair" },
    { code: "/MustacheEnhance", bn: "গোঁফের গঠন স্পষ্ট করা।", cat: "hair" },
    { code: "/MustacheRemoval", bn: "গোঁফ মুছে ফেলা।", cat: "hair" },
    { code: "/CleanShaven", bn: "দাড়ি-গোঁফ ছাড়া মুখ তৈরি করা।", cat: "hair" },
    { code: "/SideburnEnhance", bn: "সাইডবার্ন স্পষ্ট করা।", cat: "hair" },
    { code: "/HairAndBeardStyle", bn: "চুল ও দাড়ির সমন্বিত স্টাইল তৈরি করা।", cat: "hair" },
    { code: "/NaturalMakeup", bn: "প্রাকৃতিক মেকআপ লুক তৈরি করা।", cat: "hair" },
    { code: "/SoftGlamMakeup", bn: "হালকা গ্ল্যামারাস মেকআপ।", cat: "hair" },
    { code: "/BridalMakeup", bn: "বধূ সাজ তৈরি করা।", cat: "hair" },
    { code: "/ProfessionalMakeup", bn: "পেশাদার মেকআপ তৈরি করা।", cat: "hair" },
    { code: "/LipstickApply", bn: "ঠোঁটে লিপস্টিক যোগ করা।", cat: "hair" },
    { code: "/EyelinerApply", bn: "চোখে আইলাইনার যোগ করা।", cat: "hair" },
    { code: "/MascaraApply", bn: "চোখের পাপড়িতে মাসকারা যোগ করা।", cat: "hair" },
    { code: "/BlushApply", bn: "গালে ব্লাশ যোগ করা।", cat: "hair" },
    { code: "/ContourMakeup", bn: "মুখে কনট্যুর মেকআপ করা।", cat: "hair" },
    { code: "/MakeupRemoval", bn: " মুখের মেকআপ মুছে স্বাভাবিক লুক তৈরি করা।", cat: "hair" },

    // ----------------- ৩. Background Editing -----------------
    { code: "/BackgroundRemoval", bn: "ছবির ব্যাকগ্রাউন্ড মুছে ফেলা।", cat: "bg" },
    { code: "/BackgroundReplace", bn: "ব্যাকগ্রাউন্ড পরিবর্তন করা।", cat: "bg" },
    { code: "/WhiteBackground", bn: "সাদা ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/BlackBackground", bn: "কালো ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/TransparentBackground", bn: "স্বচ্ছ ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/StudioBackground", bn: "স্টুডিও ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/OfficeBackground", bn: "অফিসের ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/CorporateBackground", bn: "কর্পোরেট পরিবেশের ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/LuxuryBackground", bn: "বিলাসবহুল ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/MinimalBackground", bn: "সাধারণ ও মিনিমাল ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/GradientBackground", bn: "গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/BlurBackground", bn: "ব্যাকগ্রাউন্ড ঝাপসা করা।", cat: "bg" },
    { code: "/BokehBackground", bn: "আলোর বোকেহ ইফেক্টসহ ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/NatureBackground", bn: "প্রকৃতির দৃশ্য যোগ করা।", cat: "bg" },
    { code: "/ForestBackground", bn: "বনের ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/MountainBackground", bn: "পাহাড়ের ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/BeachBackground", bn: "সমুদ্রসৈকতের ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/SeaBackground", bn: "সমুদ্রের দৃশ্য যোগ করা।", cat: "bg" },
    { code: "/SkyBackground", bn: "আকাশের ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/SunsetBackground", bn: "সূর্যাস্তের দৃশ্য তৈরি করা।", cat: "bg" },
    { code: "/SunriseBackground", bn: "সূর্যোদয়ের দৃশ্য তৈরি করা।", cat: "bg" },
    { code: "/NightBackground", bn: "রাতের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/CityBackground", bn: "শহরের ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/StreetBackground", bn: "রাস্তার দৃশ্য যোগ করা।", cat: "bg" },
    { code: "/UrbanBackground", bn: "আধুনিক শহুরে পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/VillageBackground", bn: "গ্রামের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/GardenBackground", bn: "বাগানের দৃশ্য তৈরি করা।", cat: "bg" },
    { code: "/FlowerBackground", bn: "ফুলের ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/ParkBackground", bn: "পার্কের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/IndoorBackground", bn: "ঘরের ভেতরের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/OutdoorBackground", bn: "বাইরের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/RoomBackground", bn: "ঘরের ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/BedroomBackground", bn: "বেডরুমের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/LivingRoomBackground", bn: "বসার ঘরের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/LuxuryHotelBackground", bn: "বিলাসবহুল হোটেলের পরিবেশ।", cat: "bg" },
    { code: "/RestaurantBackground", bn: "রেস্টুরেন্টের ব্যাকগ্রাউন্ড তৈরি করা।", cat: "bg" },
    { code: "/CafeBackground", bn: "ক্যাফের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/LibraryBackground", bn: "লাইব্রেরির পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/ClassroomBackground", bn: "ক্লাসরুমের ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/UniversityBackground", bn: "বিশ্ববিদ্যালয়ের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/AirportBackground", bn: "বিমানবন্দরের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/ShoppingMallBackground", bn: "শপিং মলের ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/GlassBuildingBackground", bn: "কাচের ভবনের পরিবেশ।", cat: "bg" },
    { code: "/ArchitectureBackground", bn: "স্থাপত্যশৈলীর ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/BrickWallBackground", bn: "ইটের দেয়ালের ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/ConcreteWallBackground", bn: "কংক্রিটের দেয়ালের ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/NeonBackground", bn: "নিয়ন আলোর ব্যাকগ্রাউন্ড।", cat: "bg" },
    { code: "/CyberpunkBackground", bn: "সাইবারপাঙ্ক পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/VintageBackground", bn: "পুরোনো দিনের পরিবেশ তৈরি করা।", cat: "bg" },
    { code: "/BackgroundExtension", bn: "ছবির ব্যাকগ্রাউন্ডের পরিসর বাড়ানো।", cat: "bg" },

    // ----------------- ৪. Lighting & Shadow -----------------
    { code: "/StudioLighting", bn: "স্টুডিওর মতো আলো তৈরি করা।", cat: "light" },
    { code: "/SoftLighting", bn: "নরম আলো তৈরি করা।", cat: "light" },
    { code: "/HardLighting", bn: "তীক্ষ্ণ ও শক্তিশালী আলো তৈরি করা।", cat: "light" },
    { code: "/NaturalLighting", bn: "প্রাকৃতিক আলোর ইফেক্ট।", cat: "light" },
    { code: "/GoldenHour", bn: "সূর্যাস্তের আগের সোনালি আলো।", cat: "light" },
    { code: "/BlueHour", bn: "সংধ্যার নীলচে আলো তৈরি করা।", cat: "light" },
    { code: "/SunlightEffect", bn: "সূর্যের আলোর ইফেক্ট যোগ করা।", cat: "light" },
    { code: "/MoonlightEffect", bn: "চাঁদের আলোর ইফেক্ট যোগ করা।", cat: "light" },
    { code: "/WindowLighting", bn: "জানালা দিয়ে আসা আলোর ইফেক্ট।", cat: "light" },
    { code: "/RembrandtLighting", bn: "রেমব্রান্ট স্টাইলের পোর্ট্রেট লাইটিং।", cat: "light" },
    { code: "/ButterflyLighting", bn: "মুখে প্রজাপতির মতো ছায়া তৈরি করা।", cat: "light" },
    { code: "/LoopLighting", bn: "মুখের এক পাশে লুপ আকৃতির ছায়া তৈরি করা।", cat: "light" },
    { code: "/SplitLighting", bn: "মুখের অর্ধেক আলো ও অর্ধেক ছায়া।", cat: "light" },
    { code: "/RimLighting", bn: "বিষয়ের চারপাশে আলোর রেখা তৈরি করা।", cat: "light" },
    { code: "/BackLighting", bn: " পেছন থেকে আলো দেওয়া।", cat: "light" },
    { code: "/FrontLighting", bn: "সামনে থেকে আলো দেওয়া।", cat: "light" },
    { code: "/SideLighting", bn: "পাশ থেকে আলো দেওয়া।", cat: "light" },
    { code: "/TopLighting", bn: "ওপর থেকে আলো দেওয়া।", cat: "light" },
    { code: "/UnderLighting", bn: "নিচ থেকে আলো দেওয়া।", cat: "light" },
    { code: "/ThreePointLighting", bn: "তিন দিক থেকে আলো তৈরি করা।", cat: "light" },
    { code: "/HighKeyLighting", bn: "উজ্জ্বল ও হালকা টোনের আলো।", cat: "light" },
    { code: "/LowKeyLighting", bn: "গাঢ় ও নাটকীয় আলো।", cat: "light" },
    { code: "/DramaticLighting", bn: "সিনেমাটিক নাটকীয় আলো।", cat: "light" },
    { code: "/CinematicLighting", bn: "সিনেমার মতো আলো তৈরি করা।", cat: "light" },
    { code: "/MoodyLighting", bn: "আবহপূর্ণ ও গাঢ় আলো।", cat: "light" },
    { code: "/AmbientLighting", bn: "চারপাশের পরিবেশগত আলো।", cat: "light" },
    { code: "/PracticalLighting", bn: "ছবির দৃশ্যমান লাইট সোর্স থেকে আলো।", cat: "light" },
    { code: "/FlashLighting", bn: "ক্যামেরা ফ্ল্যাশের আলো।", cat: "light" },
    { code: "/RingLight", bn: "রিং লাইটের আলো তৈরি করা।", cat: "light" },
    { code: "/BeautyDishLighting", bn: "বিউটি ডিশ স্টুডিও লাইটিং।", cat: "light" },
    { code: "/SoftboxLighting", bn: "সফটবক্সের নরম আলো।", cat: "light" },
    { code: "/OctaboxLighting", bn: "অক্টাবক্সের আলো তৈরি করা।", cat: "light" },
    { code: "/FillLight", bn: "ছায়ার অন্ধকার অংশে আলো যোগ করা।", cat: "light" },
    { code: "/KeyLight", bn: "মূল আলো তৈরি করা।", cat: "light" },
    { code: "/HairLight", bn: "চুলের ওপর আলোর ইফেক্ট।", cat: "light" },
    { code: "/Catchlight", bn: "চোখে আলোর প্রতিফলন তৈরি করা।", cat: "light" },
    { code: "/ShadowEnhance", bn: "ছায়ার গঠন স্পষ্ট করা।", cat: "light" },
    { code: "/ShadowRemoval", bn: "অপ্রয়োজনীয় ছায়া দূর করা।", cat: "light" },
    { code: "/NaturalShadow", bn: "প্রাকৃতিক ছায়া তৈরি করা।", cat: "light" },
    { code: "/LongShadow", bn: "লম্বা ছায়া তৈরি করা।", cat: "light" },
    { code: "/DropShadow", bn: "অবজেক্টের নিচে ছায়া যোগ করা।", cat: "light" },
    { code: "/CastShadow", bn: "কোনো অবজেক্টের তৈরি ছায়া যোগ করা।", cat: "light" },
    { code: "/ContactShadow", bn: "অবজেক্টের সংস্পর্শস্থলে ছায়া তৈরি করা।", cat: "light" },
    { code: "/ShadowSoftening", bn: "ছায়া নরম করা।", cat: "light" },
    { code: "/ShadowCorrection", bn: "ছায়ার ভারসাম্য ঠিক করা।", cat: "light" },
    { code: "/HighlightEnhance", bn: "উজ্জ্বল অংশের ডিটেইল বাড়ানো।", cat: "light" },
    { code: "/HighlightRecovery", bn: "অতিরিক্ত উজ্জ্বল অংশের ডিটেইল ফিরিয়ে আনা।", cat: "light" },
    { code: "/ExposureCorrection", bn: "ছবির আলো কম-বেশি ঠিক করা।", cat: "light" },
    { code: "/LightBalance", bn: "আলোর ভারসাম্য ঠিক করা।", cat: "light" },
    { code: "/VolumetricLighting", bn: "বাতাসে আলোর রশ্মি দৃশ্যমান করা।", cat: "light" },

    // ----------------- ৫. Color Grading & Tone -----------------
    { code: "/ColorCorrection", bn: "ছবির রঙ ঠিক করা।", cat: "color" },
    { code: "/ColorGrading", bn: "ছবিতে নির্দিষ্ট কালার টোন তৈরি করা।", cat: "color" },
    { code: "/ColorEnhance", bn: "রঙের উজ্জ্বলতা ও সৌন্দর্য বৃদ্ধি।", cat: "color" },
    { code: "/ColorBalance", bn: "রঙের ভারসাম্য ঠিক করা।", cat: "color" },
    { code: "/WhiteBalance", bn: "ছবির সাদা রঙের ভারসাম্য ঠিক করা।", cat: "color" },
    { code: "/TemperatureCorrection", bn: "ছবির উষ্ণতা বা শীতলতা ঠিক করা।", cat: "color" },
    { code: "/TintCorrection", bn: "সবুজ বা ম্যাজেন্টা রঙের আধিক্য ঠিক করা।", cat: "color" },
    { code: "/SaturationBoost", bn: "রঙের স্যাচুরেশন বাড়ানো।", cat: "color" },
    { code: "/SaturationReduction", bn: "রঙের স্যাচুরেশন কমানো।", cat: "color" },
    { code: "/VibranceBoost", bn: "কম উজ্জ্বল রঙগুলোকে প্রাণবন্ত করা।", cat: "color" },
    { code: "/DesaturatedLook", bn: "কম স্যাচুরেশনের লুক তৈরি করা।", cat: "color" },
    { code: "/Monochrome", bn: "একরঙা ছবি তৈরি করা।", cat: "color" },
    { code: "/BlackAndWhite", bn: "সাদা-কালো ছবি তৈরি করা।", cat: "color" },
    { code: "/SepiaTone", bn: "পুরোনো বাদামি টোন তৈরি করা।", cat: "color" },
    { code: "/VintageColor", bn: "ভিনটেজ কালার তৈরি করা।", cat: "color" },
    { code: "/RetroColor", bn: "রেট্রো কালার স্টাইল তৈরি করা।", cat: "color" },
    { code: "/WarmTone", bn: "উষ্ণ রঙের টোন তৈরি করা।", cat: "color" },
    { code: "/CoolTone", bn: "শীতল রঙের টোন তৈরি করা।", cat: "color" },
    { code: "/NeutralTone", bn: "নিরপেক্ষ রঙের টোন তৈরি করা।", cat: "color" },
    { code: "/PastelColor", bn: "হালকা প্যাস্টেল রঙ তৈরি করা।", cat: "color" },
    { code: "/MutedColor", bn: "মৃদু রঙের টোন তৈরি করা।", cat: "color" },
    { code: "/RichColor", bn: "গভীর ও সমৃদ্ধ রঙ তৈরি করা।", cat: "color" },
    { code: "/TealAndOrange", bn: "টিল ও অরেঞ্জ সিনেমাটিক কালার গ্রেড।", cat: "color" },
    { code: "/OrangeAndTeal", bn: "কমলা ও নীলচে রঙের সমন্বয়।", cat: "color" },
    { code: "/CinematicColor", bn: "সিনেমাটিক কালার টোন তৈরি করা।", cat: "color" },
    { code: "/FilmColorGrade", bn: "ফিল্মের মতো কালার গ্রেডিং।", cat: "color" },
    { code: "/KodakFilmLook", bn: "কোডাক ফিল্মের মতো কালার লুক।", cat: "color" },
    { code: "/FujiFilmLook", bn: "ফুজি ফিল্মের মতো কালার লুক।", cat: "color" },
    { code: "/Portra400Look", bn: "Portra 400 ফিল্মের মতো লুক।", cat: "color" },
    { code: "/Ektar100Look", bn: "Ektar 100 ফিল্মের মতো লুক।", cat: "color" },
    { code: "/MatteColor", bn: "ম্যাট কালার ইফেক্ট।", cat: "color" },
    { code: "/FadeColor", bn: "ফিকে রঙের ইফেক্ট।", cat: "color" },
    { code: "/HighContrast", bn: "কনট্রাস্ট বাড়ানো।", cat: "color" },
    { code: "/LowContrast", bn: "কনট্রাস্ট কমানো।", cat: "color" },
    { code: "/ContrastEnhance", bn: "ছবির কনট্রাস্ট উন্নত করা।", cat: "color" },
    { code: "/HDRLook", bn: "HDR ধরনের ডিটেইল ও টোন তৈরি করা।", cat: "color" },
    { code: "/NaturalColor", bn: "প্রাকৃতিক রঙ বজায় রাখা।", cat: "color" },
    { code: "/SkinColorCorrection", bn: "ত্বকের রঙ ঠিক করা।", cat: "color" },
    { code: "/SelectiveColor", bn: "নির্দিষ্ট রঙকে আলাদা করে ফুটিয়ে তোলা।", cat: "color" },
    { code: "/ColorPop", bn: "নির্দিষ্ট রঙ উজ্জ্বলভাবে ফুটিয়ে তোলা।", cat: "color" },
    { code: "/Duotone", bn: "দুই রঙের টোন তৈরি করা।", cat: "color" },
    { code: "/Tritone", bn: "তিন রঙের টোন তৈরি করা।", cat: "color" },
    { code: "/SplitToning", bn: "হাইলাইট ও শ্যাডোতে আলাদা রঙ দেওয়া।", cat: "color" },
    { code: "/GradientMap", bn: "গ্রেডিয়েন্টের মাধ্যমে রঙ পরিবর্তন করা।", cat: "color" },
    { code: "/CrossProcessing", bn: "ক্রস-প্রসেসড ফিল্ম লুক তৈরি করা।", cat: "color" },
    { code: "/BleachBypass", bn: "ব্লিচ বাইপাস সিনেমাটিক ইফেক্ট।", cat: "color" },
    { code: "/DarkMood", bn: "গাঢ় আবহের রঙ তৈরি করা।", cat: "color" },
    { code: "/BrightMood", bn: "উজ্জ্বল আবহের রঙ তৈরি করা।", cat: "color" },
    { code: "/PastelAesthetic", bn: "প্যাস্টেল নান্দনিক লুক তৈরি করা।", cat: "color" },
    { code: "/ColorConsistency", bn: "পুরো ছবিতে রঙের সামঞ্জস্য বজায় রাখা।", cat: "color" },

    // ----------------- ৬. Image Quality & Resolution -----------------
    { code: "/ImageEnhance", bn: "ছবির সামগ্রিক মান উন্নত করা।", cat: "quality" },
    { code: "/PhotoEnhance", bn: "ফটোগ্রাফের গুণগত মান বাড়ানো।", cat: "quality" },
    { code: "/ImageUpscale", bn: "ছবির রেজল্যুশন বাড়ানো।", cat: "quality" },
    { code: "/AIUpscale", bn: "AI দিয়ে ছবির রেজল্যুশন উন্নত করা।", cat: "quality" },
    { code: "/4KUpscale", bn: "4K মানের ছবি তৈরি করা।", cat: "quality" },
    { code: "/8KUpscale", bn: "8K মানের ছবি তৈরি করা।", cat: "quality" },
    { code: "/HDQuality", bn: "HD মানের ছবি তৈরি করা।", cat: "quality" },
    { code: "/FullHD", bn: "Full HD মানের ছবি তৈরি করা।", cat: "quality" },
    { code: "/UltraHD", bn: "Ultra HD মানের ছবি তৈরি করা।", cat: "quality" },
    { code: "/HighResolution", bn: "উচ্চ রেজল্যুশনের ছবি তৈরি করা।", cat: "quality" },
    { code: "/SuperResolution", bn: "ছবির সূক্ষ্ম ডিটেইল উন্নত করা।", cat: "quality" },
    { code: "/DetailEnhance", bn: "ছবির ডিটেইল বাড়ানো।", cat: "quality" },
    { code: "/SharpnessEnhance", bn: "ছবির শার্পনেস বাড়ানো।", cat: "quality" },
    { code: "/ImageSharpen", bn: "ঝাপসা ছবি শার্প করা।", cat: "quality" },
    { code: "/UnsharpMask", bn: "আনশার্প মাস্কের মতো শার্পনিং।", cat: "quality" },
    { code: "/EdgeEnhance", bn: "ছবির প্রান্তগুলো স্পষ্ট করা।", cat: "quality" },
    { code: "/TextureEnhance", bn: "ছবির টেক্সচার উন্নত করা।", cat: "quality" },
    { code: "/ClarityEnhance", bn: "ছবির স্থানীয় কনট্রাস্ট বাড়ানো।", cat: "quality" },
    { code: "/Dehaze", bn: "কুয়াশা বা ধোঁয়াটে ভাব কমানো।", cat: "quality" },
    { code: "/NoiseReduction", bn: "ছবির ডিজিটাল নয়েজ কমানো।", cat: "quality" },

    // ----------------- ৭. 3D, Digital Art & Creative Effects -----------------
    { code: "/3DRender", bn: "থ্রিডি রেন্ডার স্টাইল তৈরি করা।", cat: "art" },
    { code: "/3DPortrait", bn: "থ্রিডি পোর্ট্রেট তৈরি করা।", cat: "art" },
    { code: "/3DCharacter", bn: "থ্রিডি ক্যারেক্টার তৈরি করা।", cat: "art" },
    { code: "/3DModel", bn: "থ্রিডি মডেলের মতো দেখানো।", cat: "art" },
    { code: "/3DFace", bn: "মুখের থ্রিডি রূপ তৈরি করা।", cat: "art" },
    { code: "/DigitalArt", bn: "ডিজিটাল আর্ট তৈরি করা।", cat: "art" },
    { code: "/ConceptArt", bn: "কনসেপ্ট আর্ট তৈরি করা।", cat: "art" },
    { code: "/FantasyArt", bn: "কল্পনাপ্রসূত আর্ট তৈরি করা।", cat: "art" },
    { code: "/SciFiArt", bn: "সায়েন্স ফিকশন আর্ট তৈরি করা।", cat: "art" },
    { code: "/CyberpunkArt", bn: "সাইবারপাঙ্ক আর্ট তৈরি করা।", cat: "art" },
    { code: "/OilPainting", bn: "তৈলচিত্রের মতো তৈরি করা।", cat: "art" },
    { code: "/WatercolorPainting", bn: "জলরঙের ছবি তৈরি করা।", cat: "art" },
    { code: "/PencilSketch", bn: "পেন্সিল স্কেচ তৈরি করা।", cat: "art" },
    { code: "/ComicStyle", bn: "কমিকসের মতো স্টাইল তৈরি করা।", cat: "art" },
    { code: "/AnimeStyle", bn: "অ্যানিমে স্টাইল তৈরি করা।", cat: "art" },
    { code: "/CartoonStyle", bn: "কার্টুন স্টাইল তৈরি করা।", cat: "art" },
    { code: "/PixarInspired3D", bn: "থ্রিডি অ্যানিমেশনধর্মী লুক তৈরি করা।", cat: "art" },

    // ----------------- ৮. Portrait, Fashion & Professional Look -----------------
    { code: "/ProfessionalPortrait", bn: "প্রফেশনাল পোর্ট্রেট তৈরি করা।", cat: "portrait" },
    { code: "/CorporatePortrait", bn: "কর্পোরেট স্টাইলের পোর্ট্রেট।", cat: "portrait" },
    { code: "/BusinessPortrait", bn: "ব্যবসায়িক প্রোফাইল ছবি তৈরি করা।", cat: "portrait" },
    { code: "/LinkedInPortrait", bn: "LinkedIn প্রোফাইলের উপযোগী ছবি।", cat: "portrait" },
    { code: "/PassportPhoto", bn: "পাসপোর্ট সাইজের ছবি তৈরি করা।", cat: "portrait" },
    { code: "/IDPhoto", bn: "আইডি কার্ডের উপযোগী ছবি তৈরি করা।", cat: "portrait" },
    { code: "/FormalPortrait", bn: "ফরমাল পোর্ট্রেট তৈরি করা।", cat: "portrait" },
    { code: "/FashionPortrait", bn: "ফ্যাশন পোর্ট্রেট তৈরি করা।", cat: "portrait" },
    { code: "/BusinessSuit", bn: "বিজনেস স্যুট পরানো।", cat: "portrait" },
    { code: "/BlackSuit", bn: "কালো স্যুট পরানো।", cat: "portrait" },
    { code: "/BlazerOutfit", bn: "ব্লেজার পরানো।", cat: "portrait" },
    { code: "/TraditionalOutfit", bn: "ঐতিহ্যবাহী পোশাক পরানো।", cat: "portrait" },
    { code: "/SareeOutfit", bn: "শাড়ি পরানো।", cat: "portrait" },
    { code: "/PanajabiOutfit", bn: "পাঞ্জাবি পরানো।", cat: "portrait" },
    { code: "/HijabStyle", bn: "হিজাবের স্টাইল তৈরি করা।", cat: "portrait" },

    // ----------------- ৯. Composition, Framing & Camera Shot -----------------
    { code: "/RuleOfThirds", bn: "ছবির বিষয়কে থার্ডস নিয়মে সাজানো।", cat: "cam" },
    { code: "/GoldenRatio", bn: "গোল্ডেন রেশিও অনুযায়ী কম্পোজিশন।", cat: "cam" },
    { code: "/CenteredComposition", bn: "বিষয়কে ছবির মাঝখানে রাখা।", cat: "cam" },
    { code: "/SymmetricalComposition", bn: "দুই পাশের সমান ভারসাম্য তৈরি করা।", cat: "cam" },
    { code: "/FrameWithinFrame", bn: "ফ্রেমের মধ্যে আরেকটি ফ্রেম তৈরি করা।", cat: "cam" },
    { code: "/LeadingLines", bn: "রেখার মাধ্যমে বিষয়কে ফুটিয়ে তোলা।", cat: "cam" },
    { code: "/TightFraming", bn: "বিষয়কে কাছাকাছি ফ্রেমে রাখা।", cat: "cam" },
    { code: "/CloseUp", bn: "মুখের কাছের ছবি।", cat: "cam" },
    { code: "/ExtremeCloseUp", bn: "মুখের খুব কাছের ছবি।", cat: "cam" },
    { code: "/MediumShot", bn: "কোমর পর্যন্ত ছবি।", cat: "cam" },
    { code: "/FullBodyShot", bn: "সম্পূর্ণ শরীরসহ ছবি তৈরি করা।", cat: "cam" },
    { code: "/WideShot", bn: "প্রশস্ত দৃশ্যসহ ছবি তৈরি করা।", cat: "cam" },
    { code: "/ExtremeWideShot", bn: "অনেক দূর থেকে বিস্তৃত দৃশ্য দেখানো।", cat: "cam" },
    { code: "/MacroShot", bn: "ক্ষুদ্র বিষয়ের কাছের ছবি।", cat: "cam" },
    { code: "/Telephoto", bn: "দূরের বিষয়ের ক্লোজআপ।", cat: "cam" },
    { code: "/85mmPortrait", bn: "৮৫ মিমি পোর্ট্রেট লেন্সের লুক।", cat: "cam" },

    // ----------------- ১০. Advanced Editing, Effects & Final Output -----------------
    { code: "/LensFlare", bn: "লেন্সে আলোর ঝলক তৈরি করা।", cat: "adv" },
    { code: "/LightLeak", bn: "ছবিতে আলোর লিক ইফেক্ট যোগ করা।", cat: "adv" },
    { code: "/MotionBlur", bn: "চলমান বস্তুর গতির ঝাপসা ইফেক্ট।", cat: "adv" },
    { code: "/LongExposure", bn: "দীর্ঘ এক্সপোজারের মতো ইফেক্ট তৈরি করা।", cat: "adv" },
    { code: "/DoubleExposure", bn: "একই ছবিতে দুটি এক্সপোজার মিশিয়ে দেওয়া।", cat: "adv" },
    { code: "/ReflectionEffect", bn: "প্রতিফলনের ইফেক্ট তৈরি করা।", cat: "adv" },
    { code: "/GlitchEffect", bn: "ডিজিটাল গ্লিচ ইফেক্ট তৈরি করা।", cat: "adv" },
    { code: "/FilmGrain", bn: "ফিল্মের দানাদার টেক্সচার যোগ করা।", cat: "adv" },
    { code: "/VignetteEffect", bn: "ছবির চারপাশে অন্ধকার ইফেক্ট।", cat: "adv" },
    { code: "/ObjectRemoval", bn: "ছবির অপ্রয়োজনীয় বস্তু সরানো।", cat: "adv" },
    { code: "/GenerativeFill", bn: "AI দিয়ে ছবির খালি অংশ পূরণ করা।", cat: "adv" },
    { code: "/Outpainting", bn: "ছবির বাইরের অংশ AI দিয়ে বাড়ানো।", cat: "adv" },
    { code: "/FaceSwap", bn: "একটি মুখের জায়গায় অন্য মুখ বসানো।", cat: "adv" },
    { code: "/GlowEffect", bn: "ছবিতে আলোকিত গ্লো ইফেক্ট যোগ করা।", cat: "adv" },
    { code: "/MasterpieceQuality", bn: "সর্বোচ্চ মানের শিল্পসম্মত আউটপুট।", cat: "adv" }
  ];

  // ----------------- FAVORITES LOCAL STORAGE ENGINE -----------------
  function getFavorites() {
    try {
      const favs = localStorage.getItem('cgpt_fav_shortcodes');
      return favs ? JSON.parse(favs) : [];
    } catch (e) {
      return [];
    }
  }

  function isFavorite(code) {
    const favs = getFavorites();
    return favs.includes(code);
  }

  // স্টার আইকন ক্লিক ফিক্সড ফাংশন (BUG FIXED)
  function handleStarFavClick(starEl, encodedCode, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const code = decodeURIComponent(encodedCode);
    let favs = getFavorites();
    
    if (favs.includes(code)) {
      favs = favs.filter(c => c !== code);
    } else {
      favs.push(code);
    }
    
    try {
      localStorage.setItem('cgpt_fav_shortcodes', JSON.stringify(favs));
    } catch (e) {}

    // রি-রেন্ডার করবে যাতে স্টার স্টেট তাৎক্ষণিকভাবে নিখুঁত আপডেট হয়
    renderShortcodes();
  }

  // প্রিয় তালিকা বাটন টগল লজিক (NEW UPDATE)
  function toggleFavFilter() {
    const btn = document.getElementById('scFavFilterBtn');
    if (currentCategory === 'fav') {
      switchCategory('all', '🔥 সব শর্টকোড');
      if (btn) btn.classList.remove('active');
    } else {
      switchCategory('fav', '⭐ প্রিয় শর্টকোড');
      if (btn) btn.classList.add('active');
    }
  }

  // ১. সুইচার ক্যাটাগরি লজিক
  function switchCategory(catId, catLabel) {
    currentCategory = catId;
    
    // ক্যাটাগরি টেক্সট বাটন আপডেট করবে
    const selectedTextEl = document.getElementById('scSelectedCatText');
    if (selectedTextEl && catLabel) {
      selectedTextEl.innerText = catLabel;
    }

    // ফেভারিট ফিল্টার বাটন স্টেট সিঙ্ক
    const favBtn = document.getElementById('scFavFilterBtn');
    if (favBtn) {
      if (catId === 'fav') favBtn.classList.add('active');
      else favBtn.classList.remove('active');
    }

    // পপ-আপ বন্ধ করবে
    hideCategoryMenu();

    // সার্চ ইনপুট ক্লিয়ার করবে
    document.getElementById('scSearchInput').value = '';

    renderShortcodes();
  }

  // ২. শর্টকোড গ্রিড রেন্ডারার
  function renderShortcodes() {
    const grid = document.getElementById('scGrid');
    if (!grid) return;
    grid.innerHTML = ''; // ক্লিয়ার করবে

    const query = document.getElementById('scSearchInput').value.toLowerCase().trim();
    const favList = getFavorites();

    const filtered = shortcodeDb.filter(item => {
      const matchCat = (currentCategory === 'all') || 
                       (currentCategory === 'fav' && favList.includes(item.code)) ||
                       (currentCategory === 'trending' && item.isTrend) || 
                       (item.cat === currentCategory);
      const matchQuery = !query || 
                         item.code.toLowerCase().includes(query) || 
                         item.bn.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      if (currentCategory === 'fav' && !query) {
        grid.innerHTML = '<div style="color: #64748b; padding: 40px; text-align: center; grid-column: 1/-1;"><i class="fa-solid fa-star" style="font-size: 28px; color: #f59e0b; margin-bottom: 8px; display: block;"></i>আপনার কোনো পছন্দের শর্টকোড সেভ করা নেই। শর্টকোডের ডানপাশের স্টার (⭐) আইকনে চাপ দিয়ে প্রিয় তালিকায় যুক্ত করুন!</div>';
      } else {
        grid.innerHTML = '<div style="color: #64748b; padding: 40px; text-align: center; grid-column: 1/-1;">কোনো শর্টকোড খুঁজে পাওয়া যায়নি। অনুগ্রহ করে অন্য নাম লিখে সার্চ করুন।</div>';
      }
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = `sc-card ${item.isTrend ? 'trending' : ''}`;
      const favActive = isFavorite(item.code);
      const encodedCode = encodeURIComponent(item.code);

      card.innerHTML = `
        <i class="${favActive ? 'fa-solid fa-star sc-fav-star active' : 'fa-regular fa-star sc-fav-star'}" title="ফেভারিট করুন!" onclick="handleStarFavClick(this, '${encodedCode}', event)"></i>
        <div>
          <span class="sc-code-tag">${item.code}</span>
          <div class="sc-desc-bn">${item.bn}</div>
        </div>
        <button class="sc-copy-btn" onclick="copyShortcode('${item.code}', this)">
          <i class="fa-regular fa-copy"></i> কপি করুন!
        </button>
      `;
      grid.appendChild(card);
    });
  }

  // ৩. ১-ক্লিক কপি ফাংশন (ফ্যালব্যাক সহ)
  function copyShortcode(codeText, btnEl) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(codeText).then(() => {
        showCopySuccess(btnEl);
      }).catch(() => {
        fallbackCopy(codeText, btnEl);
      });
    } else {
      fallbackCopy(codeText, btnEl);
    }
  }

  // ওল্ডার ব্রাউজার ফ্যালব্যাক কপি লজিক
  function fallbackCopy(text, btnEl) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(btnEl);
    } catch (err) {
      console.error('Copy failed: ', err);
    }
    document.body.removeChild(textArea);
  }

  // কপি বাটন এনিমেশন
  function showCopySuccess(btnEl) {
    const originalHTML = '<i class="fa-regular fa-copy"></i> কপি করুন!';
    btnEl.innerHTML = '<i class="fa-solid fa-check"></i> কপি হয়েছে!';
    btnEl.classList.add('copied');

    setTimeout(() => {
      btnEl.innerHTML = originalHTML;
      btnEl.classList.remove('copied');
    }, 2000);
  }

  // ৪. রিয়েল-টাইম লাইভ সার্চ ফিল্টার
  function filterShortcodes() {
    renderShortcodes();
  }
  
