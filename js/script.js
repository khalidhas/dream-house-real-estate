// Apply theme immediately to prevent FOUC
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

// 1. Array of Objects containing property information
const properties = [
    {
        id: 1,
        title: "Luxury Beverly Villa",
        type: "House",
        location: "Westlands, Nairobi",
        price: 2500000,
        image: "images/hero.png",
        description: "A stunning modern luxury villa with a massive infinity pool, 6 bedrooms, smart home technology, and an expansive garden. Perfect for premium living.",
        beds: 6,
        baths: 7,
        size: "8,500 sqft",
        amenities: ["Infinity Pool", "Smart Home", "Home Theater", "Gym", "4-Car Garage"],
        featured: true
    },
    {
        id: 2,
        title: "Modern Family Home",
        type: "House",
        location: "Kilimani, Nairobi",
        price: 450000,
        image: "images/house1.png",
        description: "A beautiful two-story family home featuring a large manicured lawn, modern kitchen appliances, and spacious living areas in a quiet suburban neighborhood.",
        beds: 4,
        baths: 3,
        size: "3,200 sqft",
        amenities: ["Large Backyard", "Modern Kitchen", "Hardwood Floors", "Fireplace"],
        featured: true
    },
    {
        id: 3,
        title: "Downtown Glass Penthouse",
        type: "Apartment",
        location: "Karen, Nairobi",
        price: 1200000,
        image: "images/apartment1.png",
        description: "High-rise luxury penthouse offering panoramic city views, floor-to-ceiling windows, and access to exclusive building amenities including a rooftop pool.",
        beds: 3,
        baths: 3,
        size: "2,400 sqft",
        amenities: ["City Views", "Rooftop Pool", "Concierge", "Fitness Center"],
        featured: true
    },
    {
        id: 4,
        title: "Sunny Side Apartment",
        type: "Apartment",
        location: "Lavington, Nairobi",
        price: 350000,
        image: "images/apartment1.png",
        description: "Cozy and bright modern apartment located just minutes from the beach. Perfect for young professionals or as a vacation rental property.",
        beds: 2,
        baths: 2,
        size: "1,100 sqft",
        amenities: ["Balcony", "Beach Access", "Shared Pool", "Covered Parking"],
        featured: false
    },
    {
        id: 5,
        title: "Lakeside Residential Plot",
        type: "Land",
        location: "Runda, Nairobi",
        price: 600000,
        image: "images/land1.png",
        description: "A pristine 2-acre plot of residential land overlooking a serene lake. Fully permitted and ready for you to build your dream home.",
        beds: 0,
        baths: 0,
        size: "2 Acres",
        amenities: ["Lake View", "Utilities Ready", "Paved Road Access", "Wooded Area"],
        featured: true
    },
    {
        id: 6,
        title: "Suburban Empty Lot",
        type: "Land",
        location: "Muthaiga, Nairobi",
        price: 150000,
        image: "images/land1.png",
        description: "Affordable standard residential plot situated in a rapidly growing community. Excellent investment opportunity for future development.",
        beds: 0,
        baths: 0,
        size: "0.5 Acres",
        amenities: ["Flat Terrain", "Corner Lot", "Close to Schools"],
        featured: false
    }
];

// Formatting utility for currency
const formatPrice = (price) => {
    return `Ksh ${price.toLocaleString('en-US')}`;
};

// 2. Generate Property Card HTML (Loops & If/Else included)
const createPropertyCard = (property) => {
    // If Else Property Classification for price badges
    let badgeHtml = '';
    if (property.price >= 500000) {
        badgeHtml = `<span class="property-badge badge-premium"><i class="fa-solid fa-star"></i> Premium Property</span>`;
    } else {
        badgeHtml = `<span class="property-badge badge-standard"><i class="fa-solid fa-check"></i> Standard Property</span>`;
    }

    return `
        <div class="property-card">
            <div class="property-img-wrapper">
                ${badgeHtml}
                <img src="${property.image}" alt="${property.title}" class="property-img">
            </div>
            <div class="property-content">
                <div class="property-price">${formatPrice(property.price)}</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location"><i class="fa-solid fa-location-dot"></i> ${property.location}</p>
                <p class="property-desc">${property.description.substring(0, 100)}...</p>
                <div class="card-btn">
                    <button class="btn btn-primary" style="width: 100%" onclick="viewDetails(${property.id})">View Details</button>
                </div>
            </div>
        </div>
    `;
};

// 3. View Details Button Logic
window.viewDetails = (id) => {
    // Save property ID to local storage
    localStorage.setItem('selectedPropertyId', id);
    // Redirect to details page
    window.location.href = 'property-details.html';
};

// ==========================================
// DOM MANIPULATION & PAGE SPECIFIC LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const floatToggle = document.getElementById('floating-theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    const updateIcons = (theme) => {
        const iconHtml = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        if (themeToggle) themeToggle.innerHTML = iconHtml;
        if (floatToggle) floatToggle.innerHTML = iconHtml;
    };
    
    updateIcons(currentTheme);
    
    const toggleTheme = () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcons(newTheme);
    };

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (floatToggle) floatToggle.addEventListener('click', toggleTheme);



    // --- Responsive Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Home Page: Render Featured Properties ---
    const featuredGrid = document.getElementById('featured-properties');
    if (featuredGrid) {
        const featuredProps = properties.filter(p => p.featured).slice(0, 3);
        // Using forEach loop
        featuredProps.forEach(property => {
            featuredGrid.innerHTML += createPropertyCard(property);
        });
    }

    // --- Properties Page: Render by Category ---
    const housesGrid = document.getElementById('houses-grid');
    const apartmentsGrid = document.getElementById('apartments-grid');
    const landGrid = document.getElementById('land-grid');

    if (housesGrid && apartmentsGrid && landGrid) {
        // Using for...of loop
        for (const property of properties) {
            const cardHTML = createPropertyCard(property);
            if (property.type === "House") {
                housesGrid.innerHTML += cardHTML;
            } else if (property.type === "Apartment") {
                apartmentsGrid.innerHTML += cardHTML;
            } else if (property.type === "Land") {
                landGrid.innerHTML += cardHTML;
            }
        }
    }

    // --- Property Details Page: Dynamic Data Injection ---
    const detailTitle = document.getElementById('detail-title');
    if (detailTitle) {
        const propId = localStorage.getItem('selectedPropertyId');
        if (!propId) {
            window.location.href = 'properties.html';
            return;
        }

        // Find property object
        const selectedProp = properties.find(p => p.id == propId);
        if (selectedProp) {
            // Dynamic Updates without manual HTML rewriting
            document.getElementById('detail-img').src = selectedProp.image;
            document.getElementById('detail-img').alt = selectedProp.title;
            detailTitle.innerText = selectedProp.title;
            document.getElementById('detail-location').innerText = selectedProp.location;
            document.getElementById('detail-price').innerText = formatPrice(selectedProp.price);


            document.getElementById('detail-desc').innerText = selectedProp.description;
            document.getElementById('detail-type').innerText = selectedProp.type;
            document.getElementById('detail-size').innerText = selectedProp.size;
            document.getElementById('detail-beds').innerText = selectedProp.beds > 0 ? selectedProp.beds : "N/A";
            document.getElementById('detail-baths').innerText = selectedProp.baths > 0 ? selectedProp.baths : "N/A";

            // Inject Classification Badge
            const badgeEl = document.getElementById('detail-badge');
            if (selectedProp.price >= 500000) {
                badgeEl.className = 'property-badge badge-premium';
                badgeEl.innerHTML = `<i class="fa-solid fa-star"></i> Premium Property`;
            } else {
                badgeEl.className = 'property-badge badge-standard';
                badgeEl.innerHTML = `<i class="fa-solid fa-check"></i> Standard Property`;
            }

            // Inject Amenities using map() loop
            const amenitiesList = document.getElementById('detail-amenities');
            amenitiesList.innerHTML = selectedProp.amenities.map(item => `<li><i class="fa-solid fa-circle-check" style="color: var(--accent-color)"></i> ${item}</li>`).join('');
        }
    }

    // --- Contact Page: Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (fullName === "" || email === "" || phone === "") {
                alert("Please fill in all required fields.");
                return;
            }

            // Show success message
            const msgBox = document.getElementById('form-message');
            msgBox.innerHTML = `<strong>Success!</strong> Thank you, ${fullName}. Your inquiry has been sent to our agents. We will contact you shortly.`;
            msgBox.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                msgBox.style.display = 'none';
            }, 5000);
        });
    }

});
