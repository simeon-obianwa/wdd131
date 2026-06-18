document.addEventListener("DOMContentLoaded", () => {
    runClockTracker();
    processLocalReviews();
});

function runClockTracker() {
    const timestampContainer = document.getElementById("footer-time-display");
    if (!timestampContainer) return;

    const computeTimeMetrics = () => {
        const standardDate = new Date();
        const configurationOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const readableDateStr = standardDate.toLocaleDateString(undefined, configurationOptions);
        const readableTimeStr = standardDate.toLocaleTimeString(undefined, { hour12: true });

        timestampContainer.textContent = `Current Session: ${readableDateStr} | System Time: ${readableTimeStr}`;
    };

    computeTimeMetrics();
    setInterval(computeTimeMetrics, 1000);
}

function processLocalReviews() {
    const interactionForm = document.getElementById("clientReviewForm");
    const metricDisplayWrapper = document.getElementById("analyticsPanel");
    const dynamicIntegerTarget = document.getElementById("metricCounter");

    if (!interactionForm) return;

    let submissionIndexCount = parseInt(localStorage.getItem("ims_global_logs_count")) || 0;

    if (submissionIndexCount > 0) {
        exposeMetricCounter(submissionIndexCount);
    }

    interactionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const entityIdentity = document.getElementById("clientIdentity").value.trim();
        const assignedScore = document.getElementById("satisfactionLevel").value;
        const narrativeStatement = document.getElementById("narrativeText").value.trim();

        const uniquePayload = {
            client: entityIdentity,
            score: assignedScore,
            statement: narrativeStatement,
            recordedAt: new Date().toISOString()
        };

        submissionIndexCount++;
        localStorage.setItem("ims_global_logs_count", submissionIndexCount);
        localStorage.setItem(`ims_payload_record_${submissionIndexCount}`, JSON.stringify(uniquePayload));

        exposeMetricCounter(submissionIndexCount);
        interactionForm.reset();
        alert(`Receipt confirmed, ${entityIdentity}. Your quality operational review matrix has been cached locally.`);
    });

    function exposeMetricCounter(currentCount) {
        if (!metricDisplayWrapper || !dynamicIntegerTarget) return;
        dynamicIntegerTarget.textContent = currentCount;
        metricDisplayWrapper.style.display = "block";
    }
}