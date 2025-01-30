function updateWeather(response) {
  let temperature = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.temperature.current);
  temperature.innerHTML = `${currentTemperature}°C`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.condition.description;
  let perceived = document.querySelector("#perceived");
  let currentPerceived = Math.round(response.data.temperature.feels_like);
  perceived.innerHTML = `${currentPerceived}°C`;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = `${currentHumidity}%`;
  let windSpeed = document.querySelector("#wind-speed");
  let currentWindSpeed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${currentWindSpeed} KM/H`;
  let date = new Date(response.data.time * 1000);
  let time = document.querySelector("#time");
  time.innerHTML = formatDay(date);
  let calendar = document.querySelector("#calendar");
  calendar.innerHTML = formatDate(date);
}

function formatDay(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDate(date) {
  let day = date.getDate();
  let year = date.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  if (day < 10) {
    day = `0${day}`;
  }

  return `${month} ${day}, ${year}`;
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
