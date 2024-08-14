document.getElementById('searchButton').addEventListener('click', async () => {
    const cityName = document.getElementById('cityInput').value;
    const apiKey = 'ecb6faeb277b711fca249d3bdfd93d49';
    const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;
    const weatherIcon = document.querySelector(".weather-icon");
    try {
        // Fetch coordinates using OpenWeather's geocoding API
        const geoResponse = await fetch(geocodingUrl);
        if (!geoResponse.ok) {
            throw new Error(`Geocoding Error: ${geoResponse.status}`);
        }
        const geoData = await geoResponse.json();
        if (geoData.length > 0) {
            const { lat, lon } = geoData[0];

            // Now use the coordinates to get the weather data
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) {
                throw new Error(`Weather API Error: ${weatherResponse.status}`);
            }
            const weatherData = await weatherResponse.json();
            console.log(weatherData);
            document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + "°c";
            document.querySelector(".city").innerHTML = weatherData.name;
            document.querySelector(".wind").innerHTML = weatherData.wind.speed;
            document.querySelector(".humidity").innerHTML = weatherData.main.humidity

            if (weatherData.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            }
            else if (weatherData.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clear.png";
            }
            else if (weatherData.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            }
            else if (weatherData.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            }
            else if (weatherData.weather[0].main == "Snow") {
                weatherIcon.src = "images/snow.png";
            }
            else if (weatherData.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            }

        } else {
            document.getElementById('output').innerHTML = 'Location not found';
        }
    } catch (error) {
        document.getElementById('output').innerHTML = `Error: ${error.message}`;
    }
});































// document.getElementById("exlocation").addEventListener('click', async () => {
//     const exresult = navigator.geolocation.getCurrentPosition(truelocate, falselocate)
//     function truelocate(position) {
//         async()=>{
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         const apiKey = 'ecb6faeb277b711fca249d3bdfd93d49';
//         const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
//         const weatherResponse = await fetch(weatherUrl);
//         console.log(weatherResponse);
//         document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + "°c";
//         document.querySelector(".city").innerHTML = weatherData.name;
//         document.querySelector(".wind").innerHTML = weatherData.wind.speed;
//         document.querySelector(".humidity").innerHTML = weatherData.main.humidity




//         }
//     }
//     function falselocate() {
//         console.log("there is some error occured")
//     }
// })












// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

// const weatherResponse = await fetch(weatherUrl);
// if (!weatherResponse.ok) {
//     throw new Error(`Weather API Error: ${weatherResponse.status}`);
// }
// const weatherData = await weatherResponse.json();
// console.log(weatherData);
// document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + "°c";
// document.querySelector(".city").innerHTML = weatherData.name;
// document.querySelector(".wind").innerHTML = weatherData.wind.speed;
// document.querySelector(".humidity").innerHTML = weatherData.main.humidity





















document.getElementById("exlocation").addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(truelocate, falselocate);

    async function truelocate(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = 'ecb6faeb277b711fca249d3bdfd93d49';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) {
                throw new Error(`Error: ${weatherResponse.status}`);
            }
            const weatherData = await weatherResponse.json();

            document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp) + "°C";
            document.querySelector(".city").innerHTML = weatherData.name;
            document.querySelector(".wind").innerHTML = weatherData.wind.speed + " m/s";
            document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.querySelector(".city").innerHTML = "Failed to fetch weather data.";
        }
    }

    function falselocate() {
        console.log("There was an error getting your location.");
        document.querySelector(".city").innerHTML = "Unable to retrieve location.";
    }
});
