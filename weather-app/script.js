'use strict';

const btnGetWeather = document.querySelector('.btn');
const inputCityName = document.querySelector('#input-city-name');
const checkboxGetLocation = document.querySelector('#input-location-access');
const formContainer = document.querySelector('.form-container');

const URL = `https://api.openweathermap.org/data/2.5/weather?appid=3a934e357b5425fc7fe43648e75947a8&units=metric`;

const getLocation = function () {
	return new Promise((resolve, reject) =>
		navigator.geolocation.getCurrentPosition(resolve, reject)
	);
};

const inputCityNameEvent = function (e) {
	if (this.value !== '') {
		checkboxGetLocation.checked = false;
		btnGetWeather.disabled = false;
	} else {
		btnGetWeather.disabled = true;
	}
};

const checkboxGetLocationEvent = async function (e) {
	if (!e.target.checked) {
		btnGetWeather.disabled = true;
		return;
	}

	if (inputCityName.value !== '') inputCityName.value = '';

	btnGetWeather.disabled = false;

	try {
		const coords = await getLocation();
		const [lat, lon] = [coords.coords.latitude, coords.coords.longitude];
		checkboxGetLocation.value = `&lat=${lat}&lon=${lon}`;
	} catch (e) {
		console.log(e, 'Could not get location');
		alert('Could not get your location');
	}
};

const makeAPIrequest = async function (url) {
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

// if (btnGetWeather) btnGetWeather.disabled = true;

// clear checkbox on city name input
inputCityName.addEventListener('keydown', inputCityNameEvent);

// get location on checkbox "checked" and clear input city name field
checkboxGetLocation.addEventListener('change', checkboxGetLocationEvent);

btnGetWeather.addEventListener('click', async function (e) {
	e.preventDefault();

	let url = URL;
	if (inputCityName.value !== '') url += `&q=${inputCityName.value}`;
	else url += `&${checkboxGetLocation.value}`;

	const data = await makeAPIrequest(url);

	const markup = `<table>
    <tr>
      <th>City/Location</th>
      <th>Temperature (°C)</th>
      <th>Humidity (%)</th>
      <th>Pressure (hPa)</th>
    </tr>

    <tr>
      <td>${data.name}</td>
      <td>${data.main.temp}</td>
      <td>${data.main.humidity}</td>
      <td>${data.main.pressure}</td>
    </tr>
  </table>`;

	formContainer.innerHTML = markup;
});
