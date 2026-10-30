// বাংলা ফন্ট কনভার্টার মোডাল অ্যাক্টিভেশন
  function openFontConverterModal() {
      setActiveMode('mode-font-converter'); // বাটন হাইলাইট করবে
      const modal = document.getElementById('fontConverterModal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে [1.1.2]
          updateWordCharCounts(); // ওয়ার্ড কাউন্টার রিফ্রেশ করবে
      }
  }

  function closeFontConverterModal() {
      const modal = document.getElementById('fontConverterModal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল সচল হবে [1.1.2]
      }
  }

  // ====================================================================
  // UNICODE <-> BIJOY ANSI CONVERSION TABLES
  // ====================================================================
  const u2bMap = {
      "অ": "A", "আ": "Av", "ই": "B", "ঈ": "C", "উ": "D", "ঊ": "E", "ঋ": "F", "এ": "G", "ঐ": "H", "ও": "I", "ঔ": "J",
      "ক": "K", "খ": "L", "গ": "M", "ঘ": "N", "ঙ": "O", "চ": "P", "ছ": "Q", "জ": "R", "ঝ": "S", "ঞ": "T",
      "ট": "U", "ঠ": "V", "ড": "W", "ঢ": "X", "ণ": "Y", "ত": "Z", "থ": "_", "দ": "`", "ধ": "a", "ন": "b",
      "প": "c", "ফ": "d", "ব": "e", "ভ": "f", "ম": "g", "য": "h", "র": "i", "ল": "j", "শ": "k", "ষ": "l",
      "স": "m", "হ": "n", "ড়": "o", "ঢ়": "p", "য়": "q", "ৎ": "r", "ং": "s", "ঃ": "t", "ঁ": "u", "ৰ": "v", "ড়": "o", "ঢ়": "p", "য়": "q",
      "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9", "৳": "৳",
      "া": "v", "ি": "w", "ী": "x", "ু": "y", "ূ": "~", "ৃ": "„", "ে": "‡", "ৈ": "‰", "ো": "‡v", "ৌ": "‡Š", "ৗ": "Š", "্": "&",
      "্র": "ª", "্য": "¨", "র্": "©", "।": "|", "॥": "\\", "‘": "Ô", "’": "Õ", "“": "Ò", "”": "Ó",
      "ক্ক": "°", "ক্ট": "±", "ক্ত": "³", "ক্ব": "K¡", "ক্র": "µ", "ক্লি": "wK¬", "ক্ল": "K¬", "ক্ষ": "¶", "ক্স": "·", "খ্র": "Lª",
      "গ্ধ": "»", "গ্ন": "Mœ", "গ্ম": "M¥", "গ্র": "MÖ", "গ্ল": "Mø", "ঙ্ক": "¼", "ঙ্খ": "•L", "ঙ্গ": "½", "ঙ্ঘ": "•N", "চ্চ": "”P",
      "চ্ছ": "”Q", "জ্জ": "¾", "জ্ঝ": "À", "জ্ঞ": "Á", "জ্ব": "R¡", "জ্র": "Rª", "ঞ্চ": "Â", "ঞ্ছ": "Ã", "ঞ্জ": "Ä", "ঞ্ঝ": "Å",
      "ট্ট": "Æ", "ট্ব": "U¡", "ট্ম": "U¥", "ট্র": "Uª", "ড্ড": "Ç", "ড্র": "Wª", "ঢ্র": "Xª", "ণ্ট": "È", "ণ্ঠ": "É", "ণ্ড": "Ð",
      "ণ্ণ": "Yœ", "ত্ত": "Ë", "ত্থ": "Ì", "ত্ন": "Zœ", "ত্ম": "Z¥", "ত্র": "Î", "ত্ব": "Z¡", "দ্দ": "Ï", "দ্ধ": "×", "দ্ব": "Ø",
      "দ্ভ": "™¢", "দ্ম": "Ù", "দ্র": "`ª", "ধ্ব": "aŸ", "ধ্ম": "a¥", "ন্ত": "šÍ", "ন্থ": "š’", "ন্দ": "›`", "ন্ধ": "Ü", "ন্ন": "bœ",
      "ন্ম": "b¥", "ন্ব": "š^", "প্ট": "Þ", "প্ত": "ß", "প্ন": "cœ", "প্প": "à", "প্র": "cÖ", "প্ল": "cø", "প্স": "á", "ফ্র": "d«",
      "ফ্ল": "d¬", "ব্জ": "â", "ব্দ": "ã", "ব্ধ": "ä", "ব্ব": "eŸ", "ব্র": "eª", "ব্ল": "eø", "ভ্র": "å", "ম্ন": "gœ", "ম্ফ": "ç",
      "ম্ব": "¤^", "ম্ভ": "¤¢", "ম্ম": "¤§", "ম্র": "gª", "ম্ল": "¤ø", "ল্ক": "é", "ল্গ": "ê", "ল্ট": "ë", "ল্ড": "ì", "ল্প": "í",
      "ল্ব": "j¦", "ল্ম": "j¥", "ল্ল": "jø", "শ্চ": "ð", "শ্ন": "kœ", "শ্ব": "k¦", "শ্ম": "k¥", "শ্ল": "kø", "ষ্ক": "®‹", "ষ্ট": "ó",
      "ষ্ঠ": "ô", "ষ্ণ": "ò", "ষ্প": "®ú", "ষ্ফ": "õ", "ষ্ম": "®§", "স্ক": "¯‹", "স্খ": "ö", "স্ট": "÷", "স্ত": "¯Í", "স্থ": "¯’",
      "স্ন": "mœ", "স্প": "¯ú", "স্ফ": "ù", "স্ব": "¯^", "স্ম": "¯§", "স্ল": "¯ø", "হ্ণ": "nè", "হ্ন": "ý", "হ্ম": "þ", "হ্ল": "n¬",
      "হু": "û", "হৃ": "ü", "গু": "¸", "শু": "ï", "ক্ত্র": "³ª", "ক্ন": "Kè", "ক্ষ্ণ": "òœ", "ক্ষ্ম": "²", "ক্ষ্র": "ÿ«", "গ্ব": "M&e",
      "ঘ্ন": "Nœ", "ঘ্র": "Nª", "ঙ্গু": "½y", "জ্জ্ব": "¾¡", "ত্ত্ব": "Ë¡", "ত্রু": "Îæ", "দ্রু": "`ªæ", "ভ্রু": "åæ", "শ্রু": "kÖæ",
      "ম্প": "¤ú", "র‌্য": "i¨", "ক্য": "K¨", "দ্য": "`¨", "ভ্য": "f¨", "ল্য": "j¨", "ম্য": "g¨", "ন্যা": "b¨v", "ন্য": "b¨", "ণ্য": "Y¨"
  };

  const b2uMap = {
      "Av": "আ", "A": "অ", "B": "ই", "C": "ঈ", "D": "উ", "E": "ঊ", "F": "ঋ", "G": "এ", "H": "ঐ", "I": "ও", "J": "ঔ",
      "‡": "ে", "‰": "ৈ", "K": "ক", "L": "খ", "M": "গ", "N": "ঘ", "O": "ঙ", "P": "চ", "Q": "ছ", "R": "জ", "S": "ঝ", "T": "ঞ",
      "U": "ট", "V": "ঠ", "W": "ড", "X": "ঢ", "Y": "ণ", "Z": "ত", "_": "থ", "`": "দ", "a": "ধ", "b": "ন",
      "c": "প", "d": "ফ", "e": "ব", "f": "ভ", "g": "ম", "h": "য", "i": "র", "j": "ল", "k": "শ", "l": "ষ",
      "m": "স", "n": "হ", "o": "ড়", "p": "ঢ়", "q": "য়", "r": "ৎ", "s": "ং", "t": "ঃ", "u": "ঁ", "v": "া",
      "w": "ি", "x": "ী", "y": "ু", "~": "ূ", "„": "ৃ", "‡v": "ো", "‡Š": "ৌ",
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
      "°": "ক্ক", "±": "ক্ট", "³": "ক্ত", "K¡": "ক্ব", "µ": "ক্র", "wK¬": "ক্লি", "K¬": "ক্ল", "¶": "ক্ষ", "·": "ক্স", "Lª": "খ্র",
      "»": "গ্ধ", "Mœ": "গ্ন", "M¥": "গ্ম", "MÖ": "গ্র", "Mø": "গ্ল", "¼": "ঙ্ক", "•L": "ঙ্খ", "½": "ঙ্গ", "•N": "ঙ্ঘ", "”P": "চ্চ",
      "”Q": "চ্ছ", "¾": "জ্জ", "À": "জ্ঝ", "Á": "জ্ঞ", "R¡": "জ্ব", "Rª": "জ্র", "Â": "ঞ্চ", "Ã": "ঞ্ছ", "Ä": "ঞ্জ", "Å": "ঞ্ঝ",
      "Æ": "ট্ট", "U¡": "ট্ব", "U¥": "ট্ম", "Uª": "ট্র", "Ç": "ড্ড", "Wª": "ড্র", "Xª": "ঢ্র", "È": "ণ্ট", "É": "ণ্ঠ", "Ð": "ণ্ড",
      "Yœ": "ণ্ণ", "Ë": "ত্ত", "Ì": "ত্থ", "Zœ": "ত্ন", "Z¥": "ত্ম", "Î": "ত্র", "Z¡": "ত্ব", "Ï": "দ্দ", "×": "দ্ধ", "Ø": "দ্ব",
      "™¢": "দ্ভ", "Ù": "দ্ম", "`ª": "দ্র", "aŸ": "ধ্ব", "a¥": "ধ্ম", "šÍ": "ন্ত", "š’": "ন্থ", "›`": "ন্দ", "Ü": "ন্ধ", "bœ": "ন্ন",
      "b¥": "ন্ম", "š^": "ন্ব", "Þ": "প্ট", "ß": "প্ত", "cœ": "প্ন", "à": "প্প", "cÖ": "প্র", "cø": "প্ল", "á": "প্স", "d«": "ফ্র",
      "d¬": "ফ্ল", "â": "ব্জ", "ã": "ব্দ", "ä": "ব্ধ", "eŸ": "ব্ব", "eª": "ব্র", "eø": "ব্ল", "å": "ভ্র", "gœ": "ম্ন", "ç": "ম্ফ",
      "¤^": "ম্ব", "¤¢": "ম্ভ", "¤§": "ম্ম", "gª": "ম্র", "¤ø": "ম্ল", "é": "ল্ক", "ê": "ল্গ", "ë": "ল্ট", "ì": "ল্ড", "í": "ল্প",
      "j¦": "ল্ব", "j¥": "ল্ম", "jø": "ল্ল", "ð": "শ্চ", "kœ": "শ্ন", "k¦": "শ্ব", "k¥": "শ্ম", "kø": "শ্ল", "®‹": "ষ্ক", "ó": "ষ্ট",
      "ô": "ষ্ঠ", "ò": "ষ্ণ", "®ú": "ষ্প", "õ": "ষ্ফ", "®§": "ষ্ম", "¯‹": "স্ক", "ö": "স্খ", "÷": "স্ট", "¯Í": "স্ত", "¯’": "স্থ",
      "mœ": "স্ন", "¯ú": "স্প", "ù": "স্ফ", "¯^": "স্ব", "¯§": "স্ম", "¯ø": "স্ল", "nè": "হ্ণ", "ý": "হ্ন", "þ": "হ্ম", "n¬": "হ্ল",
      "û": "হু", "ü": "হৃ", "¸": "গু", "ï": "শু", "³ª": "ক্ত্র", "Kè": "ক্ন", "òœ": "ক্ষ্ণ", "²": "ক্ষ্ম", "ÿ«": "ক্ষ্র", "M&e": "গ্ব",
      "Nœ": "ঘ্ন", "Nª": "ঘ্র", "½y": "ঙ্গু", "¾¡": "জ্জ্ব", "Ë¡": "ত্ত্ব", "Îæ": "ত্রু", "`ªæ": "দ্রু", "åæ": "ভ্রু", "kÖæ": "শ্রু",
      "¤ú": "ম্প", "i¨": "র‌্য", "K¨": "ক্য", "`¨": "দ্য", "f¨": "ভ্য", "j¨": "ল্য", "g¨": "ম্য", "b¨": "ন্য", "Y¨": "ণ্য",
      "ª": "্র", "¨": "্য", "©": "র্", "|": "।", "\\": "॥", "Ô": "‘", "Õ": "’", "Ò": "“", "Ó": "”", "&": "্"
  };

  const manualAnsiFixMap = { "GZ‡": "G‡Z", "‡ga¨": "g‡a¨", "P&P": "”P" };

  // ====================================================================
  // CONVERSION ALGORITHMS
  // ====================================================================

  // ১. ইউনিকোড থেকে বিজয় আন্সি কনভার্সন ইঞ্জিন
  function processUnicodeToBijoyEngine(text) {
      if (!text) return "";
      let str = text;

      // বাংলা ক্যারেক্টার নরমালাইজেশন
      str = str.replace(/য়/g, 'য়').replace(/ড়/g, 'ড়').replace(/ঢ়/g, 'ঢ়');

      const consonants = 'কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়';
      const conjunctOrConsonant = `(?:(?:[${consonants}]\u09CD)+[${consonants}]|[${consonants}])`;
      
      // ও-কার এবং ঔ-কার স্প্লিটিং (ো -> ে + া, ৌ -> ে + ৗ)
      str = str.replace(new RegExp(`(${conjunctOrConsonant})\u09CB`, 'g'), `$1\u09C7\u09BE`);
      str = str.replace(new RegExp(`(${conjunctOrConsonant})\u09CC`, 'g'), `$1\u09C7\u09D7`);

      // কার-চিহ্ন সমন্বয় (ি, ে, ৈ কারগুলোকে ব্যঞ্জনবর্ণের পূর্বে নিয়ে আসবে)
      const preVowels = '[\u09BF\u09C7\u09C8]';
      const reph = '\u09B0\u09CD';
      const phala = '(?:\u09CD\u09AF|\u09CD\u09B0)';
      
      const preKarRegex = new RegExp(`(${reph})?(${conjunctOrConsonant})(${phala})?(${preVowels})`, 'g');
      str = str.replace(preKarRegex, '$4$1$2$3');

      // আন্সি ক্যারেক্টার ম্যাপিং (দীর্ঘতম স্ট্রিং আগে প্রসেস হবে)
      const sortedKeys = Object.keys(u2bMap).sort((a, b) => b.length - a.length);
      let result = '';
      let i = 0;
      while (i < str.length) {
          let match = false;
          // রেফ চেক (র্)
          if (str.substring(i, i + 2) === '\u09B0\u09CD') {
              for (let key of sortedKeys) {
                  if (key.length > 0 && str.substring(i + 2, i + 2 + key.length) === key) {
                      result += u2bMap[key] + '©';
                      i += 2 + key.length;
                      match = true;
                      break;
                  }
              }
          }
          if (!match) {
              for (let key of sortedKeys) {
                  if (key.length > 0 && str.substring(i, i + key.length) === key) {
                      result += u2bMap[key];
                      i += key.length;
                      match = true;
                      break;
                  }
              }
          }
          if (!match) {
              result += str[i];
              i++;
          }
      }

      // শুরুর ইনলাইন সাইন অ্যাডজাস্টমেন্ট
      result = result.replace(/^‡/gm, '†').replace(/\|‡/g, '|†').replace(/^‰/gm, 'ˆ').replace(/\|‰/g, '|ˆ');
      return result;
  }

  // ২. বিজয় আন্সি থেকে ইউনিকোড কনভার্সন ইঞ্জিন
  function processBijoyToUnicodeEngine(text) {
      if (!text) return "";
      let str = text;

      // আন্সি গ্লিফ থেকে ইউনিকোড রূপান্তর
      const sortedKeys = Object.keys(b2uMap).sort((a, b) => b.length - a.length);
      let result = '';
      let i = 0;
      while (i < str.length) {
          let match = false;
          for (let key of sortedKeys) {
              if (str.substring(i, i + key.length) === key) {
                  result += b2uMap[key];
                  i += key.length;
                  match = true;
                  break;
              }
          }
          if (!match) {
              result += str[i];
              i++;
          }
      }

      // রেফ সমন্বয় (© -> র্ ব্যঞ্জনবর্ণের পূর্বে)
      const consonants = '\\u0995-\\u09B9\\u09DC-\\u09DF';
      const hasanta = '\\u09CD';
      const reph = '\\u09B0' + hasanta;
      const vowelSigns = '[\\u09BE-\\u09C4\\u09C7-\\u09C8\\u09CB-\\u09CC\\u09D7]';
      const cluster = `(?:[${consonants}](?:${hasanta}[${consonants}])*)`;
      const fullCluster = `(${cluster}(?:${vowelSigns})?)`;
      
      result = result.replace(new RegExp(`${fullCluster}(${reph})`, 'g'), '$2$1');

      // কার-চিহ্ন সমন্বয় (ি, ে, ৈ কারগুলোকে ব্যঞ্জনবর্ণের পরে নিয়ে আসবে)
      const preVowels = '[\\u09BF\\u09C7\\u09C8]';
      const clusterPattern = `(?:${reph})?(?:[${consonants}](?:${hasanta}[${consonants}])*)`;
      result = result.replace(new RegExp(`(${preVowels})(${clusterPattern})`, 'g'), '$2$1');

      // স্প্লিট কার-চিহ্ন মার্জ করবে (ে + া -> ো, ে + ৗ -> ৌ)
      result = result.replace(/\u09C7\u09BE/g, '\u09CB');
      result = result.replace(/\u09C7\u09D7/g, '\u09CC');

      return result;
  }

  // ====================================================================
  // UI ACTION HANDLERS
  // ====================================================================

  // কাস্টম নোটিফিকেশন মেসেজ অ্যালার্ট
  function showCustomAlert(msg) {
      const statusEl = document.getElementById('fontConverterStatus');
      if (statusEl) {
          statusEl.innerHTML = `<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> ${msg}</span>`;
          setTimeout(() => {
              statusEl.innerText = 'কাজের জন্য প্রস্তুত';
          }, 3000);
      } else {
          alert(msg);
      }
  }

  // ইউনিকোড ➔ বিজয় আন্সি
  function convertUnicodeToBijoyAction() {
      const leftArea = document.getElementById('textAreaLeft');
      const rightArea = document.getElementById('textAreaRight');
      if (!leftArea || !rightArea) return;

      const input = leftArea.value;
      if (!input.trim()) {
          showCustomAlert('কনভার্ট করার জন্য প্রথমে ইউনিকোড বক্সে টেক্সট লিখুন!');
          return;
      }

      rightArea.value = processUnicodeToBijoyEngine(input);
      showCustomAlert('ইউনিকোড থেকে বিজয় আন্সিতে কনভার্ট হয়েছে!');
      updateWordCharCounts();
  }

  // বিজয় আন্সি ➔ ইউনিকোড
  function convertBijoyToUnicodeAction() {
      const leftArea = document.getElementById('textAreaLeft');
      const rightArea = document.getElementById('textAreaRight');
      if (!leftArea || !rightArea) return;

      const input = rightArea.value;
      if (!input.trim()) {
          showCustomAlert('কনভার্ট করার জন্য প্রথমে বিজয় বক্সে টেক্সট লিখুন!');
          return;
      }

      leftArea.value = processBijoyToUnicodeEngine(input);
      showCustomAlert('বিজয় আন্সি থেকে ইউনিকোডে কনভার্ট হয়েছে!');
      updateWordCharCounts();
  }

  // আন্সি টেক্সট ফিক্সার
  function fixAnsiTextAction() {
      const rightArea = document.getElementById('textAreaRight');
      if (!rightArea) return;
      let text = rightArea.value;
      if (!text.trim()) return;

      for (const [wrong, correct] of Object.entries(manualAnsiFixMap)) {
          if (wrong) {
              const regex = new RegExp(wrong.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
              text = text.replace(regex, correct);
          }
      }

      rightArea.value = text;
      showCustomAlert('আন্সি টেক্সট ফিক্স করা হয়েছে!');
      updateWordCharCounts();
  }

  // শব্দ ও অক্ষর গণনা ফাংশন
  function updateWordCharCounts() {
      const leftText = document.getElementById('textAreaLeft').value.trim();
      const rightText = document.getElementById('textAreaRight').value.trim();

      const leftWords = leftText ? leftText.split(/\s+/).length : 0;
      const leftChars = leftText.length;

      const rightWords = rightText ? rightText.split(/\s+/).length : 0;
      const rightChars = rightText.length;

      document.getElementById('leftWordCount').innerText = `শব্দ: ${convertToBanglaNumber(leftWords)}`;
      document.getElementById('leftCharCount').innerText = `অক্ষর: ${convertToBanglaNumber(leftChars)}`;

      document.getElementById('rightWordCount').innerText = `শব্দ: ${convertToBanglaNumber(rightWords)}`;
      document.getElementById('rightCharCount').innerText = `অক্ষর: ${convertToBanglaNumber(rightChars)}`;
  }

  // ইংরেজি সংখ্যাকে বাংলায় রূপান্তর
  function convertToBanglaNumber(n) {
      const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
      return n.toString().replace(/[0-9]/g, function(w) {
          return banglaDigits[w] || w;
      });
  }

  // টেক্সট কপি লজিক
  function copyFcText(elementId) {
      const element = document.getElementById(elementId);
      if (element && element.value.trim() !== '') {
          element.select();
          element.setSelectionRange(0, 99999); // মোবাইল সাপোর্ট
          try {
              document.execCommand('copy');
              showCustomAlert('টেক্সট কপি করা হয়েছে!');
          } catch (err) {
              showCustomAlert('কপি করতে ব্যর্থ হয়েছে। ম্যানুয়ালি কপি করুন।');
          }
      } else {
          showCustomAlert('কপি করার মতো কোনো টেক্সট নেই!');
      }
  }

  // সিঙ্গেল টেক্সট-এরিয়া ক্লিয়ার
  function clearFcText(elementId) {
      const element = document.getElementById(elementId);
      if (element) {
          element.value = '';
          showCustomAlert('টেক্সটবক্স খালি করা হয়েছে!');
          updateWordCharCounts();
      }
  }

  // অল ক্লিয়ার
  function clearAllFcFields() {
      document.getElementById('textAreaLeft').value = '';
      document.getElementById('textAreaRight').value = '';
      showCustomAlert('সব টেক্সটবক্স খালি করা হয়েছে!');
      updateWordCharCounts();
  }
