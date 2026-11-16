// ডোনেশন মোডাল অ্যাক্টিভেশন
  function openDonationModal() {

      const modal = document.getElementById('donationModal');
      if (modal) {
          modal.style.display = 'flex'; // মোডাল ওপেন হবে
          document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল লক করবে
      }
  }

  function closeDonationModal() {
      const modal = document.getElementById('donationModal');
      if (modal) {
          modal.style.display = 'none'; // মোডাল ক্লোজ হবে
          document.body.style.overflow = ''; // ব্যাকগ্রাউন্ড স্ক্রোল পুনরায় সচল করবে
      }
  }
  // Copy Number Function
  function copyDonateNumber() {
    var numberText = document.getElementById("donate-number").innerText;
    var copyBtn = document.getElementById("copy-btn-el");
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(numberText).then(function() {
        showCopySuccess(copyBtn);
      }).catch(function() {
        fallbackCopyDonateNumber(numberText, copyBtn);
      });
    } else {
      fallbackCopyDonateNumber(numberText, copyBtn);
    }
  }

  function fallbackCopyDonateNumber(text, copyBtn) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(copyBtn);
    } catch (err) {
      alert("কপি করতে সমস্যা হয়েছে!");
    }
    document.body.removeChild(textArea);
  }

  function showCopySuccess(copyBtn) {
    copyBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> কপি হয়েছে!';
    copyBtn.style.background = '#0284c7'; 
    setTimeout(function() {
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> কপি করুন!';
      copyBtn.style.background = '#10b981'; 
    }, 3000);
  }

  // Submit Feedback Function (DYNAMIC POPUP WARNING & SUCCESS UPDATE)
  function submitDonationInfo() {
    var name = document.getElementById("donor-name").value.trim();
    var phone = document.getElementById("donor-phone").value.trim();
    var comment = document.getElementById("donor-comment").value.trim();
    
    var iconBox = document.getElementById('donPopupIcon');
    var msgBox = document.getElementById('donPopupMsg');
    var popup = document.getElementById('donSuccessPopup');
    var card = document.getElementById('donSuccessCard');

    // ১. ইনপুট বক্স খালি থাকলে ওয়ার্নিং পপ-আপ মডাল দেখাবে
    if (name === "" || phone === "" || comment === "") {
        if (iconBox) {
            iconBox.className = 'don-success-icon warning';
            iconBox.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        }
        if (card) {
            card.style.borderTopColor = '#f59e0b'; // ওয়ার্নিং অরেঞ্জ বর্ডার
        }
        if (msgBox) {
            msgBox.innerText = 'অনুগ্রহ করে আপনার নাম, ফোন নম্বর এবং মন্তব্য/টাকার পরিমাণ লিখুন!';
        }
        if (popup) {
            popup.style.display = 'flex';
        }
        return;
    }

    // ২. ইনপুট বক্স সঠিকভাবে পূরণ করা থাকলে সাকসেস পপ-আপ মডাল দেখাবে
    if (iconBox) {
        iconBox.className = 'don-success-icon success';
        iconBox.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    }
    if (card) {
        card.style.borderTopColor = '#10b981'; // সাকসেস গ্রিন বর্ডার
    }
    if (msgBox) {
        msgBox.innerText = 'আপনার প্রমাণ সফলভাবে জমা হয়েছে! সহযোগিতার জন্য অসংখ্য ধন্যবাদ।';
    }
    if (popup) {
        popup.style.display = 'flex';
    }

    // ইনপুট ফিল্ড খালি করবে
    document.getElementById("donor-name").value = "";
    document.getElementById("donor-phone").value = "";
    document.getElementById("donor-comment").value = "";
  }

  // সাকসেস/ওয়ার্নিং পপ-আপ ক্লোজ করার ফাংশন
  function closeDonSuccessPopup() {
    var popup = document.getElementById('donSuccessPopup');
    if (popup) {
        popup.style.display = 'none';
    }
  }
