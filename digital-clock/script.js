"use strict";

const time = document.getElementById("time");

const getTime = function () {
  const now = new Date();

  return [now.getHours(), now.getMinutes(), now.getSeconds()];
};

const updateTime = function () {
  let [hours, minutes, seconds] = getTime();

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");

  time.textContent = `${hours}:${minutes}:${seconds}`;
};

setInterval(updateTime, 1000);
