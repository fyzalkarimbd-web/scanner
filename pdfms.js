let mergeFiles = [];
let splitFile = null;

// আপনার ওয়েবসাইটের ডিফল্ট অ্যালার্ট ফাংশন (নিশ্চিত করার জন্য পুনরায় দেওয়া হলো)
function triggerSiteAlert(msg) {
    if (typeof showAlert === "function") {
        showAlert(msg);
    } else {
        // যদি showAlert ফাংশনটি গ্লোবাল না হয় তবে সরাসরি আপনার পপআপ আইডি ব্যবহার করবে
        const popup = document.getElementById('customPopup');
        const msgBox = document.getElementById('popupMessage');
        if (popup && msgBox) {
            msgBox.innerText = msg;
            popup.style.display = 'flex';
        } else {
            alert(msg); // ব্যাকআপ
        }
    }
}

function openPdfToolModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-pdf-tool');
    document.getElementById('pdfToolModal').style.display = 'flex';
}

function closePdfToolModal() {
    document.getElementById('pdfToolModal').style.display = 'none';
}

function switchPdfTab(tab) {
    document.getElementById('tab-merge-btn').classList.toggle('active', tab === 'merge');
    document.getElementById('tab-split-btn').classList.toggle('active', tab === 'split');
    document.getElementById('section-merge').style.display = tab === 'merge' ? 'block' : 'none';
    document.getElementById('section-split').style.display = tab === 'split' ? 'block' : 'none';
    document.getElementById('pdf-tool-status').style.display = 'none';
}

// --- MERGER LOGIC ---
function handleMergeFiles(event) {
    const files = Array.from(event.target.files);
    mergeFiles = [...mergeFiles, ...files];
    renderMergeList();
}

function renderMergeList() {
    const list = document.getElementById('merge-file-list');
    const btn = document.getElementById('btn-merge-start');
    list.innerHTML = "";
    if(mergeFiles.length > 0) {
        list.style.display = "block";
        btn.style.display = "block";
        mergeFiles.forEach((f, i) => {
            list.innerHTML += `<div class="pdf-item">
                <span>${i+1}. ${f.name}</span>
                <button class="pdf-rem-btn" onclick="removeMergeFile(${i})">&times;</button>
            </div>`;
        });
    } else {
        list.style.display = "none";
        btn.style.display = "none";
    }
}

function removeMergeFile(index) {
    mergeFiles.splice(index, 1);
    renderMergeList();
}

async function processMergePDF() {
    const status = document.getElementById('pdf-tool-status');
    
    if (mergeFiles.length < 2) {
        triggerSiteAlert("Please select at least 2 PDF files to merge!");
        return;
    }

    status.style.display = "block";
    status.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Merging PDFs...';

    try {
        if (typeof PDFLib === 'undefined') {
            throw new Error("PDF Library is not loaded yet. Please check your internet.");
        }

        const mergedPdf = await PDFLib.PDFDocument.create();
        for (const f of mergeFiles) {
            const bytes = await f.arrayBuffer();
            let pdf;
            try {
                pdf = await PDFLib.PDFDocument.load(bytes);
            } catch (e) {
                throw new Error(`File "${f.name}" is password protected or corrupted. Please remove the password first.`);
            }
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const pdfBytes = await mergedPdf.save();
        downloadBlob(pdfBytes, "Merged_By_ID_Scanner_Pro.pdf", "application/pdf");
        status.innerHTML = '<span style="color:#059669;">Success! Files Merged.</span>';
    } catch (err) {
        status.style.display = "none";
        triggerSiteAlert(err.message);
    }
}

// --- SPLITTER LOGIC ---
function handleSplitFile(event) {
    splitFile = event.target.files[0];
    if(splitFile) {
        document.getElementById('split-file-name').innerText = splitFile.name;
        document.getElementById('split-controls').style.display = "block";
    }
}

async function processSplitPDF() {
    const rangeInput = document.getElementById('split-pages-input').value.trim();
    const status = document.getElementById('pdf-tool-status');

    if (!splitFile) {
        triggerSiteAlert("Please select a PDF file first!");
        return;
    }
    if (!rangeInput) {
        triggerSiteAlert("Please enter the page numbers or range to extract (e.g. 1, 2-5)!");
        return;
    }

    status.style.display = "block";
    status.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Extracting pages...';

    try {
        const bytes = await splitFile.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(bytes);
        const newPdf = await PDFLib.PDFDocument.create();
        const totalPages = pdf.getPageCount();
        
        const pagesToExtract = parsePageRange(rangeInput, totalPages);
        
        if (pagesToExtract.length === 0) {
            throw new Error("Invalid page range. Please check the page numbers.");
        }

        const copiedPages = await newPdf.copyPages(pdf, pagesToExtract.map(p => p - 1));
        copiedPages.forEach(p => newPdf.addPage(p));

        const pdfBytes = await newPdf.save();
        downloadBlob(pdfBytes, "Extracted_Pages.pdf", "application/pdf");
        status.innerHTML = '<span style="color:#059669;">Success! Pages Extracted.</span>';
    } catch (err) {
        status.style.display = "none";
        triggerSiteAlert(err.message);
    }
}

function parsePageRange(input, max) {
    const pages = new Set();
    input.split(',').forEach(part => {
        if(part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            if(start > 0 && end >= start) {
                for(let i = start; i <= end; i++) if(i <= max) pages.add(i);
            }
        } else {
            const val = Number(part.trim());
            if(val > 0 && val <= max) pages.add(val);
        }
    });
    return Array.from(pages).sort((a,b) => a-b);
}

// Helper Download Function
function downloadBlob(data, fileName, mimeType) {
    const blob = new Blob([data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
