let gridBaseImg = null;

// আপনার ওয়েবসাইটের ডিফল্ট কাস্টম পপআপ ফাংশন
function triggerAlert(msg) {
    const popup = document.getElementById('customPopup');
    const msgEl = document.getElementById('popupMessage');
    if (popup && msgEl) {
        msgEl.innerText = msg;
        popup.classList.add('active');
    } else {
        alert(msg);
    }
}

function openGridModal() {
    document.getElementById('gridModal').style.display = 'flex';
    if(typeof setActiveMode === 'function') setActiveMode('mode-photo-grid');
}

function closeGridModal() { 
    document.getElementById('gridModal').style.display = 'none'; 
}

// ছবি আপলোড
function handleGridUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            gridBaseImg = e.target.result;
            document.getElementById('grid-count-val').value = 1;
            renderPhotoGrid(true);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// প্লাস-মাইনাস বাটন লজিক
function changeGridCount(val) {
    if (!gridBaseImg) { 
        triggerAlert("Please upload a photo first!"); 
        return; 
    }
    
    let input = document.getElementById('grid-count-val');
    let container = document.getElementById('photo-grid-render');
    let pageBox = document.getElementById('grid-page-unit');
    let current = parseInt(input.value);
    
    if (val === 1) {
        const sizeData = document.getElementById('grid-photo-size').value.split(',');
        const wPx = parseFloat(sizeData[0]) * 96;
        const hPx = parseFloat(sizeData[1]) * 96;

        const item = document.createElement('div');
        item.className = 'grid-photo-item';
        item.style.width = wPx + "px";
        item.style.height = hPx + "px";
        item.innerHTML = `<img src="${gridBaseImg}" />`;
        
        container.appendChild(item);

        // কাট-অফ চেক: ছবি নিচে কেটে যাচ্ছে কি না
        const containerRect = container.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        if (itemRect.bottom > containerRect.bottom + 2) {
            container.removeChild(item); 
            triggerAlert("Limit Reached! Adding this photo would cut it off at the bottom.");
        } else {
            input.value = current + 1;
        }
    } else {
        if (current > 0) {
            if (container.lastChild) container.removeChild(container.lastChild);
            input.value = current - 1;
        }
    }
}

function renderPhotoGrid(forceAll = false) {
    const container = document.getElementById('photo-grid-render');
    const countInput = document.getElementById('grid-count-val');
    const sizeData = document.getElementById('grid-photo-size').value.split(',');
    
    if (!gridBaseImg) {
        container.innerHTML = `<div style="padding: 100px 0; color: #94a3b8; width:100%; text-align:center; font-weight:700;">Upload a photo to see the layout</div>`;
        return;
    }

    if (forceAll) {
        container.innerHTML = '';
        let count = parseInt(countInput.value);
        const wPx = parseFloat(sizeData[0]) * 96;
        const hPx = parseFloat(sizeData[1]) * 96;
        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            item.className = 'grid-photo-item';
            item.style.width = wPx + "px";
            item.style.height = hPx + "px";
            item.innerHTML = `<img src="${gridBaseImg}" />`;
            container.appendChild(item);
        }
    }
}

// আপনার চাহিদা অনুযায়ী: সাইজ পরিবর্তন করলে ১টি ছবি দেখাবে
function resetAndRender() {
    if(gridBaseImg) {
        document.getElementById('grid-count-val').value = 1;
        renderPhotoGrid(true);
    }
}

// আপনার চাহিদা অনুযায়ী: পেপার সাইজ পরিবর্তন করলে ১টি ছবি দেখাবে
function updateGridLayout() {
    const size = document.getElementById('grid-paper-size').value;
    const page = document.getElementById('grid-page-unit');
    const dims = { a4: ["210mm", "297mm"], "4r": ["102mm", "152mm"], legal: ["216mm", "345mm"] };
    
    page.style.width = dims[size][0];
    page.style.height = dims[size][1]; 

    if(gridBaseImg) {
        document.getElementById('grid-count-val').value = 1;
    }
    renderPhotoGrid(true);
}

// ডিরেক্ট প্রিন্ট ফাংশন (১০০% পারফেক্ট আউটপুট)
function printGridContent() {
    const count = parseInt(document.getElementById('grid-count-val').value);
    if (!gridBaseImg || count === 0) {
        triggerAlert("Please upload a photo first!");
        return;
    }
    const content = document.getElementById('photo-grid-render').innerHTML;
    const size = document.getElementById('grid-paper-size').value;
    const dims = { a4: "210mm 297mm", "4r": "102mm 152mm", legal: "216mm 345mm" };
    
    const printWin = window.open('', '_blank');
    printWin.document.write(`
        <html>
            <head>
                <title>Photo_Print_Layout</title>
                <style>
                    @import url('https://fonts.maateen.me/solaiman-lipi/font.css');
                    @page { size: ${dims[size]}; margin: 0; }
                    body { margin: 0; padding: 0; background: #fff; }
                    #wrapper { 
                        width: ${dims[size].split(' ')[0]};
                        height: ${dims[size].split(' ')[1]};
                        display: flex; flex-wrap: wrap; gap: 5px; 
                        justify-content: center; align-content: flex-start;
                        padding: 5px; box-sizing: border-box; overflow: hidden;
                    }
                    .grid-photo-item { border: 1px solid #000 !important; display: flex; box-sizing: border-box; }
                    img { width: 100%; height: 100%; object-fit: cover; }
                </style>
            </head>
            <body><div id="wrapper">${content}</div></body>
        </html>
    `);
    printWin.document.close();
    setTimeout(() => { printWin.print(); printWin.close(); }, 800);
}

function resetGrid() {
    gridBaseImg = null;
    document.getElementById('grid-input').value = "";
    document.getElementById('grid-count-val').value = 0;
    document.getElementById('photo-grid-render').innerHTML = "";
}
