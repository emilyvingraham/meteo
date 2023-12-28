function update(response) {
  let temperatureElement = document.querySelector('#current-temperature');
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector('#weather-app-city');
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}
function searchCity(city) {
  let apiKey = '47ce0ocdabaf4a2e81b031bb9t47a0e0';
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(update);
  //make API call
  //update UI
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#enter-a-city');
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector('#search-container');
searchFormElement.addEventListener('submit', search);

searchCity('Lisbon');
