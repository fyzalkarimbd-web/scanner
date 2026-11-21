// ১. মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক
  function openVoterFinderModal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-voter-finder');
      const modal = document.getElementById('voterFinderModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক [1.1.2]
      }
  }

  function closeVoterFinderModal() {
      const modal = document.getElementById('voterFinderModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল সচল [1.1.2]
      }
  }

  // Configure PDF.js Worker statically via CDN
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  const $ = id => document.getElementById(id);
  const state = { records: [], filtered: [], page: 1, pageSize: 10, fileName: '' };

  const BN = '০১২৩৪৫৬৭৮৯';
  const EN = '0123456789';

  function clean(s) {
    return String(s ?? '').replace(/\s+/g, ' ').trim();
  }

  // যেকোনো সংখ্যাকে ইংরেজি ডিজিটে রূপান্তর (1234567890)
  function asciiDigits(s) {
    return String(s ?? '').replace(/[০-৯]/g, c => EN[BN.indexOf(c)]);
  }

  // যেকোনো সংখ্যাকে বাংলা ডিজিটে রূপান্তর (০১২৩৪৫৬৭৮৯)
  function displayBanglaDigits(s) {
    return String(s ?? '').replace(/[0-9]/g, c => BN[Number(c)]);
  }

  /*
   * Advanced Multi-Pass Bengali Engine & Bijoy/ANSI Font Decoder
   * Fixes broken glyphs (ū -> ন্ন, Ő -> ল্প, Ù -> ক্ষ্ম, ĺ -> আব্দ, ÿ -> ক্র, etc.)
   */
  function normalizeBangla(input) {
    if (input == null) return '';
    let x = clean(input);
    if (!x) return '';

    // ১. অফিশিয়াল বিজয়/সুতন্বী অ্যানসি (ANSI & PUA) ক্যারেক্টার ও যুক্তবর্ণ ম্যাপিং ডিকশনারি [1.1.1]
    const bijoyExtendedMap = [
      ['ū', 'ন্ন'], ['Ő', 'ল্প'], ['Ù', 'ক্ষ্ম'], ['ĺ', 'ব্দ'], ['ÿ', 'ক্র'],
      ['ľ', 'ম্ন'], ['œ', '্ন'], ['×', 'ক্ত'], ['Ĕ', 'ত্র'], ['ñ', 'ন'],
      ['ń', 'ন্'], ['Ş', 'ষ্ট'], ['ĥ', 'হ্ম'], ['Ĵ', 'প্র'], ['Ɓ', 'রু'],
      ['ƀ', 'সু'], ['Œ', 'ন্'], ['Ë', 'ন্ট'], ['Đ', 'ণ্ড'], ['â', 'ঙ্গ'],
      ['µ', '্ম'], ['Í', '্ত'], ['Ì', '্থ'], ['¡', '্ম'], ['¢', '্প'],
      ['£', '্ফ'], ['¤', '্ব'], ['¥', '্য'], ['¦', '্র'], ['§', '্ল'],
      ['¨', '্শ'], ['©', '্ষ'], ['ª', '্স'], ['«', '্হ'], ['Ž', 'ষ'],
      ['å', 'ড়'], ['ė', 'দ'], ['Ň', 'ম'], ['˜', 'হ'], ['Ö', 'জ্ঞ'],
      ['Ü', 'দ্ধ'], ['Ý', 'দ্ব'], ['ā', 'ঙ্গা'], ['Ă', 'ঙ্গ'], ['ă', 'চ্ছ'],
      ['Ą', 'চ্ছ'], ['ą', 'জ্জ'], ['Ć', 'জ্ঞ'], ['ć', 'ঞ্চ'], ['Ĉ', 'ঞ্ছ'],
      ['ĉ', 'ঞ্জ'], ['Ċ', 'ট্ফ'], ['ċ', 'ট্ট'], ['Č', 'ট্ম'], ['č', 'ড্ড'],
      ['Ď', 'ণ্ট'], ['ď', 'ণ্ঠ'], ['đ', 'ণ্ণ'], ['Ē', 'ন্ম'], ['ē', 'ত্ন'],
      ['ĕ', 'ত্ম'], ['Ė', 'ত্ব'], ['Ę', 'দ্ভব'], ['ę', 'দ্ধ'], ['Ě', 'দ্ব'],
      ['ě', 'দ্ভ'], ['Ĝ', 'দ্ম'], ['ĝ', 'ধ্য'], ['Ğ', 'ধ্ন'], ['ğ', 'ন্ট'],
      ['Ġ', 'ন্ঠ'], ['ġ', 'ন্ড'], ['Ģ', 'ন্ত'], ['ģ', 'ন্থ'], ['Ĥ', 'ন্দ'],
      ['Ħ', 'ন্ধ'], ['ħ', 'ন্ন'], ['Ĩ', 'ন্ন'], ['ĩ', 'ন্ম'], ['Ī', 'ন্প'],
      ['ī', 'ন্ফ'], ['Ĭ', 'ন্ম'], ['ĭ', 'ন্ট'], ['Į', 'ন্ঠ'], ['į', 'ন্ড'],
      ['İ', 'ন্ত'], ['ı', 'ন্থ'], ['Ĳ', 'ন্দ'], ['ĳ', 'ন্ধ'], ['ĵ', 'প্ল'],
      ['Ķ', 'ফ্ল'], ['ķ', 'ব্জ'], ['ĸ', 'ব্দ'], ['Ĺ', 'ব্ধ'], ['Ļ', 'ব্ব'],
      ['ļ', 'জ্জ'], ['Ľ', 'ভ্ল'], ['Ŀ', 'ম্প'], ['ŀ', 'ম্ফ'], ['Ł', 'ম্ব'],
      ['ł', 'ম্ভ'], ['Ń', 'ম্ম'], ['Ņ', 'ল্ক'], ['ņ', 'ল্গ'], ['ň', 'ল্ড'],
      ['ŉ', 'ল্প'], ['Ŋ', 'ল্ফ'], ['ŋ', 'ল্ব'], ['Ō', 'ল্ল'], ['ō', 'ল্ল'],
      ['Ŏ', 'শ্চ'], ['ŏ', 'শ্চ'], ['ő', 'ক্ষ'], ['Ŕ', 'শ্ল'], ['ŕ', 'ষ্ক'],
      ['Ŗ', 'ষ্ফ'], ['ŗ', 'ষ্ট'], ['Ř', 'ষ্ঠ'], ['ř', 'ষ্ণ'], ['Ś', 'স্প'],
      ['ś', 'স্ফ'], ['Ŝ', 'স্ক'], ['ŝ', 'স্ক'], ['ş', 'স্থ'], ['Š', 'স্ন'],
      ['š', 'স্প'], ['Ţ', 'স্ফ'], ['ţ', 'স্ব'], ['Ť', 'স্ম'], ['ť', 'স্ল'],
      ['Ŧ', 'হ্ণ'], ['ŧ', 'হ্ন'], ['Ũ', 'হ্ম'], ['ũ', 'হ্ল'], ['Ū', 'হ্ব'],
      ['÷', 'দ্ধ'], ['ø', 'ষ্ক'], ['ù', 'ষ্ঠ'], ['ú', 'ষ্ণ'], ['û', 'ঞ্ছ'],
      ['ü', 'ঞ্জ'], ['ý', 'জ্ঞ'], ['þ', 'ৎ'], ['À', 'ঙ্ক'], ['Á', 'ঙ্খ'],
      ['Â', 'ঙ্গ'], ['Ã', 'চ্ছ'], ['Ä', 'জ্জ'], ['Å', 'ঝ'], ['Æ', 'ঞ্চ'],
      ['Ç', 'ঞ্ছ'], ['È', 'ঞ্জ'], ['É', 'ট্ট'], ['Ê', 'ট্ফ'], ['Ì', '্থ'],
      ['Í', '্ত'], ['Î', 'র্'], ['Ï', 'ে'], ['Ð', 'আ'], ['Ñ', 'ন'],
      ['Ò', 'ন্দ'], ['Ó', 'ন্ধ'], ['Ô', 'ো'], ['Õ', 'ৌ'], ['Ø', 'ধ'],
      ['Ú', 'উ'], ['Û', 'ঊ'], ['Þ', 'শ্র'], ['ß', 'স্ব'], ['à', 'ড়'],
      ['á', 'ঢ়'], ['ã', 'জ্ঞ'], ['ä', 'ঞ্চ'], ['æ', 'চ্ছ'], ['ç', 'ঞ্ছ'],
      ['è', 'ঞ্জ'], ['é', 'ট্ট'], ['ë', 'ন্ট'], ['ì', '্থ'], ['í', '্ত'],
      ['î', 'র্'], ['ï', 'ে'], ['ð', 'দ'], ['ñ', 'ন'], ['ò', 'ন্দ'],
      ['ó', 'ন্ধ'], ['ô', 'ো'], ['õ', 'ৌ']
    ];

    for (const [a, b] of bijoyExtendedMap) x = x.split(a).join(b);

    // ২. কাস্টম বিজয়ী ফন্ট ক্যারেক্টার কারেকশন
    const wordsFix = [
      ['িনবাচন', 'নির্বাচন'], ['িনবÎাচন', 'নির্বাচন'], ['িসিট', 'সিটি'],
      ['কিমশন', 'কমিশন'], ['Ïভাটার', 'ভোটার'], ['েভাটার', 'ভোটার'],
      ['ভাটার', 'ভোটার'], ['Ïজলা', 'জেলা'], ['েজলা', 'জেলা'],
      ['Ïমাছাঃ', 'মোছাঃ'], ['েমাছাঃ', 'মোছাঃ'], ['মাসাঃ', 'মোছাঃ'],
      ['Ïমাঃ', 'মোঃ'], ['েমাঃ', 'মোঃ'], ['Ïপৗরসভা', 'পৌরসভা'],
      ['েপৗরসভা', 'পৌরসভা'], ['উপেজলা', 'উপজেলা'], ['নńর', 'নম্বর'],
      ['ÏপাŞেকাড', 'পোস্টকোড'], ['ÏপাŞ', 'পোস্ট'], ['অûল', 'অঞ্চল'],
      ['চূড়াĢ', 'চূড়ান্ত'], ['চূড়াĢ', 'চূড়ান্ত'], ['সবÎেমাট', 'সর্বমোট'],
      ['মিহলা', 'মহিলা'], ['পুƁষ', 'পুরুষ'], ['Ïভাটার তািলকা', 'ভোটার তালিকা'],
      ['Ĵকােশর', 'প্রকাশের'], ['ওয়াডÎ', 'ওয়ার্ড'], ['ওয়াডÎ', 'ওয়ার্ড'],
      ['ইউিনয়ন', 'ইউনিয়ন'], ['কËাŒটনেমŒট', 'ক্যান্টনমেন্ট'],
      ['িপতা', 'পিতা'], ['িঠকানা', 'ঠিকানা'], ['জĥ তািরখ', 'জন্ম তারিখ'],
      ['Ïপশা', 'পেশা'], ['েপশা', 'পেশা'], ['Ïবগম', 'বেগম'], ['েবগম', 'বেগম'],
      ['Ïগালাপ', 'গোলাপ'], ['Ïগালাপী', 'গোলাপী'], ['Ïবসরকারী', 'বেসরকারী'],
      ['Ïবকার', 'বেকার'], ['Ïরজাউল', 'রেজাউল'], ['Ïমাশারফ', 'মোশারফ'],
      ['Ïমাসেলম', 'মোসলেম'], ['Ïমাকেছদ', 'মোকছেদ'], ['েমাকেছদ', 'মোকছেদ'],
      ['Ïমাকসেদ', 'মোকছেদ'], ['ÏমাজােŇল', 'মোজাম্মেল'], ['Ïমাতােলব', 'মোতালেব'],
      ['Ïহােসন', 'হোসেন'], ['েহােসন', 'হোসেন'], ['Ïহেলûা', 'হেলেঞ্চা'],
      ['Ïফরেদাসী', 'ফেরদৌসী'], ['Ïনছা', 'নেছা'], ['Ïতইমুদীন', 'তাইমুদ্দীন'],
      ['ওেহদা', 'ওহেদা'], ['মুিমর', 'মুমিন'], ['Ïখাজামুদীন', 'খাজামুদ্দীন'],
      ['মŒডল', 'মন্ডল'], ['পĐীতলা', 'পত্নীতলা'], ['নওগঁা', 'নওগাঁ'],
      ['ƀলতানা', 'সুলতানা'], ['ƀĤর', 'সুন্দর'], ['ƁƆল', 'রুহুল'],
      ['ƀমী', 'সুমি'], ['Űিমক', 'শ্রমিক'], ['Řিমক', 'শ্রমিক'],
      ['িশÙক', 'শিক্ষক'], ['দিজÎ', 'দর্জি'], ['বËবসা', 'ব্যবসা'],
      ['িরÔা/ভËান চালক', 'রিকশা/ভ্যান চালক'], ['িদলরুবা', 'দিলরুবা'],
      ['িদদার বyস', 'দিদার বক্স'], ['হািলমা', 'হালিমা'], ['গৃিহনী', 'গৃহিণী'],
      ['মাসুদা আ×ার', 'মাসুদা আক্তার'], ['মােজদা', 'মাজেদা'],
      ['Ïববী', 'বেবী'], ['িবজয় চħ', 'বিজয় চন্দ্র'], ['মায়া রাণী', 'মায়া রাণী'],
      ['সুিমĔা', 'সুমিত্রা'], ['উেপন চħ', 'উপেন চন্দ্র'], ['কপূিল', 'কপূরি'],
      ['Řীষ চħ', 'কৃষ্ণ চন্দ্র'], ['িবমল চħ', 'বিমল চন্দ্র'],
      ['কািলপদ চħ', 'কালিপদ চন্দ্র'], ['Ïশফালী', 'শেফালী'],
      ['অনকুল চħ', 'অনুকুল চন্দ্র'], ['িনভাসী', 'নিবাসী'],
      ['সুেবাধ চħ', 'সুবোধ চন্দ্র'], ['িদপালী', 'দীপালী'],
      ['মনেমাহন চħ', 'মনমোহন চন্দ্র'], ['বাষিরয়া', 'বাশরিয়া'],
      ['পিŔম', 'পশ্চিম']
    ];
    for (const [a, b] of wordsFix) x = x.split(a).join(b);

    // ৩. বিভক্ত কার-চিহ্ন পুনর্মিলন (ে + া = ো, ে + ৗ = ৌ)
    x = x.replace(/\u09C7\u09BE/g, '\u09CB'); 
    x = x.replace(/\u09C7\u09D7/g, '\u09CC'); 

    // ৪. কার-চিহ্ন সমন্বয় ও রেঞ্জ কারেকশন (ি, ে, ৈ কার রি-অর্ডার)
    x = x.replace(/(^|[\s,:;()\[\]\-])([িেৈ])([ক-হড়ঢ়য়])/g, '$1$3$2');
    x = x.replace(/([ক-হড়ঢ়য়][া-ৌৃ])([িেৈ])([ক-হড়ঢ়য়])/g, '$1$3$2');

    // ৫. কাস্টম শব্দের জন্য বানান ও অক্ষর ফিক্স
    const exactVowelFix = [
      ['দলিরুবা', 'দিলরুবা'], ['দদিার', 'দিদার'], ['হালমিা', 'হালিমা'],
      ['গৃহণিী', 'গৃহিণী'], ['বজিয়', 'বিজয়'], ['সুমতি্রা', 'সুমিত্রা'],
      ['কালপিদ', 'কালিপদ'], ['নবিাসী', 'নিবাসী'], ['বাশরয়িা', 'বাশরিয়া'],
      ['পশ্চমি', 'পশ্চিম'], ['পতিা', 'পিতা'], ['মাতা', 'মাতা'],
      ['িঠকানা', 'ঠিকানা'], ['জম্ন', 'জন্ম']
    ];
    for (const [a, b] of exactVowelFix) x = x.split(a).join(b);

    x = x.replace(/চ(?=ন|দ|র)/g, 'চ');
    x = x.replace(/ন্দ্র/g, 'ন্দ্র');

    x = x.replace(/\s*:\s*/g, ': ')
         .replace(/\s*,\s*/g, ', ')
         .replace(/\s{2,}/g, ' ')
         .trim();

    return x;
  }

  function groupRows(items, tolerance = 4) {
    const rows = [];
    const sorted = [...items]
      .filter(i => clean(i.str))
      .sort((a, b) => b.y - a.y || a.x - b.x);

    for (const item of sorted) {
      let row = null;
      for (const candidate of rows) {
        if (Math.abs(candidate.y - item.y) <= tolerance) {
          row = candidate;
          break;
        }
      }
      if (!row) {
        row = { y: item.y, items: [] };
        rows.push(row);
      }
      row.items.push(item);
    }

    rows.sort((a, b) => b.y - a.y);
    for (const row of rows) row.items.sort((a, b) => a.x - b.x);
    return rows;
  }

  function rowText(row) {
    return clean(row.items.map(i => i.str).join(' '));
  }

  function parseNameCells(row) {
    const text = normalizeBangla(rowText(row));
    const matches = Array.from(text.matchAll(/([০-৯0-9]{3})\s*\.\s*নাম\s*:\s*(.*?)(?=\s+[০-৯0-9]{3}\s*\.\s*নাম|$)/g));
    
    if (matches.length === 0) return [];

    const candidateXs = row.items
      .filter(i => /[০-৯0-9]/.test(i.str) || i.str.includes('নাম'))
      .map(i => i.x);
    
    const xs = uniqueSortedXs(candidateXs, 40);
    
    const names = [];
    for (let i = 0; i < matches.length; i++) {
      names.push({
        serial: displayBanglaDigits(matches[i][1]),
        name: clean(matches[i][2]),
        x: xs[i] || (row.items[0] ? row.items[0].x + i * 200 : 0)
      });
    }
    return names;
  }

  function uniqueSortedXs(values, minGap = 25) {
    const xs = [...values].filter(Number.isFinite).sort((a, b) => a - b);
    const out = [];
    for (const x of xs) {
      if (!out.length || Math.abs(x - out[out.length - 1]) >= minGap) out.push(x);
    }
    return out;
  }

  function getColumnAnchors(nameRow, nearbyRows = []) {
    const names = parseNameCells(nameRow).sort((a, b) => a.x - b.x);
    const primary = uniqueSortedXs(names.map(n => n.x), 40);
    if (primary.length >= 3) return primary.slice(0, 3);

    const candidates = [];
    const labelRe = /(?:ভোটার\s*নং|পিতা|মাতা|পেশা|জন্ম\s*তারিখ|ঠিকানা)\s*:/;
    for (const row of [nameRow, ...nearbyRows.slice(0, 10)]) {
      for (const item of row.items) {
        const t = normalizeBangla(item.str);
        if (labelRe.test(t)) candidates.push(item.x);
      }
    }

    const merged = uniqueSortedXs([...primary, ...candidates], 40);
    if (merged.length >= 3) return merged.slice(0, 3);

    const allX = uniqueSortedXs([...(nameRow.items || []).map(i => i.x), ...nearbyRows.flatMap(r => r.items.map(i => i.x))], 12);
    if (allX.length >= 3) {
      const min = allX[0], max = allX[allX.length - 1];
      const width = Math.max(1, max - min);
      const thirds = [min, min + width / 3, min + 2 * width / 3];
      return thirds.map(target => allX.reduce((best, x) => Math.abs(x - target) < Math.abs(best - target) ? x : best, allX[0]));
    }
    return primary.slice(0, 3);
  }

  function cellsForRow(row, anchors) {
    if (!row || !anchors.length) return [];
    const sortedAnchors = [...anchors].sort((a, b) => a - b).slice(0, 3);
    const cells = sortedAnchors.map(() => []);
    const boundaries = [];
    for (let i = 0; i < sortedAnchors.length - 1; i++) {
      boundaries.push((sortedAnchors[i] + sortedAnchors[i + 1]) / 2);
    }

    for (const item of row.items) {
      const text = clean(item.str);
      if (!text) continue;
      let col = 0;
      while (col < boundaries.length && item.x >= boundaries[col]) col++;
      if (col < cells.length) cells[col].push(text);
    }
    return cells.map(parts => clean(parts.join(' ')));
  }

  function extractFieldFromColumn(text) {
    const n = normalizeBangla(text);
    const result = { voterId: '', father: '', mother: '', occupation: '', dob: '', address: '' };

    const id = n.match(/(?:ভোটার|ভাটার|েভাটার)\s*নং\s*:\s*([০-৯0-9]{10,17})/);
    if (id) result.voterId = asciiDigits(id[1]); // ভোটার আইডি ইংরেজিতে রূপান্তর
    if (!id) {
      const fallbackId = n.match(/([০-৯0-9]{10,17})/);
      if (fallbackId) result.voterId = asciiDigits(fallbackId[1]);
    }

    const father = n.match(/পিতা\s*:\s*(.*?)(?=\s+(?:মাতা|পেশা|জন্ম\s*তারিখ|ঠিকানা)\s*:|$)/);
    if (father) result.father = clean(father[1]);

    const mother = n.match(/মাতা\s*:\s*(.*?)(?=\s+(?:পিতা|পেশা|জন্ম\s*তারিখ|ঠিকানা)\s*:|$)/);
    if (mother) result.mother = clean(mother[1]);

    const occupation = n.match(/পেশা\s*:\s*(.*?)(?=\s+(?:জন্ম\s*তারিখ|ঠিকানা|পিতা|মাতা)\s*:|$)/);
    if (occupation) result.occupation = clean(occupation[1]).replace(/[\s,،]+$/g, '');

    const dob = n.match(/জন্ম\s*তারিখ\s*:\s*([০-৯0-9]{2}\s*\/\s*[০-৯0-9]{2}\s*\/\s*[০-৯0-9]{4})/);
    if (dob) result.dob = dob[1].replace(/\s/g, '');

    const address = n.match(/ঠিকানা\s*:\s*(.*?)(?=\s+(?:ভোটার\s*নং|পিতা|মাতা|পেশা|জন্ম\s*তারিখ)\s*:|$)/);
    if (address) result.address = clean(address[1]);

    return result;
  }

  function extractBlockFields(rows, startIndex, endIndex, anchors, expectedCount) {
    const streams = Array.from({ length: Math.max(3, expectedCount) }, () => []);
    for (let j = startIndex; j < endIndex; j++) {
      const cells = cellsForRow(rows[j], anchors);
      for (let c = 0; c < streams.length && c < cells.length; c++) {
        if (cells[c]) streams[c].push(cells[c]);
      }
    }

    const fields = streams.map(parts => extractFieldFromColumn(parts.join(' ')));

    const fallback = { voterId: [], father: [], mother: [], occupation: [], dob: [], address: [] };
    for (let j = startIndex; j < endIndex; j++) {
      const t = normalizeBangla(rowText(rows[j]));
      const id = t.match(/(?:ভোটার|ভাটার|েভাটার)\s*নং\s*:\s*([০-৯0-9]{10,17})/g) || [];
      id.forEach(v => { const m = v.match(/([০-৯0-9]{10,17})/); if (m) fallback.voterId.push(asciiDigits(m[1])); });
      const f = Array.from(t.matchAll(/পিতা\s*:\s*(.*?)(?=\s+মাতা\s*:|\s+পেশা\s*:|\s+জন্ম\s*তারিখ\s*:|\s+ঠিকানা\s*:|$)/g));
      const m = Array.from(t.matchAll(/মাতা\s*:\s*(.*?)(?=\s+পিতা\s*:|\s+পেশা\s*:|\s+জন্ম\s*তারিখ\s*:|\s+ঠিকানা\s*:|$)/g));
      const a = Array.from(t.matchAll(/ঠিকানা\s*:\s*(.*?)(?=\s+ভোটার\s*নং\s*:|\s+পিতা\s*:|\s+মাতা\s*:|\s+পেশা\s*:|\s+জন্ম\s*তারিখ\s*:|$)/g));
      f.forEach(x => fallback.father.push(clean(x[1])));
      m.forEach(x => fallback.mother.push(clean(x[1])));
      a.forEach(x => fallback.address.push(clean(x[1])));
      const od = t.match(/পেশা\s*:\s*(.*?)\s*,?\s*জন্ম\s*তারিখ\s*:\s*([০-৯0-9]{2}\s*\/\s*[০-৯0-9]{2}\s*\/\s*[০-৯0-9]{4})/);
      if (od) fallback.occupation.push(clean(od[1])), fallback.dob.push(od[2].replace(/\s/g, ''));
    }

    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].voterId && fallback.voterId[i]) fields[i].voterId = fallback.voterId[i];
      if (!fields[i].father && fallback.father[i]) fields[i].father = fallback.father[i];
      if (!fields[i].mother && fallback.mother[i]) fields[i].mother = fallback.mother[i];
      if (!fields[i].occupation && fallback.occupation[i]) fields[i].occupation = fallback.occupation[i];
      if (!fields[i].dob && fallback.dob[i]) fields[i].dob = fallback.dob[i];
      if (!fields[i].address && fallback.address[i]) fields[i].address = fallback.address[i];
    }
    return fields.slice(0, expectedCount);
  }

  function isDataNameRow(row) {
    return /([০-৯0-9]{3})\s*\.\s*নাম\s*:/.test(normalizeBangla(rowText(row)));
  }

  function makeRecord(name, fields, page, fileName) {
    const voterKey = asciiDigits(fields.voterId || '');
    return {
      serial: name.serial,
      name: normalizeBangla(name.name),
      voterId: asciiDigits(fields.voterId || ''), // ভোটার নম্বর ইংরেজিতে (1234567890)
      father: normalizeBangla(fields.father || ''),
      mother: normalizeBangla(fields.mother || ''),
      occupation: normalizeBangla(fields.occupation || ''),
      dob: displayBanglaDigits(asciiDigits(fields.dob || '')),
      address: normalizeBangla(fields.address || ''),
      status: 'Active',
      sourcePage: page,
      sourceFile: fileName,
      _voterKey: voterKey
    };
  }

  function extractRecordsFromPage(rows, page, fileName, diagnostics) {
    const records = [];
    for (let i = 0; i < rows.length; i++) {
      if (!isDataNameRow(rows[i])) continue;

      const names = parseNameCells(rows[i]);
      const end = (() => {
        for (let j = i + 1; j < rows.length; j++) if (isDataNameRow(rows[j])) return j;
        return rows.length;
      })();
      const anchors = getColumnAnchors(rows[i], rows.slice(i + 1, Math.min(end, i + 12)));
      const fields = extractBlockFields(rows, i + 1, end, anchors, names.length);
      const block = {
        page,
        rowIndex: i,
        anchors,
        serials: names.map(n => n.serial),
        rawRows: rows.slice(i, end).map(rowText)
      };
      diagnostics.blocks.push(block);
      diagnostics.serialStarts += names.length;

      for (let k = 0; k < names.length; k++) {
        const record = makeRecord(names[k], fields[k] || {}, page, fileName);
        diagnostics.candidateRecords.push(record);
        records.push(record);
      }
    }
    return records;
  }

  function diagnosticFailure(d) {
    if (!d.pagesWithText) return 'PDF.js Extraction Failed (No text pages)';
    if (!d.serialStarts) return 'Record Start Detection Failed (No serial/name rows)';
    if (!d.candidateRecords.length) return 'Candidate Reconstruction Failed';
    if (!d.validRecords.length) return 'Validation Failed (All candidates rejected)';
    return 'PASS';
  }

  async function parsePDF(file) {
    if (!window.pdfjsLib) throw new Error('PDF.js engine is not ready.');

    const buffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
    const d = {
      file: file.name,
      pages: pdf.numPages,
      pagesWithText: 0,
      totalTextItems: 0,
      totalExtractedCharacters: 0,
      physicalRows: 0,
      serialStarts: 0,
      candidateBlocks: 0,
      candidateRecords: [],
      validRecords: [],
      invalidRecords: [],
      duplicateRecords: 0,
      pagesData: [],
      blocks: [],
      rawText: ''
    };

    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
      const page = await pdf.getPage(pageNo);
      const tc = await page.getTextContent();
      const items = tc.items.map(it => {
        const tr = it.transform || [1, 0, 0, 1, 0, 0];
        return { str: it.str || '', x: tr[4] || 0, y: tr[5] || 0, w: it.width || 0, h: it.height || 0 };
      }).filter(it => clean(it.str));

      if (items.length) d.pagesWithText++;
      d.totalTextItems += items.length;
      d.totalExtractedCharacters += items.reduce((n, it) => n + it.str.length, 0);

      const rows = groupRows(items);
      d.physicalRows += rows.length;
      const pageRaw = rows.map(rowText).join('\n');
      d.rawText += `===== PAGE ${pageNo} =====\n${pageRaw}\n`;
      d.pagesData.push({ page: pageNo, textItems: items.length, physicalRows: rows.length, rows });

      extractRecordsFromPage(rows, pageNo, file.name, d);
    }

    d.candidateBlocks = d.blocks.length;

    const seen = new Set();
    for (const candidate of d.candidateRecords) {
      if (!candidate._voterKey || candidate._voterKey.length < 10) {
        d.invalidRecords.push(candidate);
        continue;
      }
      const dedupKey = candidate._voterKey + '_' + candidate.serial;
      if (seen.has(dedupKey)) {
        d.duplicateRecords++;
        continue;
      }
      seen.add(dedupKey);
      d.validRecords.push(candidate);
    }

    d.failureStage = diagnosticFailure(d);
    d.rawTextSize = d.rawText.length;
    window.__voteDebug = d;
    return d;
  }

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  }

  /*
   * Live Search Keyword Highlighter Engine
   */
  function highlight(text, q) {
    const str = esc(text);
    if (!q) return str;
    const cleanQ = esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!cleanQ) return str;
    const regex = new RegExp(`(${cleanQ})`, 'gi');
    return str.replace(regex, '<mark style="background:#fbbf24; color:#0f172a; font-weight:bold; padding:1px 4px; border-radius:3px;">$1</mark>');
  }

  function render() {
    const q = $('search').value.trim();
    const qLower = q.toLowerCase();
    const field = $('field').value;

    state.filtered = state.records.filter(r => {
      if (!qLower) return true;
      const values = field === 'all' ? Object.values(r) : [r[field]];
      return values.some(v => String(v ?? '').toLowerCase().includes(qLower));
    });

    const max = Math.max(1, Math.ceil(state.filtered.length / state.pageSize));
    state.page = Math.min(state.page, max);
    const start = (state.page - 1) * state.pageSize;
    const pageRows = state.filtered.slice(start, start + state.pageSize);

    // টেবিল হেডার বাংলায় কনভার্ট এবং Status কলাম রিমুভ
    const table = $('resultsView')?.querySelector('table');
    if (table) {
      const thead = table.querySelector('thead');
      if (thead) {
        thead.innerHTML = `
          <tr>
            <th style="width: 8%;">ক্রমিক</th>
            <th style="width: 20%;">নাম</th>
            <th style="width: 16%;">ভোটার আইডি</th>
            <th style="width: 20%;">পিতা-মাতা</th>
            <th style="width: 12%;">পেশা</th>
            <th style="width: 10%;">জন্ম তারিখ</th>
            <th style="width: 14%;">ঠিকানা</th>
          </tr>`;
      }
    }

    // টেবিল বডি রেন্ডার লজিক (Status কলাম ব্যতীত)
    $('tbody').innerHTML = pageRows.map(r => `
      <tr>
        <td>${highlight(r.serial, q)}</td>
        <td><b>${highlight(r.name, q)}</b></td>
        <td style="font-family: 'Inter', sans-serif; font-weight: bold; color: #60a5fa;">${highlight(asciiDigits(r.voterId), q)}</td>
        <td class="parent"><div>পিতা: ${highlight(r.father, q)}</div><div>মাতা: ${highlight(r.mother, q)}</div></td>
        <td>${highlight(r.occupation, q)}</td>
        <td>${highlight(r.dob, q)}</td>
        <td>${highlight(r.address, q)}</td>
      </tr>`).join('') || '<tr><td colspan="7" class="empty">আপনার সার্চের সাথে কোনো ফলাফল পাওয়া যায়নি</td></tr>';

    $('foundCount').textContent = displayBanglaDigits(state.filtered.length);
    $('pageInfo').textContent = `${displayBanglaDigits(state.page)} / ${displayBanglaDigits(max)}`;
    $('prev').disabled = state.page <= 1;
    $('next').disabled = state.page >= max;
  }

  function renderDebug(d) {
    if (new URLSearchParams(location.search).get('debug') !== '1') return;
    const existing = document.getElementById('debugPanel');
    if (existing) existing.remove();

    const panel = document.createElement('section');
    panel.id = 'debugPanel';
    panel.style.cssText = 'position:fixed;z-index:99999;left:0;right:0;top:0;max-height:58vh;overflow:auto;background:#151515;color:#eee;border-bottom:3px solid #f33;padding:14px;font:12px/1.45 Consolas,monospace;box-shadow:0 12px 30px #000;';

    const mask = (s) => {
      if (!s) return '';
      const str = String(s);
      if (str.length <= 4) return '***';
      return str.slice(0, 2) + '***' + str.slice(-2);
    };
    const maskText = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/\b\d{9,17}\b/g, m => m.slice(0, 2) + '***' + m.slice(-2))
        .replace(/\b\d{2}[-/.]\d{2}[-/.]\d{4}\b/g, '**/**/****')
        .replace(/[\u0980-\u09FFa-zA-Z]{3,}/g, w => w.length > 4 ? w.slice(0, 2) + '***' : '***');
    };
    const sanitizeRecord = (r) => {
      if (!r || typeof r !== 'object') return r;
      return {
        serial: r.serial,
        sourcePage: r.sourcePage,
        name: mask(r.name),
        voterId: mask(r.voterId),
        father: mask(r.father),
        mother: mask(r.mother),
        dob: mask(r.dob),
        occupation: mask(r.occupation),
        address: mask(r.address)
      };
    };

    const preview = (d.validRecords || []).slice(0, 20).map(r =>
      `${r.serial} | ${mask(r.name)} | ${mask(r.voterId)} | F:${mask(r.father)} | M:${mask(r.mother)} | ${mask(r.occupation)} | ${mask(r.dob)} | ${mask(r.address)} | P${r.sourcePage}`
    ).join('\n');
    const rawRows = (d.blocks || []).slice(0, 5).map((b, i) =>
      `BLOCK ${i+1} | Page ${b.page} | Anchors ${b.anchors.map(x => Math.round(x)).join(', ')} | Serials ${b.serials.join(', ')}\n${b.rawRows.map(maskText).join('\n')}`
    ).join('\n\n----------------------------------------\n\n');

    const sanitizedDiag = {
      pages: d.pages,
      pagesWithText: d.pagesWithText,
      totalTextItems: d.totalTextItems,
      totalExtractedCharacters: d.totalExtractedCharacters,
      physicalRows: d.physicalRows,
      serialStarts: d.serialStarts,
      candidateBlocks: d.candidateBlocks,
      failureStage: d.failureStage,
      duplicateRecords: d.duplicateRecords,
      counts: {
        candidate: (d.candidateRecords || []).length,
        valid: (d.validRecords || []).length,
        invalid: (d.invalidRecords || []).length
      },
      blocksSummary: (d.blocks || []).map((b, i) => ({
        blockIndex: i + 1,
        page: b.page,
        anchors: b.anchors,
        serials: b.serials,
        rowCount: b.rawRows ? b.rawRows.length : 0
      })),
      sampleRecords: (d.validRecords || []).slice(0, 20).map(sanitizeRecord),
      piiStatus: 'REDACTED_FOR_SECURITY'
    };
    const json = JSON.stringify(sanitizedDiag, null, 2);

    panel.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
        <b style="color:#ffb84d;font-size:14px">⚠️ DEVELOPER DIAGNOSTIC MODE (REDACTED)</b>
        <button id="closeDebug" style="background:#d33;color:#fff;border:0;padding:7px 12px;cursor:pointer">Close Panel</button>
      </div>
      <div style="margin:10px 0;padding:7px;border:1px solid #e6d000;color:#ffe900"><b>FAILURE STAGE:</b> ${esc(d.failureStage)}</div>
      <div style="margin-bottom:8px">
        <button id="copyDiag" style="background:#1488d8;color:#fff;border:0;padding:7px 10px;margin-right:7px;cursor:pointer">Copy Diagnostic JSON</button>
        <button id="copyRaw" style="background:#1b9aaa;color:#fff;border:0;padding:7px 10px;cursor:pointer">Copy Raw TXT (Redacted)</button>
      </div>
      <div>PDF Pages: ${d.pages} | Pages With Text: ${d.pagesWithText} | Total Text Items: ${d.totalTextItems}</div>
      <div>Total Extracted Characters: ${d.totalExtractedCharacters} | Physical Rows: ${d.physicalRows}</div>
      <div>Detected Serial Starts: ${d.serialStarts} | Candidate Blocks: ${d.candidateBlocks}</div>
      <div>Candidate Records: ${d.candidateRecords.length} | Valid Records: ${d.validRecords.length} | Invalid Records: ${d.invalidRecords.length} | Duplicate Records: ${d.duplicateRecords}</div>
      <h4 style="color:#8bd3ff">FIRST 5 RAW CANDIDATE BLOCKS</h4><pre style="background:#080808;padding:10px;max-height:250px;overflow:auto">${esc(rawRows || 'No candidate blocks')}</pre>
      <h4 style="color:#8bd3ff">FIRST 20 PARSED RECORDS</h4><pre style="background:#080808;padding:10px;max-height:250px;overflow:auto">${esc(preview || 'No valid records')}</pre>
      <h4 style="color:#8bd3ff">FIRST 50 RECONSTRUCTED ROWS</h4><pre style="background:#080808;padding:10px;max-height:250px;overflow:auto">${esc(d.pagesData.flatMap(p => p.rows.slice(0, 50).map(r => `P${p.page} Y=${Math.round(r.y)} X=${Math.round(r.items[0]?.x||0)} ${maskText(rowText(r))}`)).slice(0,50).join('\n'))}</pre>
    `;
    document.body.appendChild(panel);
    $('closeDebug').onclick = () => panel.remove();
    $('copyDiag').onclick = async () => { await navigator.clipboard.writeText(json); $('copyDiag').textContent = 'Copied (Redacted)'; };
    $('copyRaw').onclick = async () => { await navigator.clipboard.writeText(maskText(d.rawText)); $('copyRaw').textContent = 'Copied (Redacted)'; };
  }

  // সম্পূর্ণ রিসেট ও ডাটা ক্লিয়ার ফাংশন (NEW UPDATE)
  function resetAllVoterData() {
    state.records = [];
    state.filtered = [];
    state.page = 1;
    state.fileName = '';
    
    if ($('fileInput')) $('fileInput').value = '';
    if ($('search')) $('search').value = '';
    if ($('fileName')) $('fileName').textContent = '—';
    if ($('sourceName')) $('sourceName').textContent = '—';
    if ($('foundCount')) $('foundCount').textContent = '০';
    if ($('statusText')) $('statusText').textContent = ''; // স্ট্যাটাস টেক্সট সম্পূর্ণ রিসেট
    if ($('progress')) $('progress').classList.add('hidden');
    if ($('progressBar')) $('progressBar').style.width = '0%';
    if ($('resultsView')) $('resultsView').classList.add('hidden');
    if ($('uploadView')) $('uploadView').classList.remove('hidden');
  }

  async function handle(files) {
    $('progress').classList.remove('hidden');
    $('progressBar').style.width = '5%';
    $('statusText').textContent = 'PDF parsing চলছে...';

    try {
      const all = [];
      let combinedDiagnostic = null;
      for (let i = 0; i < files.length; i++) {
        const d = await parsePDF(files[i]);
        combinedDiagnostic = d;
        all.push(...d.validRecords);
        $('progressBar').style.width = `${Math.round(((i + 1) / files.length) * 100)}%`;
      }

      const seen = new Set();
      state.records = all.filter(r => {
        const k = r._voterKey + '_' + r.serial;
        if (!r._voterKey || seen.has(k)) return false;
        seen.add(k); return true;
      });
      state.filtered = state.records;
      state.page = 1;
      state.pageSize = +$('pageSize').value;
      state.fileName = files.length === 1 ? files[0].name : `${files.length} PDF Files (Combined)`;

      $('fileName').textContent = state.fileName;
      $('sourceName').textContent = state.fileName;
      $('uploadView').classList.add('hidden');
      $('resultsView').classList.remove('hidden');
      
      // মোট রেকর্ড সংখ্যা আপডেটেড বাংলা বার্তা
      $('statusText').textContent = state.records.length ? `মোট ${displayBanglaDigits(state.records.length)} টি ভোটার রেকর্ড পাওয়া গেছে।` : 'কোনো ভ্যালিড ভোটার রেকর্ড পাওয়া যায়নি।';
      render();
      if (combinedDiagnostic) renderDebug(combinedDiagnostic);
    } catch (err) {
      $('statusText').textContent = `Error processing file: ${err.message}`;
      console.error(err);
    }
  }

  // UI ড্রপডাউন ও টেক্সট স্বয়ংক্রিয়ভাবে বাংলায় রেন্ডার ফাংশন
  function translateUI() {
    const fieldSelect = $('field');
    if (fieldSelect && fieldSelect.options.length >= 6) {
      fieldSelect.options[0].text = 'সকল ফিল্ড খুঁজুন';
      fieldSelect.options[1].text = 'নাম';
      fieldSelect.options[2].text = 'ভোটার আইডি';
      fieldSelect.options[3].text = 'পিতার নাম';
      fieldSelect.options[4].text = 'মাতার নাম';
      fieldSelect.options[5].text = 'ঠিকানা';
    }

    const statusSelect = $('status');
    if (statusSelect) {
      statusSelect.style.display = 'none'; // Status কলাম/ড্রপডাউন হাইড
    }

    const clearBtn = $('clear');
    if (clearBtn) clearBtn.textContent = 'ডাটা ক্লিয়ার করুন';

    const newFileBtn = $('newFile');
    if (newFileBtn) newFileBtn.textContent = 'নতুন ফাইল আপলোড করুন';

    const searchInput = $('search');
    if (searchInput) searchInput.placeholder = 'খুঁজুন (নাম, ভোটার আইডি, ঠিকানা, পেশা)...';
  }

  // Safe DOM Event Bindings
  document.addEventListener("DOMContentLoaded", function() {
    translateUI(); // UI টেক্সট বাংলায় রূপান্তর

    const fileInput = $('fileInput');
    const dropzone = $('dropzone');

    if (fileInput) {
      fileInput.addEventListener('change', e => { 
        if (e.target.files && e.target.files.length) handle([...e.target.files]); 
      });
    }

    if (dropzone) {
      dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('active'); });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('active'));
      dropzone.addEventListener('drop', e => {
        e.preventDefault(); 
        dropzone.classList.remove('active');
        if (e.dataTransfer.files && e.dataTransfer.files.length) handle([...e.dataTransfer.files]);
      });
    }

    if ($('search')) $('search').addEventListener('input', () => { state.page = 1; render(); });
    if ($('field')) $('field').addEventListener('change', () => { state.page = 1; render(); });
    if ($('pageSize')) $('pageSize').addEventListener('change', () => { state.page = 1; state.pageSize = +$('pageSize').value; render(); });
    if ($('prev')) $('prev').onclick = () => { state.page--; render(); };
    if ($('next')) $('next').onclick = () => { state.page++; render(); };
    
    // ডাটা সম্পূর্ণ রিসেট ইভেন্ট হ্যান্ডলার্স
    if ($('clear')) $('clear').onclick = resetAllVoterData;
    if ($('newFile')) $('newFile').onclick = resetAllVoterData;
  });
