"use strict";

const textBox = document.getElementById("textbox");
// ops = operands and operators -> those which contribute to the expression
const ops = document.querySelectorAll(".op");

const allClear = document.getElementById("allClear");
const backspace = document.getElementById("Backspace");
const equate = document.getElementById("Enter");

textBox.textContent = "0";
let expression = "";

const allClearFunction = function () {
  expression = "";
  textBox.textContent = "0";
};

const backspaceFunction = function () {
  expression = expression.substring(0, expression.length - 1);

  if (expression === "") expression = "0";
  textBox.textContent = expression;
};

const equateFunction = function () {
  try {
    if (expression[0] === "0") expression = expression.slice(1);

    const res = eval(expression);
    let decimal = res - Math.floor(res) !== 0;

    if (decimal) textBox.textContent = res.toFixed(4);
    else textBox.textContent = res;
  } catch (err) {
    textBox.textContent = "Error..";
  }
  expression = "";
};

// click event handlers for operands and operators
for (let i = 0; i < ops.length; i++) {
  ops[i].addEventListener("click", function () {
    expression += ops[i].id;
    textBox.textContent = expression;
  });
}

// button event handlers for operands and operators
document.body.addEventListener("keydown", function (e) {
  for (let i = 0; i < ops.length; i++) {
    if (ops[i].id === e.key) {
      expression += ops[i].id;
      textBox.textContent = expression;
    }
  }

  if (e.key === "Enter") equateFunction();
  if (e.key === "Backspace") backspaceFunction();
  if (e.key === "Delete") allClearFunction();
});

allClear.addEventListener("click", allClearFunction);
backspace.addEventListener("click", backspaceFunction);
equate.addEventListener("click", equateFunction);
