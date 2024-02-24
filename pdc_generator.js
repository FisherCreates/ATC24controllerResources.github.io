document.addEventListener("DOMContentLoaded", function() {
    const pdcForm = document.getElementById("pdcForm");
    const pdcResult = document.getElementById("pdcResult");

    pdcForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input data
        const inputData = document.getElementById("inputData").value;

        // Generate PDC
        const pdc = generatePDCFromFlightPlan(inputData);

        // Display PDC result
        pdcResult.innerHTML = pdc; // Use innerHTML to render HTML content
    });
});

function generatePDCFromFlightPlan(flightPlanStr) {
    const lines = flightPlanStr.trim().split('\n');
    const callsign = lines.find(line => line.includes('Callsign')).split(': ')[1].trim();
    const arriving = lines.find(line => line.includes('Arriving')).split(': ')[1].trim();
    const route = lines.find(line => line.includes('Route')).split(': ')[1].trim();
    const flightLevel = lines.find(line => line.includes('Flight Level')).split(': ')[1].trim();

    const reportTime = getCurrentTime();
    const departureFrequency = "unspecified"; // Example departure frequency
    const squawk = generateSquawk();

    const pdcTemplate = `
        <br>\`IFR PDC reported ${reportTime}Z\`<br>
        >>> \`${callsign} clrd ${arriving} via ${route}.\`<br>
        \`${flightLevel} 5min after dep.\`<br>
        \`Dep freq. ${departureFrequency}.\`<br>
        \`Squawk ${squawk}\`<br>
        ~~\`===============\`~~<br>
    `;

    return pdcTemplate; // Return HTML content with line breaks
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}${minutes}`;
}

function generateSquawk() {
    let squawkCode = '';
    do {
        squawkCode = Math.floor(Math.random() * 7777).toString().padStart(4, '0');
    } while (['7500', '7600', '7700', '1200', '2000'].includes(squawkCode));
    return squawkCode;
}
