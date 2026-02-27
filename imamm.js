// 1. Show popup after 20 seconds (20000 ms)
    setTimeout(function() {
        var popup = document.getElementById("imam-form-popup");
        if(popup) {
            popup.classList.add("show-popup");
        }
    }, 30000);

    // 2. Close popup function
    function closeImamPopup() {
        var popup = document.getElementById("imam-form-popup");
        if(popup) {
            popup.classList.remove("show-popup");
            setTimeout(function() {
                popup.style.display = "none";
            }, 600);
        }
    }

    // 3. Direct Download Function (Link hidden in JS)
    function downloadImamPdf() {
        // Direct download converted Google Drive link
        var fileUrl = "https://drive.google.com/uc?export=download&id=1IyGrX1GToZQBiU7UBqBbJesZWb5Pwhah";
        
        // Create an invisible download link and click it programmatically
        var a = document.createElement('a');
        a.href = fileUrl;
        a.setAttribute('download', '');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Optional: Change button text to show it's downloading
        var btn = document.querySelector('.imam-popup-btn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ডাউনলোডিং...';
        btn.style.background = "#fbbf24";
        btn.style.color = "#000";
        
        // Close popup after 3 seconds of clicking download
        setTimeout(function(){
            closeImamPopup();
        }, 3000);
    }
