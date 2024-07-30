let weather = {
    apiKey: "5a98edaafc098d703b66a03544b57dc0",
    unit: "metric",
    lastCity: "Denver",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=" + this.unit + "&appid=" + this.apiKey
        ).then((response) => response.json()).then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const unitSymbol = this.unit === "metric" ? "\u00B0C" : "\u00B0F";
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + unitSymbol;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " " + (this.unit === "metric" ? "km/h" : "mph");
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

document.querySelector(".unit-options").addEventListener("change", function () {
    weather.unit = this.value === "celsius" ? "metric" : "imperial";
    weather.search();
});

weather.fetchWeather(weather.lastCity);