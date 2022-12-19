var searchBtn = document.querySelector(".search-btn");
var searchInput = document.querySelector(".search-input");
var historyList = document.querySelector(".history");

function getCity() {
    (searchBtn).addEventListener("click", function () {
        var city = searchInput.value;
        var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=942ef25f0bc73d998fa814566b74ba7e&units=imperial"
        var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=942ef25f0bc73d998fa814566b74ba7e&units=imperial"
        var cityArray = JSON.parse(localStorage.getItem("cityHistory")) ?? [];

        fetch(currentWeather)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //Store City into Local Storage
                saveCity();
                function saveCity() {
                    var city = {
                        city: data.name
                    };
                    cityArray.unshift(city);
                    cityArray.splice(5);
                    localStorage.setItem("cityHistory", JSON.stringify(cityArray));
                    onLoad();
                }

                //City Name
                var cityName = document.querySelector(".city-name");
                //Displays Date - converts raw data.coord.dt into a MM/DD/YYYY format
                var dateDefault = Date(data.coord.dt);
                var dateToString = new Date(dateDefault);
                var dateToDisplayed = (dateToString.getMonth() + 1) + '/' + dateToString.getDate() + '/' + dateToString.getFullYear();
                cityName.innerText = data.name + ", " + data.sys.country + " " + "(" + dateToDisplayed + ")";
                //Icon code - note that from midnight to noon, the icon codes will end in n for night, from noon to midnight the icon codes will end in d for day
                var iconCode = data.weather[0].icon;
                //Notes for the icon URL: @2x doubles the dimensions of the icon's image
                var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                var weatherIcon = document.querySelector(".weather-icon");
                weatherIcon.setAttribute("src", iconUrl);
                //Temp
                var todayTemp = document.querySelector(".today-temp");
                todayTemp.innerText = "Temp: " + data.main.temp + " \u00B0" + "F";
                //Wind Speeds
                var todayWind = document.querySelector(".today-wind");
                todayWind.innerText = "Wind: " + data.wind.speed + " MPH";
                //Humidity
                var todayHumidity = document.querySelector(".today-humidity");
                todayHumidity.innerText = "Humidity: " + data.main.humidity + "%";
            })

        fetch(fiveDayWeather)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var futureWeather = document.querySelector(".weather-cards");
                //clears old weather cards
                futureWeather.innerHTML = "";
                //creates current query's future forecast
                for (var i = 7; i < data.list.length; i += 8) {
                    var fiveDates = (data.list[i].dt_txt);
                    var dateToString = new Date(fiveDates);
                    var dateToDisplayed = (dateToString.getMonth() + 1) + '/' + dateToString.getDate() + '/' + dateToString.getFullYear();

                    var iconCode = data.list[i].weather[0].icon
                    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

                    var div = document.createElement("div");
                    div.classList.add("card", "m-5", "p-3", "is-narrow");
                    div.innerHTML =
                        `<h3 class="card-header-title is-size-4 is-centered">${dateToDisplayed}</h3>
                         <div class="card-content is-centered">
                         <div class="card-image has-text-centered">
                         <figure class="image is-inline-block">
                         <img src=${iconUrl}>
                         </figure>
                         </div>
                         <div class="is-size-5 has-text-centered">${"Temp: " + data.list[i].main.temp + " \u00B0" + "F"}</div>
                         <div class="is-size-5 has-text-centered">${"Wind: " + data.list[i].wind.speed + " MPH"}</div>
                         <div class="is-size-5 has-text-centered">${"Humidity: " + data.list[i].main.humidity + "%"}</div>
                         </div>`
                    futureWeather.appendChild(div);
                }

            })
    });
}

getCity();


function onLoad() {
    var displayCities = JSON.parse(localStorage.getItem("cityHistory")) ?? [];
    //.join("") gets rid of the commas from the array.map() method
    historyList.innerHTML = displayCities.map((city) => `<button class="button is-link is-light is-fullwidth mt-4 history-btns">${city.city}</button>`).join("");
}

onLoad();


historyList.addEventListener('click', function (event) {
    //Makes sure the event only occurs when the user clicks on a button in the historyList area
    var isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }

    //Weather fetching
    var city = event.target.textContent;
    var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=942ef25f0bc73d998fa814566b74ba7e&units=imperial"
    var fiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=942ef25f0bc73d998fa814566b74ba7e&units=imperial"
    var cityArray = JSON.parse(localStorage.getItem("cityHistory")) ?? [];
    fetch(currentWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //Store City into Local Storage
            saveCity();
            function saveCity() {
                var city = {
                    city: data.name
                };
                cityArray.unshift(city);
                cityArray.splice(5);
                localStorage.setItem("cityHistory", JSON.stringify(cityArray));
                onLoad();
            }
            // City Name
            var cityName = document.querySelector(".city-name");
            //Displays Date - converts raw data.coord.dt into a MM/DD/YYYY format
            var dateDefault = Date(data.coord.dt);
            var dateToString = new Date(dateDefault);
            var dateToDisplayed = (dateToString.getMonth() + 1) + '/' + dateToString.getDate() + '/' + dateToString.getFullYear();
            cityName.innerText = data.name + ", " + data.sys.country + " " + "(" + dateToDisplayed + ")";
            //Icon code - note that from midnight to noon, the icon codes will end in n for night, from noon to midnight the icon codes will end in d for day
            var iconCode = data.weather[0].icon;
            //Notes for the icon URL: @2x doubles the dimensions of the icon's image
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            var weatherIcon = document.querySelector(".weather-icon");
            weatherIcon.setAttribute("src", iconUrl);
            //Temp
            var todayTemp = document.querySelector(".today-temp");
            todayTemp.innerText = "Temp: " + data.main.temp + " \u00B0" + "F";
            //Wind Speeds
            var todayWind = document.querySelector(".today-wind");
            todayWind.innerText = "Wind: " + data.wind.speed + " MPH";
            //Humidity
            var todayHumidity = document.querySelector(".today-humidity");
            todayHumidity.innerText = "Humidity: " + data.main.humidity + "%";
        })

    fetch(fiveDayWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var futureWeather = document.querySelector(".weather-cards");
            futureWeather.innerHTML = "";
            for (var i = 7; i < data.list.length; i += 8) {
                var fiveDates = (data.list[i].dt_txt);
                var dateToString = new Date(fiveDates);
                var dateToDisplayed = (dateToString.getMonth() + 1) + '/' + dateToString.getDate() + '/' + dateToString.getFullYear();

                var iconCode = data.list[i].weather[0].icon
                var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

                var futureWeather = document.querySelector(".weather-cards");
                var div = document.createElement("div");
                div.classList.add("card", "m-5", "p-3", "is-narrow");
                div.innerHTML =
                    `<h3 class="card-header-title is-size-4 is-centered">${dateToDisplayed}</h3>
                     <div class="card-content is-centered">
                     <div class="card-image has-text-centered">
                     <figure class="image is-inline-block">
                     <img src=${iconUrl}>
                     </figure>
                     </div>
                     <div class="is-size-5 has-text-centered">${"Temp: " + data.list[i].main.temp + " \u00B0" + "F"}</div>
                     <div class="is-size-5 has-text-centered">${"Wind: " + data.list[i].wind.speed + " MPH"}</div>
                     <div class="is-size-5 has-text-centered">${"Humidity: " + data.list[i].main.humidity + "%"}</div>
                     </div>`
                futureWeather.appendChild(div);
            }

        })
})

