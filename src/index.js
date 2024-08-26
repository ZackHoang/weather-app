import "./styles.css"; 
import { getWeather, startStorage } from "./weather";

startStorage(); 
let data = getWeather("Ho Chi Minh");  
