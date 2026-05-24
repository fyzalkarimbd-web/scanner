document.addEventListener("DOMContentLoaded", function() {
      // ইংরেজি সংখ্যাকে বাংলা সংখ্যায় কনভার্ট করার ফাংশন
      function convertToBanglaNumber(n) {
          const banglaDigits = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
          return n.toString().replace(/[0-9]/g, function(w) {
              return banglaDigits[w] || w;
          });
      }

      // লোকাল স্টোরেজ থেকে ডেটা নিয়ে ইনিশিয়াল ভ্যালু সেট করবে
      let customerCount = parseInt(localStorage.getItem('total_cust')) || 5740;
      let orderCount = parseInt(localStorage.getItem('total_ord')) || 4900;

      const statCustEl = document.getElementById('totalCust');
      const statOrderEl = document.getElementById('totalOrder');

      if (statCustEl) statCustEl.innerText = convertToBanglaNumber(customerCount);
      if (statOrderEl) statOrderEl.innerText = convertToBanglaNumber(orderCount);

      // স্বয়ংক্রিয়ভাবে কাস্টমার এবং অর্ডারের সংখ্যা বাড়ানোর ফাংশন
      function updateTrustStats() {
          if (!statCustEl || !statOrderEl) return;

          // ১ জন কাস্টমার বৃদ্ধি
          customerCount += 1;
          localStorage.setItem('total_cust', customerCount);
          statCustEl.innerText = convertToBanglaNumber(customerCount);
          
          // ১৫ সেকেন্ড পর ১টি অর্ডার বৃদ্ধি
          setTimeout(() => {
              orderCount += 1;
              localStorage.setItem('total_ord', orderCount);
              statOrderEl.innerText = convertToBanglaNumber(orderCount);
          }, 15000);

          // প্রতি ২ থেকে ৩ মিনিটের মধ্যে র্যান্ডম সময়ে কাউন্টার আপডেট হবে
          let nextTick = Math.floor(Math.random() * (180000 - 120000 + 1)) + 120000;
          setTimeout(updateTrustStats, nextTick);
      }
      
      // প্রথম লোডের ১০ সেকেন্ড পর কাউন্ট ডাউন শুরু হবে
      if (statCustEl) {
          setTimeout(updateTrustStats, 10000);
      }
  });




(function() {
    var authorizedDomain = "www.idcardscannerpro.com"; // আপনার নিজের ডোমেইন
    var currentDomain = window.location.hostname;

    // যদি বর্তমান ডোমেইন আপনার ডোমেইনের সাথে না মিলে
    if (currentDomain !== authorizedDomain && currentDomain !== "idcardscannerpro.com") {
        alert("Warning: This is a stolen copy of ID Card Scanner Pro! Redirecting to original site...");
        window.location.href = "https://" + authorizedDomain + "/";
    }
})();
