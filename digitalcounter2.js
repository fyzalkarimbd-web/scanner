 // ডিজিটাল তাসবিহ ও জপমালা মোডাল অ্যাক্টিভেশন
  function openDigitalCounterModal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-digital-counter');
      const modal = document.getElementById('digitalCounterModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          initDigitalCounterTool();
      }
  }

  function closeDigitalCounterModal() {
      const modal = document.getElementById('digitalCounterModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
      }
  }

  // ১. ধর্মভিত্তিক জপমালা ও দোকানদারদের জন্য বিশেষ বাণী ডাটাবেজ
  const religionData = {
      islam: {
          greeting: "প্রিয় দোকানদার ভাই, আপনার কাস্টমার কম থাকলে বসে না থেকে আল্লাহর জিকির ও তাসবিহ পাঠ করুন। এতে ব্যবসায় আয়-বরকত হবে ইনশাআল্লাহ।",
          tapLabel: "গণনা করতে ক্লিক করুন!",
          presets: ["সুবহানাল্লাহ", "আলহামদুলিল্লাহ", "আল্লাহু আকবার", "লা ইলাহা ইল্লাল্লাহ", "আস্তাগফিরুল্লাহ", "দুরুদ শরীফ"]
      },
      hindu: {
          greeting: "প্রিয় দোকানদার ভাই, আপনার ব্যবসায়িক অবসরে অনর্থক সময় নষ্ট না করে ঈশ্বর/ভগবানের ইষ্টনাম জপমালা জপ করুন। এতে ব্যবসায়ে কৃপা লাভ হবে।",
          tapLabel: "জপ করতে স্পর্শ করুন!",
          presets: ["ওঁ নমঃ শিবায়", "হরে কৃষ্ণ হরে রাম", "জয় শ্রী রাম", "ওঁ শ্রী গণেশায় নমঃ", "ওঁ নমো নারায়ণায়", "মহামৃত্যুঞ্জয় মন্ত্র"]
      },
      buddhist: {
          greeting: "প্রিয় দোকানদার ভাই, আপনি অবসরে মনোযোগী হয়ে বুদ্ধের গুণাবলী ও সূত্র জপ করুন। এতে মন শান্ত থাকবে এবং ব্যবসায় শান্তি ও প্রবৃদ্ধি বজায় থাকবে।",
          tapLabel: "জপ করতে স্পর্শ করুন!",
          presets: ["বুদ্ধং শরণং গচ্ছামি", "ধম্মং শরণং গচ্ছামি", "সঙ্ঘং শরণং গচ্ছামি", "নমো বুদ্ধায়", "ওঁ মনি পদ্মে হুম", "অনিত্য বোধি জপ"]
      },
      christian: {
          greeting: "প্রিয় দোকানদার ভাই, কাজের ফাঁকে সময় নষ্ট না করে প্রভুর প্রার্থনা ও স্তব পাঠ করুন। এতে আপনার ব্যবসা ও পরিবারে ঈশ্বরের পরম আশীর্বাদ বর্ষিত হবে।",
          tapLabel: "প্রার্থনা গণনা করতে চাপুন!",
          presets: ["জয় যীশু", "আমাদের স্বর্গস্থ পিতা", "প্রভুর ধন্যবাদ", "হালেলুইয়া", "পবিত্রময় যীশু", "পবিত্র আত্মা"]
      }
  };

  let dtState = {
      religion: 'islam',
      profile: 'নাম এডিট করুন!',
      count: 0,
      targetCount: 0,
      activePreset: '',
      history: [],
      undoStack: [],
      redoStack: []
  };

  // ২. কাস্টম ডায়ালগ পপ-আপ ম্যানেজার
  function showDtCustomDialog(config) {
      const overlay = document.getElementById('dtDialogOverlay');
      const titleEl = document.getElementById('dtDialogTitle');
      const msgEl = document.getElementById('dtDialogMessage');
      const inputWrap = document.getElementById('dtDialogInputWrap');
      const inputEl = document.getElementById('dtDialogInput');
      const cancelBtn = document.getElementById('dtDialogCancelBtn');
      const confirmBtn = document.getElementById('dtDialogConfirmBtn');
      const iconEl = document.getElementById('dtDialogIcon');

      if (!overlay) return;

      titleEl.innerText = config.title || 'কনফার্মেশন';
      msgEl.innerText = config.message || '';

      if (config.isPrompt) {
          inputWrap.style.display = 'block';
          inputEl.value = config.defaultValue || '';
      } else {
          inputWrap.style.display = 'none';
      }

      if (config.isAlert) {
          cancelBtn.style.display = 'none';
          confirmBtn.innerText = 'ঠিক আছে';
          iconEl.innerHTML = config.customIcon || '<i class="fa-solid fa-circle-info" style="color:#60a5fa;"></i>';
      } else {
          cancelBtn.style.display = 'inline-block';
          confirmBtn.innerText = 'হ্যাঁ, নিশ্চিত';
          iconEl.innerHTML = config.customIcon || '<i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;"></i>';
      }

      cancelBtn.onclick = function() {
          overlay.style.display = 'none';
      };

      confirmBtn.onclick = function() {
          overlay.style.display = 'none';
          if (config.onConfirm) {
              const val = config.isPrompt ? inputEl.value : true;
              config.onConfirm(val);
          }
      };

      overlay.style.display = 'flex';
      if (config.isPrompt) inputEl.focus();
  }

  // ৩. ইংরেজি সংখ্যাকে বাংলায় রূপান্তর
  function convertToBanglaNumber(n) {
      if (n === null || n === undefined) return '';
      const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
      return n.toString().replace(/[0-9]/g, function(w) { return banglaDigits[w] || w; });
  }

  // ৪. ইনিশিয়ালাইজেশন
  function initDigitalCounterTool() {
      loadDtStateFromStorage();
      updateReligionUI();
      renderPresets();
      renderCountDisplay();
      renderChantAnalyticsSummary();
  }

  // ৫. ধর্ম পরিবর্তনের লজিক
  function switchReligion(rel) {
      dtState.religion = rel;
      dtState.activePreset = religionData[rel].presets[0];
      dtState.count = getTodayCountForChant(dtState.activePreset);
      dtState.targetCount = 0;
      dtState.undoStack = [];
      dtState.redoStack = [];
      saveDtStateToStorage();
      updateReligionUI();
      renderPresets();
      renderCountDisplay();
      renderChantAnalyticsSummary();
  }

  function updateReligionUI() {
      const info = religionData[dtState.religion];
      document.getElementById('dtShopkeeperNotice').innerHTML = `<strong>কথা ও বার্তা:</strong> ${info.greeting}`;
      document.getElementById('dtTapLabel').innerText = info.tapLabel;
  }

  // আজকের নির্দিষ্ট পাঠের গণনা খুঁজে বের করা
  function getTodayCountForChant(chantName) {
      const today = new Date().toISOString().split('T')[0];
      const rec = dtState.history.find(h => h.date === today && h.profile === dtState.profile && h.chant === chantName && h.religion === dtState.religion);
      return rec ? (rec.count || 0) : 0;
  }

  // ৬. কাউন্টার বাড়ানো
  function incrementCounter() {
      dtState.undoStack.push(dtState.count);
      dtState.redoStack = [];
      dtState.count++;

      if (navigator.vibrate) {
          navigator.vibrate(30);
      }

      saveDtStateToStorage();
      saveHistoryRecord();
      renderCountDisplay();

      if (dtState.targetCount > 0 && dtState.count === dtState.targetCount) {
          triggerReligiousCongratulations(dtState.targetCount);
      }
  }

  // ধর্ম ভিত্তিক অভিনন্দন পপ-আপ লজিক
  function triggerReligiousCongratulations(target) {
      const targetBn = convertToBanglaNumber(target);
      let title = "";
      let msg = "";
      let iconHtml = '<i class="fa-solid fa-trophy" style="color:#fbbf24;"></i>';

      if (dtState.religion === 'islam') {
          title = "মাশাআল্লাহ! (জিকির পূর্ণ হয়েছে)";
          msg = `মাশাআল্লাহ! আপনি সফলভাবে ${targetBn} বার জিকির/তাসবিহ সম্পন্ন করেছেন। আল্লাহ আপনার নেক আমল ও জিকির কবুল করুন। আমিন!`;
      } else if (dtState.religion === 'hindu') {
          title = "শুভকামনা! (ইষ্টনাম জপ পূর্ণ)";
          msg = `পবিত্র ইষ্টনাম জপ সম্পন্ন হয়েছে! আপনি সফলভাবে ${targetBn} বার জপমালা পূর্ণ করেছেন। পরমেশ্বর আপনার মঙ্গল ও ব্যবসায়ে কৃপা দান করুন।`;
      } else if (dtState.religion === 'buddhist') {
          title = "সাধু! সাধু! সাধু!";
          msg = `আপনি সফলভাবে ${targetBn} বার বুদ্ধের গুণাবলী ও সূত্র জপ সম্পন্ন করেছেন। আপনার মন শান্ত ও চিরপবিত্র হোক।`;
      } else if (dtState.religion === 'christian') {
          title = "প্রভুর ধন্যবাদ ও জয়!";
          msg = `হালেলুইয়া! আপনি সফলভাবে ${targetBn} বার প্রার্থনার জপ সম্পন্ন করেছেন। ঈশ্বর আপনার পরিবার ও কাজকে পরম আশীর্বাদ করুন।`;
      }

      showDtCustomDialog({
          title: title,
          message: msg,
          isAlert: true,
          customIcon: iconHtml
      });
  }

  // ৭. আনডু, রিসেট, রিডু
  function undoCounter() {
      if (dtState.undoStack.length > 0) {
          dtState.redoStack.push(dtState.count);
          dtState.count = dtState.undoStack.pop();
          saveDtStateToStorage();
          saveHistoryRecord();
          renderCountDisplay();
      }
  }

  function redoCounter() {
      if (dtState.redoStack.length > 0) {
          dtState.undoStack.push(dtState.count);
          dtState.count = dtState.redoStack.pop();
          saveDtStateToStorage();
          saveHistoryRecord();
          renderCountDisplay();
      }
  }

  function resetCounter() {
      const hasRelLogs = dtState.history.some(h => h.religion === dtState.religion);
      if (dtState.count === 0 && !hasRelLogs) return;

      showDtCustomDialog({
          title: 'কাউন্টার ও মোট গণনা রিসেট',
          message: 'আপনি কি বর্তমান গণনা এবং এই ধর্মের সর্বমোট পাঠের হিসাব ০ (শূন্য) করতে চান?',
          isConfirm: true,
          onConfirm: function() {
              dtState.undoStack = [];
              dtState.redoStack = [];
              dtState.count = 0;
              dtState.targetCount = 0;
              // নির্বাচিত ধর্মের সকল কার্ড ও সর্বমোট হিসাব রিসেট করবে
              dtState.history = dtState.history.filter(h => h.religion !== dtState.religion);
              localStorage.setItem('dt_history_logs', JSON.stringify(dtState.history));
              saveDtStateToStorage();
              renderCountDisplay();
              renderChantAnalyticsSummary();
          }
      });
  }

  function setCustomCount() {
      const val = parseInt(document.getElementById('dtSetInput').value, 10);
      if (!isNaN(val) && val > 0) {
          dtState.undoStack.push(dtState.count);
          dtState.targetCount = val;
          dtState.count = 0;
          document.getElementById('dtSetInput').value = '';
          saveDtStateToStorage();
          renderCountDisplay();

          showDtCustomDialog({
              title: 'টার্গেট সংখ্যা সেট সম্পন্ন',
              message: `আপনার লক্ষ্য সংখ্যা ${convertToBanglaNumber(val)} সেট করা হয়েছে। গণনা শুরু করুন!`,
              isAlert: true
          });
      }
  }

  // ৮. প্রিসেট জপমালা নির্বাচন
  function selectPreset(presetText) {
      dtState.activePreset = presetText;
      dtState.count = getTodayCountForChant(presetText);
      dtState.undoStack = [];
      dtState.redoStack = [];
      saveDtStateToStorage();
      renderPresets();
      renderCountDisplay();
  }

  function renderPresets() {
      const container = document.getElementById('dtPresetsContainer');
      container.innerHTML = '';
      const presets = religionData[dtState.religion].presets;
      if (!dtState.activePreset || !presets.includes(dtState.activePreset)) {
          dtState.activePreset = presets[0];
      }

      presets.forEach(p => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `dt-preset-btn ${p === dtState.activePreset ? 'active' : ''}`;
          btn.innerText = p;
          btn.onclick = function() { selectPreset(p); };
          container.appendChild(btn);
      });
  }

  // ৯. ডিসপ্লে রেন্ডার
  function renderCountDisplay() {
      document.getElementById('dtCountDisplay').innerText = convertToBanglaNumber(dtState.count);
      document.getElementById('dtProfileCountDisplay').innerText = `গণনা: ${convertToBanglaNumber(dtState.count)}`;
      document.getElementById('dtActiveProfileText').innerText = dtState.profile;
      document.getElementById('dtProfileNameDisplay').innerText = dtState.profile;
  }

  // ১০. লোকাল স্টোরেজ ও পাঠ ভিত্তিক মোট গণনার সারসংক্ষেপ
  function saveHistoryRecord() {
      const today = new Date().toISOString().split('T')[0];
      const currentChant = dtState.activePreset || religionData[dtState.religion].presets[0];
      const existingIdx = dtState.history.findIndex(h => h.date === today && h.profile === dtState.profile && h.chant === currentChant && h.religion === dtState.religion);

      if (dtState.count <= 0) {
          if (existingIdx > -1) {
              dtState.history.splice(existingIdx, 1);
          }
      } else if (existingIdx > -1) {
          dtState.history[existingIdx].count = dtState.count;
      } else {
          dtState.history.unshift({
              date: today,
              profile: dtState.profile,
              religion: dtState.religion,
              chant: currentChant,
              count: dtState.count
          });
      }

      if (dtState.history.length > 50) dtState.history.pop();

      localStorage.setItem('dt_history_logs', JSON.stringify(dtState.history));
      renderChantAnalyticsSummary();
  }

  // কোনো অ্যালার্ট ছাড়াই সরাসরি কার্ড ডিলিট ফাংশন
  function deleteChantBadge(chantName) {
      dtState.history = dtState.history.filter(h => !(h.religion === dtState.religion && h.chant === chantName));
      localStorage.setItem('dt_history_logs', JSON.stringify(dtState.history));

      // বর্তমানে চালু থাকা পাঠ ডিলিট হলে তার কাউন্টারও ০ হয়ে যাবে
      if (dtState.activePreset === chantName) {
          dtState.count = 0;
          dtState.undoStack = [];
          dtState.redoStack = [];
          saveDtStateToStorage();
          renderCountDisplay();
      }

      renderChantAnalyticsSummary();
  }

  function renderChantAnalyticsSummary() {
      const summaryContainer = document.getElementById('dtChantAnalyticsGrid');
      const grandTotalEl = document.getElementById('dtGrandTotalVal');
      if (!summaryContainer) return;
      summaryContainer.innerHTML = '';

      const currentRelLogs = dtState.history.filter(h => h.religion === dtState.religion);

      const totals = {};
      let grandTotal = 0;

      currentRelLogs.forEach(log => {
          const c = log.count || 0;
          if (c > 0) {
              if (!totals[log.chant]) {
                  totals[log.chant] = 0;
              }
              totals[log.chant] += c;
              grandTotal += c;
          }
      });

      if (grandTotalEl) {
          grandTotalEl.innerText = `${convertToBanglaNumber(grandTotal)} বার`;
      }

      const keys = Object.keys(totals);
      if (keys.length === 0) {
          summaryContainer.innerHTML = '<div style="color:#64748b; font-size:13px; text-align:center; grid-column:1/-1; padding: 8px 0;">এই ধর্মের জন্য এখনো কোনো গণনার সারসংক্ষেপ নেই।</div>';
          return;
      }

      keys.forEach(chantName => {
          const totalCount = totals[chantName];
          const badge = document.createElement('div');
          badge.className = 'dt-analytics-badge';

          const delBtn = document.createElement('button');
          delBtn.type = 'button';
          delBtn.className = 'dt-badge-del-btn';
          delBtn.title = 'ডিলিট করুন';
          delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
          delBtn.onclick = function() {
              deleteChantBadge(chantName);
          };

          const infoDiv = document.createElement('div');
          infoDiv.className = 'dt-analytics-info';
          infoDiv.innerHTML = `
            <span class="dt-analytics-name">${chantName}</span>
            <strong class="dt-analytics-val">${convertToBanglaNumber(totalCount)} বার <span>পাঠ করেছেন</span></strong>
          `;

          badge.appendChild(infoDiv);
          badge.appendChild(delBtn);
          summaryContainer.appendChild(badge);
      });
  }

  function saveDtStateToStorage() {
      localStorage.setItem('dt_current_state', JSON.stringify({
          religion: dtState.religion,
          profile: dtState.profile,
          count: dtState.count,
          targetCount: dtState.targetCount,
          activePreset: dtState.activePreset
      }));
  }

  function loadDtStateFromStorage() {
      const savedState = localStorage.getItem('dt_current_state');
      if (savedState) {
          const parsed = JSON.parse(savedState);
          dtState.religion = parsed.religion || 'islam';
          dtState.profile = parsed.profile || 'আমার তাসবিহ';
          dtState.count = parsed.count || 0;
          dtState.targetCount = parsed.targetCount || 0;
          dtState.activePreset = parsed.activePreset || religionData[dtState.religion].presets[0];
          document.getElementById('dtReligionSelect').value = dtState.religion;
      }
      const savedHist = localStorage.getItem('dt_history_logs');
      if (savedHist) {
          dtState.history = JSON.parse(savedHist);
      }
  }

  // ১১. প্রোফাইল নাম পরিবর্তন
  function renameCurrentProfile() {
      showDtCustomDialog({
          title: 'প্রোফাইল নাম পরিবর্তন',
          message: 'আপনার নতুন প্রোফাইল নাম লিখুন:',
          isPrompt: true,
          defaultValue: dtState.profile,
          onConfirm: function(newName) {
              if (newName && newName.trim() !== '') {
                  dtState.profile = newName.trim();
                  saveDtStateToStorage();
                  renderCountDisplay();
              }
          }
      });
  }
