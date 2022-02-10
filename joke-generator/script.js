"use strict";

const btnGetJoke = document.querySelector(".btnJoke");
const jokeText = document.querySelector(".jokeText");

const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");

const btnCharacters = document.querySelectorAll(".btnCharacters");

const btns = Array.from(btnCharacters);

const celebrities = [
  "Ryan Reynolds",
  "Chris Hemsworth",
  "Harry Styles",
  "Charles Chaplin",
  "Will Smith",
  "Elon Musk",
  "Jack Black",
  "Owen Wilson",
  "Justin Timberlake",
  "Tom Hanks",
  "Johnny Depp",
  "Jim Carrey",
  "Bill Gates",
  "Steve Harvey",
  "Tom Holland",
  "Chris Evans",
  "Tom Hiddleston",
  "Jon Favreau",
  "Sebastian Stan",
  "Steve Jobs",
];

// fetch joke and update it in UI
const updateJoke = function (url) {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      jokeText.innerHTML = data.value.joke;
    });
};

const getRandomName = (arr) => arr[Math.floor(Math.random() * arr.length)];

// add random names to btns on page-load
const refreshBtns = function (btns) {
  btns.forEach(function (ele) {
    ele.textContent = getRandomName(celebrities);
  });
};

// extract input from input-fields and update joke on UI
const extractInputAndUpdateJoke = function () {
  const firstName = inputFirstName.value || "Chuck";
  const lastName = inputLastName.value || "Norris";

  const url = `https://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`;

  updateJoke(url);
  refreshBtns(btns);
};

// EVENT HANDLERS

// adding event listeners to character btns to update input fields
btns.forEach(function (ele) {
  ele.addEventListener("click", function (e) {
    [inputFirstName.value, inputLastName.value] = ele.textContent.split(" ");
  });
});

// update joke on UI
btnGetJoke.addEventListener("click", function (e) {
  e.preventDefault();
  extractInputAndUpdateJoke();
});

// refresh btns on page-load
refreshBtns(btns);
