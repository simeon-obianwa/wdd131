/**
 * Madagascar Place Page - JavaScript Module
 * Handles wind chill calculation and dynamic footer updates
 */

(() => {
    'use strict';

    // Static weather data for Madagascar (metric units)
    const WEATHER = Object.freeze({
        temperature: 10,    // °C
        windSpeed: 5        // km/h
    });

    // DOM element cache
    const DOM = {
        windChill: null,
        currentYear: null,
        lastModified: null
    };

    /**
     * Calculate wind chill factor using metric formula
     * Formula: 13.12 + 0.6215T - 11.37V^0.16 + 0.3965TV^0.16
     * @param {number} temp - Temperature in Celsius
     * @param {number} speed - Wind speed in km/h
     * @returns {string} Wind chill value rounded to 1 decimal
     */
    const calculateWindChill = (temp, speed) =>
        (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);

    /**
     * Determine if wind chill calculation is viable per metric standards
     * @param {number} temp - Temperature in Celsius
     * @param {number} speed - Wind speed in km/h
     * @returns {boolean} True if calculation conditions are met
     */
    const isWindChillViable = (temp, speed) => temp <= 10 && speed > 4.8;

    /**
     * Render wind chill value to the DOM
     */
    const renderWindChill = () => {
        const { temperature, windSpeed } = WEATHER;
        const result = isWindChillViable(temperature, windSpeed)
            ? `${calculateWindChill(temperature, windSpeed)} °C`
            : 'N/A';

        DOM.windChill.textContent = result;
    };

    /**
     * Update footer with dynamic date information
     */
    const renderFooterDates = () => {
        // Current year
        DOM.currentYear.textContent = new Date().getFullYear();

        // Last modified timestamp
        const lastMod = new Date(document.lastModified);
        DOM.lastModified.textContent = lastMod.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    /**
     * Cache DOM elements for performance
     */
    const cacheDOM = () => {
        DOM.windChill = document.getElementById('wind-chill');
        DOM.currentYear = document.getElementById('current-year');
        DOM.lastModified = document.getElementById('last-modified');
    };

    /**
     * Initialize application
     */
    const init = () => {
        cacheDOM();

        // Only proceed if required elements exist
        if (!DOM.windChill || !DOM.currentYear || !DOM.lastModified) {
            console.warn('Required DOM elements not found');
            return;
        }

        renderFooterDates();
        renderWindChill();
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);

})();