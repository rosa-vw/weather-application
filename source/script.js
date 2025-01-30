function updateWeather(response) {
  let temperature = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  temperature.innerHTML = `${currentTemperature}°C`;
}

function searchCity(city) {
  let apiKey = "f8eo81d182023fdd4fb805t37b75950a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Amsterdam");
