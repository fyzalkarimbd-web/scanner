let isQLibrariesLoaded = false;
  let qLogoData = null; // লোগো ইমেজের জন্য গ্লোবাল ভেরিয়েবল

  // ডিফল্ট কোম্পানি ও শর্তাবলী ডাটা
  const defaultCompanyName = "Your Company Name";
  const defaultCompanyContact = "Mob: 01834030544, 01403178709";
  const defaultCompanyAddress = "Comilla, Chittagong, Bangladesh.";
  const defaultTermsAndConditions = 
    "1. Scope Includes Delivery & Installation of above mentioned items.\n" +
    "2. Any additional work or materials will be charged on actual.\n" +
    "3. Quotation validity 15 days from the date of quote.\n" +
    "4. Installation and delivery will start within 3-days after receiving PO.\n" +
    "5. Payment: 50% Advance and balance after completion.";

  // মোডাল অ্যাক্টিভেশন লজিক
  async function openQuotationMakerModal() {
      document.getElementById('quotationMakerModal').style.display = 'flex';
      setupDefaultQDates();
      loadSavedQuotationSender(); // ১. পূর্বে সেভ করা কোম্পানি প্রোফাইল লোড করবে
      
      // টেবিল খালি থাকলে ১টি নতুন রো যোগ করবে
      const container = document.getElementById('quotationItemsList');
      if (container.children.length === 0) {
          addQuotationItemRow();
      }
      
      await initQuotationMakerLibraries();
  }

  function closeQuotationMakerModal() {
      document.getElementById('quotationMakerModal').style.display = 'none';
      clearQuotationMakerForm();
  }

  // লাইব্রেরি ড্রাইভার
  function loadQScript(url) {
      return new Promise((resolve, reject) => {
          let script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
      });
  }

  // jsPDF ইঞ্জিন চেকার
  async function initQuotationMakerLibraries() {
      if (isQLibrariesLoaded) return;
      const statusEl = document.getElementById('quotationMakerStatus');
      statusEl.innerText = 'Loading PDF engines, please wait...';
      try {
          if (typeof window.jspdf === 'undefined') {
              await loadQScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
          }
          isQLibrariesLoaded = true;
          statusEl.innerText = 'Engines loaded. Ready to build quotation.';
      } catch (err) {
          statusEl.innerText = 'Failed to load PDF engine. Check internet.';
          console.error(err);
      }
  }

  // অটো-সেভ কোম্পানি প্রোফাইল (টেক্সট)
  function saveQuotationSender() {
      localStorage.setItem('q_sender_name', document.getElementById('qSenderName').value.trim());
      localStorage.setItem('q_sender_contact', document.getElementById('qSenderContact').value.trim());
      localStorage.setItem('q_sender_address', document.getElementById('qSenderAddress').value.trim());
  }

  // কোম্পানির লোগো আপলোড ও লোকাল স্টোরেজে সেভ
  function handleQuotationLogo(input) {
      const file = input.files[0];
      if (file) {
          if (!file.type.startsWith('image/')) {
              alert('Please select a valid image file (PNG/JPG) for the logo.');
              input.value = '';
              return;
          }
          const reader = new FileReader();
          reader.onload = function(e) {
              qLogoData = e.target.result;
              document.getElementById('qLogoPreviewText').style.display = 'block';
              localStorage.setItem('q_logo_data', qLogoData); // লোগো স্থায়ীভাবে সেভ হবে
          };
          reader.readAsDataURL(file);
      }
  }

  // পূর্বে সংরক্ষিত কোম্পানি প্রোফাইল লোড করা
  function loadSavedQuotationSender() {
      const name = localStorage.getItem('q_sender_name');
      const contact = localStorage.getItem('q_sender_contact');
      const address = localStorage.getItem('q_sender_address');
      const logo = localStorage.getItem('q_logo_data');
      const savedTerms = localStorage.getItem('q_terms_data');

      // কোম্পানি তথ্য লোড (না থাকলে ডিফল্ট AL MOTHEER বসাবে)
      document.getElementById('qSenderName').value = name !== null ? name : defaultCompanyName;
      document.getElementById('qSenderContact').value = contact !== null ? contact : defaultCompanyContact;
      document.getElementById('qSenderAddress').value = address !== null ? address : defaultCompanyAddress;
      
      // টার্মস লোড (না থাকলে ইমেজের ডিফল্ট ৫টি টার্মস বসাবে)
      document.getElementById('qTermsText').value = savedTerms !== null ? savedTerms : defaultTermsAndConditions;

      if (logo) {
          qLogoData = logo;
          document.getElementById('qLogoPreviewText').style.display = 'block';
      }
  }

  // ডেট অটো-ফিল
  function setupDefaultQDates() {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const todayStr = today.toISOString().split('T')[0];
      const nextWeekStr = nextWeek.toISOString().split('T')[0];

      document.getElementById('qDate').value = todayStr;
      document.getElementById('qDueDate').value = nextWeekStr;
  }

  // ডাইনামিক রো অ্যাড করার ফাংশন
  function addQuotationItemRow() {
      const container = document.getElementById('quotationItemsList');
      const rowId = 'qrow-' + Date.now();
      
      const rowHTML = `
        <div class="q-item-row" id="${rowId}">
          <div class="q-setting-item" style="margin: 0;">
            <input type="text" class="q-item-desc" placeholder="Product Name / Specification" required="required" />
          </div>
          <div class="q-setting-item" style="margin: 0;">
            <input type="number" class="q-item-qty" value="1" min="1" oninput="calculateQuotationTotals()" style="text-align: center;" required="required" />
          </div>
          <div class="q-setting-item" style="margin: 0;">
            <input type="number" class="q-item-price" value="0.000" min="0" step="0.001" oninput="calculateQuotationTotals()" style="text-align: center;" required="required" />
          </div>
          <div class="q-setting-item" style="margin: 0;">
            <input type="number" class="q-item-disc" value="0.000" min="0" step="0.001" oninput="calculateQuotationTotals()" style="text-align: center;" required="required" />
          </div>
          <button onclick="removeQuotationItemRow('${rowId}')" style="background: transparent; border: none; color: #ef4444; font-size: 18px; cursor: pointer; padding: 5px 0;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
      
      container.insertAdjacentHTML('beforeend', rowHTML);
      calculateQuotationTotals();
  }

  function removeQuotationItemRow(rowId) {
      const row = document.getElementById(rowId);
      if (row) {
          row.remove();
          calculateQuotationTotals();
      }
  }

  // রিয়েল-টাইম ক্যালকুলেটর লজিক
  function calculateQuotationTotals() {
      const rows = document.querySelectorAll('.q-item-row');
      const currency = document.getElementById('qCurrency').value || 'BDT';
      let subtotal = 0;

      rows.forEach(row => {
          const qty = parseFloat(row.querySelector('.q-item-qty').value) || 0;
          const price = parseFloat(row.querySelector('.q-item-price').value) || 0;
          const discount = parseFloat(row.querySelector('.q-item-disc').value) || 0;
          subtotal += ((qty * price) - discount);
      });

      const paid = parseFloat(document.getElementById('qPaid').value) || 0;
      const balanceDue = subtotal - paid;

      document.getElementById('qLiveSubtotalText').innerText = subtotal.toFixed(3) + ' ' + currency;
      document.getElementById('qLiveDueText').innerText = balanceDue.toFixed(3) + ' ' + currency;
  }

  // ইমেজের ডিজাইনের সাথে মিল রেখে কোটেশন জেনারেটর এবং পিডিএফ ডাউনলোড/প্রিন্ট লজিক
  async function startQuotationGeneration(action) {
      const statusEl = document.getElementById('quotationMakerStatus');
      const generateBtn = document.getElementById('qGenerateBtn');
      const printBtn = document.getElementById('qPrintBtn');

      const senderName = document.getElementById('qSenderName').value.trim();
      const clientName = document.getElementById('qClientName').value.trim();
      const qNum = document.getElementById('qNumber').value.trim() || 'ALM0207-202306';

      if (!senderName || !clientName) {
          alert('Please fill in both Company Name and Client/Billing Name.');
          return;
      }

      const rows = document.querySelectorAll('.q-item-row');
      if (rows.length === 0) {
          alert('Please add at least one item to generate a quotation.');
          return;
      }

      statusEl.innerText = 'Assembling official layout...';
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          await initQuotationMakerLibraries();
          const { jsPDF } = window.jspdf;
          
          // স্ট্যান্ডার্ড A4 সাইজ (210 x 297 mm) ডক সেটআপ
          const doc = new jsPDF('p', 'mm', 'a4');
          
          const senderContact = document.getElementById('qSenderContact').value.trim();
          const senderAddress = document.getElementById('qSenderAddress').value.trim();
          const clientLocation = document.getElementById('qClientLocation').value.trim();
          const clientMobile = document.getElementById('qClientMobile').value.trim();
          
          const qDate = document.getElementById('qDate').value;
          const qDueDate = document.getElementById('qDueDate').value;
          const qPayTerm = document.getElementById('qPayTerm').value.trim() || '7 days';
          const qPayMethod = document.getElementById('qPayMethod').value.trim() || 'Cash';
          const qSalesperson = document.getElementById('qSalesperson').value.trim() || '-';
          
          const currency = document.getElementById('qCurrency').value || 'USD';
          const paidAmount = parseFloat(document.getElementById('qPaid').value) || 0;
          const termsText = document.getElementById('qTermsText').value.trim();

          // ১. লগো ড্রয়িং লজিক (আপলোড হয়ে থাকলে ইমেজের মতো বামদিকের উপরে নিখুঁতভাবে বসবে)
          let companyTextX = 15;
          if (qLogoData) {
              doc.addImage(qLogoData, 'JPEG', 15, 15, 20, 20);
              companyTextX = 40; // লোগো থাকলে কোম্পানির নাম ও এড্রেস ডান দিকে সরে যাবে
          }

          // ২. কোম্পানির ডিটেইলস (ডানদিকের উপরে সারিবদ্ধ)
          doc.setTextColor(15, 23, 42); // Deep Slate
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(13);
          doc.text(senderName, 195, 20, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(71, 85, 105);
          if (senderAddress) doc.text(senderAddress, 195, 25.5, { align: 'right' });
          if (senderContact) doc.text(senderContact, 195, 31, { align: 'right' });

          // উপরের বর্ডার লাইন
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.4);
          doc.line(15, 38, 195, 38);

          // ৩. কোটেশন টাইটেল (ইমেজের মতো ফ্রেমড ডিজাইন)
          doc.setTextColor(15, 23, 42);
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(15);
          doc.text('QUOTATION', 105, 45, { align: 'center' });
          
          // টাইটেলের নিচের বর্ডার লাইন
          doc.line(15, 49, 195, 49);

          // ৪. লেফট কলাম: বিলিং এড্রেস (Billing Address)
          doc.setFontSize(10.5);
          doc.setFont('Helvetica', 'bold');
          doc.text('Billing Address', 15, 56);
          doc.text(clientName, 15, 62);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(71, 85, 105);
          if (clientLocation) doc.text(clientLocation, 15, 67);

          // ৫. রাইট কলাম: কোটেশন মেটাডাটা টেবিল (Quotation Metadata)
          let metaY = 56;
          doc.setFontSize(9.5);
          doc.setTextColor(15, 23, 42);

          const drawMetaLine = (label, val) => {
              doc.setFont('Helvetica', 'bold');
              doc.text(label, 120, metaY);
              doc.setFont('Helvetica', 'normal');
              doc.text(val, 160, metaY);
              metaY += 5.5;
          };

          drawMetaLine('Quotation Number:', qNum);
          drawMetaLine('Quotation Date:', qDate);
          drawMetaLine('Due Date:', qDueDate);
          drawMetaLine('Payment Term:', qPayTerm);
          drawMetaLine('Payment Method:', qPayMethod);
          drawMetaLine('Salesperson:', qSalesperson);
          if (clientMobile) drawMetaLine('Customer Mobile:', clientMobile);

          // ৬. আইটেমস টেবিল হেডার (ইমেজের মতো স্পেশাল ৭ কলাম লেআউট)
          const tableStartY = Math.max(metaY + 6, 94);
          doc.setFillColor(241, 245, 249);
          doc.rect(15, tableStartY, 180, 8, 'F');
          
          doc.setFont('Helvetica', 'bold');
          doc.setTextColor(15, 23, 42);
          doc.setFontSize(9);
          
          doc.text('#', 17.5, tableStartY + 5);
          doc.text('Name', 25, tableStartY + 5);
          doc.text('Quantity', 105, tableStartY + 5, { align: 'center' });
          doc.text('Unit price', 125, tableStartY + 5, { align: 'right' });
          doc.text('Discount', 145, tableStartY + 5, { align: 'right' });
          doc.text('Subtotal', 168, tableStartY + 5, { align: 'right' });
          doc.text('Total', 192, tableStartY + 5, { align: 'right' });

          // ৭. আইটেমস লুপ রেন্ডারিং (লাইন ব্রেকিং সহ)
          let currentY = tableStartY + 13;
          let subtotal = 0;
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(51, 65, 85);

          rows.forEach((row, idx) => {
              const desc = row.querySelector('.q-item-desc').value.trim() || 'Custom Item';
              const qty = parseFloat(row.querySelector('.q-item-qty').value) || 0;
              const price = parseFloat(row.querySelector('.q-item-price').value) || 0;
              const discount = parseFloat(row.querySelector('.q-item-disc').value) || 0;
              
              const itemSubtotal = qty * price;
              const itemTotal = itemSubtotal - discount;
              subtotal += itemTotal;

              // প্রোডাক্টের দীর্ঘ নাম থাকলে তা স্বয়ংক্রিয়ভাবে লাইনে ভেঙে দেবে (Word Wrap)
              const splitName = doc.splitTextToSize(desc, 70);
              const nameLinesCount = splitName.length;
              const rowHeight = nameLinesCount * 5;

              doc.text((idx + 1).toString(), 17.5, currentY);
              doc.text(splitName, 25, currentY);
              doc.text(qty.toString(), 105, currentY, { align: 'center' });
              doc.text(price.toFixed(3), 125, currentY, { align: 'right' });
              doc.text(discount.toFixed(3), 145, currentY, { align: 'right' });
              doc.text(itemSubtotal.toFixed(3), 168, currentY, { align: 'right' });
              doc.text(itemTotal.toFixed(3), 192, currentY, { align: 'right' });

              // টেবিলের ভেতরের পাতলা বর্ডার আঁকবে
              doc.setDrawColor(241, 245, 249);
              doc.line(15, currentY + rowHeight - 2, 195, currentY + rowHeight - 2);

              currentY += rowHeight + 3;
          });

          // টেবিলের সীমানা ও ভার্টিকাল লাইন আঁকবে (ইমেজের ডিজাইনের মতো)
          const tableEndY = currentY - 3;
          doc.setDrawColor(200, 200, 200);
          doc.line(15, tableStartY, 195, tableStartY); // টপ লাইন
          doc.line(15, tableEndY, 195, tableEndY); // বটম লাইন
          
          // ভার্টিকাল লাইন কোঅর্ডিনেটস
          const drawVerticalLine = (x) => doc.line(x, tableStartY, x, tableEndY);
          drawVerticalLine(15);
          drawVerticalLine(22);
          drawVerticalLine(98);
          drawVerticalLine(112);
          drawVerticalLine(132);
          drawVerticalLine(152);
          drawVerticalLine(174);
          drawVerticalLine(195);

          // ৮. ফাইনান্সিয়াল সামারি ও গ্লোয়িং ব্ল্যাক টোটাল ডিউ বার
          let totalY = tableEndY + 8;
          const balanceDue = subtotal - paidAmount;

          doc.setFontSize(10);
          doc.setFont('Helvetica', 'bold');
          doc.setTextColor(15, 23, 42);
          
          doc.text('Subtotal', 150, totalY, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          doc.text(subtotal.toFixed(3) + ' ' + currency, 192, totalY, { align: 'right' });

          totalY += 6;
          doc.setFont('Helvetica', 'bold');
          doc.text('Total', 150, totalY, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          doc.text(subtotal.toFixed(3) + ' ' + currency, 192, totalY, { align: 'right' });

          totalY += 6;
          doc.setFont('Helvetica', 'bold');
          doc.text('Paid', 150, totalY, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          doc.text(paidAmount.toFixed(3) + ' ' + currency, 192, totalY, { align: 'right' });

          totalY += 6;
          doc.setFont('Helvetica', 'bold');
          doc.text('Balance due', 150, totalY, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          doc.text(balanceDue.toFixed(3) + ' ' + currency, 192, totalY, { align: 'right' });

          // বোল্ড কালো রঙের 'Total Due' বার (হুবহু ইমেজের ডিজাইন)
          totalY += 5;
          doc.setFillColor(15, 23, 42);
          doc.rect(130, totalY, 65, 8, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFont('Helvetica', 'bold');
          doc.text('Total Due', 150, totalY + 5.5, { align: 'right' });
          doc.text(balanceDue.toFixed(3) + ' ' + currency, 192, totalY + 5.5, { align: 'right' });

          // ৯. শর্তাবলী (Terms & Conditions - বামদিকের নিচে)
          let termsY = tableEndY + 8;
          doc.setTextColor(15, 23, 42);
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(9);
          
          const termsLines = termsText.split('\n');
          termsLines.forEach(line => {
              if (line.trim() !== '') {
                  // প্রতি লাইনে থাকা শর্তাবলী প্রিন্ট করবে
                  doc.text(line.trim(), 15, termsY);
                  termsY += 4.5;
              }
          });

          // ১০. কোটেশন ফুটার
          doc.setTextColor(15, 23, 42);
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(11);
          doc.text('Thank you for your business!', 105, 275, { align: 'center' });
          
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(148, 163, 184);
          doc.text('Page 1 of 1', 195, 285, { align: 'right' });

          // ডাউনলোড অথবা সরাসরি প্রিন্টিং এক্সিকিউশন
          if (action === 'print') {
              statusEl.innerText = 'Opening print dialog...';
              doc.autoPrint();
              const pdfUrl = doc.output('bloburl');
              const printWindow = window.open(pdfUrl, '_blank');
              if (printWindow) {
                  printWindow.focus();
              }
              statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> Print dialog opened!</span>';
          } else {
              statusEl.innerText = 'Saving quotation as PDF...';
              doc.save(`quotation_${qNum.replace('#', '')}.pdf`);
              statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> Quotation generated successfully!</span>';
          }

          generateBtn.disabled = false;
          printBtn.disabled = false;

      } catch (err) {
          statusEl.innerText = 'Error generating PDF quotation';
          generateBtn.disabled = false;
          printBtn.disabled = false;
          console.error(err);
      }
  }

  // ফর্ম ক্লিয়ার লজিক (কোম্পানি ডেটা ও ডিফল্ট শর্তাবলী মুছবে না)
  function clearQuotationMakerForm() {
      document.getElementById('qClientName').value = '';
      document.getElementById('qClientLocation').value = '';
      document.getElementById('qClientMobile').value = '';
      document.getElementById('qNumber').value = '';
      document.getElementById('qPaid').value = '0.000';
      document.getElementById('qCurrency').value = 'BDT';
      document.getElementById('qPayTerm').value = '';
      document.getElementById('qPayMethod').value = '';
      document.getElementById('qSalesperson').value = '';

      const container = document.getElementById('quotationItemsList');
      container.innerHTML = '';
      addQuotationItemRow();

      loadSavedQuotationSender(); // কোম্পানির ডেটা রিলোড

      setupDefaultQDates();
      document.getElementById('quotationMakerStatus').innerText = 'Ready to generate';
      document.getElementById('qGenerateBtn').disabled = false;
      document.getElementById('qPrintBtn').disabled = false;
  }
