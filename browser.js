
// ব্রাউজার ডিরেক্টরি মোডাল অ্যাক্টিভেশন
  function openBrowserDirectoryModal() {
      setActiveMode('mode-browser-directory'); // বাটন হাইলাইট করবে
      const modal = document.getElementById('browserDirectoryModal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে [1.1.2]
          renderBrowserGrid('all'); // সব ব্রাউজার রেন্ডার করবে
      }
  }

  function closeBrowserDirectoryModal() {
      const modal = document.getElementById('browserDirectoryModal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল পুনরায় সচল হবে [1.1.2]
          document.getElementById('bdSearchInput').value = ''; // সার্চ ক্লিয়ার করবে
      }
  }

let activeBrowserCategory = 'all';

  // ==================== COMPREHENSIVE BROWSER DATABASE (64 ITEMS) ====================
  const browserDb = [
      // Category: Popular
      { name: "Google Chrome", category: "popular", engine: "Blink (Chromium)", desc: "The world's most popular web browser built by Google. Extremely fast, stable, and boasts a massive extensions ecosystem.", url: "https://www.google.com/chrome/", win: true, android: true, ios: true, linux: true },
      { name: "Microsoft Edge", category: "popular", engine: "Blink (Chromium)", desc: "A modern, highly integrated browser by Microsoft featuring built-in AI, performance optimizations, and excellent power efficiency.", url: "https://www.microsoft.com/edge", win: true, android: true, ios: true, linux: true },
      { name: "Mozilla Firefox", category: "popular", engine: "Gecko", desc: "A proud defender of the open web. Entirely free and open-source, focused on user privacy, customizability, and robust standard compliance.", url: "https://www.mozilla.org/firefox/", win: true, android: true, ios: true, linux: true },
      { name: "Apple Safari", category: "popular", engine: "WebKit", desc: "Apple's native browser. Renowned for its incredible speed, low resource consumption, and seamless integration with the macOS/iOS ecosystem.", url: "https://www.apple.com/safari/", win: false, android: false, ios: true, linux: false },
      { name: "Opera", category: "popular", engine: "Blink (Chromium)", desc: "A highly customizable browser with native features like a built-in VPN, ad-blocker, social messengers integration, and AI support.", url: "https://www.opera.com/", win: true, android: true, ios: true, linux: true },
      { name: "Brave", category: "popular", engine: "Blink (Chromium)", desc: "A privacy-focused browser that automatically blocks ads and trackers. Keeps you secure online and speeds up page loading.", url: "https://brave.com/", win: true, android: true, ios: true, linux: true },
      { name: "Vivaldi", category: "popular", engine: "Blink (Chromium)", desc: "Built for power users. Offers an astonishing level of customizability, tab management, built-in notes, and ad-blocking.", url: "https://vivaldi.com/", win: true, android: true, ios: true, linux: true },
      { name: "Arc Browser", category: "popular", engine: "Blink (Chromium)", desc: "A revolutionary, beautifully designed productivity browser featuring sidebar tabs, spaces, and excellent workspace organization.", url: "https://arc.net/", win: true, android: false, ios: true, linux: false },
      { name: "DuckDuckGo", category: "popular", engine: "Blink / WebKit", desc: "A full privacy suite in a browser. Automatically blocks trackers, enforces HTTPS, and cleans up your browsing data on close.", url: "https://duckduckgo.com/app", win: true, android: true, ios: true, linux: false },
      { name: "Samsung Internet", category: "popular", engine: "Blink (Chromium)", desc: "Samsung's highly optimized mobile browser. Features clean dark mode, extension support, and highly responsive page rendering.", url: "https://www.samsung.com/us/apps/samsung-internet/", win: true, android: true, ios: false, linux: false },
      { name: "Yandex Browser", category: "popular", engine: "Blink (Chromium)", desc: "A fast, smart Russian-designed browser featuring robust security protections, cloud search integrations, and turbo mode.", url: "https://browser.yandex.com/", win: true, android: true, ios: true, linux: true },
      { name: "UC Browser", category: "popular", engine: "U3 Engine", desc: "A popular lightweight mobile browser with fast cloud downloading, built-in compression, and custom ad-blocking.", url: "https://www.ucweb.com/", win: true, android: true, ios: true, linux: false },
      { name: "Maxthon", category: "popular", engine: "Blink &amp; Trident", desc: "A classic dual-core browser providing seamless cloud synchronization, screen capture, and safe password management tools.", url: "https://www.maxthon.com/", win: true, android: true, ios: true, linux: true },
      { name: "Avast Secure Browser", category: "popular", engine: "Blink (Chromium)", desc: "A security-first browser designed by Avast with built-in anti-phishing, forced HTTPS, and ad-blocking.", url: "https://www.avast.com/secure-browser", win: true, android: true, ios: true, linux: false },
      { name: "AVG Secure Browser", category: "popular", engine: "Blink (Chromium)", desc: "A secure web browser from AVG equipped with integrated malware, tracking, and ad blocks.", url: "https://www.avg.com/secure-browser", win: true, android: true, ios: true, linux: false },
      { name: "CCleaner Browser", category: "popular", engine: "Blink (Chromium)", desc: "A lightweight, secure browser optimized for performance with built-in cache-cleaning utilities.", url: "https://www.ccleaner.com/ccleaner-browser", win: true, android: false, ios: false, linux: false },

      // Category: Privacy
      { name: "Tor Browser", category: "privacy", engine: "Gecko (Firefox)", desc: "The ultimate privacy browser. Routes your traffic through the onion network to bypass censorship and prevent tracking.", url: "https://www.torproject.org/", win: true, android: true, ios: false, linux: true },
      { name: "Mullvad Browser", category: "privacy", engine: "Gecko (Firefox)", desc: "Developed in collaboration with Tor. Protects your digital fingerprint out-of-the-box with zero telemetry.", url: "https://mullvad.net/browser", win: true, android: false, ios: false, linux: true },
      { name: "LibreWolf", category: "privacy", engine: "Gecko", desc: "A community-maintained Firefox fork. Configured for maximum privacy, security, and freedom with zero telemetry.", url: "https://librewolf.net/", win: true, android: false, ios: false, linux: true },
      { name: "Waterfox", category: "privacy", engine: "Gecko", desc: "An ethical, open-source browser fork of Firefox. Telemetry-free, fully customizable, and preserves old extension support.", url: "https://www.waterfox.com/", win: true, android: false, ios: false, linux: true },
      { name: "GNU IceCat", category: "privacy", engine: "Gecko", desc: "A GNU-compliant version of Firefox. Strips away all proprietary non-free plugins and tracking scripts completely.", url: "https://www.gnu.org/software/gnuzilla/", win: false, android: false, ios: false, linux: true },
      { name: "Bromite", category: "privacy", engine: "Blink (Chromium)", desc: "A secure mobile Chromium fork featuring built-in ad-blocking, DNS over HTTPS, and advanced fingerprinting blocks.", url: "https://www.bromite.org/", win: false, android: true, ios: false, linux: false },
      { name: "Cromite", category: "privacy", engine: "Blink (Chromium)", desc: "The direct modern successor of Bromite. Brings strict privacy, custom ad-blocking, and dark mode optimizations to Android.", url: "https://github.com/uazo/cromite", win: false, android: true, ios: false, linux: false },
      { name: "Epic Privacy Browser", category: "privacy", engine: "Blink (Chromium)", desc: "A private Chromium fork with a built-in encrypted proxy, tracking blocker, video downloader, and zero history saving.", url: "https://epicbrowser.com/", win: true, android: true, ios: true, linux: false },
      { name: "Iridium Browser", category: "privacy", engine: "Blink (Chromium)", desc: "Secured Chromium build. Strips out all Google-specific tracking and calls home, keeping your web data completely secure.", url: "https://iridiumbrowser.de/", win: true, android: false, ios: false, linux: true },
      { name: "SRWare Iron", category: "privacy", engine: "Blink (Chromium)", desc: "An elegant alternative to Google Chrome. Disables all background tracking, telemetry, and metrics to ensure data security.", url: "https://srware.net/iron/", win: true, android: true, ios: false, linux: true },
      { name: "Ghostery Browser", category: "privacy", engine: "Gecko (Firefox)", desc: "A clean, private browser designed by Ghostery with robust ad-blocking, script blocks, and tracker detection.", url: "https://www.ghostery.com/", win: true, android: true, ios: true, linux: false },
      { name: "Decentr Browser", category: "privacy", engine: "Blink (Chromium)", desc: "A Web3-focused private browser that pays you in crypto for sharing anonymous browsing statistics with consent.", url: "https://decentr.net/", win: true, android: true, ios: true, linux: true },

      // Category: Firefox Forks
      { name: "Floorp", category: "firefox", engine: "Gecko", desc: "A gorgeous, Japanese-built Firefox fork. Extremely customizable, featuring an advanced sidebar, split tabs, and vertical tabs.", url: "https://floorp.app/", win: true, android: false, ios: false, linux: true },
      { name: "Zen Browser", category: "firefox", engine: "Gecko", desc: "A beautiful, minimalist modern Firefox fork. Designed with vertical workspaces, clean aesthetics, and fast rendering.", url: "https://zen-browser.app/", win: true, android: false, ios: false, linux: true },
      { name: "Pale Moon", category: "firefox", engine: "Goanna (Firefox fork)", desc: "A classic layout browser focused on old extension compatibility, custom styling, and lightweight processing.", url: "https://www.palemoon.org/", win: true, android: false, ios: false, linux: true },
      { name: "Basilisk", category: "firefox", engine: "Goanna", desc: "A closely related sister of Pale Moon. Retains a classical, highly robust layout with full custom theme support.", url: "https://www.basilisk-browser.org/", win: true, android: false, ios: false, linux: true },
      { name: "SeaMonkey", category: "firefox", engine: "Gecko", desc: "An all-in-one internet suite. Features a lightweight browser, IRC chat client, HTML editor, and email reader in one app.", url: "https://www.seamonkey-project.org/", win: true, android: false, ios: false, linux: true },
      { name: "Fennec F-Droid", category: "firefox", engine: "Gecko", desc: "A privacy-focused mobile build of Firefox. Hand-compiled, completely telemetry-free, and distributed on F-Droid.", url: "https://f-droid.org/packages/org.mozilla.fennec_fdroid/", win: false, android: true, ios: false, linux: false },

      // Category: Chromium
      { name: "Chromium", category: "chromium", engine: "Blink", desc: "The open-source core of Google Chrome. Free of proprietary codecs and tracking, used as the base for major modern browsers.", url: "https://www.chromium.org/", win: true, android: false, ios: false, linux: true },
      { name: "Ungoogled Chromium", category: "chromium", engine: "Blink", desc: "A pure Chromium build with absolutely all Google services, binaries, tracking scripts, and dependencies stripped out.", url: "https://github.com/ungoogled-software/ungoogled-chromium", win: true, android: true, ios: false, linux: true },
      { name: "Thorium", category: "chromium", engine: "Blink (AVX optimized)", desc: "A highly optimized Chromium build compiled with AVX processors instruction set for blazing-fast speed and low-latency rendering.", url: "https://thorium.rocks/", win: true, android: false, ios: false, linux: true },
      { name: "Cent Browser", category: "chromium", engine: "Blink", desc: "A robust Chromium fork featuring advanced mouse gestures, tab lazy-loading, automatic memory purge, and custom shortcuts.", url: "https://www.centbrowser.com/", win: true, android: false, ios: false, linux: false },
      { name: "Slimjet", category: "chromium", engine: "Blink", desc: "A lightning-fast Chromium build with built-in YouTube video downloader, ad-blocker, and automatic photo compressor.", url: "https://www.slimjet.com/", win: true, android: false, ios: false, linux: true },

      // Category: Lightweight
      { name: "Falkon", category: "lightweight", engine: "QtWebEngine", desc: "The official lightweight web browser of the KDE community. Uses minimal RAM and features built-in AdBlock.", url: "https://www.falkon.org/", win: true, android: false, ios: false, linux: true },
      { name: "Midori Browser", category: "lightweight", engine: "Webkit / Gecko", desc: "An incredibly lightweight, fast, and eco-friendly open-source browser. Ideal for older PCs and low-end hardware.", url: "https://astian.org/midori-browser/", win: true, android: true, ios: false, linux: true },
      { name: "GNOME Web (Epiphany)", category: "lightweight", engine: "WebKit", desc: "The native web browser for the GNOME desktop environment. Minimalist, clean, and tightly integrated into Linux.", url: "https://apps.gnome.org/Web/", win: false, android: false, ios: false, linux: true },
      { name: "Dillo", category: "lightweight", engine: "Dillo Engine", desc: "A highly compact, secure, and extremely lightweight graphical browser. Loads pages in milliseconds with minimal CPU usage.", url: "https://dillo-browser.github.io/", win: false, android: false, ios: false, linux: true },
      { name: "Dooble", category: "lightweight", engine: "QtWebEngine", desc: "An open-source private browser with built-in cookie, tracking, and script-blocking features, designed for maximum stability.", url: "https://textbrowser.github.io/dooble/", win: true, android: false, ios: false, linux: true },
      { name: "qutebrowser", category: "lightweight", engine: "QtWebEngine", desc: "A keyboard-focused browser with a minimal Vim-like graphical user interface. Great for command-line power users.", url: "https://qutebrowser.org/", win: false, android: false, ios: false, linux: true },
      { name: "Nyxt", category: "lightweight", engine: "WebKit", desc: "An advanced, fully programmable web browser modeled after Emacs. Completely configurable via Common Lisp.", url: "https://nyxt.atlas.engineer/", win: false, android: false, ios: false, linux: true },
      { name: "Browsh", category: "lightweight", engine: "Text-Based", desc: "A fully modern, text-based terminal web browser. Renders videos, graphics, and pages cleanly inside your command-line console.", url: "https://www.brow.sh/", win: false, android: false, ios: false, linux: true },
      { name: "BadWolf", category: "lightweight", engine: "WebKit", desc: "A minimalist, secure, and lightweight WebKit-based browser for Linux with explicit Javascript toggles.", url: "https://hacktivis.me/projects/badwolf", win: false, android: false, ios: false, linux: true },

      // Category: AI & Productivity
      { name: "SigmaOS", category: "ai", engine: "WebKit", desc: "A beautiful, highly integrated AI productivity workspace browser. Organize tabs into distinct spaces with built-in copilot.", url: "https://sigmaos.com/", win: false, android: false, ios: true, linux: false },
      { name: "Dia Browser", category: "ai", engine: "Blink (Chromium)", desc: "A smart mobile browser integrated with deep AI assistants, voice navigation, and auto summarizing tools.", url: "https://www.diabrowser.com/", win: false, android: true, ios: true, linux: false },
      { name: "Perplexity Comet", category: "ai", engine: "Blink", desc: "The official experimental browser workspace from Perplexity AI. Designed for research and intelligent search curation.", url: "https://www.perplexity.ai/", win: true, android: false, ios: true, linux: false },
      { name: "Opera Neon", category: "ai", engine: "Blink (Chromium)", desc: "An experimental, futuristic browser concept by Opera. Features a physics-based bubble-tab interface and split-screen.", url: "https://www.opera.com/neon", win: true, android: false, ios: false, linux: false },
      { name: "Fellou AI", category: "ai", engine: "Blink", desc: "A modern, productivity-focused web browser integrated with secure on-device AI models for smart workflow automation.", url: "https://fellou.ai/", win: true, android: false, ios: false, linux: false },

      // Category: Mobile Only
      { name: "Opera Mini", category: "mobile", engine: "Presto / Opera Cloud", desc: "A globally popular micro-weight mobile browser. Compresses web pages up to 90% in the cloud to save immense mobile data.", url: "https://www.opera.com/mobile/mini", win: false, android: true, ios: true, linux: false },
      { name: "Kiwi Browser", category: "mobile", engine: "Blink (Chromium)", desc: "The best browser for Android power-users. Fully supports standard desktop Chrome Extensions on your mobile device.", url: "https://kiwibrowser.com/", win: false, android: true, ios: false, linux: false }
  ];

  // ৩. ডাইনামিক ক্যাটাগরি সুইচিং লজিক
  function switchBrowserCategory(catId) {
      activeBrowserCategory = catId;
      
      // বাটনের অ্যাক্টিভ ক্লাস সিঙ্ক করবে
      document.querySelectorAll('.bd-tab-btn').forEach(btn => {
          btn.classList.remove('active');
      });
      const targetBtn = document.getElementById(`btn-cat-${catId}`);
      if (targetBtn) targetBtn.classList.add('active');

      // সার্চ ইনপুট ক্লিয়ার করবে
      document.getElementById('bdSearchInput').value = '';

      renderBrowserGrid(catId);
  }

  // ৪. ডাইনামিক ব্রাউজার রেন্ডারার
  function renderBrowserGrid(category) {
      const grid = document.getElementById('bdResultScrollGrid');
      if (!grid) return;
      grid.innerHTML = ''; // ক্লিয়ার লোডার

      const filtered = browserDb.filter(browser => {
          return category === 'all' || browser.category === category;
      });

      populateGridItems(filtered);
  }

  // ৫. লাইভ সার্চ এবং চ্যানেল গ্রিড পপুলেটর
  function filterBrowsersDirectory() {
      const query = document.getElementById('bdSearchInput').value.toLowerCase().trim();
      
      // সব ফিল্টারিং ক্লিয়ার করে ক্যাটাগরি 'All'-এ নিয়ে যাবে সার্চিং এর সময়
      document.querySelectorAll('.bd-tab-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById('btn-cat-all').classList.add('active');

      const filtered = browserDb.filter(browser => {
          return browser.name.toLowerCase().includes(query) || 
                 browser.engine.toLowerCase().includes(query) || 
                 browser.desc.toLowerCase().includes(query);
      });

      populateGridItems(filtered);
  }

  // ৬. ডম রেন্ডার করার হেল্পার ফাংশন
  function populateGridItems(list) {
      const grid = document.getElementById('bdResultScrollGrid');
      if (!grid) return;
      grid.innerHTML = ''; // ক্লিয়ার করবে

      if (list.length === 0) {
          grid.innerHTML = '<div style="color: #64748b; padding: 40px; text-align: center; grid-column: 1/-1;">No browsers found. Please try another query.</div>';
          return;
      }

      list.forEach(browser => {
          const card = document.createElement('div');
          card.className = 'bd-browser-card';

          // ফ্ল্যাটফর্ম কম্প্যাটিবিলিটি আইকন প্রিপারেশন
          const platformsHtml = `
            <i class="fa-brands fa-windows ${browser.win ? 'supported' : ''}" title="Windows Support"></i>
            <i class="fa-brands fa-android ${browser.android ? 'supported' : ''}" title="Android Support"></i>
            <i class="fa-brands fa-apple ${browser.ios ? 'supported' : ''}" title="iOS/macOS Support"></i>
            <i class="fa-brands fa-linux ${browser.linux ? 'supported' : ''}" title="Linux Support"></i>
          `;

          card.innerHTML = `
            <div>
              <div class="bd-card-header">
                <div class="bd-icon-wrap">${browser.name.charAt(0)}</div>
                <div class="bd-title-box">
                  <h4 class="bd-name" title="${browser.name}">${browser.name}</h4>
                  <div class="bd-engine">Engine: ${browser.engine}</div>
                </div>
              </div>
              <p class="bd-desc" title="${browser.desc}">${browser.desc}</p>
            </div>
            <div>
              <div class="bd-platforms">
                ${platformsHtml}
              </div>
              <a class="bd-dl-btn" href="${browser.url}" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-cloud-arrow-down"></i> Download Now
              </a>
            </div>
          `;
          grid.appendChild(card);
      });
  }

  // মোডাল স্যুইচিং ও অ্যাক্টিভেশন লজিক (তাত্ক্ষণিকভাবে ওপেন হবে) [1.1.2]
  function openBrowserDirectoryModal() {
      setActiveMode('mode-browser-directory'); // বাটন হাইলাইট করবে
      const modal = document.getElementById('browserDirectoryModal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে [1.1.2]
          renderBrowserGrid('all'); // সব ব্রাউজার প্রথম লোডে রেন্ডার করবে
      }
  }

  function closeBrowserDirectoryModal() {
      const modal = document.getElementById('browserDirectoryModal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল পুনরায় সচল হবে [1.1.2]
          document.getElementById('bdSearchInput').value = ''; // সার্চ ক্লিয়ার করবে
      }
  }
