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
}

//takes the city name as an argument
// dynamically creates a new property for the history object 
// the key will be the city name, the value will be a button
//creates a button element with the city name as its text and value, and a class of 'historyBtns'
//all buttons will be in the same class to share an onClick functionality
function appendHistory(city){
var btnName = $('<button>');
btnName.text(city);
btnName.val(city);
btnName.addClass('historyBns');

historyContainer.append(btnName);

history[city] = btnName;
console.log(history);
}



//checks if the 
function searchWeather(city) {
    
}



// onClick function that stores the value of the search bar when clicked
searchBtn.on('click', function(event) {
    event.preventDefault();
    inputCity = searchBar.val();
    appendHistory(inputCity);
});