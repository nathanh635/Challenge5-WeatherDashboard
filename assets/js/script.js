let searchButton = document.getElementById("searchButton");
let citiesSearched = [];
let searchBox = document.getElementById("citySearch");
let activeCity = "";
let citiesList = document.getElementById("cities")

let weatherData = [
  {
    temp: "-",
    uvIndex: "-",
    wind: "-",
    humid: "-"
}]

function findCity() {

let activeCityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + activeCity + "&limit=1&appid=cf5728f7192109047f46caf76889e377";

fetch(activeCityUrl)
.then(function (response) {
  console.log(response);
  return response.json();
})
.then(function (data) {

  console.log(data);
  let location = [data[0].lat, data[0].lon]
  getWeatherData(location);
});
}

function getApi(requestUrl) {
  fetch(requestUrl)
  .then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
      return data;
    } 
)
}
})
}

function getWeatherData (location) {

let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + location[0] + "&lon=" + location[1] + "&exclude=hourly&appid=cf5728f7192109047f46caf76889e377";

getApi(requestUrl);

}

// // function displayWeather(data) {


// // //for ...

// // if (i = 0) {

// // }
// // }



// /* if data.current.uvi >= 7
//   background color = red
//   Else if UV index >= 4 - yellow
//   Else green



//   /* when searching cities, autocomplete?

//   populate banner and cards with data from city when selected
  
//   update UV index color
  
//   if no cities, display "--" for all data

//   if statement for weather condition icon?
//   */



  function searchCity() {
    let searchVal = searchBox.value.trim();
    citiesSearched.unshift(searchVal);
    localStorage.setItem("citiesSearched", JSON.stringify(citiesSearched));
    activeCity = searchVal;
    console.log(activeCity)
    if (!activeCity) {

    } else {
  findCity(activeCity);

 
  }
  }

  searchButton.addEventListener("click", searchCity);

// //   function init()
 
// //  // citiesSearched = JSON.parse(localStorage.getItem("citiesSearched"));

// //   for (let i = 0; i <citiesSearched.length; i++) {
// //     var city = document.createElement('p');
// //     citiesList.append(city);
// //  }  
  

// //  $(".saveBtn").on('click',function() {
// //   var t = (this.id);
// //   schedule[t] = formEl.eq(t).val();
// //   localStorage.setItem("schedule", JSON.stringify(schedule));
// // });  
