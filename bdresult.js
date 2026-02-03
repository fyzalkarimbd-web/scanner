const bdResultList = [
  { name: "প্রাথমিক শিক্ষা অধিদপ্তর", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXodoER66gM-MD5WM7zYTW5eezYhfMr5jP8vTl1b-EfV661cyeLLCRDiUKsa9xEppY5LPaTypt3YVZ9hEG0xMtYD6PKFNJN-mV9oCUbQpvw7gXET3WGKnbMLGjMXIPNoEysYSMp5eYYvuGc5FO8wqwTSgNun2tQn7RvsgytkC6TPSIHO_FMb4dbgj5lnI/s1600/logo.png", link: "http://180.211.137.51/" },
  { name: "প্রাথমিক শিক্ষা-বিদ্যালয় ভিত্তিক", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiXodoER66gM-MD5WM7zYTW5eezYhfMr5jP8vTl1b-EfV661cyeLLCRDiUKsa9xEppY5LPaTypt3YVZ9hEG0xMtYD6PKFNJN-mV9oCUbQpvw7gXET3WGKnbMLGjMXIPNoEysYSMp5eYYvuGc5FO8wqwTSgNun2tQn7RvsgytkC6TPSIHO_FMb4dbgj5lnI/s1600/logo.png", link: "http://180.211.137.51/ResultSchWise.aspx" },
  { name: "বাংলাদেশ শিক্ষা বোর্ড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjhj_2hUiFrSnQ6VO2EGrRCBdRkj3cN4YwALyTzAvs-kMEu0hu9lSgHVEPykJC7oGeslSS78SUdEPrzXLDJNhx4gPyrzb5Okr0jsk6VjDRJZkckZXxwhrOsfcU2xpz0KyuLOMNVGIQ83t-e6hBpAb0ykBoIs64NdPYcy5yskUNbtE0LH1wNc-0JpqPHpIA/s1600/teletalk-sim-operator-logo-png_seeklogo-388669.png", link: "http://www.educationboardresults.gov.bd/" },
  { name: "পরীক্ষার রেজাল্ট বিডি", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi75b8dqCJ2Q3-LmZeyVDtemeEQ7LWvnBaW0X-9dNCKRn3MDXr9qePBUoNDXHKeEG0bdeeEzCriwA5Ikvq1Cw7bkb0yPS4pNO4mnrvuRlD3JxRXH4inWWnbg4HYETFDWFYlHfP0MGLnPF9QdapTydA2Of1YcEFK3ZUQKo12BDXJzvdoGNXL9tbFQCY6qnQ/s1600/gov.png", link: "https://eboardresults.com/v2/home?lang=bn" },
  { name: "কওমী মাদরাসা শিক্ষাবোর্ড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjAJGMfSZz316xWNK89yzTyYHIGJhGH91xYzs5yl-9aEDfrGEuNeFdaxVo5rUxHzmrpantEBxBZx0DXbDkgymwHY6Yjd9LEaFqwWYK5EjfV8vmGQBod2xY_ocP9MobQxp7KWl6mzudytDErtiQugbupC62vIcGeQv7GM1JEkv2ziIopqC_m_r8Hz3dmXJE/s1600/logog.png", link: "https://wifaqresult.com/" },
  { name: "কারিগরী শিক্ষা বোর্ড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgsWKJbNW1tqGJwAfIjIs9IroBQqybgu0-UAASCTNCIQz7f-LZyqVs7V0c0kU8NoHfaAU-LpPPHfvlJ7BvB_eBdaj0CuYXU0uhlnHQoV4-scnixWwnXEUdCUv0W86Vv2fZzdrWtaHyBjlYUtTMyMPm4xAKeWNmYflffA2iR6PVV5F-WHvdNkbwETkk-ZNk/s1600/bteb.png", link: "http://180.211.162.102:8444/result_arch/index.php" },
  { name: "মেডিকেল রেজাল্ট - MBBS", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgcxGGo9qNiX0qYv8ZsJ15ujaxsOZZpLMQwYvTU2nyG5u-HN5wMv8vr0iqVjzPydnppJSdNRZt9OOHj1Zn5xF1jMp4pHuRScWplEVTz0-mex1xuXl_MC1iCnKrLHu7FhKG-cyWXX1VhFeYEK_IZ7ufr6KNfdXzxw3XTmpyQwL5HIgEnxHzbbozWhhsjF4U/s1600/mbbs.png", link: "https://result.dghs.gov.bd/mbbs/" },
  { name: "মেডিকেল রেজাল্ট - BDS", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1k57tM21m-MayivBlMHgrAgXol72eVTZxdoAftCXj2l8n8nWaD5i7rbRBHOGQzEm5MQk9zJpjYbbRA5tXSvEFxIel5MBpBgQaQDnaFahFmZphtpRBU_VvDkN8sDKTQUjRf51ptk6RvWq7Ef-PgA2SdVojOHPXelsgiWkdrjE5Ib8GOIpg1LzX2e3VgK4/s1600/bds.png", link: "https://result.dghs.gov.bd/bds/" },
  { name: "বিদ্যালয়ের অভ্যন্তরীণ রেজাল্ট", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVLfPOctwoXCwYtrjXBdqr7b4e7PNgCdMSY-a30srU935HpcZMmFFfkUnwEb_CzI-36GmuEI3trwWE1dkyc3bH-tRYceoZCqK3iKq6bIm4XdvsdWqKOJDJ3tTHyTDCfMZf-1kk_AFmDIgiPcY_kMkhDm1fYcEu0wbs3TurF38W2qAqxvQSR561ZI8tXRo/s1600/css.png", link: "http://sib.gov.bd/" },
  
  // নতুন ৩টি সাইট নিচে যুক্ত হলো
  { name: "জাতীয় বিশ্ববিদ্যালয় (NU)", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgbnFkrCb_igD2AAVIb1ry-WU40ahVN-G9mFv_W_6GNCI4M1XMnbsbbcXhHslPV1Dt3RTXH-DUiEIXMa2AP73zL2nuJHnYBgtSndxto5VfLknT1N1gkXmRx4Rjjzdbs9t3GGZqGeHaxKFs8-hfNJXr_XYtoYpH3cS6keJMt6Ipc0x_US3A4UVEIyL3le98/s320/NU.png", link: "http://results.nu.ac.bd/" },
  { name: "উন্মুক্ত বিশ্ববিদ্যালয় (BOU)", logo: "https://exam.bou.ac.bd/images/boulogo-new.png", link: "https://exam.bou.ac.bd/" },
  { name: "শিক্ষক নিবন্ধন (NTRCA)", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg131ftwBH64wYaULxvxrjArhqa8AF_Bo-oE4WbfLC5O3aVvM8Cpfn5hl9U2ZaDjzImYjoaNWsrZW8i1BCweQhaZnTCxBAzd2o6-tLtyhAbYX7ERp68UKaET0y9hOmeHtGNGrIP2Aan4ia1TA4J619XK7bBnzyr_W73H6xdYbLkPg5w3bYE5LwRjae48IU/s320/ntrca.png", link: "http://ntrca.teletalk.com.bd/result/" }
];

// রেজাল্ট গ্রেডিয়েন্ট প্যালেট
const resGradients = [
  "linear-gradient(135deg, #FF8A80, #FF5252)",
  "linear-gradient(135deg, #A5D6A7, #66BB6A)",
  "linear-gradient(135deg, #90CAF9, #42A5F5)",
  "linear-gradient(135deg, #FFE082, #FFB347)",
  "linear-gradient(135deg, #F48FB1, #F06292)",
  "linear-gradient(135deg, #80CBC4, #26A69A)"
];

function openResultModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-result-check');
    document.getElementById('resultCheckModal').style.display = 'flex';
    renderResultGrid();
}

function closeResultModal() {
    document.getElementById('resultCheckModal').style.display = 'none';
}

function renderResultGrid() {
    const container = document.getElementById("result-master-grid");
    if(!container) return;
    container.innerHTML = "";

    bdResultList.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "res-card-item";
        card.style.background = resGradients[index % resGradients.length];
        
        card.innerHTML = `
            <img src="${item.logo}" alt="${item.name}">
            <span>${item.name}</span>
            <div class="btn-res-visit">ভিজিট করুন</div>
        `;
        
        card.onclick = () => window.open(item.link, '_blank');
        container.appendChild(card);
    });
}
