        const FORM_IFRAME_URL = 'https://arafatvatatracking.lovable.app/';
        let currentCaptchaToken = null;

        // বাংলা সংখ্যাকে ইংরেজিতে রূপান্তর
        function convertBanglaToEnglishNumber(str) {
            const banglaNumbers = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
            return str.replace(/[০-৯]/g, match => banglaNumbers[match]);
        }

        // CAPTCHA পাওয়ার ফাংশন
        async function getCaptcha() {
            try {
                const response = await fetch('https://api.bhata.gov.bd/api/v1/captcha?lang=en', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'accept-language': 'en',
                        'authorization': 'Bearer null',
                        'x-app-language': 'en'
                    }
                });

                const rawText = await response.text();

                if (!response.ok) {
                    throw new Error('CAPTCHA API এরর: ' + response.status);
                }

                let data;
                try {
                    data = JSON.parse(rawText);
                } catch (parseErr) {
                    throw new Error('রেসপন্স JSON না — সার্ভিস সমস্যা হতে পারে।');
                }

                if (data && data.captcha_token) {
                    currentCaptchaToken = data.captcha_token;

                    const captchaImage = document.getElementById('captchaImage');
                    if (data.captcha_image) {
                        captchaImage.src = data.captcha_image;
                    }

                    document.getElementById('captchaInput').value = '';
                    document.getElementById('captchaInput').focus();
                    return true;
                } else {
                    throw new Error('CAPTCHA ডেটা পাওয়া যায়নি');
                }
            } catch (error) {
                console.error('CAPTCHA এরর:', error.message);
                document.getElementById('appStatus').innerHTML = '<span style="color: #dc2626;"><i class="fa-solid fa-circle-xmark"></i> CAPTCHA এরর: ' + error.message + '</span>';
                
                const captchaSection = document.getElementById('captchaSection');
                captchaSection.style.display = 'block';
                document.getElementById('captchaImage').src = '';
                document.getElementById('captchaImage').alt = 'CAPTCHA লোড ব্যর্থ';
                return false;
            }
        }

        // ট্র্যাকিং রিকোয়েস্ট সাবমিট করার ফাংশন
        async function submitTrackingRequest(captchaValue) {
            const nidRaw = document.getElementById('nid').value.trim();
            const nidInput = convertBanglaToEnglishNumber(nidRaw);
            
            const day = document.getElementById('dobDay').value.padStart(2, '0');
            const month = document.getElementById('dobMonth').value;
            const year = document.getElementById('dobYear').value;

            const statusDiv = document.getElementById('appStatus');
            const resultDiv = document.getElementById('result');
            const captchaSection = document.getElementById('captchaSection');

            statusDiv.innerHTML = '<span style="color: #2563eb;"><i class="fa-solid fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...</span>';

            try {
                const dobInput = year + '-' + month + '-' + day;
                const apiUrl = 'https://api.bhata.gov.bd/api/v1/global/applicants_tracking?lang=en';
                const formData = new FormData();
                formData.append('tracking_type', '1');
                formData.append('nid', nidInput);
                formData.append('date_of_birth', dobInput);
                formData.append('captcha_token', currentCaptchaToken);
                formData.append('captcha_value', captchaValue);

                const response = await fetch(apiUrl, { 
                    method: 'POST', 
                    body: formData,
                    headers: {
                        'accept': 'application/json',
                        'accept-language': 'en',
                        'authorization': 'Bearer null',
                        'x-app-language': 'en'
                    }
                });
                
                if (!response.ok) throw new Error('সার্ভার এরর: ' + response.status);

                const jsonResponse = await response.json();
                statusDiv.innerHTML = ''; 

                if (jsonResponse.status === true && jsonResponse.data) {
                    let data = jsonResponse.data;
                    if (Array.isArray(data)) data = data[0]; 

                    localStorage.setItem('savedNid', nidInput);

                    const trackingNumber = data.tracking_no || data.trackingNo || data.application_id || data.id || 'পাওয়া যায়নি';
                    const nameBn = data.name_bn || data.name || "নাম পাওয়া যায়নি";
                    const apiDob = data.date_of_birth || dobInput;

                    resultDiv.innerHTML = `
                        <table>
                            <tr><td>আবেদনকারীর নাম</td><td>: <strong>${nameBn}</strong></td></tr>
                            <tr><td>জন্ম তারিখ</td><td>: ${apiDob}</td></tr>
                            <tr><td>এনআইডি</td><td>: ${nidInput}</td></tr>
                        </table>
                        <div class="tracking-box">
                            <div>
                                <div style="font-size: 13px; color: #166534; font-weight: 600;">ট্র্যাকিং নম্বর</div>
                                <div class="tracking-text">${trackingNumber}</div>
                            </div>
                            <button class="copy-btn" id="copyBtn"><i class="fa-regular fa-copy"></i> Copy</button>
                        </div>
                    `;
                    
                    resultDiv.style.display = 'block';
                    captchaSection.style.display = 'none';

                    // কপি বাটন ইভেন্ট
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

                } else if (jsonResponse.status === false) {
                    statusDiv.innerHTML = '<span style="color: #dc2626;"><i class="fa-solid fa-circle-xmark"></i> ' + (jsonResponse.message || 'CAPTCHA সঠিক নয়!') + '</span>';
                    resultDiv.style.display = 'none';
                    await getCaptcha();
                } else {
                    resultDiv.innerHTML = `
                        <div style="color: #dc2626; text-align: center; padding: 12px 0;">
                            <i class="fa-solid fa-triangle-exclamation" style="font-size: 26px; margin-bottom: 8px;"></i><br>
                            <strong>কোনো তথ্য পাওয়া যায়নি!</strong><br>
                            <span style="font-size: 13px; color: #64748b; display: block; margin-top: 6px;">এই এনআইডি দিয়ে হয়তো আবেদন করা হয়নি, অথবা এটি ইতোমধ্যে ভাতাভোগী তালিকায় যুক্ত হয়েছে।</span>
                        </div>
                    `;
                    resultDiv.style.display = 'block';
                    captchaSection.style.display = 'none';
                }

            } catch (error) {
                statusDiv.innerHTML = '<span style="color: #dc2626;"><i class="fa-solid fa-circle-xmark"></i> সমস্যা হয়েছে: ' + error.message + '</span>';
                resultDiv.style.display = 'none';
                await getCaptcha();
            }
        }

        // DOM লোড ইভেন্ট
        document.addEventListener('DOMContentLoaded', () => {
            const iframeElement = document.getElementById('bhataFormIframe');
            if (iframeElement) {
                iframeElement.src = FORM_IFRAME_URL;
            }

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

            // পাসওয়ার্ড কপি বাটন ইভেন্ট
            document.getElementById('copyPassBtn').addEventListener('click', function() {
                const passText = document.getElementById('sitePassword').innerText.trim();
                navigator.clipboard.writeText(passText).then(() => {
                    this.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    this.style.background = '#059669';
                    setTimeout(() => {
                        this.innerHTML = '<i class="fa-regular fa-copy"></i> পাসওয়ার্ড কপি করুন';
                        this.style.background = '#2563eb';
                    }, 2000);
                });
            });

            // CAPTCHA রিফ্রেশ বাটন
            document.getElementById('refreshCaptchaBtn').addEventListener('click', async () => {
                await getCaptcha();
            });

            // CAPTCHA সাবমিট বাটন
            document.getElementById('submitCaptchaBtn').addEventListener('click', async () => {
                const captchaValue = document.getElementById('captchaInput').value.trim();
                
                if (!captchaValue) {
                    document.getElementById('appStatus').innerHTML = '<span style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> CAPTCHA সংখ্যা দিন।</span>';
                    return;
                }

                await submitTrackingRequest(captchaValue);
            });
        });

        // "অবস্থা দেখুন" বাটন - ১ম ধাপ (ক্যাপচা লোড)
        document.getElementById('fillBtn').addEventListener('click', async () => {
            const nidRaw = document.getElementById('nid').value.trim();
            const nidInput = convertBanglaToEnglishNumber(nidRaw);

            const day = document.getElementById('dobDay').value.padStart(2, '0');
            const month = document.getElementById('dobMonth').value;
            const year = document.getElementById('dobYear').value;

            const statusDiv = document.getElementById('appStatus');
            const resultDiv = document.getElementById('result');
            const captchaSection = document.getElementById('captchaSection');

            if (!nidInput || day === '00' || !month || !year) {
                statusDiv.innerHTML = '<span style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> সঠিক NID এবং জন্ম তারিখ দিন।</span>';
                resultDiv.style.display = 'none';
                captchaSection.style.display = 'none';
                return;
            }

            statusDiv.innerHTML = '<span style="color: #2563eb;"><i class="fa-solid fa-spinner fa-spin"></i> CAPTCHA লোড করা হচ্ছে...</span>';
            resultDiv.style.display = 'none';

            if (await getCaptcha()) {
                statusDiv.innerHTML = '';
                captchaSection.style.display = 'block';
            }
        });
