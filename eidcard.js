/* 
 * Unauthorized copying or redistribution of this code is strictly prohibited.
 * Locked to: idcardscannerpro.com, www.idcardscannerpro.com
 */
(function() {
    // অনুমোদিত ডোমেইন লিস্ট
    var allowedDomains = ["idcardscannerpro.com", "www.idcardscannerpro.com"];
    var currentHost = window.location.hostname.toLowerCase();

    // চেক করা হচ্ছে ডোমেইন ঠিক আছে কি না
    if (allowedDomains.indexOf(currentHost) === -1) {
        // যদি ডোমেইন না মিলে তবে স্ক্রিন লক করে দেবে
        document.documentElement.innerHTML = `
        <div style="background:#0f172a; color:#f1f5f9; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; font-family:sans-serif; padding:20px;">
            <div style="background:#1e293b; padding:40px; border-radius:20px; border:2px solid #ef4444; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                <h1 style="color:#ef4444; font-size:40px; margin-bottom:10px;">Access Denied!</h1>
                <p style="font-size:18px; margin-bottom:25px;">This script is unauthorized for use on this domain.</p>
                <p style="font-size:14px; color:#94a3b8;">Original Source:</p>
                <a href="https://www.idcardscannerpro.com" style="background:#4f46e5; color:#fff; text-decoration:none; padding:12px 25px; border-radius:10px; font-weight:bold; display:inline-block; margin-top:10px;">Go to Official Website</a>
            </div>
        </div>`;

        // স্ক্রিপ্টের বাকি সব কাজ বন্ধ করে দেবে
        window.stop(); 
        throw new Error("Script execution stopped: Domain unauthorized.");
    }
})();

// ---------------------------------

let epCropper = null;

  function openEidPosterModal() {
      setActiveMode('mode-eid-poster');
      document.getElementById('eidPosterModal').style.display = 'flex';
      resizeEpPreview(); 
  }

  function closeEidPosterModal() {
      document.getElementById('eidPosterModal').style.display = 'none';
      resetEidPoster();
  }

  // Update Data and Templates
  function updateEidPoster() {
      document.getElementById('out-ep-name').innerText = document.getElementById('ep-name').value || 'আপনার নাম';
      document.getElementById('out-ep-title').innerText = document.getElementById('ep-title').value || 'আপনার পদবি';
      document.getElementById('out-ep-address').innerText = document.getElementById('ep-address').value || 'আপনার ঠিকানা';
      document.getElementById('out-ep-msg').innerText = document.getElementById('ep-msg').value || 'সবাইকে পবিত্র ঈদুল ফিতরের শুভেচ্ছা ও অভিনন্দন';
      
      // Update Theme and Layout dynamically
      const poster = document.getElementById('eid-poster-export');
      const theme = document.getElementById('ep-theme').value;
      const layout = document.getElementById('ep-layout').value;
      poster.className = 'ep-poster-export ' + theme + ' ' + layout;
  }

  // Load and Init Crop
  function loadEpPhoto(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const image = document.getElementById('ep-crop-image');
              image.src = e.target.result;
              document.getElementById('ep-cropper-modal').style.display = 'flex';
              
              if (epCropper) {
                  epCropper.destroy();
              }
              // Initialize Cropper.js
              epCropper = new Cropper(image, {
                  aspectRatio: 1, // 1:1 Square/Circle crop
                  viewMode: 1,
                  autoCropArea: 1
              });
          }
          reader.readAsDataURL(file);
      }
  }

  // Save Cropped Image
  function saveEpCrop() {
      if (epCropper) {
          const canvas = epCropper.getCroppedCanvas({
              width: 500,
              height: 500
          });
          document.getElementById('out-ep-photo').src = canvas.toDataURL('image/jpeg', 0.95);
          closeEpCrop();
      }
  }

  // Close Cropper Modal
  function closeEpCrop() {
      document.getElementById('ep-cropper-modal').style.display = 'none';
      document.getElementById('ep-photo-in').value = ''; 
      if(epCropper) {
          epCropper.destroy();
          epCropper = null;
      }
  }

  // Responsive Scaling for Mobile Preview
  function resizeEpPreview() {
      const wrapper = document.getElementById('ep-preview-wrapper');
      const poster = document.getElementById('eid-poster-export');
      if(!wrapper || !poster) return;
      
      const wrapperWidth = wrapper.clientWidth;
      if(wrapperWidth < 820) {
          const scale = wrapperWidth / 840; 
          poster.style.transform = `scale(${scale})`;
          wrapper.style.height = `${800 * scale}px`;
      } else {
          poster.style.transform = `scale(1)`;
          wrapper.style.height = `800px`;
      }
  }
  window.addEventListener('resize', resizeEpPreview);

  // High Quality Download using html2canvas
  function downloadEidPoster() {
      const poster = document.getElementById('eid-poster-export');
      const btn = document.getElementById('btn-ep-download');
      
      // Remove transform scale so html2canvas captures full 800x800 res
      poster.style.transform = 'scale(1)';
      
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> প্রসেসিং হচ্ছে...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      html2canvas(poster, {
          scale: 2, // 1600x1600 output resolution (HD)
          useCORS: true,
          backgroundColor: null
      }).then(canvas => {
          let link = document.createElement('a');
          link.download = 'Eid_Mubarak_Poster.jpg';
          link.href = canvas.toDataURL('image/jpeg', 1.0);
          link.click();
          
          btn.innerHTML = '<i class="fa-solid fa-download"></i> HD ডাউনলোড';
          btn.style.opacity = '1';
          btn.disabled = false;
          resizeEpPreview(); // Restore mobile view
      }).catch(err => {
          console.error("Poster Error: ", err);
          btn.innerHTML = '<i class="fa-solid fa-download"></i> HD ডাউনলোড';
          btn.disabled = false;
          resizeEpPreview();
      });
  }

  function resetEidPoster() {
      document.getElementById('ep-name').value = '';
      document.getElementById('ep-title').value = '';
      document.getElementById('ep-address').value = '';
      document.getElementById('ep-msg').value = 'সবাইকে পবিত্র ঈদুল ফিতরের শুভেচ্ছা ও অভিনন্দন';
      document.getElementById('ep-theme').value = 'theme-blue';
      document.getElementById('ep-layout').value = 'layout-1';
      document.getElementById('out-ep-photo').src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='%2394a3b8' d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z'/></svg>";
      updateEidPoster();
  }
