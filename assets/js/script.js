

var apiKey = "f649c2e69d098ef6b6fa60678a6a0ff2";

//global variables
let lat;
let lon;
let city;


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
    renderCityButtons(city);
  })



})


function weatherApi(){
  //use lat and lon coordinates to fetch weather info
  var weatherQuery = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  fetch(weatherQuery)
  .then(function(response){
    return response.json();
  })
  .then(displayTodaysWeather) 

}

let  searchedCities = []

function renderCityButtons(city){
  $("#history").empty();
  $(".current-weather").empty();

  if(searchedCities.length === 0){
    searchedCities.push(city);
    return
   } 
 
   searchedCities.push(city);

  for (let i = 0; i < searchedCities.length; i++){
   
  //Dinamically generate buttons for each entered city
  var a = $("<button>");
  a.addClass("btn btn-secondary city-btn mb-3");
  //adding a data-attribute 
  a.attr("data-name", searchedCities[i]);
  //providing the initial button text
  a.text(searchedCities[i])
  //adding the city button to the history div
  $("#history").append(a);
  }
 
}



function displayTodaysWeather(data){

 
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


 // $(".card-body").append(image);
  $(".current-weather").append(temperatureToday);
  $(".current-weather").append(windToday);
  $(".current-weather").append(humidityToday);


}



function diplayFiveDaysForecats(){

}