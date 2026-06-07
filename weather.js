const api = {
    key: '3724d4ec949c7b455c91073dad9d1401',
    base: 'https://api.openweathermap.org/data/2.5/weather'
};

const Input = document.getElementById('input');

Input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather(Input.value);
        document.querySelector('.main-weather').style.display = 'block';
    }
});

function getWeather(city) {
    fetch(`${api.base}?q=${city}&appid=${api.key}&units=metric`)
        .then((details) => details.json())
        .then(showWeather)
        .catch(err => console.error("Error fetching weather:", err));
}

function showWeather(details) {
    console.log(details);

    let city = document.getElementById('city');
    city.innerHTML = `📍 <strong>${details.name}, ${details.sys.country}</strong>`;

    let temperature = document.getElementById('temperature');
    temperature.innerHTML = `🌡️ Temperature: <strong>${Math.round(details.main.temp)}°C</strong>`;

    let mainMax = document.getElementById('min-max');
    mainMax.innerHTML = `🔄 <strong>${Math.round(details.main.temp_min)}°C</strong> (Min) and <strong>${Math.round(details.main.temp_max)}°C</strong> (Max)`;

    let weatherType = document.getElementById('weather-type');
    weatherType.innerHTML = `☁️ Weather: <strong>${details.weather[0].main}</strong> - ${details.weather[0].description}`;

    // Start updating time with timezone
    updateWeatherWithTimezone(details);
}

function updateWeatherWithTimezone(details) {
    // Clear any existing interval
    if (window.timerInterval) {
        clearInterval(window.timerInterval);
    }

    // Get timezone offset in seconds from API and convert to minutes
    const offsetSeconds = details.timezone;
    
    // Get city coordinates for timezone lookup
    const lat = details.coord.lat;
    const lon = details.coord.lon;

    const updateTime = () => {
        // Create UTC time and add the timezone offset
        const cityTime = moment.utc().add(offsetSeconds, 'seconds');
        document.getElementById("date").innerHTML = `🕐 <strong>${cityTime.format("Do MMM YYYY, h:mm:ss A")}</strong>`;
    };

    // Get timezone name (optional - uses offset if name not available)
    const offsetHours = offsetSeconds / 3600;
    const sign = offsetHours >= 0 ? '+' : '';
    const tzDisplay = `UTC${sign}${(offsetHours).toFixed(1)}`;
    document.getElementById("timezone").innerHTML = `🌍 Timezone: <strong>${tzDisplay}</strong>`;

    // Update time immediately
    updateTime();

    // Update time every second
    window.timerInterval = setInterval(updateTime, 1000);
}
