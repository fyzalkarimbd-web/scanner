// ডিজিটাল তাসবিহ ও জপমালা মোডাল অ্যাক্টিভেশন
  function openDigitalCounterModal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-digital-counter');
      const modal = document.getElementById('digitalCounterModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক [1.1.2]
          initDigitalCounterTool();
      }
  }

  function closeDigitalCounterModal() {
      const modal = document.getElementById('digitalCounterModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল সচল [1.1.2]
      }
  }

  // ১. ধর্মভিত্তিক জপমালা ও দোকানদারদের জন্য বিশেষ বাণী ডাটাবেজ
  const religionData = {
      islam: {
          greeting: "প্রিয় কম্পিউটার দোকানদার ভাই কাস্টমার কম থাকলে বসে না থেকে আল্লাহর জিকির ও তাসবিহ পাঠ করুন। এতে ব্যবসায় আয়-বরকত হবে ইনশাআল্লাহ।",
          tapLabel: "গণনা করতে ক্লিক করুন!",
          presets: ["সুবহানাল্লাহ", "আলহামদুলিল্লাহ", "আল্লাহু আকবার", "লা ইলাহা ইল্লাল্লাহ", "আস্তাগফিরুল্লাহ", "দুরুদ শরীফ"]
      },
      hindu: {
          greeting: "প্রিয় কম্পিউটার দোকানদার ভাই ব্যবসায়িক অবসরে অনর্থক সময় নষ্ট না করে ঈশ্বর/ভগবানের ইষ্টনাম জপমালা জপ করুন। এতে ব্যবসায়ে কৃপা লাভ হবে।",
          tapLabel: "জপ করতে স্পর্শ করুন!",
          presets: ["ওঁ নমঃ শিবায়", "হরে কৃষ্ণ হরে রাম", "জয় শ্রী রাম", "ওঁ শ্রী গণেশায় নমঃ", "ওঁ নমো নারায়ণায়", "মহামৃত্যুঞ্জয় মন্ত্র"]
      },
      buddhist: {
          greeting: "প্রিয় দোকানদার ভাই অবসরে মনোযোগী হয়ে বুদ্ধের গুণাবলী ও সূত্র জপ করুন। এতে মন শান্ত থাকবে এবং ব্যবসায় শান্তি ও প্রবৃদ্ধি বজায় থাকবে।",
          tapLabel: "জপ করতে স্পর্শ করুন!",
          presets: ["বুদ্ধং শরণং গচ্ছামি", "ধম্মং শরণং গচ্ছামি", "সঙ্ঘং শরণং গচ্ছামি", "নমো বুদ্ধায়", "ওঁ মনি পদ্মে হুম", "অনিত্য বোধি জপ"]
      },
      christian: {
          greeting: "প্রিয় দোকানদার ভাই কাজের ফাকে সময় নষ্ট না করে প্রভুর প্রার্থনা ও স্তব পাঠ করুন। এতে আপনার ব্যবসা ও পরিবারে ঈশ্বরের পরম আশীর্বাদ বর্ষিত হবে।",
          tapLabel: "প্রার্থনা গণনা করতে চাপুন!",
          presets: ["জয় যীশু", "আমাদের স্বর্গস্থ পিতা", "প্রভুর ধন্যবাদ", "হালেলুইয়া", "পবিত্রময় যীশু", "পবিত্র আত্মা"]
      }
  };

  let dtState = {
      religion: 'islam',
      profile: 'নাম এডিট করুন!',
      count: 0,
      targetCount: 0, // টার্গেট সংখ্যা ট্র্যাক করার নতুন ভেরিয়েবল
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
      const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
      return n.toString().replace(/[0-9]/g, function(w) { return banglaDigits[w] || w; });
  }

  // ৪. ইনিশিয়ালাইজেশন
  function initDigitalCounterTool() {
      loadDtStateFromStorage();
      updateReligionUI();
      renderCountDisplay();
      renderPresets();
      renderHistoryTable();
  }

  // ৫. ধর্ম পরিবর্তনের লজিক (পৃথক ফিল্টারিং সহ - NEW UPDATE)
  function switchReligion(rel) {
      dtState.religion = rel;
      dtState.activePreset = religionData[rel].presets[0];
      dtState.count = 0; // ধর্ম বদলালে কাউন্ট ০ থেকে শুরু হবে
      dtState.targetCount = 0;
      saveDtStateToStorage();
      updateReligionUI();
      renderPresets();
      renderCountDisplay();
      renderHistoryTable(); // নির্বাচিত ধর্মের ইতিহাস পৃথকভাবে দেখাবে
  }

  function updateReligionUI() {
      const info = religionData[dtState.religion];
      document.getElementById('dtShopkeeperNotice').innerHTML = `<strong>কথা ও বার্তা:</strong> ${info.greeting}`;
      document.getElementById('dtTapLabel').innerText = info.tapLabel;
  }

  // ৬. কাউন্টার বাড়ানো (Target Reached Congratulatory Popup সহ - NEW UPDATE)
  function incrementCounter() {
      dtState.undoStack.push(dtState.count);
      dtState.redoStack = []; 
      dtState.count++;
      
      // মোবাইলে হ্যাপটিক ভাইব্রেশন
      if (navigator.vibrate) {
          navigator.vibrate(30);
      }

      saveDtStateToStorage();
      saveHistoryRecord();
      renderCountDisplay();

      // টার্গেট সংখ্যা পূর্ণ হলে ধর্ম অনুযায়ী অভিনন্দনের পপ-আপ দেখাবে (NEW UPDATE)
      if (dtState.targetCount > 0 && dtState.count === dtState.targetCount) {
          triggerReligiousCongratulations(dtState.targetCount);
      }
  }

  // ধর্ম ভিত্তিক অভিনন্দন পপ-আপ লজিক (NEW UPDATE)
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
          renderCountDisplay();
      }
  }

  function redoCounter() {
      if (dtState.redoStack.length > 0) {
          dtState.undoStack.push(dtState.count);
          dtState.count = dtState.redoStack.pop();
          saveDtStateToStorage();
          renderCountDisplay();
      }
  }

  function resetCounter() {
      if (dtState.count === 0) return;
      showDtCustomDialog({
          title: 'কাউন্টার রিসেট',
          message: 'আপনি কি বর্তমান গণনা ০ (শূন্য) করতে চান?',
          isConfirm: true,
          onConfirm: function() {
              dtState.undoStack.push(dtState.count);
              dtState.count = 0;
              dtState.targetCount = 0;
              saveDtStateToStorage();
              renderCountDisplay();
          }
      });
  }

  function setCustomCount() {
      const val = parseInt(document.getElementById('dtSetInput').value, 10);
      if (!isNaN(val) && val > 0) {
          dtState.undoStack.push(dtState.count);
          dtState.targetCount = val; // টার্গেট সংখ্যা সেভ করবে
          dtState.count = 0; // ০ থেকে স্টার্ট হবে টার্গেটের দিকে
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
      saveDtStateToStorage();
      renderPresets();
  }

  function renderPresets() {
      const container = document.getElementById('dtPresetsContainer');
      container.innerHTML = '';
      const presets = religionData[dtState.religion].presets;

      presets.forEach(p => {
          const btn = document.createElement('button');
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

  // ১০. ইতিহাস ও লোকাল স্টোরেজ (ধর্ম ভিত্তিক পৃথক ফিল্টারিং - NEW UPDATE)
  function saveHistoryRecord() {
      const today = new Date().toISOString().split('T')[0];
      const existingIdx = dtState.history.findIndex(h => h.date === today && h.profile === dtState.profile && h.chant === dtState.activePreset && h.religion === dtState.religion);

      if (existingIdx > -1) {
          dtState.history[existingIdx].count = dtState.count;
      } else {
          dtState.history.unshift({
              date: today,
              profile: dtState.profile,
              religion: dtState.religion,
              chant: dtState.activePreset || religionData[dtState.religion].presets[0],
              count: dtState.count
          });
      }
      
      if (dtState.history.length > 50) dtState.history.pop();
      
      localStorage.setItem('dt_history_logs', JSON.stringify(dtState.history));
      renderHistoryTable();
  }

  // জপমালা ভিত্তিক মোট গণনার সারসংক্ষেপ (ধর্ম ভিত্তিক পৃথকীকৃত - NEW UPDATE)
  function renderChantAnalyticsSummary() {
      const summaryContainer = document.getElementById('dtChantAnalyticsGrid');
      if (!summaryContainer) return;
      summaryContainer.innerHTML = '';

      // শুধুমাত্র নির্বাচিত ধর্মের ইতিহাস ফিল্টার করবে [1.1.2]
      const currentRelLogs = dtState.history.filter(h => h.religion === dtState.religion);

      const totals = {};
      currentRelLogs.forEach(log => {
          if (!totals[log.chant]) {
              totals[log.chant] = 0;
          }
          totals[log.chant] += (log.count || 0);
      });

      const keys = Object.keys(totals);
      if (keys.length === 0) {
          summaryContainer.innerHTML = '<div style="color:#64748b; font-size:13px; text-align:center; grid-column:1/-1;">এই ধর্মের জন্য এখনো কোনো গণনার সারসংক্ষেপ নেই।</div>';
          return;
      }

      keys.forEach(chantName => {
          const totalCount = totals[chantName];
          const badge = document.createElement('div');
          badge.className = 'dt-analytics-badge';
          badge.innerHTML = `
            <span class="dt-analytics-name">${chantName}</span>
            <strong class="dt-analytics-val">${convertToBanglaNumber(totalCount)} বার</strong>
          `;
          summaryContainer.appendChild(badge);
      });
  }

  // নির্দিষ্ট ইতিহাস ডিলিট লজিক (নিখুঁত গ্লোবাল ইনডেক্স ফিক্স সহ - NEW UPDATE)
  function deleteHistoryRecord(filteredIndex) {
      const currentRelLogs = dtState.history.filter(h => h.religion === dtState.religion);
      const targetRecord = currentRelLogs[filteredIndex];
      if (!targetRecord) return;

      showDtCustomDialog({
          title: 'ইতিহাস মুছে ফেলা',
          message: 'আপনি কি এই গণনার ইতিহাসটি স্থায়ীভাবে মুছে ফেলতে চান?',
          isConfirm: true,
          onConfirm: function() {
              const globalIndex = dtState.history.indexOf(targetRecord);
              if (globalIndex > -1) {
                  dtState.history.splice(globalIndex, 1);
                  localStorage.setItem('dt_history_logs', JSON.stringify(dtState.history));
                  renderHistoryTable();
              }
          }
      });
  }

  // ইতিহাস টেবিল রেন্ডারার (শুধুমাত্র সক্রিয় ধর্মের ইতিহাস দেখাবে - NEW UPDATE)
  function renderHistoryTable() {
      const tbody = document.getElementById('dtHistoryTableBody');
      if (!tbody) return;
      tbody.innerHTML = '';

      // সক্রিয় ধর্মের লোগ ফিল্টার [1.1.2]
      const currentRelLogs = dtState.history.filter(h => h.religion === dtState.religion);

      if (currentRelLogs.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#64748b;">এই ধর্মের গণনার কোন ইতিহাস পাওয়া যায়নি।</td></tr>';
          renderChantAnalyticsSummary();
          return;
      }

      currentRelLogs.forEach((h, idx) => {
          const tr = document.createElement('tr');
          const relName = h.religion === 'islam' ? 'ইসলাম' : (h.religion === 'hindu' ? 'সনাতন' : (h.religion === 'buddhist' ? 'বৌদ্ধ' : 'খ্রিস্ট'));
          tr.innerHTML = `
            <td>${convertToBanglaNumber(h.date)}</td>
            <td style="font-weight:bold; color:#fff;">${h.profile}</td>
            <td>${relName}</td>
            <td style="color:#60a5fa;">${h.chant}</td>
            <td style="font-weight:bold; color:#10b981;">${convertToBanglaNumber(h.count)}</td>
            <td style="text-align: center;">
              <button class="dt-history-del-btn" onclick="deleteHistoryRecord(${idx})" title="ডিলিট করুন">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          `;
          tbody.appendChild(tr);
      });

      renderChantAnalyticsSummary();
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

  function addNewProfile() {
      const input = document.getElementById('dtNewProfileInput');
      const val = input.value.trim();
      if (val !== '') {
          dtState.profile = val;
          dtState.count = 0;
          dtState.targetCount = 0;
          input.value = '';
          saveDtStateToStorage();
          renderCountDisplay();
      } else {
          showDtCustomDialog({
              title: 'সতর্কবার্তা',
              message: 'দয়া করে একটি সঠিক প্রোফাইল নাম লিখুন।',
              isAlert: true
          });
      }
  }
