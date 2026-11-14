  (function() {
      // সাইটের যেকোনো মোডাল বা পপ-আপ খোলা আছে কিনা তা চেক করার ফাংশন
      function checkAndLockBackgroundScroll() {
          const modals = document.querySelectorAll('.crop-modal-overlay, .modal');
          let isModalVisible = false;

          modals.forEach(function(modal) {
              const displayStyle = window.getComputedStyle(modal).display;
              if (displayStyle !== 'none') {
                  isModalVisible = true;
              }
          });

          // মোডাল খোলা থাকলে ব্যাকগ্রাউন্ড স্ক্রোল বন্ধ করবে, অন্যথায় চালু করবে [1.1.2]
          if (isModalVisible) {
              document.body.style.overflow = 'hidden';
          } else {
              document.body.style.overflow = '';
          }
      }

      // ডম বা মোডালে পরিবর্তন হওয়া মাত্রই স্বয়ংক্রিয়ভাবে ডিটেক্ট করবে
      const scrollLockObserver = new MutationObserver(checkAndLockBackgroundScroll);

      document.addEventListener('DOMContentLoaded', function() {
          scrollLockObserver.observe(document.body, {
              attributes: true,
              attributeFilter: ['style', 'class'],
              subtree: true
          });
          checkAndLockBackgroundScroll(); // প্রাথমিক চেক
      });
  })();
