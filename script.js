// Select elements
const searchBtn = document.querySelector("#search");
const searchInput = document.querySelector("input");

// Event listener for search button
searchBtn.addEventListener("click", async function () {
    const location = searchInput.value;
    if (location) {
        const data = await fetchWeather(location);
        if (data) {
            updateDOM(data);
        }
        searchInput.value = "";
    }
});

const tempratureElem = document.querySelector(".temprature");
const locationElem = document.querySelector(".location");
const emojiImg = document.querySelector(".emoji");
const timeElem = document.querySelector(".time");
const dayElem = document.querySelector(".Day");
const dateElem = document.querySelector(".Date");
const conditionElem = document.querySelector(".condition");

// Update DOM with weather data
function updateDOM(data) {
    const temp = data.current.temp_c;
    const location = data.location.name;
    const timeData = data.location.localtime;
    const [date, time] = timeData.split(" ");
    const iconLink = data.current.condition.icon;
    const condition = data.current.condition.text;

    tempratureElem.textContent = temp + "°C";
    locationElem.textContent = location;
    emojiImg.src = iconLink;
    dateElem.innerText = date;
    timeElem.innerText = time;
    conditionElem.innerText = condition;
}

// Fetch weather data from API
async function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=6fc74cf82bc44773a8a171855241407&q=${location}&aqi=no`;
    const response = await fetch(url);
    
    if (response.status === 400) {
        alert("Location is invalid");
        return null;
    } else if (response.status === 200) {
        return await response.json();
    }
}
