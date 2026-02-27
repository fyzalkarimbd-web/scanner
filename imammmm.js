// Show popup after 20 seconds
    setTimeout(function() {
        var popup = document.getElementById("imam-form-popup");
        if(popup) {
            popup.classList.add("show-popup");
        }
    }, 30000);

    // Close popup function
    function closeImamPopup() {
        var popup = document.getElementById("imam-form-popup");
        if(popup) {
            popup.classList.remove("show-popup");
            setTimeout(function() {
                popup.style.display = "none";
            }, 600);
        }
    }

    // Direct Download Function with NEW LINK
    function downloadImamPdf() {
        // Updated with the new Google Drive ID
        var fileUrl = "https://drive.google.com/uc?export=download&id=1GLntRLikOoBcrS1vrQPuk3HMocGmL9j6";
        
        var a = document.createElement('a');
        a.href = fileUrl;
        a.setAttribute('download', '');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // UI Change on click
        var btn = document.querySelector('.imam-popup-btn');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ডাউনলোডিং...';
        btn.style.background = "#fbbf24";
        btn.style.color = "#000";
        
        setTimeout(function(){
            closeImamPopup();
        }, 3000);
    }
