document.addEventListener('DOMContentLoaded', () => {
    updateFooter();
    setupHamburger();
    setupFilters();
    displayTemples(temples);
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19184,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-south-africa-temple-lds-83166-wallpaper.jpg"
    },
    {
        templeName: "Pocatello Idaho",
        location: "Pocatello, Idaho, United States",
        dedicated: "2021, November, 7",
        area: 71125,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/pocatello-idaho/400x250/pocatello-idaho-temple-exterior.jpg"
    },
    {
        templeName: "Denver Colorado",
        location: "Centennial, Colorado, United States",
        dedicated: "1986, October, 24",
        area: 29117,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/denver-colorado/400x250/denver-colorado-temple-lds-809939-wallpaper.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Temple-2160936.jpg"
    },
    {
        templeName: "Logan Utah",
        location: "Logan, Utah, United States",
        dedicated: "1884, May, 17",
        area: 119619,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/logan-utah/400x250/logan-temple-768119-wallpaper.jpg"
    }
];

function displayTemples(filteredList) {
    const gridContainer = document.getElementById('temple-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    if (filteredList.length === 0) {
        gridContainer.innerHTML = `<p class="no-results">No temples found matching this filter.</p>`;
        return;
    }

    filteredList.forEach(temple => {
        const card = document.createElement('figure');
        card.classList.add('temple-card');

        card.innerHTML = `
            <figcaption class="card-details">
                <h2>${temple.templeName}</h2>
                <p><span class="label">Location:</span> ${temple.location}</p>
                <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
                <p><span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft</p>
            </figcaption>
            <div class="image-wrapper">
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
            </div>
        `;
        gridContainer.appendChild(card);
    });
}

function setupFilters() {
    const filters = {
        'filter-home': { title: 'Home', logic: () => temples },
        'filter-old': { title: 'Old Temples', logic: () => temples.filter(t => parseInt(t.dedicated.split(',')[0]) < 1900) },
        'filter-new': { title: 'New Temples', logic: () => temples.filter(t => parseInt(t.dedicated.split(',')[0]) > 2000) },
        'filter-large': { title: 'Large Temples', logic: () => temples.filter(t => t.area > 90000) },
        'filter-small': { title: 'Small Temples', logic: () => temples.filter(t => t.area < 10000) }
    };

    const galleryTitle = document.getElementById('gallery-title');
    const navLinks = document.querySelectorAll('#nav-menu a');

    Object.keys(filters).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(link => link.classList.remove('active'));
                btn.classList.add('active');
                if (galleryTitle) galleryTitle.textContent = filters[id].title;
                displayTemples(filters[id].logic());
            });
        }
    });
}

function updateFooter() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const modifiedSpan = document.getElementById('last-modified');
    if (modifiedSpan) {
        const lastModDate = new Date(document.lastModified);
        modifiedSpan.textContent = lastModDate.toLocaleDateString() + ' ' + lastModDate.toLocaleTimeString();
    }
}

function setupHamburger() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const iconSpan = hamburgerBtn?.querySelector('.icon');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            if (iconSpan) iconSpan.innerHTML = isOpen ? '&times;' : '&#9776;';
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                if (iconSpan) iconSpan.innerHTML = '&#9776;';
            });
        });
    }
}