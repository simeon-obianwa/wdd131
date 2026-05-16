
document.addEventListener('DOMContentLoaded', () => {
    updateFooter();

    setupHamburger();
});

function updateFooter() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const modifiedSpan = document.getElementById('last-modified');
    if (modifiedSpan) {
        const lastModDate = new Date(document.lastModified);
        const formattedDate = lastModDate.toLocaleDateString() + ' ' + lastModDate.toLocaleTimeString();
        modifiedSpan.textContent = formattedDate;
    }
}

function setupHamburger() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const iconSpan = hamburgerBtn?.querySelector('.icon');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');

            if (iconSpan) {
                if (navMenu.classList.contains('open')) {
                    iconSpan.innerHTML = '&times;';
                } else {
                    iconSpan.innerHTML = '&#9776;';
                }
            }
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                if (iconSpan) {
                    iconSpan.innerHTML = '&#9776;';
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (!hamburgerBtn.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('open');
                if (iconSpan) {
                    iconSpan.innerHTML = '&#9776;';
                }
            }
        });
    }
}