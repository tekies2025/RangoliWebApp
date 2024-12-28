// Function to fetch JSON and populate gallery


const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

async function populateGalleryWithCache() {
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = "";

    try {
        // Check if data exists in localStorage and if it's still valid
        let rangoliDesigns = localStorage.getItem("rangoliDesigns");
        const lastFetched = localStorage.getItem("lastFetched");

        const now = new Date().getTime();

        if (rangoliDesigns && lastFetched && now - lastFetched < CACHE_EXPIRY_TIME) {
            rangoliDesigns = JSON.parse(rangoliDesigns);
            console.log("Loaded from localStorage:", rangoliDesigns);
        } else {
            const response = await fetch('./jsonDataFiles/gallaryData.json');

            if (!response.ok) {
                throw new Error('Failed to fetch JSON file');
            }

            rangoliDesigns = await response.json();

            localStorage.setItem("rangoliDesigns", JSON.stringify(rangoliDesigns));
            localStorage.setItem("lastFetched", now);
            console.log("Fetched and cached in localStorage:", rangoliDesigns);
        }

        rangoliDesigns.forEach((design) => {
            const card = document.createElement("div");
            card.classList.add("design-card");

            card.innerHTML = `
                <img src="${design.imageUrl}" alt="${design.title}">
                <h3>${design.title}</h3>
                <p>Price: ${design.price}</p>
            `;

            galleryContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error populating gallery:", error);
    }
}


// Call the function on page load
window.onload = populateGalleryWithCache;


