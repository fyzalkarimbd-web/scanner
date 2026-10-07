let parsedChannels = [];
    let hlsInstance = null;

    function loadIptvEngineScript(url) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    document.addEventListener("DOMContentLoaded", async function() {
        try {
            if (typeof Hls === 'undefined') {
                await loadIptvEngineScript('https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.4.12/hls.min.js');
            }
            const video = document.getElementById('iptvVideoPlayer');
            // সরাসরি সাউন্ড 30% এ সেট করা এবং আনমিউট করা
            if (video) { video.volume = 0.3; video.muted = false; } 
            const defaultServer = document.getElementById('dirServerSelect').value;
            fetchAndParseM3uPlaylist(defaultServer);
        } catch (err) {
            console.error("Failed to load HLS engine", err);
            document.getElementById('channelsScrollGrid').innerHTML = '<div style="color: #ef4444; padding: 20px; text-align: center; font-weight: 700;">IPTV Engine Loading Failed.</div>';
        }
    });

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
        document.getElementById('dirSearchInput').value = '';
        await fetchAndParseM3uPlaylist(url);
    }

    async function fetchAndParseM3uPlaylist(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Direct fetch failed");
            const data = await response.text();
            parseM3uTextData(data);
        } catch (err) {
            console.log("Direct server fetch blocked or failed. Retrying with CORS proxy...");
            try {
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
                const logoMatch = line.match(/tvg-logo="([^"]+)"/) || line.match(/logo="([^"]+)"/);
                currentChannel.logo = logoMatch ? logoMatch[1] : '';
                const groupMatch = line.match(/group-title="([^"]+)"/);
                currentChannel.category = groupMatch ? groupMatch[1].trim() : 'General';
                categoriesSet.add(currentChannel.category);
                const commaIdx = line.lastIndexOf(',');
                currentChannel.name = commaIdx !== -1 ? line.substring(commaIdx + 1).trim() : 'Unknown Channel';
            } else if (line.startsWith('http') && currentChannel) {
                currentChannel.url = line;
                parsedChannels.push(currentChannel);
                currentChannel = null;
            }
        }
        populateCategoryDropdown(categoriesSet);
        renderChannelItemsGrid(parsedChannels);
        autoPlayInitialChannel();
    }

    function populateCategoryDropdown(categoriesSet) {
        const select = document.getElementById('dirFilterSelect');
        if (!select) return;
        select.innerHTML = '';
        categoriesSet.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.innerText = cat === 'All' ? 'All Categories' : cat;
            select.appendChild(opt);
        });
    }

    function renderChannelItemsGrid(channelList) {
        const grid = document.getElementById('channelsScrollGrid');
        if (!grid) return;
        grid.innerHTML = '';
        if (channelList.length === 0) {
            grid.innerHTML = '<div style="color: #64748b; padding: 20px; text-align: center;">No channels found.</div>';
            return;
        }

        const renderLimit = 300;
        const itemsToRender = channelList.slice(0, renderLimit);

        itemsToRender.forEach((chan, idx) => {
            const btn = document.createElement('button');
            btn.className = 'channel-btn';
            btn.onclick = function() { playLiveChannel(chan.url, chan.name, this); };

            let logoContent = `<span class="channel-logo-fallback">${chan.name.charAt(0)}</span>`;
            if (chan.logo && chan.logo.startsWith('http')) {
                logoContent = `<img src="${chan.logo}" alt="${chan.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` +
                              `<span class="channel-logo-fallback" style="display:none;">${chan.name.charAt(0)}</span>`;
            }

            btn.innerHTML = `<div class="channel-logo-wrap">${logoContent}</div><span class="channel-name" title="${chan.name}">${chan.name}</span>`;
            grid.appendChild(btn);
        });

        if (channelList.length > renderLimit) {
            const note = document.createElement('div');
            note.style.textAlign = 'center';
            note.style.padding = '15px';
            note.style.fontSize = '12px';
            note.style.color = '#94a3b8';
            note.innerHTML = `<i class="fa-solid fa-circle-info"></i> Showing first ${renderLimit} channels. Please use the search bar above.`;
            grid.appendChild(note);
        }
    }

    function playLiveChannel(streamUrl, channelName, btnElement) {
        const video = document.getElementById('iptvVideoPlayer');
        const titleEl = document.getElementById('currentChannelName');
        if (!video) return;

        if (titleEl) titleEl.innerText = channelName;
        document.querySelectorAll('.channel-btn').forEach(btn => btn.classList.remove('active-channel'));
        if (btnElement) btnElement.classList.add('active-channel');

        if (hlsInstance) hlsInstance.destroy();

        if (Hls.isSupported()) {
            hlsInstance = new Hls({ capLevelToPlayerSize: true, maxBufferLength: 15, maxMaxBufferLength: 30, enableWorker: true, progressive: true });
            hlsInstance.loadSource(streamUrl);
            hlsInstance.attachMedia(video);
            hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
                video.volume = 0.3; // 30% Volume
                video.muted = false; // Mute অফ করে দেওয়া হয়েছে
                
                // সরাসরি প্লে করার চেষ্টা করবে
                video.play().catch(e => {
                    console.log("ব্রাউজার অটো-প্লে পলিসির কারণে ভিডিও সাউন্ডসহ প্লে হতে দিচ্ছে না!", e);
                });
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl; 
            video.volume = 0.3; // 30% Volume
            video.muted = false; // Mute অফ করে দেওয়া হয়েছে
            video.addEventListener('loadedmetadata', function() {
                video.play().catch(e => {
                    console.log("ব্রাউজার অটো-প্লে পলিসির কারণে ভিডিও সাউন্ডসহ প্লে হতে দিচ্ছে না!", e);
                });
            });
        }
    }

    function autoPlayInitialChannel() {
        if (parsedChannels.length === 0) return;
        let initialChannelIdx = parsedChannels.findIndex(chan => chan.name.toLowerCase().includes("ntv") || chan.name.toLowerCase().includes("NTV"));
        if (initialChannelIdx === -1) initialChannelIdx = 0;
        const targetChannel = parsedChannels[initialChannelIdx];
        const channelButtons = document.querySelectorAll('.channel-btn');
        const targetBtn = channelButtons[initialChannelIdx] || null;
        playLiveChannel(targetChannel.url, targetChannel.name, targetBtn);
        if (targetBtn && targetBtn.scrollIntoView) targetBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

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
