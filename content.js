//import { showFlightLoadInPopup2 } from "travelnetMainPopup.js";

initSearch();

function initSearch() {
    // Select the "One-way" trip option
    let tripWayRadio = document.querySelector('input[name="tripWay"][value="oneWay"]');
    if (tripWayRadio) {
        tripWayRadio.click();
    } else {
        console.error("One-way radio button not found.");
        return;
    }

    // Fill in the "From" and "To" fields
    let fromAirport = document.getElementById('fromAirport');
    let toAirport = document.getElementById('toAirport');
    if (fromAirport && toAirport) {
        fromAirport.value = 'ATL'; // Example: Set from Atlanta
        toAirport.value = 'JFK'; // Example: Set to New York JFK
    } else {
        console.error("From or To airport field not found.");
        return;
    }
    let searchAllFlightsSection = Array.from(document.querySelectorAll('div.label')).find(el => el.textContent.includes('Search all flights'));
    let searchButton = searchAllFlightsSection ? searchAllFlightsSection.closest('div.formContent').querySelector('a.buttonLink') : null;

    if (searchButton && searchButton.textContent.trim() === 'Search') {
        searchButton.click();
    } else {
        console.error("Search button within 'Search all flights' not found.");
    }

    let tbody = document.querySelector('#flightsOut tbody');

// Check if tbody exists
    if (tbody) {
        // Iterate through all rows in the tbody
        tbody.querySelectorAll('tr').forEach(row => {
            // Find all <a> tags within the row
            let links = row.querySelectorAll('td a');

            // Filter links that match the specific href format and find the last one
            let targetLink = Array.from(links).reverse().find(link => link.href.includes("showFlightLoadInPopup2"));

            // If a target link is found, perform the desired action
            if (targetLink) {
                // Example action: log the href attribute
                console.log(targetLink.href);
                //showFlightLoadInPopup2('search','0', 'out', 'nonRevenue');
                // If you need to perform a click action or something else, you can do it here
                targetLink.click(); // Uncomment to simulate a click on the link
            }
        });
    } else {
        console.error("Table body within flightsOut not found.");
    }



}
    