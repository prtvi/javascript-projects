'use strict';

const btnGetJoke = document.querySelector('.btnJoke');
const jokeText = document.querySelector('.jokeText');

const inputName = document.getElementById('firstName');

const btnCharacters = document.querySelectorAll('.btnCharacters');
const btns = Array.from(btnCharacters);

const celebrities = [
	'Ryan',
	'Chris',
	'Harry',
	'Charles',
	'Will',
	'Elon',
	'Jack',
	'Owen',
	'Justin',
	'Tom',
	'Johnny',
	'Jim',
	'Bill',
	'Steve',
	'Tom',
	'Chris',
	'Tom',
	'Jon',
	'Sebastian',
	'Steve',
];

// fetch joke and update it on UI

// const updateJoke = function (url) {
//   fetch(url)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       jokeText.innerHTML = data.value.joke;
//     });
// };

const updateJoke = async function (url) {
	const response = await fetch(url);
	const data = await response.json();

	jokeText.textContent = data.value;
};

const getRandomName = arr => arr[Math.floor(Math.random() * arr.length)];

// add random names to btns on page-load
const refreshBtns = function (btns) {
	btns.forEach(function (ele) {
		ele.textContent = getRandomName(celebrities);
	});
};

// extract input from input-fields and update joke on UI
const extractInputAndUpdateJoke = function () {
	const name = inputName.value || 'Chuck';

	const url = `https://api.chucknorris.io/jokes/random?name=${name}`;

	updateJoke(url);
	refreshBtns(btns);
};

// EVENT HANDLERS

// adding event listeners to character btns to update input fields
btns.forEach(function (ele) {
	ele.addEventListener('click', function (e) {
		inputName.value = ele.textContent;
	});
});

// update joke on UI
btnGetJoke.addEventListener('click', function (e) {
	e.preventDefault();
	extractInputAndUpdateJoke();
});

// refresh btns on page-load
refreshBtns(btns);
