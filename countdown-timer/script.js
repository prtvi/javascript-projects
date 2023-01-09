"use strict";

const time = document.getElementById("time");

const inputHours = document.getElementById("hours");
const inputMinutes = document.getElementById("minutes");
const inputSeconds = document.getElementById("seconds");

const btnStart = document.querySelector(".btn-start");
const btnReset = document.querySelector(".btn-reset");

// get future time to which the timer will expire to, if any arg is "" then that arg is set to the same
const getFutureTime = function (now, hour, min, sec) {
  const future = new Date();

  if (hour === "") future.setHours(now.getHours());
  else future.setHours(now.getHours() + hour);

  if (min === "") future.setMinutes(now.getMinutes());
  else future.setMinutes(now.getMinutes() + min);

  if (sec === "") future.setSeconds(now.getSeconds());
  else future.setSeconds(now.getSeconds() + sec);

  return future;
};

const padTime = (t) => String(t).padStart(2, 0);

// formatting the time when hours is 0
const formatWOHours = function (hours, minutes, seconds) {
  if (hours === 0) return `${padTime(minutes)}:${padTime(seconds)}`;
  else if (hours === -1) {
    reset();
    return "TIME UP!";
  }

  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
};

// formatting the remaining time
const formatTime = function (distance) {
  const [hours, minutes, seconds] = [
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    Math.floor((distance % (1000 * 60)) / 1000),
  ];

  return formatWOHours(hours, minutes, seconds + 1);
};

let btnOn = false;
let timer;

const timerCallback = function (future) {
  const now = new Date();

  const distance = future - now;

  if (distance <= 0) {
    btnOn = btnStart.disabled = false;
    clearInterval(timer);
  }

  time.textContent = formatTime(distance);
};

// EVENT HANDLERS

btnStart.addEventListener("click", function (e) {
  if (!btnOn) {
    btnOn = btnStart.disabled = true;

    const inputs = [inputHours.value, inputMinutes.value, inputSeconds.value];

    if (inputs.some((inp) => inp !== "")) {
      const now = new Date();

      const future = getFutureTime(
        now,
        +inputHours.value,
        +inputMinutes.value,
        +inputSeconds.value
      );

      time.textContent = formatWOHours(
        +inputHours.value,
        +inputMinutes.value,
        +inputSeconds.value
      );

      timer = setInterval(timerCallback, 1000, future);
    } else btnOn = btnStart.disabled = false;
  }
});

const reset = function (e) {
  // e.preventDefault();
  inputHours.value = inputMinutes.value = inputSeconds.value = "";
  time.textContent = "00:00:00";

  if (timer) clearInterval(timer);

  btnOn = btnStart.disabled = false;
};

btnReset.addEventListener("click", reset);
