var searchBtn = document.querySelector(".search-btn");
var searchInput = document.querySelector(".search-input");
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
                console.log(data);
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
                //Displays Date
                // console.log(data.dt);
                var dateDefault = Date(data.coord.dt);
                var dateToString = new Date(dateDefault);
                var dateToDisplayed = (dateToString.getMonth() + 1) + '/' + dateToString.getDate() + '/' + dateToString.getFullYear();
                cityName.innerText = data.name + ", " + data.sys.country + " " + "(" + dateToDisplayed + ")";
                //Icon code
                var iconCode = data.weather[0].icon;
                //Notes for the icon URL: @2x doubles the dimensions of the icon's image
                var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                var weatherIcon = document.querySelector(".weather-icon");
                weatherIcon.setAttribute("src", iconUrl);
                //Temp
                var todayTemp = document.querySelector(".today-temp");
                todayTemp.innerText = data.main.temp + " \u00B0" + "F";
                //Wind Speeds
                var todayWind = document.querySelector(".today-wind");
                todayWind.innerText = data.wind.speed + " MPH";
                //Humidity
                var todayHumidity = document.querySelector(".today-humidity");
                todayHumidity.innerText = data.main.humidity + "%";
            })

        fetch(fiveDayWeather)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                for (var i = 7; i < data.list.length; i += 8) {
                    var fiveDates = (data.list[i].dt_txt);
                    var dateToString = new Date(fiveDates);
                    var dateToDisplayed = (dateToString.getMonth() + 1) + '/' + dateToString.getDate() + '/' + dateToString.getFullYear();

                    var iconCode = data.list[i].weather[0].icon
                    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

                    var futureWeather = document.querySelector(".weather-cards");
                    var div = document.createElement("div");
                    div.classList.add("card");
                    div.innerHTML =
                        `<h3>${dateToDisplayed}</h3>
                         <img src=${iconUrl}>
                         <div>${data.list[i].main.temp + " \u00B0" + "F"}</div>
                         <div>${data.list[i].wind.speed + " MPH"}</div>
                         <div>${data.list[i].main.humidity + "%"}</div>`
                    futureWeather.appendChild(div);
                }

            })
    });
}

getCity();

var historyList = document.querySelector(".history");

function onLoad() {
    var displayCities = JSON.parse(localStorage.getItem("cityHistory")) ?? [];
    //.join("") gets rid of the commas from the array.map() method
    historyList.innerHTML = displayCities.map((city) => `<button class="button is-link is-light is-fullwidth mt-4 history-btns">${city.city}</button>`).join("");
}

onLoad();

historyList.addEventListener('click', function (event) {
    console.log(event.target.textContent);
})

