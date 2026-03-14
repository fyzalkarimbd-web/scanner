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
