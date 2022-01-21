"use strict";

const textBox = document.getElementById("textbox");
const ops = document.querySelectorAll(".op");

const allClear = document.getElementById("allClear");
const backspace = document.getElementById("backspace");
const equate = document.getElementById("eq");

textBox.textContent = "0";

let expression = "";

for (let i = 0; i < ops.length; i++) {
  ops[i].addEventListener("click", function () {
    expression += ops[i].id;
    textBox.textContent = expression;
  });
}

allClear.addEventListener("click", function () {
  expression = "";
  textBox.textContent = "0";
});

backspace.addEventListener("click", function () {
  expression = expression.substring(0, expression.length - 1);

  if (expression === "") expression = "0";
  textBox.textContent = expression;
});

equate.addEventListener(
  "click",
  () => (textBox.textContent = Number(eval(expression)).toPrecision(6))
);
