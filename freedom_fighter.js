document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("#pics img");
    const favorites = document.getElementById("favorites");
    const actionsLog = document.getElementById("actions");
    const totalImages = images.length;
    let favorite = 0;

    const imagesContainer = document.getElementById("pics");
    imagesContainer.style.display = "flex";
    imagesContainer.style.flexWrap = "nowrap";
    imagesContainer.style.gap = "10px";

    
    // resizing the images
    images.forEach(img => {
        img.style.width = "250px";
        img.style.height = "400px"; 
        img.style.objectFit = "cover"; 
        img.style.cursor = "pointer";
        img.style.transition = "border 0.3s ease-in"; 
        img.addEventListener("click", function () {
            if (!img.classList.contains("selected")) {
                favorite++;
                img.classList.add("selected");
                img.style.border = "3px solid green"; 
                
                const favImage = img.cloneNode(true); 
                favImage.addEventListener("click", function () {
                    revertImage(img, favImage);
                });
                favorites.appendChild(favImage);
                
                logAction(`Moved ${img.src} to favorites`);
                updateCounter();
                
                if (favorite === totalImages) {
                    alert("All images have been selected!");
                } else {
                    alert(`Image ${favorite} selected as favorite number ${favorite}`);
                }
            }
        });
        
        img.addEventListener("mouseover", function () {
            img.title = img.alt; 
        });
    });
    
    function revertImage(originalImg, favImg) {
        favImg.remove(); 
        originalImg.classList.remove("selected");
        originalImg.style.border = "none";
        
        favoriteCount--;
        logAction(`Reverted ${originalImg.src} back to the main list`);
        updateCounter();
    }
    
    function logAction(message) {
        const li = document.createElement("li");
        li.textContent = message;
        actionsLog.appendChild(li);
    }
    
    function updateCounter() {
        document.getElementById("counter").textContent = `Remaining images: ${totalImages - favoriteCount}`;
    }
    
    const counterDisplay = document.createElement("p");
    counterDisplay.id = "counter";
    counterDisplay.textContent = `Remaining images: ${totalImages}`;
    document.body.insertBefore(counterDisplay, document.getElementById("pics"));
});
