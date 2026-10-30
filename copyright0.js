// আল্ট্রা-স্টিলেথ ভিডিও কপিরাইট বাইপাসার মোডাল অ্যাক্টিভেশন
  function openVideoCopyrightModal() {
      setActiveMode('mode-video-copyright');
      const modal = document.getElementById('videoCopyrightModal');
      if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক
      }
  }

  function closeVideoCopyrightModal() {
      const modal = document.getElementById('videoCopyrightModal');
      if (modal) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
          resetVideoCopyrightTool(); // মেমোরি ক্লিয়ার
      }
  }

  let vcUploadedFile = null;
  let vcMediaRecorder = null;
  let vcRecordedChunks = [];
  let vcProcessedBlobUrl = null;
  let vcAnimFrameId = null;
  let vcAudioContext = null;

  // Drag & Drop Setup
  const vcDropZone = document.getElementById('vcDropZone');
  const vcFileInput = document.getElementById('vcFileInput');

  if (vcDropZone && vcFileInput) {
      vcDropZone.addEventListener('dragover', (e) => {
          e.preventDefault();
          vcDropZone.style.borderColor = '#34d399';
          vcDropZone.style.background = 'rgba(16, 185, 129, 0.05)';
      });

      vcDropZone.addEventListener('dragleave', () => {
          vcDropZone.style.borderColor = '';
          vcDropZone.style.background = '';
      });

      vcDropZone.addEventListener('drop', (e) => {
          e.preventDefault();
          vcDropZone.style.borderColor = '';
          vcDropZone.style.background = '';
          if (e.dataTransfer.files.length > 0) {
              handleVcVideoFile(e.dataTransfer.files[0]);
          }
      });

      vcFileInput.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
              handleVcVideoFile(e.target.files[0]);
          }
      });
  }

  // ১. প্রিসেট কনফিগারেশন
  function applyPresetConfig(preset) {
      const elPreset = document.getElementById('vcOptPreset');
      const elMirror = document.getElementById('vcOptMirror');
      const elSpeed = document.getElementById('vcOptSpeed');
      const elTilt = document.getElementById('vcOptTilt');
      const elAudio = document.getElementById('vcOptAudio');
      const elPitch = document.getElementById('vcOptPitch');
      const elMask = document.getElementById('vcOptMask');
      const elNoise = document.getElementById('vcOptNoise');

      if (preset === 'super_stealth') {
          if(elPreset) elPreset.value = 'super_stealth';
          if(elMirror) elMirror.value = 'yes';
          if(elSpeed) elSpeed.value = 'dynamic';
          if(elTilt) elTilt.value = 'tilt_6zoom';
          if(elAudio) elAudio.value = 'stereo_notch';
          if(elPitch) elPitch.value = 'dynamic_pitch';
          if(elMask) elMask.value = 'vignette_particles';
          if(elNoise) elNoise.value = 'high_noise';
      } else if (preset === 'tiktok_reels') {
          if(elPreset) elPreset.value = 'tiktok_reels';
          if(elMirror) elMirror.value = 'yes';
          if(elSpeed) elSpeed.value = 'fast_wave';
          if(elTilt) elTilt.value = 'tilt_4zoom';
          if(elAudio) elAudio.value = 'high_notch';
          if(elPitch) elPitch.value = 'high_pitch';
          if(elMask) elMask.value = 'light_leak';
          if(elNoise) elNoise.value = 'medium_noise';
      } else if (preset === 'balanced') {
          if(elPreset) elPreset.value = 'balanced';
          if(elMirror) elMirror.value = 'yes';
          if(elSpeed) elSpeed.value = '1.05';
          if(elTilt) elTilt.value = 'zoom_4';
          if(elAudio) elAudio.value = 'standard';
          if(elPitch) elPitch.value = 'mild_high';
          if(elMask) elMask.value = 'light_leak';
          if(elNoise) elNoise.value = 'medium_noise';
      } else if (preset === 'audio_heavy') {
          if(elPreset) elPreset.value = 'audio_heavy';
          if(elMirror) elMirror.value = 'no';
          if(elSpeed) elSpeed.value = 'dynamic';
          if(elTilt) elTilt.value = 'zoom_4';
          if(elAudio) elAudio.value = 'stereo_notch';
          if(elPitch) elPitch.value = 'dynamic_pitch';
          if(elMask) elMask.value = 'off';
          if(elNoise) elNoise.value = 'medium_noise';
      } else if (preset === 'visual_heavy') {
          if(elPreset) elPreset.value = 'visual_heavy';
          if(elMirror) elMirror.value = 'yes';
          if(elSpeed) elSpeed.value = 'fast_wave';
          if(elTilt) elTilt.value = 'tilt_6zoom';
          if(elAudio) elAudio.value = 'standard';
          if(elPitch) elPitch.value = 'off';
          if(elMask) elMask.value = 'vignette_particles';
          if(elNoise) elNoise.value = 'high_noise';
      }
  }

  // ২. ভিডিও ফাইল লোড করা
  function handleVcVideoFile(file) {
      if (!file.type.startsWith('video/')) {
          alert('দয়া করে একটি সঠিক ভিডিও ফাইল (.mp4, .webm, .mov) আপলোড করুন।');
          return;
      }

      vcUploadedFile = file;
      document.getElementById('vcFileName').innerText = file.name;
      document.getElementById('vcStatus').innerText = 'ভিডিও লোড হয়েছে। প্রসেস শুরু করতে বাটনে চাপ দিন।';

      const origVideo = document.getElementById('vcOriginalVideo');
      const hiddenVideo = document.getElementById('vcHiddenVideo');
      const videoUrl = URL.createObjectURL(file);

      origVideo.src = videoUrl;
      hiddenVideo.src = videoUrl;

      hiddenVideo.onloadedmetadata = function() {
          document.getElementById('vcEmptyOriginal').style.display = 'none';
          document.getElementById('vcEmptyTransformed').style.display = 'block';
          document.getElementById('vcProcessedVideo').style.display = 'none';
          document.getElementById('vcPreviewCanvas').style.display = 'none';

          const canvas = document.getElementById('vcPreviewCanvas');
          canvas.width = hiddenVideo.videoWidth || 640;
          canvas.height = hiddenVideo.videoHeight || 360;

          // প্রথম ফ্রেম রেন্ডার
          drawVcFrame(0);
      };
  }

  // ৩. রিয়াল-টাইম ক্যানভাস রেন্ডারিং লজিক
  function drawVcFrame(timestamp) {
      const video = document.getElementById('vcHiddenVideo');
      const canvas = document.getElementById('vcPreviewCanvas');
      const ctx = canvas.getContext('2d');

      if (!video || !canvas) return;

      const optMirror = document.getElementById('vcOptMirror').value;
      const optSpeed = document.getElementById('vcOptSpeed').value;
      const optTilt = document.getElementById('vcOptTilt').value;
      const optNoise = document.getElementById('vcOptNoise').value;
      const optMask = document.getElementById('vcOptMask').value;

      // ১. ডাইনামিক স্পিড মডুলেশন লজিক
      if (!video.paused && !video.ended) {
          if (optSpeed === 'dynamic') {
              const speedOffset = Math.sin((timestamp || Date.now()) * 0.002) * 0.03; 
              video.playbackRate = 1.05 + speedOffset;
          } else if (optSpeed === 'fast_wave') {
              const speedOffset = Math.sin((timestamp || Date.now()) * 0.003) * 0.04;
              video.playbackRate = 1.08 + speedOffset;
          } else if (optSpeed === 'slow_wave') {
              const speedOffset = Math.sin((timestamp || Date.now()) * 0.002) * 0.03;
              video.playbackRate = 0.95 + speedOffset;
          }
      }

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ক্যানভাস সেন্টার ম্যাট্রিক্স
      ctx.translate(canvas.width / 2, canvas.height / 2);

      // ২. ৩ডি পার্সপেক্টিভ টিল্ট ও স্কিউ
      if (optTilt === 'tilt_6zoom' || optTilt === 'tilt_4zoom') {
          const skewX = Math.sin((timestamp || Date.now()) * 0.001) * 0.03;
          ctx.transform(1, 0, skewX, 1, 0, 0);
      }

      // ৩. জুম ও মিররিং লজিক
      let zoom = 1.04;
      if (optTilt === 'tilt_6zoom' || optTilt === 'zoom_8') zoom = 1.08;
      
      let scaleX = zoom;
      let scaleY = zoom;

      if (optMirror === 'yes') {
          scaleX = -zoom;
      } else if (optMirror === 'vertical') {
          scaleY = -zoom;
      } else if (optMirror === 'both') {
          scaleX = -zoom;
          scaleY = -zoom;
      }

      ctx.scale(scaleX, scaleY);

      // কালার ও হিউ রোটেশন
      const hueShift = Math.sin((timestamp || Date.now()) * 0.001) * 5;
      ctx.filter = `contrast(108%) brightness(102%) saturate(110%) hue-rotate(${hueShift}deg)`;

      ctx.drawImage(video, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
      ctx.restore();

      // ৪. ডাইনামিক লাইট, ভিনিয়েট ও সিনেমাটিক মাস্ক
      if (optMask === 'vignette_particles') {
          const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.width*0.2, canvas.width/2, canvas.height/2, canvas.width*0.7);
          grad.addColorStop(0, 'rgba(0,0,0,0)');
          grad.addColorStop(1, 'rgba(15, 23, 42, 0.35)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (optMask === 'light_leak') {
          const leakX = (Math.sin((timestamp || Date.now()) * 0.001) + 1) * 0.5 * canvas.width;
          const grad = ctx.createRadialGradient(leakX, 0, 10, leakX, 0, canvas.width * 0.5);
          grad.addColorStop(0, 'rgba(251, 191, 36, 0.08)');
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (optMask === 'cinema_bars') {
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height * 0.08);
          ctx.fillRect(0, canvas.height * 0.92, canvas.width, canvas.height * 0.08);
      } else if (optMask === 'rgb_noise') {
          ctx.fillStyle = (Math.random() > 0.5) ? 'rgba(0, 242, 254, 0.015)' : 'rgba(239, 68, 68, 0.015)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // ৫. পারসেপচুয়াল নয়েজ মাস্ক ওভারলে
      if (optNoise !== 'no') {
          let alpha = 0.012;
          if (optNoise === 'high_noise') alpha = 0.025;
          if (optNoise === 'low_noise') alpha = 0.006;

          ctx.fillStyle = (Math.random() > 0.5) ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (!video.paused && !video.ended) {
          vcAnimFrameId = requestAnimationFrame(drawVcFrame);
      }
  }

  // ৪. প্রফেশনাল মাল্টি-ব্যান্ড অডিও ডিজিটাল সিগন্যাল প্রসেসিং (NO DISTORTION & FULL SOUND CAPTURE)
  function setupAdvancedAudioDSP(video, destStream) {
      if (!vcAudioContext) {
          vcAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      }

      // সাউন্ড ক্যাপচার সুনিশ্চিত করতে মিউট অপশন ফলস থাকবে
      video.muted = false;

      const source = vcAudioContext.createMediaElementSource(video);
      const optAudio = document.getElementById('vcOptAudio').value;
      const optPitch = document.getElementById('vcOptPitch').value;

      // ১. মাস্টার অডিও গেইন নোড (ক্লিপিং ও ডিস্টোর্শন বন্ধ করার হেডরুম বাফার)
      const masterGain = vcAudioContext.createGain();
      masterGain.gain.value = 1.0; 

      // ২. অডিও পিচ ও প্রিজার্ভেশন লজিক
      if (optPitch === 'dynamic_pitch' || optPitch === 'high_pitch' || optPitch === 'mild_high') {
          video.preservesPitch = false;
          video.webkitPreservesPitch = false;
      } else {
          video.preservesPitch = true;
          video.webkitPreservesPitch = true;
      }

      if (optAudio === 'stereo_notch' || optAudio === 'high_notch' || optAudio === 'low_rumble') {
          // হাই-ফিডেলিতি মাল্টি-ব্যান্ড ইকুয়ালাইজার ফিল্টার
          const hpFilter = vcAudioContext.createBiquadFilter();
          hpFilter.type = 'highpass';
          hpFilter.frequency.value = 40; // লো-ফ্রিকোয়েন্সি ফিল্টার

          const eqFilter = vcAudioContext.createBiquadFilter();
          eqFilter.type = 'peaking';
          eqFilter.frequency.value = 2200; // ভোকাল ফ্রিকোয়েন্সি শিফট
          eqFilter.Q.value = 1.0;
          eqFilter.gain.value = 1.5;

          const lpFilter = vcAudioContext.createBiquadFilter();
          lpFilter.type = 'lowpass';
          lpFilter.frequency.value = 16000;

          source.connect(hpFilter);
          hpFilter.connect(eqFilter);
          eqFilter.connect(lpFilter);
          lpFilter.connect(masterGain);
          masterGain.connect(destStream);

      } else {
          source.connect(masterGain);
          masterGain.connect(destStream);
      }
  }

  // ৫. অ্যান্টি-কপিরাইট প্রসেসিং ও এনকোডিং শুরু (SILENT AUDIO FIX APPLIED)
  async function processAntiCopyrightVideo() {
      if (!vcUploadedFile) {
          alert('দয়া করে প্রথমে একটি ভিডিও ফাইল আপলোড করুন।');
          return;
      }

      const statusEl = document.getElementById('vcStatus');
      const startBtn = document.getElementById('vcStartBtn');
      const downloadBtn = document.getElementById('vcDownloadBtn');
      const progressWrap = document.getElementById('vcProgressWrap');
      const progressBar = document.getElementById('vcProgressBar');
      const canvas = document.getElementById('vcPreviewCanvas');
      const processedVideo = document.getElementById('vcProcessedVideo');
      const emptyTransformed = document.getElementById('vcEmptyTransformed');

      statusEl.innerText = 'অডিও ও ভিডিও ফিল্টার প্রসেস করা হচ্ছে...';
      startBtn.disabled = true;
      downloadBtn.disabled = true;
      downloadBtn.style.opacity = '0.5';
      progressWrap.style.display = 'block';
      progressBar.style.width = '0%';

      // রাইট প্রিভিউ বক্সের টেস্ট রিসেট
      emptyTransformed.style.display = 'none';
      processedVideo.style.display = 'none';
      canvas.style.display = 'block';

      // DOMElement re-creation (সাউন্ড ক্যাপচারের জন্য muted = false)
      let oldVideo = document.getElementById('vcHiddenVideo');
      let video = document.createElement('video');
      video.id = 'vcHiddenVideo';
      video.style.display = 'none';
      video.playsInline = true;
      video.muted = false; // অডিও স্ট্রিমিং সচল রাখবে
      video.volume = 1.0;
      video.src = oldVideo.src;
      oldVideo.parentNode.replaceChild(video, oldVideo);

      vcRecordedChunks = [];

      try {
          if (!vcAudioContext || vcAudioContext.state === 'closed') {
              vcAudioContext = new (window.AudioContext || window.webkitAudioContext)();
          }
          if (vcAudioContext.state === 'suspended') {
              await vcAudioContext.resume();
          }

          video.currentTime = 0;
          const optSpeed = document.getElementById('vcOptSpeed').value;
          if (optSpeed !== 'dynamic' && optSpeed !== 'fast_wave' && optSpeed !== 'slow_wave') {
              video.playbackRate = parseFloat(optSpeed);
          }

          const audioDest = vcAudioContext.createMediaStreamDestination();
          setupAdvancedAudioDSP(video, audioDest);

          const canvasStream = canvas.captureStream(30);
          const audioTrack = audioDest.stream.getAudioTracks()[0];
          if (audioTrack) {
              canvasStream.addTrack(audioTrack);
          }

          let mimeType = 'video/webm;codecs=vp8,opus';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
              if (MediaRecorder.isTypeSupported('video/webm')) {
                  mimeType = 'video/webm';
              } else if (MediaRecorder.isTypeSupported('video/mp4')) {
                  mimeType = 'video/mp4';
              } else {
                  mimeType = '';
              }
          }

          const recorderOptions = {
              mimeType: mimeType || undefined,
              audioBitsPerSecond: 128000,
              videoBitsPerSecond: 2500000
          };
          vcMediaRecorder = new MediaRecorder(canvasStream, recorderOptions);

          vcMediaRecorder.ondataavailable = function(e) {
              if (e.data && e.data.size > 0) {
                  vcRecordedChunks.push(e.data);
              }
          };

          vcMediaRecorder.onstop = function() {
              const blob = new Blob(vcRecordedChunks, { type: mimeType || 'video/webm' });
              vcProcessedBlobUrl = URL.createObjectURL(blob);
              
              // ক্যানভাস হাইড করে ডানপাশের প্রিভিউ ভিডিও প্লেয়ার সচল করবে
              canvas.style.display = 'none';
              processedVideo.src = vcProcessedBlobUrl;
              processedVideo.style.display = 'block';

              statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> কপিরাইট মুক্ত ভিডিও তৈরি সম্পন্ন হয়েছে! ডানপাশে প্লে করে দেখুন।</span>';
              downloadBtn.disabled = false;
              downloadBtn.style.opacity = '1';
              startBtn.disabled = false;
              progressWrap.style.display = 'none';
          };

          await video.play();
          vcMediaRecorder.start();
          drawVcFrame(Date.now());

          video.ontimeupdate = function() {
              if (video.duration) {
                  const pct = Math.floor((video.currentTime / video.duration) * 100);
                  progressBar.style.width = pct + '%';
                  statusEl.innerText = `ভিডিও প্রসেসিং হচ্ছে: ${pct}% সম্পন্ন...`;
              }
          };

          video.onended = function() {
              if (vcMediaRecorder && vcMediaRecorder.state !== 'inactive') {
                  vcMediaRecorder.stop();
              }
          };

      } catch (err) {
          console.error('Error processing video stream:', err);
          statusEl.innerText = 'ভিডিও প্রসেস করতে ত্রুটি হয়েছে। আবার চেষ্টা করুন।';
          startBtn.disabled = false;
          progressWrap.style.display = 'none';
          canvas.style.display = 'none';
          emptyTransformed.style.display = 'block';
      }
  }

  // ৬. ট্রান্সফর্ম করা নতুন ফাইল ডাউনলোড
  function downloadProcessedVideo() {
      if (!vcProcessedBlobUrl) return;
      const a = document.createElement('a');
      a.href = vcProcessedBlobUrl;
      a.download = `copyright_free_${vcUploadedFile ? vcUploadedFile.name : 'transformed.webm'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }

  // ৭. টুল রিসেট লজিক
  function resetVideoCopyrightTool() {
      if (vcAnimFrameId) cancelAnimationFrame(vcAnimFrameId);
      const video = document.getElementById('vcHiddenVideo');
      const origVideo = document.getElementById('vcOriginalVideo');

      if (video) { video.pause(); video.src = ''; }
      if (origVideo) { origVideo.pause(); origVideo.src = ''; }

      vcUploadedFile = null;
      vcProcessedBlobUrl = null;
      vcRecordedChunks = [];

      document.getElementById('vcFileInput').value = '';
      document.getElementById('vcFileName').innerText = 'এখানে যেকোন ভিডিও আপলোড করুন!';
      
      document.getElementById('vcEmptyOriginal').style.display = 'block';
      document.getElementById('vcEmptyTransformed').style.display = 'block';
      document.getElementById('vcProcessedVideo').style.display = 'none';
      document.getElementById('vcPreviewCanvas').style.display = 'none';

      document.getElementById('vcStatus').innerText = 'ভিডিও আপলোড করে প্রসেস বাটনে চাপ দিন';
      document.getElementById('vcStartBtn').disabled = false;
      
      const downloadBtn = document.getElementById('vcDownloadBtn');
      downloadBtn.disabled = true;
      downloadBtn.style.opacity = '0.5';
      
      document.getElementById('vcProgressWrap').style.display = 'none';

      const canvas = document.getElementById('vcPreviewCanvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
