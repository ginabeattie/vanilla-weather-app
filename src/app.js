function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = response.data.main.temp;
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let icon = response.data.weather[0].icon;

  let tempContainer = document.querySelector("#temperature");
  let cityContainer = document.querySelector("#city");
  let descriptionContainer = document.querySelector("#description");
  let humidityContainer = document.querySelector("#humidity");
  let windContainer = document.querySelector("#wind");
  let dateContainer = document.querySelector("#date");
  let iconContainer = document.querySelector("#icon");

  celciusTemperature = temperature;

  tempContainer.innerHTML = Math.round(temperature) + "&#176;";
  cityContainer.innerHTML = city;
  descriptionContainer.innerHTML = description;
  humidityContainer.innerHTML = humidity;
  windContainer.innerHTML = Math.round(wind);
  dateContainer.innerHTML = formatDate(response.data.dt * 1000);
  iconContainer.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconContainer.setAttribute("alt", `${description}`);
}

function search(city) {
  let apiKey = "1deda5c68ea04c2e5279c1a7fd7cb23f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  search(searchCity.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");

  let fahrenheitTemp = (celciusTemperature * 9) / 5 + 32;
  //alert(fahrenheitTemp);
  let tempContainer = document.querySelector("#temperature");
  tempContainer.innerHTML = Math.round(fahrenheitTemp) + "&#176;";
}

function showCelcius(event) {
  event.preventDefault();

  celcius.classList.add("active");
  fahrenheit.classList.remove("active");

  let celciusTemp = celciusTemperature;
  let tempContainer = document.querySelector("#temperature");
  tempContainer.innerHTML = Math.round(celciusTemperature) + "&#176;";
}

let celciusTemperature = null;

search("Sydney");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);
