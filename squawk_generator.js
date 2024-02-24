document.addEventListener("DOMContentLoaded", function() {
    const squawkButton = document.getElementById("squawkButton");
    const squawkResult = document.getElementById("squawkResult");

    squawkButton.addEventListener("click", function() {
        let squawkCode = generateSquawk();
        while (isSpecialCode(squawkCode)) {
            squawkCode = generateSquawk();
        }
        squawkResult.textContent = `Squawk ${squawkCode}`;
    });

    function generateSquawk() {
        const squawkDigits = [
            String(Math.floor(Math.random() * 8)), // Generates a random digit between 0 and 7
            String(Math.floor(Math.random() * 8)),
            String(Math.floor(Math.random() * 8)),
            String(Math.floor(Math.random() * 8))
        ];
        const squawkCode = squawkDigits.join("");
        return squawkCode;
    }

    function isSpecialCode(squawkCode) {
        const specialCodes = ["7500", "7600", "7700", "1200", "2000"];
        return specialCodes.includes(squawkCode);
    }
});
