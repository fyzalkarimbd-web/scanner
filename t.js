<!--Progressive HLS Streaming Engine & Playlist Parser-->
<script type="text/javascript">
  //<![CDATA[
  
  let parsedChannels = [];
  let hlsInstance = null;

  // ১. ডাইনামিক লাইব্রেরি লোডার হেল্পার
  function loadIptvEngineScript(url) {
      return new Promise((resolve, reject) => {
          let script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
      });
  }

  // ২. প্রথম লোডে Hls.js লাইব্রেরি লোড এবং মেইন সার্ভার (Server 1) ফেচ করবে
  document.addEventListener("DOMContentLoaded", async function() {
      try {
          if (typeof Hls === 'undefined') {
              // Hls.js ইঞ্জিন লোড করবে
              await loadIptvEngineScript('https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.12/hls.min.js');
          }
          // মেইন ডিফল্ট সার্ভার (Server 1) দিয়ে শুরু করবে
          const defaultServer = document.getElementById('dirServerSelect').value;
          fetchAndParseM3uPlaylist(defaultServer);
      } catch (err) {
          console.error("Failed to load HLS engine", err);
          document.getElementById('channelsScrollGrid').innerHTML = '<div style="color: #ef4444; padding: 20px; text-align: center; font-weight: 700;">IPTV Engine Loading Failed.</div>';
      }
  });

  // ৩. আইপিটিভি সার্ভার পরিবর্তন করার ডাইনামিক ফাংশন
  async function switchIptvServer(url) {
      const grid = document.getElementById('channelsScrollGrid');
      if (grid) {
          grid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #64748b;">
              <i class="fa-solid fa-spinner fa-spin" style="font-size: 30px; margin-bottom: 10px; color: #10b981;"></i>
              <p style="margin: 0; font-weight: 700;">Loading new server channels...</p>
            </div>
          `;
      }
      
      // সার্চ ইনপুট ক্লিয়ার করবে
      document.getElementById('dirSearchInput').value = '';
      
      // নতুন প্লেলিস্ট ফেচ করবে
      await fetchAndParseM3uPlaylist(url);
  }

  // ৪. রিমোট আইপিটিভি প্লেলিস্ট ফেচ করার ফাংশন (স্মার্ট CORS-বাইলপাস প্রক্সি ব্যাকআপ সহ)
  async function fetchAndParseM3uPlaylist(url) {
      try {
          // প্রথম চেষ্টা: সরাসরি রিমোট সার্ভার থেকে ফেচ করবে
          const response = await fetch(url);
          if (!response.ok) throw new Error("Direct fetch failed");
          const data = await response.text();
          parseM3uTextData(data);
      } catch (err) {
          console.log("Direct server fetch blocked or failed. Retrying with ultra-speed CORS proxy...");
          try {
              // দ্বিতীয় চেষ্টা: ব্রাউজার ও আইএসপি ব্লক এড়াতে ফ্রি হাই-স্পিড CORS প্রক্সি ব্যবহার করবে
              const proxyUrl = "https://corsproxy.io/?" + encodeURIComponent(url);
              const response = await fetch(proxyUrl);
              if (!response.ok) throw new Error("CORS Proxy fetch failed");
              const data = await response.text();
              parseM3uTextData(data);
          } catch (proxyErr) {
              console.error("All fetch attempts failed", proxyErr);
              document.getElementById('channelsScrollGrid').innerHTML = '<div style="color: #ef4444; padding: 20px; text-align: center; font-weight: 700;"><i class="fa-solid fa-triangle-exclamation"></i> Server Connection Failed.<br/><span style="font-size: 12px; color: #94a3b8; font-weight: normal; display: block; margin-top: 5px;">This server might be temporarily down or blocked. Please try switching servers.</span></div>';
          }
      }
  }

  // ৫. রিয়াল-টাইম M3U প্লেলিস্ট পার্সার
  function parseM3uTextData(m3uText) {
      const lines = m3uText.split('\n');
      parsedChannels = [];
      const categoriesSet = new Set();
      categoriesSet.add('All');

      let currentChannel = null;

      for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith('#EXTINF:')) {
              currentChannel = {};
              
              // লোগো এক্সট্রাক্ট
              const logoMatch = line.match(/tvg-logo="([^"]+)"/) || line.match(/logo="([^"]+)"/);
              currentChannel.logo = logoMatch ? logoMatch[1] : '';

              // ক্যাটাগরি গ্রুপ এক্সট্রাক্ট
              const groupMatch = line.match(/group-title="([^"]+)"/);
              currentChannel.category = groupMatch ? groupMatch[1].trim() : 'General';
              categoriesSet.add(currentChannel.category);

              // চ্যানেলের নাম এক্সট্রাক্ট
              const commaIdx = line.lastIndexOf(',');
              currentChannel.name = commaIdx !== -1 ? line.substring(commaIdx + 1).trim() : 'Unknown Channel';
          } else if (line.startsWith('http') && currentChannel) {
              currentChannel.url = line;
              parsedChannels.push(currentChannel);
              currentChannel = null;
          }
      }

      // ক্যাটাগরি ড্রপডাউন এবং চ্যানেল গ্রিড রেন্ডার করবে
      populateCategoryDropdown(categoriesSet);
      renderChannelItemsGrid(parsedChannels);

      // প্রথম লোডে SOMOY TV অথবা ১ নম্বর চ্যানেলটি অটো-প্লে করার ফাংশন ট্রিগার করবে
      autoPlayInitialChannel();
  }

  // ৬. ক্যাটাগরি ফিল্টার ড্রপডাউন জেনারেটর
  function populateCategoryDropdown(categoriesSet) {
      const select = document.getElementById('dirFilterSelect');
      if (!select) return;
      select.innerHTML = ''; // ক্লিয়ার করবে

      categoriesSet.forEach(cat => {
          const opt = document.createElement('option');
          opt.value = cat;
          opt.innerText = cat === 'All' ? 'All Categories' : cat;
          select.appendChild(opt);
      });
  }

  // ৭. চ্যানেল লিস্ট গ্রিড রেন্ডারার (স্মার্ট পারফরম্যান্স লিমিটেশন সহ)
  function renderChannelItemsGrid(channelList) {
      const grid = document.getElementById('channelsScrollGrid');
      if (!grid) return;
      grid.innerHTML = ''; // ক্লিয়ার করবে

      if (channelList.length === 0) {
          grid.innerHTML = '<div style="color: #64748b; padding: 20px; text-align: center;">No channels found.</div>';
          return;
      }

      // ৩ নম্বর সার্ভারে থাকা হাজার হাজার চ্যানেলের কারণে যাতে ব্রাউজার ক্র্যাশ বা হ্যাং না হয়,
      // সেজন্য প্রথম ৩০০টি চ্যানেল রেন্ডার করার লিমিট দেওয়া হয়েছে।
      const renderLimit = 300;
      const itemsToRender = channelList.slice(0, renderLimit);

      itemsToRender.forEach((chan, idx) => {
          const btn = document.createElement('button');
          btn.className = 'channel-btn';
          btn.onclick = function() {
              playLiveChannel(chan.url, chan.name, this);
          };

          // লোগো ইমেজ বা ফার্স্ট লেটার ব্যাকআপ লজিক
          let logoContent = `<span class="channel-logo-fallback">${chan.name.charAt(0)}</span>`;
          if (chan.logo && chan.logo.startsWith('http')) {
              logoContent = `<img src="${chan.logo}" alt="${chan.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` +
                            `<span class="channel-logo-fallback" style="display:none;">${chan.name.charAt(0)}</span>`;
          }

          btn.innerHTML = `
            <div class="channel-logo-wrap">
              ${logoContent}
            </div>
            <span class="channel-name" title="${chan.name}">${chan.name}</span>
          `;
          grid.appendChild(btn);
      });

      // ৩০০ এর বেশি চ্যানেল থাকলে কাস্টমারকে সার্চ বার ব্যবহারের নির্দেশনা দেবে
      if (channelList.length > renderLimit) {
          const note = document.createElement('div');
          note.style.textAlign = 'center';
          note.style.padding = '15px';
          note.style.fontSize = '12px';
          note.style.color = '#94a3b8';
          note.innerHTML = `<i class="fa-solid fa-circle-info"></i> Showing first ${renderLimit} channels. Please use the search bar above to find other channels.`;
          grid.appendChild(note);
      }
  }

  // ৮. গ্লোবাল লো-বাফারিং ও ডাটা সাশ্রয়ী লাইভ প্লেয়ার লজিক
  function playLiveChannel(streamUrl, channelName, btnElement) {
      const video = document.getElementById('iptvVideoPlayer');
      const titleEl = document.getElementById('currentChannelName');
      
      if (!video) return;

      // ১. চ্যানেলের নাম পরিবর্তন করবে
      if (titleEl) titleEl.innerText = channelName;

      // ২. একটিভ ক্লিকে গ্লো হাইলাইট করবে
      document.querySelectorAll('.channel-btn').forEach(btn => btn.classList.remove('active-channel'));
      if (btnElement) btnElement.classList.add('active-channel');

      // ৩. পূর্বের বাফার রিলিজ করবে
      if (hlsInstance) {
          hlsInstance.destroy();
      }

      // ৪. Hls.js বা নেটিভ সাফারিতে স্ট্রিমিং লোড করবে (মোবাইল ও কম এমবি অপ্টিমাইজেশন সহ)
      if (Hls.isSupported()) {
          // লো-ব্যান্ডউইথ এবং লো-ডাটা প্রোটেকশন কনফিগারেশন
          const hlsConfig = {
              capLevelToPlayerSize: true, // মোবাইলের ছোট স্ক্রিনে ডাটা বাঁচাতে স্বয়ংক্রিয় রেজোলিউশন কমাবে
              maxBufferLength: 15,       // বাফারিং এড়াতে এবং অতিরিক্ত এমবি অপচয় রোধ করতে ১৫ সেকেন্ড প্রি-লোড রাখবে
              maxMaxBufferLength: 30,    // সর্বোচ্চ ৩০ সেকেন্ডের সেফটি বাফার
              enableWorker: true,        // লো-কনফিগ ফোনে যাতে ল্যাগিং না করে সেজন্য আলাদা থ্রেড ব্যবহার করবে
              progressive: true
          };

          hlsInstance = new Hls(hlsConfig);
          hlsInstance.loadSource(streamUrl);
          hlsInstance.attachMedia(video);
          hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
              video.play().catch(e => console.log("Autoplay blocked by browser policy"));
          });
          hlsInstance.on(Hls.Events.ERROR, function(event, data) {
              if (data.fatal) {
                  switch (data.type) {
                      case Hls.ErrorTypes.NETWORK_ERROR:
                          console.log("Fatal network error encountered, trying to recover...");
                          hlsInstance.startLoad();
                          break;
                      case Hls.ErrorTypes.MEDIA_ERROR:
                          console.log("Fatal media error encountered, trying to recover...");
                          hlsInstance.recoverMediaError();
                          break;
                      default:
                          console.log("Fatal error, stream cannot be played");
                          break;
                  }
              }
          });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          // নেটিভ সাফারি (iOS/Safari) সাপোর্ট
          video.src = streamUrl;
          video.addEventListener('loadedmetadata', function() {
              video.play().catch(e => console.log("Autoplay blocked"));
          });
      } else {
          alert('This browser does not support HLS streaming. Please use Chrome, Edge, or Safari.');
      }
  }

  // ৯. প্রথম লোড হওয়ার সময় "SOMOY TV" অটো-প্লে করার ফাংশন
  function autoPlayInitialChannel() {
      if (parsedChannels.length === 0) return;

      // 'SOMOY TV' নাম বিশিষ্ট চ্যানেল খুঁজবে (কেস-সেন্সিティブ ছাড়া)
      let initialChannelIdx = parsedChannels.findIndex(chan => 
          chan.name.toLowerCase().includes("somoy tv") || 
          chan.name.toLowerCase().includes("somoytv")
      );

      // যদি SOMOY TV খুঁজে না পাওয়া যায়, তবে ১ নম্বর চ্যানেলটি ডিফল্ট হিসেবে সিলেক্ট করবে
      if (initialChannelIdx === -1) {
          initialChannelIdx = 0;
      }

      const targetChannel = parsedChannels[initialChannelIdx];
      
      // UI বাটনগুলোর মধ্য থেকে টার্গেট বাটনটির ইনডেক্স খুঁজে বের করবে
      const channelButtons = document.querySelectorAll('.channel-btn');
      const targetBtn = channelButtons[initialChannelIdx] || null;

      // লাইভ প্লে করবে
      playLiveChannel(targetChannel.url, targetChannel.name, targetBtn);
      
      // বাটনটি স্ক্রিনের বাইরে থাকলে স্মুথলি স্ক্রোল করে চোখের সামনে নিয়ে আসবে (Scroll Into View)
      if (targetBtn && targetBtn.scrollIntoView) {
          targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
  }

  // ১০. লাইভ ক্যাটাগরি ও কী-ওয়ার্ড ফিল্টার
  function filterIptvChannels() {
      const query = document.getElementById('dirSearchInput').value.toLowerCase().trim();
      const selectedCat = document.getElementById('dirFilterSelect').value;

      const filtered = parsedChannels.filter(chan => {
          const matchQuery = chan.name.toLowerCase().indexOf(query) > -1;
          const matchCat = selectedCat === 'All' || chan.category === selectedCat;
          return matchQuery && matchCat;
      });

      renderChannelItemsGrid(filtered);
  }

  //]]>
</script>
