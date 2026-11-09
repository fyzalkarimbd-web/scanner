let idspHijriOffset = -1; // চাঁদ দেখার হিসাব অনুযায়ী ১ দিন পেছনে

  function idspToBnNum(num) {
      if (num === undefined || num === null) return '';
      const eng = ['0','1','2','3','4','5','6','7','8','9'];
      const bng = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
      return num.toString().split('').map(c => eng.includes(c) ? bng[eng.indexOf(c)] : c).join('');
  }

  const idspEnMonthsBn = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const idspBnMonthsList = ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];

  // সময় অনুযায়ী ৬টি আলাদা প্রথাগত শুভেচ্ছা বার্তা + কাস্টম রঙ নির্ধারণ
  function getBanglaGreetingObj(hours24, minutes) {
      const totalMinutes = hours24 * 60 + minutes;

      // ১. ভোর ৪:০০ থেকে ৫:৫৯ -> "শুভ ভোর" (Sunrise Orange)
      if (totalMinutes >= 240 && totalMinutes < 360) {
          return { word: "শুভ ভোর", color: "#f97316" };
      }
      // ২. সকাল ৬:০০ থেকে ১০:৫৯ -> "শুভ সকাল" (Morning Emerald Green)
      else if (totalMinutes >= 360 && totalMinutes < 660) {
          return { word: "শুভ সকাল", color: "#059669" };
      }
      // ৩. দুপুর ১১:০০ থেকে ১৪:৫৯ -> "শুভ দুপুর" (Midday Sunny Blue)
      else if (totalMinutes >= 660 && totalMinutes < 900) {
          return { word: "শুভ দুপুর", color: "#0284c7" };
      }
      // ৪. বিকাল ১৫:০০ থেকে ১৭:২৯ -> "শুভ বিকেল" (Sunset Amber Gold)
      else if (totalMinutes >= 900 && totalMinutes < 1050) {
          return { word: "শুভ বিকেল", color: "#d97706" };
      }
      // ৫. সন্ধ্যা ১৭:৩০ থেকে ১৯:৫৯ -> "শুভ সন্ধ্যা" (Twilight Purple)
      else if (totalMinutes >= 1050 && totalMinutes < 1200) {
          return { word: "শুভ সন্ধ্যা", color: "#7c3aed" };
      }
      // ৬. রাত ২০:০০ থেকে ০৩:৫৯ -> "শুভরাত্রি"
      else {
          return { word: "শুভ রাত্রি", color: "#e11d48" };
      }
  }

  // AM/PM-এর বদলে সময়ের আগে বাংলা সময়সূচক শব্দ (ভোর/সকাল/দুপুর/বিকাল/সন্ধ্যা/রাত) - [FIXED]
  function getBanglaTimePeriod(hours24, minutes = 0) {
      const totalMinutes = hours24 * 60 + minutes;
      if (totalMinutes >= 240 && totalMinutes < 360) return "ভোর";     // ৪:০০ - ৫:৫৯
      if (totalMinutes >= 360 && totalMinutes < 660) return "সকাল";    // ৬:০০ - ১০:৫৯
      if (totalMinutes >= 660 && totalMinutes < 900) return "দুপুর";    // ১১:০০ - ২:৫৯ (১৪:৫৯)
      if (totalMinutes >= 900 && totalMinutes < 1050) return "বিকাল";  // ৩:০০ (১৫:০০) - ৫:২৯ (১৭:২৯)
      if (totalMinutes >= 1050 && totalMinutes < 1200) return "সন্ধ্যা"; // ৫:৩০ (১৭:৩০) - ৭:৫৯ (১৯:৫৯)
      return "রাত";                                                    // ৮:০০ (২০:০০) - ৩:৫৯
  }

  // বাংলা তারিখ গণনা (২০১৮/২০১৯ বিডি প্রবিধান)
  function idspGetBengaliDate(gDate) {
      const bnDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 29, 30]; 
      
      let gy = gDate.getFullYear();
      let isLeap = (gy % 4 === 0 && gy % 100 !== 0) || ((gy % 400 === 0));
      bnDays[10] = isLeap ? 30 : 29; 
      
      let bYear = gy - 593;
      let baishakh1 = new Date(gy, 3, 14); 
      
      if (gDate < baishakh1) {
          bYear -= 1;
          baishakh1 = new Date(gy - 1, 3, 14);
          let prevIsLeap = ((gy - 1) % 4 === 0 && (gy - 1) % 100 !== 0) || ((gy - 1) % 400 === 0);
          bnDays[10] = prevIsLeap ? 30 : 29;
      }
      
      let utc1 = Date.UTC(gDate.getFullYear(), gDate.getMonth(), gDate.getDate());
      let utc2 = Date.UTC(baishakh1.getFullYear(), baishakh1.getMonth(), baishakh1.getDate());
      let diffDays = Math.floor((utc1 - utc2) / (1000 * 60 * 60 * 24));
      
      let d = diffDays;
      let mIdx = 0;
      while (d >= bnDays[mIdx]) {
          d -= bnDays[mIdx];
          mIdx++;
      }
      
      return { date: d + 1, month: idspBnMonthsList[mIdx], monthIndex: mIdx, year: bYear };
  }

  // অফিশিয়াল হিজরি তারিখ গণনা (Umm al-Qura + idspHijriOffset)
  function idspGetHijriDateObj(date) {
      try {
          let adjustedDate = new Date(date.getTime() + (idspHijriOffset * 24 * 60 * 60 * 1000));
          let formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric', year: 'numeric' });
          let parts = formatter.formatToParts(adjustedDate);
          
          let hd = parseInt(parts.find(p => p.type === 'day').value, 10);
          let hm = parseInt(parts.find(p => p.type === 'month').value, 10);
          let hy = parts.find(p => p.type === 'year').value;
          
          const hijriMonths = ["মহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শাওয়াল", "জিলকদ", "জিলহজ"];
          
          return { day: hd, monthStr: hijriMonths[hm - 1], monthIndex: hm, yearStr: idspToBnNum(hy) };
      } catch (e) {
          return { day: 3, monthStr: "জমাদিউল আউয়াল", monthIndex: 5, yearStr: "১৪৪৮" };
      }
  }

  // হেডার ড্যাশবোর্ড ইনস্ট্যান্ট আপডেট ফাংশন
  function updateIdspHeaderDateTime() {
      const now = new Date();

      // (ক) সময় অনুযায়ী স্বয়ংক্রিয় রঙিন শুভেচ্ছা বার্তা
      const greetingObj = getBanglaGreetingObj(now.getHours(), now.getMinutes());
      const greetingWordEl = document.getElementById('idspGreetingWord');
      if (greetingWordEl) {
          greetingWordEl.innerText = greetingObj.word;
          greetingWordEl.style.color = greetingObj.color;
      }

      // (খ) বাংলা সময় (AM/PM ছাড়া, সামনে সময়সূচক শব্দ সহ + "মিনিট" সফিক্স)
      let hours24 = now.getHours();
      let minutes = now.getMinutes();
      
      // [FIXED] ঘন্টা এবং মিনিট দুটোই পাস করা হচ্ছে
      const periodBn = getBanglaTimePeriod(hours24, minutes);

      let hours12 = hours24 % 12;
      hours12 = hours12 ? hours12 : 12; // 0 কে 12 বানাবে

      const strHoursBn = idspToBnNum(hours12);
      const strMinutesBn = idspToBnNum(minutes < 10 ? '0' + minutes : minutes);

      // ফরম্যাট: সকাল ৯:১৫ মিনিট / বিকাল ৩:১৫ মিনিট / দুপুর ১২:৩০ মিনিট
      const timeBanglaFull = `${periodBn} ${strHoursBn}:${strMinutesBn} মিনিট`;
      const clockEl = document.getElementById('idspLiveClock');
      if (clockEl) clockEl.innerText = timeBanglaFull;

      // (গ) "আজ - " সহ বারের নাম বাংলায়
      const daysBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
      const dayEl = document.getElementById('idspLiveDay');
      if (dayEl) dayEl.innerText = `আজ - ${daysBn[now.getDay()]}`;

      // (ঘ) খ্রিস্টাব্দ তারিখ বাংলায়
      const gregDateEl = document.getElementById('idspGregorianText');
      if (gregDateEl) {
          gregDateEl.innerText = `${idspToBnNum(now.getDate())} ${idspEnMonthsBn[now.getMonth()]} ${idspToBnNum(now.getFullYear())}`;
      }

      // (ঙ) বাংলা বঙ্গাব্দ তারিখ
      const bd = idspGetBengaliDate(now);
      const bdDateEl = document.getElementById('idspBanglaText');
      if (bdDateEl) {
          bdDateEl.innerText = `${idspToBnNum(bd.date)} ${bd.month} ${idspToBnNum(bd.year)} বঙ্গাব্দ`;
      }

      // (চ) হিজরি তারিখ
      const hj = idspGetHijriDateObj(now);
      const hijriEl = document.getElementById('idspHijriText');
      if (hijriEl) {
          hijriEl.innerText = `${idspToBnNum(hj.day)} ${hj.monthStr} ${hj.yearStr} হিজরি।`;
      }
  }

  // ১. ইনস্ট্যান্ট ফার্স্ট এক্সিকিউশন (০ মিলি-সেকেন্ড ডিলে ছাড়া)
  updateIdspHeaderDateTime();

  // ২. টাইমার ও ইভেন্ট লিসেনার
  setInterval(updateIdspHeaderDateTime, 1000);
  document.addEventListener("DOMContentLoaded", updateIdspHeaderDateTime);
