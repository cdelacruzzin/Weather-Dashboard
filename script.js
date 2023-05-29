var searchBtn = $('#searchBtn'); var searchBar = $('#searchBar'); var historyContainer = $('#history'); var curCity = $('#curCity'); var curDate = $('#curDate'); var curEmoji = $('#curEmoji'); var curtemp = $('#curtemp'); var curwind = $('#curwind'); var curhumidity = $('#curhumidity');


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

var todayWeather = {
    name: "",
    date: "",
    emoji: "",
    temp: "",
    wind: "",
    humidity: ""
}



function generateDateRange(startDate, numberOfDays) {
    let loopDays = numberOfDays + 1;
    for (let i = 1; i <= loopDays; i++) {
        dateRange.push(startDate.add(i, 'day').format('YYYY-MM-DD'));
    }
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
            //stores the weather reports to the todayWeather object
            todayWeather.name = data.name;
            todayWeather.date = currentDate;
            todayWeather.temp = convertTemp(data.main.temp);
            todayWeather.wind = convertWind(data.wind.speed);
            todayWeather.humidity = data.main.humidity;
            todayWeather.emoji = setEmoji(data.weather[0].icon);

            localStorage.setItem('todayWeather', JSON.stringify(todayWeather));


             fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('error: ' + response.status); //throws an error if city does not exist
                    }
                    return response.json();
                })
                .then(data => {
                    for (var a = -1; a < dateRange.length - 1; a++) { //iterates through the dateRange array (for the 5 days). 
                        for (var dataDayTxt of data.list) { //then iterates through all elements of the data list.
                            if (dataDayTxt.dt_txt.includes(dateRange[a])) { //checks if the element in the data list is the same day as the day in dateRange
                                dayTemps[a].date = dateRange[a];//assigns the values of the weather to the day in the dateRange
                                dayTemps[a].emoji = setEmoji(dataDayTxt.weather[0].icon)
                                dayTemps[a].temp = convertTemp(dataDayTxt.main.temp); //switch to C
                                dayTemps[a].wind = convertWind(dataDayTxt.wind.speed); //unit conversion meter/s to miles/hr
                                dayTemps[a].humidity = dataDayTxt.main.humidity;
                                break;
                            }
                        }
                    }
                    showWeather();
                })
            appendHistory(city_name);
        })
        
}


function setEmoji(icon) {
    var url = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return url;
}
function convertTemp(temp) {    //unit conversion
    return (temp - 273.15).toFixed(2);
}
function convertWind(wind) {     //unit conversio
    return (wind * 2.23694).toFixed(2);
}

//prints the inputted city's weather report
function showWeather() {
    curCity.text(todayWeather.name);
    curDate.text(todayWeather.date);
    curtemp.text(todayWeather.temp);
    curwind.text(todayWeather.wind);
    curhumidity.text(todayWeather.humidity);
    curEmoji.attr('src', todayWeather.emoji);

    for (var a = 0; a < dayTemps.length; a++) {
        var count = a + 1;
        var t = $(`#d${count}Temp`);
        t.text(dayTemps[a].temp);

        var t = $(`#d${count}Day`);
        t.text(dayTemps[a].date);

        var t = $(`#d${count}Emoji`);
        t.text(dayTemps[a].emoji);

        var t = $(`#d${count}Wind`);
        t.text(dayTemps[a].wind);

        var t = $(`#d${count}Humidity`);
        t.text(dayTemps[a].humidity);
    }
}

//prints the last searched weather report on reloads
function showLastWeather() {
    var savedTodayWeather = JSON.parse(localStorage.getItem('todayWeather'));
    //if there is data stored in local storage, it will show the weather report for the last saved city
    if((savedTodayWeather !== null)) {
        searchLonLan(savedTodayWeather.name);
        console.log(savedTodayWeather.name);
    } else {
        //if there is nothing in the local storage, will hide html
        console.log('bye');
    }
}

generateDateRange(startDate, numberOfDays);
// onClick function that stores the value of the search bar when clicked
searchBtn.on('click', function (event) {
    event.preventDefault();
    inputCity = searchBar.val();
    searchLonLan(inputCity);
});
// localStorage.clear();
showLastWeather();
