function openAgreementModal() {
    setActiveMode('mode-agreement');
    document.getElementById('agreementModal').style.display = 'flex';
    setAgLang('bn');
    setTimeout(adjustAgPreviewScale, 300);
}

let agLang = 'bn';

const agTemplates = {
  bn: {
    rent: { 
      title: 'আবাসিক বাসা ভাড়ার চুক্তিপত্র', 
      text: 'অদ্য ইংরেজি {{val2}} তারিখে এই বাসা ভাড়ার চুক্তিপত্র সম্পাদিত হইল। প্রথম পক্ষ (মালিক): {{name}}, পিতা: ...................., ঠিকানা: {{address}}। দ্বিতীয় পক্ষ (ভাড়াটিয়া): {{p2}}, পিতা: ...................., স্থায়ী ঠিকানা: ....................। শর্তাবলী: ১) অত্র ফ্ল্যাটের মাসিক ভাড়া {{val1}} টাকা মাত্র যা প্রতি মাসের ৫ তারিখের মধ্যে পরিশোধযোগ্য। ২) অগ্রিম জামানত বাবদ ............ টাকা প্রথম পক্ষ বুঝিয়া পাইলেন। ৩) চুক্তির মেয়াদ অদ্য হইতে পরবর্তী ২ (দুই) বছরের জন্য বলবৎ থাকিবে। ৪) বিদ্যুৎ, গ্যাস ও পানির বিল দ্বিতীয় পক্ষ বহন করিবেন। ৫) ফ্ল্যাটের কোনো আসবাবপত্র বা দেয়ালের ক্ষতি হইলে দ্বিতীয় পক্ষ নিজ খরচে মেরামত করিয়া দিবেন। ৬) কোনো পক্ষ চুক্তি বাতিল করিতে চাহিলে ৩ মাস পূর্বে লিখিত নোটিশ প্রদান করিতে হইবে। ৭) অসামাজিক কোনো কাজে লিপ্ত হইলে মালিক বিনা নোটিশে উচ্ছেদ করার অধিকার রাখেন। উভয় পক্ষ সজ্ঞানে অত্র চুক্তিতে স্বাক্ষর করিলেন।' 
    },
    land: { 
      title: 'জমি বিক্রয় বায়না চুক্তিপত্র', 
      text: 'আমি প্রথম পক্ষ (বিক্রেতা): {{name}}, পিতা: {{witness}}, সাং: .................। আপনি দ্বিতীয় পক্ষ (ক্রেতা): {{p2}}। নিম্ন তফশিল বর্ণিত জমি বিক্রয়ের প্রস্তাব করিলে আপনি তাহা ক্রয় করিতে সম্মত হইয়াছেন। জমির মোট মূল্য নির্ধারণ করা হইয়াছে {{val1}} টাকা। অদ্য বায়না বাবদ নগদ ........... টাকা প্রদান করা হইল। শর্তাবলী: ১) অবশিষ্ট টাকা আগামী {{val2}} মাসের মধ্যে পরিশোধ করিয়া দলিল রেজিষ্ট্রি করিয়া লইতে হইবে। ২) বিক্রেতা এই মর্মে অঙ্গীকার করিতেছেন যে, জমিটি সকল প্রকার দায়-মুক্ত ও নিষ্কণ্টক। ৩) নির্ধারিত সময়ের মধ্যে ক্রেতা সম্পূর্ণ মূল্য পরিশোধে ব্যর্থ হইলে বায়ানার টাকা বাজেয়াপ্ত হইবে। ৪) যদি বিক্রেতা দলিল দিতে অস্বীকার করেন তবে ক্রেতা আদালতের মাধ্যমে দলিল করিয়া লইতে পারিবেন। ৫) অদ্য হইতে জমির দখল ক্রেতা বুঝিয়া পাইলেন। সাক্ষীদের উপস্থিতিতে অত্র চুক্তি স্বাক্ষরিত হইল।' 
    },
    shop: { 
      title: 'দোকান ঘর ভাড়ার চুক্তিপত্র', 
      text: 'দোকান মালিক (প্রথম পক্ষ): {{name}}, ঠিকানা: {{address}}। দোকান ভাড়াটিয়া (দ্বিতীয় পক্ষ): {{p2}}। অত্র চুক্তিপত্রের শর্ত নিম্নরূপ: ১) দোকানের অগ্রিম জামানত বাবদ {{val1}} টাকা দ্বিতীয় পক্ষ প্রদান করিলেন। ২) মাসিক ভাড়া নির্ধারণ করা হইল ........... টাকা। ৩) চুক্তির মেয়াদ {{val2}} বছর পর্যন্ত বলবৎ থাকিবে। ৪) দোকান ঘরের ট্রেড লাইসেন্স ও আনুষঙ্গিক কর দ্বিতীয় পক্ষ বহন করিবেন। ৫) দোকান ঘরের অভ্যন্তরীণ সাজসজ্জা ভাড়াটিয়া নিজ খরচে করিবেন, তবে মূল কাঠামোর পরিবর্তন করা যাইবে না। ৬) মেয়াদ শেষে দোকান ছাড়িতে হইলে ৩ মাস পূর্বে নোটিশ দিতে হইবে এবং মালিককে পূর্বের অবস্থায় দোকান বুঝাইয়া দিতে হইবে। ৭) প্রতি মাসের ভাড়া পরবর্তী মাসের ৭ তারিখের মধ্যে পরিশোধ করিতে হইবে। ৮) কোনো পক্ষ শর্ত ভঙ্গ করিলে আইনত ব্যবস্থা গ্রহণ করা যাইবে।' 
    },
    money: { 
      title: 'টাকা ধারের অঙ্গীকারনামা', 
      text: 'দাতা: {{p2}}, গ্রহিতা: {{name}}, পিতা: {{witness}}। আমি গ্রহিতা বিশেষ ব্যবসায়িক প্রয়োজনে দ্বিতীয় পক্ষের নিকট হইতে নগদ {{val1}} টাকা ঋণ হিসেবে গ্রহণ করিলাম। শর্তাবলী: ১) উক্ত টাকা সম্পূর্ণ সুদমুক্ত ধার হিসেবে গণ্য হইবে। ২) আমি অঙ্গীকার করিতেছি যে, আগামী {{val2}} তারিখের মধ্যে উক্ত টাকা এককালীন পরিশোধ করিব। ৩) যদি আমি নির্ধারিত সময়ে টাকা পরিশোধ করিতে ব্যর্থ হই, তবে পাওনাদার আমার বিরুদ্ধে প্রচলিত আইনে মামলা দায়ের করিয়া টাকা আদায় করিতে পারিবেন। ৪) টাকার বিনিময়ে আমি কোনো স্থাবর সম্পত্তি বন্ধক রাখিলে তাহা পাওনাদারের অধীনে থাকিবে। ৫) অত্র চুক্তিতে সাক্ষ্য প্রদানকারী ব্যক্তিগণ এই লেনদেনের সাক্ষী হিসেবে গণ্য হইবেন। আমি সুস্থ মস্তিষ্কে কারো প্ররোচনা ছাড়াই এই অঙ্গীকারনামায় স্বাক্ষর করিলাম।' 
    },
    car: { 
      title: 'মোটরযান বিক্রয় ও হস্তান্তর চুক্তি', 
      text: 'বিক্রেতা: {{name}}, ক্রেতা: {{p2}}। গাড়ির বিবরণ: {{address}}, ইঞ্জিন নং: ..............., চেসিস নং: ...............। বিক্রয় মূল্য: {{val1}} টাকা। অদ্য ক্রেতা বিক্রেতাকে সমুদয় টাকা বুঝাইয়া দিলেন। শর্তাবলী: ১) অদ্য হইতে গাড়ির মালিকানা ও দখল ক্রেতার নিকট অর্পিত হইল। ২) গাড়ির পূর্ববর্তী সকল মামলা, ট্যাক্স টোকেন ও বকেয়া বিক্রেতা পরিশোধ করিলেন। ৩) অদ্যকার পর হইতে গাড়ির যে কোনো দুর্ঘটনা বা অপরাধমূলক কাজের দায়ভার ক্রেতা {{p2}} এর উপর বর্তাইবে। ৪) আগামী {{val2}} দিনের মধ্যে নামজারী বা মালিকানা পরিবর্তনের জন্য বিক্রেতা প্রয়োজনীয় সকল দলিলে স্বাক্ষর প্রদান করিবেন। ৫) ভবিষ্যতে বিক্রেতা এই গাড়ির উপর আর কোনো দাবি করিতে পারিবেন না। উভয় পক্ষ এই চুক্তিতে স্বেচ্ছায় স্বাক্ষর প্রদান করিলেন।' 
    },
    partnership: { 
      title: 'অংশীদারিত্ব ব্যবসায়িক চুক্তিপত্র', 
      text: 'অংশীদারগণ: ১) {{name}}, ২) {{p2}}। ব্যবসার নাম: ...................., ঠিকানা: {{address}}। শর্তাবলী: ১) ব্যবসায় মোট মূলধন {{val1}} টাকা, যাহা উভয় পক্ষ সমানভাবে অথবা আনুপাতিক হারে বিনিয়োগ করিলেন। ২) ব্যবসার লাভ-ক্ষতি বিনিয়োগের অনুপাত অনুযায়ী বন্টন করা হইবে। ৩) চুক্তির মেয়াদ আগামী {{val2}} বছর পর্যন্ত বলবৎ থাকিবে। ৪) ব্যবসার সকল হিসাব-নিকাশ একটি নির্দিষ্ট ব্যাংক অ্যাকাউন্টের মাধ্যমে পরিচালিত হইবে এবং উভয় পক্ষের স্বাক্ষর আবশ্যক। ৫) কোনো অংশীদার ব্যবসা ত্যাগ করিতে চাহিলে ৬ মাস পূর্বে অবহিত করিতে হইবে। ৬) নতুন অংশীদার গ্রহণ করিতে হইলে সকল অংশীদারের লিখিত সম্মতি প্রয়োজন। ৭) ব্যবসার সকল নথিপত্র প্রধান কার্যালয়ে সংরক্ষিত থাকিবে। ৮) মতবিরোধ দেখা দিলে আপোষ-মীমাংসা বা সালিশি আইনের মাধ্যমে সমাধান করা হইবে।' 
    },
    construction: { 
      title: 'বাড়ি নির্মাণ কাজের চুক্তিপত্র', 
      text: 'মালিক: {{name}}, ঠিকাদার: {{p2}}। কাজের স্থান: {{address}}। শর্তাবলী: ১) ভবনটি অনুমোদিত নকশা অনুযায়ী নির্মাণ করিতে হইবে। ২) মোট বাজেট ধরা হইয়াছে {{val1}} টাকা। ৩) কাজ সম্পন্ন করার শেষ সময় {{val2}} তারিখ নির্ধারণ করা হইল। ৪) ব্যবহৃত রড, সিমেন্ট ও অন্যান্য উপকরণের গুণগত মান মালিকের পর্যবেক্ষণ অনুযায়ী হইতে হইবে। ৫) যদি নির্ধারিত সময়ে কাজ শেষ না হয়, তবে ঠিকাদারকে জরিমানা প্রদান করিতে হইবে। ৬) শ্রমিকের নিরাপত্তার দায়িত্ব ঠিকাদারের থাকিবে। ৭) কাজের অগ্রগতির ভিত্তিতে কিস্তিতে টাকা পরিশোধ করা হইবে। ৮) কোনো ত্রুটিপূর্ণ কাজ ধরা পড়িলে ঠিকাদারকে নিজ খরচে তাহা পুনঃনির্মাণ করিয়া দিতে হইবে। মালিক ও ঠিকাদার সজ্ঞানে এই চুক্তিতে আবদ্ধ হইলেন।' 
    },
    flat: { 
      title: 'ফ্ল্যাট বিক্রয় চুক্তিপত্র', 
      text: 'বিক্রেতা: {{name}}, ক্রেতা: {{p2}}। ফ্ল্যাটের ঠিকানা: {{address}}, আয়তন: ............ বর্গফুট। মোট মূল্য: {{val1}} টাকা। অদ্য বুকিং মানি বাবদ নগদ ........... টাকা পরিশোধ করা হইল। শর্তাবলী: ১) বাকি টাকা আগামী {{val2}} তারিখের মধ্যে অথবা কিস্তির মাধ্যমে পরিশোধযোগ্য। ২) ফ্ল্যাট হস্তান্তরের সময় রেজিষ্ট্রেশন ও মিউটেশন সম্পন্ন করিয়া দিতে হইবে। ৩) ফ্ল্যাট নির্মাণে ব্যবহৃত ফিক্সচারসমূহ চুক্তিতে বর্ণিত মান অনুযায়ী হইতে হইবে। ৪) যদি বিক্রেতা ফ্ল্যাট দিতে ব্যর্থ হন, তবে মূল টাকার দ্বিগুণ ফেরত দিতে বাধ্য থাকিবেন। ৫) কমন স্পেস ব্যবহারের নিয়মাবলী সরকারি আইন মোতাবেক হইবে। ৬) গ্যাস, বিদ্যুৎ ও পানি সংযোগের খরচ ক্রেতা বহন করিবেন। উভয় পক্ষ শর্তাবলী মানিয়া চলিতে বাধ্য থাকিবেন।' 
    },
    loan: { 
      title: 'ঋণ পরিশোধের আইনি অঙ্গীকারনামা', 
      text: 'আমি {{name}}, পিতা: {{witness}}, অত্র অঙ্গীকারনামা দ্বারা ঘোষণা করিতেছি যে, আমি দ্বিতীয় পক্ষ {{p2}} এর নিকট হইতে ব্যক্তিগত প্রয়োজনে {{val1}} টাকা ঋণ গ্রহণ করিয়াছি। আমি অঙ্গীকার করিতেছি যে, উক্ত টাকা আগামী {{val2}} তারিখের মধ্যে অথবা নিম্নোক্ত কিস্তি অনুযায়ী পরিশোধ করিব। শর্তাবলী: ১) কোনো কারণে আমি মৃত্যুবরণ করিলে আমার উত্তরসূরিগণ এই ঋণ পরিশোধে বাধ্য থাকিবে। ২) ঋণের টাকা পরিশোধে বিলম্ব হইলে আইনত দণ্ডনীয় হইব। ৩) পাওনাদার চাইলে আমার স্থাবর সম্পত্তি হইতে পাওনা টাকা আদায়ের অধিকার রাখিবেন। ৪) কোনো ওজর-আপত্তি ছাড়াই টাকা ফেরত দিতে আমি অঙ্গীকারবদ্ধ। ৫) পাওনাদার কর্তৃক প্রদত্ত রসিদ পরিশোধের প্রমাণ হিসেবে গণ্য হইবে। অত্র দলিলটি একটি সাক্ষ্য হিসেবে সংরক্ষিত থাকিবে।' 
    },
    servant: { 
      title: 'গৃহকর্মী বা ব্যক্তিগত কর্মচারী নিয়োগ চুক্তি', 
      text: 'নিয়োগকারী: {{name}}, কর্মচারী: {{p2}}। কর্মস্থল: {{address}}। মাসিক বেতন: {{val1}} টাকা। শর্তাবলী: ১) কর্মচারীকে প্রতিদিন সকাল ........... হইতে রাত ........... পর্যন্ত ডিউটি পালন করিতে হইবে। ২) নিয়োগের মেয়াদ অদ্য হইতে {{val2}} মাস/বছর বলবৎ থাকিবে। ৩) কর্মচারীর সততা ও নিষ্ঠার সাথে কাজ করিতে হইবে, কোনো প্রকার চুরির প্রমাণ পাওয়া গেলে তাকে তাৎক্ষণিক বরখাস্ত ও আইনগত ব্যবস্থা নেওয়া হইবে। ৪) মাসে ২ দিন ছুটি ভোগের অধিকার থাকিবে। ৫) নিয়োগকারী কর্মচারীর নিরাপত্তা ও খাদ্যের বিষয় বিবেচনা করিবেন। ৬) চাকরি ছাড়িতে হইলে ১ মাস পূর্বে নোটিশ দিতে হইবে। ৭) বেতন মাসের ১০ তারিখের মধ্যে পরিশোধ করা হইবে। উভয় পক্ষ শর্তাবলীতে একমত হইয়া স্বাক্ষর করিলেন।' 
    },
    lease: { 
      title: 'দীর্ঘমেয়াদী জমি লিজ বা ইজারা চুক্তি', 
      text: 'লিজ দাতা: {{name}}, লিজ গ্রহিতা: {{p2}}। জমির অবস্থান ও বিবরণ: {{address}}। লিজের মেয়াদ: {{val2}} বছর। বাৎসরিক লিজ ফি: {{val1}} টাকা। শর্তাবলী: ১) লিজ গ্রহিতা উক্ত জমিতে কেবলমাত্র চুক্তিতে উল্লিখিত ফসল বা কাঠামো নির্মাণ করিতে পারিবেন। ২) প্রতি বছরের ফি অগ্রিম পরিশোধযোগ্য। ৩) মেয়াদ শেষে লিজ গ্রহিতা জমিটি পূর্বের অবস্থায় দাতার নিকট বুঝাইয়া দিবেন। ৪) দাতা লিজের মেয়াদের মধ্যে জমিতে কোনো বিঘ্ন ঘটাইতে পারিবেন না। ৫) সরকারি কোনো খাজনা বা কর দাতা পরিশোধ করিবেন। ৬) লিজ গ্রহিতা জমিটি তৃতীয় পক্ষের নিকট হস্তান্তর বা উপ-লিজ দিতে পারিবেন না। ৭) শর্ত ভঙ্গে লিজ বাতিল বলিয়া গণ্য হইবে। সাক্ষীদের উপস্থিতিতে অদ্য চুক্তিপত্রটি সম্পাদিত হইল।' 
    },
    marriage_ag: { 
      title: 'দেনমোহর ও দাম্পত্য অধিকার সংক্রান্ত অঙ্গীকারনামা', 
      text: 'আমি {{name}}, পিতা: {{witness}}, অত্র অঙ্গীকারনামা প্রদান করিতেছি যে, আমার স্ত্রী {{p2}} এর পাওনা দেনমোহর বাবদ {{val1}} টাকা ধার্য করা হইয়াছে। অদ্য তারিখে আমি দেনমোহর বাবদ ........... টাকা নগদ পরিশোধ করিলাম। শর্তাবলী: ১) বাকি টাকা ভবিষ্যতে আমি স্ত্রীর চাহিবা মাত্র অথবা কিস্তিতে পরিশোধে বাধ্য থাকিব। ২) আমি আমার স্ত্রীর ভরণ-পোষণ ও সামাজিক নিরাপত্তা বজায় রাখিব। ৩) দাম্পত্য জীবনে কোনো প্রকার নির্যাতন বা অমানবিক আচরণ করিব না। ৪) আমাদের সন্তানদের উজ্জ্বল ভবিষ্যতের জন্য আমি সচেষ্ট থাকিব। ৫) অদ্য {{val2}} তারিখে আমরা এই অঙ্গীকারে আবদ্ধ হইলাম। আমাদের দাম্পত্য জীবন সুখের ও দীর্ঘস্থায়ী হউক। এই অঙ্গীকারনামা আমাদের মধ্যকার সকল ভুল বোঝাবুঝি অবসানের দলিল হিসেবে গণ্য হইবে।' 
    },
    transport: { 
      title: 'পরিবহন বা যানবহন ভাড়া চুক্তিপত্র', 
      text: 'যানবাহন মালিক: {{name}}, ভাড়াটিয়া: {{p2}}। যানের বিবরণ: {{address}}। শর্তাবলী: ১) দৈনিক/মাসিক ভাড়া {{val1}} টাকা নির্ধারণ করা হইল। ২) জ্বালানি খরচ ও পার্কিং ফি ভাড়াটিয়া বহন করিবেন। ৩) চুক্তির মেয়াদ {{val2}} পর্যন্ত বলবৎ থাকিবে। ৪) কোনো যান্ত্রিক ত্রুটি দেখা দিলে মালিক মেরামত করিবেন, তবে দুর্ঘটনাজনিত ক্ষতি ভাড়াটিয়া বহন করিবেন। ৫) চালকের লাইসেন্স ও প্রয়োজনীয় কাগজপত্র মালিক নিশ্চিত করিবেন। ৬) গাড়িটি কোনো প্রকার অবৈধ কাজে ব্যবহার করা যাইবে না। ৭) নির্দিষ্ট সময় শেষে গাড়িটি মালিককে বুঝাইয়া দিতে হইবে। ৮) কোনো দুর্ঘটনা ঘটিলে তাৎক্ষণিক মালিককে অবহিত করিতে হইবে। উভয় পক্ষ অত্র চুক্তিতে একমত পোষণ করিলেন।' 
    },
    event: { 
      title: 'ইভেন্ট ম্যানেজমেন্ট বা অনুষ্ঠান পরিচালনা চুক্তি', 
      text: 'আয়োজক/ক্লায়েন্ট: {{name}}, ইভেন্ট ডিরেক্টর: {{p2}}। অনুষ্ঠানের স্থান: {{address}}। ইভেন্ট সম্পন্ন হওয়ার তারিখ: {{val2}}। মোট চুক্তি মূল্য: {{val1}} টাকা। শর্তাবলী: ১) অগ্রিম ৫০% টাকা অদ্য প্রদান করা হইল। ২) ডেকোরেশন, খাবার ও সাউন্ড সিস্টেমের গুণগত মান নিশ্চিত করিতে হইবে। ৩) অনুষ্ঠানে কোনো বিঘ্ন ঘটিলে ইভেন্ট ডিরেক্টর দায়ী থাকিবেন। ৪) প্রাকৃতিক দুর্যোগ বা জরুরি কারণে অনুষ্ঠান পিছিয়ে গেলে উভয় পক্ষের সম্মতিতে নতুন তারিখ নির্ধারণ হইবে। ৫) অতিরিক্ত কোনো সেবা চাহিলে অতিরিক্ত মূল্য পরিশোধ করিতে হইবে। ৬) অনুষ্ঠান শেষে বাকি টাকা পরিশোধযোগ্য। ৭) নির্ধারিত সময়ের মধ্যে কাজ শুরু ও শেষ করিতে হইবে। উভয় পক্ষ শর্তাবলীতে স্বাক্ষর করিলেন।' 
    },
    mortgage: { 
      title: 'স্থাবর সম্পত্তি বন্ধকী চুক্তিপত্র', 
      text: 'বন্ধক দাতা: {{name}}, বন্ধক গ্রহিতা: {{p2}}। বন্ধকী সম্পদের বিবরণ: {{address}}। ঋণের পরিমাণ: {{val1}} টাকা। শর্তাবলী: ১) ঋণের টাকা পরিশোধ না হওয়া পর্যন্ত সম্পদের মূল দলিল বন্ধক গ্রহিতার নিকট থাকিবে। ২) ঋণের মেয়াদ আগামী {{val2}} তারিখ পর্যন্ত। ৩) যদি দাতা নির্ধারিত সময়ে টাকা পরিশোধে ব্যর্থ হন, তবে গ্রহিতা উক্ত সম্পত্তি বিক্রয় করিয়া পাওনা টাকা আদায়ের অধিকার রাখিবেন। ৪) সম্পদের ভোগ-দখল চুক্তির শর্ত মোতাবেক দাতার নিকট থাকিবে। ৫) বন্ধকী পিরিয়ডে সম্পদের কোনো ক্ষতি সাধন করা যাইবে না। ৬) সরকারি কর ও খাজনা দাতা পরিশোধ করিবেন। ৭) ঋণ পরিশোধের সাথে সাথে দলিল ফেরত প্রদান করা হইবে। উভয় পক্ষ সজ্ঞানে অত্র দলিলে স্বাক্ষর করিলেন।' 
    },
    employment: {
      title: 'চাকরির নিয়োগপত্র ও অঙ্গীকারনামা',
      text: 'নিয়োগকারী প্রতিষ্ঠান: {{name}}, ঠিকানা: {{address}}। কর্মচারী: {{p2}}। পদবী: ...............। শর্তাবলী: ১) মাসিক বেতন {{val1}} টাকা এবং অন্যান্য ভাতা প্রযোজ্য ক্ষেত্রে প্রদান করা হইবে। ২) ডিউটির সময় সকাল ৯টা হইতে সন্ধ্যা ৬টা পর্যন্ত। ৩) পরীক্ষার কাল (Probation Period) {{val2}} মাস। ৪) কর্মচারী প্রতিষ্ঠানের সকল গোপনীয়তা রক্ষা করিবেন। ৫) প্রতিষ্ঠানের স্বার্থের পরিপন্থী কোনো কাজে লিপ্ত হইলে তাৎক্ষণিক বহিষ্কার করা হইবে। ৬) পদত্যাগ করিতে চাইলে ১ মাস পূর্বে লিখিত নোটিশ প্রদান করিতে হইবে। ৭) সকল প্রকার ছুটির জন্য কর্তৃপক্ষের পূর্বানুমতি আবশ্যক। ৮) প্রতিষ্ঠানের শৃঙ্খলা বজায় রাখা কর্মচারীর মৌলিক দায়িত্ব। নিয়োগকারী ও কর্মচারী উভয় পক্ষ এই শর্তাবলীতে একমত।'
    },
    security: {
      title: 'নিরাপত্তা গার্ড বা সিকিউরিটি সার্ভিস চুক্তি',
      text: 'ক্লায়েন্ট: {{name}}, সিকিউরিটি এজেন্সি: {{p2}}। সেবার স্থান: {{address}}। শর্তাবলী: ১) এজেন্সি প্রতিদিন ২৪ ঘণ্টা নিরাপত্তার জন্য গার্ড সরবরাহ করিবে। ২) প্রতি মাসে সার্ভিস চার্জ হিসেবে {{val1}} টাকা প্রদান করিতে হইবে। ৩) চুক্তির মেয়াদ {{val2}} মাস পর্যন্ত। ৪) ডিউটিরত অবস্থায় কোনো চুরি বা ক্ষয়ক্ষতি হইলে এজেন্সি তদন্ত সাপেক্ষে ক্ষতিপূরণ দিতে বাধ্য থাকিবে। ৫) গার্ডদের ইউনিফর্ম ও আনুষঙ্গিক সরঞ্জাম এজেন্সি প্রদান করিবে। ৬) কোনো গার্ডের আচরণ সন্তোষজনক না হইলে তাৎক্ষণিক পরিবর্তন করিয়া দিতে হইবে। ৭) বিল পরবর্তী মাসের ৫ তারিখের মধ্যে পরিশোধ করিতে হইবে। ৮) উভয় পক্ষ নোটিশের মাধ্যমে চুক্তি বাতিল করিতে পারিবে।'
    },
    supply: {
      title: 'পণ্য সরবরাহ বা সাপ্লাই চুক্তিপত্র',
      text: 'সরবরাহকারী: {{name}}, ক্রেতা: {{p2}}। পণ্যের বিবরণ: {{address}}। শর্তাবলী: ১) পণ্যের একক প্রতি মূল্য {{val1}} টাকা নির্ধারণ করা হইল। ২) পণ্য সরবরাহের শেষ তারিখ {{val2}}। ৩) মানসম্মত পণ্য সরবরাহ না করিলে ক্রেতা পণ্য ফেরত দিতে পারিবেন। ৪) ডেলিভারি খরচ সরবরাহকারী/ক্রেতা বহন করিবেন। ৫) পণ্যের বিল ডেলিভারির পর কিস্তিতে বা এককালীন পরিশোধযোগ্য। ৬) জরুরি প্রয়োজনে অর্ডারের পরিমাণ পরিবর্তন করা যাইতে পারে। ৭) কোনো পক্ষ চুক্তি লঙ্ঘন করিলে বাজারমূল্য অনুযায়ী জরিমানা দিতে হইবে। ৮) অত্র চুক্তিপত্রের সকল কপি উভয় পক্ষের নিকট সংরক্ষিত থাকিবে।'
    },
    internet: {
      title: 'আইএসপি বা ইন্টারনেট সংযোগ চুক্তিপত্র',
      text: 'সেবা প্রদানকারী: {{name}}, গ্রাহক: {{p2}}। গ্রাহকের ঠিকানা: {{address}}। ব্যান্ডউইথ: ........... Mbps। মাসিক বিল: {{val1}} টাকা। শর্তাবলী: ১) সংযোগ প্রদানের মেয়াদ অদ্য হইতে {{val2}} বছর। ২) গ্রাহক প্রতি মাসের ১০ তারিখের মধ্যে বিল পরিশোধ করিবেন। ৩) কোনো টেকনিক্যাল সমস্যা হইলে সেবা প্রদানকারী ২৪ ঘণ্টার মধ্যে সমাধান করিবেন। ৪) রাউটার ও আনুষঙ্গিক যন্ত্রপাতি গ্রাহক নিজ দায়িত্বে রক্ষণাবেক্ষণ করিবেন। ৫) অবৈধ কোনো কাজে ইন্টারনেট ব্যবহার করা যাইবে না। ৬) বিল বকেয়া থাকিলে সংযোগ বিচ্ছিন্ন করার অধিকার সেবা প্রদানকারীর রহিয়াছে। ৭) পুনরায় সংযোগের জন্য চার্জ প্রদান করিতে হইবে। উভয় পক্ষ শর্তসমূহ মানিয়া চলিতে সম্মত হইলেন।'
    },
    freelance: {
      title: 'সফটওয়্যার বা আইটি প্রজেক্ট চুক্তিপত্র',
      text: 'ডেভেলপার: {{name}}, ক্লায়েন্ট: {{p2}}। প্রজেক্টের নাম: {{address}}। বাজেট: {{val1}} টাকা। প্রজেক্ট ডেলিভারি সময়: {{val2}}। শর্তাবলী: ১) প্রজেক্ট শুরুর আগে ৩০% টাকা অগ্রিম দিতে হইবে। ২) প্রজেক্ট চলাকালীন ডেভেলপার নিয়মিত আপডেট প্রদান করিবেন। ৩) ডেলিভারির পর ৩ মাস পর্যন্ত বাগ ফিক্সিং সাপোর্ট ফ্রি প্রদান করা হইবে। ৪) সোর্স কোড ক্লায়েন্টের সম্পত্তি হিসেবে গণ্য হইবে। ৫) অতিরিক্ত ফিচারের জন্য অতিরিক্ত পেমেন্ট করিতে হইবে। ৬) চুক্তির শর্ত ভঙ্গ করিলে প্রজেক্ট বাতিল বলিয়া গণ্য হইবে। ৭) কোনো গোপনীয় তথ্য তৃতীয় পক্ষের নিকট শেয়ার করা যাইবে না। অদ্য এই চুক্তিপত্রটি চূড়ান্ত বলিয়া গণ্য হইল।'
    }
  },
  en: {
    rent: { 
      title: 'Residential House Rent Agreement', 
      text: 'This Rental Agreement is executed on {{val2}} between First Party (Landlord): {{name}}, Address: {{address}} and Second Party (Tenant): {{p2}}. Terms and Conditions: 1) The monthly rent is fixed at {{val1}} payable by the 5th of each month. 2) A security deposit of ............ has been received by the landlord. 3) The lease period shall be for 2 years starting from today. 4) Utility bills including electricity, water, and gas shall be paid by the tenant. 5) The tenant shall not make any structural changes to the premises without written consent. 6) Either party can terminate this agreement by giving 3 months advance notice. 7) Any illegal activities within the premises will lead to immediate eviction. Both parties have signed this agreement in sound mind.' 
    },
    land: { 
      title: 'Land Sale Advance (Bayana) Agreement', 
      text: 'This agreement is made between Seller: {{name}} and Buyer: {{p2}}. The seller agrees to sell the land described at {{address}} for a total price of {{val1}}. An advance amount of ........... has been paid today. Conditions: 1) The remaining balance must be paid within {{val2}} months to complete the registration. 2) The seller guarantees that the land is free from all encumbrances and legal disputes. 3) If the buyer fails to pay the balance in time, the advance will be forfeited. 4) If the seller refuses to register the land, the buyer can seek legal remedy through court. 5) Physical possession is handed over to the buyer today. Signed by both parties in the presence of witnesses.' 
    },
    shop: { 
      title: 'Commercial Shop Lease Agreement', 
      text: 'Landlord: {{name}}, Tenant: {{p2}}. Location: {{address}}. Terms: 1) The tenant has paid an advance security deposit of {{val1}}. 2) Monthly rent is fixed at ........... per month. 3) This lease is valid for {{val2}} years. 4) The tenant is responsible for trade licenses and commercial taxes. 5) Internal decorations are allowed but the main structure cannot be altered. 6) The tenant must provide 3 months notice before vacating the shop. 7) Rent must be paid by the 7th of every month. 8) Legal action can be taken by either party for breach of contract. Executed on this day with full consent.' 
    },
    money: { 
      title: 'Financial Loan/Debt Agreement', 
      text: 'Lender: {{p2}}, Borrower: {{name}}, Father: {{witness}}. I, the borrower, have received a cash loan of {{val1}} from the lender for personal business needs. Terms: 1) This loan is interest-free. 2) I promise to repay the full amount by {{val2}}. 3) If I fail to repay on time, the lender has the right to file a legal suit to recover the money. 4) The borrower will be liable for all legal costs incurred. 5) Any property pledged as security will remain with the lender until full repayment. 6) This document serves as legal evidence of the debt. Signed voluntarily without any pressure.' 
    },
    vehicle: { 
      title: 'Vehicle Sale & Transfer Agreement', 
      text: 'Seller: {{name}}, Buyer: {{p2}}. Vehicle Details: {{address}}. Sale Price: {{val1}}. Conditions: 1) The seller has received full payment and handed over the keys and documents. 2) All previous taxes, fines, and legal issues are cleared by the seller. 3) From today, the buyer is solely responsible for any accidents or legal liabilities related to the vehicle. 4) The seller will provide necessary signatures for ownership transfer within {{val2}} days. 5) The seller waives all future claims on the vehicle. 6) Both parties have verified the engine and chassis numbers. Signed on this date.' 
    },
    partnership: { 
      title: 'Business Partnership Agreement', 
      text: 'Partners: {{name}} and {{p2}}. Business Name: ...................., Address: {{address}}. Terms: 1) Total investment is {{val1}} contributed as per agreed shares. 2) Profits and losses will be shared according to the investment ratio. 3) The partnership duration is {{val2}} years. 4) A joint bank account will be operated for all business transactions. 5) Any partner wishing to leave must give 6 months notice. 6) New partners can only be added with unanimous written consent. 7) Proper accounting records must be maintained and accessible to all partners. 8) Disputes will be settled through arbitration or mutual discussion.' 
    },
    construction: { 
      title: 'Building Construction Contract', 
      text: 'Owner: {{name}}, Contractor: {{p2}}. Site Location: {{address}}. Terms: 1) The building must be constructed as per the approved architectural plan. 2) The total budget is fixed at {{val1}}. 3) Completion date is set for {{val2}}. 4) High-quality materials like rod, cement, and sand must be used as specified. 5) Delay in completion will result in a penalty per day. 6) The contractor is responsible for the safety of laborers. 7) Payments will be made in installments based on progress. 8) Any structural defects must be rectified by the contractor at their own cost. Signed by both parties.' 
    },
    flat: { 
      title: 'Flat/Apartment Purchase Agreement', 
      text: 'Seller: {{name}}, Buyer: {{p2}}. Flat Address: {{address}}, Size: ............ Sqft. Total Price: {{val1}}. Booking money of ........... has been paid. Terms: 1) The balance amount shall be paid by {{val2}} or through installments. 2) The seller will provide a clear title and mutation at the time of handover. 3) Fixtures and fittings must be of the quality mentioned in the brochure. 4) If the seller fails to deliver, double the booking amount will be refunded. 5) Utility connection costs are to be borne by the buyer. 6) Common space usage will be as per building bylaws. Both parties agree to abide by these terms.' 
    },
    loan_repay: { 
      title: 'Loan Repayment Commitment Bond', 
      text: 'I, {{name}}, Father: {{witness}}, hereby declare that I owe {{val1}} to {{p2}}. I commit to repaying the said amount by {{val2}} or as per the agreed schedule. Terms: 1) In case of my demise, my legal heirs will be responsible for this debt. 2) Delay in payment will allow the lender to take legal action. 3) The lender has the right to recover the amount from my movable or immovable assets. 4) No excuses for non-payment will be accepted after the deadline. 5) This document is a binding legal instrument. Signed in the presence of witnesses.' 
    },
    employment: { 
      title: 'Employment Contract & Appointment', 
      text: 'Employer: {{name}}, Address: {{address}}. Employee: {{p2}}. Designation: ............... Terms: 1) Monthly salary is {{val1}} plus other applicable benefits. 2) Working hours are 9 AM to 6 PM. 3) The probation period is {{val2}} months. 4) The employee must maintain strict confidentiality of business trade secrets. 5) Any misconduct will lead to immediate termination without notice. 6) Resignation requires a 1-month written notice. 7) Leaves must be pre-approved by the management. 8) The employee must follow all company policies. Both parties accept the terms.' 
    },
    lease_long: { 
      title: 'Long-term Land Lease Agreement', 
      text: 'Lessor: {{name}}, Lessee: {{p2}}. Land Description: {{address}}. Lease Period: {{val2}} years. Annual Lease Fee: {{val1}}. Terms: 1) The lessee can use the land only for the purposes specified in the contract. 2) The annual fee must be paid in advance. 3) Upon expiry, the land must be returned to the lessor in its original state. 4) The lessor will not interfere with the possession during the lease period. 5) Government taxes and land revenue are to be paid by the lessor. 6) Sub-leasing to a third party is strictly prohibited without consent. 7) Breach of terms will nullify the lease. Signed on this day.' 
    },
    dower_marriage: { 
      title: 'Dower (Mahr) & Marital Commitment', 
      text: 'I, {{name}}, Father: {{witness}}, declare that the dower for my wife {{p2}} is fixed at {{val1}}. I have paid ........... as prompt dower today. Terms: 1) The remaining amount will be paid on demand or in installments. 2) I will provide proper maintenance and a safe living environment for my wife. 3) I will treat my wife with respect and dignity. 4) I will be responsible for the welfare of our future children. 5) This commitment is made on {{val2}}. 6) This document serves as a record of our marital rights and obligations. May our marriage be blessed. Signed by both parties.' 
    },
    transport: { 
      title: 'Vehicle Hire/Rental Agreement', 
      text: 'Vehicle Owner: {{name}}, Hirer: {{p2}}. Vehicle Details: {{address}}. Terms: 1) The hire charge is {{val1}} per day/month. 2) Fuel and parking costs are the responsibility of the hirer. 3) The contract is valid until {{val2}}. 4) Mechanical failures are handled by the owner, but damage due to negligence is paid by the hirer. 5) The owner ensures the vehicle has valid insurance and papers. 6) The vehicle must not be used for any illegal activities. 7) Any accident must be reported immediately. 8) The vehicle must be returned in good condition. Agreed by both.' 
    },
    event: { 
      title: 'Event Management Service Agreement', 
      text: 'Client: {{name}}, Event Planner: {{p2}}. Venue: {{address}}. Event Date: {{val2}}. Total Contract Value: {{val1}}. Terms: 1) An advance of 50% is paid today. 2) The planner must ensure the quality of food, decoration, and sound. 3) The planner is responsible for any mismanagement during the event. 4) In case of cancellation, the refund policy will apply as per standard terms. 5) Any extra services will be charged additionally. 6) The balance must be paid immediately after the event. 7) The event must start and end at the scheduled time. Signed by both parties.' 
    },
    mortgage: { 
      title: 'Property Mortgage/Pledge Agreement', 
      text: 'Mortgagor: {{name}}, Mortgagee: {{p2}}. Property Details: {{address}}. Loan Amount: {{val1}}. Terms: 1) The original property documents will remain with the mortgagee until the loan is cleared. 2) The loan must be repaid by {{val2}}. 3) If the mortgagor fails to repay, the mortgagee has the legal right to sell the property to recover the debt. 4) Possession remains with the mortgagor unless specified otherwise. 5) No changes to the property should be made during the mortgage. 6) All taxes are to be paid by the owner. 7) Documents will be returned upon full settlement. Signed with full consent.' 
    },
    security_service: { 
      title: 'Security Guard Service Agreement', 
      text: 'Client: {{name}}, Agency: {{p2}}. Service Location: {{address}}. Terms: 1) The agency will provide 24/7 security personnel. 2) Monthly service charge is {{val1}}. 3) Contract period is {{val2}} months. 4) The agency is liable for losses proven to be due to guard negligence. 5) Guards must be in uniform and well-trained. 6) The client can request a replacement for any unsatisfactory guard. 7) Bills must be cleared within the 5th of every month. 8) Either party can terminate with 1-month notice. Both parties have signed this contract.' 
    },
    supply_goods: { 
      title: 'Goods Supply Agreement', 
      text: 'Supplier: {{name}}, Buyer: {{p2}}. Item Details: {{address}}. Unit Price: {{val1}}. Delivery Deadline: {{val2}}. Terms: 1) Items must meet the quality standards specified. 2) The buyer has the right to reject defective goods. 3) Delivery costs are included in the price. 4) Payment will be made within 15 days of delivery. 5) Orders can be adjusted with mutual consent. 6) Failure to deliver on time may result in a penalty. 7) This contract is binding for both parties. Executed on the date mentioned above.' 
    },
    internet_isp: { 
      title: 'ISP/Internet Service Agreement', 
      text: 'Provider: {{name}}, Subscriber: {{p2}}. Address: {{address}}. Bandwidth: ........... Mbps. Monthly Bill: {{val1}}. Duration: {{val2}}. Terms: 1) The subscriber must pay the bill by the 10th of each month. 2) The provider will resolve any technical downtime within 24 hours. 3) Routers and equipment provided are the property of the ISP/Subscriber as per the plan. 4) Illegal use of internet is strictly prohibited. 5) Non-payment will result in service suspension. 6) Reactivation fees may apply. Both parties agree to the terms of service.' 
    },
    it_project: { 
      title: 'Software Development/IT Project Contract', 
      text: 'Developer: {{name}}, Client: {{p2}}. Project Name: {{address}}. Total Budget: {{val1}}. Deadline: {{val2}}. Terms: 1) 30% advance is required to start work. 2) Regular progress updates must be provided by the developer. 3) Post-delivery support will be provided for 3 months. 4) All source codes and IP rights belong to the client after full payment. 5) Extra features will be billed separately. 6) Strict confidentiality must be maintained regarding project data. Both parties have signed this document.' 
    },
    cleaning: { 
      title: 'Commercial Cleaning Service Agreement', 
      text: 'Client: {{name}}, Service Provider: {{p2}}. Site: {{address}}. Monthly Fee: {{val1}}. Contract Duration: {{val2}}. Terms: 1) Cleaning will be performed daily/weekly as per the schedule. 2) All cleaning chemicals and equipment are provided by the service provider. 3) The provider ensures the background check of their staff. 4) Payment is due at the end of each month. 5) Damages caused during cleaning must be compensated. 6) The client provides access to water and electricity. Signed by both parties in agreement.' 
    }
  }
};

function adjustAgPreviewScale() {
    const container = document.querySelector('.ag-preview-scroll');
    const wrapper = document.getElementById('ag-wrapper');
    const paper = document.getElementById('ag-editor-box');
    if (!container || !paper) return;
    const containerWidth = container.offsetWidth - 30;
    const paperWidth = 812; 
    if (containerWidth < paperWidth) {
        const scale = containerWidth / paperWidth;
        wrapper.style.transform = `scale(${scale})`;
        container.style.height = (paper.offsetHeight * scale + 50) + "px";
    } else {
        wrapper.style.transform = 'scale(1)';
        container.style.height = "auto";
    }
}

function closeAgreementModal() {
    document.getElementById('agreementModal').style.display = 'none';
}

function setAgLang(lang) {
    agLang = lang;
    document.getElementById('ag-bn-btn').classList.toggle('active', lang === 'bn');
    document.getElementById('ag-en-btn').classList.toggle('active', lang === 'en');
    const isBN = lang === 'bn';
    
    document.getElementById('ag-main-title').innerHTML = isBN ? "<i class='fa-solid fa-file-signature'/> চুক্তিপত্র রাইটিং" : "<i class='fa-solid fa-file-signature'/> Agreement letter writing";
    document.getElementById('lbl-ag-temp').innerText = isBN ? 'চুক্তিপত্র নির্বাচন করুন' : 'Select Agreement Template';
    document.getElementById('lbl-ag-p1').innerText = isBN ? 'প্রথম পক্ষের নাম' : 'First Party Name';
    document.getElementById('lbl-ag-p2').innerText = isBN ? 'দ্বিতীয় পক্ষের নাম' : 'Second Party Name';
    document.getElementById('lbl-ag-witness').innerText = isBN ? 'সাক্ষীর নাম/পিতার নাম' : 'Witness/Father Name';
    document.getElementById('lbl-ag-addr').innerText = isBN ? 'বিষয়ের বিবরণ/ঠিকানা' : 'Subject/Address';
    document.getElementById('lbl-ag-val1').innerText = isBN ? 'টাকার পরিমাণ/শর্ত ১' : 'Amount/Condition 1';
    document.getElementById('lbl-ag-val2').innerText = isBN ? 'মেয়াদ/শর্ত ২' : 'Duration/Condition 2';
    document.getElementById('lbl-ag-margin').innerText = isBN ? 'স্ট্যাম্প টপ স্পেস (Inch)' : 'Stamp Top Space (Inch)';
    document.getElementById('lbl-ag-sig1').innerText = isBN ? 'প্রথম পক্ষের স্বাক্ষর' : 'First Party Signature';
    document.getElementById('lbl-ag-sig2').innerText = isBN ? 'দ্বিতীয় পক্ষের স্বাক্ষর' : 'Second Party Signature';
    document.getElementById('lbl-ag-preview-hint').innerText = isBN ? 'স্ট্যাম্প প্রিভিউ (ইমেজটি প্রিন্টে আসবে না)' : 'STAMP PREVIEW (IMAGE WILL NOT PRINT)';

    document.getElementById('ag-intro-box').innerHTML = isBN ? 
        "<b>নির্দেশনা:</b> বিভিন্ন টেমপ্লেট ক্ষেত্রে শূন্যস্থান পূরণ না হলে ম্যানুয়ালি টাইপ করে নিবেন। এটি লিগ্যাল (২১৫ মিমি x ৩৪৫ মিমি) সাইজ স্ট্যাম্প পেপারের জন্য। শুধুমাত্র ব্যাকগ্রাউন্ড ছাড়া লেখাগুলো প্রিন্ট হবে।" : 
        "<b>Note:</b> If the blanks are not filled in various template fields, type them manually. This is for legal (215mm x 345mm) size stamp paper. Only texts without background will be printed.";

    const select = document.getElementById('ag-template-select');
    select.innerHTML = '';
    const data = agTemplates[lang];
    for (let key in data) {
        let opt = document.createElement('option');
        opt.value = key; opt.innerText = data[key].title;
        select.appendChild(opt);
    }
    applyAgTemplate(select.value);
}

function applyAgTemplate(key) {
    window.currentAgKey = key;
    updateAgPreview();
}

function updateAgPreview() {
    const data = agTemplates[agLang][window.currentAgKey];
    document.getElementById('ag-title-ui').innerText = data.title;
    const inputs = {
        name: document.getElementById('ag-p1').value || '.......',
        p2: document.getElementById('ag-p2').value || '.......',
        witness: document.getElementById('ag-witness').value || '.......',
        address: document.getElementById('ag-address').value || '.......',
        val1: document.getElementById('ag-val1').value || '.......',
        val2: document.getElementById('ag-val2').value || '.......'
    };
    let body = data.text;
    for (let key in inputs) {
        body = body.replace(new RegExp(`{{${key}}}`, 'g'), `<b>${inputs[key]}</b>`);
    }
    document.getElementById('ag-body-ui').innerHTML = body;
}

function updateAgMargin(val) {
    document.getElementById('ag-top-margin').style.height = val + 'px';
    document.getElementById('ag-margin-val').innerText = (val / 100).toFixed(1) + " Inch";
}

function printAgreement() {
    const margin = document.getElementById('ag-top-margin').offsetHeight;
    const title = document.getElementById('ag-title-ui').innerText;
    const body = document.getElementById('ag-body-ui').innerHTML;
    const s1 = document.getElementById('lbl-ag-sig1').innerText;
    const s2 = document.getElementById('lbl-ag-sig2').innerText;

    const win = window.open('', '', 'width=900,height=1000');
    win.document.write(`
        <html><head><title>Print Agreement</title>
        <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">
        <style>
            @page { size: 215mm 345mm; margin: 0; }
            body { margin: 0; padding: 0; font-family: 'SolaimanLipi', Arial, sans-serif; text-align: justify; }
            .p-cont { width: 215mm; min-height: 345mm; padding: 20mm; box-sizing: border-box; }
            .t-sp { height: ${margin}px; }
            .tit { text-align: center; text-decoration: underline; font-size: 24px; margin-bottom: 30px; font-weight: bold; }
            .content { line-height: 1.8; font-size: 18px; min-height: 500px; white-space: pre-wrap; }
            .foot { margin-top: 80px; display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; }
        </style></head>
        <body><div class="p-cont"><div class="t-sp"></div><div class="tit">${title}</div><div class="content">${body}</div>
        <div class="foot"><div><br>________________<br>${s1}</div><div><br>________________<br>${s2}</div></div></div>
        <script>window.onload=function(){setTimeout(()=>{window.print();window.close();},700);};<\/script></body></html>
    `);
    win.document.close();
}

function resetAgreement() {
    document.querySelectorAll('.ag-inputs input, .ag-inputs textarea').forEach(i => i.value = '');
    updateAgPreview();
}
window.addEventListener('resize', adjustAgPreviewScale);
