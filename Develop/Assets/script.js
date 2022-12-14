var searchBtn = document.querySelector(".search-btn");
var searchInput = document.querySelector(".search-input");
function getCity() {
    (searchBtn).addEventListener("click", function () {
        var city = searchInput.value;
        var weather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=942ef25f0bc73d998fa814566b74ba7e"

        fetch(weather)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            })
    });
}

getCity();
