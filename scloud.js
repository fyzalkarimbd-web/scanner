const CLIENT_ID = '742363063259-hecd6i38ovt8kv16na4c7qrv21hrpg9k.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCQDzRhsSN13iIsQ81eXBE-bHMSm-X2BDY'; 
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/drive.file';

  let currentCloudMode = 'photo'; 
  let tokenClient, gapiInited = false, gisInited = false;
  let fileToDeleteId = null;
  let elementToRemove = null;

  function triggerAlert(msg) {
    const popup = document.getElementById('customPopup');
    if (popup) {
        document.getElementById('popupMessage').innerText = msg;
        popup.classList.add('active');
    } else { alert(msg); }
  }

  function gapiLoaded() { gapi.load('client', async () => { await gapi.client.init({ apiKey: API_KEY, discoveryDocs: [DISCOVERY_DOC] }); gapiInited = true; checkAuth(); }); }
  function gisLoaded() { tokenClient = google.accounts.oauth2.initTokenClient({ client_id: CLIENT_ID, scope: SCOPES, callback: '' }); gisInited = true; checkAuth(); }
  function checkAuth() { const t = localStorage.getItem('studio_cloud_token'); if(t && gapiInited) { const tk = JSON.parse(t); if(Date.now() < tk.expires_at) { gapi.client.setToken(tk); if(document.getElementById('studioCloudModal').style.display==='flex') showMainUI(); } } }

  function switchCloudMode(mode) {
    currentCloudMode = mode;
    document.getElementById('btn-mode-photo').classList.toggle('active', mode === 'photo');
    document.getElementById('btn-mode-file').classList.toggle('active', mode === 'file');
    document.getElementById('mode-icon-display').className = mode === 'photo' ? 'fa-solid fa-image' : 'fa-solid fa-file-invoice';
    document.getElementById('upload-instruction').innerText = mode === 'photo' ? 'Click to import Photos' : 'Click to import Files';
    document.getElementById('save-mode-text').innerText = mode === 'photo' ? 'Photos' : 'Files';
    document.getElementById('gallery-title').innerHTML = mode === 'photo' ? '<i class="fa-solid fa-images"></i> Photos Database' : '<i class="fa-solid fa-folder-open"></i> Files Database';
    const fi = document.getElementById('st-input-file');
    fi.accept = mode === 'photo' ? 'image/*' : '.pdf,.doc,.docx,.zip,.rar,.txt,.xls,.xlsx,.ppt,.pptx';
    document.getElementById('preview-container').style.display = 'none';
    fi.value = "";
    listCloudFiles();
  }

  function handleAuthClick() {
    tokenClient.callback = (resp) => {
        resp.expires_at = Date.now() + (resp.expires_in * 1000);
        localStorage.setItem('studio_cloud_token', JSON.stringify(resp));
        showMainUI();
    };
    tokenClient.requestAccessToken({prompt: 'consent'});
  }

  function showMainUI() {
    document.getElementById('cloud-auth-section').style.display = 'none';
    document.getElementById('cloud-main-ui').style.display = 'block';
    initHandlers();
    listCloudFiles();
  }

  function initHandlers() {
    const fi = document.getElementById('st-input-file');
    document.getElementById('drop-zone').onclick = () => fi.click();
    fi.onchange = () => { if(fi.files[0]) handlePreview(fi.files[0]); };
  }

  function handlePreview(file) {
    if (currentCloudMode === 'photo' && !file.type.startsWith('image/')) {
        triggerAlert("Error: Only Photos allowed in Photo Mode!");
        document.getElementById('st-input-file').value = "";
        return;
    }
    if (currentCloudMode === 'file' && file.type.startsWith('image/')) {
        triggerAlert("Error: Photos are not allowed in File Mode!");
        document.getElementById('st-input-file').value = "";
        return;
    }
    const container = document.getElementById('preview-container');
    const img = document.getElementById('preview-img');
    const icon = document.getElementById('preview-file-icon');
    const name = document.getElementById('preview-file-name');
    container.style.display = 'flex';
    name.innerText = file.name;
    if(file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => { img.src = e.target.result; img.style.display = 'block'; icon.style.display = 'none'; };
        reader.readAsDataURL(file);
    } else {
        img.style.display = 'none';
        icon.style.display = 'block';
        let ext = file.name.split('.').pop().toLowerCase();
        icon.innerHTML = `<i class="fa-solid fa-file-lines"></i>`;
    }
  }

  async function uploadToDrive() {
    const fileInput = document.getElementById('st-input-file');
    const name = document.getElementById('st-name').value.trim();
    const phone = document.getElementById('st-phone').value.trim();
    const address = document.getElementById('st-address').value.trim();
    const loader = document.getElementById('upload-loader');
    const saveBtn = document.getElementById('save-btn');
    if(!fileInput.files[0] || !name) { triggerAlert("Required: Name and File missing!"); return; }
    loader.style.display = 'block';
    saveBtn.disabled = true;
    const file = fileInput.files[0];
    const metadata = {
        name: `ST_${currentCloudMode.toUpperCase()}_${Date.now()}_${file.name}`,
        mimeType: file.type,
        properties: { 'mode': currentCloudMode, 'custName': name, 'custPhone': phone, 'custAddr': address }
    };
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', file);
    try {
        const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + gapi.client.getToken().access_token }),
            body: formData
        });
        if(res.ok) {
            triggerAlert("Success: Saved to Cloud!");
            loader.style.display = 'none'; saveBtn.disabled = false;
            document.getElementById('st-name').value = ''; document.getElementById('st-phone').value = ''; document.getElementById('st-address').value = '';
            document.getElementById('preview-container').style.display = 'none'; fileInput.value = "";
            listCloudFiles();
        } else { throw new Error(); }
    } catch (e) { loader.style.display = 'none'; saveBtn.disabled = false; triggerAlert("Error: Upload failed!"); }
  }

  async function listCloudFiles() {
    const gallery = document.getElementById('cloud-gallery');
    gallery.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:#4285F4;"><i class="fa-solid fa-spinner fa-spin"></i> Syncing...</div>';
    try {
        const resp = await gapi.client.drive.files.list({
            q: `name contains 'ST_${currentCloudMode.toUpperCase()}_'`,
            fields: 'files(id, name, thumbnailLink, mimeType, properties, webViewLink)',
            orderBy: 'createdTime desc'
        });
        const files = resp.result.files;
        gallery.innerHTML = '';
        if (files && files.length > 0) {
            files.forEach(file => {
                const cName = (file.properties?.custName || "N/A").replace(/'/g, "\\'");
                const cPhone = (file.properties?.custPhone || "N/A").replace(/'/g, "\\'");
                const cAddr = (file.properties?.custAddr || "No Address").replace(/'/g, "\\'");
                const isImg = file.mimeType.startsWith('image/');
                const thumb = file.thumbnailLink || "";
                let displayBox = isImg ? `<img src="${thumb.replace('s220', 's500')}" />` : `<i class="fa-solid fa-file-invoice" style="font-size:35px; color:#94a3b8;"></i>`;
                gallery.innerHTML += `
                    <div class='st-card'>
                        <div class='st-card-img-box' onclick="openPreview('${file.id}', '${isImg}', '${thumb}', '${file.webViewLink}', '${cName}')">
                            ${displayBox}
                        </div>
                        <div class='st-card-info'>
                            <b>${cName}</b>
                            <p><i class="fa-solid fa-phone" style="font-size:9px;"></i> ${cPhone}</p>
                            <p><i class="fa-solid fa-location-dot" style="font-size:9px;"></i> ${cAddr}</p>
                        </div>
                        <div class='st-card-actions'>
                            <button onclick='deleteFile("${file.id}", this)' class='st-btn-action btn-del'><i class="fa-solid fa-trash"></i> Delete</button>
                            <button onclick='downloadFile("${file.id}", "${file.name}")' class='st-btn-action btn-dl'><i class="fa-solid fa-download"></i> Download</button>
                        </div>
                    </div>`;
            });
        } else { gallery.innerHTML = '<p style="grid-column:1/-1; text-align:center; padding:30px; color:#94a3b8;">No records found.</p>'; }
    } catch (e) { gallery.innerHTML = '<p style="color:red; text-align:center; grid-column:1/-1;">Error loading database.</p>'; }
}

  function openPreview(id, isImg, thumb, webLink, name) {
    if (String(isImg) === 'true') {
        const overlay = document.getElementById('studioImgPreview');
        const img = document.getElementById('preview-full-img');
        const caption = document.getElementById('preview-caption');
        if (overlay && img) {
            if (thumb && thumb !== "" && thumb !== "undefined") {
                img.src = thumb.replace('s220', 's1000'); 
                img.style.display = 'block';
                caption.innerText = name;
                overlay.style.display = 'flex';
            } else { window.open(webLink, '_blank'); }
        }
    } else { window.open(webLink, '_blank'); }
  }

  async function downloadFile(id, name) {
    try {
        const res = await fetch(`https://www.googleapis.com/drive/v3/files/${id}?alt=media`, {
            headers: { 'Authorization': 'Bearer ' + gapi.client.getToken().access_token }
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = name.split('_').pop(); a.click();
    } catch (e) { triggerAlert("Error: Download failed!"); }
  }

  function deleteFile(id, btn) {
    fileToDeleteId = id;
    elementToRemove = btn.closest('.st-card');
    triggerAlert("Are you sure? This record will be deleted forever.");
    const popupBtn = document.querySelector('#customPopup .popup-btn');
    if (popupBtn) popupBtn.onclick = confirmAndExecuteDelete;
  }

  async function confirmAndExecuteDelete() {
    if (fileToDeleteId) {
        try {
            await gapi.client.drive.files.delete({ fileId: fileToDeleteId });
            if (elementToRemove) elementToRemove.remove();
            if (typeof closePopup === 'function') closePopup();
        } catch (e) { triggerAlert("Error: Delete failed!"); } 
        finally {
            fileToDeleteId = null; elementToRemove = null;
            const popupBtn = document.querySelector('#customPopup .popup-btn');
            if (popupBtn && typeof closePopup === 'function') popupBtn.onclick = closePopup;
        }
    }
}

  function openStudioCloudModal() { document.getElementById('studioCloudModal').style.display='flex'; checkAuth(); switchCloudMode('photo'); }
  function closeStudioCloudModal() { document.getElementById('studioCloudModal').style.display='none'; }
  function handleSignoutClick() { 
    google.accounts.oauth2.revoke(gapi.client.getToken().access_token);
    gapi.client.setToken(null); localStorage.removeItem('studio_cloud_token');
    document.getElementById('cloud-auth-section').style.display='block';
    document.getElementById('cloud-main-ui').style.display='none';
  }
  function searchRecords() {
    const q = document.getElementById('st-search').value.toLowerCase();
    document.querySelectorAll('.st-card').forEach(c => { c.style.display = c.innerText.toLowerCase().includes(q) ? 'flex' : 'none'; });
  }
