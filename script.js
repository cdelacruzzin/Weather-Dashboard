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
//
function appendHistory(city){

}












// onClick function that stores the value of the search bar when clicked
searchBtn.on('click', function(event) {
    event.preventDefault();
    inputCity = searchBar.val();
    appendHistory();
});