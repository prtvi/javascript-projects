"use strict";

const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");

const f = function () {
  let now = new Date();
  let [hour, minute, second] = [
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  ];

  let h = 30 * hour + minute / 2;
  let m = 6 * minute;
  let s = 6 * second;

  hourHand.style.transform = `rotate(${h}deg)`;
  minuteHand.style.transform = `rotate(${m}deg)`;
  secondHand.style.transform = `rotate(${s}deg)`;
};

setInterval(f, 1000);
