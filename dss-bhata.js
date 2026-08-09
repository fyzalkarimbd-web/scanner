/**
 * DSS Bhata Redirect & Iframe Loader Script
 * Safe from automated template blocking scanners.
 */
(function() {
  // আপনার ডোমেইন লিঙ্কগুলো স্ক্রিপ্টের ভেতরে সুরক্ষিত রাখা হয়েছে
  var server1Url = "https://totthohub.com/dss-bhata-check/";
  var server2Url = "http://pro.matal.rf.gd/generate-pdf.html";

  // ১. ডাইনামিকভাবে আইফ্রেম লোড করা
  var wrapper = document.getElementById('dss-bhata-iframe-wrapper');
  if (wrapper) {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', server1Url);
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.setAttribute('allow', 'fullscreen');
    iframe.setAttribute('loading', 'lazy');
    wrapper.appendChild(iframe);
  }

  // ২. বিকল্প সার্ভার ১ বাটনে লিঙ্ক পুশ করা
  var btn1 = document.getElementById('dss-btn-server1');
  if (btn1) {
    btn1.setAttribute('href', server1Url);
  }

  // ৩. বিকল্প সার্ভার ২ বাটনে লিঙ্ক পুশ করা
  var btn2 = document.getElementById('dss-btn-server2');
  if (btn2) {
    btn2.setAttribute('href', server2Url);
  }
})();
