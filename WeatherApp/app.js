async function getWeather() {

    let city = document.getElementById("cityInput").value;
    let message = document.getElementById("message");

    if (city.trim() === "") {
        message.innerText = "Please enter city name";
        return;
    }

    message.innerText = "Loading...";

    try {

        let url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        let response = await fetch(url);
        let data = await response.json();

        if (!data.results || data.results.length === 0) {
            message.innerText = "City not found";
            return;
        }

        let place = data.results[0];

        let lat = place.latitude;
        let lon = place.longitude;

        let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,is_day&timezone=auto`;

        let weatherResponse = await fetch(weatherURL);
        let weatherData = await weatherResponse.json();

        let current = weatherData.current;

        document.getElementById("cityName").innerText = place.name + ", " + place.country;

        document.getElementById("temperature").innerText = current.temperature_2m + "°C";

        document.getElementById("humidity").innerText = current.relative_humidity_2m + "%";

        document.getElementById("wind").innerText = current.wind_speed_10m + " km/h";

        document.getElementById("feelsLike").innerText = current.apparent_temperature + "°C";

        message.innerText = "";

    } catch (error) {

        message.innerText = "Something went wrong. Please try again.";

    }
}

document.getElementById("cityInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});