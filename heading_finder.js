function calculateHeading(lat1, lon1, lat2, lon2) {
    const lat1_rad = toRadians(lat1);
    const lon1_rad = toRadians(lon1);
    const lat2_rad = toRadians(lat2);
    const lon2_rad = toRadians(lon2);
    const delta_lon = lon2_rad - lon1_rad;

    const heading = Math.atan2(
        Math.sin(delta_lon) * Math.cos(lat2_rad),
        Math.cos(lat1_rad) * Math.sin(lat2_rad) - Math.sin(lat1_rad) * Math.cos(lat2_rad) * Math.cos(delta_lon)
    );

    let heading_deg = toDegrees(heading);
    heading_deg = (heading_deg + 360) % 360;
    const rounded_heading = Math.abs(Math.round(heading_deg / 10) * 10 - 90);
    return rounded_heading;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

const coordinates = {
    "IBTH": [0, 0],
    "ISAU": [-9.4, -5.5],
    "ISKP": [3.4, -2.99],
    "IGRV": [-8.9, -0.17],
    "TVO": [-8.9, -0.8],
    "IRFD": [-3.4, -4.2],
    "IGAR": [-3.7, -3.3],
    "IBLT": [-2.8, -3.45],
    "IMLR": [-2.65, -4.18],
    "ITRC": [-2.53, -5.46],
    "OWO": [-3.5, -6],
    "ILAR": [2.57, -6.2],
    "IPAP": [4.4, -6.6],
    "IBAR": [4.5, -7.5],
    "IHEN": [1.86, -7.9],
    "ITKO": [-2.5, 5],
    "IDCS": [-2.3, 6],
    "IPPH": [1.9, 2.9],
    "ILKL": [2.77, 2.18],
    "SHV": [3, 3],
    "IZOL": [6.74, -1.38],
    "IJAF": [6.92, -0.79],
    "ISCM": [5.1, 0.1]
};

document.addEventListener("DOMContentLoaded", function() {
    const headingForm = document.getElementById("headingForm");
    const resultDiv = document.getElementById("result");

    headingForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const departureAirport = document.getElementById("departureAirport").value.toUpperCase();
        const arrivalAirport = document.getElementById("arrivalAirport").value.toUpperCase();

        // Check if airports are valid
        if (!(departureAirport in coordinates)) {
            resultDiv.textContent = `Error: ${departureAirport} is not a valid airport code`;
            return;
        }

        if (!(arrivalAirport in coordinates)) {
            resultDiv.textContent = `Error: ${arrivalAirport} is not a valid airport code`;
            return;
        }

        if (arrivalAirport === departureAirport) {
            resultDiv.textContent = "Error: Cannot find heading between the same departure and arrival airports";
            return;
        }

        // Calculate heading
        const heading = calculateHeading(coordinates[departureAirport][0], coordinates[departureAirport][1],
            coordinates[arrivalAirport][0], coordinates[arrivalAirport][1]);

        // Display result
        resultDiv.textContent = `From ${departureAirport} to ${arrivalAirport}: Heading ${heading}°`;
    });
});
