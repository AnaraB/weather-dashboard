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


$('#search-button').on('click', function(e) {
  var city = $('#enter-city').val().trim();
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


})





function weatherApi(){
  //use lat and lon coordinates to fetch weather info
  var weatherQuery = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  console.log(weatherQuery);
  fetch(weatherQuery)
  .then(function(response){
    return response.json();
  })
  .then(function(data) {
   console.log(data);


   
  })

}




