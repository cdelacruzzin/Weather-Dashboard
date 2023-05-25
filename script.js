var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');
var historyContainer = $('#history');
var inputCity = "";

// will create a history container
// elements will be stored in an object
//the key will be the city name, the value will be a function
var history = {
}


var currentDate = dayjs().format('YYYY-MM-DD'); // Get the current date and format it as 'YYYY-MM-DD'
var startDate = dayjs(currentDate); // Set the current date as the start date
var endDate = startDate.add(5, 'day');// Add 5 days to the start date to get the end date
var numberOfDays = 5;
var dateRange = [];

//an array of objects for each day's weather report
var dayTemps = [
    dayOne = {
        date: "",
        emoji: "",
        temp: "",
        wind: "",
        humidity: ""
    },
    dayTwo = {
        date: "",
        emoji: "",
        temp: "",
        wind: "",
        humidity: ""
    },
    dayThree = {
        date: "",
        emoji: "",
        temp: "",
        wind: "",
        humidity: ""
    },
    dayFour = {
        date: "",
        emoji: "",
        temp: "",
        wind: "",
        humidity: ""
    },
    dayFive = {
        date: "",
        emoji: "",
        temp: "",
        wind: "",
        humidity: ""
    }]




function generateDateRange(startDate, numberOfDays) {
    for (let i = 0; i <= numberOfDays; i++) {
        dateRange.push(startDate.add(i, 'day').format('YYYY-MM-DD'));
    }
    console.log(dateRange);
}

//takes the city name as an argument
// dynamically creates a new property for the history object 
// the key will be the city name, the value will be a button
//creates a button element with the city name as its text and value, and a class of 'historyBtns'
//all buttons will be in the same class to share an onClick functionality
function appendHistory(city) {
    var btnName = $('<button>');
    btnName.text(city);
    btnName.val(city);
    btnName.addClass('historyBns');
    historyContainer.append(btnName);
    history[city] = btnName;
}



//gets the longitude and latitude of the inputted city
var API_key = 'd4c5beab8e001bfce3529767a56a26ea';
var lon;
var lat;

function searchLonLan(city_name) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('error: ' + response.status); //throws an error if city does not exist
            }
            return response.json();
        })
        .then(data => {
            lat = data.coord.lat; //stores logitude/latitude from data to corresponding variables
            lon = data.coord.lon;

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('error: ' + response.status); //throws an error if city does not exist
                    }
                    return response.json();
                })
                .then(data => {

                    for (var a = 0; a < dateRange.length; a++) {
                        for (var dataDayTxt of data.list) {
                            if (dataDayTxt.dt_txt.includes(dateRange[a])) {

                                var date = dateRange[a];
                                var emoji = '';
                                var temp = dataDayTxt.main.temp; //switch to C
                                var wind = dataDayTxt.wind.speed; //unit conversion meter/s to miles/hr
                                var humidity = dataDayTxt.main.humidity;


                                console.log(dataDayTxt);
                                addReports(a, date, emoji, temp, wind, humidity)
                                break;
                            }
                        }
                    }


                })
        })
}

function addReports(a, date, emoji, temp, wind, humidity) {
    

}






















generateDateRange(startDate, numberOfDays);

// onClick function that stores the value of the search bar when clicked
searchBtn.on('click', function (event) {
    event.preventDefault();
    inputCity = searchBar.val();

    searchLonLan(inputCity);

});