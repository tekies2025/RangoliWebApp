const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

async function populateSampleDesignDataWithCache() {
    const galleryContainer = document.getElementById("sampleDesign");
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
            const response = await fetch('./jsonDataFiles/sampleDesignData.json');

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
                <button onclick="window.location.href='gallaryPage.html'">View More</button>
            `;

            galleryContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error populating gallery:", error);
    }
}


// Call the function on page load
window.onload = populateSampleDesignDataWithCache;


function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}