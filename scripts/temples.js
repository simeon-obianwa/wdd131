/**
 * Temple Album - JavaScript Functionality
 * Handles dynamic content and interactive features
 */

document.addEventListener('DOMContentLoaded', function () {
    updateFooterDates();
    initializeHamburgerMenu();
    initializeSmoothScroll();
});

/**
 * Update footer with current year and last modified date
 */
function updateFooterDates() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }

    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        const formattedDate = formatDate(lastModified);
        lastModifiedElement.textContent = formattedDate;
    }
}

/**
 * Format date string to readable format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    return date.toLocaleString('en-US', options);
}

/**
 * Initialize hamburger menu functionality
 */
function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            toggleHamburgerMenu(hamburger, navMenu, hamburgerIcon);
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                closeHamburgerMenu(hamburger, navMenu, hamburgerIcon);
            });
        });

        document.addEventListener('click', function (event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                closeHamburgerMenu(hamburger, navMenu, hamburgerIcon);
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeHamburgerMenu(hamburger, navMenu, hamburgerIcon);
            }
        });
    }
}

/**
 * Toggle hamburger menu open/closed
 * @param {HTMLElement} hamburger - The hamburger button element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} hamburgerIcon - The hamburger icon element
 */
function toggleHamburgerMenu(hamburger, navMenu, hamburgerIcon) {
    const isOpen = navMenu.classList.contains('active');

    if (isOpen) {
        closeHamburgerMenu(hamburger, navMenu, hamburgerIcon);
    } else {
        openHamburgerMenu(hamburger, navMenu, hamburgerIcon);
    }
}

/**
 * Open hamburger menu
 * @param {HTMLElement} hamburger - The hamburger button element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} hamburgerIcon - The hamburger icon element
 */
function openHamburgerMenu(hamburger, navMenu, hamburgerIcon) {
    navMenu.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburgerIcon.innerHTML = '&times;'; // X symbol to close
}

/**
 * Close hamburger menu
 * @param {HTMLElement} hamburger - The hamburger button element
 * @param {HTMLElement} navMenu - The navigation menu element
 * @param {HTMLElement} hamburgerIcon - The hamburger icon element
 */
function closeHamburgerMenu(hamburger, navMenu, hamburgerIcon) {
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburgerIcon.innerHTML = '&#9776;'; // Hamburger symbol
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                event.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Utility function to debounce resize events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleResize() {
    if (window.innerWidth >= 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const hamburgerIcon = document.querySelector('.hamburger-icon');

        if (hamburger && navMenu) {
            closeHamburgerMenu(hamburger, navMenu, hamburgerIcon);
        }
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

console.log('Temple Album initialized successfully!');