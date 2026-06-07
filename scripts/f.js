// Product array data
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Function to populate product dropdown
function populateProductDropdown() {
    const selectElement = document.getElementById('productName');

    if (selectElement) {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
            selectElement.appendChild(option);
        });
    }
}

// Function to increment and store review count
function incrementReviewCount() {
    let count = localStorage.getItem('reviewCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('reviewCount', count);
    return count;
}

// Function to update footer with current year, date, and time
function updateFooter() {
    const now = new Date();

    // Update current year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = now.getFullYear();
    }

    // Format date as MM/DD/YYYY
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();

    // Format time as HH:MM:SS (24-hour format)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;

    // Update last modification date/time
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = formattedDateTime;
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Always update footer with current date/time
    updateFooter();

    // Check if we're on the review confirmation page
    if (window.location.pathname.includes('review.html')) {
        // Increment counter when review page loads
        const newCount = incrementReviewCount();
        // Update display if element exists
        const countElement = document.getElementById('reviewCount');
        if (countElement) {
            countElement.textContent = newCount;
        }
    } else {
        // Populate product dropdown on form page
        populateProductDropdown();
    }
});

// Form validation enhancement
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reviewForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            const rating = document.querySelector('input[name="rating"]:checked');
            const product = document.getElementById('productName');
            const installDate = document.getElementById('installDate');

            if (!rating || !product.value || !installDate.value) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return false;
            }
        });
    }
});