import { format, parseISO } from "date-fns"; 

function startStorage () {
  localStorage.setItem("day", JSON.stringify([])); 
  localStorage.setItem("city", "Vancouver"); 
  localStorage.setItem("icons", JSON.stringify([])); 
}

//Fetch weather data
function getWeather (location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Chours&key=PDXRH7AMTXUDESG42HDMGSUS7&contentType=json`, {
        "method": "GET",
        "headers": {
        }
        })
      .then(response => {
        return response.json(); 
      })
      .then(response => {
        console.log(response); 
        const originArrDays = response.days; 
        const processedArrDays = []; 
        const processedArrIcons = []; 
        for (let i = 0; i < 7; i++) {
            let day = {
                icon: originArrDays[i].icon, 
                datetime: originArrDays[i].datetime, 
                temp: originArrDays[i].temp, 
                tempmax: originArrDays[i].tempmax, 
                tempmin: originArrDays[i].tempmin, 
                precipprob: originArrDays[i].precipprob, 
                windspeed: originArrDays[i].windspeed, 
                uvindex: originArrDays[i].uvindex, 
                humidity: originArrDays[i].humidity, 
                sunrise: originArrDays[i].sunrise, 
                sunset: originArrDays[i].sunset 
            }
            processedArrDays.push(day); 
            processedArrIcons.push(originArrDays[i].icon); 
        }
        console.log(processedArrDays); 
        localStorage.setItem("day", JSON.stringify(processedArrDays)); 
        localStorage.setItem("city", response.resolvedAddress); 
        localStorage.setItem("icons", JSON.stringify(processedArrIcons)); 
        displayWeather(); 
      })
      .catch(err => {
        console.error(err);
      });
}

//Display weather on each card
function displayWeather () {
  const city = document.querySelector("#city_name"); 
  const dates = document.querySelectorAll(".weather_days_card_date"); 
  const temps = document.querySelectorAll(".weather_days_card_temp"); 
  const tempMax = document.querySelectorAll(".weather_days_card_tempmax"); 
  const tempMin = document.querySelectorAll(".weather_days_card_tempmin"); 
  const icon = document.querySelectorAll(".weather_days_card_icon"); 
  const rainProb = document.querySelector("#weather_days_card_rainprob"); 
  const windSpeed = document.querySelector("#weather_days_card_windspeed"); 
  const uvindex = document.querySelector("#weather_days_card_uvindex"); 
  const humidity = document.querySelector("#weather_days_card_humidity"); 
  const sunrise = document.querySelector("#weather_days_card_sunrise"); 
  const sunset = document.querySelector("#weather_days_card_sunset"); 

  let weather = JSON.parse(localStorage.getItem("day")); 
  let icons = JSON.parse(localStorage.getItem("icons")); 
  let cityStr = localStorage.getItem("city"); 

  city.textContent = cityStr; 

  rainProb.textContent = `${weather[0].precipprob}%`; 
  windSpeed.textContent = `${weather[0].windspeed} km/h`; 
  uvindex.textContent = weather[0].uvindex; 
  humidity.textContent = `${weather[0].humidity}%`; 
  sunrise.textContent = weather[0].sunrise;  
  sunset.textContent = weather[0].sunset; 

  for (let i = 0; i < weather.length; i++) {
    dates[i].textContent = format(parseISO(weather[i].datetime), "cccc"); 
    temps[i].textContent = `${weather[i].temp}\u{00B0}C`; 
    tempMax[i].textContent = `Max: ${weather[i].tempmax}\u{00B0}C`; 
    tempMin[i].textContent = `Min: ${weather[i].tempmin}\u{00B0}C`;  
    import(`./images/3rd Set - Color/${icons[i]}.svg`).then(image => {
      icon[i].src = image.default; 
    });  
  }
}

export {getWeather, displayWeather, startStorage}; 