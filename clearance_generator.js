document.addEventListener("DOMContentLoaded", function() {
    const clearanceForm = document.getElementById("clearanceForm");
    const clearanceResult = document.getElementById("clearanceResult");

    clearanceForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input data
        const inputData = document.getElementById("inputData").value;
        const departureFrequency = document.getElementById("departureFrequency").value.trim();

        // Parse input data
        const lines = inputData.trim().split('\n');
        const callsign = lines.find(line => line.includes('Callsign')).split(': ')[1].trim();
        const aircraft = lines.find(line => line.includes('Aircraft')).split(': ')[1].trim();
        const flightRules = lines.find(line => line.includes('Flight Rules')).split(': ')[1].trim();
        const departing = lines.find(line => line.includes('Departing')).split(': ')[1].trim();
        const arriving = lines.find(line => line.includes('Arriving')).split(': ')[1].trim();
        let routeLine = lines.find(line => line.includes('Route'));
        let route = routeLine ? routeLine.split(': ')[1].trim().toUpperCase() : '';
        if (route === 'N/A') {
            route = 'Radar Vectors';
        }
        const flightLevel = lines.find(line => line.includes('Flight Level')).split(': ')[1].trim();

        // Generate clearance
        const clearance = generateClearance(callsign, aircraft, flightRules, departing, arriving, route, flightLevel, departureFrequency);

        // Display clearance result
        clearanceResult.textContent = clearance;
    });
});

function generateClearance(callsign, aircraft, flightRules, departing, arriving, route, flightLevel, departureFrequency) {
    const squawk = generateSquawk(); // Generate squawk code

    // Construct the departure frequency text
    let departureFreqText = '';
    if (departureFrequency) {
        departureFreqText = `departure ${departureFrequency}`;
    } else {
        departureFreqText = 'departure with me';
    }

    // Construct the clearance message
    const clearanceMessage = `
        ${callsign} ${aircraft} Cleared ${flightRules} to ${arriving}, route ${route}, expect flight level ${flightLevel}, ${departureFreqText}, squawk ${squawk}
    `;

    return clearanceMessage.trim(); // Trim any leading/trailing whitespace
}

function generateSquawk() {
    let squawkCode = '';
    do {
        squawkCode = Math.floor(Math.random() * 7777).toString().padStart(4, '0');
    } while (['7500', '7600', '7700', '1200', '2000'].includes(squawkCode));
    return squawkCode;
}
