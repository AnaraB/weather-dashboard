 // Assigning a unique API to a variable
var apiKey = "f649c2e69d098ef6b6fa60678a6a0ff2";

//get from localStorage if available otherwise return an empty array
var searchedCities = JSON.parse(localStorage.getItem("search")) || [];

//global variable
let city;

$('#search-button').on('click', function(event) {
  event.preventDefault();
  var enteredCity = $('#enter-city').val().trim();
  getCityCoords(enteredCity);
  searchedCities.push(enteredCity);
  //set LocaStorage
 localStorage.setItem("search", JSON.stringify(searchedCities));
 renderSearchButtons();
  

})

function getCityCoords(enteredCity){


  // fetch current weather api for the city
  var latAndLongQuery = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + enteredCity + "&appid=" + apiKey;

  
  fetch(latAndLongQuery)
  .then(function(response){
    return response.json();
  })
  .then(function(data) {

        //get hold of lat and long of the entered city
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        city = data.name;
    
    console.log(data);
    displayTodaysWeather(data) // call function to display current day weather info

    if(data.length == 0){
      $(".city-name").text("Sorry, there is no such city name in our data base");         
      return
    
    }
  

    //use lat and lon coordinates to fetch weather info for 5 days
    var weatherQuery = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(weatherQuery)
    .then(function(response){
      return response.json();
    })
    .then(function(data) {

    
      displayFiveDaysForecast(data);  // call function to display next 5 days weather info

    })


  })

}


function displayTodaysWeather(data){
  console.log(data);
  // Empty the content of .current-weather  before appending new information
  $(".current-weather").empty();

  const temp = data.main.temp;
  const wind = data.wind.speed;
  const humidity = data.main.humidity;
  const  weatherPic = data.weather[0].icon;  
  const  weatherDescription = data.weather[0].description;

  // Creating an element to hold the weather image icon
  var image = $("<img>")
  .attr("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png")
  .attr("alt", weatherDescription);

  $("#city-name").text(data.name + " ( " + dayjs().format('DD/MM/YYYY') + " )");
  $("#city-name").append(image);



  // Creating an element to have the temp  displayed
  var temperatureToday = $("<p>").text("Temperature: " + temp + " C°");

  // Creating an element to have the wind displayed
  var windToday = $("<p>").text("Wind: " + wind + " KPH");

  // Creating an element to have the humidity displayed
  var humidityToday = $("<p>").text("Humidity: " + humidity + " %");
  $(".current-weather").append(temperatureToday);
  $(".current-weather").append(windToday);
  $(".current-weather").append(humidityToday);

}

function displayFiveDaysForecast(data){

  var forecastEls = $(".forecast-five").children();
  // Add background color blue to all selected elements
  forecastEls.css("background-color", "#5072A7");
  for (let i = 0; i < forecastEls.length; i++)  {
      $(forecastEls[i]).empty();

      //each forecast entry is spaced 8 hours apart
      const forecastIndex = i * 8 + 4;
      const forecastDate = dayjs(data.list[forecastIndex].dt * 1000);
      const forecastDay = forecastDate.date();
      const forecastMonth = forecastDate.month() + 1;
      const forecastYear = forecastDate.year();

        // Creating and appendind an element to display date
        var date = $("<h3>");
        date.text(forecastDay + "/" + forecastMonth + "/" + forecastYear);
        date.addClass("mt-3 mb-0 p-3 forecast-date");
        $(forecastEls[i]).append(date);
      
        //required data pieces
        const  weatherPic = data.list[forecastIndex].weather[0].icon;  
        const  weatherDescription = data.list[forecastIndex].weather[0].description;
        const temp = data.list[0].main.temp;
        const wind = data.list[0].wind.speed;
        const humidity = data.list[0].main.humidity;
        
        //create <p> for icon and <img> attr for url, and display them
        var pImage = $("<p>");
        var image = $("<img>")
        .attr("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png")
        .attr("alt", weatherDescription);
        pImage.append(image);
        $(forecastEls[i]).append(pImage);
      //create <p> to display temp, wind and humidity info and append to divs
        var temperature= $("<p>").text("Temperature: " + temp + " C°");
        var windInfo = $("<p>").text("Wind: " + wind + " KPH");
        var humidityinfo = $("<p>").text("Humidity: " + humidity + " %");
        $(forecastEls[i]).append(temperature);
        $(forecastEls[i]).append(windInfo);
        $(forecastEls[i]).append(humidityinfo);

  }

}

function renderSearchButtons(city){
  console.log(city);
  //$("#history").empty();
  $(".current-weather").empty();

  for (let i = 0; i < searchedCities.length; i++){
    //Dinamically generate buttons for each entered city
    var searchedItem = $("<button>").attr("type", "button");
    searchedItem.addClass("btn btn-secondary city-btn mb-3");
    //adding a data-attribute 
    searchedItem.attr("data-name", searchedCities[i]);
    //providing the initial button text
    searchedItem.text(searchedCities[i])
    // searchedItem.on
    //adding the city button to the history div
    $("#history").append(searchedItem );
    }

}


   //call function to generate city buttons 
  //  renderSearchButtons();

 


//adding a click event listener to all elements with class of city-btn
 $("#history").on('click',".city-btn", function() {
  let clickedCity = $(this).data("name");

    getCityCoords(clickedCity)
  

 });

  // Clear button. Delete all city-buttons and clear localStorage
  $("#clear-history").on("click", function () {
    localStorage.clear();
    $("#history").empty();
})