// Initialize the map
var map = L.map('map').setView([19.0760, 72.8777], 10); // Centered on Mumbai

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Define custom icons for start and end markers
var startIcon = L.icon({
    iconUrl: 'path/to/start-icon.png', // Replace with the path to your start icon
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon
});

var endIcon = L.icon({
    iconUrl: 'path/to/end-icon.png', // Replace with the path to your end icon
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon
});

// Routing control to calculate distance and display the route
var routingControl;

// Handle form submission
document.getElementById('routeForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const start = document.getElementById('startDestination').value;
    const end = document.getElementById('endDestination').value;

    if (routingControl) {
        map.removeControl(routingControl); // Remove previous routing control if exists
    }

    // Geocode start and end locations to get their lat/lng
    Promise.all([getCoordinates(start), getCoordinates(end)]).then(([startCoords, endCoords]) => {
        if (startCoords && endCoords) {
            // Add markers for start and end locations with default popups
            const startMarker = L.marker([startCoords.lat, startCoords.lng], { icon: startIcon }).addTo(map);
            const endMarker = L.marker([endCoords.lat, endCoords.lng], { icon: endIcon }).addTo(map);

            // Bind popups to the markers and open them
            startMarker.bindPopup('Start: ' + start).openPopup();
            endMarker.bindPopup('End: ' + end).openPopup();

            // Listen for popup close events
            startMarker.on('popupclose', function () {
                startMarker.closePopup(); // Ensure the popup is closed when clicking the close button
            });

            endMarker.on('popupclose', function () {
                endMarker.closePopup(); // Ensure the popup is closed when clicking the close button
            });

            // Initialize routing control
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(startCoords.lat, startCoords.lng),
                    L.latLng(endCoords.lat, endCoords.lng),
                ],
                routeWhileDragging: true,
                createMarker: function() { return null; }, // Disable marker creation
                lineOptions: {
                    styles: [
                        {
                            color: 'red', // Set the line color to blue
                            opacity: 0.7, // Set the line opacity
                            weight: 5 // Set the width of the line
                        }
                    ]
                }
            }).addTo(map);

            // Listen for route event to calculate distance
            routingControl.on('routesfound', function(e) {
                var distance = e.routes[0].summary.totalDistance / 1000; // Convert to km
                var totalCost = calculateTotalCost(distance);
                
                // Update the HTML
                document.getElementById('distance').innerText = distance.toFixed(2) + ' km';
                document.getElementById('totalCost').innerText = '₹' + totalCost.toFixed(2);
            });
        } else {
            alert('Unable to find one or both locations.');
        }
    });
});

// Function to get coordinates using Nominatim API
function getCoordinates(address) {
    return new Promise((resolve) => {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    resolve({
                        lat: data[0].lat,
                        lng: data[0].lon
                    });
                } else {
                    resolve(null);
                }
            });
    });
}

// Calculate total cost based on distance
function calculateTotalCost(distance) {
    const costPerKm = 10; // Example cost per kilometer
    return distance * costPerKm;
}

// Weather popup code remains unchanged...

// Sidebar toggle logic remains unchanged...




// Weather popup code remains unchanged...

// Sidebar toggle logic remains unchanged...


// weather popup
const apiKey = '00f9200b705b883cbcc8420f8d8ab749'; // Your API key
const city = 'Mumbai';

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        // Convert wind speed from m/s to kph
        const windSpeedKph = (data.wind.speed * 3.6).toFixed(1);

        // Update weather details
        document.getElementById('temp').innerHTML = `${Math.round(data.main.temp)}&deg;`;
        document.getElementById('feelsLike').innerHTML = `Feels Like: ${Math.round(data.main.feels_like)}&deg;`;
        document.getElementById('description').innerText = `${data.weather[0].description}`; // Dynamic weather description
        document.getElementById('humidity').innerHTML = `${data.main.humidity}`;
        document.getElementById('wind').innerText = `${windSpeedKph}`;

        // Update the header for Mumbai
        document.getElementById('cityHeader').innerText = `Weather in ${city}`;

        // Show the popup once the weather data is fetched
        document.getElementById('weatherPopup').style.display = 'block';

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchWeather();
    // Refresh weather data every 10 minutes
    setInterval(fetchWeather, 600000);
});







// Sidebar toggle logic for small screens
document.querySelector('.open-btn').addEventListener('click', function () {
    document.getElementById('side_nav').classList.toggle('active');
});

document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('side_nav').classList.remove('active');
});

// Initialize Leaflet map for Maharashtra centered view
var map = L.map('map').setView([19.7515, 75.7139], 7); // Coordinates of Maharashtra

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);










