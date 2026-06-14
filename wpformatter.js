// মোডাল ওপেন ও ক্লোজ লজিক
  function openWaFormatterModal() {
      document.getElementById('waFormatterModal').style.display = 'flex';
      setupDefaultWaTime();
  }

  function closeWaFormatterModal() {
      document.getElementById('waFormatterModal').style.display = 'none';
      clearWaFormatterForm();
  }

  // হোয়াটসঅ্যাপ চ্যাট বাবলের জন্য রিয়েল-টাইম কাস্টম টাইম সেটাপ
  function setupDefaultWaTime() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      const strTime = hours + ':' + minutes + ' ' + ampm;
      
      const timeEl = document.getElementById('waFormatterTime');
      if (timeEl) timeEl.innerText = strTime;
  }

  // টুলবার থেকে এডিটর ফরম্যাটিং ইনজেক্ট লজিক (সিলেকশন প্রিজার্ভেশন সহ)
  function insertWaFormat(tag) {
      const textarea = document.getElementById('waFormatterInput');
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const selectedText = text.substring(start, end);
      
      let replacement = '';
      if (tag === 'bold') replacement = `*${selectedText || 'bold text'}*`;
      else if (tag === 'italic') replacement = `_${selectedText || 'italic text'}_`;
      else if (tag === 'strike') replacement = `~${selectedText || 'strikethrough text'}~`;
      else if (tag === 'code') replacement = `\`${selectedText || 'monospace text'}\``;
      else if (tag === 'bullet') replacement = `\n- ${selectedText || 'list item'}`;
      else if (tag === 'number') replacement = `\n1. ${selectedText || 'list item'}`;
      else if (tag === 'quote') replacement = `\n> ${selectedText || 'quoted text'}`;
      else if (tag === 'codeblock') replacement = `\n\`\`\`\n${selectedText || 'code block'}\n\`\`\``;

      textarea.value = text.substring(0, start) + replacement + text.substring(end);
      textarea.focus();
      
      // কার্সার পুনরায় টেক্সট ফোকাসে নিয়ে যাবে
      const selectionOffset = selectedText ? replacement.length : replacement.length - 1;
      textarea.setSelectionRange(start + 1, start + selectionOffset - 1);
      
      updateWaFormatterPreview();
  }

  // লাইভ বাবল প্রিভিউ পার্সার (৮টি আলাদা ক্যাটাগরি সাপোর্ট করবে)
  function updateWaFormatterPreview() {
      const input = document.getElementById('waFormatterInput').value;
      
      // ১. সিকিউরিটির জন্য এইচটিএমএল ট্যাগ এস্কেপিং
      let escaped = input
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      
      // ২. লাইন-বাই-লাইন ফিচারের জন্য পার্সিং (লিস্ট, কোটেশন)
      let lines = escaped.split('\n');
      let parsedLines = lines.map(line => {
          let trimmed = line.trim();
          
          // ব্লককোট বা উক্তি (শুরুতে '>' থাকলে) [1.1.2]
          if (trimmed.startsWith('&gt;')) {
              return `<blockquote style="border-left: 3px solid #10b981; padding-left: 10px; margin: 5px 0; color: #475569; font-style: italic;">${trimmed.substring(4).trim()}</blockquote>`;
          }
          // বুলেট পয়েন্ট লিস্ট (শুরুতে '-' থাকলে) [1.1.2]
          if (trimmed.startsWith('-')) {
              return `<span style="padding-left: 10px; display: inline-block;">• ${trimmed.substring(1).trim()}</span>`;
          }
          // সংখ্যাযুক্ত লিস্ট (শুরুতে সংখ্যা ও ডট থাকলে, যেমন: 1.) [1.1.2]
          if (/^\d+\./.test(trimmed)) {
              return `<span style="padding-left: 10px; display: inline-block;">${trimmed}</span>`;
          }
          return line;
      });
      
      let processedText = parsedLines.join('\n');
      
      // ৩. ইনলাইন ফরম্যাটিং পার্সিং (বোল্ড, ইটালিক, কোড ব্লক)
      let html = processedText
          .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
          .replace(/_(.*?)_/g, '<em>$1</em>')
          .replace(/~(.*?)~/g, '<del>$1</del>')
          .replace(/```([\s\S]*?)```/g, '<pre style="background: rgba(0,0,0,0.05); padding: 8px; border-radius: 6px; font-family: monospace; white-space: pre-wrap; margin: 5px 0; text-align: left;">$1</pre>')
          .replace(/`(.*?)`/g, '<code>$1</code>')
          .replace(/\n/g, '<br/>');

      const previewContainer = document.getElementById('waFormatterPreview');
      if (html.trim() !== "") {
          previewContainer.innerHTML = html;
      } else {
          previewContainer.innerHTML = '<span style="color: #667781; font-style: italic;">Your formatted message preview will show here...</span>';
      }
  }

  // সরাসরি ইনপুট নম্বর বা ডিরেক্ট হোয়াটসঅ্যাপে মেসেজ পাঠানো
  function sendDirectWaFormatted() {
      const text = document.getElementById('waFormatterInput').value.trim();
      let phone = document.getElementById('waFormatterPhone').value.trim().replace(/\+/g, '').replace(/[\s-]/g, '');

      if (!text) {
          alert('Please write some text to send.');
          return;
      }

      const encodedText = encodeURIComponent(text);
      const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
      window.open(waUrl, '_blank').focus();
  }

  // ক্লিপবোর্ডে কপি করা
  function copyFormattedWaText() {
      const text = document.getElementById('waFormatterInput').value.trim();
      const btn = document.getElementById('waFormatterCopyBtn');
      const statusEl = document.getElementById('waFormatterStatus');

      if (!text) {
          alert('There is no text to copy.');
          return;
      }

      if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(() => {
              showWaCopySuccess(btn, statusEl);
          }).catch(() => {
              fallbackWaCopy(btn, statusEl, text);
          });
      } else {
          fallbackWaCopy(btn, statusEl, text);
      }
  }

  // ওল্ডার ব্রাউজার ফ্যালব্যাক কপি লজিক
  function fallbackWaCopy(btn, statusEl, text) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
          document.execCommand('copy');
          showWaCopySuccess(btn, statusEl);
      } catch (err) {
          statusEl.innerText = 'Failed to copy text';
      }
      document.body.removeChild(textArea);
  }

  // কপি বাটন সাকসেস এনিমেশন
  function showWaCopySuccess(btn, statusEl) {
      const originalHTML = '<i class="fa-regular fa-copy"></i> Copy Formatted Text';
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Copied!';
      btn.style.background = '#10b981'; // সাকসেস গ্রিন
      statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> Formatted text copied successfully!</span>';

      setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          statusEl.innerText = 'Ready to format & share';
      }, 2000);
  }

  //Form Reset Logic
  function clearWaFormatterForm() {
      document.getElementById('waFormatterInput').value = '';
      document.getElementById('waFormatterPhone').value = '';
      document.getElementById('waFormatterStatus').innerText = 'Ready to format & share';
      updateWaFormatterPreview();
      setupDefaultWaTime();
  }
