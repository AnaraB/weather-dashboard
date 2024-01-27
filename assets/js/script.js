require('dotenv').config();
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error('API key is missing. Make sure it is set in your .env file.');
  process.exit(1); // Exit the script if the API key is not available
}

// direct geocoding Api 
var latAndLongQuery = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" + apiKey;

fetch(latAndLongQuery)
.then(function(response){
  return response.json();
})
.then(function(data) {
  console.log(data)
  //get hold of lat and long of the entered city
})



// var weatherQuery = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIkey}";