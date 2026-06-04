const api = {
    key: '3724d4ec949c7b455c91073dad9d1401',
    base: 'https://api.openweathermap.org/data/2.5/weather'
};

const Input = document.getElementById('input');

Input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather(Input.value);

        const date = moment();
        document.getElementById("date").innerHTML = date.format(
            'Do MMM YYYY dddd, h:mm:ss'
        );

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
    city.innerHTML = `${details.name}, ${details.sys.country}`;

    let temperature = document.getElementById('temperature');
    temperature.innerHTML = `${Math.round(details.main.temp)}°C`;

    let mainMax = document.getElementById('min-max');
    mainMax.innerHTML = `${Math.round(details.main.temp_min)}°C (Min) and ${Math.round(details.main.temp_max)}°C (Max)`;

    let weatherType = document.getElementById('weather-type');
    weatherType.innerHTML = `${details.weather[0].main}`;
}
