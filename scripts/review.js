document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);

    let reviewCounter = localStorage.getItem("reviewsCompletedCount");
    if (reviewCounter === null) {
        reviewCounter = 0;
    } else {
        reviewCounter = parseInt(reviewCounter, 10);
    }

    if (urlParams.has("productName") || urlParams.has("overallRating")) {
        reviewCounter += 1;
        localStorage.setItem("reviewsCompletedCount", reviewCounter);
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    const counterBadge = document.getElementById("review-counter");
    if (counterBadge) {
        counterBadge.textContent = reviewCounter;
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