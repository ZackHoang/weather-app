function startStorage() {
    if (localStorage.length != 0) {
        localStorage.clear(); 
    }
    localStorage.setItem("data", JSON.stringify([])); 
}

//Fetch weather data
function getWeather (location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=PDXRH7AMTXUDESG42HDMGSUS7&contentType=json`, {
        "method": "GET",
        "headers": {
        }
        })
      .then(response => {
        return response.json(); 
      })
      .then(response => {
        console.log(response); 
        const originArr = response.days; 
        const processedArr = []; 
        for (let i = 0; i < 7; i++) {
            let day = {
                icon: originArr[i].icon, 
                datetime: originArr[i].datetime, 
                temp: originArr[i].temp, 
                tempmax: originArr[i].tempmax, 
                tempmin: originArr[i].tempmin, 
                precipprob: originArr[i].precipprob, 
            }
            processedArr.push(day); 
        }
        console.log(processedArr); 
        localStorage.setItem("data", JSON.stringify(processedArr)); 
      })
      .catch(err => {
        console.error(err);
      });
}

export {getWeather, startStorage}; 