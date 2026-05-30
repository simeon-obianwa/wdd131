document.addEventListener("DOMContentLoaded", () => {
    const temp = 10; // Celsius
    const windSpeed = 5; // km/h

    const calculateWindChill = (t, w) =>
        13.12 + 0.6215 * t - 11.37 * Math.pow(w, 0.16) + 0.3965 * t * Math.pow(w, 0.16);

    const windChillElement = document.getElementById("wind-chill");

    if (temp <= 10 && windSpeed > 4.8) {
        const result = calculateWindChill(temp, windSpeed);
        windChillElement.textContent = `${result.toFixed(1)} °C`;
    } else {
        windChillElement.textContent = "N/A";
    }

    const yearElement = document.getElementById("year");
    const modElement = document.getElementById("last-modified");

    const now = new Date();
    yearElement.textContent = now.getFullYear();

    const lastModDate = new Date(document.lastModified);
    modElement.textContent = `Last Modification: ${lastModDate.toLocaleDateString()} ${lastModDate.toLocaleTimeString()}`;
});