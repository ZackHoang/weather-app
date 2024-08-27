function startStorage() {
    if (localStorage.length != 0) {
        localStorage.clear(); 
    }
    localStorage.setItem("day", JSON.stringify([])); 
    localStorage.setItem("hours", JSON.stringify([])); 
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
        for (let i = 0; i < 7; i++) {
            let day = {
                icon: originArrDays[i].icon, 
                datetime: originArrDays[i].datetime, 
                temp: originArrDays[i].temp, 
                tempmax: originArrDays[i].tempmax, 
                tempmin: originArrDays[i].tempmin, 
                precipprob: originArrDays[i].precipprob, 
            }
            processedArrDays.push(day); 
        }
        console.log(processedArrDays); 
        localStorage.setItem("day", JSON.stringify(processedArrDays)); 
      })
      .catch(err => {
        console.error(err);
      });
}

export {getWeather, startStorage}; 