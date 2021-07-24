function displayTemperature(response) {
  let temperature = response.data.main.temp;
  let city = response.data.name;
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;

  let tempContainer = document.querySelector("#temperature");
  let cityContainer = document.querySelector("#city");
  let descriptionContainer = document.querySelector("#description");
  let humidityContainer = document.querySelector("#humidity");
  let windContainer = document.querySelector("#wind");

  tempContainer.innerHTML = Math.round(temperature) + "&#176;";
  cityContainer.innerHTML = city;
  descriptionContainer.innerHTML = description;
  humidityContainer.innerHTML = humidity;
  windContainer.innerHTML = Math.round(wind);

  //console.log(response.data.name);
}

let apiKey = "1deda5c68ea04c2e5279c1a7fd7cb23f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
