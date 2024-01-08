document.addEventListener('DOMContentLoaded', function() {
    let searchButton = document.getElementById('search-button');
    let cityInput = document.getElementById('city-input');
    let searchHistory = document.getElementById('search-history');
    let searchHistoryItems = []; 

// Add event to search button //
    searchButton.addEventListener('click', function() {
        let city = cityInput.value;
        fetchWeatherData(city);
        addToSearchHistory(city);
    });
// Get data from API//
    function fetchWeatherData(city) {
        const apiKey = '8e261d9adfdc74142c68947411889d40'; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                updateCurrentWeather(data);
                fetchForecastData(city); 
            })
            .catch(error => console.error('Error:', error));
    }

    function fetchForecastData(city) {
        const apiKey = '8e261d9adfdc74142c68947411889d40'; 
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                updateForecastWeather(data);
            })
            .catch(error => console.error('Error:', error));
    }
// Update current weather //
    function updateCurrentWeather(data) {
        let currentWeatherDiv = document.getElementById('current-weather');
    
    currentWeatherDiv.innerHTML = '';

    // Create HTML content for current weather section //
    let cityName = document.createElement('h2');
    cityName.textContent = `${data.name} (${new Date().toLocaleDateString()})`;

    let temperature = document.createElement('p');
    temperature.textContent = `Temp: ${data.main.temp.toFixed(1)}°F`;

    let wind = document.createElement('p');
    wind.textContent = `Wind: ${data.wind.speed.toFixed(1)} MPH`;

    let humidity = document.createElement('p');
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    // Append elements to the current weather div//
    currentWeatherDiv.appendChild(cityName);
    currentWeatherDiv.appendChild(temperature);
    currentWeatherDiv.appendChild(wind);
    currentWeatherDiv.appendChild(humidity);
}
        // Update forecast weather //
    

    function updateForecastWeather(data) {
        let forecastWeatherDiv = document.getElementById('forecast-grid');
    
    forecastWeatherDiv.innerHTML = '';

    
    // Use the midday forecast for each day//
    let dailyForecasts = data.list.filter(forecast => forecast.dt_txt.endsWith('12:00:00'));

    // Create HTML content for forecast weather section //
    dailyForecasts.forEach(forecast => {
        const forecastDiv = document.createElement('div');
        forecastDiv.classList.add('forecast-day');

        const date = document.createElement('p');
        date.textContent = new Date(forecast.dt_txt).toLocaleDateString();

        const icon = document.createElement('img');
        icon.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        icon.alt = forecast.weather[0].description;

        const temp = document.createElement('p');
        temp.textContent = `Temp: ${forecast.main.temp.toFixed(1)}°F`;

        const wind = document.createElement('p');
        wind.textContent = `Wind: ${forecast.wind.speed.toFixed(1)} MPH`;

        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${forecast.main.humidity}%`;

        // Append elements to the forecast div//
        forecastDiv.appendChild(date);
        forecastDiv.appendChild(icon);
        forecastDiv.appendChild(temp);
        forecastDiv.appendChild(wind);
        forecastDiv.appendChild(humidity);

        forecastWeatherDiv.appendChild(forecastDiv);
    });
        
    }

    function addToSearchHistory(city) {
        if (!searchHistoryItems.includes(city)) {
            searchHistoryItems.push(city);
            const cityElement = document.createElement('li');
            cityElement.textContent = city;
            cityElement.addEventListener('click', function() {
                fetchWeatherData(city);
            });
            searchHistory.appendChild(cityElement);
        }
    }
    
    // Set default cities //
    const cities = ['San Diego', 'Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York', 'Chicago', 'Austin'];
    cities.forEach(addToSearchHistory);
})

