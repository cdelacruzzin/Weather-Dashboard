//have queries linking search bar, search btn.
//when button is clicked, the value of the search bar is stored to a 'inputCity' variable
// add buttons dynamically to display a history of searched cities
var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');
var historyContainer = $('#history');
var inputCity ="";










// will create a history container
// elements will be stored in an object
//the key will be the city name, the value will be a function

var history = {
    //Austin: searchWeather('Austin')
}

//takes the city name as an argument
// dynamically creates a new property for the history object 
// the key will be the city name, the value will be searchWeather()
//creates a button element with the city name as its text
//all buttons will be in the same class to share an onClick functionality
function appendHistory(city){
//history.${city} = searchWeather('${city}')
//history.Austin = searchWeather('Austin')
//creates buttonEL
//adds a class that all appended buttons will have
//buttonEL.text = ${city}
// button will look like : <button class="sameclass" onClick="searchWeather(${city}">
//appends this button to historyContainer

}



//checks if the 
function searchWeather(city) {
    
}



function hi() {
    console.log('ddddddd');
}






// onClick function that stores the value of the search bar when clicked
searchBtn.on('click', function(event) {
    event.preventDefault();
    inputCity = searchBar.val();
    appendHistory();
});