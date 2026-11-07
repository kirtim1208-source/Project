// Get weather information when button is clicked

async function getWeather() {

    let city = document.getElementById("cityInput").value;

    let message = document.getElementById("message");

    if (city.trim() === "") {
        message.innerText = "Please enter a city name!";
        return;
    }

    message.innerText = "Loading weather...";

    try {

        // Find city location

        let locationURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        let locationResponse = await fetch(locationURL);
        let locationData = await locationResponse.json();

        if (!locationData.results) {
            throw new Error("City not found!");
        }

        let place = locationData.results[0];

        let latitude = place.latitude;
        let longitude = place.longitude;

        // Get weather data

        let weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,is_day&timezone=auto`;

        let weatherResponse = await fetch(weatherURL);
        let weatherData = await weatherResponse.json();

        let current = weatherData.current;

        // Display city name

        document.getElementById("cityName").innerText =
            place.name + ", " + place.country;

        // Display temperature

        document.getElementById("temperature").innerText =
            current.temperature_2m + "°C";

        // Display humidity

        document.getElementById("humidity").innerText =
            current.relative_humidity_2m + "%";

        // Display wind speed

        document.getElementById("wind").innerText =
            current.wind_speed_10m + " km/h";

        // Display feels like temperature

        document.getElementById("feelsLike").innerText =
            current.apparent_temperature + "°C";

        // Weather condition

        let code = current.weather_code;
        let condition = "Clear Sky";
        let icon = "☀️";

        if (code === 0) {
            condition = "Clear Sky";
            icon = current.is_day ? "☀️" : "🌙";
        }
        else if (code === 1 || code === 2) {
            condition = "Partly Cloudy";
            icon = "🌤️";
        }
        else if (code === 3) {
            condition = "Cloudy";
            icon = "☁️";
        }
        else if (code >= 45 && code <= 48) {
            condition = "Foggy";
            icon = "🌫️";
        }
        else if (code >= 51 && code <= 67) {
            condition = "Rainy";
            icon = "🌧️";
        }
        else if (code >= 71 && code <= 77) {
            condition = "Snowy";
            icon = "❄️";
        }
        else if (code >= 80 && code <= 82) {
            condition = "Rain Showers";
            icon = "🌦️";
        }
        else if (code >= 95) {
            condition = "Thunderstorm";
            icon = "⛈️";
        }

        document.getElementById("description").innerText =
            condition;

        document.getElementById("weatherIcon").innerText =
            icon;

        message.innerText = "";

    }
    catch (error) {

        message.innerText = "City not found! Please try again.";

    }

}

// Search weather when Enter key is pressed

document.getElementById("cityInput").addEventListener("keypress",
    function(event) {

        if (event.key === "Enter") {
            getWeather();
        }

    }
);