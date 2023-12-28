function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector('#enter-a-city');
  let cityElement = document.querySelector('#weather-app-city');
  cityElement.innerHTML = searchInput.value;
  //call the API
  //search for the city
}

let searchFormElement = document.querySelector('#search-container');
searchFormElement.addEventListener('submit', search);
