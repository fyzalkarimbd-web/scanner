// Configure PDF.js worker
  if (window.pdfjsLib) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Global State for Voter List Finder
  const vlfState = {
      files: [],
      voters: [],
      filtered: [],
      currentPage: 1,
      perPage: 30,
      pvFileId: null,
      pvPageNum: 1,
      pvScale: 1.5,
      searchTimer: null
  };

  // Modal Open / Close
  function openVoterListFinderModal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-voter-list-finder');
      const modal = document.getElementById('voterListFinderModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          initVlfDropZone();
      }
  }

  function closeVoterListFinderModal() {
      const modal = document.getElementById('voterListFinderModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
      }
      closeVlfPageViewer();
  }

  // Drag & Drop Init
  let vlfDropInited = false;
  function initVlfDropZone() {
      if (vlfDropInited) return;
      vlfDropInited = true;
      const dz = document.getElementById('vlfDropZone');
      if (!dz) return;

      ['dragenter', 'dragover'].forEach(evt => {
          dz.addEventListener(evt, function(e) {
              e.preventDefault();
              e.stopPropagation();
              dz.classList.add('dragover');
          });
      });
      ['dragleave', 'drop'].forEach(evt => {
          dz.addEventListener(evt, function(e) {
              e.preventDefault();
              e.stopPropagation();
              dz.classList.remove('dragover');
          });
      });
      dz.addEventListener('drop', function(e) {
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              handleVlfPdfFiles(e.dataTransfer.files);
          }
      });
  }

  // Number Helpers
  function vlfToBanglaNum(n) {
      if (n === null || n === undefined) return '';
      const d = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
      return n.toString().replace(/[0-9]/g, w => d[w] || w);
  }

  function vlfToEnglishNum(n) {
      if (!n) return '';
      const d = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
      return n.toString().replace(/[০-৯]/g, w => d[w] || w);
  }

  // =========================================================================
  // PRO BANGLADESH EC HYBRID PDF TO UNICODE BENGALI DECODER
  // =========================================================================
  const VLF_BIJOY_DETECT_RE = /[ÏÐÎËƣƤƀƁƂƃƄƅƆſŇĺ×ĢĤĥĦħĨĩİįĴļĽłńŅŋŏŐŌŒŔŘřśŝŞšŢŨũŪūŬŮůűųŴŽžƏƎĀăēĔėęĐŮĳîŌÔèêúÖÝŅÿåÙ]|িপতা|িঠকানা|Ïভাটার|বাংলােদশ|(?:^|[\s:ঃ,.])([িেৈ])[ক-হড়ঢ়য়]/;

  const VLF_BIJOY_CHAR_MAP = {
      'Ï': 'ে', 'Ð': 'ৈ', 'Î': '\uE001', 'Ë': '্য',
      'Ñ': 'ক্ক', 'Ò': 'ক্ট', 'Ó': 'ক্ট্র', 'Ô': 'ক্স', 'Õ': 'ক্ল', 'Ö': 'ক্ল',
      '×': 'ক্ত', 'Ø': 'ক্ত্র', 'Ù': 'ক্ষ', 'Ú': 'ক্ষ্ম', 'Û': 'ক্য', 'Ü': 'ক্র', 'Ý': 'ক্ব', 'Þ': 'ক্ম',
      'å': 'গ্র', 'æ': 'গ্ল', 'ç': 'গ্ধ', 'è': 'ঙ্ক', 'é': 'ঙ্খ', 'ê': 'ঙ্গ', 'ë': 'ঙ্ঘ',
      'î': 'চ্চ', 'ï': 'চ্ছ', 'ð': 'চ্ছ্ব', 'õ': 'জ্জ', 'ö': 'জ্জ্ব', '÷': 'জ্ঝ', 'ø': 'জ্ঞ', 'ù': 'জ্ব', 'ú': 'জ্ব',
      'û': 'ঞ্চ', 'ü': 'ঞ্ছ', 'ý': 'ঞ্জ', 'þ': 'ঞ্ঝ',
      'ÿ': 'ট্ট', 'Ā': 'ট্র', 'ā': 'ড্ড', 'Ă': 'ড্র', 'ă': 'ড্র',
      'Ą': 'ণ্ট', 'ą': 'ণ্ঠ', 'Ć': 'ণ্ড', 'ć': 'ণ্ণ', 'Č': 'ণ্ম',
      'Đ': 'ত্ন', 'đ': 'ত্ব', 'Ē': 'ত্ম', 'ē': 'ত্ত', 'Ĕ': 'ত্র', 'ĕ': 'ত্ব',
      'Ė': 'দ্গ', 'ė': 'দ্দ', 'Ę': 'দ্ধ', 'ę': 'দ্র', 'Ě': 'দ্ব', 'ě': 'দ্ম',
      'Ģ': 'ন্ত', 'ģ': 'ন্থ', 'Ĥ': 'ন্দ', 'ĥ': 'ন্ম', 'Ħ': 'ন্ধ', 'ħ': 'ন্দ্র',
      'Ĩ': 'ন্ন', 'ĩ': 'ন্স', 'Ī': 'ন্তু', 'ī': 'ন্ত্র', 'Ĭ': 'ন্ধ্র', 'į': 'ন্য',
      'İ': 'প্ত', 'ı': 'প্প', 'Ĳ': 'প্ল', 'ĳ': 'প্ন', 'Ĵ': 'প্র', 'ĵ': 'প্স',
      'Ķ': 'ফ্ল', 'ķ': 'ব্জ', 'ĺ': 'ব্দ', 'Ļ': 'ব্ধ', 'ļ': 'ব্ব', 'Ľ': 'ব্র', 'ľ': 'ব্ল', 'Ŀ': 'ভ্র',
      'ŀ': 'ম্ন', 'Ł': 'ম্প্র', 'ł': 'ম্প', 'Ń': 'ম্ফ', 'ń': 'ম্ব', 'Ņ': 'ম্ভ', 'ņ': 'ম্ভ্র', 'Ň': 'ম্ম', 'ň': 'ম্ল',
      'ŉ': 'ল্ক', 'Ŋ': 'ল্গ', 'ŋ': 'ল্ট', 'Ō': 'ল্ল', 'ō': 'ল্ব', 'Ŏ': 'ল্ফ', 'ŏ': 'ল্ড', 'Ő': 'ল্প', 'ő': 'ল্ম',
      'Ŕ': 'শ্চ', 'ŕ': 'শ্ছ', 'Ŗ': 'শ্ন', 'ŗ': 'শ্ম', 'Ř': 'শ্র', 'ř': 'শ্য', 'Ś': 'শ্ল', 'ś': 'শ্ব',
      'Ŝ': 'ষ্ক', 'ŝ': 'ষ্ণ', 'ş': 'ষ্ঠ', 'Š': 'ষ্ম', 'š': 'ষ্প',
      'Ţ': 'স্ট', 'ţ': 'ষ্ফ', 'Ť': 'স্ক', 'ť': 'স্খ', 'Ŧ': 'স্ট', 'ŧ': 'স্ট', 'Ũ': 'স্ট', 'ũ': 'স্ত',
      'Ū': 'স্থ', 'ū': 'স্ন', 'Ŭ': 'স্প', 'ŭ': 'স্ফ', 'Ů': 'স্ব', 'ů': 'স্ম',
      'Ű': 'স্র', 'ű': 'স্ত্র', 'Ų': 'স্ল', 'ų': 'স্য', 'Ŵ': 'স্ট্র',
      'ŵ': 'হ্ন', 'Ŷ': 'হ্ম', 'ŷ': 'হ্ল',
      'Ž': 'গু', 'ž': 'ন্তু', 'ſ': 'নু', 'ƀ': 'সু', 'Ɓ': 'রু', 'Ƃ': 'রূ', 'ƃ': 'দু', 'Ƅ': 'শু',
      'ƅ': 'হৃ', 'Ɔ': 'হু', 'Ǝ': 'স্তু', 'Ə': 'ন্দু', 'ƣ': 'কু', 'Ƥ': 'কু'
  };

  function convertEcBijoyToUnicode(rawLine) {
      if (!rawLine) return '';
      let s = rawLine.normalize('NFC');

      // Context-aware 'Œ' & 'Ş'
      s = s.replace(/Œ(?=[ýû])/g, '');
      s = s.replace(/Œ([জচছঝ])/g, 'ঞ্$1');
      s = s.replace(/Œ([কখগঘ])/g, 'ঙ্$1');
      s = s.replace(/Œ/g, 'ন্');

      s = s.replace(/Ş(?=[Ëাীে]|েকাড)/g, 'স্ট');
      s = s.replace(/(ই|মা|Ïপা)Ş/g, '$1স্ট');
      s = s.replace(/Ş/g, 'ষ্ট');

      // Dotted-circle r-ya-phala artifacts
      s = s.replace(/র\u25CC্যা/g, 'র\u200D্যা').replace(/রে\u25CC/g, 'র\u200D্যে').replace(/\u25CC/g, '');

      let out = '';
      for (let i = 0; i < s.length; i++) {
          const ch = s[i];
          out += (VLF_BIJOY_CHAR_MAP[ch] !== undefined) ? VLF_BIJOY_CHAR_MAP[ch] : ch;
      }
      s = out.normalize('NFC');

      // Repair decomposed nukta & অ+া
      s = s.replace(/য\u09BC/g, 'য়').replace(/ড\u09BC/g, 'ড়').replace(/ঢ\u09BC/g, 'ঢ়').replace(/অা/g, 'আ');

      // Remove stray spaces adjacent to pre-base/combining marks BEFORE reordering
      s = s.replace(/([িেৈ])\s+([ক-হড়ঢ়য়ৎ])/g, '$1$2');
      s = s.replace(/\s+([\uE001াীুূৃৗংঃঁ্]|্য)/g, '$1');
      s = s.replace(/ঁ([ািীুূৃেৈোৌ])/g, '$1ঁ');

      // Reorder pre-base vowels (ি, ে, ৈ) after complete consonant cluster
      const cluster = '([ক-হড়ঢ়য়ৎ]\u09BC?(?:[\u200C\u200D]?্[\u200C\u200D]?[ক-হড়ঢ়য়ৎ]\u09BC?)*)';
      const preBaseRe = new RegExp('([িেৈ])' + cluster, 'g');
      s = s.replace(preBaseRe, '$2$1');

      s = s.replace(/ে\s*া/g, 'ো').replace(/ে\s*ৗ/g, 'ৌ');

      // Reorder post-base Reph (\uE001) BEFORE preceding consonant cluster + vowel sign
      const rephRe = new RegExp('([ক-হড়ঢ়য়]\u09BC?(?:[\u200C\u200D]?্[\u200C\u200D]?[ক-হড়ঢ়য়]\u09BC?)*[িীুূৃেৈোৌ]?)\uE001', 'g');
      s = s.replace(rephRe, 'র্$1');
      s = s.replace(/\uE001/g, 'র্');

      return polishBengaliText(s);
  }

  function polishBengaliText(s) {
      if (!s) return '';
      return s
          .normalize('NFC')
          .replace(/য\u09BC/g, 'য়')
          .replace(/ড\u09BC/g, 'ড়')
          .replace(/ঢ\u09BC/g, 'ঢ়')
          .replace(/অা/g, 'আ')
          .replace(/ে\s*া/g, 'ো')
          .replace(/ে\s*ৗ/g, 'ৌ')
          .replace(/ঁ([ািীুূৃেৈোৌ])/g, '$1ঁ')
          .replace(/\s+([ািীুূৃেৈোৌংঃঁ্])/g, '$1')
          .replace(/([ক-হড়ঢ়য়])\s+্\s*([ক-হড়ঢ়য়])/g, '$1্$2')
          .replace(/র্\s+([ক-হড়ঢ়য়])/g, 'র্$1')
          .replace(/([ক-হড়ঢ়য়])\s+(্য|্র)/g, '$1$2')
          .replace(/\s+([,।;:])/g, '$1')
          .replace(/\s+/g, ' ')
          .trim();
  }

  // =========================================================================
  // 3-TIER ULTRA-SMART BANGLA NORMALIZER & PHONETIC SEARCH ENGINE
  // =========================================================================

  // Tier 1: Clean Standard Normalization (Spelling-tolerant, keeps vowels)
  function vlfNormalizeForSearch(str) {
      if (!str) return '';
      return vlfToBanglaNum(str.normalize('NFC').toLowerCase())
          .replace(/য\u09BC/g, 'য়').replace(/ড\u09BC/g, 'ড়').replace(/ঢ\u09BC/g, 'ঢ়').replace(/অা/g, 'আ')
          .replace(/আক্তার|আখতার/g, 'আকতার')
          .replace(/জ্যোৎস্না|জোৎস্না|জ্যোস্না|জোসনা/g, 'জোসনা')
          .replace(/স্ট/g, 'ষ্ট')
          .replace(/ঈ/g, 'ই')
          .replace(/ী/g, 'ি')
          .replace(/ঊ/g, 'উ')
          .replace(/ূ/g, 'ু')
          .replace(/[ণঞ]/g, 'ন')
          .replace(/ং/g, 'ঙ')
          .replace(/[শষছ]/g, 'স')
          .replace(/[ড়ঢ়ড়ঢ়]/g, 'র')
          .replace(/য়/g, 'য')
          .replace(/ৎ/g, 'ত')
          .replace(/[ঃঁ্\u200C\u200D]/g, '')
          .replace(/[,\.\-\/\\:;|()'"]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
  }

  // Tier 2: Bangladeshi Phonetic Skeleton (Matches রহিমা/রাহিমা, আয়েশা/আয়শা,
  // শাহনাজ/শাহানাজ, জাহাঙ্গীর/জাহাংগীর, আহমেদ/আহমদ/আহম্মদ, রেহানা/রেহেনা, সখিনা/সকিনা, etc.)
  function vlfPhoneticKey(str) {
      if (!str) return '';
      let s = vlfToBanglaNum(str.normalize('NFC').toLowerCase())
          .replace(/য\u09BC/g, 'য়').replace(/ড\u09BC/g, 'ড়').replace(/ঢ\u09BC/g, 'ঢ়').replace(/অা/g, 'আ')
          .replace(/আক্তার|আখতার|আকতার/g, 'আকতর')
          .replace(/জ্যোৎস্না|জোৎস্না|জ্যোস্না|জোসনা/g, 'জসন')
          .replace(/মোহাম্মদ|মুহাম্মদ|মহাম্মদ|মোহম্মদ/g, 'মহমদ')
          .replace(/আহমেদ|আহমদ|আহম্মদ|আহাম্মদ|আহেম্মেদ|আহাম্মেদ/g, 'আহমদ')
          .replace(/[শষছ]/g, 'স')
          .replace(/[ণঞঙং]/g, 'ন')
          .replace(/[ড়ঢ়ড়ঢ়]/g, 'র')
          .replace(/খ/g, 'ক')
          .replace(/[থৎ]/g, 'ত')
          .replace(/ধ/g, 'দ')
          .replace(/ভ/g, 'ব')
          .replace(/ফ/g, 'প')
          .replace(/ঘ/g, 'গ')
          .replace(/ঝ/g, 'জ')
          .replace(/ঠ/g, 'ট')
          .replace(/ঢ/g, 'ড')
          .replace(/ঈ/g, 'ই')
          .replace(/ঊ/g, 'উ')
          .replace(/ঐ/g, 'এ')
          .replace(/ঔ/g, 'ও')
          .replace(/[ঃঁ্\u200C\u200D]/g, '')
          .replace(/[,\.\-\/\\:;|()'"]/g, ' ');

      // Keep digits untouched; strip variable internal vowel signs (কার) & semivowels (য়/য-ফলা) per word
      const words = s.split(/\s+/).filter(Boolean).map(w => {
          if (/[০-৯]/.test(w)) return w; // Strict digits for voter no / DOB / serial
          let p = w.replace(/[ািীুূৃেৈোৌ]/g, '').replace(/য়/g, '');
          // Collapse duplicate consecutive letters (ম্ম->ম, ন্ন->ন, দ্দ->দ, ল্ল->ল)
          p = p.replace(/(.)\1+/g, '$1');
          return p || w;
      });
      return words.join(' ').trim();
  }

  // Common Optional Title Prefixes in Bangladeshi Voter Names
  const VLF_OPTIONAL_TITLES = new Set([
      'মো', 'মোহামমদ', 'মুহামমদ', 'মোসা', 'মোসামমত', 'মোসামমদ',
      'মৃত', 'মৃতা', 'হাজি', 'আলহাজ', 'আলহাজব', 'স্রি', 'স্রিমতি', 'জনাব'
  ]);

  // =========================================================================
  // SUB-PIXEL LINE RECONSTRUCTION (JOINS FRAGMENTED PDF GLYPHS BEFORE DECODING)
  // =========================================================================
  function reconstructLinesFromRawItems(rawItems, isBijoy) {
      if (!rawItems || rawItems.length === 0) return [];

      const sorted = rawItems.slice().sort((a, b) => {
          if (Math.abs(b.y - a.y) > 4.2) return b.y - a.y;
          return a.x - b.x;
      });

      const rawLines = [];
      let curLine = [];
      let curY = null;

      for (let i = 0; i < sorted.length; i++) {
          const it = sorted[i];
          if (curY === null || Math.abs(it.y - curY) <= 4.2) {
              curLine.push(it);
              if (curY === null) curY = it.y;
          } else {
              rawLines.push(curLine);
              curLine = [it];
              curY = it.y;
          }
      }
      if (curLine.length > 0) rawLines.push(curLine);

      const finalLines = [];
      for (let l = 0; l < rawLines.length; l++) {
          const lineItems = rawLines[l].sort((a, b) => a.x - b.x);
          let lineStr = '';
          let prev = null;
          let pendingSpace = false;

          for (let j = 0; j < lineItems.length; j++) {
              const it = lineItems[j];
              if (!it.str) continue;

              if (it.str.trim() === '') {
                  pendingSpace = true;
                  continue;
              }

              const hasLeadSpace = /^\s/.test(it.str);
              const hasTrailSpace = /\s$/.test(it.str);
              const trimmed = it.str.trim();

              if (!prev) {
                  lineStr = trimmed;
              } else {
                  const gap = it.x - (prev.x + prev.w);
                  const fs = Math.max(it.fs || 9, prev.fs || 9, 7);
                  const prevEndsJoiner = /[ÏÐিেৈŒ্]$/.test(prev.trimmed);
                  const curStartsJoiner = /^[ÎËাীুূৃৗংঃঁ্]/.test(trimmed);

                  if ((prevEndsJoiner || curStartsJoiner) && gap < fs * 0.75) {
                      lineStr += trimmed;
                  } else if (pendingSpace || prev.hasTrailSpace || hasLeadSpace || gap > Math.max(1.85, fs * 0.22)) {
                      lineStr += ' ' + trimmed;
                  } else {
                      lineStr += trimmed;
                  }
              }

              prev = { x: it.x, w: it.w, fs: it.fs, trimmed: trimmed, hasTrailSpace: hasTrailSpace };
              pendingSpace = false;
          }

          if (lineStr.trim() !== '') {
              const needsBijoy = isBijoy || VLF_BIJOY_DETECT_RE.test(lineStr);
              const decoded = needsBijoy ? convertEcBijoyToUnicode(lineStr) : polishBengaliText(lineStr);
              if (decoded) finalLines.push(decoded);
          }
      }

      return finalLines;
  }

  // =========================================================================
  // PDF UPLOAD & SPATIAL MULTI-COLUMN VOTER PARSER
  // =========================================================================
  async function handleVlfPdfFiles(fileList) {
      if (!fileList || fileList.length === 0) return;

      if (!window.pdfjsLib) {
          alert('PDF.js লাইব্রেরি লোড হয়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করে পেজ রিলোড করুন।');
          return;
      }

      const progressWrap = document.getElementById('vlfProgressWrap');
      const progressLabel = document.getElementById('vlfProgressLabel');
      const progressPct = document.getElementById('vlfProgressPct');
      const progressFill = document.getElementById('vlfProgressFill');

      progressWrap.style.display = 'block';

      try {
          for (let fIdx = 0; fIdx < fileList.length; fIdx++) {
              const file = fileList[fIdx];
              const fileId = 'pdf_' + Date.now() + '_' + fIdx;
              const arrayBuffer = await file.arrayBuffer();

              progressLabel.innerText = `"${file.name}" লোড হচ্ছে...`;
              progressPct.innerText = '০%';
              progressFill.style.width = '5%';

              const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
              const numPages = pdfDoc.numPages;

              const fileMeta = {
                  district: '',
                  upazila: '',
                  ward: '',
                  area: '',
                  areaCode: '',
                  publishDate: ''
              };

              let fileVotersCount = 0;

              for (let pNum = 1; pNum <= numPages; pNum++) {
                  const pct = Math.round((pNum / numPages) * 100);
                  progressLabel.innerText = `"${file.name}" — পৃষ্ঠা ${vlfToBanglaNum(pNum)} / ${vlfToBanglaNum(numPages)} (পাওয়া গেছে ${vlfToBanglaNum(vlfState.voters.length)} জন ভোটার)`;
                  progressPct.innerText = vlfToBanglaNum(pct) + '%';
                  progressFill.style.width = pct + '%';

                  const page = await pdfDoc.getPage(pNum);
                  const viewport = page.getViewport({ scale: 1.0 });
                  const textContent = await page.getTextContent();

                  // Filter out rotated watermark items (diagonal "চূড়ান্ত ভোটার তালিকা")
                  const rawItems = [];
                  for (let k = 0; k < textContent.items.length; k++) {
                      const it = textContent.items[k];
                      if (!it.str) continue;
                      const rot1 = Math.abs(it.transform[1]);
                      const rot2 = Math.abs(it.transform[2]);
                      if (rot1 > 0.5 || rot2 > 0.5) continue;
                      rawItems.push({
                          str: it.str,
                          x: it.transform[4],
                          y: it.transform[5],
                          w: it.width || 0,
                          fs: Math.abs(it.transform[0]) || Math.abs(it.transform[3]) || 9.5
                      });
                  }

                  // Detect Bijoy encoding PER PAGE (prevents Page 1 cover from locking inner pages!)
                  const pageSample = rawItems.map(i => i.str).join(' ');
                  const isBijoyPage = VLF_BIJOY_DETECT_RE.test(pageSample);

                  if (pNum === 1) {
                      extractVlfMetaFromPage(rawItems, isBijoyPage, fileMeta);
                  }

                  const pageVoters = extractVotersFromPage(rawItems, isBijoyPage, viewport.width, viewport.height, pNum, fileId, file.name, fileMeta);

                  if (pNum === 2) {
                      extractVlfHeaderMeta(rawItems, isBijoyPage, viewport.height, fileMeta);
                  }

                  if (pageVoters.length > 0) {
                      for (let k = 0; k < pageVoters.length; k++) {
                          vlfState.voters.push(pageVoters[k]);
                      }
                      fileVotersCount += pageVoters.length;
                  }

                  if (pNum % 3 === 0) {
                      await new Promise(r => setTimeout(r, 0));
                  }
              }

              vlfState.files.push({
                  id: fileId,
                  name: file.name,
                  pdfDoc: pdfDoc,
                  numPages: numPages,
                  meta: fileMeta,
                  votersCount: fileVotersCount
              });
          }

          updateVlfUIAfterLoad();
      } catch (err) {
          console.error(err);
          alert('PDF ফাইল পড়তে সমস্যা হয়েছে: ' + (err.message || 'অজানা ত্রুটি'));
      } finally {
          progressWrap.style.display = 'none';
          document.getElementById('vlfPdfInput').value = '';
      }
  }

  function extractVlfMetaFromPage(rawItems, isBijoy, meta) {
      const lines = reconstructLinesFromRawItems(rawItems, isBijoy);
      const text = lines.join('\n');

      const distM = text.match(/জেলা\s*[:ঃ]?\s*([^\n]+)/);
      if (distM && !meta.district) meta.district = distM[1].trim();

      const upaM = text.match(/উপজেলা\/থানা\s*[:ঃ]?\s*([^\n]+?)(?=\s+সিটি|\n|$)/);
      if (upaM && !meta.upazila) meta.upazila = upaM[1].trim();

      const wardM = text.match(/(ওয়ার্ড\s*নং[-\s]*[০-৯0-9]+)/);
      if (wardM && !meta.ward) meta.ward = wardM[1].trim();

      const areaM = text.match(/ভোটার\s*এলাকা(?:র\s*নাম)?\s*[:ঃ]?\s*([^\n]+?)(?=\s+সর্বমোট|\s+ভোটার\s*এলাকার|\n|$)/);
      if (areaM && !meta.area) meta.area = areaM[1].trim();

      const codeM = text.match(/ভোটার\s*এলাকার\s*(?:নম্বর|কোড)\s*[:ঃ]?\s*([০-৯0-9]+)/);
      if (codeM && !meta.areaCode) meta.areaCode = codeM[1].trim();
  }

  function extractVlfHeaderMeta(rawItems, isBijoy, pageH, meta) {
      const topItems = rawItems.filter(it => it.y > pageH * 0.78);
      const text = reconstructLinesFromRawItems(topItems, isBijoy).join(' ');

      const distM = text.match(/জেলা\s*[:ঃ]\s*(\S+)/);
      if (distM && !meta.district) meta.district = distM[1].trim();

      const upaM = text.match(/উপজেলা(?:\/থানা)?\s*[:ঃ]\s*(\S+)/);
      if (upaM && !meta.upazila) meta.upazila = upaM[1].trim();

      const wardM = text.match(/ইউনিয়ন(?:\/ওয়ার্ড\/ক্যাঃ\s*বোঃ)?\s*[:ঃ]\s*([^\n]+?)(?=\s+ডাকঘর|\s+ভোটার|$)/);
      if (wardM && !meta.ward) meta.ward = wardM[1].trim();

      const areaM = text.match(/ভোটার\s*এলাকার\s*নাম\s*[:ঃ]\s*([^\n]+?)(?=\s+ভোটার\s*এলাকার\s*নম্বর|$)/);
      if (areaM && !meta.area) meta.area = areaM[1].trim();

      const codeM = text.match(/ভোটার\s*এলাকার\s*(?:নম্বর|কোড)\s*[:ঃ]\s*([০-৯0-9]+)/);
      if (codeM && !meta.areaCode) meta.areaCode = codeM[1].trim();
  }

  // Bulletproof Spatial Multi-Column Voter Box Extractor
  function extractVotersFromPage(rawItems, isBijoy, pageW, pageH, pageNum, fileId, fileName, fileMeta) {
      // Detect voter-grid anchors even if serial & dot were split into separate items
      const serialItems = rawItems.filter(it => /^\s*[০-৯0-9]{3,5}\.?/.test(it.str));
      const vnoItems = rawItems.filter(it => /(?:ভোটার|Ïভাটার)\s*নং/.test(it.str));
      if (serialItems.length === 0 && vnoItems.length === 0) return [];

      // Determine grid top Y safely (never clips Row 1!)
      let maxGridY = 0;
      serialItems.forEach(it => { if (it.y > maxGridY) maxGridY = it.y; });
      vnoItems.forEach(it => { if (it.y + 24 > maxGridY) maxGridY = it.y + 24; });

      // Use abundant left-aligned field labels to lock exact column left edges
      const leftAnchorItems = rawItems.filter(it =>
          /(?:ভোটার|Ïভাটার)\s*নং|(?:পিতা|িপতা)\s*[:ঃ]|মাতা\s*[:ঃ]|(?:ঠিকানা|িঠকানা)\s*[:ঃ]/.test(it.str)
      );

      let colStarts = [];
      if (leftAnchorItems.length > 0) {
          const xs = leftAnchorItems.map(it => it.x).sort((a, b) => a - b);
          const clusters = [];
          xs.forEach(x => {
              const found = clusters.find(c => Math.abs(c.avg - x) < pageW * 0.08);
              if (found) {
                  found.sum += x;
                  found.cnt++;
                  found.avg = found.sum / found.cnt;
              } else {
                  clusters.push({ sum: x, cnt: 1, avg: x });
              }
          });
          const strong = clusters.filter(c => c.cnt >= 2).sort((a, b) => a.avg - b.avg);
          colStarts = (strong.length >= 2 ? strong : clusters.sort((a, b) => a.avg - b.avg)).map(c => c.avg);
      }

      if (colStarts.length < 2) {
          colStarts = [pageW * 0.08, pageW * 0.36, pageW * 0.64];
      }

      const boundaries = [];
      for (let i = 1; i < colStarts.length; i++) {
          boundaries.push(colStarts[i] - 12);
      }

      const gridItems = rawItems.filter(it => {
          if (it.y > maxGridY + 14) return false;
          if (it.y < 32 && (/^\s*[০-৯0-9]{1,3}\s*$/.test(it.str) || /অিফসার|অফিসার/.test(it.str))) return false;
          return true;
      });

      const numCols = boundaries.length + 1;
      const colBuckets = Array.from({ length: numCols }, () => []);
      gridItems.forEach(it => {
          let colIdx = 0;
          for (let b = 0; b < boundaries.length; b++) {
              if (it.x >= boundaries[b]) colIdx = b + 1;
          }
          colBuckets[colIdx].push(it);
      });

      const parsedVoters = [];

      colBuckets.forEach(colItems => {
          const lines = reconstructLinesFromRawItems(colItems, isBijoy);
          const blocks = [];
          let currentBlock = null;

          lines.forEach(line => {
              if (/^রেজিস্ট্রেশন\s*অফিসার/.test(line) || /^[০-৯0-9]{1,3}$/.test(line)) return;

              if (/^[০-৯0-9]{3,5}\s*\./.test(line)) {
                  if (currentBlock) blocks.push(currentBlock);
                  currentBlock = [line];
              } else if (currentBlock) {
                  currentBlock.push(line);
              }
          });
          if (currentBlock) blocks.push(currentBlock);

          blocks.forEach(blockLines => {
              const voter = parseSingleVoterBlock(blockLines, pageNum, fileId, fileName, fileMeta);
              if (voter) parsedVoters.push(voter);
          });
      });

      parsedVoters.sort((a, b) => a.serialNum - b.serialNum);
      return parsedVoters;
  }

  // Parse one voter cell's clean Unicode lines into structured object with 3-tier search indexes
  function parseSingleVoterBlock(lines, pageNum, fileId, fileName, fileMeta) {
      const fullText = lines.join('\n').replace(/রেজিস্ট্রেশন\s*অফিসার.*$/g, '').trim();
      const serialMatch = fullText.match(/^([০-৯0-9]{3,5})\s*\./);
      if (!serialMatch) return null;

      const serial = serialMatch[1];
      const serialNum = parseInt(vlfToEnglishNum(serial), 10) || 0;

      // Migrated voter entry
      if (/মাইগ্রেট/.test(fullText) && !/ভোটার\s*নং/.test(fullText)) {
          const migratedObj = {
              id: fileId + '_' + pageNum + '_' + serial,
              fileId: fileId,
              fileName: fileName,
              pageNum: pageNum,
              serial: serial,
              serialNum: serialNum,
              migrated: true,
              name: 'মাইগ্রেট হয়েছে',
              voterNo: '-',
              father: '-',
              mother: '-',
              profession: '-',
              dob: '-',
              address: '-',
              meta: fileMeta
          };
          buildVlfVoterIndexes(migratedObj, fullText);
          return migratedObj;
      }

      const flat = lines.join(' \n ');
      const extract = (re) => {
          const m = flat.match(re);
          return m ? polishBengaliText(m[1]) : '';
      };

      let name = extract(/নাম\s*[:ঃ]\s*([^\n]+?)(?=\s*\n|\s*ভোটার\s*নং|$)/);
      // Fallback if "নাম:" had an unusual symbol
      if (!name) {
          const firstLine = lines[0] || '';
          const fallbackName = firstLine.replace(/^[০-৯0-9]{3,5}\s*\.\s*(?:নাম\s*[:ঃ]?\s*)?/, '').trim();
          if (fallbackName && !/ভোটার\s*নং/.test(fallbackName)) name = polishBengaliText(fallbackName);
      }

      const voterNo = extract(/ভোটার\s*নং\s*[:ঃ]?\s*([০-৯0-9]+)/);
      const father = extract(/পিতা\s*[:ঃ]\s*([^\n]+?)(?=\s*\n|\s*মাতা\s*[:ঃ]|$)/);
      const mother = extract(/মাতা\s*[:ঃ]\s*([^\n]+?)(?=\s*\n|\s*পেশা\s*[:ঃ]|$)/);
      const profession = extract(/পেশা\s*[:ঃ]\s*([^,\n]+?)(?=,|\s*জন্ম\s*তারিখ|\s*\n|$)/);
      const dob = extract(/জন্ম\s*তারিখ\s*[:ঃ]?\s*([০-৯0-9\/\-\.]+)/);

      let address = '';
      const addrIdx = fullText.search(/ঠিকানা\s*[:ঃ]/);
      if (addrIdx !== -1) {
          address = polishBengaliText(
              fullText.slice(addrIdx).replace(/^ঠিকানা\s*[:ঃ]\s*/, '').replace(/\n+/g, ' ')
          );
      }

      if (!name && !voterNo) return null;

      const voter = {
          id: fileId + '_' + pageNum + '_' + serial,
          fileId: fileId,
          fileName: fileName,
          pageNum: pageNum,
          serial: serial,
          serialNum: serialNum,
          migrated: false,
          name: name || '-',
          voterNo: voterNo || '-',
          father: father || '-',
          mother: mother || '-',
          profession: profession || '-',
          dob: dob || '-',
          address: address || '-',
          meta: fileMeta
      };

      buildVlfVoterIndexes(voter, fullText);
      return voter;
  }

  // Pre-compute Multi-Tier Search Indexes (Normalized + Spaceless + Phonetic)
  function buildVlfVoterIndexes(voter, rawFullText) {
      const fields = {
          name: voter.name,
          voterNo: voter.voterNo,
          serial: voter.serial,
          father: voter.father,
          mother: voter.mother,
          dob: voter.dob,
          address: voter.address,
          profession: voter.profession
      };

      voter.searchFields = {};
      voter.compactFields = {};
      voter.phoneticFields = {};
      voter.phoneticCompactFields = {};

      Object.keys(fields).forEach(k => {
          const norm = vlfNormalizeForSearch(fields[k]);
          const phon = vlfPhoneticKey(fields[k]);
          voter.searchFields[k] = norm;
          voter.compactFields[k] = norm.replace(/\s+/g, '');
          voter.phoneticFields[k] = phon;
          voter.phoneticCompactFields[k] = phon.replace(/\s+/g, '');
      });

      const rawNorm = vlfNormalizeForSearch(rawFullText);
      const rawPhon = vlfPhoneticKey(rawFullText);

      voter.searchAll = Object.values(voter.searchFields).join(' ') + ' ' + rawNorm;
      voter.compactAll = voter.searchAll.replace(/\s+/g, '');
      voter.phoneticAll = Object.values(voter.phoneticFields).join(' ') + ' ' + rawPhon;
      voter.phoneticCompactAll = voter.phoneticAll.replace(/\s+/g, '');
  }

  // Update UI after PDF Parsing
  function updateVlfUIAfterLoad() {
      const dz = document.getElementById('vlfDropZone');
      const loadedBar = document.getElementById('vlfLoadedBar');
      const metaGrid = document.getElementById('vlfMetaGrid');
      const searchPanel = document.getElementById('vlfSearchPanel');
      const resultsScroll = document.getElementById('vlfResultsScroll');

      if (vlfState.files.length === 0) {
          dz.style.display = 'block';
          loadedBar.style.display = 'none';
          metaGrid.style.display = 'none';
          searchPanel.style.display = 'none';
          resultsScroll.style.display = 'none';
          document.getElementById('vlfPagination').style.display = 'none';
          return;
      }

      dz.style.display = 'none';
      loadedBar.style.display = 'flex';
      metaGrid.style.display = 'grid';
      searchPanel.style.display = 'block';
      resultsScroll.style.display = 'block';

      const fileNames = vlfState.files.map(f => `${f.name} (${vlfToBanglaNum(f.numPages)} পৃষ্ঠা)`).join(', ');
      document.getElementById('vlfLoadedFilesText').innerHTML = `<i class='fa-solid fa-circle-check' style='color:#10b981;'></i> <span>${fileNames}</span>`;

      const firstMeta = vlfState.files[0].meta || {};
      const distUpa = [firstMeta.district, firstMeta.upazila].filter(Boolean).join(', ') || 'সনাক্ত হয়নি';
      const wardTxt = firstMeta.ward || '-';
      const areaTxt = firstMeta.area ? (firstMeta.areaCode ? `${firstMeta.area} (${firstMeta.areaCode})` : firstMeta.area) : '-';

      document.getElementById('vlfMetaDist').innerText = distUpa;
      document.getElementById('vlfMetaWard').innerText = wardTxt;
      document.getElementById('vlfMetaArea').innerText = areaTxt;
      document.getElementById('vlfMetaTotal').innerText = vlfToBanglaNum(vlfState.voters.length) + ' জন';

      if (vlfState.voters.length === 0) {
          vlfState.filtered = [];
          document.getElementById('vlfResultsGrid').innerHTML = `
            <div class="vlf-empty-box">
              <i class="fa-solid fa-triangle-exclamation" style="font-size:28px; color:#f59e0b; margin-bottom:8px; display:block;"></i>
              এই PDF ফাইল থেকে কোনো টেক্সট ভোটার ডাটা পাওয়া যায়নি। এটি স্ক্যান করা ইমেজ-ভিত্তিক PDF হতে পারে।
            </div>`;
          document.getElementById('vlfResultSummary').innerHTML = 'মোট ফলাফল: <strong>০ জন</strong>';
          document.getElementById('vlfPagination').style.display = 'none';
          return;
      }

      runVlfFilter();
  }

  // Search Input Handler
  function onVlfSearchChange() {
      const mainVal = document.getElementById('vlfMainSearch').value;
      const subVal = document.getElementById('vlfSubSearch').value;
      document.getElementById('vlfClearMainBtn').style.display = mainVal ? 'flex' : 'none';
      document.getElementById('vlfClearSubBtn').style.display = subVal ? 'flex' : 'none';

      clearTimeout(vlfState.searchTimer);
      vlfState.searchTimer = setTimeout(runVlfFilter, 100);
  }

  function clearVlfSearch(inputId) {
      const el = document.getElementById(inputId);
      if (el) el.value = '';
      onVlfSearchChange();
      if (el) el.focus();
  }

  // Score how well a query matches a voter's target field (0 = no match, higher = better match)
  function scoreVlfQueryMatch(voter, rawQuery, field) {
      if (!rawQuery) return 100;

      const normFull = vlfNormalizeForSearch(rawQuery);
      if (!normFull) return 100;

      const targetNorm = (field === 'all') ? voter.searchAll : (voter.searchFields[field] || '');
      const targetCompact = (field === 'all') ? voter.compactAll : (voter.compactFields[field] || '');
      const targetPhon = (field === 'all') ? voter.phoneticAll : (voter.phoneticFields[field] || '');
      const targetPhonCompact = (field === 'all') ? voter.phoneticCompactAll : (voter.phoneticCompactFields[field] || '');

      const tokens = normFull.split(' ').filter(Boolean);
      const compactQuery = normFull.replace(/\s+/g, '');

      // Tier 1A: Exact phrase or all normalized tokens match
      if (tokens.every(t => targetNorm.includes(t) || (t.length >= 3 && targetCompact.includes(t)))) {
          if (targetNorm.startsWith(normFull)) return 120;
          if (targetNorm.includes(normFull)) return 110;
          return 100;
      }

      // Tier 1B: Spaceless full query match (e.g. "কামরুন্নাহার" <-> "কামরুন নাহার")
      if (compactQuery.length >= 3 && targetCompact.includes(compactQuery)) {
          return 95;
      }

      // Helper to test phonetic match for a token array
      const matchPhoneticTokens = (toks) => {
          const pToks = toks.map(t => vlfPhoneticKey(t)).filter(Boolean);
          if (pToks.length === 0) return false;
          return pToks.every(pt => {
              if (/[০-৯]/.test(pt)) return targetNorm.includes(pt) || targetCompact.includes(pt);
              if (pt.length < 2) return targetNorm.includes(pt);
              return targetPhon.includes(pt) || (pt.length >= 3 && targetPhonCompact.includes(pt));
          });
      };

      // Tier 2A: Phonetic match across all tokens (e.g. "হাসিনা" <-> "হাছিনা", "আয়েশা" <-> "আয়শা")
      const rawTokens = rawQuery.trim().split(/\s+/).filter(Boolean);
      if (matchPhoneticTokens(rawTokens)) {
          return 75;
      }

      // Tier 2B: Spaceless phonetic match (e.g. "নুরজাহান" <-> "নূর জাহান" or "কামরুন নাহার" <-> "কামরুন্নাহার")
      const phonCompactQuery = vlfPhoneticKey(rawQuery).replace(/\s+/g, '');
      if (phonCompactQuery.length >= 3 && !/[০-৯]/.test(phonCompactQuery) && targetPhonCompact.includes(phonCompactQuery)) {
          return 70;
      }

      // Tier 3: Optional Title-Prefix Stripping (e.g. "মোছাঃ নাজমা বেগম" matches "নাজমা বেগম")
      if (tokens.length > 1) {
          const coreTokens = tokens.filter(t => !VLF_OPTIONAL_TITLES.has(t));
          if (coreTokens.length > 0 && coreTokens.length < tokens.length) {
              if (coreTokens.every(t => targetNorm.includes(t) || (t.length >= 3 && targetCompact.includes(t)))) {
                  return 65;
              }
              if (matchPhoneticTokens(coreTokens)) {
                  return 55;
              }
          }
      }

      return 0;
  }

  // Execute Ranked Multi-Tier Search & Filter
  function runVlfFilter() {
      const rawMain = document.getElementById('vlfMainSearch').value.trim();
      const rawSub = document.getElementById('vlfSubSearch').value.trim();
      const field = document.getElementById('vlfFieldFilter').value;

      if (!rawMain && !rawSub) {
          vlfState.filtered = vlfState.voters.slice();
          vlfState.currentPage = 1;
          renderVlfResults(rawMain, rawSub);
          return;
      }

      const scored = [];
      for (let i = 0; i < vlfState.voters.length; i++) {
          const v = vlfState.voters[i];
          const s1 = scoreVlfQueryMatch(v, rawMain, field);
          if (s1 === 0) continue;

          const s2 = rawSub ? scoreVlfQueryMatch(v, rawSub, 'all') : 100;
          if (s2 === 0) continue;

          scored.push({ voter: v, score: s1 + s2 });
      }

      // Sort highest-relevance exact matches to the very top, then preserve serial order
      scored.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.voter.serialNum - b.voter.serialNum;
      });

      vlfState.filtered = scored.map(item => item.voter);
      vlfState.currentPage = 1;
      renderVlfResults(rawMain, rawSub);
  }

  // Highlight Matching Query
  function vlfHighlight(text, q1, q2) {
      if (!text) return '-';
      let safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const terms = [q1, q2]
          .filter(Boolean)
          .join(' ')
          .split(/\s+/)
          .filter(t => t.length >= 2)
          .map(t => vlfToBanglaNum(t));

      if (terms.length === 0) return safe;
      const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const re = new RegExp('(' + escaped.join('|') + ')', 'gi');
      return safe.replace(re, '<span class="vlf-hl">$1</span>');
  }

  // Render Paginated Voter Cards
  function renderVlfResults(rawMain, rawSub) {
      const grid = document.getElementById('vlfResultsGrid');
      const summary = document.getElementById('vlfResultSummary');
      const pag = document.getElementById('vlfPagination');

      if (rawMain === undefined) rawMain = document.getElementById('vlfMainSearch').value.trim();
      if (rawSub === undefined) rawSub = document.getElementById('vlfSubSearch').value.trim();

      const total = vlfState.filtered.length;
      const totalPages = Math.max(1, Math.ceil(total / vlfState.perPage));
      if (vlfState.currentPage > totalPages) vlfState.currentPage = totalPages;

      const startIdx = (vlfState.currentPage - 1) * vlfState.perPage;
      const endIdx = Math.min(total, startIdx + vlfState.perPage);
      const slice = vlfState.filtered.slice(startIdx, endIdx);

      if (total === 0) {
          summary.innerHTML = 'মোট ফলাফল: <strong style="color:#f87171;">০ জন</strong>';
          grid.innerHTML = `
            <div class="vlf-empty-box">
              <i class="fa-solid fa-user-slash" style="font-size:28px; color:#64748b; margin-bottom:8px; display:block;"></i>
              দুঃখিত! আপনার দেওয়া তথ্যের সাথে মিলে এমন কোনো ভোটার পাওয়া যায়নি। নামের একটি অংশ, পিতার নাম বা জন্মসাল দিয়ে চেষ্টা করুন।
            </div>`;
          pag.style.display = 'none';
          return;
      }

      summary.innerHTML = `মোট পাওয়া গেছে: <strong>${vlfToBanglaNum(total)} জন ভোটার</strong> (দেখানো হচ্ছে ${vlfToBanglaNum(startIdx + 1)}–${vlfToBanglaNum(endIdx)})`;

      let html = '';
      slice.forEach((v, idx) => {
          const globalIdx = startIdx + idx;
          if (v.migrated) {
              html += `
                <div class="vlf-voter-card migrated">
                  <div class="vlf-card-top">
                    <span class="vlf-serial-badge" style="background:#d97706;">ক্রমিক: ${v.serial}</span>
                    <span class="vlf-page-badge">পৃষ্ঠা ${vlfToBanglaNum(v.pageNum)}</span>
                  </div>
                  <div class="vlf-voter-name" style="color:#fbbf24;"><i class="fa-solid fa-right-left"></i> মাইগ্রেট হয়েছে</div>
                  <div class="vlf-info-line">এই ক্রমিক নম্বরের ভোটার অন্য এলাকায় স্থানান্তরিত হয়েছেন।</div>
                  <div class="vlf-card-actions" style="grid-template-columns:1fr;">
                    <button type="button" class="vlf-act-btn view" onclick="openVlfPageViewer('${v.fileId}', ${v.pageNum}, '${v.serial}')">
                      <i class="fa-solid fa-eye"></i> মূল পেজ দেখুন
                    </button>
                  </div>
                </div>`;
              return;
          }

          html += `
            <div class="vlf-voter-card">
              <div class="vlf-card-top">
                <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
                  <span class="vlf-serial-badge">ক্রমিক: ${vlfHighlight(v.serial, rawMain, rawSub)}</span>
                  <span class="vlf-page-badge">পৃষ্ঠা ${vlfToBanglaNum(v.pageNum)}</span>
                </div>
                <span class="vlf-vno-pill" title="ভোটার নং কপি করতে ক্লিক করুন" onclick="copyVlfText('${v.voterNo}', 'ভোটার নং কপি হয়েছে!')">
                  <i class="fa-regular fa-copy"></i> ${vlfHighlight(v.voterNo, rawMain, rawSub)}
                </span>
              </div>

              <div class="vlf-voter-name">${vlfHighlight(v.name, rawMain, rawSub)}</div>
              <div class="vlf-info-line"><b>পিতা:</b> ${vlfHighlight(v.father, rawMain, rawSub)}</div>
              <div class="vlf-info-line"><b>মাতা:</b> ${vlfHighlight(v.mother, rawMain, rawSub)}</div>
              <div class="vlf-info-line"><b>জন্ম তারিখ:</b> ${vlfHighlight(v.dob, rawMain, rawSub)} &nbsp;|&nbsp; <b>পেশা:</b> ${vlfHighlight(v.profession, rawMain, rawSub)}</div>
              <div class="vlf-info-line"><b>ঠিকানা:</b> ${vlfHighlight(v.address, rawMain, rawSub)}</div>

              <div class="vlf-card-actions">
                <button type="button" class="vlf-act-btn copy" onclick="copyVlfVoterCard(${globalIdx})">
                  <i class="fa-solid fa-copy"></i> কপি করুন
                </button>
                <button type="button" class="vlf-act-btn view" onclick="openVlfPageViewer('${v.fileId}', ${v.pageNum}, '${v.serial}')">
                  <i class="fa-solid fa-eye"></i> মূল পেজ
                </button>
                <button type="button" class="vlf-act-btn print" onclick="printVlfVoterSlip(${globalIdx})">
                  <i class="fa-solid fa-print"></i> স্লিপ প্রিন্ট
                </button>
              </div>
            </div>`;
      });

      grid.innerHTML = html;

      if (totalPages > 1) {
          pag.style.display = 'flex';
          document.getElementById('vlfPageInfo').innerText = `পৃষ্ঠা ${vlfToBanglaNum(vlfState.currentPage)} / ${vlfToBanglaNum(totalPages)}`;
          document.getElementById('vlfPrevPageBtn').disabled = (vlfState.currentPage <= 1);
          document.getElementById('vlfNextPageBtn').disabled = (vlfState.currentPage >= totalPages);
      } else {
          pag.style.display = 'none';
      }
  }

  function changeVlfPage(delta) {
      vlfState.currentPage += delta;
      renderVlfResults();
      const sc = document.getElementById('vlfResultsScroll');
      if (sc) sc.scrollTop = 0;
  }

  // Toast Notification
  let vlfToastTimer = null;
  function showVlfToast(msg) {
      const t = document.getElementById('vlfToast');
      if (!t) return;
      t.innerText = msg;
      t.style.display = 'block';
      clearTimeout(vlfToastTimer);
      vlfToastTimer = setTimeout(() => { t.style.display = 'none'; }, 2200);
  }

  // Copy Helpers
  function copyVlfText(txt, msg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).then(() => showVlfToast(msg || 'কপি করা হয়েছে!'));
      } else {
          const ta = document.createElement('textarea');
          ta.value = txt;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          showVlfToast(msg || 'কপি করা হয়েছে!');
      }
  }

  function copyVlfVoterCard(filteredIdx) {
      const v = vlfState.filtered[filteredIdx];
      if (!v) return;
      const lines = [
          `ক্রমিক নং: ${v.serial} (PDF পৃষ্ঠা: ${vlfToBanglaNum(v.pageNum)})`,
          `নাম: ${v.name}`,
          `ভোটার নং: ${v.voterNo}`,
          `পিতা: ${v.father}`,
          `মাতা: ${v.mother}`,
          `পেশা: ${v.profession}`,
          `জন্ম তারিখ: ${v.dob}`,
          `ঠিকানা: ${v.address}`
      ];
      if (v.meta && v.meta.area) {
          lines.push(`ভোটার এলাকা: ${v.meta.area}${v.meta.areaCode ? ' (' + v.meta.areaCode + ')' : ''}`);
      }
      copyVlfText(lines.join('\n'), 'ভোটারের সম্পূর্ণ তথ্য কপি হয়েছে!');
  }

  // Print Single Voter Slip
  function printVlfVoterSlip(filteredIdx) {
      const v = vlfState.filtered[filteredIdx];
      if (!v) return;
      const meta = v.meta || {};
      const win = window.open('', '_blank', 'width=520,height=650');
      if (!win) {
          alert('পপ-আপ ব্লক করা আছে। প্রিন্ট করার জন্য ব্রাউজারে পপ-আপ অনুমতি দিন।');
          return;
      }
      win.document.write(`
        <!DOCTYPE html>
        <html lang="bn">
        <head>
          <meta charset="UTF-8" />
          <title>ভোটার স্লিপ - ${v.serial}</title>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&display=swap" rel="stylesheet" />
          <style>
            body { font-family: 'Noto Sans Bengali', 'SolaimanLipi', Arial, sans-serif; padding: 20px; color: #000; }
            .slip { border: 2px solid #000; border-radius: 8px; padding: 18px 20px; max-width: 440px; margin: 0 auto; }
            .slip-head { text-align: center; border-bottom: 1.5px dashed #000; padding-bottom: 10px; margin-bottom: 12px; }
            .slip-head h3 { margin: 0 0 4px 0; font-size: 18px; }
            .slip-head p { margin: 0; font-size: 13px; color: #333; }
            table { width: 100%; border-collapse: collapse; font-size: 14px; }
            td { padding: 5px 4px; vertical-align: top; border-bottom: 1px dotted #aaa; }
            td.lbl { font-weight: bold; width: 38%; }
            .foot { margin-top: 14px; font-size: 12px; text-align: center; color: #444; }
          </style>
        </head>
        <body>
          <div class="slip">
            <div class="slip-head">
              <h3>ভোটার তথ্য স্লিপ</h3>
              <p>${meta.district ? 'জেলা: ' + meta.district : ''} ${meta.upazila ? '| উপজেলা/থানা: ' + meta.upazila : ''}</p>
              <p>${meta.ward ? meta.ward : ''} ${meta.area ? '| এলাকা: ' + meta.area + (meta.areaCode ? ' (' + meta.areaCode + ')' : '') : ''}</p>
            </div>
            <table>
              <tr><td class="lbl">ক্রমিক নং:</td><td><b>${v.serial}</b> (পৃষ্ঠা: ${vlfToBanglaNum(v.pageNum)})</td></tr>
              <tr><td class="lbl">ভোটার নং:</td><td><b>${v.voterNo}</b></td></tr>
              <tr><td class="lbl">নাম:</td><td><b>${v.name}</b></td></tr>
              <tr><td class="lbl">পিতা:</td><td>${v.father}</td></tr>
              <tr><td class="lbl">মাতা:</td><td>${v.mother}</td></tr>
              <tr><td class="lbl">জন্ম তারিখ:</td><td>${v.dob}</td></tr>
              <tr><td class="lbl">পেশা:</td><td>${v.profession}</td></tr>
              <tr><td class="lbl">ঠিকানা:</td><td>${v.address}</td></tr>
            </table>
            <div class="foot">বাংলাদেশ নির্বাচন কমিশন ভোটার তালিকা থেকে সংগৃহীত</div>
          </div>
          <script>window.onload = function(){ window.print(); };<\/script>
        </body>
        </html>
      `);
      win.document.close();
  }

  // Original PDF Page Viewer (Canvas Renderer with Zoom)
  async function openVlfPageViewer(fileId, pageNum, serial) {
      const fileObj = vlfState.files.find(f => f.id === fileId);
      if (!fileObj || !fileObj.pdfDoc) return;

      vlfState.pvFileId = fileId;
      vlfState.pvPageNum = pageNum;
      vlfState.pvScale = window.innerWidth < 600 ? 1.0 : 1.5;

      document.getElementById('vlfPvTitle').innerText = `অরিজিনাল PDF পৃষ্ঠা ${vlfToBanglaNum(pageNum)} (ক্রমিক: ${serial})`;
      document.getElementById('vlfPageViewerOverlay').style.display = 'flex';
      await renderVlfPdfCanvas();
  }

  async function renderVlfPdfCanvas() {
      const fileObj = vlfState.files.find(f => f.id === vlfState.pvFileId);
      if (!fileObj || !fileObj.pdfDoc) return;

      document.getElementById('vlfPvZoomText').innerText = vlfToBanglaNum(Math.round(vlfState.pvScale * 100)) + '%';

      const page = await fileObj.pdfDoc.getPage(vlfState.pvPageNum);
      const viewport = page.getViewport({ scale: vlfState.pvScale });
      const canvas = document.getElementById('vlfPdfCanvas');
      const ctx = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport: viewport }).promise;
  }

  function zoomVlfPdfPage(delta) {
      vlfState.pvScale = Math.min(3.0, Math.max(0.5, vlfState.pvScale + delta));
      renderVlfPdfCanvas();
  }

  function closeVlfPageViewer() {
      const ov = document.getElementById('vlfPageViewerOverlay');
      if (ov) ov.style.display = 'none';
  }

  // Export Filtered Results to UTF-8 CSV (Excel Compatible with BOM)
  function exportVlfCsv() {
      if (!vlfState.filtered || vlfState.filtered.length === 0) {
          showVlfToast('ডাউনলোড করার মতো কোনো তথ্য নেই!');
          return;
      }
      const esc = (val) => '"' + (val || '').toString().replace(/"/g, '""') + '"';
      const rows = [
          ['ক্রমিক নং', 'ভোটার নং', 'নাম', 'পিতা', 'মাতা', 'পেশা', 'জন্ম তারিখ', 'ঠিকানা', 'পৃষ্ঠা নং'].map(esc).join(',')
      ];
      vlfState.filtered.forEach(v => {
          rows.push([v.serial, v.voterNo, v.name, v.father, v.mother, v.profession, v.dob, v.address, vlfToBanglaNum(v.pageNum)].map(esc).join(','));
      });

      const blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'voter_list_filtered.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showVlfToast('CSV ফাইল ডাউনলোড হয়েছে!');
  }

  // Clear All Loaded PDFs & Reset Tool
  function clearVlfAllData() {
      vlfState.files = [];
      vlfState.voters = [];
      vlfState.filtered = [];
      vlfState.currentPage = 1;
      document.getElementById('vlfMainSearch').value = '';
      document.getElementById('vlfSubSearch').value = '';
      document.getElementById('vlfFieldFilter').selectedIndex = 0;
      document.getElementById('vlfClearMainBtn').style.display = 'none';
      document.getElementById('vlfClearSubBtn').style.display = 'none';
      document.getElementById('vlfResultsGrid').innerHTML = '';
      updateVlfUIAfterLoad();
  }
