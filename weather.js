const COORDS = 'coords';
const API_KEY = "01ba8b15ff74cea7caee9c5fa41fa6e7";
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		const temperature = json.main.temp;
		const place = json.name;
		weather.innerText = `${temperature}℃ @ ${place}`;
	});
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError(){
	console.log('Cant access geo location')
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);	
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null){
		askForCoords();
	} else {
		const parseCoords = JSON.parse(loadedCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init(){
	loadCoords();
}

init();