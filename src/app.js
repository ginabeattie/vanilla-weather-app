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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //day = days[date.getDay()];
  return days[day];
}
function displayForcast(response) {
  let forcastData = response.data.daily;

  let forcast = document.querySelector("#forcast");

  let forcastHTML = '<div class="row">';
  forcastData.forEach(function (forcastDaily, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
       <div class="weather-forcast-date">${formatDay(forcastDaily.dt)}</div>
       <img
         src="http://openweathermap.org/img/wn/${
           forcastDaily.weather[0].icon
         }@2x.png"
         id="icon"
         alt="broken clouds"
       />
       <div class="weather-forcast-temperature">
         <span class="temperature-high">${Math.round(
           forcastDaily.temp.max
         )}&#176;</span>
         <span class="temperature-low">${Math.round(
           forcastDaily.temp.min
         )}&#176;</span>
       </div>
     </div>
    `;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forcast.innerHTML = forcastHTML;
}

function getForcast(response) {
  let longitude = response.lon;
  let latitude = response.lat;
  let apiKey = "1deda5c68ea04c2e5279c1a7fd7cb23f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForcast);
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

  getForcast(response.data.coord);
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

let celciusTemperature = null;

search("Sydney");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
