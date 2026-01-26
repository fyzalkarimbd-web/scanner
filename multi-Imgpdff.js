let uploadedImages = [];


function openImgPdfModal() {
    setActiveMode('mode-img-pdf');
    document.getElementById('imgPdfModal').style.display = 'flex';
}

function closeImgPdfModal() {
    document.getElementById('imgPdfModal').style.display = 'none';
    resetPdfTool();
}

function resetPdfTool() {
    uploadedImages = [];
    document.getElementById('imgPdfInput').value = '';
    document.getElementById('pdf-preview-container').innerHTML = '';
    document.getElementById('pdf-actions').style.display = 'none';
}

function handleImageUpload(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('pdf-preview-container');
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;

        const reader = new FileReader();
        reader.onload = function(e) {
            const imgData = e.target.result;
            uploadedImages.push(imgData);

            // প্রিভিউ তৈরি (এখানে &#215; ব্যবহার করা হয়েছে)
            const div = document.createElement('div');
            div.style.position = 'relative';
            div.className = 'img-preview-item';
            div.innerHTML = `
                <img src="${imgData}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;">
                <span onclick="removeImage(${uploadedImages.length - 1})" style="position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; font-weight: bold; border: 2px solid white;">&#215;</span>
            `;
            previewContainer.appendChild(div);
            updatePdfUI();
        };
        reader.readAsDataURL(file);
    }
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    renderPreviews();
    updatePdfUI();
}

function renderPreviews() {
    const previewContainer = document.getElementById('pdf-preview-container');
    previewContainer.innerHTML = '';
    uploadedImages.forEach((img, i) => {
        const div = document.createElement('div');
        div.style.position = 'relative';
        div.innerHTML = `
            <img src="${img}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;">
            <span onclick="removeImage(${i})" style="position: absolute; top: -5px; right: -5px; background: #ef4444; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; font-weight: bold; border: 2px solid white;">&#215;</span>
        `;
        previewContainer.appendChild(div);
    });
}

function updatePdfUI() {
    const actions = document.getElementById('pdf-actions');
    const countText = document.getElementById('imgCount');
    actions.style.display = uploadedImages.length > 0 ? 'block' : 'none';
    countText.innerText = `Total: ${uploadedImages.length} Images`;
}

async function generatePDF() {
    if (uploadedImages.length === 0) return;
    const { jsPDF } = window.jspdf;
    const btn = document.getElementById('btnGeneratePdf');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < uploadedImages.length; i++) {
        if (i > 0) pdf.addPage();
        const imgProps = pdf.getImageProperties(uploadedImages[i]);
        const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
        const width = imgProps.width * ratio;
        const height = imgProps.height * ratio;
        pdf.addImage(uploadedImages[i], 'JPEG', (pdfWidth - width) / 2, (pdfHeight - height) / 2, width, height);
    }

    pdf.save(`Studio_Hub_${Date.now()}.pdf`);
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Downloaded!';
    setTimeout(() => { btn.innerHTML = '<i class="fa-solid fa-file-export"></i> Download PDF'; }, 2000);
}
