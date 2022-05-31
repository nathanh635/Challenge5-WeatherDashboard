let searchButton = document.getElementById("searchButton");
let citiesSearched = [];
let searchBox = document.getElementById("citySearch");
let activeCity = "";
let citiesList = document.getElementById("cities");
let dates = document.querySelectorAll(".date");
let icons = document.querySelectorAll(".icon");
let temps = document.querySelectorAll(".temp");
let winds = document.querySelectorAll(".wind");
let humidities = document.querySelectorAll(".humidity");
let uvIndex = document.getElementById("uvIndex");
let cities = document.getElementById("cities");
let main = document.querySelector("main");

//find the city's latitude and longitude using the geolocator API
function findCity() {

let activeCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + activeCity + "&limit=1&appid=cf5728f7192109047f46caf76889e377";

fetch(activeCityUrl)
.then(function (response) {
  console.log(response);
  return response.json();
})
.then(function (data) {

  console.log(data);
  if (data.length != 0) {
  let location = [data[0].lat, data[0].lon]
  let locationTitle = document.getElementById("location");
  let cityName = data[0].name + ", " + data[0].state + ", " + data[0].country;
  locationTitle.textContent = cityName;

  //add the city to the search history

  if (citiesSearched != null) {
    let k = 0;
  for (i=0; i<citiesSearched.length+1; i++) {

    if (cityName === citiesSearched[i]) {
      k+=1
     }
    }
    if (k<1) {
      addCity(cityName);
     }
  } else {
    addCity(cityName);
  }

  getWeatherData(location);
  } else {
    alert("No cities found for the search term.")
  }

});
}

//getApi function for the weather data

function getApi(requestUrl) {
  fetch(requestUrl)
  .then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
      displayWeather(data);
      return data;
    } 
)
}
})
}

//assemble URL for weather API using location data from other API
function getWeatherData (location) {

let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + location[0] + "&lon=" + location[1] + "&exclude=hourly,minutely&appid=cf5728f7192109047f46caf76889e377";
getApi(requestUrl);
}

function displayWeather(data) {

  main.setAttribute("style", "display:flex")

  for (i=0; i<6;i++) {

    dates[i].textContent = moment().add(i,'days').format("MMM D YYYY")
    temps[i].textContent = "Temperature (\u00B0 C): " + Math.round((data.daily[i].temp.day - 273)*10)/10;
    winds[i].textContent = "Wind speed (km/h): " + data.daily[i].wind_speed;
    humidities[i].textContent = "Humidity (%): " + data.daily[i].humidity;
    icons[i].src = "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png"
  }
  
  //set UV Index and change color based on how high it is
  uvi = data.daily[0].uvi;
  uvIndex.textContent = "UV Index: " + uvi;
  
  if (uvi >= 7) {
    uvIndex.setAttribute('style', 'background-color: red');
  } else if (uvi >=4) {
    uvIndex.setAttribute('style', 'background-color: yellow');
  } else {
    uvIndex.setAttribute('style', 'background-color: green'); 
  }

}


  function searchCity() {
    let searchVal = searchBox.value.trim();
    
    activeCity = searchVal;
     if (!activeCity) {

    } else {
  findCity(activeCity);
  }
  }

  //add City to list of searched cities
function addCity(activeCity) {
  let city = activeCity;
  var cityBlock = document.createElement('p');
  cityBlock.textContent = city;
  cityBlock.className = "city";
  cities.appendChild(cityBlock);
  if (citiesSearched != null) {
    citiesSearched.unshift(city);
  } else {
    citiesSearched = [];
    citiesSearched[0]=city;
  }
    localStorage.setItem("citiesSearched", JSON.stringify(citiesSearched));
}

searchButton.addEventListener("click", searchCity);


//on page load, load saved data
function init() {

  citiesSearched = JSON.parse(localStorage.getItem("citiesSearched"));

  if (citiesSearched != null) {

    for (let i = 0; i <citiesSearched.length; i++) {
      let cityBlock = document.createElement('p');
      cityBlock.textContent = citiesSearched[i];
      cityBlock.className = "city";
      cities.appendChild(cityBlock);
}  
// } else {
//   //citiesSearched = [];
// }
}}
  
init();

cities.addEventListener("click", function(event) {
  event.stopPropagation();
  let element = event.target;
  console.log(element.textContent)

for (i=0; i<citiesSearched.length; i++) {
  if (element.textContent === citiesSearched[i]) {
     activeCity = element.textContent;
   findCity(activeCity);
   }
  }
})
