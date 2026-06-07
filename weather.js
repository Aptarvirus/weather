const api = {
    key: '3724d4ec949c7b455c91073dad9d140',
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

// function showWeather(details) {
    // console.log(details);
// Convert seconds to minutes for moment.utcOffset()
// const offsetMinutes = timezoneOffset / 60;

// Create a UTC moment, then set the offset
const localTime = moment.utc(details.dt * 1000).utcOffset(offsetMinutes);

document.getElementById("date").innerHTML = localTime.format('Do MMM YYYY dddd, h:mm:ss');

    let city = document.getElementById('city');
    city.innerHTML = `${details.name}, ${details.sys.country}`;

    let temperature = document.getElementById('temperature');
    temperature.innerHTML = `${Math.round(details.main.temp)}°C`;

    let mainMax = document.getElementById('min-max');
    mainMax.innerHTML = `${Math.round(details.main.temp_min)}°C (Min) and ${Math.round(details.main.temp_max)}°C (Max)`;

    let weatherType = document.getElementById('weather-type');
    weatherType.innerHTML = `${details.weather[0].main}`;

    // Display time in the searched city's timezone
    const timezoneOffset = details.timezone; // seconds from UTC
    const localTime = moment.unix(details.dt).utcOffset(timezoneOffset / 60); // Use the server's timestamp with timezone offset
    document.getElementById("date").innerHTML = localTime.format(
        'Do MMM YYYY dddd, h:mm:ss'
    );
}
