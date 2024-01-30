
var apiKey = "f649c2e69d098ef6b6fa60678a6a0ff2";

//get from localStorage if available otherwise return an empty array
var searchedCities = JSON.parse(localStorage.getItem("search")) || [];

//global variables
let lat;
let lon;
let city;
let clickedCity;


$('#search-button').on('click', function(event) {
  event.preventDefault();
  var enteredCity = $('#enter-city').val().trim();

  // use direct geocoding Api to get lat and long of the city
  var latAndLongQuery = "http://api.openweathermap.org/geo/1.0/direct?q=" + enteredCity + "&limit=5&appid=" + apiKey;
  
  fetch(latAndLongQuery)
  .then(function(response){
    return response.json();
  })
  .then(function(data) {

    if(data.length == 0){
      $(".city-name").text("Sorry, there is no such city name in our data base");         
      return
    
    }
     //get hold of lat and long of the entered city

    lat = data[0].lat;
    lon = data[0].lon;
    city= data[0].name;

    weatherApi();

    //set LocaStorage
    localStorage.setItem("search", JSON.stringify(searchedCities));
  })



})

// create func to fetch weather api, set default param null for requesting api first time
function weatherApi(clickedCity){

  //use lat and lon coordinates to fetch weather info
  var weatherQuery = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  fetch(weatherQuery)
  .then(function(response){
    return response.json();
  })
  .then(function(data) {

    displayTodaysWeather(data) // call function to display current day weather info
    displayFiveDaysForecast(data);  // call function to display next 5 days weather info

  })
 
      //call function to generate city buttons 
      renderSearchButtons(city);

}

function renderSearchButtons(city){
  $("#history").empty();
  $(".current-weather").empty();
 
  //if searchedCities array is empty, do not generate an empty button
  if(searchedCities.length === 0){
    searchedCities.push(city);
    return
  } 
  
  searchedCities.push(city);
  for (let i = 0; i < searchedCities.length; i++){
  //Dinamically generate buttons for each entered city
  var searchedItem = $("<button>").attr("type", "button");
  searchedItem .addClass("btn btn-secondary city-btn mb-3");
  //adding a data-attribute 
  searchedItem .attr("data-name", searchedCities[i]);
  console.log(searchedCities);
  //providing the initial button text
  searchedItem .text(searchedCities[i])
  //adding the city button to the history div
  $("#history").append(searchedItem );
  }
 
}




function displayTodaysWeather(data){
  // Empty the content of .current-weather  before appending new information
  $(".current-weather").empty();

  $("#today-weather").addClass("border border-primary");

  const temp = data.list[0].main.temp;
  const wind = data.list[0].wind.speed;
  const humidity = data.list[0].main.humidity;
  const  weatherPic = data.list[0].weather[0].icon;  
  const  weatherDescription = data.list[0].weather[0].description;

  // Creating an element to hold the weather image icon
  var image = $("<img>")
  .attr("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png")
  .attr("alt", weatherDescription);

  $("#city-name").text(city + " ( " + dayjs().format('DD/MM/YYYY') + " )");
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


//adding a click event listener to all elements with class of city-btn
 $("#history").on('click',".city-btn", function() {
  clickedCity = $(this).data("name");
  searchedCities.length > 0 ? weatherApi(clickedCity) : weatherApi()

 });

