function openFuelOilModal() { document.getElementById('fuelOilModal').style.display = 'flex'; updateFuelOilForm();
 
if (typeof setActiveMode === 'function') setActiveMode('mode-fuel-form');

}

  function closeFuelOilModal() { document.getElementById('fuelOilModal').style.display = 'none'; }

  const engToBdNumFO = (str) => {
      const bnMap = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
      return String(str).replace(/[0-9]/g, m => bnMap[m]);
  };

  function updateFuelOilForm() {
      const val = (id) => document.getElementById(id).value || '........................................';
      let fRaw = document.getElementById('fo-fuel-amount').value;
      let fAmount = fRaw ? engToBdNumFO(fRaw) : '.............';

      const htmlContent = `
          <div style="position: absolute; top: 20mm; right: 20mm; width: 35mm; height: 40mm; border: 1px dashed #000; display: flex; align-items: center; justify-content: center; text-align: center; padding: 5px; box-sizing: border-box; font-size: 12px; font-family: 'SolaimanLipi', sans-serif;">পাসপোর্ট ছবি স্ট্যাপলার দিয়ে সংযুক্ত করুন।</div>
          <div style="text-align: center; margin-bottom: 30px; padding-right: 40mm; font-family: 'SolaimanLipi', sans-serif;">
              <h1 style="margin: 0; font-size: 24px; display: inline-block; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 900;">জ্বালানি তেলের আবেদনপত্র</h1>
          </div>
          <div style="font-size: 16px; line-height: 2; color: #000; font-family: 'SolaimanLipi', sans-serif;">
              ১. আবেদনকারী/প্রতিষ্ঠানের নাম: <b>${val('fo-name')}</b><br/>
              ২. পিতা/প্রোপাইটর: <b>${val('fo-father')}</b><br/>
              ৩. গ্রাম/রাস্তা: <b>${val('fo-vill')}</b><br/>
              ৪. ইউনিয়ন: <b>${val('fo-union')}</b><br/>
              ৫. পোস্ট অফিস: <b>${val('fo-post')}</b><br/>
              ৬. থানা/উপজেলা: <b>${val('fo-thana')}</b><br/>
              ৭. জেলা: <b>${val('fo-dist')}</b><br/>
              ৮. এনআইডি বা ট্রেড লাইসেন্স নম্বর: <b>${val('fo-nid')}</b><br/>
              ৯. পাম্পের নাম: <b>${val('fo-pump')}</b><br/>
              ১০. যন্ত্র/মেশিনের নাম: <b>${val('fo-machine')}</b><br/>
              ১১. জ্বালানির ধরণ: <b>${val('fo-fuel-type')}</b><br/>
              ১২. জ্বালানির পরিমাণ: <b>${fAmount}</b> (লিটার)<br/>
              ১৩. ব্যবহারের উদ্দেশ্য: <b>${val('fo-purpose')}</b><br/>
              ১৪. মোবাইল নম্বর: <b>${val('fo-mobile')}</b>
          </div>
          <div style="margin-top: 25px; font-size: 16px; line-height: 1.6; text-align: justify; font-family: 'SolaimanLipi', sans-serif;">
              <b>বিনীত নিবেদন:</b> উপযুক্ত বিষয়ের আলোকে জানাচ্ছি যে, আমার প্রতিষ্ঠানের কাজ পরিচালনার জন্য নিয়মিত জ্বালানি তেলের প্রয়োজন। উক্ত বর্ণিত পরিমাণ জ্বালানি তেল সংগ্রহের প্রয়োজনীয় ব্যবস্থা গ্রহণের জন্য আপনাকে বিশেষভাবে অনুরোধ জানাচ্ছি।
          </div>
          <div style="margin-top: 20px; font-size: 15px; border-top: 1px solid #ddd; padding-top: 10px; font-family: 'SolaimanLipi', sans-serif;">
              <b>সংযুক্তিসমূহ:</b><br/><br/>১. সদ্য তোলা ছবি<br/><br/>২. এনআইডি বা ট্রেড লাইসেন্স কপি<br/><br/>৩. প্রতিষ্ঠানের প্রয়োজনীয় কাগজপত্র
          </div>
          
          <div style="border: 0.5px solid #000; padding: 15px; position: absolute; bottom: 20mm; left: 20mm; width: calc(100% - 40mm); box-sizing: border-box; font-size: 15px; font-family: 'SolaimanLipi', sans-serif;">
              <div style="text-align: center; margin-bottom: 25px;">
                  <span style="font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px; display: inline-block;">গণ্যমান্য ও ওয়ার্ড প্রতিনিধির অনুমতি</span>
              </div>
              অনুমোদিত জ্বালানির পরিমাণ: .........................<br/><br/>
              সুপারিশকারী কর্মকর্তার (স্বাক্ষর ও সীল): ...........................................
          </div>`;
      
      document.getElementById('fo-pdf-container').innerHTML = htmlContent;
      document.getElementById('fo-actual-print-content').innerHTML = htmlContent;
  }

  function downloadFuelOilPDF() {
      const btn = document.getElementById('fo-download-btn');
      const element = document.getElementById('fo-actual-print-content');
      
      btn.innerHTML = "অপেক্ষা করুন...";
      btn.disabled = true;

      const opt = {
          margin: 0,
          filename: 'Fuel_Oil_Application.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
              scale: 2, 
              useCORS: true, 
              letterRendering: true,
              scrollX: 0,
              scrollY: 0
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          // অতিরিক্ত পেজ আসা বন্ধ করতে নিচের কমান্ডটি জরুরি
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      setTimeout(() => {
          html2pdf().set(opt).from(element).save().then(() => {
              btn.innerHTML = "PDF ডাউনলোড";
              btn.disabled = false;
          }).catch(err => {
              btn.innerHTML = "PDF ডাউনলোড";
              btn.disabled = false;
          });
      }, 500);
  }

  function resetFuelOilForm() {
      document.querySelectorAll('#fuelOilModal input').forEach(i => i.value = '');
      updateFuelOilForm();
  }
