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
                }
                //City Name
                var cityName = document.querySelector(".city-name");
                //Displays Date
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
                console.log(data)
                for (var i = 2; i < data.list.length; i += 8) {
                    var fiveDates = (data.list[i].dt_txt);
                    var dateToString = new Date(fiveDates);
                    var dateToDisplayed = (dateToString.getMonth() + 1) + '/' + dateToString.getDate() + '/' + dateToString.getFullYear();
                    console.log(dateToDisplayed);

                    var futureWeather = document.querySelector(".weather-cards");
                    var div = document.createElement("div");
                    div.classList.add("day" + (i / 8 + 1));
                    div.innerHTML =
                        `<h3>${dateToDisplayed}</h3>
                         <img src="${"http://openweathermap.org/img/wn/" + data.list[i].weather[0] + "@2x.png"}" alt="${data.list[i].weather[0].main}" `
                    futureWeather.appendChild(div);
                }

                //Temperature is default in Kelvin. Convert to Celsius by subtracting by 273.15 deg
                // var temp = document.querySelector("#temperature");
                // temp.innerText = "The temperature is " + data.main.temp + " K.";
                // var kelvinTemp = data.main.temp;
                // var celsiusTemp = Math.floor(kelvinTemp - 273.15);
                // var farTemp = ((celsiusTemp * 9) / 5) + 32;
                // celsius.innerText = "That is " + celsiusTemp + " °C."
                // far.innerText = "Also known as " + farTemp + " °F."
            })
    });
}

getCity();

function onLoad() {
    if (localStorage.getItem('history')) {

    }
}
