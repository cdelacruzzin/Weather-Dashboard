//have queries linking search bar, search btn.
//when button is clicked, the value of the search bar is stored to a 'inputCity' variable
// add buttons dynamically to display a history of searched cities
//






var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');
var inputCity ="";


searchBtn.on('click', function(event) {
    event.preventDefault();
    inputCity = searchBar.val();
    console.log(inputCity);
})