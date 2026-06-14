let isInvLibrariesLoaded = false;
  let uploadedLogoData = null; // লোগো ইমেজের ডেটা স্টোর করার গ্লোবাল ভেরিয়েবল

  // মোডাল সচল ও অচল করার লজিক
  async function openInvoiceMakerModal() {
      document.getElementById('invoiceMakerModal').style.display = 'flex';
      setupDefaultDates();
      loadSavedSenderDetails(); // ১. কোম্পানির পূর্বে সেভ করা তথ্য লোড করবে
      
      // টেবিল খালি থাকলে অন্তত ১টি ডিফল্ট রো দিয়ে শুরু করবে
      const container = document.getElementById('invoiceItemsList');
      if (container.children.length === 0) {
          addInvoiceItemRow();
      }
      
      await initInvoiceMakerLibraries();
  }

  function closeInvoiceMakerModal() {
      document.getElementById('invoiceMakerModal').style.display = 'none';
      clearInvoiceMakerForm();
  }

  // স্ক্রিপ্ট ড্রাইভার লোডার
  function loadInvoiceScript(url) {
      return new Promise((resolve, reject) => {
          let script = document.createElement('script');
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
      });
  }

  // jsPDF লাইব্রেরি চেক ও লোড
  async function initInvoiceMakerLibraries() {
      if (isInvLibrariesLoaded) return;
      const statusEl = document.getElementById('invoiceMakerStatus');
      statusEl.innerText = 'Loading PDF engines, please wait...';
      try {
          if (typeof window.jspdf === 'undefined') {
              await loadInvoiceScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
          }
          isInvLibrariesLoaded = true;
          statusEl.innerText = 'Engines loaded. Ready to build invoice.';
      } catch (err) {
          statusEl.innerText = 'Failed to load PDF engine. Check internet.';
          console.error(err);
      }
  }

  // ২. কোম্পানির টেক্সট ডিটেইলস সেভ করার ফাংশন
  function saveSenderDetails() {
      localStorage.setItem('inv_sender_name', document.getElementById('invSenderName').value.trim());
      localStorage.setItem('inv_sender_contact', document.getElementById('invSenderContact').value.trim());
      localStorage.setItem('inv_sender_address', document.getElementById('invSenderAddress').value.trim());
  }

  // ৩. লোগো ইমেজ আপলোড ও লোকাল স্টোরেজে সেভ করার ফাংশন
  function handleLogoUpload(input) {
      const file = input.files[0];
      if (file) {
          if (!file.type.startsWith('image/')) {
              alert('Please select a valid image file (PNG/JPG) for the logo.');
              input.value = '';
              return;
          }
          const reader = new FileReader();
          reader.onload = function(e) {
              uploadedLogoData = e.target.result;
              document.getElementById('logoPreviewText').style.display = 'block';
              localStorage.setItem('inv_logo_data', uploadedLogoData); // লোগো স্থায়ীভাবে স্টোরেজে সেভ হবে
          };
          reader.readAsDataURL(file);
      }
  }

  // ৪. পূর্বে সেভ করা কোম্পানির তথ্য লোড করার ফাংশন
  function loadSavedSenderDetails() {
      const name = localStorage.getItem('inv_sender_name');
      const contact = localStorage.getItem('inv_sender_contact');
      const address = localStorage.getItem('inv_sender_address');
      const logo = localStorage.getItem('inv_logo_data');

      if (name) document.getElementById('invSenderName').value = name;
      if (contact) document.getElementById('invSenderContact').value = contact;
      if (address) document.getElementById('invSenderAddress').value = address;
      if (logo) {
          uploadedLogoData = logo;
          document.getElementById('logoPreviewText').style.display = 'block';
      }
  }

  // আজকের ডেট (Invoice Date) এবং ৭ দিন পরের ডেট (Due Date) স্বয়ংক্রিয় সেটআপ
  function setupDefaultDates() {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const todayStr = today.toISOString().split('T')[0];
      const nextWeekStr = nextWeek.toISOString().split('T')[0];

      document.getElementById('invDate').value = todayStr;
      document.getElementById('invDueDate').value = nextWeekStr;
  }

  // ডাইনামিক নতুন আইটেম রো (Row) যুক্ত করার লজিক
  function addInvoiceItemRow() {
      const container = document.getElementById('invoiceItemsList');
      const rowId = 'row-' + Date.now();
      
      const rowHTML = `
        <div class="invoice-item-row" id="${rowId}">
          <div class="ip-setting-item" style="margin: 0;">
            <input type="text" class="item-desc" placeholder="Item Name / Description" required="required" />
          </div>
          <div class="ip-setting-item" style="margin: 0;">
            <input type="number" class="item-qty" value="1" min="1" oninput="calculateInvoiceTotals()" style="text-align: center;" required="required" />
          </div>
          <div class="ip-setting-item" style="margin: 0;">
            <input type="number" class="item-price" value="0.00" min="0" step="0.01" oninput="calculateInvoiceTotals()" style="text-align: center;" required="required" />
          </div>
          <button onclick="removeInvoiceItemRow('${rowId}')" style="background: transparent; border: none; color: #ef4444; font-size: 18px; cursor: pointer; padding: 5px 0;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
      
      container.insertAdjacentHTML('beforeend', rowHTML);
      calculateInvoiceTotals();
  }

  // আইটেম রো মুছে ফেলার লজিক
  function removeInvoiceItemRow(rowId) {
      const row = document.getElementById(rowId);
      if (row) {
          row.remove();
          calculateInvoiceTotals();
      }
  }

  // রিয়েল-টাইম কস্ট ক্যালকুলেশন
  function calculateInvoiceTotals() {
      const rows = document.querySelectorAll('.invoice-item-row');
      const currency = document.getElementById('invCurrency').value || 'BDT';
      let subtotal = 0;

      rows.forEach(row => {
          const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
          const price = parseFloat(row.querySelector('.item-price').value) || 0;
          subtotal += (qty * price);
      });

      const taxPct = parseFloat(document.getElementById('invTax').value) || 0;
      const discPct = parseFloat(document.getElementById('invDiscount').value) || 0;

      const taxAmount = subtotal * (taxPct / 100);
      const discAmount = subtotal * (discPct / 100);
      const grandTotal = subtotal + taxAmount - discAmount;

      document.getElementById('invLiveTotalText').innerText = grandTotal.toFixed(2) + ' ' + currency;
  }

  // ইনভয়েস জেনারেশন ও এ৪ পিডিএফ ডাউনলোড/প্রিন্ট লজিক
  async function startInvoiceGeneration(action) {
      const statusEl = document.getElementById('invoiceMakerStatus');
      const generateBtn = document.getElementById('invGenerateBtn');
      const printBtn = document.getElementById('invPrintBtn');

      // ইনপুট ভ্যালিডেশন
      const senderName = document.getElementById('invSenderName').value.trim();
      const clientName = document.getElementById('invClientName').value.trim();
      const invNum = document.getElementById('invNumber').value.trim() || '#INV-1001';

      if (!senderName || !clientName) {
          alert('Please fill in both Company Name and Client Name.');
          return;
      }

      const rows = document.querySelectorAll('.invoice-item-row');
      if (rows.length === 0) {
          alert('Please add at least one item to generate an invoice.');
          return;
      }

      statusEl.innerText = 'Assembling professional PDF layout...';
      generateBtn.disabled = true;
      printBtn.disabled = true;

      try {
          await initInvoiceMakerLibraries();
          const { jsPDF } = window.jspdf;
          
          // স্ট্যান্ডার্ড A4 সাইজ (210 x 297 mm) ডক
          const doc = new jsPDF('p', 'mm', 'a4');
          
          // ভেরিয়েবল ডাটা সংগ্রহ
          const senderContact = document.getElementById('invSenderContact').value.trim();
          const senderAddress = document.getElementById('invSenderAddress').value.trim();
          const clientContact = document.getElementById('invClientContact').value.trim();
          const clientAddress = document.getElementById('invClientAddress').value.trim();
          const invDate = document.getElementById('invDate').value;
          const invDueDate = document.getElementById('invDueDate').value;
          const currency = document.getElementById('invCurrency').value || 'BDT';
          const taxPct = parseFloat(document.getElementById('invTax').value) || 0;
          const discPct = parseFloat(document.getElementById('invDiscount').value) || 0;

          // ১. হেডার ব্রান্ডিং ও ইনভয়েস টাইটেল
          doc.setTextColor(15, 23, 42); // Deep Slate
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(22);
          doc.text('INVOICE', 195, 25, { align: 'right' });

          // ২. লগো ড্রয়িং লজিক (আপলোড হয়ে থাকলে বামদিকের উপরে বসবে)
          let companyTextX = 15;
          if (uploadedLogoData) {
              doc.addImage(uploadedLogoData, 'JPEG', 15, 15, 20, 20);
              companyTextX = 40; // লোগো থাকলে কোম্পানির নাম ও এড্রেস ডানে সরে যাবে
          }

          // ৩. সেন্ডার ডিটেইলস (My Company)
          doc.setFontSize(14);
          doc.text(senderName, companyTextX, 24);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(9.5);
          doc.setTextColor(71, 85, 105);
          if (senderContact) doc.text(senderContact, companyTextX, 30);
          if (senderAddress) doc.text(senderAddress, companyTextX, 36);

          // হেডার সেপারেটর লাইন
          doc.setDrawColor(226, 232, 240);
          doc.line(15, 43, 195, 43);

          // ৪. ইনভয়েস মেটাডাটা
          doc.setTextColor(15, 23, 42);
          doc.setFont('Helvetica', 'bold');
          doc.text('Invoice No:', 15, 52);
          doc.setFont('Helvetica', 'normal');
          doc.text(invNum, 40, 52);

          doc.setFont('Helvetica', 'bold');
          doc.text('Invoice Date:', 15, 58);
          doc.setFont('Helvetica', 'normal');
          doc.text(invDate, 40, 58);

          doc.setFont('Helvetica', 'bold');
          doc.text('Due Date:', 15, 64);
          doc.setFont('Helvetica', 'normal');
          doc.text(invDueDate, 40, 64);

          // ৫. ক্লায়েন্ট ডিটেইলস (BILL TO)
          doc.setFont('Helvetica', 'bold');
          doc.text('BILL TO:', 115, 52);
          doc.text(clientName, 115, 58);
          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(71, 85, 105);
          if (clientContact) doc.text(clientContact, 115, 64);
          if (clientAddress) doc.text(clientAddress, 115, 70);

          // ६. আইটেমস টেবিল হেডার
          doc.setFillColor(241, 245, 249);
          doc.rect(15, 80, 180, 8, 'F');
          doc.setFont('Helvetica', 'bold');
          doc.setTextColor(15, 23, 42);
          doc.setFontSize(10);
          doc.text('Item Description', 18, 85);
          doc.text('Qty', 120, 85, { align: 'center' });
          doc.text('Unit Price', 150, 85, { align: 'right' });
          doc.text('Total', 192, 85, { align: 'right' });

          // ৭. আইটেমস লুপ রেন্ডারিং
          let currentY = 94;
          let subtotal = 0;

          doc.setFont('Helvetica', 'normal');
          doc.setTextColor(51, 65, 85);

          rows.forEach(row => {
              const desc = row.querySelector('.item-desc').value.trim() || 'Custom Item';
              const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
              const price = parseFloat(row.querySelector('.item-price').value) || 0;
              const itemTotal = qty * price;
              subtotal += itemTotal;

              doc.text(desc, 18, currentY);
              doc.text(qty.toString(), 120, currentY, { align: 'center' });
              doc.text(price.toFixed(2), 150, currentY, { align: 'right' });
              doc.text(itemTotal.toFixed(2), 192, currentY, { align: 'right' });

              doc.setDrawColor(241, 245, 249);
              doc.line(15, currentY + 3, 195, currentY + 3);
              
              currentY += 8;
          });

          // ৮. টোটাল সামারি বক্স রেন্ডার
          currentY += 5;
          const taxAmount = subtotal * (taxPct / 100);
          const discAmount = subtotal * (discPct / 100);
          const grandTotal = subtotal + taxAmount - discAmount;

          doc.setFontSize(10);
          doc.setFont('Helvetica', 'bold');
          doc.text('Subtotal:', 150, currentY, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          doc.text(subtotal.toFixed(2) + ' ' + currency, 192, currentY, { align: 'right' });

          currentY += 6;
          doc.setFont('Helvetica', 'bold');
          doc.text(`Tax (${taxPct}%):`, 150, currentY, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          doc.text(taxAmount.toFixed(2) + ' ' + currency, 192, currentY, { align: 'right' });

          currentY += 6;
          doc.setFont('Helvetica', 'bold');
          doc.text(`Discount (${discPct}%):`, 150, currentY, { align: 'right' });
          doc.setFont('Helvetica', 'normal');
          doc.text(discAmount.toFixed(2) + ' ' + currency, 192, currentY, { align: 'right' });

          // গ্র্যান্ড টোটাল ডার্ক প্যানেল
          currentY += 5;
          doc.setFillColor(15, 23, 42);
          doc.rect(110, currentY, 85, 10, 'F');
          
          doc.setTextColor(255, 255, 255);
          doc.setFont('Helvetica', 'bold');
          doc.text('Grand Total:', 145, currentY + 6.5, { align: 'right' });
          doc.text(grandTotal.toFixed(2) + ' ' + currency, 192, currentY + 6.5, { align: 'right' });

          // ৯. ইনভয়েস ফুটার
          doc.setTextColor(148, 163, 184);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(9);
          doc.text('Thank you for your business!', 105, 275, { align: 'center' });
          doc.text('If you have any questions, please contact us.', 105, 280, { align: 'center' });

          // ১০. অ্যাকশন এক্সিকিউশন (ডাউনলোড অথবা ডিরেক্ট প্রিন্ট)
          if (action === 'print') {
              statusEl.innerText = 'Opening browser print dialog...';
              doc.autoPrint(); // অটো-প্রিন্ট ইনস্ট্রাকশন এড করবে
              const pdfUrl = doc.output('bloburl'); // ডাইনামিক ব্লব ইউআরএল জেনারেট করবে
              const printWindow = window.open(pdfUrl, '_blank');
              if (printWindow) {
                  printWindow.focus();
              }
              statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> Print dialog opened!</span>';
          } else {
              statusEl.innerText = 'Saving invoice as PDF...';
              doc.save(`invoice_${invNum.replace('#', '')}.pdf`);
              statusEl.innerHTML = '<span style="color: #10b981;"><i class="fa-solid fa-circle-check"></i> Invoice generated successfully!</span>';
          }
          
          generateBtn.disabled = false;
          printBtn.disabled = false;

      } catch (err) {
          statusEl.innerText = 'Error generating PDF invoice';
          generateBtn.disabled = false;
          printBtn.disabled = false;
          console.error(err);
      }
  }

  // ৫. স্মার্ট ক্লিয়ার ফর্ম লজিক (কোম্পানির তথ্য ও সেভ করা লোগো মুছবে না)
  function clearInvoiceMakerForm() {
      // ক্লায়েন্ট এবং অন্যান্য পরিবর্তনশীল ডেটা মুছে যাবে [1.1.2]
      document.getElementById('invClientName').value = '';
      document.getElementById('invClientContact').value = '';
      document.getElementById('invClientAddress').value = '';
      document.getElementById('invNumber').value = '';
      document.getElementById('invTax').value = '0';
      document.getElementById('invDiscount').value = '0';
      document.getElementById('invCurrency').value = 'BDT';

      // আইটেম টেবিল সম্পূর্ণ খালি করে রি-ইনিশিয়ালাইজ করবে
      const container = document.getElementById('invoiceItemsList');
      container.innerHTML = '';
      addInvoiceItemRow();

      // কোম্পানির তথ্য রিলোড করবে (মুছে যাওয়া প্রতিরোধ করতে) [1.1.2]
      loadSavedSenderDetails();

      setupDefaultDates();
      document.getElementById('invoiceMakerStatus').innerText = 'Ready to generate';
      document.getElementById('invGenerateBtn').disabled = false;
      document.getElementById('invPrintBtn').disabled = false;
  }
