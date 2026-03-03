let currentCalDate = new Date();
  let clockInterval;
  
  // বাংলাদেশের চাঁদ দেখার ওপর ভিত্তি করে ১ দিন পেছানো (৩ মার্চ = ১৩ রমজান)
  let hijriOffset = -1; 

  // Close modal when clicked outside
  window.addEventListener('click', function(event) {
      let modal = document.getElementById('calendarModal');
      if (event.target == modal) {
          closeCalendarModal();
      }
  });

  function openCalendarModal() {
      // setActiveMode undefined থাকলে যেন error না দেয় তাই try-catch যুক্ত করা হয়েছে
      try {
          if (typeof setActiveMode === 'function') {
              setActiveMode('mode-calendar');
          }
      } catch (e) {}

      document.getElementById('calendarModal').style.display = 'flex';
      
      currentCalDate = new Date(); 
      startClock();
      updateTodaySummary(); 
      renderCalendar();     
  }

  function closeCalendarModal() {
      document.getElementById('calendarModal').style.display = 'none';
      if (clockInterval) clearInterval(clockInterval); // ঘড়ি বন্ধ করা
  }

  function changeMonth(dir) {
      currentCalDate.setMonth(currentCalDate.getMonth() + dir);
      renderCalendar();
  }

  function goToToday() {
      currentCalDate = new Date();
      renderCalendar();
  }

  // ইংরেজি থেকে বাংলা সংখ্যা কনভার্টার
  function toBnNum(num) {
      if (num === undefined || num === null) return '';
      const eng = ['0','1','2','3','4','5','6','7','8','9'];
      const bng =['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
      return num.toString().split('').map(c => eng.includes(c) ? bng[eng.indexOf(c)] : c).join('');
  }

  // কততম মাস (Ordinal Numbers in Bengali)
  function getOrdinalBn(num) {
      if(num == 1) return '১ম'; if(num == 2) return '২য়'; if(num == 3) return '৩য়';
      if(num == 4) return '৪র্থ'; if(num == 5) return '৫ম'; if(num == 6) return '৬ষ্ঠ';
      if(num == 7) return '৭ম'; if(num == 8) return '৮ম'; if(num == 9) return '৯ম';
      if(num == 10) return '১০ম'; if(num == 11) return '১১তম'; if(num == 12) return '১২শ';
      return toBnNum(num) + 'তম';
  }

  function getBnDateWithSuffix(day) {
      if (day === 1) return '১লা';
      if (day === 2) return '২রা';
      if (day === 3) return '৩রা';
      if (day === 4) return '৪ঠা';
      if (day >= 5 && day <= 18) return toBnNum(day) + 'ই';
      if (day >= 19 && day <= 31) return toBnNum(day) + 'শে';
      return toBnNum(day);
  }

  // লাইভ ঘড়ি ফাংশন
  function startClock() {
      if (clockInterval) clearInterval(clockInterval); // Prevent memory leak / overlap
      function updateTime() {
          let now = new Date();
          let h = now.getHours();
          let m = now.getMinutes();
          let s = now.getSeconds();
          let ampm = h >= 12 ? 'পিএম' : 'এএম';
          h = h % 12;
          h = h ? h : 12; // 0 কে 12 বানাবে
          let timeStr = toBnNum(h.toString().padStart(2, '0')) + ':' + 
                        toBnNum(m.toString().padStart(2, '0')) + ':' + 
                        toBnNum(s.toString().padStart(2, '0')) + ' ' + ampm;
          document.getElementById('cal-clock-text').innerHTML = '<i class="fa-regular fa-clock"></i> বর্তমান সময়: ' + timeStr;
      }
      updateTime();
      clockInterval = setInterval(updateTime, 1000);
  }

  const enMonthsBn =["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
  const bnMonthsList =["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"];
  
  function getSeason(monthIndex) {
      const seasons =['গ্রীষ্ম', 'গ্রীষ্ম', 'বর্ষা', 'বর্ষা', 'শরৎ', 'শরৎ', 'হেমন্ত', 'হেমন্ত', 'শীত', 'শীত', 'বসন্ত', 'বসন্ত'];
      return seasons[monthIndex];
  }

  function getBengaliDate(gDate) {
      // Government Revised Calendar Logic (2018/2019 BD)
      const bnDays =[31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 29, 30]; 
      
      let gy = gDate.getFullYear();
      let isLeap = (gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0);
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
      
      return { date: d + 1, month: bnMonthsList[mIdx], monthIndex: mIdx, year: bYear };
  }

  function getHijriDateObj(date) {
      try {
          let adjustedDate = new Date(date.getTime() + (hijriOffset * 24 * 60 * 60 * 1000));
          let formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric', year: 'numeric' });
          let parts = formatter.formatToParts(adjustedDate);
          
          let hd = parseInt(parts.find(p => p.type === 'day').value);
          let hm = parseInt(parts.find(p => p.type === 'month').value);
          let hy = parts.find(p => p.type === 'year').value;
          
          const hijriMonths =["মহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শাওয়াল", "জিলকদ", "জিলহজ"];
          
          return { day: hd, monthStr: hijriMonths[hm - 1], monthIndex: hm, yearStr: toBnNum(hy) };
      } catch (e) {
          return { day: 1, monthStr: "হিজরি মাস", monthIndex: 1, yearStr: "১৪৪৭" };
      }
  }

  function updateTodaySummary() {
      const today = new Date();
      const daysBn =['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
      const dayName = daysBn[today.getDay()];
      
      const bdDate = getBengaliDate(today); 
      const season = getSeason(bdDate.monthIndex);
      
      const enDateSuffix = getBnDateWithSuffix(today.getDate());
      const enMonthName = enMonthsBn[today.getMonth()];
      const enMonthOrd = getOrdinalBn(today.getMonth() + 1);
      const enYear = toBnNum(today.getFullYear());
      
      const hjDateObj = getHijriDateObj(today);
      const hjMonthOrd = getOrdinalBn(hjDateObj.monthIndex);
      
      const summaryText = `আজ ${dayName}, ${getBnDateWithSuffix(bdDate.date)} ${bdDate.month} ${toBnNum(bdDate.year)} বঙ্গাব্দ, যা বাংলা ক্যালেন্ডারের ${season} ঋতুতে পড়ে। সংশ্লিষ্ট ইংরেজি তারিখ ${enDateSuffix} ${enMonthName} ${enYear} খ্রিষ্টাব্দ (বছরের ${enMonthOrd} মাস) এবং হিজরি তারিখ ${getBnDateWithSuffix(hjDateObj.day)} ${hjDateObj.monthStr} ${hjDateObj.yearStr} হিজরি (হিজরি বছরের ${hjMonthOrd} মাস)। বর্তমান বাংলা মাস হলো ${bdDate.month}, বাংলা বছরের ${getOrdinalBn(bdDate.monthIndex + 1)} মাস।`;
      
      document.getElementById('cal-summary-text').innerText = summaryText;
  }

  function renderCalendar() {
      const year = currentCalDate.getFullYear();
      const month = currentCalDate.getMonth();
      const today = new Date(); 

      document.getElementById('cal-title-main').innerText = `${enMonthsBn[month]} ${toBnNum(year)}`;
      
      let firstDayDate = new Date(year, month, 1);
      let lastDayDate = new Date(year, month + 1, 0);
      
      let bdFirst = getBengaliDate(firstDayDate);
      let bdLast = getBengaliDate(lastDayDate);
      let hjLast = getHijriDateObj(lastDayDate);

      document.getElementById('cal-title-sub').innerText = `${bdFirst.month} - ${bdLast.month} ${toBnNum(bdLast.year)} | হিজরি ${hjLast.yearStr}`;

      const firstDayIndex = firstDayDate.getDay(); 
      const totalDays = lastDayDate.getDate();
      
      const calBody = document.getElementById('cal-body');
      let html = '';

      for (let x = 0; x < firstDayIndex; x++) {
          html += `<div class="cal-day-box empty"></div>`;
      }

      for (let i = 1; i <= totalDays; i++) {
          let currDate = new Date(year, month, i);
          let bd = getBengaliDate(currDate);
          let hj = getHijriDateObj(currDate);

          let isTodayClass = (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) ? 'today' : '';
          let dayOfWeek = currDate.getDay();
          let isWeekendClass = (dayOfWeek === 5 || dayOfWeek === 6) ? 'weekend' : ''; 
          
          let titleText = `ইংরেজি: ${toBnNum(i)} ${enMonthsBn[month]} ${toBnNum(year)}\nবাংলা: ${toBnNum(bd.date)} ${bd.month} ${toBnNum(bd.year)}\nআরবি: ${toBnNum(hj.day)} ${hj.monthStr} ${hj.yearStr}`;

          // Full string inside the boxes with Tooltip
          html += `
          <div class="cal-day-box ${isTodayClass} ${isWeekendClass}" title="${titleText}">
              <div class="en-date">${toBnNum(i)} ${enMonthsBn[month]}</div>
              <div class="bn-date">${toBnNum(bd.date)} ${bd.month}</div>
              <div class="ar-date">${toBnNum(hj.day)} ${hj.monthStr}</div>
          </div>`;
      }

      calBody.innerHTML = html;
  }
