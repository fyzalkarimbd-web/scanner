// মোডাল অ্যাক্টিভেশন ও ক্লোজিং হ্যান্ডেলার
  function openAiPassportPhotoMakerModal() {
      if (typeof setActiveMode === 'function') setActiveMode('mode-ai-passport-maker');
      const modal = document.getElementById('aiPassportPhotoMakerModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক [1.1.2]
      }
  }

  function closeAiPassportPhotoMakerModal() {
      const modal = document.getElementById('aiPassportPhotoMakerModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল সচল [1.1.2]
          
          // ভিডিও এবং বাটনের টেক্সট রিসেট লজিক (NEW UPDATE)
          const sec = document.getElementById('aipVideoSection');
          const iframe = document.getElementById('aipTutorialIframe');
          const btn = document.getElementById('aipVideoTriggerBtn');

          if (sec && sec.style.display !== 'none') {
              sec.style.display = 'none';
              if (iframe) iframe.src = 'about:blank'; // ভিডিও বন্ধ করবে
              isAipVideoLoaded = false;
          }

          // বাটন টেক্সট ও লাল কালার আগের অবস্থায় রিসেট করবে (NEW UPDATE)
          if (btn) {
              btn.innerHTML = '<i class="fa-brands fa-youtube"></i> <span>কিভাবে করবেন ভিডিও দেখুন!</span>';
              btn.style.background = 'linear-gradient(135deg, #cc0000, #ff0000)';
          }
      }
  }

// আপনার অফিশিয়াল প্রম্পট
  const aiPassportPrompt = `From any photo of any size or head position, create a passport-style front-facing headshot. The face shape, proportions, and features should not be altered in any way — not even slightly. Just adjust the head position so that the person is looking directly at the camera. Keep the natural face exactly as it is. Lighten the skin evenly all over to keep it realistic. Remove any acne, blemishes, or spots from the skin and maintain natural texture. Remove all shadows, harsh lights, or reflections to ensure even, balanced lighting. Keep the original clothing color but the clothing will look clean and new. Use a white background with no shadows. The photo should be high resolution, with the head occupying 70-80% of the frame, perfectly centered, and vertically aligned. Automatically crop the photo to standard passport size (2x2 inches / 600x600 px).`;

  // ভিডিও টিউটোরিয়াল এর আইডি ও নো-কন্ট্রোলস ইউটিউব প্যারামিটার (NEW UPDATE)
  // আপনি চাইলে নিচের ইউআরএল-এর জায়গায় যেকোনো ইউটিউব টিউটোরিয়ালের ভিডিও আইডি পরিবর্তন করতে পারবেন
  const aipTutorialVideoUrl = "https://www.youtube.com/embed/eURKak7r1IQ?controls=0&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&autoplay=1";
  let isAipVideoLoaded = false;

  // ভিডিও টিউটোরিয়াল ওপেন ও ক্লোজ ফাংশন (কন্ট্রোলস ছাড়া সচল)
  function toggleAipTutorialVideo() {
      const sec = document.getElementById('aipVideoSection');
      const iframe = document.getElementById('aipTutorialIframe');
      const btn = document.getElementById('aipVideoTriggerBtn');

      if (!sec) return;

      if (sec.style.display === 'none' || !sec.style.display) {
          if (!isAipVideoLoaded && iframe) {
              iframe.src = aipTutorialVideoUrl; // ডায়নামিক নো-কন্ট্রোলস প্লেয়ার
              isAipVideoLoaded = true;
          }
          sec.style.display = 'block';
          btn.innerHTML = '<i class="fa-solid fa-xmark"></i> <span>ভিডিও টিউটোরিয়াল বন্ধ করুন!</span>';
          btn.style.background = 'linear-gradient(135deg, #475569, #334155)';
      } else {
          sec.style.display = 'none';
          if (iframe) iframe.src = 'about:blank'; // ভিডিও পজ/স্টপ করে দেবে
          isAipVideoLoaded = false;
          btn.innerHTML = '<i class="fa-brands fa-youtube"></i> <span>কিভাবে করবেন ভিডিও দেখুন!</span>';
          btn.style.background = 'linear-gradient(135deg, #cc0000, #ff0000)';
      }
  }

  // ১-ক্লিকে প্রম্পট কপি ও গুগল এআই ওপেন লজিক
  function openGoogleAiAndCopyPrompt() {
      if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(aiPassportPrompt).then(() => {
              showAipToast();
          }).catch(() => {
              fallbackCopyPromptText(aiPassportPrompt);
          });
      } else {
          fallbackCopyPromptText(aiPassportPrompt);
      }

      setTimeout(function() {
          window.open('https://www.google.com/webhp', '_blank');
      }, 400);
  }

  // ফ্যালব্যাক কপি মেথড
  function fallbackCopyPromptText(text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
          document.execCommand('copy');
          showAipToast();
      } catch (err) {
          console.error("Failed to copy prompt", err);
      }
      document.body.removeChild(textArea);
  }

  // সাকসেস টোস্ট দেখানোর লজিক
  function showAipToast() {
      const toast = document.getElementById('aipToast');
      if (toast) {
          toast.style.display = 'block';
          setTimeout(function() {
              toast.style.display = 'none';
          }, 3000);
      }
  }

  
