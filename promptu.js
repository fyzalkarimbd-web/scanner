let phCurrentLang = "en";
let phCurrentCat = "All";

const promptData = [
    // --- HAIR (চুল) --- 11 Prompts
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Fix Messy Hair", title_bn: "এলোমেলো চুল ঠিক করা", prompt: "Tidy up messy hair, fix flyaways, and make the hairstyle look neat and professional." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Add Hair to Bald Head", title_bn: "টাক মাথায় চুল যুক্ত করা", prompt: "Add natural-looking dense hair to the bald head, matching the existing hair texture and color." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Black Hair Color", title_bn: "চুলের রঙ কালো করা", prompt: "Change hair color to a natural black." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Brown Hair Style", title_bn: "চুলের রঙ খয়েরি করা", prompt: "Change hair color to a professional warm chocolate brown." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Remove Hair from Forehead", title_bn: "কপাল থেকে চুল সরানো", prompt: "Remove stray hairs from the forehead, creating a clean and neat hairline." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Increase Hair Volume", title_bn: "চুল ঘন করা", prompt: "Add more volume and thickness to the hair naturally without changing the style." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Comb Hair Side", title_bn: "চুল এক সাইডে আঁচড়ানো", prompt: "Redesign the hair to be neatly combed and partitioned to the side professionally." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Straighten Hair", title_bn: "চুল স্ট্রেট করা", prompt: "Make the curly or wavy hair perfectly straight, smooth and silky." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Fix Receding Hairline", title_bn: "সামনের চুল ভরাট করা", prompt: "Lower the hairline and fill in thin spots at the temples for a youthful look." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Wet Hair Look", title_bn: "চুল ভেজা ভাব দেওয়া", prompt: "Give the hair a fresh, slightly wet and shiny gelled appearance." },
    { cat_en: "Hair", cat_bn: "চুল", title_en: "Add Buzz Cut", title_bn: "ছোট চুল বা বাজ কাট", prompt: "Change the hairstyle to a very short, clean and professional buzz cut." },

    // --- EYES (চোখ) --- 11 Prompts
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Remove Glasses", title_bn: "চশমা সরানো", prompt: "Remove eyeglasses and digitally reconstruct the eyes and surrounding area naturally." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Remove Red Eyes", title_bn: "চোখের লাল ভাব দূর করা", prompt: "Remove the red-eye effect completely from the photograph." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Open Eyes Naturally", title_bn: "চোখ খোলা ও স্বাভাবিক করা", prompt: "Ensure both eyes are fully open, bright, and looking directly at the camera. Correct any lazy eye." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Blue Eye Color", title_bn: "চোখের মণি নীল করা", prompt: "Change the iris color to a realistic deep blue." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Add Thick Eyebrows", title_bn: "ভ্রু ঘন করা", prompt: "Make the eyebrows look thicker, darker, and more defined." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Remove Dark Circles", title_bn: "চোখের নিচের কালো দাগ মোছা", prompt: "Smooth the skin under the eyes and remove any dark circles or puffiness." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Add Eye Makeup", title_bn: "চোখে হালকা মেকআপ দেওয়া", prompt: "Apply subtle eyeliner and mascara to make the eyes look sharp and professional." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Fix Squinting", title_bn: "চোখ বড় ও উজ্জ্বল করা", prompt: "Correct squinting eyes to look relaxed, wide open, and clearly focused." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Sharpen Eye Detail", title_bn: "চোখের মণি উজ্জ্বল করা", prompt: "Enhance the details of the iris and catchlight in the eyes for a professional look." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Remove Crow's Feet", title_bn: "চোখের ধারের বলিরেখা মোছা", prompt: "Remove fine lines and wrinkles around the corners of the eyes." },
    { cat_en: "Eyes", cat_bn: "চোখ", title_en: "Hazel Iris", title_bn: "চোখের মণি হেজেল করা", prompt: "Change eye color to a beautiful and natural hazel brown." },

    // --- BEARD (দাড়ি ও গোঁফ) --- 11 Prompts
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Clean Shave", title_bn: "মুখ ক্লিন শেভ করা", prompt: "Make the face completely clean-shaven, remove all facial hair smoothly." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Add Full Beard", title_bn: "দাড়ি বাড়িয়ে দেওয়া", prompt: "Add a full, thick, well-groomed professional beard to the chin and cheeks." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Reduce Beard", title_bn: "দাড়ি কমিয়ে দেওয়া", prompt: "Reduce the thick beard to a light, well-groomed stubble." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Shape Beard Line", title_bn: "দাড়ির লাইন ঠিক করা", prompt: "Trim the edges of the beard for a sharp, clean neck and cheek line." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Add French Cut", title_bn: "ফ্রেঞ্চ কাট দাড়ি দেওয়া", prompt: "Design a neat and symmetrical French cut beard style." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Thick Mustache", title_bn: "গোঁফ ঘন করা", prompt: "Make the mustache appear dense, dark, and perfectly styled." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Remove Mustache Only", title_bn: "শুধুমাত্র গোঁফ কাটা", prompt: "Remove the mustache while keeping the beard as it is." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Fix Patchy Beard", title_bn: "ফাঁকা দাড়ি ভরাট করা", prompt: "Fill in patchy or thin areas of the beard to make it look uniform and dense." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Grey to Black Beard", title_bn: "পাকা দাড়ি কালো করা", prompt: "Color all white or grey facial hair to a natural dark black." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Add Goatee Style", title_bn: "গোটি (Goatee) স্টাইল করা", prompt: "Add a stylish goatee beard while keeping the rest of the face clean." },
    { cat_en: "Beard", cat_bn: "দাড়ি ও গোঁফ", title_en: "Handlebar Mustache", title_bn: "রাজকীয় গোঁফ যুক্ত করা", prompt: "Add a thick handlebar mustache with curled ends for a classic look." },

    // --- TEETH & MOUTH (দাত ও মুখ) --- 10 Prompts
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Close Mouth", title_bn: "মুখটি বন্ধ ও দাত না দেখা", prompt: "Ensure the mouth is naturally closed, not showing any teeth." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Teeth Whitening", title_bn: "দাত সাদা করা", prompt: "Whiten the teeth naturally and remove any yellow stains." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Gentle Smile", title_bn: "দাত না দেখা ও হালকা হাসি", prompt: "Change the expression to a gentle, closed-mouth smile." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Straighten Teeth", title_bn: "আঁকাবাঁকা দাত সোজা করা", prompt: "Digitally align and straighten the teeth for a perfect smile." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Fix Missing Tooth", title_bn: "ফাঁকা দাত ভরাট করা", prompt: "Fill in gaps between teeth or add a missing tooth naturally." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Natural Expression", title_bn: "মুখ বন্ধ রেখে স্বাভাবিক ছবি", prompt: "Create a neutral facial expression with a closed mouth." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Add Dimples", title_bn: "গালে টোল যুক্ত করা", prompt: "Add subtle, natural-looking dimples to the cheeks when smiling." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Lip Color Correction", title_bn: "ঠোঁটের রঙ স্বাভাবিক করা", prompt: "Correct the lip color to a natural healthy pink or coral tone." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Reduce Lip Swelling", title_bn: "ঠোঁট পাতলা করা", prompt: "Subtly reduce the thickness of the lips for a more balanced facial look." },
    { cat_en: "Teeth", cat_bn: "দাত", title_en: "Fix Chapped Lips", title_bn: "ঠোঁট মসৃণ করা", prompt: "Smooth the texture of the lips to remove dryness and cracks." },

    // --- CLOTHES (পোশাক) --- 11 Prompts
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Add Professional Tie", title_bn: "পোশাক নতুন করা", prompt: "The clothes will be new and clean." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Add Professional Tie", title_bn: "টাই যুক্ত করা", prompt: "Add a professional red silk tie, neatly tied under the collar." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Wear Business Suit", title_bn: "স্যুট বা কোট পরানো", prompt: "Dress the person in a professional dark navy blue business suit with a white shirt and a tie." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Change to White Shirt", title_bn: "শার্ট পরিয়ে দেওয়া", prompt: "Change the current attire to a formal white collared shirt, fully buttoned." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Add Black Blazer", title_bn: "কালো ব্লেজার পরানো", prompt: "Add a well-fitted formal black blazer over the existing shirt." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Formal Saree", title_bn: "শাড়ি পরিয়ে দেওয়া", prompt: "Dress the woman in a traditional formal silk saree with elegant drapes." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Doctor's Apron", title_bn: "ডাক্তারের অ্যাপ্রন পরানো", prompt: "Dress the person in a professional white doctor's lab coat with a stethoscope." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Remove Wrinkles", title_bn: "পোশাকের ভাঁজ কমানো", prompt: "Smooth out all wrinkles and creases from the current clothing for a crisp look." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Change Clothes Color", title_bn: "পোশাকের রঙ পরিবর্তন", prompt: "Change the color of the current clothing to a solid formal sky blue." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Add Uniform", title_bn: "ইউনিফর্ম পরানো", prompt: "Change the attire to a professional security or pilot uniform with badges." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Formal Punjabi", title_bn: "পাঞ্জাবি পরিয়ে দেওয়া", prompt: "Dress the man in an elegant, well-fitted white formal Punjabi." },
    { cat_en: "Clothes", cat_bn: "পোশাক", title_en: "Add Leather Jacket", title_bn: "লেদার জ্যাকেট পরানো", prompt: "Change the current top to a stylish black leather biker jacket." },

    // --- BACKGROUND (ব্যাকগ্রাউন্ড) --- 11 Prompts
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Solid White BG", title_bn: "সাদা ব্যাকগ্রাউন্ড", prompt: "Change background to solid white, clean and professional." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Solid Neon Blue BG", title_bn: "নীল ব্যাকগ্রাউন্ড", prompt: "Change background to solid bright Neon Blue." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Light Blue BG", title_bn: "হালকা নিল ব্যাকগ্রাউন্ড", prompt: "Change background to a professional light sky blue." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Studio Bokeh BG", title_bn: "স্টুডিও ব্লার ব্যাকগ্রাউন্ড", prompt: "Change background to a blurry professional photo studio with bokeh lights." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Office Interior", title_bn: "অফিস ব্যাকগ্রাউন্ড", prompt: "Place the subject in a professional blurred corporate office background." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Remove People", title_bn: "পিছনের মানুষ সরানো", prompt: "Remove all unnecessary objects and people from the background." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Solid Grey BG", title_bn: "ধূসর ব্যাকগ্রাউন্ড", prompt: "Set a neutral and professional solid grey background." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Nature Park BG", title_bn: "প্রাকৃতিক ব্যাকগ্রাউন্ড", prompt: "Change the background to a beautiful blurred outdoor park or garden." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Graduation Stage", title_bn: "সমাবর্তন ব্যাকগ্রাউন্ড", prompt: "Change the background to a graduation ceremony stage." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Transparent BG", title_bn: "স্বচ্ছ বা PNG ব্যাকগ্রাউন্ড", prompt: "Remove background completely and make it transparent PNG." },
    { cat_en: "Background", cat_bn: "ব্যাকগ্রাউন্ড", title_en: "Library Background", title_bn: "লাইব্রেরি ব্যাকগ্রাউন্ড", prompt: "Place the subject in front of a blurred bookshelf-filled library background." },

    // --- HEAD & POSTURE (মাথা ও অবস্থান) --- 10 Prompts
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Straighten Head & Ears", title_bn: "মাথা সোজা ও কান দেখা", prompt: "Straighten the head posture, ensuring both ears are equally visible and symmetrical. Align the head perfectly." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Fix Upward Gaze", title_bn: "উপরের দিকে তাকানো ঠিক করা", prompt: "Adjust the head to face directly forward, lowering it from an upward gaze. Subject should look straight into the camera." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Fix Downward Gaze", title_bn: "নিচের দিকে তাকানো ঠিক করা", prompt: "Adjust the head to face directly forward, raising it from a downward gaze. Maintain neutral neck position." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Tilt Correction", title_bn: "মাথার কাত হওয়া ঠিক করা", prompt: "Correct the slight head tilt to the left or right, ensuring a perfectly vertical head alignment." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Symmetrical Shoulders", title_bn: "কাঁধ সমান করা", prompt: "Adjust the posture so that the shoulders are level and symmetrical in the frame." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Center Alignment", title_bn: "ছবি মাঝখানে আনা", prompt: "Center the subject perfectly within the frame, ensuring equal margins on left and right." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Chin Leveling", title_bn: "চিবুক সোজা করা", prompt: "Adjust the chin height to a neutral position, neither too high nor tucked too low." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Fix Looking Away", title_bn: "ক্যামেরার দিকে তাকানো", prompt: "Digitally adjust the eyes and head to look directly into the camera lens." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Remove Hairband", title_bn: "হেয়ারব্যান্ড সরানো", prompt: "Remove any visible hairbands or clips and replace them with natural-looking hair." },
    { cat_en: "Head", cat_bn: "মাথা", title_en: "Natural Symmetries", title_bn: "চেহারার ভারসাম্য ঠিক করা", prompt: "Ensure facial features are balanced and symmetrical without looking artificial." },

    // --- FACE & SKIN (মুখ ও ত্বক) --- 11 Prompts
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Remove Acne & Blemishes", title_bn: "ব্রণ বা দাগ মোছা", prompt: "Retouch skin to be smooth and clear, removing all blemishes, acne, and spots. Maintain natural skin texture." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Remove Face Oil", title_bn: "মুখের তৈলাক্ত ভাব কমানো", prompt: "Remove oily shine from the face, create a natural matte skin finish." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Skin Whitening", title_bn: "ত্বকের রঙ ফর্সা করা", prompt: "Enhance and brighten the skin tone naturally for a glowing and fair appearance." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Remove Double Chin", title_bn: "ডাবল চিন কমানো", prompt: "Digitally reduce the double chin and sharpen the jawline naturally." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Sharpen Jawline", title_bn: "চোয়ালের গঠন শার্প করা", prompt: "Give the face a more defined and sharp masculine jawline." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Slim Face", title_bn: "মুখ চিকন বা স্লিম করা", prompt: "Subtly slim down the cheeks for a more contoured and attractive face look." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Add Gentle Smile", title_bn: "হাসি যুক্ত করা", prompt: "Add a natural and warm gentle smile to the current facial expression." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Remove Forehead Lines", title_bn: "কপালে ভাঁজ মোছা", prompt: "Smooth out deep forehead wrinkles and expression lines for a fresher look." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Soft Skin Texture", title_bn: "ত্বক মসৃণ করা", prompt: "Apply a gentle skin softening effect while preserving the high-end photographic details." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Remove Freckles", title_bn: "মেছতা বা তিল সরানো", prompt: "Remove freckles and pigmentation spots from the face naturally." },
    { cat_en: "Face", cat_bn: "মুখ", title_en: "Glowing Skin", title_bn: "ত্বক উজ্জ্বল করা", prompt: "Add a healthy radiance and natural glow to the overall skin tone." },

    // --- RESTORE & COLOR (রিস্টোর) --- 10 Prompts
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Colorize B&W Photo", title_bn: "সাদকালো থেকে রঙিন ছবি", prompt: "Restore this old photograph into a high-resolution colour portrait with accurate skin tones and studio lighting." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Fix Blurry Image", title_bn: "ঝাপসা ছবি ক্লিয়ার করা", prompt: "Sharpen the blurry features and enhance clarity using AI upscaling to achieve high-definition quality." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Remove Scratches", title_bn: "ছেঁড়া বা ফাটা ছবি ঠিক করা", prompt: "Digitally repair scratches, cracks, and missing parts of the old photo naturally." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Denoise Image", title_bn: "ছবির নয়েজ বা দানা কমানো", prompt: "Remove grainy noise and digital artifacts from the low-quality photo while keeping details sharp." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Increase Resolution", title_bn: "রেজোলিউশন বাড়ানো", prompt: "Upscale this low-resolution photo to 4K quality with realistic facial reconstructions." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Vivid Color Enhance", title_bn: "কালার উজ্জ্বল করা", prompt: "Enhance the saturation and contrast of the photo to make it look vibrant and professionally edited." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Remove Yellow Tint", title_bn: "হলুদ ভাব দূর করা", prompt: "Correct the white balance and remove the aged yellow tint from old photographs." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Facial Details Boost", title_bn: "মুখের ডিটেইল বাড়ানো", prompt: "Rebuild the eyes, lips, and skin texture details in low-quality portraits using advanced AI." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Vintage to Modern", title_bn: "পুরানো ছবি নতুনের মতো করা", prompt: "Modernize this vintage photograph into a clean mirrorless camera-grade portrait." },
    { cat_en: "Restore", cat_bn: "রিস্টোর এন্ড কালার", title_en: "Fix Water Damage", title_bn: "পানির দাগ মোছা", prompt: "Digitally remove water damage stains and mold spots from physical old scans." },

    // --- HIJAB (হিজাব) --- 10 Prompts
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Add Black Hijab", title_bn: "হিজাব পরিয়ে দেওয়া", prompt: "Add a professional and elegant solid black hijab, wrapped neatly around the head and neck." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Change Hijab Color", title_bn: "হিজাবের রঙ পরিবর্তন", prompt: "Change the color of the current hijab to white or neutral beige." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Tidy up Hijab", title_bn: "হিজাব পরিপাটি করা", prompt: "Make the hijab look smooth and perfectly draped, removing any wrinkles or folds." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Add Silk Hijab", title_bn: "সিল্ক হিজাব স্টাইল", prompt: "Change the hijab texture to premium shiny silk with modern elegant styling." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Fix Loose Hijab", title_bn: "হিজাব টাইট ও সেট করা", prompt: "Adjust the loose hijab to be perfectly set around the face and jawline." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Floral Hijab Style", title_bn: "ফুলের ডিজাইনের হিজাব", prompt: "Change the existing hijab to a beautiful floral printed design." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Add Undercap", title_bn: "হিজাবের নিচে ক্যাপ দেওয়া", prompt: "Add a matching undercap visible at the forehead for a more complete hijab look." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Match Hijab to Outfit", title_bn: "পোশাকের সাথে হিজাব ম্যাচ করা", prompt: "Change the hijab color and pattern to perfectly match the subject's existing attire." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Layered Hijab", title_bn: "লেয়ার্ড হিজাব স্টাইল", prompt: "Redesign the hijab into a sophisticated multi-layered wrap style." },
    { cat_en: "Hijab", cat_bn: "হিজাব", title_en: "Remove Hijab Pins", title_bn: "হিজাবের পিন সরানো", prompt: "Cleanly remove visible pins from the hijab for a more seamless and clean appearance." }
];

function openPromptHub() {
    document.getElementById('promptHubModal').style.display = 'flex';
    if(typeof setActiveMode === 'function') setActiveMode('mode-prompt-hub');
    renderPhCategories();
    renderPrompts();
}

function closePromptHub() { document.getElementById('promptHubModal').style.display = 'none'; }

function switchPhLang(lang) {
    phCurrentLang = lang;
    document.getElementById('ph-btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('ph-btn-bn').classList.toggle('active', lang === 'bn');
    
    // ১. সাবটাইটেল পরিবর্তন
    document.getElementById('ph-subtitle').innerText = lang === 'en' ? "Get professional AI prompts for high-end image editing" : "হাই-এন্ড ইমেজ এডিটিং এর জন্য প্রফেশনাল এআই প্রম্পট কপি করুন";
    
    // ২. সার্চ প্লেসহোল্ডার পরিবর্তন
    document.getElementById('ph-search-input').placeholder = lang === 'en' ? "Search prompt..." : "প্রম্পট সার্চ করুন...";

    // ৩. নিচের টিপস মেসেজ পরিবর্তন (আপনার কাঙ্ক্ষিত অংশ)
    const footerTip = document.getElementById('ph-footer-tip');
    if (lang === 'en') {
        footerTip.innerHTML = `<i class='fa-solid fa-lightbulb'></i> <b>Tip:</b> Copy the prompt and paste it into Google AI Studio or Google Gemini.`;
    } else {
        footerTip.innerHTML = `<i class='fa-solid fa-lightbulb'></i> <b>টিপস:</b> প্রম্পট কপি করে Google AI Studio অথবা Google Gemini -তে পেস্ট করুন।`;
    }
    
    renderPhCategories();
    renderPrompts();
}

function renderPhCategories() {
    const tabsList = document.getElementById('ph-tabs-list');
    const categories = ["All", ...new Set(promptData.map(item => item.cat_en))];
    
    tabsList.innerHTML = categories.map(cat => {
        const catName = (cat === "All") ? (phCurrentLang === "en" ? "All" : "সবগুলো") : (phCurrentLang === "en" ? cat : promptData.find(i => i.cat_en === cat).cat_bn);
        return `<button class="cat-btn ${phCurrentCat === cat ? 'active' : ''}" onclick="setPhCategory('${cat}')">${catName}</button>`;
    }).join('');
}

function setPhCategory(cat) {
    phCurrentCat = cat;
    renderPhCategories();
    renderPrompts();
}

function renderPrompts() {
    const grid = document.getElementById('ph-grid');
    const searchVal = document.getElementById('ph-search-input').value.toLowerCase();
    
    const filtered = promptData.filter(item => {
        const matchesCat = (phCurrentCat === "All" || item.cat_en === phCurrentCat);
        const matchesSearch = item.title_en.toLowerCase().includes(searchVal) || item.title_bn.toLowerCase().includes(searchVal);
        return matchesCat && matchesSearch;
    });

    grid.innerHTML = filtered.map(item => `
        <div class="prompt-card">
            <h4>${phCurrentLang === 'en' ? item.title_en : item.title_bn}</h4>
            <div class="prompt-box">${item.prompt}</div>
            <button class="btn-copy-ph" onclick="copyPhText(this, '${item.prompt.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-copy"></i> <span>${phCurrentLang === 'en' ? 'Copy Prompt' : 'প্রম্পট কপি করুন'}</span>
            </button>
        </div>
    `).join('');
}

function searchPrompts() { renderPrompts(); }

// বাটন টেক্সট চেঞ্জিং কপি ফাংশন
function copyPhText(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalContent = btn.innerHTML;
        const copiedText = phCurrentLang === 'en' ? 'Copied!' : 'কপি হয়েছে!';
        
        btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>${copiedText}</span>`;
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalContent;
            btn.classList.remove('copied');
        }, 2000);
    });
}
