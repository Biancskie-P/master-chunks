function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.classList.remove("active");
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add("active");
    }

    // Update Nav Links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    const activeLink = document.querySelector(`.nav-link[onclick*="'${sectionId}'"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }
}

// =====================
// ENHANCED SEARCH
// =====================
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === "") return; // Don't search if empty

    const productCards = document.querySelectorAll(".product-card");
    let foundInProducts = false;

    // 1. First, check if the query matches a product name
    productCards.forEach(card => {
        const productName = card.querySelector("h3").textContent.toLowerCase();
        if (productName.includes(query)) {
            card.style.display = "block"; // Show match
            card.style.border = "2px solid #ba957b"; // Highlight result
            foundInProducts = true;
        } else {
            card.style.display = "none"; // Hide non-matches
        }
    });

    if (foundInProducts) {
        showSection('products'); // Automatically jump to products page
    } else {
        // 2. Fallback: Search general sections if no product matches
        const sections = ["about", "contact", "help"];
        let sectionFound = false;

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section.textContent.toLowerCase().includes(query)) {
                showSection(id);
                sectionFound = true;
            }
        });

        if (!sectionFound) {
            alert("Treat not found! Try searching for 'Cookies' or 'Brownies'.");
            // Reset product visibility if nothing found
            productCards.forEach(card => card.style.display = "block");
        }
    }
});

// Search on Enter key
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") searchBtn.click();
});

// =====================
// FORM SUBMISSION
// =====================
function submitForm(event) {
    event.preventDefault();
    const messageBox = document.getElementById("message");
    messageBox.textContent = "Thank you for messaging us! We will get back to you soon.";
    messageBox.style.cssText = "color: #4a3321; margin-top: 20px; font-weight: bold; text-align: center;";
    event.target.reset();
}