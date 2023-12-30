function refreshWeather(response) {
  let temperatureElement = document.querySelector('#current-temperature');
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector('#weather-app-city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#api-humidity');
  let windspeedElement = document.querySelector('#api-windspeed');
  let feelsLikeElement = document.querySelector('#api-feels-like');
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let locationCityElement = document.querySelector('#location-city');
  let locationCity = response.data.city;
  let locationCountryElement = document.querySelector('#location-country');
  let locationCountry = response.data.country;
  let longitudeElement = document.querySelector('#longitude');
  let latitudeElement = document.querySelector('#latitude');
  let timeElement = document.querySelector('#time');
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector('#icon');
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-emoji"/>`;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  feelsLikeElement.innerHTML = `${feelsLike}°C`;
  temperatureElement.innerHTML = Math.round(temperature);
  locationCityElement.innerHTML = `${locationCity}`;
  locationCountryElement.innerHTML = `${locationCountry}`;
  longitudeElement.innerHTML = response.data.coordinates.longitude.toFixed(4);
  latitudeElement.innerHTML = response.data.coordinates.latitude.toFixed(4);

  timeElement.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  } else {
    hours;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = '47ce0ocdabaf4a2e81b031bb9t47a0e0';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#enter-a-city');
  searchCity(searchInput.value);
}

function getForecast(city) {
  //make API call + display forecast with API results
  let apiKey = '47ce0ocdabaf4a2e81b031bb9t47a0e0';
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = '';

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `        <div class="row">
    <div class="col-2">
    <div class="weather-forecast-day">Tuesday</div>
    <div>
    <img
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
    alt="cloudy"
    width="42"
    />
    </div>
    <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max"> <strong>${Math.round(
      day.temperature.maximum
    )}°</strong> </span>
    <span class="weather-forecast-temperature-min"> ${Math.round(
      day.temperature.minimum
    )}° </span>
    </div>
    </div>
    </div>`;
  });
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector('#search-container');
searchFormElement.addEventListener('submit', search);

searchCity('Lisbon');
