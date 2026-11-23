  // ১. মোডাল ওপেন ও ক্লোজ
  function openFamilyCardCensus2026Modal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-family-card-2026');
      const modal = document.getElementById('familyCardCensus2026Modal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          initFamilyCard2026Tool();
      }
  }

  function closeFamilyCardCensus2026Modal() {
      const modal = document.getElementById('familyCardCensus2026Modal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
      }
  }

  // মোবাইল ট্যাব স্যুইচার (তথ্য ফর্ম <-> লাইভ প্রিভিউ)
  function switchFc26MobileTab(tab) {
      const formPanel = document.getElementById('fc26FormPanel');
      const previewPanel = document.getElementById('fc26PreviewPanel');
      const formBtn = document.getElementById('fc26TabFormBtn');
      const previewBtn = document.getElementById('fc26TabPreviewBtn');

      if (!formPanel || !previewPanel) return;

      if (tab === 'preview') {
          formPanel.classList.add('fc26-mobile-hidden');
          previewPanel.classList.remove('fc26-mobile-hidden');
          formBtn.classList.remove('active');
          previewBtn.classList.add('active');
          updateFamilyCardCensus2026Preview();
      } else {
          previewPanel.classList.add('fc26-mobile-hidden');
          formPanel.classList.remove('fc26-mobile-hidden');
          previewBtn.classList.remove('active');
          formBtn.classList.add('active');
      }
  }

  // ইংরেজি সংখ্যাকে বাংলায় রূপান্তর
  function convertToBanglaNumber(n) {
      if (n === null || n === undefined) return '';
      const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
      return n.toString().replace(/[0-9]/g, function(w) { return banglaDigits[w] || w; });
  }

  function formatDateToBangla(rawDateStr) {
      if (!rawDateStr || rawDateStr === '-') return '';
      const parts = rawDateStr.split('-');
      if (parts.length !== 3) return '';
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const monthNames = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
      if (!monthNames[monthIdx] || isNaN(day)) return '';
      return convertToBanglaNumber(day) + " " + monthNames[monthIdx] + " " + convertToBanglaNumber(year);
  }

  // ২. ইনিশিয়ালাইজার
  function initFamilyCard2026Tool() {
      const container = document.getElementById('fc26MemberList');
      if (container && container.querySelectorAll('.fc26-member-card').length === 0) {
          addFc26MemberRow();
      }
      updateFamilyCardCensus2026Preview();
  }

  // ৩. এড্রেস অটো-কপি লজিক
  function syncSameAddressIfChecked() {
      const chk = document.getElementById('fc26SameAddressChk');
      if (chk && chk.checked) {
          document.getElementById('fc26CurrDiv').value = document.getElementById('fc26PermDiv').value;
          document.getElementById('fc26CurrDist').value = document.getElementById('fc26PermDist').value;
          document.getElementById('fc26CurrUpazila').value = document.getElementById('fc26PermUpazila').value;
          document.getElementById('fc26CurrUnion').value = document.getElementById('fc26PermUnion').value;
          document.getElementById('fc26CurrWard').value = document.getElementById('fc26PermWard').value;
          document.getElementById('fc26CurrVillage').value = document.getElementById('fc26PermVillage').value;
      }
  }

  function handleAddressAutoCopy() {
      syncSameAddressIfChecked();
      updateFamilyCardCensus2026Preview();
  }

  // ৪. ডাইনামিক পরিবার সদস্য কার্ড
  function addFc26MemberRow() {
      const container = document.getElementById('fc26MemberList');
      if (!container) return;

      const count = container.querySelectorAll('.fc26-member-card').length + 1;
      const memberId = 'mem_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
      const card = document.createElement('div');
      card.className = 'fc26-member-card';
      card.id = memberId;

      card.innerHTML = `
        <div class="fc26-member-card-head">
          <span class="fc26-mem-label"><i class="fa-solid fa-user"></i> সদস্য #${convertToBanglaNumber(count)}</span>
          <button type="button" class="fc26-del-mem-btn" onclick="removeFc26MemberRow('${memberId}')">
            <i class="fa-solid fa-trash-can"></i> মুছুন
          </button>
        </div>
        <div class="fc26-grid-2">
          <input type="text" class="m-name" placeholder="সদস্যের পূর্ণ নাম" oninput="updateFamilyCardCensus2026Preview()" />
          <input type="text" class="m-nid" placeholder="NID / জন্ম নিবন্ধন নম্বর" oninput="updateFamilyCardCensus2026Preview()" />
        </div>
        <div class="fc26-grid-2" style="margin-bottom:0;">
          <input type="text" class="m-rel" placeholder="সম্পর্ক (যেমন: স্বামী / পুত্র / কন্যা)" oninput="updateFamilyCardCensus2026Preview()" />
          <input type="text" class="m-inc" placeholder="মাসিক আয় (টাকা, না থাকলে ফাঁকা)" oninput="updateFamilyCardCensus2026Preview()" />
        </div>
      `;

      container.appendChild(card);
      updateFamilyCardCensus2026Preview();
  }

  function removeFc26MemberRow(id) {
      const el = document.getElementById(id);
      if (el) el.remove();
      const labels = document.querySelectorAll('#fc26MemberList .fc26-mem-label');
      labels.forEach((lbl, i) => {
          lbl.innerHTML = `<i class="fa-solid fa-user"></i> সদস্য #${convertToBanglaNumber(i + 1)}`;
      });
      updateFamilyCardCensus2026Preview();
  }

  // ৫. প্রক্সি মিনস টেস্ট (PMT Score Real-time Calculation)
  function calculatePMTScore() {
      const income = parseFloat(document.getElementById('fc26AnnualIncome').value) || 0;
      const wall = document.getElementById('fc26WallType').value;
      const land = document.getElementById('fc26AgriLand').value;
      const govtJob = document.getElementById('fc26GovtJob').value;

      const badge = document.getElementById('fc26PmtBadge');
      const pmtTextPreview = document.getElementById('p-fc26-pmt-summary-text');
      const pmtTextPdf = document.getElementById('pdf26-pmt-summary-text');

      let status = '';
      let badgeClass = '';
      let txtColor = '#15803d';

      if (govtJob === 'হ্যাঁ' || income > 300000 || land === '১ একরের বেশি') {
          status = 'অযোগ্য / উচ্চ আয়ের পরিবার (নগদ ভাতার তালিকাভুক্ত নয়)';
          badgeClass = 'fc26-pmt-badge pmt-low';
          txtColor = '#be123c';
      } else if (income <= 150000 && (wall.includes('টিন') || wall.includes('মাটি')) && (land === '১০ শতকের নিচে' || land === 'নেই')) {
          status = 'উচ্চ অগ্রাধিকার ক্ষেত্র (দুস্থ/দরিদ্র পরিবার - সুবিধা পাওয়ার যোগ্য)';
          badgeClass = 'fc26-pmt-badge pmt-high';
          txtColor = '#15803d';
      } else {
          status = 'মাঝারি অগ্রাধিকার ক্ষেত্র (স্বল্প আয়ের পরিবার)';
          badgeClass = 'fc26-pmt-badge pmt-medium';
          txtColor = '#a16207';
      }

      if (badge) {
          badge.className = badgeClass;
          badge.innerHTML = `<i class="fa-solid fa-chart-line"></i> PMT মূল্যায়ন স্ট্যাটাস: ${status}`;
      }
      if (pmtTextPreview) {
          pmtTextPreview.innerText = status;
          pmtTextPreview.style.color = txtColor;
      }
      if (pmtTextPdf) {
          pmtTextPdf.innerText = status;
          pmtTextPdf.style.color = txtColor;
      }
  }

  // ঠিকানা সুন্দরভাবে ফরম্যাট করার হেল্পার
  function buildBanglaAddress(village, ward, union, upazila, dist, div) {
      const parts = [];
      if (village) parts.push('গ্রাম/মহল্লা: ' + village);
      if (ward) parts.push('ওয়ার্ড: ' + convertToBanglaNumber(ward));
      if (union) parts.push(union);
      if (upazila) parts.push(upazila);
      if (dist) parts.push(dist);
      if (div) parts.push(div);
      return parts.length > 0 ? parts.join(', ') : '................................';
  }

  // ৬. রিয়াল-টাইম প্রিভিউ ও পিডিএফ ডাটা সিঙ্ক
  function updateFamilyCardCensus2026Preview() {
      syncSameAddressIfChecked();

      const getVal = (id, fallback) => {
          const el = document.getElementById(id);
          return el ? el.value.trim() : fallback;
      };

      const syncTxt = (suffix, val) => {
          const pEl = document.getElementById('p-fc26-' + suffix);
          const pdfEl = document.getElementById('pdf26-' + suffix);
          const displayVal = (val && val.toString().trim() !== '') ? val : '................................';
          if (pEl) pEl.innerText = displayVal;
          if (pdfEl) pdfEl.innerText = displayVal;
      };

      // ১. নারী সদস্যের তথ্য
      const wNameBn = getVal('fc26WomanNameBn', '');
      const wNameEn = getVal('fc26WomanNameEn', '');
      let wNameFull = '';
      if (wNameBn && wNameEn) wNameFull = wNameBn + ' / ' + wNameEn.toUpperCase();
      else if (wNameBn) wNameFull = wNameBn;
      else if (wNameEn) wNameFull = wNameEn.toUpperCase();

      const wNid = getVal('fc26WomanNid', '');
      const wBirthReg = getVal('fc26WomanBirthReg', '');
      let wIdFull = '';
      if (wNid && wBirthReg) wIdFull = convertToBanglaNumber(wNid) + ' (জন্ম নিবন্ধন: ' + convertToBanglaNumber(wBirthReg) + ')';
      else if (wNid) wIdFull = convertToBanglaNumber(wNid);
      else if (wBirthReg) wIdFull = convertToBanglaNumber(wBirthReg) + ' (জন্ম নিবন্ধন)';

      const wDob = getVal('fc26WomanDob', '');
      const wDobFormatted = wDob ? formatDateToBangla(wDob) : '';
      const wMobile = getVal('fc26WomanMobile', '');
      const wMarital = getVal('fc26MaritalStatus', 'বিবাহিত');
      const wReligion = getVal('fc26Religion', 'ইসলাম');
      const wEdu = getVal('fc26Education', 'এসএসসি');
      const wProf = getVal('fc26Profession', 'গৃহিণী');

      const fName = getVal('fc26FatherNameBn', '');
      const fNid = getVal('fc26FatherNid', '');
      const fatherFull = fName ? (fNid ? fName + ' (NID: ' + convertToBanglaNumber(fNid) + ')' : fName) : '';

      const mName = getVal('fc26MotherNameBn', '');
      const mNid = getVal('fc26MotherNid', '');
      const motherFull = mName ? (mNid ? mName + ' (NID: ' + convertToBanglaNumber(mNid) + ')' : mName) : '';

      const sName = getVal('fc26SpouseNameBn', '');
      const sNid = getVal('fc26SpouseNid', '');
      const spouseFull = sName ? (sNid ? sName + ' (NID: ' + convertToBanglaNumber(sNid) + ')' : sName) : '';

      syncTxt('w-name', wNameFull);
      syncTxt('w-nid', wIdFull);
      syncTxt('w-dob', wDobFormatted);
      syncTxt('w-mobile', wMobile ? convertToBanglaNumber(wMobile) : '');
      syncTxt('w-marital', wMarital);
      syncTxt('w-religion', wReligion);
      syncTxt('w-edu', wEdu);
      syncTxt('w-prof', wProf);
      syncTxt('w-father', fatherFull);
      syncTxt('w-mother', motherFull);
      syncTxt('w-spouse', spouseFull);

      // ২. ভাতা লিস্ট
      const selectedAllowances = Array.from(document.querySelectorAll('#fc26AllowancesGrid input:checked')).map(c => c.value);
      const allowStr = selectedAllowances.length > 0 ? selectedAllowances.join(', ') : 'কোনো পূর্ববর্তী সরকারি ভাতার রেকর্ড পাওয়া যায়নি';
      syncTxt('allowances-text', allowStr);

      // ৩. ঠিকানা
      const permAddrFull = buildBanglaAddress(
          getVal('fc26PermVillage', ''), getVal('fc26PermWard', ''), getVal('fc26PermUnion', ''),
          getVal('fc26PermUpazila', ''), getVal('fc26PermDist', ''), getVal('fc26PermDiv', '')
      );
      const currAddrFull = buildBanglaAddress(
          getVal('fc26CurrVillage', ''), getVal('fc26CurrWard', ''), getVal('fc26CurrUnion', ''),
          getVal('fc26CurrUpazila', ''), getVal('fc26CurrDist', ''), getVal('fc26CurrDiv', '')
      );
      syncTxt('perm-addr', permAddrFull);
      syncTxt('curr-addr', currAddrFull);

      // ৪. সদস্য সংখ্যা
      const totalMem = getVal('fc26TotalMembers', '0');
      const adultMem = getVal('fc26AdultMembers', '0');
      const childMem = getVal('fc26ChildMembers', '0');
      syncTxt('total-mem', totalMem ? convertToBanglaNumber(totalMem) + ' জন' : '০ জন');
      syncTxt('adult-mem', adultMem ? convertToBanglaNumber(adultMem) + ' জন' : '০ জন');
      syncTxt('child-mem', childMem ? convertToBanglaNumber(childMem) + ' জন' : '০ জন');

      // ৫, ৬ ও ৭. আয়-ব্যয় ও বসতবাড়ি
      const annInc = getVal('fc26AnnualIncome', '');
      const monExp = getVal('fc26MonthlyExpense', '');
      const earnerInc = getVal('fc26EarnerIncome', '');
      syncTxt('ann-inc', annInc ? convertToBanglaNumber(annInc) + ' টাকা' : '');
      syncTxt('mon-exp', monExp ? convertToBanglaNumber(monExp) + ' টাকা' : '');
      syncTxt('earner-inc', earnerInc ? convertToBanglaNumber(earnerInc) + ' টাকা' : '');
      syncTxt('land-val', getVal('fc26AgriLand', '১০ শতকের নিচে'));
      syncTxt('wall-val', getVal('fc26WallType', 'টিন / বাঁশ / মাটি'));
      syncTxt('govt-job', getVal('fc26GovtJob', 'না'));
      syncTxt('remitt', getVal('fc26Remittance', 'না'));

      // ৮ ও ৯. পানি, টয়লেট ও সম্পদ
      syncTxt('water-src', getVal('fc26WaterSource', 'টিউবওয়েল / সাধারণ নলকূপ'));
      syncTxt('toilet-type', getVal('fc26ToiletType', 'স্যানিটারি ল্যাট্রিন'));

      const selectedAssets = Array.from(document.querySelectorAll('#fc26AssetsGrid input:checked')).map(c => c.value);
      const assetStr = selectedAssets.length > 0 ? selectedAssets.join(', ') : 'সাধারণ ব্যবহার্য আসবাবপত্র';
      syncTxt('assets-text', assetStr);

      // ১০, ১১ ও ১২. MFS, ব্যাংক ও নমিনির সম্পূর্ণ তথ্য
      syncTxt('mfs-name', getVal('fc26MfsType', 'বিকাশ (bKash)'));
      const mfsNum = getVal('fc26MfsNumber', '');
      const bankAcc = getVal('fc26BankAcc', '');
      const nomName = getVal('fc26NomineeName', '');
      const nomNid = getVal('fc26NomineeNid', '');
      const nomBirthReg = getVal('fc26NomineeBirthReg', '');
      const nomMobile = getVal('fc26NomineeMobile', '');
      const nomMfsType = getVal('fc26NomineeMfsType', 'বিকাশ (bKash)');

      syncTxt('mfs-num', mfsNum ? convertToBanglaNumber(mfsNum) : '');
      syncTxt('bank-acc', bankAcc ? convertToBanglaNumber(bankAcc) : '');
      syncTxt('nom-name', nomName);
      syncTxt('nom-nid', nomNid ? convertToBanglaNumber(nomNid) : '');
      syncTxt('nom-birth-reg', nomBirthReg ? convertToBanglaNumber(nomBirthReg) : '');
      syncTxt('nom-mobile', nomMobile ? convertToBanglaNumber(nomMobile) : '');
      syncTxt('nom-mfs-type', nomMfsType);

      // ফ্যামিলি মেম্বারস ছক ও PMT স্কোর আপডেট
      renderFc26MembersTable();
      calculatePMTScore();
  }

  // ফ্যামিলি মেম্বারস ছক রেন্ডারার
  function renderFc26MembersTable() {
      const container = document.getElementById('fc26MemberList');
      const pTbody = document.getElementById('p-fc26-members-tbody');
      const pdfTbody = document.getElementById('pdf26-members-tbody');

      if (!container || !pTbody || !pdfTbody) return;

      const cards = container.querySelectorAll('.fc26-member-card');
      let html = '';

      cards.forEach(card => {
          const name = card.querySelector('.m-name').value.trim();
          const nid = card.querySelector('.m-nid').value.trim();
          const rel = card.querySelector('.m-rel').value.trim();
          const inc = card.querySelector('.m-inc').value.trim();

          if (name !== '') {
              html += `
                <tr>
                  <td style="font-weight:bold;">${name}</td>
                  <td>${nid ? convertToBanglaNumber(nid) : '-'}</td>
                  <td>${rel || '-'}</td>
                  <td>${inc ? convertToBanglaNumber(inc) + ' টাকা' : '-'}</td>
                </tr>
              `;
          }
      });

      if (html === '') {
          html = '<tr><td colspan="4" style="text-align:center;">সদস্য যোগ করা হয়নি</td></tr>';
      }

      pTbody.innerHTML = html;
      pdfTbody.innerHTML = html;
  }

  // ৭. ২-পৃষ্ঠার A4 পিডিএফ জেনারেটর (ASYNC/AWAIT)
  async function startFamilyCardCensus2026Generation(action) {
      const statusEl = document.getElementById('familyCardCensus2026Status');
      const generateBtn = document.getElementById('fc26GenerateBtn');
      const printBtn = document.getElementById('fc26PrintBtn');

      const name = document.getElementById('fc26WomanNameBn').value.trim();
      if (!name) {
          alert('দয়া করে প্রথমে কার্ডগ্রহীতা নারীর নাম (বাংলায়) অবশ্যই লিখুন।');
          return;
      }

      statusEl.innerText = '২-পৃষ্ঠার অফিশিয়াল ফ্যামিলি কার্ড শুমারি ২০২৬ ফরম তৈরি করা হচ্ছে...';
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          updateFamilyCardCensus2026Preview();

          const page1 = document.getElementById('pdfFc26Page1');
          const page2 = document.getElementById('pdfFc26Page2');

          let jsPDFClass = null;
          if (window.jspdf && window.jspdf.jsPDF) {
              jsPDFClass = window.jspdf.jsPDF;
          } else if (window.jsPDF) {
              jsPDFClass = window.jsPDF;
          }

          if (!jsPDFClass || typeof window.html2canvas === 'undefined') {
              throw new Error("পিডিএফ লাইব্রেরি এখনও লোড হয়নি। অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করে আবার চেষ্টা করুন।");
          }

          const pdf = new jsPDFClass('p', 'mm', 'a4');

          // প্রথম পৃষ্ঠা ক্যাপচার
          const canvas1 = await html2canvas(page1, { scale: 2, useCORS: true, allowTaint: true, logging: false });
          pdf.addImage(canvas1.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, 210, 297);

          // দ্বিতীয় পৃষ্ঠা যুক্ত ও ক্যাপচার
          pdf.addPage('a4', 'p');
          const canvas2 = await html2canvas(page2, { scale: 2, useCORS: true, allowTaint: true, logging: false });
          pdf.addImage(canvas2.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, 210, 297);

          const cleanName = name.replace(/\s+/g, '_');
          const fileName = `family_card_census2026_${cleanName}.pdf`;

          if (action === 'print') {
              statusEl.innerText = 'ব্রাউজার প্রিন্ট ডায়ালগ ওপেন হচ্ছে...';
              pdf.autoPrint();
              const pdfUrl = pdf.output('bloburl');
              const printWindow = window.open(pdfUrl, '_blank');
              if (printWindow) printWindow.focus();
              statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> ২-পৃষ্ঠার প্রিন্ট উইন্ডো সফলভাবে ওপেন হয়েছে!</span>';
          } else {
              statusEl.innerText = '২-পৃষ্ঠার শুমারি ফরমটি পিডিএফ হিসেবে সেভ হচ্ছে...';
              pdf.save(fileName);
              statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> ২-পৃষ্ঠার ফ্যামিলি কার্ড শুমারি ২০২৬ পিডিএফ তৈরি হয়েছে!</span>';
          }
      } catch (err) {
          statusEl.innerHTML = '<span style="color: #f87171;">পিডিএফ তৈরি করতে সমস্যা হয়েছে: ' + (err.message || '') + '</span>';
          console.error(err);
      } finally {
          generateBtn.disabled = false;
          printBtn.disabled = false;
      }
  }

  // ৮. ফর্ম রিসেট
  function clearFamilyCardCensus2026Form() {
      const inputs = document.querySelectorAll('#fc26FormPanel input[type="text"], #fc26FormPanel input[type="number"], #fc26FormPanel input[type="date"]');
      inputs.forEach(input => input.value = '');

      const checkable = document.querySelectorAll('#fc26FormPanel input[type="checkbox"]');
      checkable.forEach(c => c.checked = false);

      // ডিফল্ট ভ্যালু রিসেট
      document.getElementById('fc26TotalMembers').value = '4';
      document.getElementById('fc26AdultMembers').value = '2';
      document.getElementById('fc26ChildMembers').value = '2';
      document.getElementById('fc26AnnualIncome').value = '120000';
      document.getElementById('fc26MonthlyExpense').value = '9000';
      document.getElementById('fc26EarnerIncome').value = '10000';

      const selects = document.querySelectorAll('#fc26FormPanel select');
      selects.forEach(sel => sel.selectedIndex = 0);

      const memberList = document.getElementById('fc26MemberList');
      if (memberList) {
          memberList.innerHTML = '';
          addFc26MemberRow();
      }

      updateFamilyCardCensus2026Preview();

      document.getElementById('familyCardCensus2026Status').innerText = 'অফিশিয়াল ২-পৃষ্ঠার ফ্যামিলি কার্ড পিডিএফ তৈরির জন্য প্রস্তুত';
      document.getElementById('fc26GenerateBtn').disabled = false;
      document.getElementById('fc26PrintBtn').disabled = false;
  }
