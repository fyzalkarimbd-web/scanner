function filterTools() {
    const input = document.getElementById('toolSearchInput');
    const filter = input.value.toLowerCase().trim();
    const clearBtn = document.getElementById('clearSearch');
    const msg = document.getElementById('searchMessage');
    
    // আপনার সাইটের সব বাটন ধরবে, সেগুলো যেখানেই থাকুক না কেন
    const allTools = document.querySelectorAll('.mode-card-btn');
    const allSeparators = document.querySelectorAll('.mode-separator');
    
    let foundCount = 0;

    // ক্লিয়ার বাটন দেখানো বা লুকানো
    if (filter.length > 0) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }

    allTools.forEach(tool => {
        // বাটনের ভেতরের টেক্সট এবং আইডি চেক করা
        const toolText = tool.innerText.toLowerCase();
        const toolId = tool.id.toLowerCase();

        if (toolText.includes(filter) || toolId.includes(filter)) {
            // যদি সার্চের সাথে মিলে যায়
            tool.style.setProperty('display', 'flex', 'important');
            foundCount++;
        } else {
            // যদি না মিলে, তবে একদম হাইড করে দেবে
            tool.style.setProperty('display', 'none', 'important');
        }
    });

    // সেপারেটর বা টাইটেল বারগুলো (Toll section 1, cloud section...) সার্চের সময় হাইড করবে
    allSeparators.forEach(sep => {
        if (filter.length > 0) {
            sep.style.setProperty('display', 'none', 'important');
        } else {
            sep.style.setProperty('display', 'flex', 'important');
        }
    });

    // রেজাল্ট না পাওয়া গেলে মেসেজ দেখানো
    if (filter.length > 0 && foundCount === 0) {
        msg.style.setProperty('display', 'block', 'important');
    } else {
        msg.style.setProperty('display', 'none', 'important');
    }
}

function resetSearch() {
    const input = document.getElementById('toolSearchInput');
    input.value = "";
    filterTools(); // সব টুল আবার দেখাবে
    input.focus();
}
