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
}



//gets the longitude and latitude of the inputted city
var API_KEY = 'd4c5beab8e001bfce3529767a56a26ea';
var longitude;
var latitude;
function searchLonLan(city_name) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`

    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw new Error ('error: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        latitude =data.coord.lat;
        longitude = data.coord.lon

        appendHistory(city_name);
    })
}



// onClick function that stores the value of the search bar when clicked
searchBtn.on('click', function(event) {
    event.preventDefault();
    inputCity = searchBar.val();
    
    searchLonLan(inputCity);
    
});