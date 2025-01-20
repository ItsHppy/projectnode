const API = "69eea7577f7bdf59547ca01ebad31937";
const API_KEY = '4d0acb5c587ea09e45d027229439b325';
const dayEl = document.querySelector(".default_day");
const dateEl = document.querySelector(".default_date");
const btnEl = document.querySelector(".form__input");
const inputEl = document.querySelector(".input_field");


document.body.style.backgroundImage = `url("image/image${Math.floor(Math.random() * (5 - 1) + 1)}.jpg")`;

const iconsContainer = document.querySelector(".icons");
const dayInfoEl = document.querySelector(".day_info");
const listContentEl = document.querySelector(".list_content ul");

const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

let map; 
const day = new Date();
const dayName = days[day.getDay()];
dayEl.textContent = dayName;

let month = day.toLocaleString("default", { month: "long" });
let date = day.getDate();
let year = day.getFullYear();

dateEl.textContent = date + " " + month + " " + year;

let day1 = date + ' ' + month;
let day2 = date + 1 + '   ' + month;
let day3= date + 2 + '   ' + month;
let day4 = date + 3 + '   ' + month;

document.querySelector(".list_content > ul > :nth-child(1) > span").innerHTML = day1 ;
document.querySelector(".list_content > ul > :nth-child(2) > span").innerHTML = day2;
document.querySelector(".list_content > ul > :nth-child(3) > span").innerHTML = day3;
document.querySelector(".list_content > ul > :nth-child(4) > span").innerHTML = day4;


document.querySelector('.content_section > h2').innerHTML = `Привет, ${localStorage.getItem('xyu')}`;


DG.then(function () {
  map = DG.map('map', {
    center: {
      lat:  53.9024716 ,
      lng: 27.5618225
    },
    zoom: 11

  });
});



async function getGeo(name) {
	const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
	const response = await fetch(geoUrl);
	const data = await response.json();
	return data;
}

async function getWeather(lat, lon) {
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
	const response = await fetch(weatherUrl);
	const data = await response.json();
	return data;
}

function changeMap(lat1, lng1){
  map.setView([lat1, lng1], '11')

}

const form = document.querySelector('#form');
const input = document.querySelector('.form__input');

form.onsubmit = submitHandler;

async function submitHandler(e) {
	e.preventDefault();

	if (!input.value.trim()) {
		console.log('Enter City name');
		return;
	}
    const cityName = input.value.trim();
    input.value = ''

	const cityInfo = await getGeo(cityName);    
  
  let latCity = cityInfo[0].lat;
  let lonCity = cityInfo[0].lon;
  
  changeMap(latCity, lonCity);
  console.log(latCity, lonCity)


    if (!cityInfo.length) return;

	const weatherInfo = await getWeather(
		cityInfo[0]['lat'],
		cityInfo[0]['lon']
	);



	const weatherData = {
		name: weatherInfo.name,
		temp: weatherInfo.main.temp,
		humidity: weatherInfo.main.humidity,
		speed: weatherInfo.wind.speed,
		main: weatherInfo.weather[0]['main'],
	};

	renderWeatherData(weatherData);
}

function renderWeatherData(data) {
    document.querySelector('.weather__info').classList.remove('none');
    document.querySelector('.weather__details').classList.remove('none');

    const temp = document.querySelector('.weather__temp');
    const city = document.querySelector('.weather__city');
    const humidity = document.querySelector('#humidity');
    const speed = document.querySelector('#speed');
    const har = document.querySelector('#har');

    temp.innerText = Math.round(data.temp) + '°c';
    city.innerText = data.name;
    humidity.innerText = data.humidity + '%';
    speed.innerText = data.speed + ' km/h';
    har.innerText = data.main;
    document.querySelector(".list_content > ul > :nth-child(1) > span").innerHTML = day1 + ' ' + Math.round(data.temp) + '°c' ;
    document.querySelector(".list_content > ul > :nth-child(2) > span").innerHTML = day2 + ' ' + Math.round(data.temp + (-1)) +'°c' ;
    document.querySelector(".list_content > ul > :nth-child(3) > span").innerHTML = day3 + ' ' + Math.round(data.temp + (-2) ) + '°c' ;
    document.querySelector(".list_content > ul > :nth-child(4) > span").innerHTML = day4 + ' ' + Math.round(data.temp + 2) +'°c' ;
}

document.querySelector('.sun').addEventListener("mousedown",(event)=> {
  window.location = './okno/index.html';
});




if(!''){
  console.log(0)
}