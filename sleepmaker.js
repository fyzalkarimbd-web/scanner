  function openVsYtPopup() {
    var modal = document.getElementById("vs-yt-modal");
    var wrap = document.getElementById("vs-yt-wrap");
    if (!modal || !wrap) return;
    var ytUrl = (typeof window.VS_YT_VIDEO_URL !== "undefined") ? window.VS_YT_VIDEO_URL : "";
    var vid = (typeof extractVsYtId === "function") ? extractVsYtId(ytUrl) : ytUrl;
    if (!vid || vid === "YOUR_YOUTUBE_VIDEO_ID") {
      wrap.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;padding:20px;text-align:center;font-size:16px;">টিউটোরিয়াল ভিডিও খুব শীঘ্রই যুক্ত করা হবে।</div>';
    } else {
      wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/' + vid + '?autoplay=1&rel=0" title="Tutorial Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>';
    }
    modal.classList.add("open");
  }

  function closeVsYtPopup() {
    var modal = document.getElementById("vs-yt-modal");
    var wrap = document.getElementById("vs-yt-wrap");
    if (modal) modal.classList.remove("open");
    if (wrap) wrap.innerHTML = "";
  }

  // ভোটার স্লিপ জেনারেটর মোডাল অ্যাক্টিভেশন
  function openVoterSlipModal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-voter-slip');
      var modal = document.getElementById('voterSlipModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          setTimeout(function () {
              if (window.__vs && typeof window.__vs.syncApi === 'function') {
                  window.__vs.syncApi();
              }
              if (window.__vs && typeof window.__vs.refresh === 'function') {
                  window.__vs.refresh();
              } else {
                  window.dispatchEvent(new Event('resize'));
              }
          }, 80);
      }
  }

  function closeVoterSlipModal() {
      closeVsYtPopup();
      var modal = document.getElementById('voterSlipModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
      }
  }

  // =========================================================================
  // VSCore v3.0 — UNIFIED EC HYBRID + FULL BIJOY ANSI + 3-TIER PHONETIC ENGINE
  // =========================================================================
  var VSCore = (function () {

    var HYB_CHAR_MAP = {
      'µ': 'ড়', 'μ': 'ড়',
      'Ï': 'ে', 'Ð': 'ৈ', 'Î': '\uE001', 'Ë': '্য',
      'Ñ': 'ক্ক', 'Ò': 'ক্ট', 'Ó': 'ক্ট্র', 'Ô': 'ক্স', 'Õ': 'ক্ল', 'Ö': 'ক্ল',
      '×': 'ক্ত', 'Ø': 'ক্ত্র', 'Ù': 'ক্ষ', 'Ú': 'ক্ষ্ম', 'Û': 'ক্য', 'Ü': 'ক্র', 'Ý': 'ক্ব', 'Þ': 'ক্ম',
      'å': 'গ্র', 'æ': 'গ্ল', 'ç': 'গ্ধ', 'è': 'ঙ্ক', 'é': 'ঙ্খ', 'ê': 'ঙ্গ', 'ë': 'ঙ্ঘ', 'ì': 'জ্ঞ',
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

    var BIJOY_ANSI_MAP = {
      "Av": "আ", "A": "অ", "B": "ই", "C": "ঈ", "D": "উ", "E": "ঊ", "F": "ঋ", "G": "এ", "H": "ঐ", "I": "ও", "J": "ঔ",
      "‡v": "ো", "†v": "ো", "‡Š": "ৌ", "†Š": "ৌ", "‡": "ে", "†": "ে", "‰": "ৈ", "ˆ": "ৈ",
      "K": "ক", "L": "খ", "M": "গ", "N": "ঘ", "O": "ঙ", "P": "চ", "Q": "ছ", "R": "জ", "S": "ঝ", "T": "ঞ",
      "U": "ট", "V": "ঠ", "W": "ড", "X": "ঢ", "Y": "ণ", "Z": "ত", "_": "থ", "`": "দ", "a": "ধ", "b": "ন",
      "c": "প", "d": "ফ", "e": "ব", "f": "ভ", "g": "ম", "h": "য", "i": "র", "j": "ল", "k": "শ", "l": "ষ",
      "m": "স", "n": "হ", "o": "ড়", "p": "ঢ়", "q": "য়", "r": "ৎ", "s": "ং", "t": "ঃ", "u": "ঁ", "v": "া",
      "w": "ি", "x": "ী", "y": "ু", "~": "ূ", "„": "ৃ", "Š": "ৗ",
      "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
      "°": "ক্ক", "±": "ক্ট", "³": "ক্ত", "K¡": "ক্ব", "µ": "ক্র", "wK¬": "ক্লি", "K¬": "ক্ল", "¶": "ক্ষ", "ÿ": "ক্ষ", "·": "ক্স", "Lª": "খ্র",
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
      "Ö": "্র", "ª": "্র", "¨": "্য", "©": "\uE001", "|": "।", "\\": "॥", "Ô": "‘", "Õ": "’", "Ò": "“", "Ó": "”", "&": "্"
    };
    var BIJOY_SORTED_KEYS = Object.keys(BIJOY_ANSI_MAP).sort(function (a, b) { return b.length - a.length; });

    var HYBRID_DETECT_RE = /[ÏÐÎËƣƤƀƁƂƃƄƅƆſŇĺ×ØĢĤĥĦħĨĩİįĴļĽłńŅŋŏŐŌŒŔŘřśŝŞšŢŨũŪūŬŮůűųŴŽžƏƎĀăēĔėęĚěĐŮĳîŌÔèêìúÖÝŅÿåÙµμ\u008C]|িপতা|িঠকানা|Ïভাটার|বাংলােদশ|(?:^|[\s:ঃ,.])([িেৈ])[ক-হড়ঢ়য়]/;
    var SUTONNY_DETECT_RE = /(?:fvUvi|wcZv|wVKvbv|Rb¥|‡fvUvi|†fvUvi|bvg\s*:|gš¿Yvjq|wbe©vPb)/;

    function bn2n(t) {
      return parseInt(String(t || "").replace(/[০-৯]/g, function (c) {
        return c.charCodeAt(0) - 2534;
      }), 10) || 0;
    }

    function n2bn(t) {
      return String(t == null ? "" : t).replace(/\d/g, function (d) {
        return String.fromCharCode(+d + 2534);
      });
    }

    function detectMode(sample) {
      if (!sample) return "unicode";
      if (SUTONNY_DETECT_RE.test(sample)) return "sutonny";
      if (HYBRID_DETECT_RE.test(sample)) return "hybrid";
      return "unicode";
    }

    function polishBengaliText(s) {
      if (!s) return "";
      return s
        .normalize("NFC")
        .replace(/য\u09BC/g, "য়")
        .replace(/ড\u09BC/g, "ড়")
        .replace(/ঢ\u09BC/g, "ঢ়")
        .replace(/অা/g, "আ")
        .replace(/র\u25CC্যা/g, "র\u200D্যা")
        .replace(/রে\u25CC/g, "র\u200D্যে")
        .replace(/\u25CC্([ক-হ])/g, "$1")
        .replace(/\u25CC/g, "")
        .replace(/ে\s*া/g, "ো")
        .replace(/ে\s*ৗ/g, "ৌ")
        .replace(/ঁ([ািীুূৃেৈোৌ])/g, "$1ঁ")
        .replace(/\s+([ািীুূৃেৈোৌংঃঁ্])/g, "$1")
        .replace(/([ক-হড়ঢ়য়])\s+্\s*([ক-হড়ঢ়য়])/g, "$1্$2")
        .replace(/র্\s+([ক-হড়ঢ়য়])/g, "র্$1")
        .replace(/([ক-হড়ঢ়য়])\s+(্য|্র)/g, "$1$2")
        .replace(/\s+([,।;:])/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
    }

    function reorderVisualBangla(s) {
      s = s.replace(/য\u09BC/g, "য়").replace(/ড\u09BC/g, "ড়").replace(/ঢ\u09BC/g, "ঢ়").replace(/অা/g, "আ");
      s = s.replace(/([িেৈ])\s+([ক-হড়ঢ়য়ৎ])/g, "$1$2");
      s = s.replace(/\s+([\uE001াীুূৃৗংঃঁ্]|্য)/g, "$1");
      s = s.replace(/ঁ([ািীুূৃেৈোৌ])/g, "$1ঁ");

      var cluster = "([ক-হড়ঢ়য়ৎ]\u09BC?(?:[\u200C\u200D]?্[\u200C\u200D]?[ক-হড়ঢ়য়ৎ]\u09BC?)*)";
      s = s.replace(new RegExp("([িেৈ])" + cluster, "g"), "$2$1");
      s = s.replace(/ে\s*া/g, "ো").replace(/ে\s*ৗ/g, "ৌ");

      var rephRe = new RegExp("([ক-হড়ঢ়য়]\u09BC?(?:[\u200C\u200D]?্[\u200C\u200D]?[ক-হড়ঢ়য়]\u09BC?)*[িীুূৃেৈোৌ]?)\uE001", "g");
      s = s.replace(rephRe, "র্$1").replace(/\uE001/g, "র্");

      return polishBengaliText(s);
    }

    function decodeHybrid(raw) {
      if (!raw) return "";
      var s = raw.normalize("NFC");

      s = s.replace(/[\u0152\u008C](?=[ýû])/g, "");
      s = s.replace(/[\u0152\u008C]([জচছঝ])/g, "ঞ্$1");
      s = s.replace(/[\u0152\u008C]([কখগঘ])/g, "ঙ্$1");
      s = s.replace(/[\u0152\u008C]/g, "ন্");

      s = s.replace(/Ş(?=[Ëাীে]|েকাড)/g, "স্ট");
      s = s.replace(/(ই|মা|Ïপা)Ş/g, "$1স্ট");
      s = s.replace(/Ş/g, "ষ্ট");

      s = s.replace(/Ţ(?=Ë)/g, "স্ট");
      s = s.replace(/Ţ/g, "স্ট্র");

      s = s.replace(/র\u25CC্যা/g, "র\u200D্যা").replace(/রে\u25CC/g, "র\u200D্যে");
      s = s.replace(/\u25CC্([ক-হ])/g, "$1").replace(/\u25CC/g, "");

      var out = "";
      for (var i = 0; i < s.length; i++) {
        var ch = s.charAt(i);
        out += (HYB_CHAR_MAP[ch] !== undefined) ? HYB_CHAR_MAP[ch] : ch;
      }
      return reorderVisualBangla(out);
    }

    function decodeBijoyAnsi(raw) {
      if (!raw) return "";
      var s = raw.replace(/GZ‡/g, "G‡Z").replace(/‡ga¨/g, "g‡a¨").replace(/P&P/g, "”P");
      var out = "";
      var i = 0;
      while (i < s.length) {
        var matched = false;
        for (var k = 0; k < BIJOY_SORTED_KEYS.length; k++) {
          var key = BIJOY_SORTED_KEYS[k];
          if (s.substring(i, i + key.length) === key) {
            out += BIJOY_ANSI_MAP[key];
            i += key.length;
            matched = true;
            break;
          }
        }
        if (!matched) {
          out += s.charAt(i);
          i++;
        }
      }
      return reorderVisualBangla(out);
    }

    function decode(text, mode) {
      if (!text) return "";
      var m = mode || detectMode(text);
      if (m === "sutonny") return decodeBijoyAnsi(text);
      if (m === "hybrid") return decodeHybrid(text);
      return polishBengaliText(text);
    }

    function assembleLines(items, mode) {
      if (!items || !items.length) return [];
      var sorted = items.slice().sort(function (a, b) {
        if (Math.abs(b.y - a.y) > 4.2) return b.y - a.y;
        return a.x - b.x;
      });

      var rows = [];
      var cur = [];
      var curY = null;
      for (var i = 0; i < sorted.length; i++) {
        var it = sorted[i];
        if (curY === null || Math.abs(it.y - curY) <= 4.2) {
          cur.push(it);
          if (curY === null) curY = it.y;
        } else {
          rows.push(cur);
          cur = [it];
          curY = it.y;
        }
      }
      if (cur.length) rows.push(cur);

      var lines = [];
      for (var r = 0; r < rows.length; r++) {
        var row = rows[r].sort(function (a, b) { return a.x - b.x; });
        var lineStr = "";
        var prev = null;
        var pendingSpace = false;

        for (var j = 0; j < row.length; j++) {
          var it = row[j];
          if (!it.s) continue;
          if (!it.s.trim()) { pendingSpace = true; continue; }

          var leadSp = /^\s/.test(it.s);
          var trailSp = /\s$/.test(it.s);
          var trimmed = it.s.trim();

          if (!prev) {
            lineStr = trimmed;
          } else {
            var gap = it.x - (prev.x + (prev.w || 0));
            var fs = Math.max(it.fs || 9, prev.fs || 9, 7);
            var prevJoin = /[ÏÐিেৈŒ\u008C্]$/.test(prev.trimmed);
            var curJoin = /^[ÎËাীুূৃৗংঃঁ্]/.test(trimmed);

            if ((prevJoin || curJoin) && gap < fs * 0.75) {
              lineStr += trimmed;
            } else if (pendingSpace || prev.trailSp || leadSp || (prev.w > 0 && gap > Math.max(1.85, fs * 0.22))) {
              lineStr += " " + trimmed;
            } else {
              lineStr += trimmed;
            }
          }
          prev = { x: it.x, w: it.w || 0, fs: it.fs || 9, trimmed: trimmed, trailSp: trailSp };
          pendingSpace = false;
        }

        if (lineStr.trim()) {
          var lineMode = mode;
          if (lineMode === "unicode") {
            if (SUTONNY_DETECT_RE.test(lineStr)) lineMode = "sutonny";
            else if (HYBRID_DETECT_RE.test(lineStr)) lineMode = "hybrid";
          }
          var dec = decode(lineStr, lineMode);
          if (dec) lines.push(dec);
        }
      }
      return lines;
    }

    function extractHeaderMeta(lines, info) {
      var text = lines.join("\n");
      var m;
      if (!info.district && (m = /জেলা\s*[:ঃ]\s*([^\s\n]+(?:\s+[^\s\n]+)?)(?=\s+উপজেলা|\s+সিটি|\s+ইউনিয়ন|\n|$)/.exec(text))) {
        info.district = m[1].trim();
      }
      if (!info.upazila && (m = /উপজেলা(?:\/থানা)?\s*[:ঃ]?\s*([^\s\n]+?)(?=\s+সিটি|\s+ইউনিয়ন|\s+ডাকঘর|\n|$)/.exec(text))) {
        if (m[1] !== "সিটি" && m[1] !== ":") info.upazila = m[1].trim();
      }
      if (!info.union && (m = /ইউনিয়ন(?:\/ওয়ার্ড\/ক্যাঃ\s*বোঃ|\/পৌর\s*ওয়ার্ড\/[^\n:ঃ]*)?\s*[:ঃ]\s*([^\n]+?)(?=\s+ডাকঘর|\s+ভোটার|\s+পোস্ট|\n|$)/.exec(text))) {
        info.union = m[1].trim();
      }
      if (!info.ward) {
        if ((m = /ওয়ার্ড\s*নং[-\s]*([০-৯0-9]+)/.exec(text))) info.ward = n2bn(m[1]);
        else if ((m = /ওয়ার্ড\s*নম্বর[^:ঃ\n]*[:ঃ]?\s*([০-৯0-9]+)/.exec(text))) info.ward = n2bn(m[1]);
      }
      if (!info.post && (m = /ডাকঘর\s*[:ঃ]\s*([^\n]+?)(?=\s+পোস্টকোড|\s+ভোটার|\n|$)/.exec(text))) {
        info.post = m[1].trim();
      }
      if (!info.area && (m = /ভোটার\s*এলাকার\s*নাম\s*[:ঃ]\s*([^\n]+?)(?=\s+ভোটার\s*এলাকার|\n|$)/.exec(text))) {
        info.area = m[1].trim();
      }
      if (!info.areaNo && (m = /ভোটার\s*এলাকার\s*(?:নম্বর|কোড)\s*[:ঃ]?\s*([০-৯0-9]+)/.exec(text))) {
        info.areaNo = n2bn(m[1]);
      }
    }

    function normSearch(str) {
      if (!str) return "";
      return n2bn(String(str).normalize("NFC").toLowerCase())
        .replace(/য\u09BC/g, "য়").replace(/ড\u09BC/g, "ড়").replace(/ঢ\u09BC/g, "ঢ়").replace(/অা/g, "আ")
        .replace(/আক্তার|আখতার/g, "আকতার")
        .replace(/জ্যোৎস্না|জোৎস্না|জ্যোস্না|জোসনা/g, "জোসনা")
        .replace(/স্ট/g, "ষ্ট")
        .replace(/ঈ/g, "ই").replace(/ী/g, "ি")
        .replace(/ঊ/g, "উ").replace(/ূ/g, "ু")
        .replace(/[ণঞ]/g, "ন").replace(/ং/g, "ঙ")
        .replace(/[শষছ]/g, "স")
        .replace(/[ড়ঢ়]/g, "র")
        .replace(/য়/g, "য").replace(/ৎ/g, "ত")
        .replace(/[ঃঁ্\u200C\u200D]/g, "")
        .replace(/[,\.\-\/\\:;|()'"]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    function phoneticKey(str) {
      if (!str) return "";
      var s = n2bn(String(str).normalize("NFC").toLowerCase())
        .replace(/য\u09BC/g, "য়").replace(/ড\u09BC/g, "ড়").replace(/ঢ\u09BC/g, "ঢ়").replace(/অা/g, "আ")
        .replace(/আক্তার|আখতার|আকতার/g, "আকতর")
        .replace(/জ্যোৎস্না|জোৎস্না|জ্যোস্না|জোসনা/g, "জসন")
        .replace(/মোহাম্মদ|মুহাম্মদ|মহাম্মদ|মোহম্মদ/g, "মহমদ")
        .replace(/আহমেদ|আহমদ|আহম্মদ|আহাম্মদ|আহেম্মেদ|আহাম্মেদ/g, "আহমদ")
        .replace(/[শষছ]/g, "স")
        .replace(/[ণঞঙং]/g, "ন")
        .replace(/[ড়ঢ়]/g, "র")
        .replace(/খ/g, "ক")
        .replace(/[থৎ]/g, "ত")
        .replace(/ধ/g, "দ")
        .replace(/ভ/g, "ব")
        .replace(/ফ/g, "প")
        .replace(/ঘ/g, "গ")
        .replace(/ঝ/g, "জ")
        .replace(/ঠ/g, "ট")
        .replace(/ঢ/g, "ড")
        .replace(/ঈ/g, "ই").replace(/ঊ/g, "উ").replace(/ঐ/g, "এ").replace(/ঔ/g, "ও")
        .replace(/[ঃঁ্\u200C\u200D]/g, "")
        .replace(/[,\.\-\/\\:;|()'"]/g, " ");

      var words = s.split(/\s+/).filter(Boolean).map(function (w) {
        if (/[০-৯]/.test(w)) return w;
        var p = w.replace(/[ািীুূৃেৈোৌ]/g, "").replace(/য়/g, "");
        p = p.replace(/(.)\1+/g, "$1");
        return p || w;
      });
      return words.join(" ").trim();
    }

    var OPTIONAL_TITLES = {
      "মো": 1, "মোহামমদ": 1, "মুহামমদ": 1, "মোসা": 1, "মোসামমত": 1, "মোসামমদ": 1,
      "মৃত": 1, "মৃতা": 1, "হাজি": 1, "আলহাজ": 1, "আলহাজব": 1, "স্রি": 1, "স্রিমতি": 1, "জনাব": 1
    };

    function matchesQuery(v, rawQuery) {
      if (!rawQuery) return true;
      var hayRaw = [v.sl, v.name, v.vno, v.father, v.mother, v.occ, v.dob, v.addr].join(" ");
      var targetNorm = normSearch(hayRaw);
      var targetCompact = targetNorm.replace(/\s+/g, "");
      var targetPhon = phoneticKey(hayRaw);
      var targetPhonCompact = targetPhon.replace(/\s+/g, "");

      var normQ = normSearch(rawQuery);
      if (!normQ) return true;
      var tokens = normQ.split(" ").filter(Boolean);
      var compactQ = normQ.replace(/\s+/g, "");

      if (tokens.every(function (t) { return targetNorm.indexOf(t) > -1 || (t.length >= 3 && targetCompact.indexOf(t) > -1); })) {
        return true;
      }
      if (compactQ.length >= 3 && targetCompact.indexOf(compactQ) > -1) {
        return true;
      }

      var rawTokens = rawQuery.trim().split(/\s+/).filter(Boolean);
      var pToks = rawTokens.map(phoneticKey).filter(Boolean);
      if (pToks.length && pToks.every(function (pt) {
        if (/[০-৯]/.test(pt)) return targetNorm.indexOf(pt) > -1 || targetCompact.indexOf(pt) > -1;
        if (pt.length < 2) return targetNorm.indexOf(pt) > -1;
        return targetPhon.indexOf(pt) > -1 || (pt.length >= 3 && targetPhonCompact.indexOf(pt) > -1);
      })) {
        return true;
      }

      var phonCompactQ = phoneticKey(rawQuery).replace(/\s+/g, "");
      if (phonCompactQ.length >= 3 && !/[০-৯]/.test(phonCompactQ) && targetPhonCompact.indexOf(phonCompactQ) > -1) {
        return true;
      }

      if (tokens.length > 1) {
        var core = tokens.filter(function (t) { return !OPTIONAL_TITLES[t]; });
        if (core.length && core.length < tokens.length) {
          if (core.every(function (t) { return targetNorm.indexOf(t) > -1 || (t.length >= 3 && targetCompact.indexOf(t) > -1); })) {
            return true;
          }
        }
      }
      return false;
    }

    function parseVoterBlock(lines) {
      var cleanLines = lines.map(function (l) {
        return l.replace(/(?:[০-৯0-9]{1,3}\s*)?রেজিস্ট্র?েশন\s*অফিসার.*$/g, "").trim();
      }).filter(Boolean);
      if (!cleanLines.length) return null;

      var fullText = cleanLines.join("\n");
      var sm = /^([০-৯0-9]{1,5})\s*\./.exec(fullText);
      if (!sm) return null;

      var sl = n2bn(sm[1]);

      if (/মাইগ্রেট/.test(fullText) && !/ভোটার\s*নং/.test(fullText)) {
        return {
          sl: sl, name: "মাইগ্রেট হয়েছে", vno: "", father: "", mother: "",
          occ: "", dob: "", addr: ""
        };
      }

      var v = { sl: sl, name: "", vno: "", father: "", mother: "", occ: "", dob: "", addr: "" };
      var lastKey = "";

      for (var i = 0; i < cleanLines.length; i++) {
        var line = cleanLines[i];
        var m;
        if ((m = /^[০-৯0-9]{1,5}\s*\.\s*(?:নাম\s*[:ঃ]\s*)?(.*)$/.exec(line))) {
          v.name = polishBengaliText(m[1]);
          lastKey = "name";
        } else if ((m = /^নাম\s*[:ঃ]\s*(.*)$/.exec(line))) {
          v.name = polishBengaliText(m[1]);
          lastKey = "name";
        } else if ((m = /^ভোটার\s*নং\s*[:ঃ]?\s*(.*)$/.exec(line))) {
          v.vno = n2bn(m[1].replace(/\s+/g, ""));
          lastKey = "vno";
        } else if ((m = /^(?:পিতা\s*\/\s*স্বামী|স্বামী\s*\/\s*পিতা|স্বামী|পিতা)\s*[:ঃ]\s*(.*)$/.exec(line))) {
          v.father = polishBengaliText(m[1]);
          if (/স্বামী/.test(line)) v.fLbl = "পিতা/স্বামী:";
          lastKey = "father";
        } else if ((m = /^মাতা\s*[:ঃ]\s*(.*)$/.exec(line))) {
          v.mother = polishBengaliText(m[1]);
          lastKey = "mother";
        } else if ((m = /^পেশা\s*[:ঃ]\s*(.*?)\s*,?\s*জন্ম\s*তারিখ\s*[:ঃ]?\s*(.*)$/.exec(line))) {
          v.occ = polishBengaliText(m[1].replace(/,\s*$/, ""));
          v.dob = n2bn(m[2].replace(/\s+/g, ""));
          lastKey = "dob";
        } else if ((m = /^পেশা\s*[:ঃ]\s*(.*)$/.exec(line))) {
          v.occ = polishBengaliText(m[1]);
          lastKey = "occ";
        } else if ((m = /^জন্ম\s*তারিখ\s*[:ঃ]?\s*(.*)$/.exec(line))) {
          v.dob = n2bn(m[1].replace(/\s+/g, ""));
          lastKey = "dob";
        } else if ((m = /^ঠিকানা\s*[:ঃ]\s*(.*)$/.exec(line))) {
          v.addr = polishBengaliText(m[1]);
          lastKey = "addr";
        } else if (lastKey && lastKey !== "vno" && lastKey !== "dob") {
          v[lastKey] = polishBengaliText((v[lastKey] ? v[lastKey] + " " : "") + line);
        }
      }

      var flat = cleanLines.join(" \n ");
      var m2;
      if (!v.name && (m2 = /নাম\s*[:ঃ]\s*([^\n]+?)(?=\s*\n|\s*ভোটার\s*নং|$)/.exec(flat))) {
        v.name = polishBengaliText(m2[1]);
      }
      if (!v.vno && (m2 = /ভোটার\s*নং\s*[:ঃ]?\s*([০-৯0-9]+)/.exec(fullText))) {
        v.vno = n2bn(m2[1]);
      }
      if (!v.father && (m2 = /(?:পিতা\s*\/\s*স্বামী|স্বামী\s*\/\s*পিতা|স্বামী|পিতা)\s*[:ঃ]\s*([^\n]+?)(?=\s*\n|\s*মাতা\s*[:ঃ]|$)/.exec(flat))) {
        v.father = polishBengaliText(m2[1]);
        if (/স্বামী/.test(m2[0])) v.fLbl = "পিতা/স্বামী:";
      }
      if (!v.fLbl && /গৃহিণী|গৃহিনী|ছাত্রী/.test(v.occ || "")) {
        v.fLbl = "পিতা/স্বামী:";
      }
      if (!v.mother && (m2 = /মাতা\s*[:ঃ]\s*([^\n]+?)(?=\s*\n|\s*পেশা\s*[:ঃ]|$)/.exec(flat))) {
        v.mother = polishBengaliText(m2[1]);
      }
      if (!v.dob && (m2 = /জন্ম\s*তারিখ\s*[:ঃ]?\s*([০-৯0-9\/\-\.]+)/.exec(fullText))) {
        v.dob = n2bn(m2[1]);
      }
      if (!v.addr) {
        var addrIdx = fullText.search(/ঠিকানা\s*[:ঃ]/);
        if (addrIdx !== -1) {
          v.addr = polishBengaliText(fullText.slice(addrIdx).replace(/^ঠিকানা\s*[:ঃ]\s*/, "").replace(/\n+/g, " "));
        }
      }

      v.addr = v.addr
        .replace(/^(?:[.,।:\-\s]+)/, "")
        .replace(/\s+,/g, ",")
        .replace(/,\s*,+/g, ",")
        .trim();

      if (!v.name && !v.vno) return null;
      return v;
    }

    function parse(pages) {
      var info = {};
      var coverText = "";
      var allVoters = [];

      for (var p = 0; p < pages.length; p++) {
        var items = (pages[p] || []).filter(function (it) {
          if (!it || !it.s) return false;
          if (Math.abs(it.r1 || 0) > 0.45 || Math.abs(it.r2 || 0) > 0.45) return false;
          return true;
        });
        if (!items.length) continue;

        var sample = items.map(function (it) { return it.s; }).join(" ");
        var mode = detectMode(sample);

        var cleanItems = items.filter(function (it) {
          var txt = it.s.trim();
          if (!txt) return true;
          var dec = decode(txt, mode);
          if (p > 0 && /^চূড়ান্ত\s*ভোটার\s*তালিকা$/.test(dec)) return false;
          return true;
        });

        var serialItems = [];
        var vnoItems = [];
        var labelItems = [];

        for (var i = 0; i < cleanItems.length; i++) {
          var it = cleanItems[i];
          var raw = it.s.trim();
          if (!raw) continue;
          if (/^[০-৯0-9]{1,5}\./.test(raw)) serialItems.push(it);
          var dec = decode(raw, mode);
          if (/ভোটার\s*নং/.test(dec)) vnoItems.push(it);
          if (/^(?:ভোটার\s*নং|(?:পিতা\s*\/\s*স্বামী|স্বামী\s*\/\s*পিতা|স্বামী|পিতা)\s*[:ঃ]|মাতা\s*[:ঃ]|ঠিকানা\s*[:ঃ]|পেশা\s*[:ঃ])/.test(dec)) {
            labelItems.push(it);
          }
        }

        if (!vnoItems.length && serialItems.length < 2) {
          var cLines = assembleLines(cleanItems, mode);
          coverText += "\n" + cLines.join("\n");
          extractHeaderMeta(cLines, info);
          continue;
        }

        var maxGridY = 0;
        serialItems.forEach(function (it) { if (it.y > maxGridY) maxGridY = it.y; });
        vnoItems.forEach(function (it) { if (it.y + 26 > maxGridY) maxGridY = it.y + 26; });

        var headerItems = [];
        var gridItems = [];
        for (var k = 0; k < cleanItems.length; k++) {
          var gi = cleanItems[k];
          if (gi.y > maxGridY + 14) {
            headerItems.push(gi);
          } else {
            if (gi.y < 34) {
              var gd = decode(gi.s.trim(), mode);
              if (/^[০-৯0-9]{1,4}$/.test(gd) || /রেজিস্ট্র?েশন\s*অফিসার/.test(gd)) continue;
            }
            gridItems.push(gi);
          }
        }

        if (headerItems.length) {
          var hLines = assembleLines(headerItems, mode);
          extractHeaderMeta(hLines, info);
        }

        var anchors = labelItems.length >= 2 ? labelItems : serialItems;
        var xs = anchors.map(function (it) { return it.x; }).sort(function (a, b) { return a - b; });
        var clusters = [];
        xs.forEach(function (x) {
          var found = null;
          for (var c = 0; c < clusters.length; c++) {
            if (Math.abs(clusters[c].avg - x) < 42) { found = clusters[c]; break; }
          }
          if (found) {
            found.sum += x; found.cnt++; found.avg = found.sum / found.cnt;
          } else {
            clusters.push({ sum: x, cnt: 1, avg: x });
          }
        });
        var strong = clusters.filter(function (c) { return c.cnt >= 2; }).sort(function (a, b) { return a.avg - b.avg; });
        var colStarts = (strong.length ? strong : clusters.sort(function (a, b) { return a.avg - b.avg; })).map(function (c) { return c.avg; });
        if (!colStarts.length) colStarts = [0];

        var boundaries = [];
        for (var b = 1; b < colStarts.length; b++) boundaries.push(colStarts[b] - 12);

        var cols = [];
        for (var ci = 0; ci <= boundaries.length; ci++) cols.push([]);

        gridItems.forEach(function (it) {
          var idx = 0;
          for (var bi = 0; bi < boundaries.length; bi++) {
            if (it.x >= boundaries[bi]) idx = bi + 1;
          }
          cols[idx].push(it);
        });

        cols.forEach(function (colItems) {
          var lines = assembleLines(colItems, mode);
          var blocks = [];
          var curBlock = null;

          for (var li = 0; li < lines.length; li++) {
            var line = lines[li];
            if (/^[০-৯0-9]{1,4}$/.test(line) || /^(?:[০-৯0-9]{1,4}\s*)?রেজিস্ট্র?েশন\s*অফিসার/.test(line)) continue;
            if (/^[০-৯0-9]{1,5}\s*\./.test(line)) {
              if (curBlock) blocks.push(curBlock);
              curBlock = [line];
            } else if (curBlock) {
              curBlock.push(line);
            }
          }
          if (curBlock) blocks.push(curBlock);

          blocks.forEach(function (bl) {
            var v = parseVoterBlock(bl);
            if (v) allVoters.push(v);
          });
        });
      }

      var m;
      if (!info.area && (m = /ভোটার\s*এলাকা\s+([^\n]+)/.exec(coverText))) {
        var cand = m[1].replace(/^[:ঃ\s]+/, "").trim();
        if (cand && !/^নম্বর/.test(cand)) info.area = cand.split(/\s+সর্বমোট/)[0].trim();
      }
      if (!info.union && (m = /ক্যান্টনমেন্ট\s*বোর্ড\s*\n\s*([^\n]+)/.exec(coverText))) {
        info.union = m[1].trim();
      }
      if (!info.gender) {
        if (/\(\s*পুরুষ\s*\)/.test(coverText)) info.gender = "পুরুষ";
        else if (/\(\s*মহিলা\s*\)/.test(coverText)) info.gender = "মহিলা";
        else if (/\(\s*হিজড়া\s*\)/.test(coverText)) info.gender = "হিজড়া";
      }
      if (info.gender === "মহিলা") {
        allVoters.forEach(function (v) { v.fLbl = "পিতা/স্বামী:"; });
      }

      return { info: info, voters: allVoters };
    }

    return { decode: decode, parse: parse, n2bn: n2bn, bn2n: bn2n, matchesQuery: matchesQuery };
  })();

  // =========================================================================
  // মূল ভোটার স্লিপ টুল কন্ট্রোলার
  // =========================================================================
  (function () {
    var root = document.getElementById("vslip");
    if (!root) return;

    var n2bn = VSCore.n2bn;
    var S = { voters: [], info: {}, view: [], pg: 0, PS: 25, img: { photo: "", symbol: "" }, tpl: "1", pdfCancel: false, apiUnlocked: false };
    var fontUrl = "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;600;700&display=swap";

    try {
      var lk = document.createElement("link");
      lk.rel = "stylesheet";
      lk.href = fontUrl;
      document.head.appendChild(lk);
    } catch (err) {}

    var demoVoter = {
      sl: "০০১", vno: "১৯৯৯০০০০০০০০১", name: "ভোটারের নাম",
      father: "পিতার নাম", mother: "মাতার নাম", occ: "পেশা",
      dob: "০১/০১/১৯৯০", addr: "গ্রাম, ইউনিয়ন, উপজেলা, জেলা"
    };

    var pTimer = 0;
    var toastTimer = 0;

    function qs(sel, ctx) { return (ctx || root).querySelector(sel); }
    function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || root).querySelectorAll(sel)); }
    function esc(v) {
      return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    function showToast(msg) {
      var t = document.getElementById("vs-toast");
      if (!t) return;
      t.textContent = msg;
      t.style.display = "block";
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { t.style.display = "none"; }, 2800);
    }

    // =========================================================================
    // API Key ভেরিফিকেশন ও লক/আনলক লজিক (localStorage + Cookie + !important)
    // =========================================================================
    function getValidApiKeys() {
      return (typeof window.VS_VALID_API_KEYS !== "undefined" && window.VS_VALID_API_KEYS && window.VS_VALID_API_KEYS.length)
        ? window.VS_VALID_API_KEYS
        : [];
    }

    function getApiStorageName() {
      return (typeof window.VS_API_STORAGE_KEY === "string" && window.VS_API_STORAGE_KEY)
        ? window.VS_API_STORAGE_KEY
        : "vslip_lifetime_api_key_v1";
    }

    function setApiCookie(name, value) {
      try {
        var d = new Date();
        d.setTime(d.getTime() + (3650 * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
      } catch (e) {}
    }

    function getApiCookie(name) {
      try {
        var prefix = name + "=";
        var parts = document.cookie.split(";");
        for (var i = 0; i < parts.length; i++) {
          var c = parts[i].trim();
          if (c.indexOf(prefix) === 0) return decodeURIComponent(c.substring(prefix.length));
        }
      } catch (e) {}
      return "";
    }

    function cleanApiKeyStr(key) {
      return String(key || "").replace(/[\s\u200B-\u200D\uFEFF]/g, "").toUpperCase();
    }

    function isValidApiKey(key) {
      var cleaned = cleanApiKeyStr(key);
      if (!cleaned) return false;
      var keys = getValidApiKeys();
      for (var i = 0; i < keys.length; i++) {
        if (cleanApiKeyStr(keys[i]) === cleaned) return true;
      }
      return false;
    }

    function isApiUnlocked() {
      if (S.apiUnlocked) return true;
      var sName = getApiStorageName();
      try {
        var savedLS = localStorage.getItem(sName);
        if (isValidApiKey(savedLS)) {
          S.apiUnlocked = true;
          return true;
        }
      } catch (err) {}
      var savedCK = getApiCookie(sName);
      if (isValidApiKey(savedCK)) {
        S.apiUnlocked = true;
        return true;
      }
      return false;
    }

    function syncApiLockUI() {
      var unlocked = isApiUnlocked();
      var lockBox = document.getElementById("vs-api-lock");
      var badge = document.getElementById("vs-api-unlocked");
      var actions = document.getElementById("vs-actions");

      if (lockBox) {
        lockBox.hidden = unlocked;
        lockBox.style.setProperty("display", unlocked ? "none" : "block", "important");
      }
      if (badge) {
        badge.hidden = true;
        badge.style.setProperty("display", "none", "important");
      }
      if (actions) {
        actions.hidden = !unlocked;
        actions.style.setProperty("display", unlocked ? "flex" : "none", "important");
      }
    }

    function verifyUserApiKey() {
      var inp = document.getElementById("vs-api-input");
      var errEl = document.getElementById("vs-api-err");
      if (!inp) return;
      var val = cleanApiKeyStr(inp.value);
      if (!val) {
        if (errEl) {
          errEl.textContent = "অনুগ্রহ করে আপনার API Key লিখুন বা পেস্ট করুন।";
          errEl.style.display = "block";
        }
        return;
      }
      if (isValidApiKey(val)) {
        var sName = getApiStorageName();
        S.apiUnlocked = true;
        try { localStorage.setItem(sName, val); } catch (err) {}
        setApiCookie(sName, val);
        if (errEl) errEl.style.display = "none";
        syncApiLockUI();
        showToast("✔ অভিনন্দন! লাইফটাইম API Key অ্যাক্টিভেট হয়েছে।");
      } else {
        if (errEl) {
          errEl.textContent = "✖ ভুল API Key! অনুগ্রহ করে সঠিক API Key দিন অথবা ১৫০ টাকায় নতুন API Key সংগ্রহ করুন।";
          errEl.style.display = "block";
        }
        showToast("ভুল API Key! সঠিক কী দিন।");
      }
    }

    function getCfg() {
      var c = {};
      qsa("[data-k]").forEach(function (el) {
        c[el.getAttribute("data-k")] = el.type === "checkbox" ? el.checked : el.value;
      });
      c.tpl = S.tpl;
      return c;
    }

    function imgTag(src) { return src ? '<img alt="" src="' + src + '">' : ""; }

    function renderSlip(v, c, isPrev) {
      var cn = c.name ? esc(c.name) : (isPrev ? '<span style="color:#aaa">প্রার্থীর নাম</span>' : "");
      var o = c.sym ? c.sym + " মার্কায় ভোট দিন" : (isPrev ? "… মার্কায় ভোট দিন" : "");
      var ph = S.img.photo ? imgTag(S.img.photo) : (isPrev ? "<i>প্রার্থীর<br>ছবি</i>" : "");
      var sy = S.img.symbol ? imgTag(S.img.symbol) : (isPrev ? "<i>মার্কার<br>ছবি</i>" : "");
      var dt = c.date ? "ভোটের তারিখ: " + c.date : "";
      var ct = c.center ? "ভোটকেন্দ্র: " + c.center : "";

      var rows = [];
      function addRow(lbl, val, cls) {
        if (val) rows.push('<div class="vr' + (cls ? " " + cls : "") + '"><b>' + lbl + '</b><span class="fit">' + esc(val) + "</span></div>");
      }
      var hasSl = c.s_sl && v.sl;
      var hasVno = c.s_vno && v.vno;
      if (hasSl && hasVno) {
        rows.push('<div class="vr"><b class="a">ক্র. নং: ' + esc(v.sl) + '</b><b class="a">|</b><b>ভোটার নং:</b><span class="fit">' + esc(v.vno) + "</span></div>");
      } else if (hasSl) addRow("ক্রমিক নং:", v.sl);
      else if (hasVno) addRow("ভোটার নং:", v.vno);

      if (c.s_name) addRow("নাম:", v.name, "nm");
      if (c.s_father) addRow(v.fLbl || (S.info && S.info.gender === "মহিলা" ? "পিতা/স্বামী:" : "পিতা:"), v.father);
      if (c.s_mother) addRow("মাতা:", v.mother);

      var extra = [];
      if (c.s_occ && v.occ) extra.push("পেশা: " + v.occ);
      if (c.s_dob && v.dob) extra.push("জন্ম তারিখ: " + v.dob);
      if (extra.length) rows.push('<div class="vr"><span class="fit">' + esc(extra.join("   |   ")) + "</span></div>");

      if (c.s_addr) addRow("ঠিকানা:", v.addr);
      if (c.s_area && c.area) addRow("ভোটার এলাকা:", c.area);

      return '<div class="vs-slip vs-t' + c.tpl + '" style="--ac:' + esc(c.color) + ";--ac2:" + esc(c.color2) + ";font-size:calc(8.6pt*" + c.fs / 100 + ')">' +
        '<div class="hd"><span class="fit">' + esc(c.title) + '</span></div>' +
        '<div class="cand"><div class="ph">' + ph + '</div><div class="mid"><div class="cn fit">' + cn + '</div><div class="cp fit">' + esc(c.pos) + '</div><div class="vt fit">' + esc(o) + '</div><div class="sl fitbox">' + esc(c.slogan) + '</div></div><div class="sy">' + sy + '</div></div>' +
        '<div class="vb fitbox">' + rows.join("") + '</div>' +
        '<div class="ft fitbox">' + (ct || dt ? '<div class="fr">' + (ct ? '<span class="fit">' + esc(ct) + "</span>" : "") + (dt ? '<span class="fit">' + esc(dt) + "</span>" : "") + "</div>" : "") + (c.appeal ? '<div class="ap">' + esc(c.appeal) + "</div>" : "") + "</div></div>";
    }

    function renderSinglePageHtml(pageVoters, c, isPrev) {
      var m = Math.max(0, Math.min(12, parseFloat(c.margin) || 0));
      var sc = Math.min((210 - 2 * m) / 210, (297 - 2 * m) / 297);
      var cells = "";
      for (var j = 0; j < pageVoters.length; j++) {
        cells += '<div class="vs-cell">' + renderSlip(pageVoters[j], c, isPrev) + "</div>";
      }
      return '<div class="vs-page' + (c.cut ? " cut" : "") + '" style="--m:' + m + "mm;--s:" + sc + '"><div class="vs-pin">' + cells + "</div></div>";
    }

    function renderPages(list, c, isPrev) {
      var pages = [];
      for (var i = 0; i < list.length; i += 8) {
        pages.push(renderSinglePageHtml(list.slice(i, i + 8), c, isPrev));
      }
      return pages.join("");
    }

    // Ultra-Fast O(N) Single-Pass Text Fit
    function fitAll(scopeEl, viewWin) {
      var win = viewWin || (scopeEl.ownerDocument ? scopeEl.ownerDocument.defaultView : window) || window;
      var fits = scopeEl.querySelectorAll(".vs-slip .fit");
      for (var i = 0; i < fits.length; i++) {
        var el = fits[i];
        el.style.whiteSpace = "nowrap";
        el.style.fontSize = "";
        var cw = el.clientWidth;
        var sw = el.scrollWidth;
        if (cw && sw > cw + 1) {
          var ratio = Math.floor((cw / sw) * 98);
          if (ratio >= 60) {
            el.style.fontSize = ratio + "%";
          } else {
            el.style.whiteSpace = "normal";
            el.style.fontSize = "82%";
          }
        }
      }
      var boxes = scopeEl.querySelectorAll(".vs-slip .fitbox");
      for (var k = 0; k < boxes.length; k++) {
        var b = boxes[k];
        b.style.fontSize = "";
        var ch = b.clientHeight;
        var sh = b.scrollHeight;
        if (ch && sh > ch + 1) {
          var cur = parseFloat(win.getComputedStyle(b).fontSize) || 11;
          var est = Math.max(cur * 0.55, cur * Math.sqrt(ch / sh) * 0.96);
          b.style.fontSize = est.toFixed(1) + "px";
          if (b.scrollHeight > ch + 1 && est > cur * 0.52) {
            b.style.fontSize = (est * 0.92).toFixed(1) + "px";
          }
        }
      }
    }

    function selectedVoters() {
      return S.voters.filter(function (v) { return v.sel; });
    }

    // Centered Full-Width Responsive Preview Scaling
    function scalePreview() {
      var box = qs("#vs-prev-box");
      var wrap = qs("#vs-scale-wrap");
      var sc = qs("#vs-scale");
      if (!box || !wrap || !sc || box.clientWidth <= 20) return;
      var pad = window.innerWidth <= 640 ? 16 : 28;
      var availW = box.clientWidth - pad;
      var baseW = sc.offsetWidth || 793.7;
      var r = Math.min(1.16, availW / baseW);
      sc.style.transform = "scale(" + r + ")";
      wrap.style.width = Math.round(baseW * r) + "px";
      wrap.style.height = Math.round(sc.offsetHeight * r) + "px";
    }

    function refreshPreviewLayout() {
      fitAll(qs("#vs-scale"), window);
      scalePreview();
    }

    function schedulePreview() {
      clearTimeout(pTimer);
      pTimer = setTimeout(function () {
        var c = getCfg();
        var sel = selectedVoters();
        var isEmpty = !S.voters.length;
        var list = isEmpty ? [demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter] : sel.slice(0, 16);
        qs("#vs-scale").innerHTML = renderPages(list, c, true);

        refreshPreviewLayout();
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshPreviewLayout);

        var cnt = sel.length;
        var pgs = Math.ceil(cnt / 8);
        qs("#vs-pcount").textContent = isEmpty ? "(নমুনা — PDF লোড হয়নি)" : "(" + n2bn(cnt) + " টি স্লিপ, " + n2bn(pgs) + " পাতা)";
        qs("#vs-pnote").textContent = isEmpty
          ? "এটি নমুনা প্রিভিউ। ওপরে PDF আপলোড করলে আসল ভোটারদের স্লিপ দেখাবে।"
          : (cnt > 16 ? "প্রিভিউতে প্রথম ২ পাতা দেখানো হচ্ছে। প্রিন্ট বা PDF ডাউনলোডে নির্বাচিত সব " + n2bn(cnt) + " টি স্লিপ (" + n2bn(pgs) + " পাতা) আসবে।" : "সব " + n2bn(cnt) + " টি স্লিপ প্রিভিউতে দেখানো হচ্ছে।");

        try { localStorage.setItem("vslip_cfg", JSON.stringify(c)); } catch (err) {}
      }, 90);
    }

    // Blazing-Fast Instant Print Engine (Protected by API Key)
    function doPrint() {
      if (!isApiUnlocked()) {
        syncApiLockUI();
        showToast("প্রিন্ট করতে প্রথমে সঠিক API Key দিয়ে অ্যাক্টিভেট করুন।");
        return;
      }

      var sel = selectedVoters();
      var c = getCfg();
      var list = sel.length ? sel : (S.voters.length ? [] : [demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter]);
      if (!list.length) {
        showToast("প্রিন্টের জন্য কোনো ভোটার নির্বাচিত নেই।");
        return;
      }

      var printBtn = qs("#vs-print");
      var origBtnHtml = printBtn.innerHTML;
      printBtn.disabled = true;
      printBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> প্রিন্ট প্রস্তুত হচ্ছে…';

      setTimeout(function () {
        var old = document.getElementById("vs-frame");
        if (old && old.parentNode) old.parentNode.removeChild(old);

        var ifr = document.createElement("iframe");
        ifr.id = "vs-frame";
        ifr.setAttribute("style", "position:fixed;left:-99999px;top:0;width:210mm;height:297mm;border:0;opacity:0;pointer-events:none");
        document.body.appendChild(ifr);

        var doc = ifr.contentWindow.document;
        var slipCss = document.getElementById("vs-slipcss").textContent;
        doc.open();
        doc.write('<!doctype html><html><head><meta charset="utf-8"><title>ভোটার স্লিপ</title><link rel="stylesheet" href="' + fontUrl + '"><style>@page{size:A4;margin:0}html,body{margin:0;padding:0;background:#fff}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}' + slipCss + "</style></head><body>" + renderPages(list, c, false) + "</body></html>");
        doc.close();

        var printed = false;
        function firePrint() {
          if (printed) return;
          printed = true;
          try { fitAll(doc, ifr.contentWindow); } catch (err) {}
          printBtn.disabled = false;
          printBtn.innerHTML = origBtnHtml;
          try {
            ifr.contentWindow.focus();
            ifr.contentWindow.print();
          } catch (err) {
            showToast("প্রিন্ট শুরু করা যায়নি: " + err.message);
          }
        }

        var fts = doc.fonts;
        var waitFonts = fts && fts.ready ? Promise.race([fts.ready, new Promise(function (r) { setTimeout(r, 450); })]) : Promise.resolve();
        waitFonts.then(function () { setTimeout(firePrint, 60); });
        setTimeout(firePrint, 800);
      }, 25);
    }

    // Load jsPDF + html2canvas on demand for Direct PDF Download
    function loadPdfExportLibs() {
      function loadScript(src, checkFn) {
        return new Promise(function (res, rej) {
          if (checkFn()) return res();
          var s = document.createElement("script");
          s.src = src;
          s.onload = res;
          s.onerror = function () { rej(new Error("লাইব্রেরি লোড হয়নি")); };
          document.head.appendChild(s);
        });
      }
      return Promise.all([
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", function () { return !!(window.jspdf && window.jspdf.jsPDF) || !!window.jsPDF; }),
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", function () { return typeof window.html2canvas === "function"; })
      ]);
    }

    // Direct High-Quality A4 PDF Download Engine (Protected by API Key)
    function doDownloadPdf() {
      if (!isApiUnlocked()) {
        syncApiLockUI();
        showToast("PDF ডাউনলোড করতে প্রথমে সঠিক API Key দিয়ে অ্যাক্টিভেট করুন।");
        return;
      }

      var sel = selectedVoters();
      var c = getCfg();
      var list = sel.length ? sel : (S.voters.length ? [] : [demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter, demoVoter]);
      if (!list.length) {
        showToast("PDF ডাউনলোডের জন্য কোনো ভোটার নির্বাচিত নেই।");
        return;
      }

      var totalPgs = Math.ceil(list.length / 8);
      var dlBtn = qs("#vs-dl-pdf");
      var prBtn = qs("#vs-print");
      var progBox = qs("#vs-pdf-prog");
      var progBar = qs("#vs-pdf-bar");
      var progTxt = qs("#vs-pdf-ptxt");

      S.pdfCancel = false;
      dlBtn.disabled = true;
      prBtn.disabled = true;
      progBox.hidden = false;
      progBar.style.width = "3%";
      progTxt.textContent = "PDF ইঞ্জিন প্রস্তুত হচ্ছে…";

      loadPdfExportLibs().then(function () {
        var JsPDFClass = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : window.jsPDF;
        var pdf = new JsPDFClass("p", "mm", "a4");

        var stage = document.createElement("div");
        stage.setAttribute("style", "position:fixed;left:-99999px;top:0;width:210mm;background:#fff;z-index:-1;");
        document.body.appendChild(stage);

        function cleanup() {
          if (stage && stage.parentNode) stage.parentNode.removeChild(stage);
          dlBtn.disabled = false;
          prBtn.disabled = false;
          progBox.hidden = true;
        }

        function renderNextPdfPage(pgIdx) {
          if (S.pdfCancel) {
            cleanup();
            showToast("PDF ডাউনলোড বাতিল করা হয়েছে।");
            return;
          }
          if (pgIdx >= totalPgs) {
            var safeName = (c.name || "voter_slips").replace(/\s+/g, "_").substring(0, 30);
            pdf.save("voter_slips_" + safeName + ".pdf");
            cleanup();
            showToast("✔ " + n2bn(totalPgs) + " পাতার PDF সফলভাবে ডাউনলোড হয়েছে!");
            return;
          }

          var pct = Math.round(((pgIdx + 1) / totalPgs) * 100);
          progBar.style.width = pct + "%";
          progTxt.textContent = "অপেক্ষা করুন.. পিডিএফ তৈরি হচ্ছে: পাতা " + n2bn(pgIdx + 1) + " / " + n2bn(totalPgs) + " (" + n2bn(pct) + "%)";

          var chunk = list.slice(pgIdx * 8, (pgIdx + 1) * 8);
          stage.innerHTML = renderSinglePageHtml(chunk, c, false);
          fitAll(stage, window);

          var pageNode = stage.firstElementChild;
          setTimeout(function () {
            window.html2canvas(pageNode, {
              scale: 2,
              useCORS: true,
              allowTaint: true,
              backgroundColor: "#ffffff",
              logging: false
            }).then(function (canvas) {
              if (pgIdx > 0) pdf.addPage("a4", "p");
              var imgData = canvas.toDataURL("image/jpeg", 0.94);
              pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
              renderNextPdfPage(pgIdx + 1);
            }).catch(function (err) {
              cleanup();
              showToast("PDF তৈরি করতে সমস্যা হয়েছে: " + (err && err.message ? err.message : ""));
            });
          }, 15);
        }

        renderNextPdfPage(0);
      }).catch(function (err) {
        dlBtn.disabled = false;
        prBtn.disabled = false;
        progBox.hidden = true;
        showToast("PDF লাইব্রেরি লোড হয়নি। ইন্টারনেট সংযোগ চেক করুন।");
      });
    }

    function handleImage(file, key) {
      if (!file) return;
      var url = URL.createObjectURL(file);
      var im = new Image();
      im.onload = function () {
        var maxDim = key === "photo" ? 700 : 600;
        var sc = Math.min(1, maxDim / Math.max(im.width, im.height));
        var cv = document.createElement("canvas");
        cv.width = Math.round(im.width * sc);
        cv.height = Math.round(im.height * sc);
        var ctx = cv.getContext("2d");
        if (key === "photo") {
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, cv.width, cv.height);
        }
        ctx.drawImage(im, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        var dataUrl = cv.toDataURL(key === "photo" ? "image/jpeg" : "image/png", 0.92);
        setImg(key, dataUrl);
      };
      im.onerror = function () {
        URL.revokeObjectURL(url);
        showToast("ছবিটি পড়া যায়নি। JPG/PNG ফাইল দিন।");
      };
      im.src = url;
    }

    function setImg(key, src) {
      S.img[key] = src;
      var th = qs("#vs-" + key + "-th");
      var clr = qs("#vs-" + key + "-clr");
      if (src) {
        th.innerHTML = '<img alt="" src="' + src + '">';
        if (clr) clr.style.display = "inline-flex";
      } else {
        th.innerHTML = key === "photo"
          ? '<i class="fa-solid fa-user-tie vs-media-empty-ic"></i>'
          : '<i class="fa-solid fa-award vs-media-empty-ic"></i>';
        if (clr) clr.style.display = "none";
      }
      schedulePreview();
    }

    function setProg(pct, txt) {
      qs("#vs-prog").hidden = false;
      qs("#vs-bar").style.width = pct + "%";
      qs("#vs-ptxt").textContent = txt;
    }

    function loadPdfJs() {
      var libUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      var workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      return new Promise(function (res, rej) {
        if (window.pdfjsLib) return res();
        var sc = document.createElement("script");
        sc.src = libUrl;
        sc.onload = res;
        sc.onerror = function () { rej(new Error("PDF রিডার লোড হয়নি। ইন্টারনেট সংযোগ চেক করুন।")); };
        document.head.appendChild(sc);
      }).then(function () {
        if (pdfjsLib.GlobalWorkerOptions.workerSrc) return;
        return fetch(workerUrl)
          .then(function (r) { if (!r.ok) throw new Error("worker"); return r.text(); })
          .then(function (code) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
          })
          .catch(function () {
            pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
          });
      });
    }

    function clearLoadedPdf() {
      S.voters = [];
      S.info = {};
      S.view = [];
      S.pg = 0;
      qs("#vs-q").value = "";
      qs("#vs-prog").hidden = true;
      qs("#vs-report").hidden = true;
      renderTable();
      schedulePreview();
      showToast("ভোটার তালিকা মুছে ফেলা হয়েছে।");
    }

    function handlePdfFiles(fileList) {
      var files = [];
      if (fileList && fileList.length) {
        for (var i = 0; i < fileList.length; i++) files.push(fileList[i]);
      } else if (fileList && fileList.name) {
        files.push(fileList);
      }
      if (!files.length) return;

      var rep = qs("#vs-report");
      rep.hidden = true;
      setProg(3, "PDF রিডার লোড হচ্ছে…");

      loadPdfJs().then(function () {
        var combinedVoters = [];
        var firstInfo = null;
        var multi = files.length > 1;

        function nextFile(fIdx) {
          if (fIdx >= files.length) {
            return { info: firstInfo || {}, voters: combinedVoters, multi: multi };
          }
          var f = files[fIdx];
          setProg(5, (multi ? "[" + n2bn(fIdx + 1) + "/" + n2bn(files.length) + "] " : "") + f.name + " লোড হচ্ছে…");

          return f.arrayBuffer().then(function (buf) {
            return pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
          }).then(function (doc) {
            var pages = [];
            var numPages = doc.numPages;

            function nextPage(pNum) {
              if (pNum > numPages) return pages;
              var pct = 5 + Math.round((90 * ((fIdx + pNum / numPages) / files.length)));
              setProg(pct, (multi ? "[" + n2bn(fIdx + 1) + "/" + n2bn(files.length) + "] " : "") + "পাতা " + n2bn(pNum) + " / " + n2bn(numPages) + " পড়া হচ্ছে…");
              return doc.getPage(pNum).then(function (pg) {
                return pg.getTextContent();
              }).then(function (tc) {
                pages.push(tc.items.map(function (it) {
                  return {
                    s: it.str,
                    x: it.transform[4],
                    y: it.transform[5],
                    w: it.width || 0,
                    fs: Math.abs(it.transform[0]) || Math.abs(it.transform[3]) || 9.5,
                    r1: it.transform[1] || 0,
                    r2: it.transform[2] || 0
                  };
                }));
                return new Promise(function (r) { setTimeout(r, 0); }).then(function () {
                  return nextPage(pNum + 1);
                });
              });
            }

            return nextPage(1);
          }).then(function (pages) {
            var parsed = VSCore.parse(pages);
            if (!firstInfo) firstInfo = parsed.info;
            parsed.voters.sort(function (a, b) { return VSCore.bn2n(a.sl) - VSCore.bn2n(b.sl); });
            combinedVoters = combinedVoters.concat(parsed.voters);
            return nextFile(fIdx + 1);
          });
        }

        return nextFile(0);
      }).then(function (res) {
        if (!res.voters.length) {
          setProg(100, "");
          throw new Error("এই PDF-এ ভোটারের তথ্য পাওয়া যায়নি। এটি নির্বাচন কমিশনের টেক্সট-যুক্ত ভোটার তালিকা কিনা দেখুন।");
        }

        res.voters.forEach(function (v) { v.sel = true; });

        S.voters = res.voters;
        S.info = res.info;
        S.pg = 0;

        var areaEl = qs("[data-k=area]");
        var info = res.info || {};
        var parts = [];
        if (info.area) parts.push(info.area + (info.areaNo ? " (" + info.areaNo + ")" : ""));
        if (info.ward) parts.push("ওয়ার্ড নং-" + info.ward);
        if (info.union) parts.push(info.union);
        if (info.upazila) parts.push(info.upazila);
        if (parts.length) areaEl.value = parts.join(", ");

        setProg(100, "সম্পন্ন: মোট " + n2bn(res.voters.length) + " জন ভোটারের তথ্য পাওয়া গেছে।");

        rep.hidden = false;
        rep.className = "vs-rep";

        var metaHtml = [
          ["জেলা", info.district],
          ["উপজেলা/থানা", info.upazila],
          ["ইউনিয়ন/ওয়ার্ড", info.union],
          ["ওয়ার্ড নং", info.ward],
          ["ভোটার এলাকা", info.area],
          ["এলাকার কোড/নং", info.areaNo],
          ["তালিকা", res.multi ? n2bn(files.length) + " টি PDF একত্রে" : (info.gender ? info.gender + " ভোটার" : "")]
        ].filter(function (pair) { return pair[1]; }).map(function (pair) {
          return "<span><b>" + pair[0] + ":</b> " + esc(pair[1]) + "</span>";
        }).join("");

        rep.innerHTML =
          '<div class="vs-rep-top">' +
            '<div class="vs-ok">✔ মোট ' + n2bn(res.voters.length) + ' জন ভোটারের তথ্য সফলভাবে লোড হয়েছে।</div>' +
            '<button type="button" class="vs-btn s d" id="vs-clear-pdf">পিডিএফ ডিলিট করুন!</button>' +
          '</div>' +
          (metaHtml ? '<div class="meta">' + metaHtml + '</div>' : '');

        var clrBtn = qs("#vs-clear-pdf");
        if (clrBtn) clrBtn.addEventListener("click", clearLoadedPdf);

        applyFilter();
        schedulePreview();
        showToast("মোট " + n2bn(res.voters.length) + " জন ভোটার সফলভাবে লোড হয়েছে!");
      }).catch(function (err) {
        setProg(0, "");
        qs("#vs-prog").hidden = true;
        rep.hidden = false;
        rep.className = "vs-rep err";
        rep.innerHTML = '<b class="vs-warn">ত্রুটি:</b> ' + esc(err && err.message ? err.message : String(err));
      });
    }

    function applyFilter() {
      var rawQ = qs("#vs-q").value.trim();
      S.view = S.voters.filter(function (v) {
        return VSCore.matchesQuery(v, rawQ);
      });
      S.pg = Math.min(S.pg, Math.max(0, Math.ceil(S.view.length / S.PS) - 1));
      renderTable();
    }

    function renderTable() {
      var hasData = S.voters.length > 0;
      qs("#vs-empty").hidden = hasData;
      qs("#vs-tbox").hidden = !hasData;
      qs("#vs-count").textContent = hasData ? "(মোট " + n2bn(S.voters.length) + " জন, নির্বাচিত " + n2bn(selectedVoters().length) + " জন)" : "";
      if (!hasData) return;

      var start = S.pg * S.PS;
      var slice = S.view.slice(start, start + S.PS);
      var cols = ["name", "vno", "father", "mother", "occ", "dob", "addr"];
      var html = "";

      slice.forEach(function (v) {
        var idx = S.voters.indexOf(v);
        html += '<tr data-i="' + idx + '">' +
          '<td><input type="checkbox" ' + (v.sel ? "checked" : "") + ' data-sel></td>' +
          '<td class="sl">' + esc(v.sl) + "</td>" +
          cols.map(function (k) {
            var mw = k === "addr" ? 240 : (k === "dob" ? 100 : 130);
            return '<td><input type="text" data-f="' + k + '" value="' + esc(v[k]) + '" style="min-width:' + mw + 'px"></td>';
          }).join("") +
          "</tr>";
      });

      qs("#vs-tb").innerHTML = html;
      var totalPgs = Math.max(1, Math.ceil(S.view.length / S.PS));
      qs("#vs-pi").textContent = "পাতা " + n2bn(S.pg + 1) + " / " + n2bn(totalPgs) + " (" + n2bn(S.view.length) + " জন)";
    }

    try {
      var saved = JSON.parse(localStorage.getItem("vslip_cfg") || "null");
      if (saved) {
        qsa("[data-k]").forEach(function (el) {
          var k = el.getAttribute("data-k");
          if (k in saved && k !== "area") {
            if (el.type === "checkbox") el.checked = !!saved[k];
            else el.value = saved[k];
          }
        });
        if (saved.tpl) {
          S.tpl = saved.tpl;
          qsa("#vs-tpls button").forEach(function (b) {
            b.classList.toggle("on", b.getAttribute("data-t") === S.tpl);
          });
        }
      }
    } catch (err) {}

    // YouTube Popup Event Listeners
    var ytOpenBtn = qs("#vs-open-yt");
    var ytCloseBtn = document.getElementById("vs-close-yt");
    var ytModal = document.getElementById("vs-yt-modal");
    if (ytOpenBtn) ytOpenBtn.addEventListener("click", openVsYtPopup);
    if (ytCloseBtn) ytCloseBtn.addEventListener("click", closeVsYtPopup);
    if (ytModal) {
      ytModal.addEventListener("click", function (e) {
        if (e.target === ytModal) closeVsYtPopup();
      });
    }

    // API Key Event Listeners
    var apiBtn = document.getElementById("vs-api-verify");
    var apiInp = document.getElementById("vs-api-input");
    if (apiBtn) apiBtn.addEventListener("click", verifyUserApiKey);
    if (apiInp) {
      apiInp.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          verifyUserApiKey();
        }
      });
    }
    syncApiLockUI();
    window.addEventListener("load", syncApiLockUI);

    window.addEventListener("resize", scalePreview);

    var pdfIn = qs("#vs-pdf");
    var drop = qs("#vs-drop");
    pdfIn.addEventListener("change", function () { handlePdfFiles(pdfIn.files); pdfIn.value = ""; });
    ["dragenter", "dragover"].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("on"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("on"); });
    });
    drop.addEventListener("drop", function (e) {
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        handlePdfFiles(e.dataTransfer.files);
      }
    });

    qs("#vs-photo").addEventListener("change", function (e) { handleImage(e.target.files[0], "photo"); });
    qs("#vs-symbol").addEventListener("change", function (e) { handleImage(e.target.files[0], "symbol"); });

    qsa("[data-clear]").forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-clear");
        qs("#vs-" + k).value = "";
        setImg(k, "");
      });
    });

    qsa("[data-k]").forEach(function (el) {
      el.addEventListener("input", function () {
        if (el.getAttribute("data-k") === "fs") qs("#vs-fsv").textContent = n2bn(el.value) + "%";
        schedulePreview();
      });
      el.addEventListener("change", schedulePreview);
    });
    qs("#vs-fsv").textContent = n2bn(qs("[data-k=fs]").value) + "%";

    qsa("#vs-tpls button").forEach(function (b) {
      b.addEventListener("click", function () {
        S.tpl = b.getAttribute("data-t");
        qsa("#vs-tpls button").forEach(function (x) { x.classList.toggle("on", x === b); });
        schedulePreview();
      });
    });

    qs("#vs-tb").addEventListener("input", function (e) {
      var tr = e.target.closest("tr");
      var field = e.target.getAttribute("data-f");
      if (tr && field) {
        S.voters[+tr.getAttribute("data-i")][field] = e.target.value;
        schedulePreview();
      }
    });

    qs("#vs-tb").addEventListener("change", function (e) {
      if (e.target.hasAttribute("data-sel")) {
        S.voters[+e.target.closest("tr").getAttribute("data-i")].sel = e.target.checked;
        renderTable();
        schedulePreview();
      }
    });

    qs("#vs-q").addEventListener("input", function () { S.pg = 0; applyFilter(); });

    qs("#vs-all").addEventListener("click", function () {
      S.view.forEach(function (v) { v.sel = true; });
      renderTable();
      schedulePreview();
    });
    qs("#vs-none").addEventListener("click", function () {
      S.view.forEach(function (v) { v.sel = false; });
      renderTable();
      schedulePreview();
    });
    qs("#vs-range").addEventListener("click", function () {
      var from = parseInt(qs("#vs-from").value, 10) || 1;
      var to = parseInt(qs("#vs-to").value, 10) || 1e9;
      S.voters.forEach(function (v) {
        var sln = VSCore.bn2n(v.sl);
        v.sel = sln >= from && sln <= to;
      });
      renderTable();
      schedulePreview();
    });

    qs("#vs-prev").addEventListener("click", function () { if (S.pg > 0) { S.pg--; renderTable(); } });
    qs("#vs-next").addEventListener("click", function () { if ((S.pg + 1) * S.PS < S.view.length) { S.pg++; renderTable(); } });
    qs("#vs-print").addEventListener("click", doPrint);
    qs("#vs-dl-pdf").addEventListener("click", doDownloadPdf);
    qs("#vs-pdf-cancel").addEventListener("click", function () { S.pdfCancel = true; });

    schedulePreview();
    window.__vs = { S: S, handlePdf: handlePdfFiles, fitAll: fitAll, cfg: getCfg, refresh: refreshPreviewLayout, syncApi: syncApiLockUI };
  })();

  // =========================================================================
  // ব্লগার পেইজ (API Key ডেলিভারি ও কপি সিস্টেম — স্ক্রিপ্ট ১ থেকে অটো কী নেবে)
  // =========================================================================
  (function () {
    function initVsKeyDeliveryPage() {
      var displayEl = document.getElementById("vsk-display");
      var copyBtn = document.getElementById("vsk-copy-btn");
      var copyTxt = document.getElementById("vsk-copy-txt");
      if (!displayEl) return;

      var pool = (typeof window.VS_VALID_API_KEYS !== "undefined" && window.VS_VALID_API_KEYS && window.VS_VALID_API_KEYS.length)
        ? window.VS_VALID_API_KEYS
        : [];
      if (!pool.length) return;

      if (displayEl.getAttribute("data-vsk-done")) return;
      displayEl.setAttribute("data-vsk-done", "1");

      var idx = Math.floor(Math.random() * pool.length);
      try {
        var lastIdx = parseInt(localStorage.getItem("vs_last_key_idx"), 10);
        if (pool.length > 1 && idx === lastIdx) {
          idx = (idx + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
        }
        localStorage.setItem("vs_last_key_idx", String(idx));
      } catch (e) {}

      var myKey = pool[idx];

      displayEl.textContent = myKey;

      function fallbackCopy(text) {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
      }

      function markCopied() {
        if (!copyBtn || !copyTxt) return;
        copyBtn.classList.add("copied");
        copyTxt.textContent = "✔ সফলভাবে কপি হয়েছে!";
        setTimeout(function () {
          copyBtn.classList.remove("copied");
          copyTxt.textContent = "API Key কপি করুন";
        }, 2600);
      }

      if (copyBtn && !copyBtn.getAttribute("data-bound")) {
        copyBtn.setAttribute("data-bound", "1");
        copyBtn.addEventListener("click", function () {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(myKey).then(markCopied).catch(function () {
              fallbackCopy(myKey);
              markCopied();
            });
          } else {
            fallbackCopy(myKey);
            markCopied();
          }
        });
      }
    }

    initVsKeyDeliveryPage();
    window.addEventListener("load", initVsKeyDeliveryPage);
  })();


// লিংকে #open-voter-slip থাকলে অটোমেটিক ভোটার স্লিপ টুল ওপেন হবে
  if (window.location.hash === "#open-voter-slip") {
    window.addEventListener("load", function () {
      setTimeout(function () {
        if (typeof openVoterSlipModal === "function") openVoterSlipModal();
      }, 200);
    });
  }
