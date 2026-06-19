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

document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("product-name");

    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            productSelect.appendChild(option);
        });
    }

    updateFooterDateTime();
});

function updateFooterDateTime() {
    const now = new Date();

    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = now.getFullYear();
    }

    const dateTimeEl = document.getElementById("current-datetime");
    if (dateTimeEl) {
        const pad = (num) => String(num).padStart(2, '0');

        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const year = now.getFullYear();

        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());

        dateTimeEl.textContent = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    }
}