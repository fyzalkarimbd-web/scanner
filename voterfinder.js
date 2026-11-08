// আপনার নির্দিষ্ট আইফ্রেম লিংকটি জাভাস্ক্রিপ্ট স্টোরেজে সেট করা হলো (NEW UPDATE)
  const bdVoterIframeUrl = "https://bdvoter.lovable.app/";

  function openVoterFinderModal() {
      if(typeof setActiveMode === 'function') setActiveMode('mode-voter-finder');
      
      // বাটন ক্লিক করলেই কেবল আইফ্রেমে লিংকটি ডাইনামিকালি লোড হবে
      const iframe = document.getElementById('voterIframe');
      if (iframe && (!iframe.src || iframe.src === 'about:blank' || iframe.src.indexOf('about:blank') !== -1)) {
          iframe.src = bdVoterIframeUrl;
      }

      document.getElementById('voterFinderModal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
  }

  function closeVoterFinderModal() {
      document.getElementById('voterFinderModal').style.display = 'none';
      document.body.style.overflow = '';
  }
