import "./styles.css"; 
import { getWeather, startStorage } from "./weather";

const storage = ["day", "city", "icons"]; 
const form = document.querySelector("form"); 
const search = document.querySelector("#search"); 

for (let i = 0; i < storage.length - 1; i++) {
    if (!localStorage.getItem(storage[i])) {
        startStorage();  
        getWeather(localStorage.getItem("city")); 
    }
}

getWeather(localStorage.getItem("city")); 

form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    localStorage.setItem("city", search.value); 
    search.value = ""; 
    getWeather(localStorage.getItem("city")); 
})