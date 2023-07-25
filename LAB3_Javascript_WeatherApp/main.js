// Show date 
const date = new Date();
const year = date.getFullYear();
const day = date.getDate();

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October",
                "November", "December"];
let weekDay = days[date.getDay()];
let month =  months[date.getMonth()]

document.getElementById("current_date").innerHTML = weekDay + " " + day + " " + month + " " + year;


// Fetch weather details
const apiKey = "3327fb8fc02a46aff6295d4f23e4b951";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");


async function checkWeather(city){
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if(response.status == 404){
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
  else{

    var data = await response.json();

    if(data.sys.country === "IN")
    {
      country = ", India";
    }
    else
    {
      country = "";
    }

    document.querySelector("#city").innerHTML = data.name + country;
    document.querySelector("#degree").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector("#description").innerHTML = data.weather[0].description;
    document.querySelector(".minmax").innerHTML = Math.round(data.main.temp_min) + "°c / " + Math.round(data.main.temp_max) + "°c";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBox.addEventListener("search", ()=>{

  checkWeather(searchBox.value);

});