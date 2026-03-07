document.addEventListener('DOMContentLoaded', function() {
    const favContainer = document.getElementById('fav-container');
    const favSection = document.getElementById('fav-tools-section');
    const favSep = document.getElementById('fav-sep');

    // ১. টুল বাটনগুলোতে স্টারের আইকন যোগ করা (যদি বাটন থাকে)
    document.querySelectorAll('.mode-card-btn').forEach(btn => {
        const toolId = btn.id;
        if (!toolId) return;
        
        // ডুপ্লিকেট স্টার প্রতিরোধ করতে চেক
        if (btn.querySelector('.fav-star-btn')) return;

        const star = document.createElement('i');
        star.className = 'fa-solid fa-star fav-star-btn';
        star.setAttribute('title', 'Add to Favorites');
        star.onclick = function(e) {
            e.stopPropagation();
            toggleFavorite(toolId);
        };
        btn.style.position = 'relative';
        btn.appendChild(star);
    });

    // ২. ফেভারিট লিস্ট রেন্ডার করার ফাংশন
    function renderFavorites() {
        // ফিক্স: যদি favContainer না থাকে (যেমন ব্লগ পেজে), তবে এখানেই থেমে যাও
        if (!favContainer) return;

        const favs = JSON.parse(localStorage.getItem('site_favs')) || [];
        favContainer.innerHTML = '';
        
        document.querySelectorAll('.fav-star-btn').forEach(s => s.classList.remove('is-fav'));

        if (favs.length > 0) {
            if (favSection) favSection.style.display = 'block';
            if (favSep) favSep.style.display = 'block';
            
            favs.forEach(id => {
                const originalBtn = document.getElementById(id);
                if (originalBtn) {
                    const starInOriginal = originalBtn.querySelector('.fav-star-btn');
                    if (starInOriginal) starInOriginal.classList.add('is-fav');
                    
                    const clone = originalBtn.cloneNode(true);
                    clone.classList.remove('active');
                    clone.onclick = originalBtn.onclick;
                    
                    const cloneStar = clone.querySelector('.fav-star-btn');
                    if (cloneStar) {
                        cloneStar.onclick = (e) => {
                            e.stopPropagation();
                            toggleFavorite(id);
                        };
                    }
                    favContainer.appendChild(clone);
                }
            });
        } else {
            if (favSection) favSection.style.display = 'none';
            if (favSep) favSep.style.display = 'none';
        }
    }

    // ৩. ফেভারিট টগল করার ফাংশন
    window.toggleFavorite = function(id) {
        let favs = JSON.parse(localStorage.getItem('site_favs')) || [];
        if (favs.includes(id)) {
            favs = favs.filter(item => item !== id);
        } else {
            favs.push(id);
        }
        localStorage.setItem('site_favs', JSON.stringify(favs));
        renderFavorites();
    };

    // প্রথমবার লোড হওয়ার সময় রান করা
    renderFavorites();
});
