let ltLang = "en";

// সংখ্যা রূপান্তর ফাংশন (বাংলা তারিখের জন্য)
function convertDigits(text, toLang) {
    if (!text) return "";
    const enDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    let result = text.toString();
    if (toLang === 'bn') {
        enDigits.forEach((en, i) => { result = result.split(en).join(bnDigits[i]); });
    } else {
        bnDigits.forEach((bn, i) => { result = result.split(bn).join(enDigits[i]); });
    }
    return result;
}

// বিস্তারিত এবং দীর্ঘ টেমপ্লেট ডাটাবেজ
const letterTemplates = {
    en: {
        job: `Date: ${new Date().toLocaleDateString('en-GB')}<br><br>
              To,<br>
              The Managing Director / HR Manager,<br>
              [Name of the Organization],<br>
              [Complete Address of the Office].<br><br>
              <b>Subject: Application for the position of [Mention Job Title].</b><br><br>
              Dear Sir/Madam,<br><br>
              I am writing to formally express my keen interest in the [Job Title] position at your esteemed organization, as advertised in [Source of Advertisement]. Having carefully reviewed the job description, I am confident that my educational background, professional experience, and skills align perfectly with the requirements of this role.<br><br>
              I have completed my [Mention Your Degree] from [University Name] and have gained [Number] years of practical experience in [Your Field/Industry]. During my previous tenure at [Previous Organization], I was responsible for [Mention key responsibility], where I successfully demonstrated my ability to [Mention a major achievement]. I possess strong communication skills, a high level of professional integrity, and the ability to work under pressure to meet tight deadlines.<br><br>
              My goal is to contribute my expertise to [Name of Organization] while continuing to develop my professional skills. I am eager to bring my dedication and hardworking nature to your team to help achieve your corporate objectives.<br><br>
              I have attached my detailed Curriculum Vitae (CV) and other necessary documents for your kind consideration. I would welcome the opportunity to discuss my qualifications further in a formal interview.<br><br>
              Thank you for your time and consideration.<br><br>
              Sincerely yours,<br><br>
              (Signature)<br>
              <b>[Your Full Name]</b><br>
              Phone: [Your Mobile Number]<br>
              Email: [Your Email Address]`,
        
        leave: `Date: ${new Date().toLocaleDateString('en-GB')}<br><br>
                To,<br>
                The Principal / Head of Department,<br>
                [Institution/Office Name],<br>
                [Location].<br><br>
                <b>Subject: Application for Leave of Absence due to [Mention Reason].</b><br><br>
                Dear Sir/Madam,<br><br>
                I am writing to respectfully request a leave of absence for [Number] days, starting from [Start Date] to [End Date]. The reason for this request is [Mention reason, e.g., my sister's wedding / sudden illness / personal family matters].<br><br>
                I have ensured that my current responsibilities and pending tasks are properly managed. I will be back in the office/institution on [Return Date] and will resume my duties immediately. I will also be available via email or phone in case of any urgent requirements during my absence.<br><br>
                I kindly request you to grant me this leave and support me during this period. I shall be highly obliged for your kind consideration of my situation.<br><br>
                Yours faithfully,<br><br>
                <b>[Your Name]</b><br>
                [Your Designation/Class/ID]<br>
                Mobile: [Your Number]`,
        
        cover: `Date: ${new Date().toLocaleDateString('en-GB')}<br><br>
                To,<br>
                The Hiring Manager,<br>
                [Company Name],<br>
                [Company Address].<br><br>
                <b>Subject: Cover Letter for the [Position Name] role.</b><br><br>
                Dear Sir/Madam,<br><br>
                I am highly excited to submit my application for the [Position Name] role at [Company Name]. As a professional with [Number] years of experience in [Your Core Skill], I have closely followed your company’s growth and am inspired by your commitment to innovation and quality.<br><br>
                Throughout my career, I have excelled at [Mention a skill, e.g., digital marketing/team management/software development]. My ability to solve complex problems and collaborate effectively with diverse teams makes me a strong fit for your culture. I am particularly drawn to this role because it offers the perfect platform to utilize my expertise in [Specific Skill] to drive tangible results for your organization.<br><br>
                I would be honored to bring my proactive approach and technical proficiency to [Company Name]. Thank you for reviewing my application. I look forward to the possibility of discussing how I can add value to your team.<br><br>
                Best regards,<br><br>
                <b>[Your Name]</b><br>
                LinkedIn: [Your Profile Link]<br>
                Mobile: [Your Number]`
    },
    bn: {
        job: `তারিখ: ${convertDigits(new Date().toLocaleDateString('en-GB'), 'bn')}<br><br>
              বরাবর,<br>
              ব্যবস্থাপক / পরিচালক,<br>
              [প্রতিষ্ঠানের নাম],<br>
              [অফিসের পূর্ণ ঠিকানা]।<br><br>
              <b>বিষয়: [পদের নাম] পদের জন্য আবেদন।</b><br><br>
              মহোদয়,<br><br>
              বিনীত নিবেদন এই যে, গত [তারিখ] তারিখে [পত্রিকার নাম/অনলাইন সোর্স] এ প্রকাশিত বিজ্ঞপ্তির মাধ্যমে জানতে পারলাম যে, আপনার স্বনামধন্য প্রতিষ্ঠানে কিছু সংখ্যক [পদের নাম] নিয়োগ দেওয়া হবে। আমি উক্ত পদের একজন আগ্রহী প্রার্থী হিসেবে আমার প্রয়োজনীয় তথ্যাদি এবং জীবনবৃত্তান্ত আপনার সদয় বিবেচনার জন্য পেশ করছি।<br><br>
              আমি [আপনার শিক্ষাগত যোগ্যতা] সম্পন্ন করেছি এবং আমার [আপনার বিশেষ দক্ষতা/অভিজ্ঞতা] রয়েছে। আমি অত্যন্ত কঠোর পরিশ্রমী, সময়ানুবর্তী এবং যেকোনো প্রতিকূল পরিবেশের সাথে দ্রুত মানিয়ে নিতে সক্ষম। আমার দীর্ঘদিনের অর্জিত অভিজ্ঞতা ও নিষ্ঠা আপনার প্রতিষ্ঠানের ভবিষ্যৎ লক্ষ্য অর্জনে গুরুত্বপূর্ণ ভূমিকা রাখবে বলে আমি বিশ্বাস করি।<br><br>
              আমি আমার পূর্ণাঙ্গ জীবনবৃত্তান্ত (CV) ও প্রয়োজনীয় নথিপত্র এই আবেদনের সাথে সংযুক্ত করেছি। আমার যোগ্যতা যাচাইয়ের জন্য আমাকে একটি সাক্ষাৎকারের সুযোগ দানে আপনার একান্ত মর্জি হয়।<br><br>
              অতএব, মহোদয়ের নিকট বিনীত প্রার্থনা, উপরোক্ত তথ্যাদি বিবেচনা করে আমাকে উক্ত পদে নিয়োগ দানে বাধিত করবেন।<br><br>
              বিনীত নিবেদক,<br><br>
              (স্বাক্ষর)<br>
              <b>[আপনার নাম]</b><br>
              ঠিকানা: [আপনার পূর্ণ ঠিকানা]<br>
              মোবাইল: [আপনার মোবাইল নাম্বার]`,
        
        leave: `তারিখ: ${convertDigits(new Date().toLocaleDateString('en-GB'), 'bn')}<br><br>
                বরাবর,<br>
                প্রধান শিক্ষক / বিভাগীয় প্রধান,<br>
                [শিক্ষা প্রতিষ্ঠান/অফিসের নাম],<br>
                [ঠিকানা]।<br><br>
                <b>বিষয়: [ছুটির কারণ] এর জন্য ছুটির আবেদন।</b><br><br>
                জনাব,<br><br>
                সবিনয় নিবেদন এই যে, আমি আপনার প্রতিষ্ঠানের একজন [আপনার পদবি/শ্রেণি]। আমার [কারণ, যেমন: পারিবারিক অনুষ্ঠান / অসুস্থতা / জরুরি কাজ] এর জন্য আগামী [তারিখ] থেকে [তারিখ] পর্যন্ত মোট [দিন] দিনের ছুটির প্রয়োজন। আমার অনুপস্থিতিকালীন সময়ে আমার উপর অর্পিত দায়িত্বগুলো আমি গুছিয়ে রেখেছি যাতে প্রতিষ্ঠানের কোনো কাজে ব্যাঘাত না ঘটে।<br><br>
                অতএব, মহোদয়ের নিকট আকুল প্রার্থনা এই যে, আমাকে উক্ত দিনগুলোর জন্য ছুটি দানে আপনার একান্ত মর্জি হয়। আমি আপনার এই মহানুভবতার জন্য চিরকৃতজ্ঞ থাকব।<br><br>
                আপনার একান্ত অনুগত,<br><br>
                <b>[আপনার নাম]</b><br>
                পদবি: [আপনার পদবি]<br>
                মোবাইল: [আপনার নাম্বার]`,
        
        cover: `তারিখ: ${convertDigits(new Date().toLocaleDateString('en-GB'), 'bn')}<br><br>
                বরাবর,<br>
                নিয়োগ কর্মকর্তা,<br>
                [প্রতিষ্ঠানের নাম],<br>
                [ঠিকানা]।<br><br>
                <b>বিষয়: [পদের নাম] পদের জন্য কভার লেটার।</b><br><br>
                মহোদয়,<br><br>
                আপনার প্রতিষ্ঠানের [পদের নাম] পদের জন্য প্রকাশিত নিয়োগ বিজ্ঞপ্তিটি আমার দৃষ্টিগোচর হয়েছে। আমি একজন অভিজ্ঞ [আপনার কাজের ক্ষেত্র] পেশাজীবী হিসেবে আপনার প্রতিষ্ঠানের সাথে কাজ করতে অত্যন্ত আগ্রহী। আমি দীর্ঘদিন ধরে আপনার প্রতিষ্ঠানের উন্নয়ন ও অগ্রযাত্রা লক্ষ্য করছি এবং আমি আমার মেধা ও শ্রম দিয়ে আপনার প্রতিষ্ঠানের সাফল্যে অবদান রাখতে চাই।<br><br>
                আমার পেশাগত জীবনে আমি [একটি বিশেষ সাফল্য] অর্জন করেছি এবং আমি বিশ্বাস করি আমার [আপনার বিশেষ দক্ষতা] আপনার প্রতিষ্ঠানের লক্ষ্য অর্জনে সহায়ক হবে। আমি দলের সাথে কাজ করতে পছন্দ করি এবং যেকোনো চ্যালেঞ্জিং কাজ সম্পন্ন করতে আমি আত্মবিশ্বাসী।<br><br>
                আপনার মূল্যবান সময় দেওয়ার জন্য ধন্যবাদ। আমি আশা করছি শীঘ্রই একটি সাক্ষাৎকারের মাধ্যমে আমার যোগ্যতা সবিস্তারে বর্ণনা করার সুযোগ পাব।<br><br>
                ধন্যবাদান্তে,<br><br>
                <b>[আপনার নাম]</b><br>
                মোবাইল: [আপনার নাম্বার]<br>
                ইমেইল: [আপনার ইমেইল]`
    }
};

function openLetterModal() {
    document.getElementById('letterModal').style.display = 'flex';
    if(typeof setActiveMode === 'function') setActiveMode('mode-letter');
    loadTemplate('job'); // ডিফল্ট জব অ্যাপ্লিকেশন লোড
}

function closeLetterModal() { document.getElementById('letterModal').style.display = 'none'; }

function execCmd(command, value = null) { document.execCommand(command, false, value); }

function switchLetterLang(lang) {
    ltLang = lang;
    document.getElementById('lt-en-btn').classList.toggle('active', lang === 'en');
    document.getElementById('lt-bn-btn').classList.toggle('active', lang === 'bn');
    
    const select = document.getElementById('letter-template');
    const tipsBox = document.getElementById('lt-tips-box'); // টিপস বক্সটি ধরা হলো

    if(lang === 'bn') {
        select.options[0].text = "চাকরির আবেদন";
        select.options[1].text = "ছুটির আবেদন";
        select.options[2].text = "সাধারণ কভার লেটার";

        // বাংলা টিপস ইনজেক্ট করা
        tipsBox.innerHTML = `
            <strong><i class='fa-solid fa-circle-info'></i> দরখাস্ত লেখার টিপস:</strong>
            <ul style='margin:0; padding-left:20px; font-size: 13px; font-family: "SolaimanLipi", sans-serif;'>
                <li>যেকোনো টেক্সটের ওপর ক্লিক করে আপনার ব্যক্তিগত তথ্য পরিবর্তন করুন।</li>
                <li>পিডিএফ সেভ করতে: <b>Direct Print</b> বাটনে ক্লিক করুন এবং প্রিন্ট উইন্ডোতে <b>"Save as PDF"</b> সিলেক্ট করুন।</li>
                <li>প্রিন্ট করার আগে <b>তারিখ</b> এবং <b>প্রাপকের ঠিকানা</b> অবশ্যই পুনরায় যাচাই করে নিন।</li>
            </ul>`;
    } else {
        select.options[0].text = "Job Application";
        select.options[1].text = "Leave of Absence";
        select.options[2].text = "General Cover Letter";

        // ইংরেজি টিপস ইনজেক্ট করা
        tipsBox.innerHTML = `
            <strong><i class='fa-solid fa-circle-info'></i> Application Writing Tips:</strong>
            <ul style='margin:0; padding-left:20px; font-size: 12px;'>
                <li>Click on any text to edit and provide your personal information.</li>
                <li>To Save as PDF: Click <b>Direct Print</b> and select <b>"Save as PDF"</b> as the destination.</li>
                <li>Make sure to double-check the <b>Date</b> and <b>Recipient Address</b> before printing.</li>
            </ul>`;
    }
    loadTemplate(select.value);
}

function loadTemplate(type) {
    const editor = document.getElementById('letter-editor');
    editor.innerHTML = letterTemplates[ltLang][type];
}

function updateLetterLayout() {
    const size = document.getElementById('lt-page-size').value;
    const page = document.getElementById('lt-page-unit');
    page.style.width = (size === 'legal') ? "216mm" : "210mm";
    page.style.minHeight = (size === 'legal') ? "345mm" : "297mm";
}

function printLetter() {
    const content = document.getElementById('letter-editor').innerHTML;
    const size = document.getElementById('lt-page-size').value;
    const dim = (size === 'legal') ? '216mm 345mm' : 'A4';
    
    let count = localStorage.getItem('letter_print_count') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('letter_print_count', count);

    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <title>Cover_Letter_www.idcardscannerpro.com-${count}</title>
                <style>
                    @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
                    @page { size: ${dim}; margin: 0; }
                    body { font-family: 'SolaimanLipi', Arial; padding: 25mm 20mm; background: #fff; }
                    #editor { text-align: justify; font-size: 17px; line-height: 1.6; color: #000; }
                    b, strong { font-weight: bold; }
                </style>
            </head>
            <body><div id="editor">${content}</div></body>
        </html>
    `);
    printWin.document.close();
    setTimeout(() => { printWin.print(); printWin.close(); }, 500);
}

function resetLetter() {
    loadTemplate(document.getElementById('letter-template').value);
}
