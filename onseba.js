const onlineSebaList = [
  { name: "পল্লী বিদ্যুৎ মিটার আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQ_tNznpArNXHpj5TQSvrb87xdqCykGYPVcCyE-C1H-BR_AC0A2RNS5ohf8nLX_X7fChOQApTR756-8hj3q6VbAxiOc6oiDp7fngx45zR21avmoGYC02ZeFeVoJN09N6glOekHlY8_jvkoI5BxeItU1cq_7nYKKyXOmKjnap0OUGytQXqU6SdHhTwzekg/s1600/polli.png", link: "http://www.rebpbs.com/Default.aspx" },
  { name: "অনলাইন জিডি আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRSS3qpFjoZIOpP4J8Jf7-EPQZpXYltkk_szsU3UlGR6vpQIQl4JnnllVxCnbMOBffD4PiR-qc0jhWAKifWufihyphenhyphenj3EfG1x4Sy4H6qrSR9zoScC7fQIz60vUDwm-PHSttvpzL_NJ0y2frQxrv8VaK2mIbBSrdc794bjWziVRgJZmXEB-aXCB0eQ-AiKps/s1600/gd.png", link: "https://gd.police.gov.bd/Auth/Account/Login" },
  { name: "কলেজ ভর্তি আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPnngv7ZIQXRP5ONFxBVK7K6uaVgDxQJBWeS_fPPqHsAnVLacQQ_-6mbyVGiegoI_Hu4k4U9yMMR3JC-7tC-6ife-UCV1KS5G7xVgtsVOf72iQ6DitjxXhvOGpod3s2MvThuepV9QTB_ohXKtEwyCKtMa7XRe5wQAd7E7aNvXOAGsgHw/s1600/gov.png", link: "https://xiclassadmission.gov.bd" },
  { name: "সকল ভাতার আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJ3pRq4KG_bBUMnIEVkr3tE-rfkQ1qBcKvthP3IDrxtXArD01yA3SO1XO4LF6O6cXkIXxNiWU2-tu4Ym8JnSbrw1EeA8w7csliU8rnAk8vr69qJoCXxf7AORW2sWj3YDRs4YUlrEQp5TiaMKp2-UBZTfn2Bg5_3yiPtImrOHX2-moTAMWrvABJ_GubCsQ/s1600/bhata.png", link: "https://dss.bhata.gov.bd/home" },
  { name: "প্রতিবন্ধী কার্ডের আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIDbHmeCPA_NUHmX_YhdVuglAmU3zo9qYzDmN_uFtCuqQTervhddUhQzhiwErWPf0cmtvRrguLsaCrKky_rkXtqCB6A-kJdRuwewLmvrqH_stsKLO4DxkKy6vaxVFlOmEWHrc0-seSDljVnnqea9Tzhqb84e3N_2S8_42Qm9GvglELS3DVZBQbAmjI8d4/s320/diss.png", link: "https://www.dis.gov.bd/" },
  { name: "এ-চালান", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHGLXrFesWrziYlo8QycQyyRjrvHpnyZfhQ6z6x4YZbP4Ae88FbbaCkAPALJYSYeT0id9MmjJ1GhQQ-ehZ4Dz-JtuDKAbXtePrfgUDIZn6Tk5Hvsebg1dSU16ES6mTY8Iklyr9fVdPth3XQwTpOoDkGeqDU5rRc2wtx0yD91vBC7J2roaTG4bZFnYLV9k/s1600/a.png", link: "https://training.finance.gov.bd/acs/v2/general/home" },
  { name: "জন্ম নিবন্ধন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIUcfEleYR4vIsscnivWiU3i_Y9_CAKCQWEa_xgZSlzlOX5-_D0O8wUsjxNBAEekSwraFkQQcaUMPPpb5e49aEqZhWteN1LNjHMJoBFUSD2eUFsBfQMFc11EDrBaUDjYUZtBlnsIxK0SJSgo22DZuOCiANEd9zafKTZD4egaGrm0vGPsx8BJDQ4m4Egpw/s1600/dob.png", link: "https://bdris.gov.bd/" },
  { name: "জন্ম নিবন্ধন যাচাই", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_YtLcyQqdG8mF1SEK2V0upbcWkDImMFjPFTAnyNxYmGnmw4FYR3ZoApXGsVSFqz2_ed32oGwCJn2dWhra3bEeZhn-Q9KXMBDtnvyXO0Yg8Hi13QJjgTXqyjOYRVzJty-hUK1OA1ijBBqnCJ2w_09pOW3RNToYRow3lcffGWI6yrl2ZAZWaY6UBGTu-Z8/s1600/jonmo.jpeg", link: "https://www.jonmonibondhonjachai.com/" },
  { name: "এন-আইডি কার্ড আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7vxBu4KQfuo5hnjjucdt3lYBLBYiRB1r44uu7hiqab3gebEP35LPij6iN05N6BKzbOT6ES_XyCDWjY45CMeihFotaqhH-Lr8pq_UPAwHgvzkcdwV6HYDi01bWRgb4vE1VTNQ7vKEzOT7yPzLgZbNw6pcQWpfKrzrse8ayVgbqC5ay_40WWGPzSHLJNkk/s1600/ec.png", link: "https://services.nidw.gov.bd/nid-pub/register-account" },
  { name: "এন-আইডি কার্ড ডাউনলোড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7vxBu4KQfuo5hnjjucdt3lYBLBYiRB1r44uu7hiqab3gebEP35LPij6iN05N6BKzbOT6ES_XyCDWjY45CMeihFotaqhH-Lr8pq_UPAwHgvzkcdwV6HYDi01bWRgb4vE1VTNQ7vKEzOT7yPzLgZbNw6pcQWpfKrzrse8ayVgbqC5ay_40WWGPzSHLJNkk/s1600/ec.png", link: "https://services.nidw.gov.bd/nid-pub/claim-account" },
  { name: "স্মার্ট এন-আইডি স্ট্যাটাস চেক", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7vxBu4KQfuo5hnjjucdt3lYBLBYiRB1r44uu7hiqab3gebEP35LPij6iN05N6BKzbOT6ES_XyCDWjY45CMeihFotaqhH-Lr8pq_UPAwHgvzkcdwV6HYDi01bWRgb4vE1VTNQ7vKEzOT7yPzLgZbNw6pcQWpfKrzrse8ayVgbqC5ay_40WWGPzSHLJNkk/s1600/ec.png", link: "https://services.nidw.gov.bd/nid-pub/card-status/" },
  { name: "পুলিশ ক্লিয়ারেন্স আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgmtvx1vEtRMHAg5YP6yfhFYDV8Z3nR_TFtyQrz2oSstd06pi7_5bjClmi34uQOzv6ZuRqeOA4Vve5rR7rEItu18u6pf7Ga47ErScBtpbRWttoVibEHtiYhwLrD8_UInznelVqbEUTBaH_sZnKv9YyzgURZVsfrhxjSj_1fclP9Ea1n2JVatAarjK_wyG4/s1600/images.jpeg", link: "https://pcc.police.gov.bd/ords/r/pcc/pcc/home" },
  { name: "টিন সার্টিফিকেট আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXdnYR5c1Do8RDGkOn7Q-t4ibfSfRAteIBLX4SRavOs2czQDItU-3OWQ0-D7R7FA5Nn6nzSXflAucLedNTcCYrI0AGC_OGWwZFhYeuqmG1monQd3sDn4Jk_j2tYN7vqz2uLgkX0fSKqfUs-QFxoSLw3iCB7bLgfQ2BTpVtG55hBJF-pIyKWY7V_RasGLI/s1600/tin.jpg", link: "https://secure.incometax.gov.bd/TINHome" },
  { name: "ড্রাইভিং লাইসেন্স আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEMf32wPXNpG8c15ixXDF-ra9TP1Wudm1NG5u6vQX5BeBN-X9vFJgyLowTFfSmKS28k6PeqqR5FZvHbYV6HBXj7toG_GUob6QklaFzVx9xIzM6CjcO_M5fQm4LV7Uvv2wXWVAgice0y-zB_G_1HZMZ_WcCk6YLLRfvtlrFZag0_R1oSWC-0UqJndRR56A/s1600/brta.png", link: "https://bsp.brta.gov.bd" },
  { name: "টাইফয়েড ভ্যাকসিন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvHDbfqFrEbczVCCWZ2KdeouLRWcnEfHcL4C5mcyPW-_oJssL4cxPb8LFT4CFMr9htZh8rSI27oVFaPesb3p6zdOEZ7L4uBzaPJZlEhTNQvRVqpCifWp9b0BnhxIYB1riseXz1dXeT4ZxPOu6EYUtCVT8vMgN2S9IPf_Cd4V_7AnDn74-d4rhYuMB6PJ8/s1600/tica.png", link: "https://vaxepi.gov.bd/registration/tcv" },
  { name: "মেনিনজাইটিস ভ্যাকসিন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvHDbfqFrEbczVCCWZ2KdeouLRWcnEfHcL4C5mcyPW-_oJssL4cxPb8LFT4CFMr9htZh8rSI27oVFaPesb3p6zdOEZ7L4uBzaPJZlEhTNQvRVqpCifWp9b0BnhxIYB1riseXz1dXeT4ZxPOu6EYUtCVT8vMgN2S9IPf_Cd4V_7AnDn74-d4rhYuMB6PJ8/s1600/tica.png", link: "https://vaxepi.gov.bd/registration/meningitis" },
  { name: "এইচপিভি ভ্যাকসিন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvHDbfqFrEbczVCCWZ2KdeouLRWcnEfHcL4C5mcyPW-_oJssL4cxPb8LFT4CFMr9htZh8rSI27oVFaPesb3p6zdOEZ7L4uBzaPJZlEhTNQvRVqpCifWp9b0BnhxIYB1riseXz1dXeT4ZxPOu6EYUtCVT8vMgN2S9IPf_Cd4V_7AnDn74-d4rhYuMB6PJ8/s1600/tica.png", link: "https://vaxepi.gov.bd/registration/hpv" },
  { name: "এনরোলমেন্ট কার্ড ডাউনলোড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUzJO-wJMSaip93MkajMd65T4aojN748IeFFJ_rzsm944Kfsp_NQ398_F7-b-FI0EeDaywSybxWJbUzf05fPRDV0piDTIosaX0DNnFt1ILn1dayCMMGL45tW-y1bhdx4Sbe8zMPj_0gkwFHoSZ3fkYTwycm-4LitOdx7IOiUYSIxxi2PSIXaqUOcSBUvk/s1600/tre.png", link: "https://training.oep.gov.bd/pdo-enrollment-card" },
  { name: "ট্রেনিং সার্টিফিকেট ডাউনলোড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUzJO-wJMSaip93MkajMd65T4aojN748IeFFJ_rzsm944Kfsp_NQ398_F7-b-FI0EeDaywSybxWJbUzf05fPRDV0piDTIosaX0DNnFt1ILn1dayCMMGL45tW-y1bhdx4Sbe8zMPj_0gkwFHoSZ3fkYTwycm-4LitOdx7IOiUYSIxxi2PSIXaqUOcSBUvk/s1600/tre.png", link: "https://training.oep.gov.bd/pdo-certificate" },
  { name: "ম্যানপাওয়ার ডাউনলোড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUzJO-wJMSaip93MkajMd65T4aojN748IeFFJ_rzsm944Kfsp_NQ398_F7-b-FI0EeDaywSybxWJbUzf05fPRDV0piDTIosaX0DNnFt1ILn1dayCMMGL45tW-y1bhdx4Sbe8zMPj_0gkwFHoSZ3fkYTwycm-4LitOdx7IOiUYSIxxi2PSIXaqUOcSBUvk/s1600/tre.png", link: "https://self.oep.gov.bd/self-clearance/login" },
  { name: "বিএমইটি আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjUzJO-wJMSaip93MkajMd65T4aojN748IeFFJ_rzsm944Kfsp_NQ398_F7-b-FI0EeDaywSybxWJbUzf05fPRDV0piDTIosaX0DNnFt1ILn1dayCMMGL45tW-y1bhdx4Sbe8zMPj_0gkwFHoSZ3fkYTwycm-4LitOdx7IOiUYSIxxi2PSIXaqUOcSBUvk/s1600/tre.png", link: "https://employee.oep.gov.bd/employee/login-with-otp" },
  { name: "ই-পাসপোর্ট আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_AQfad2_5iM7I-0OBASm7oQhUU7Y0Rr_eLY3t4weuYxgnnX0adAjSdoUZst1QZhUajfVAznth0P3QsAcfqTDytRnn71n81TG2CGAFoZBEXw1xq7WBxS4hoY3xn18ZNClD8DNTC_q6keBVJaFsJQtpBGLqh0zcufM3h86TnTaJioxEE2X4vs2YL6qxQ6Q/s1600/pass.jpeg", link: "https://epassport.gov.bd/onboarding" },
  { name: "পাসপোর্ট আবেদন চেক", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_AQfad2_5iM7I-0OBASm7oQhUU7Y0Rr_eLY3t4weuYxgnnX0adAjSdoUZst1QZhUajfVAznth0P3QsAcfqTDytRnn71n81TG2CGAFoZBEXw1xq7WBxS4hoY3xn18ZNClD8DNTC_q6keBVJaFsJQtpBGLqh0zcufM3h86TnTaJioxEE2X4vs2YL6qxQ6Q/s1600/pass.jpeg", link: "https://epassport.gov.bd/authorization/application-status" },
  { name: "জমির খারিজ আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXPLdr2zh11miyPhvU8DAQ_GOPVVd1Hi7Q3Go2t7z_h_Zh9jVHp8PW9ZvM8tUSQauzCjSTsq7PAX2pCKZ93vWniCNFEEgUTZRXR8xP7d1czW3ZAjbnkbm_k-2VjBs6OZmfDLIMws49ujcbWtGV7PdyTa_824bQAvekD6NOpW6dV85YT0_E8XpOjClROrs/s1600/img.png", link: "https://mutation.land.gov.bd/" },
  { name: "ভূমি উন্নয়ন কর প্রদান", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQPbEEPSG2zQzSlm69zecnUDN-MmmKn63TI9WTtO4q11LV1M6hBkjart0VW6AUQqRiYQ1J0IhB6pOJ6ZIYovzvmltzoXYvgMV47W3TRvGb0MrZVj5AlCxyxL93UzwlEHnGFfY2zAS3VBRBzidA2-ZFvKz2PW3Fe8TRMGfY821pm-lDMNvesOOsf6ARI2Q/s1600/v.webp", link: "https://portal.ldtax.gov.bd/sso" },
  { name: "ভূমি ম্যাপ ও খতিয়ান", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgLmPkgq6LF_0oQXrnP0Ko1rhH824k6c53FhhAMazthbZFcj0qc3LfCUt9LuNyQzauffalsdb491ikMuIpMy6XRS2Je-tjx7fn0Px_JWwWTC0G76pFRkHffJosd0JGq3kdJuMZXkjUHSa4hzHlvUuK3TnONJqYrBGsnucMFcTUzDjEvoYqvhhx4F3pk9XE/s1600/map.webp", link: "https://dlrms.land.gov.bd/" },
  { name: "স্মার্ট নাগরিক ইউনিয়ন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhtKj6ftyZJ-sGj1rT6yARFq1ajkDDdYVr45Eqqz620s9fW80NZSnnDEjJ5MiTbUWv3I2-X52uOjEwKduJ8qqwsDEr1piGfAG0oCX2k-6p4lU4uiPFYCOqpZonfQos-t3tJnrviH6geuC34gmLcSDdXoItvV-sLuzaY0xlCk5ImHdPLHa1XxtvaIwHOEOY/s1600/01.png", link: "https://smartnagorik.com.bd" },
  { name: "টিসিবি স্মার্ট কার্ড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0th-c30M1lhcC71nbm1R6WtwkMC7OIHmXSuZxXKy1auXuCxWDgNuj5dtneWhvnHgr_0gCP_F2xDikqB12vHF-Cu-GQ5p6Ui56g5hccCKtk8b5puGJIKFLTzJOstmaKkOo5xMNSIb-MD0hcFtsTr9RqfzrQXdF72PuV_bo8NuGcL7A79rpFQRYZV13z1o/s1600/tcb.jpeg", link: "https://tcbsheba.com/" },
  
{ name: "আমি প্রবাসী", logo: "https://dnq4a6incipq3.cloudfront.net/website/public/img/logo.png", link: "https://www.amiprobashi.com/" },

{ name: "বোয়েসেল", logo: "https://brms.boesl.gov.bd/assets/images/logo_big.png", link: "https://brms.boesl.gov.bd/" },

{ name: "মাই গভ", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhu8X7x1D2_bz6MmFspi60T9n6ym379tKQDpCpEu-NKDUjJbeoMJUStSMJ-LFQLmCy6SkjRBhdBi848R5NXlpaz_bSXjvUGLA5O_zi_uuIYeG30rH9WgRl_Pz15gw9-wmRZ0wEHkTFBASyF1qSvWhggRNn1Q6LBIy0GDsub-5-uxKHw9zqhFoHz1TAo7eE/s320/mygov.png", link: "https://www.mygov.bd/" },

{ name: "আমার সেবা", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYjUuEQfS67Ip54bDjq2eCnvfgm0yIw4b1HLeRTPPjnd8sStv0GswWM_7139aSQpB50rQgmVl5agTJ429XzcuCmyTnpMW9m3isFaH31IHyun_7UIQXg7AbNIUmQnqjBZ0yCNP76Du0J9-wrVzGNjanu3oXCPbJNfDGCmaWsRRVzgyCsiOyMIOdc6VEk84/s1600/seba.png", link: "https://e-amarseba.com/" }
];

// গ্রেডিয়েন্ট প্যালেট
const sebaGradients = [
  "linear-gradient(135deg, #ff8a80, #ff5252)",
  "linear-gradient(135deg, #a5d6a7, #66bb6a)",
  "linear-gradient(135deg, #90caf9, #42a5f5)",
  "linear-gradient(135deg, #ffe082, #ffb347)"
];

function openSebaModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-online-seba');
    document.getElementById('onlineSebaModal').style.display = 'flex';
    renderSebaGrid();
}

function closeSebaModal() {
    document.getElementById('onlineSebaModal').style.display = 'none';
}

function renderSebaGrid() {
    const container = document.getElementById("seba-master-grid");
    container.innerHTML = "";

    onlineSebaList.forEach((seba, index) => {
        const card = document.createElement("div");
        card.className = "seba-card-item";
        card.style.background = sebaGradients[index % sebaGradients.length];
        
        card.innerHTML = `
            <img src="${seba.logo}" alt="${seba.name}">
            <span>${seba.name}</span>
            <div class="btn-seba-visit">ভিজিট করুন</div>
        `;
        
        card.onclick = () => window.open(seba.link, '_blank');
        container.appendChild(card);
    });
}
