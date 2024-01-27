
// direct geocoding Api 
var latAndLongQuery = "http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid={APIkey}";

fetch(latAndLongQuery)
.then(function(response){
  return response.json();
})
.then(function(data) {
  console.log(data)
  //get hold of lat and long of the entered city
})



var weatherQuery = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIkey}";