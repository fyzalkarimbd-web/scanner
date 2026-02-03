const allJobSites = [
  // লোগো ভিত্তিক সাইটগুলো (উপরে থাকবে)
  { name: "All Job Teletalk", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhMmzAhLqlbjud22fetfPOvRQ6ROSjXkgHg7uTXuV_BvlW1oSdEmkyGYYUsnNvikSeSY7BzH5ikOmWHj8jr0_SDllMqAxQLt5JiBpTQ_fJ2VPkOH95rUIj5dbi8CPmLXOepeJvzxzPxbBBN2HBmEQSEmDvUgXhqgAneeDoPE8ihPVl_kSeFqvq_DHqfQX0/s1600/alljobs.png", link: "https://alljobs.teletalk.com.bd/jobs/government" },
  { name: "All Govt Jobs", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi13wdz3YAlITHIljo09gZEonJKSIC9WUYB2IwHfTjfKzLut377MIzVbskwqvV4tg_3cvfQxPamc5BYF6LFnj9Xv1KUmcPqMBeEEjaJASPQGRaIowBOuYYSrBlQ9s-tn9VHoM5-TDv7S2ZaICgZIucemGR1Xti-QvAyqMGjhvMTsq9KfMcY168gAf9Yizw/s1600/teletalk1.png", link: "http://vas.teletalk.com.bd/clientLivejobs.php" },
  { name: "Job Notice BD", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhET3agC6qyu5CUzuLhyphenhyphent5WaNGrhAhwhAFgvMrL314JsdlpMmD44SDyAAta8LwAxGcXJbQfhlBnQj8AeDzqx-xaUdnbKot4vwS8EcK53mnpwPVmJrBLoJi-ZXDJKjuw3o6OcOoEGMUsUwmG8lnV0prtoDOir6s1wQfED3Z9trHGABQRbQ_XM2XXiigyDB4/s1600/jobsnotice.png", link: "https://jobsnoticebd.com/" },
  { name: "Bikroy Jobs", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhl5CohMYBT8reMf3U5DLJ2JjhORZac0OTTs5NIT1f1J5XgmO73riycS_gHCpfbdaW1UYixJmUAlkfv78YFdHZeZI7HPNOKIJuIfzJ-yxMa0F91Uu8jhQ8beevB9ecuy3pCPFhW3E0L3JKjsamEx0g6iLzOi19TgzCYYHsMgYYAhYpQ_0kTbsWvFMywJYQ/s1600/BikroyJobs.png", link: "https://bikroy.com/bn/jobs" },
  { name: "Bangla Cyber", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiyMJo4yHuQiy2eLiv9tu-0jt11OppH4D0QdyN9cIGlQABU9JZue0KXmYnkt0YeRX_rwuQifdHMjynzSmrM0kz5bIXfaGA_DngMR1GNuFNIDnomhF3xKnjeu97vBVBdDtshXRt6Dd-pH9iASfYtZEao8WNDas-eA03aPgqlkG2kjKCzSEWJXkGSmdNoxyg/s1600/banglacyber.png", link: "https://www.banglacyber.com/" },
  { name: "Job Alert BD", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzsCtmxJENSn1CKo0EGgc-75l7nf9_Z6s33P-MXXj9ZeaL4Cw-D7J3zdbuEkp0AzMmz3v0Cc-vr010-B2yDjrH-e3M2LKrtmWlvZrYv56kadxqw8Aw9uwqzTXy4YpRzaxXxvbm_IotXqXBFQuEYOTzaSdLynffov8fqFcnCo5bBOooQmRNHrfH9NVz02U/s1600/jobss.png", link: "https://jobalertbd.com/" },
  { name: "Shomvob Job", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHvnZ7KGIHMXAmISdX4nIu6pTBkAd8kH5lsnWR1krr2QD1D8GXzJZ6C2de1NE6oYfO2DUxOsqVz8ASjlnDrUMZw0DwzsYUplO3bdTNI8fqgEOqHHtx3lPuFmP23og1ELFXf_ADpglcz264ASJkvt_yjIeLh1zM6DN1eHrjCKF1fT_4JzCutlvNBJB-u30/s1600/shomvob.png", link: "https://app.shomvob.co/govtjobs" },
  { name: "BD Jobs", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSbY0GqXMZnf5OVgW-qAOTlEaTETP4_2xGgFXbxC8YSF9OBNXxNLiH7CsVjJXTNbr93AanP37iPsbAB9yr4U8iWXUJ2mbxTjWenvVrMS4PmIYnpK_BXMvES9DtbYuslun76wcqO7DZBLnjD0-TSQaZyeqlg0CVJ4sMPCyObGJ8uNkDetZLss0-3g4MDro/s1600/bdjobs.png", link: "https://bdjobs.com/" },
  { name: "Biddabari", type: "img", src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgr63jHSwgYouSTygCpeiwIBfbRx0sYFbHfzmikU4BAiqUbwC41RZ9okb5PJZo_x0mgbkcN0AjEtztEdltlEKG9Vtuofe41jk7k8mldMI00up8aV4GNiVbDv-3h1mYxijZpnpsDyx0XOZgDNTIM335w5aCmLfinkNpLa3Dl7kbHuFTkJwfchyphenhyphenCTbUn6yCk/s1600/biddabari.png", link: "https://biddabari.com/job-circular" },

  // আইকন ভিত্তিক সাইটগুলো (তার নিচেই থাকবে)
  { name: "Bangladesh Bank", type: "icon", src: "fa-building-columns", link: "https://erecruitment.bb.org.bd/" },
  { name: "BPSC Portal", type: "icon", src: "fa-landmark-dome", link: "http://bpsc.teletalk.com.bd/" },
  { name: "Primary Teacher", type: "icon", src: "fa-school", link: "http://dpe.teletalk.com.bd/" },
  { name: "Army Recruitment", type: "icon", src: "fa-person-military-to-person", link: "https://joinbangladesharmy.army.mil.bd/" },
  { name: "Navy Recruitment", type: "icon", src: "fa-anchor", link: "https://joinnavy.navy.mil.bd/" },
  { name: "Police Jobs", type: "icon", src: "fa-shield-halved", link: "http://police.teletalk.com.bd/" },
  { name: "NGO Jobs", type: "icon", src: "fa-hand-holding-heart", link: "https://bdgovtjob.net/category/ngo-job-circular/" },
  { name: "Jagojobs", type: "icon", src: "fa-magnifying-glass", link: "https://www.jagojobs.com/" },
  { name: "Kormo Jobs", type: "icon", src: "fa-google", link: "https://kormo.org/" },
  { name: "Alo Jobs", type: "icon", src: "fa-newspaper", link: "https://todayinbd.com/" },
  { name: "NTRCA (Teacher Reg)", type: "icon", src: "fa-chalkboard-user", link: "http://ntrca.teletalk.com.bd/" }
];

function openJobModal() {
    // setActiveMode আপনার ওয়েবসাইটের ফাংশন
    if(typeof setActiveMode === "function") setActiveMode('mode-job-finder');
    document.getElementById('jobFinderModal').style.display = 'flex';
    renderAllJobCards();
}

function closeJobModal() {
    document.getElementById('jobFinderModal').style.display = 'none';
}

function renderAllJobCards() {
    const container = document.getElementById("job-master-grid");
    if(!container) return;
    container.innerHTML = "";

    allJobSites.forEach(site => {
        const card = document.createElement("div");
        card.className = "job-card-item";
        
        let mediaHtml = site.type === "img" 
            ? `<img src="${site.src}" alt="${site.name}">` 
            : `<i class="fa-solid ${site.src}"></i>`;

        card.innerHTML = `
            ${mediaHtml}
            <span>${site.name}</span>
            <div class="btn-visit">Visit Site</div>
        `;
        
        card.onclick = () => window.open(site.link, '_blank');
        container.appendChild(card);
    });
}

// আপনার ওয়েবসাইটের কাস্টম পপআপ দেখানোর ফাংশন
function triggerSitePopup(msg) {
    const popup = document.getElementById('customPopup');
    const msgBox = document.getElementById('popupMessage');
    if (popup && msgBox) {
        msgBox.innerText = msg;
        popup.style.display = 'flex';
    } else {
        alert(msg); // ব্যাকআপ যদি আইডি খুঁজে না পায়
    }
}

function searchJobs() {
    const input = document.getElementById('jf-search-input');
    const query = input.value.trim();
    
    // বর্তমান সাল অটোমেটিক পাওয়ার জন্য (Dynamic Year)
    const currentYear = new Date().getFullYear();

    if (query !== "") {
        // গুগলে বর্তমান সালসহ সার্চ করা হবে
        const fullQuery = query + " job circular Bangladesh " + currentYear;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(fullQuery)}`, '_blank');
    } else {
        // সার্চ বক্সে কিছু না থাকলে আপনার ওয়েবসাইটের কাস্টম অ্যালার্ট
        triggerSitePopup("দয়া করে পদের নাম অথবা প্রতিষ্ঠানের নাম লিখে সার্চ দিন।");
    }
}
