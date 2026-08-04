let recognitionInstance = null;
  let isRecordingActive = false;
  let lastResultTime = 0; // সাইলেন্স বা বিরতি ট্র্যাক করার গ্লোবাল টাইমস্ট্যাম্প

  // ১. ডাইনামিক লাইভ ইউআই ট্রান্সলেশন ডেটা (NEW UPDATE)
  const vwTranslations = {
      'en-US': {
          title: 'Smart Voice Writer',
          sub: 'Type effortlessly in Bangla or English using your voice',
          micNotice: '<i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b; font-size: 16px; margin-right: 5px;"></i> <strong>Important Note:</strong> If you are using a computer or laptop, please ensure a working <b>microphone</b> is connected and allowed in your browser settings.',
          langLabel: '<i class="fa-solid fa-language"></i> Select Typing Language:',
          statusIdle: 'Click microphone above to start dictating',
          statusListening: 'Listening... Speak now.',
          outputLabel: '<i class="fa-solid fa-keyboard"></i> Dictated Text Output:',
          outputPlaceholder: 'Your typed text will appear here as you speak...',
          btnCopy: '<i class="fa-regular fa-copy"></i> Copy Text',
          btnClear: '<i class="fa-solid fa-trash-can"></i> Clear Text'
      },
      'bn-BD': {
          title: 'স্মার্ট ভয়েস রাইটার',
          sub: 'মুখের কথায় বাংলা ও ইংরেজিতে সহজেই টাইপ করুন!',
          micNotice: '<i class="fa-solid fa-triangle-exclamation" style="color: #f59e0b; font-size: 16px; margin-right: 5px;"></i> <strong>গুরুত্বপূর্ণ নোটিশ:</strong> আপনি যদি কম্পিউটার বা ল্যাপটপ ব্যবহার করেন, তবে দয়া করে একটি সচল <b>মাইক্রোফোন</b> কানেক্ট করে ব্রাউজার সেটিংসে অনুমতি নিশ্চিত করুন।',
          langLabel: '<i class="fa-solid fa-language"></i> টাইপিং এর ভাষা সিলেক্ট করুন:',
          statusIdle: 'কথা বলা শুরু করতে উপরের মাইক্রোফোন আইকনে ক্লিক করুন!',
          statusListening: 'শুনছি... এখন কথা বলুন।',
          outputLabel: '<i class="fa-solid fa-keyboard"></i> ভয়েস টাইপ হওয়া টেক্সট আউটপুট:',
          outputPlaceholder: 'কথা বলার সাথে সাথে আপনার টাইপ করা টেক্সট এখানে প্রদর্শিত হবে...',
          btnCopy: '<i class="fa-regular fa-copy"></i> টেক্সট কপি করুন',
          btnClear: '<i class="fa-solid fa-trash-can"></i> টেক্সট মুছুন'
      }
  };

  // ২. ডাইনামিক ইউআই ল্যাঙ্গুয়েজ আপডেটার (NEW UPDATE)
  function translateVoiceWriterUi(lang) {
      const t = vwTranslations[lang] || vwTranslations['bn-BD'];
      
      document.getElementById('vwTitleText').innerHTML = `<i class="fa-solid fa-microphone"></i> ` + t.title;
      document.getElementById('vwSubText').innerText = t.sub;
      document.getElementById('vwMicNotice').innerHTML = t.micNotice;
      document.getElementById('vwLangLabel').innerHTML = t.langLabel;
      document.getElementById('vwOutputLabel').innerHTML = t.outputLabel;
      document.getElementById('voiceWriterOutput').placeholder = t.outputPlaceholder;
      
      const copyBtn = document.getElementById('vwCopyBtn');
      if (!copyBtn.classList.contains('copied-success-state')) {
          copyBtn.innerHTML = t.btnCopy;
      }
      document.getElementById('vwClearBtn').innerHTML = t.btnClear;

      if (!isRecordingActive) {
          document.getElementById('voiceWriterStatus').innerText = t.statusIdle;
      }
  }

  // এআই রুলসের জন্য প্রশ্নবোধক শব্দের তালিকা (বাংলা ও ইংরেজি)
  const bnQuestions = ['কি', 'কী', 'কেন', 'কোথায়', 'কোথাই', 'কিভাবে', 'কেমন', 'কখন', 'কে', 'কিসের', 'কবে', 'নাকি'];
  const enQuestions = ['who', 'what', 'where', 'why', 'how', 'when', 'which', 'whom', 'whose', 'is', 'are', 'can', 'do', 'does', 'did', 'would', 'could', 'should', 'was', 'were', 'has', 'have', 'had', 'am', 'will', 'shall'];

  // এআই রুলসের জন্য কমা বসানোর সংযোজক শব্দের তালিকা (বাংলা ও ইংরেজি)
  const bnConjunctions = ['কিন্তু', 'এবং', 'অথবা', 'তবে', 'যদিও', 'কারণ', 'নতুবা'];
  const enConjunctions = ['but', 'and', 'or', 'because', 'although', 'however', 'since', 'so'];

  // এআই (AI) রিয়েল-টাইম স্বয়ংক্রিয় বিরামচিহ্ন বসানোর ইঞ্জিন
  function applyTrueAiPunctuation(text, lang) {
      let processed = text.trim();
      if (!processed) return '';

      const isBangla = lang.startsWith('bn');
      const questionWords = isBangla ? bnQuestions : enQuestions;
      const conjunctions = isBangla ? bnConjunctions : enConjunctions;

      // ১. কনজাংশনের পূর্বে স্বয়ংক্রিয় কমা (,) বসাবে (যেমন: "যাব কিন্তু কাল" -> "যাব, কিন্তু কাল")
      conjunctions.forEach(word => {
          if (isBangla) {
              const bnRegex = new RegExp('\\s+' + word + '\\s+', 'g');
              processed = processed.replace(bnRegex, `, ${word} `);
          } else {
              const regex = new RegExp('\\b' + word + '\\b', 'gi');
              processed = processed.replace(regex, `, ${word}`);
          }
      });

      // ২. বাক্যটি প্রশ্নবোধক কিনা তা প্রথম ২টি শব্দ বিশ্লেষণ করে ডিটেক্ট করবে [1.1.2]
      let wordsArray = processed.split(/\s+/);
      let isQuestion = false;
      if (wordsArray.length > 0) {
          let firstWord = wordsArray[0].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
          isQuestion = questionWords.includes(firstWord);
          if (!isQuestion && wordsArray.length > 1) {
              let secondWord = wordsArray[1].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
              isQuestion = questionWords.includes(secondWord);
          }
      }

      // ৩. বাক্য শেষে উপযুক্ত বিরামচিহ্ন নির্ধারণ করবে (দাড়ি/ফুলস্টপ নাকি প্রশ্নবোধক) [1.1.2]
      let endChar = isBangla ? '।' : '.';
      if (isQuestion) {
          endChar = '?';
      }

      // বাক্যের শেষে অলরেডি কোনো বিরামচিহ্ন না থাকলে তা যুক্ত করবে
      if (!/[।.,!?]$/.test(processed)) {
          processed += endChar;
      }

      return processed;
  }

  // গ্লোবাল স্পেসিং এবং ব্যাকরণ এআই এডিটর (স্পেস এবং ইংরেজি ক্যাপিটালাইজেশন ঠিক করবে)
  function cleanGlobalSpacing(text, lang) {
      let processed = text;
      const isBangla = lang.startsWith('bn');

      if (isBangla) {
          processed = processed
              .replace(/\s+([।,!\?])/g, '$1') // চিহ্নের আগের স্পেস ডিলিট করবে
              .replace(/([।,!\?])([^\s\n])/g, '$1 $2') // চিহ্নের পরে স্পেস না থাকলে ১টি স্পেস দেবে
              .replace(/\s+/g, ' '); // ডাবল স্পেস ডিলিট করবে
      } else {
          processed = processed
              .replace(/\s+([\.,!\?])/g, '$1')
              .replace(/([\.,!\?])([a-zA-Z])/g, '$1 $2')
              .replace(/\s+/g, ' ');

          // ইংরেজি প্রথম অক্ষর অটো-ক্যাপিটালাইজ করবে
          processed = processed.replace(/(^\s*|[.!?]\s+)([a-z])/g, function(match, separator, char) {
              return separator + char.toUpperCase();
          });
      }
      return processed;
  }

  // ভয়েস রাইটার মোডাল অ্যাক্টিভেশন (আপনার দেওয়া ফাংশন)
  function openVoiceWriterModal() {
      const modal = document.getElementById('voiceWriterModal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক হবে [1.1.2]
      }
      // ওপেন হওয়ার সাথে সাথে ভাষা অনুযায়ী রেন্ডার করবে
      const currentLang = document.getElementById('vwLangSelect').value;
      translateVoiceWriterUi(currentLang);
  }

  // মোডাল ক্লোজ ও রেকর্ড টার্মিনেশন (আপনার দেওয়া ফাংশন)
  function closeVoiceWriterModal() {
      const modal = document.getElementById('voiceWriterModal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল পুনরায় সচল হবে [1.1.2]
          stopVoiceRecording(); // রেকর্ড সচল থাকলে বন্ধ করে দেবে
      }
  }

  // ৩. ভয়েস টাইপিং ইঞ্জিন ইনিশিয়ালাইজেশন
  function initSpeechEngine() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const statusEl = document.getElementById('voiceWriterStatus');
      const currentLang = document.getElementById('vwLangSelect').value;

      if (!SpeechRecognition) {
          const userAgent = navigator.userAgent.toLowerCase();
          const isFirefox = userAgent.includes('firefox');

          if (isFirefox) {
              // ফায়ারফক্স ইউজারদের জন্য অ্যাক্টিভেশন নির্দেশাবলী
              statusEl.innerHTML = `
                <div
  style='background: rgb(254, 242, 242); border-color: rgb(254, 202, 202) rgb(254, 202, 202) rgb(254, 202, 202) rgb(239, 68, 68); border-image: none; border-left: 5px solid #ef4444; border-radius: 10px; border-style: solid; border-width: 1px 1px 1px 5px; border: 1px solid rgb(254, 202, 202); color: #991b1b; font-family: "Inter", sans-serif; font-size: 13px; line-height: 1.5; padding: 12px; text-align: left;'
>
  <b
    >এই টোল মজিলা ফায়ারফক্সে কাজ নাও করতে পারে, তাই অন্য ব্রাউজারে চেষ্টা
    করুন।</b
  ><br />This tool may not work in Mozilla Firefox, so try another browser.
</div>
              `;
          } else {
              const errText = vwTranslations[currentLang] ? vwTranslations[currentLang].errNoSpeech : vwTranslations['bn-BD'].errNoSpeech;
              statusEl.innerHTML = errText;
          }
          return null;
      }

      const rec = new SpeechRecognition();
      rec.continuous = true; // একনাগাড়ে রেকর্ড করবে
      rec.interimResults = true; // রিয়েল-টাইম ট্রান্সক্রিপশন রেন্ডার করবে

      rec.onstart = function() {
          isRecordingActive = true;
          updateVoiceWriterUI();
      };

      // লাইভ ভয়েস ডাটা ও এআই পাঙ্কচুয়েশন প্রোসেসিং লজিক
      rec.onresult = function(event) {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                  finalTranscript += event.results[i][0].transcript;
              } else {
                  interimTranscript += event.results[i][0].transcript;
              }
          }

          const outputTextarea = document.getElementById('voiceWriterOutput');
          const lang = document.getElementById('vwLangSelect').value;

          if (finalTranscript) {
              let currentTime = Date.now();
              let timeGap = lastResultTime === 0 ? 0 : (currentTime - lastResultTime);
              lastResultTime = currentTime;

              // ১. ৩.৫ সেকেন্ডের বেশি নিরবতা থাকলে অটোমেটিক নতুন লাইন (New Line / Auto Paragraph) তৈরি করবে
              let prefix = '';
              if (timeGap > 3500) {
                  prefix = '\n';
              } else if (outputTextarea.value && !outputTextarea.value.endsWith(' ') && !outputTextarea.value.endsWith('\n')) {
                  prefix = ' ';
              }

              // ২. কাস্টম এআই পাঙ্কচুয়েশন ইঞ্জিন কল হবে (অটো-দাড়ি, কমা, কোশ্চেন মার্ক)
              let formattedFinal = applyTrueAiPunctuation(finalTranscript, lang);

              outputTextarea.value += prefix + formattedFinal;

              // ৩. সম্পূর্ণ টেক্সট বক্সের ভেতরের স্পেসিং ও ব্যাকরণ এআই এডিটর দিয়ে রি-ফরম্যাট করবে
              outputTextarea.value = cleanGlobalSpacing(outputTextarea.value, lang);
          }

          // লাইভ সাবটাইটেল প্রিভিউ আপডেট
          if (interimTranscript) {
              let formattedInterim = applyTrueAiPunctuation(interimTranscript, lang);
              statusEl.innerText = formattedInterim;
          } else {
              const activeText = vwTranslations[lang] ? vwTranslations[lang].statusListening : vwTranslations['bn-BD'].statusListening;
              statusEl.innerText = activeText;
          }
      };

      rec.onerror = function(event) {
          console.error('Speech recognition error', event);
          if (event.error === 'not-allowed') {
              alert('Microphone access denied! Please allow microphone permissions in your browser settings.');
          }
          stopVoiceRecording();
      };

      rec.onend = function() {
          isRecordingActive = false;
          updateVoiceWriterUI();
      };

      return rec;
  }

  // স্টার্ট ও স্টপ টগল লজিক
  function toggleVoiceRecording() {
      if (isRecordingActive) {
          stopVoiceRecording();
      } else {
          startVoiceRecording();
      }
  }

  // রেকর্ড সচল করার লজিক
  function startVoiceRecording() {
      if (!recognitionInstance) {
          recognitionInstance = initSpeechEngine();
      }

      if (recognitionInstance) {
          const lang = document.getElementById('vwLangSelect').value;
          recognitionInstance.lang = lang; // ভাষা সেট করবে
          recognitionInstance.start();
      }
  }

  // রেকর্ড বন্ধ করার লজিক
  function stopVoiceRecording() {
      if (recognitionInstance) {
          recognitionInstance.stop();
      }
      isRecordingActive = false;
      updateVoiceWriterUI();
  }

  // ভাষা পরিবর্তন করলে বাটন রিসেট করবে (অন-চেঞ্জ লিসেনার)
  function resetVoiceEngine() {
      const currentLang = document.getElementById('vwLangSelect').value;
      stopVoiceRecording();
      translateVoiceWriterUi(currentLang); // ভাষা রূপান্তর করবে (NEW UPDATE)
  }

  // প্রফেশনাল অ্যানিমেশন এবং ইউআই স্ট্যাটাস পরিবর্তন
  function updateVoiceWriterUI() {
      const btn = document.getElementById('vwRecordBtn');
      const wave = document.getElementById('vwWaveform');
      const statusEl = document.getElementById('voiceWriterStatus');
      const lang = document.getElementById('vwLangSelect').value;

      const activeText = vwTranslations[lang] ? vwTranslations[lang].statusListening : vwTranslations['bn-BD'].statusListening;
      const idleText = vwTranslations[lang] ? vwTranslations[lang].statusIdle : vwTranslations['bn-BD'].statusIdle;

      if (isRecordingActive) {
          btn.classList.add('recording');
          btn.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
          wave.style.display = 'flex';
          statusEl.innerText = activeText;
      } else {
          btn.classList.remove('recording');
          btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
          wave.style.display = 'none';
          statusEl.innerText = idleText;
      }
  }

  // টাইপ করা টেক্সট ক্লিপবোর্ডে কপি করা
  function copyDictatedText() {
      const text = document.getElementById('voiceWriterOutput').value.trim();
      const btn = document.getElementById('vwCopyBtn');

      if (!text) {
          alert('There is no text to copy.');
          return;
      }

      if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(() => {
              showVwCopySuccess(btn);
          }).catch(() => {
              fallbackVwCopy(btn, text);
          });
      } else {
          fallbackVwCopy(btn, text);
      }
  }

  // ওল্ডার ব্রাউজার ফ্যালব্যাক কপি লজিক
  function fallbackVwCopy(btn, text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
          document.execCommand('copy');
          showVwCopySuccess(btn);
      } catch (err) {
          console.error("Failed to copy text", err);
      }
      document.body.removeChild(textArea);
  }

  // কপি বাটন সাকসেস এনিমেশন
  function showVwCopySuccess(btn) {
      const lang = document.getElementById('vwLangSelect').value;
      const copiedText = vwTranslations[lang] ? vwTranslations[lang].btnCopied : vwTranslations['bn-BD'].btnCopied;
      const originalText = vwTranslations[lang] ? vwTranslations[lang].btnCopy : vwTranslations['bn-BD'].btnCopy;

      btn.innerHTML = copiedText;
      btn.style.background = '#10b981'; // সাকসেস গ্রিন
      btn.classList.add('copied-success-state');

      setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.classList.remove('copied-success-state');
      }, 2000);
  }

  // টেক্সট বক্স ক্লিয়ার লজিক
  function clearDictatedText() {
      document.getElementById('voiceWriterOutput').value = '';
      resetVoiceEngine();
  }
