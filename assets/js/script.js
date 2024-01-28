// import {config} from 'dotenv';
// config();

// const apiKey = process.env.API_KEY;
// if (!apiKey) {
//   console.error('API key is missing. Make sure it is set in your .env file.');
//   process.exit(1); // Exit the script if the API key is not available
// }




//global variables
let lat;
let lon;
let city;
let  searchedCities = []


$('#search-button').on('click', function(event) {
  event.preventDefault();
  city = $('#enter-city').val().trim();
  searchedCities.push(city);

  // use direct geocoding Api to get lat and long of the city
  var latAndLongQuery = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
  
  fetch(latAndLongQuery)
  .then(function(response){
    return response.json();
  })
  .then(function(data) {
     //get hold of lat and long of the entered city
    lat = data[0].lat;
    lon = data[0].lon;

    weatherApi();

   
  })

  
  renderCityButtons();

})


function capitalizeCityLetter(city){

const firstLetter = city.charAt(0)

const firstLetterCap = firstLetter.toUpperCase()

const remainingLetters = city.slice(1)

const capitalizedWord = firstLetterCap + remainingLetters

return capitalizedWord;

}


function weatherApi(){
  //use lat and lon coordinates to fetch weather info
  var weatherQuery = "http://api.openweathermap.org/data/2.5/forecast?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  fetch(weatherQuery)
  .then(function(response){
    return response.json();
  })
  .then(displayTodaysWeather) 


}


function renderCityButtons(){
  for (let i = 0; i < searchedCities.length; i++){
     
  //Dinamically generate buttons for each entered city
  var a = $("<button>");
  a.addClass("btn btn-secondary city-btn");
  //adding a data-attribute 
  a.attr("data-name", searchedCities[i]);
  //providing the initial button text
  a.text(searchedCities[i])
  //adding the city button to the history div
  $("#history").append(a);
  }
 
}

function displayTodaysWeather(data){
  //console.log(data);
  const cityName = capitalizeCityLetter(city);

$("#city-name").text(cityName + " ( " + dayjs().format('DD/MM/YYYY') + " )");


 
  console.log(data.city.name);
  const temp = data.list[0].main.temp;
  const wind = data.list[0].wind.speed;
  const humidity = data.list[0].main.humidity;
  //const  weatherPic = data.list.weather.icon;  
  //console.log(weatherPic)
  // const  weatherDescription = data.list.weather[0].description;

  // Creating an element to hold the weather image icon
  // var image = $("<img>")
  // .attr("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png")
  // .attr("alt", weatherDescription);


  // Creating an element to have the temp  displayed
  var temperatureToday = $("<p>").text("Temperature: " + temp + " C°");

  // Creating an element to have the wind displayed
  var windToday = $("<p>").text("Wind: " + wind + " KPH");

  // Creating an element to have the humidity displayed
  var humidityToday = $("<p>").text("Wind: " + humidity + " %");


 // $(".card-body").append(image);
  $(".card-body").append(temperatureToday);
  $(".card-body").append(windToday);
  $(".card-body").append(humidityToday);
}



function diplayFiveDaysForecats(){

}