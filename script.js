let searchButton = document.getElementById("searchButton");
let citiesSearched = [];
let searchBox = document.getElementById("citySearch");
let activeCity = "";


var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + "&lon=" + longitude + "&exclude=" + part + "&appid=" + apiKey;

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      //  Conditional for the the response.status.
      if (response.status !== 200) {
        // Place the response.status on the page.
        responseText.textContent = response.status;
      }
      return response.json();
    })
    .then(function (data) {
      // Make sure to look at the response in the console and read how 404 response is structured.
      console.log(data);
    });
}

getApi(requestUrl);




/* if uvIndex > 7
  background color = red
  Else if UV index >4 - yellow
  Else green



  /* when searching cities, autocomplete?

  populate banner and cards with data from city when selected
  
  update UV index color
  
  if no cities, display "--" for all data

  if statement for weather condition icon?
  */

  searchButton.addEventListener("click", searchCity());

  function searchCity() {
    let searchVal = searchBox.value;
    citiesSearched.unshift(searchVal);
    localStorage.setItem("citiesSearched", JSON.stringify(citiesSearched));
    activeCity = searchVal;

  }

  function init()
 {
  citiesSearched = JSON.parse(localStorage.getItem("citiesSearched"));

 }  
  
