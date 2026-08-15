 // বাংলা সংখ্যাকে ইংরেজিতে রূপান্তর
        function convertBanglaToEnglishNumber(str) {
            const banglaNumbers = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
            return str.replace(/[০-৯]/g, match => banglaNumbers[match]);
        }

        // পেজ লোড হওয়ার সাথে সাথে ড্রপডাউন জেনারেট এবং NID রিড করা
        document.addEventListener('DOMContentLoaded', () => {
            const daysList = document.getElementById('daysList');
            for (let i = 1; i <= 31; i++) {
                let opt = document.createElement('option');
                opt.value = i.toString().padStart(2, '0');
                daysList.appendChild(opt);
            }

            const yearsList = document.getElementById('yearsList');
            for (let i = 1990; i >= 1930; i--) {
                let opt = document.createElement('option');
                opt.value = i.toString();
                yearsList.appendChild(opt);
            }

            const savedNid = localStorage.getItem('savedNid');
            if (savedNid) {
                document.getElementById('nid').value = savedNid;
            }

            // পাসওয়ার্ড কপি বাটন ফাংশনালিটি
            const copyPassBtn = document.getElementById('copyPassBtn');
            if (copyPassBtn) {
                copyPassBtn.addEventListener('click', function() {
                    const passText = document.getElementById('sitePassword').innerText;
                    navigator.clipboard.writeText(passText).then(() => {
                        this.innerHTML = '<i class="fa-solid fa-check"></i> কপি হয়েছে!';
                        this.style.background = '#059669';
                        setTimeout(() => {
                            this.innerHTML = '<i class="fa-regular fa-copy"></i> পাসওয়ার্ড কপি করুন';
                            this.style.background = '#2563eb';
                        }, 2000);
                    });
                });
            }

            // পেজ রিলোড বাটন ইভেন্ট
            document.getElementById('reloadBtn').addEventListener('click', () => {
                window.location.reload();
            });
        });

        // মূল একশন বাটন
        document.getElementById('fillBtn').addEventListener('click', async () => {
            const nidRaw = document.getElementById('nid').value.trim();
            const nidInput = convertBanglaToEnglishNumber(nidRaw);
            
            localStorage.setItem('savedNid', nidInput);

            const day = document.getElementById('dobDay').value.padStart(2, '0');
            const month = document.getElementById('dobMonth').value;
            const year = document.getElementById('dobYear').value;

            const statusDiv = document.getElementById('appStatus');
            const resultDiv = document.getElementById('result');

            if (!nidInput || day === '00' || !month || !year) {
                statusDiv.innerHTML = '<span style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> সঠিক NID এবং জন্ম তারিখ দিন।</span>';
                resultDiv.style.display = 'none';
                return;
            }

            const dobInput = `${year}-${month}-${day}`;
            statusDiv.innerHTML = '<span style="color: #2563eb;"><i class="fa-solid fa-spinner fa-spin"></i> তথ্য খোঁজা হচ্ছে...</span>';
            resultDiv.style.display = 'none';

            try {
                const apiUrl = 'https://api.bhata.gov.bd/api/v1/global/applicants_tracking?lang=bn';
                const formData = new FormData();
                formData.append('nid', nidInput);
                formData.append('date_of_birth', dobInput);
                formData.append('tracking_type', '1');

                const response = await fetch(apiUrl, { method: 'POST', body: formData });
                
                if (!response.ok) throw new Error('সার্ভার রেসপন্স দিচ্ছে না!');

                const jsonResponse = await response.json();
                statusDiv.innerHTML = ''; 

                if (jsonResponse.status === true && jsonResponse.data) {
                    let data = jsonResponse.data;
                    if (Array.isArray(data)) data = data[0]; 

                    const trackingNumber = data.tracking_no || data.trackingNo || data.application_id || data.id || 'পাওয়া যায়নি';
                    const nameBn = data.name_bn || data.name || "নাম পাওয়া যায়নি";
                    const apiDob = data.date_of_birth || dobInput;

                    resultDiv.innerHTML = `
                        <table>
                            <tr><td>আবেদনকারীর নাম</td><td>: <strong>${nameBn}</strong></td></tr>
                            <tr><td>জন্ম তারিখ</td><td>: ${apiDob}</td></tr>
                            <tr><td>এনআইডি</td><td>: ${nidInput}</td></tr>
                        </table>
                        <div class="tracking-box">
                            <div>
                                <div style="font-size: 11px; color: #166534;">ট্র্যাকিং নম্বর</div>
                                <div class="tracking-text">${trackingNumber}</div>
                            </div>
                            <button class="copy-btn" id="copyBtn"><i class="fa-regular fa-copy"></i> Copy</button>
                        </div>
                    `;
                    resultDiv.style.display = 'block';

                    // কপি বাটন ফাংশন
                    document.getElementById('copyBtn').addEventListener('click', function() {
                        navigator.clipboard.writeText(trackingNumber).then(() => {
                            this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                            this.style.background = '#059669';
                            setTimeout(() => {
                                this.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
                                this.style.background = '#16a34a';
                            }, 2000);
                        });
                    });

                } else {
                    resultDiv.innerHTML = `
                        <div style="color: #dc2626; text-align: center; padding: 10px 0;">
                            <i class="fa-solid fa-triangle-exclamation" style="font-size: 24px; margin-bottom: 8px;"></i><br>
                            <strong>কোনো তথ্য পাওয়া যায়নি!</strong><br>
                            <span style="font-size: 12px; color: #64748b; display: block; margin-top: 5px;">এই এনআইডি দিয়ে হয়তো আবেদন করা হয়নি, অথবা এটি ইতোমধ্যে ভাতাভোগী তালিকায় যুক্ত হয়েছে। অথবা আবেদনটি ২০২৫-২০২৬ সালের আগে করা হয়েছিল, তাই ট্র্যাকিং করা সম্ভব নয়!</span>
                        </div>
                    `;
                    resultDiv.style.display = 'block';
                }

            } catch (error) {
                statusDiv.innerHTML = `<span style="color: #dc2626;"><i class="fa-solid fa-circle-xmark"></i> সমস্যা হয়েছে: ${error.message}</span>`;
            }
        });
