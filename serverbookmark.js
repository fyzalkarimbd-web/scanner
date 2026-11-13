// ১. লোকাল স্টোরেজ থেকে ফেভারিট আইডি লিস্ট পড়া
  function getFavServerKeys() {
    try {
      return JSON.parse(localStorage.getItem("idsp_fav_keys_v3") || "[]");
    } catch(e) {
      return [];
    }
  }

  // ২. লোকাল স্টোরেজে ফেভারিট আইডি সেভ করা
  function saveFavServerKeys(arr) {
    localStorage.setItem("idsp_fav_keys_v3", JSON.stringify(arr));
  }

  // ৩. কার্ড থেকে ডায়নামিক স্থায়ী ইউনিক কী (Key) বের করা
  function getCardUniqueKey(card) {
    var nameEl = card.querySelector(".server-name");
    if (!nameEl) return "";
    
    var text = "";
    for (var i = 0; i < nameEl.childNodes.length; i++) {
      var node = nameEl.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      }
    }
    return text.trim().replace(/\s+/g, "_");
  }

  // ৪. ফেভারিট টগল করার ফাংশন (ওয়ান-ক্লিক ইনস্ট্যান্ট একশন)
  function toggleFavServer(key) {
    if (!key) return;
    var favs = getFavServerKeys();
    var index = favs.indexOf(key);
    if (index === -1) {
      favs.push(key);
    } else {
      favs.splice(index, 1);
    }
    saveFavServerKeys(favs);
    initFavSystem(); // ড্যাশবোর্ড রি-রেন্ডার
  }

  // ৫. সচল সার্ভার কার্ডগুলোতে ডায়নামিক স্টার আইকন ইনজেক্ট ও রেন্ডার ফাংশন
  function initFavSystem() {
    var favs = getFavServerKeys();
    var activeGrid = document.getElementById("mainActiveServerGrid");
    if (!activeGrid) return;

    var activeCards = activeGrid.querySelectorAll(".server-card");
    
    activeCards.forEach(function(card) {
      var key = getCardUniqueKey(card);
      if (!key) return;

      card.setAttribute("data-srv-key", key);

      var nameEl = card.querySelector(".server-name");
      if (nameEl) {
        var existingStar = nameEl.querySelector(".fav-star-btn");
        if (existingStar) {
          existingStar.remove(); // ফ্রেশ স্টেট তৈরি
        }

        var isFav = favs.indexOf(key) !== -1;
        var star = document.createElement("i");
        star.className = isFav ? "fa-solid fa-star fav-star-btn is-fav" : "fa-regular fa-star fav-star-btn";
        star.title = "পছন্দের তালিকায় রাখুন/বাদ দিন";
        
        // ১ ক্লিকেই এক্সেকিউট হওয়ার ইভেন্ট হ্যান্ডলার
        star.onclick = function(e) {
          e.stopPropagation();
          e.preventDefault();
          toggleFavServer(key);
          return false;
        };

        nameEl.appendChild(star);
      }
    });

    renderFavGrid();
  }

  // ৬. ওপরের পছন্দের (ফেভারিট) সেকশনে কার্ড রেন্ডার করা (ডিফল্টভাবে হিডেন রুলস ফিক্স)
  function renderFavGrid() {
    var favs = getFavServerKeys();
    var container = document.getElementById("favServerGrid");
    var sectionWrap = document.getElementById("favSectionWrapper");

    if (!container || !sectionWrap) return;
    container.innerHTML = "";

    // কোনো ফেভারিট সার্ভার সেভ না থাকলে সম্পূর্ণ সেকশন হিডেন থাকবে
    if (favs.length === 0) {
      sectionWrap.style.display = "none";
      return;
    }

    // কমপক্ষে ১টি ফেভারিট সার্ভার থাকলে সেকশনটি দৃশ্যমান হবে
    sectionWrap.style.display = "block";

    // ফেভারিট কার্ডগুলোকে ক্লোন করে ওপরের তালিকায় যুক্ত করা
    favs.forEach(function(key) {
      var origCard = document.querySelector('#mainActiveServerGrid .server-card[data-srv-key="' + key + '"]');
      if (origCard) {
        var clone = origCard.cloneNode(true);
        
        // ক্লোন করা কার্ডের স্টারেও ইনস্ট্যান্ট ১ ক্লিক একশন রাখা
        var cloneStar = clone.querySelector(".fav-star-btn");
        if (cloneStar) {
          cloneStar.onclick = function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggleFavServer(key);
            return false;
          };
        }
        container.appendChild(clone);
      }
    });
  }

  // পেজ লোড হওয়ার সাথে সাথে ফেভারিট সিস্টেম রান হবে
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFavSystem);
  } else {
    initFavSystem();
  }
