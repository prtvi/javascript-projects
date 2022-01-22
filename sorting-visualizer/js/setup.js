let bars = [];
let white = "#ffffff"; // white -> unsorted
let red = "#ff0000"; // red -> traversal
let green = "#00ff00"; // green -> at right position after sorting
let blue = "#0000ff"; // blue -> swap

// delay in ms
let delay = 100;

const setup = () => {
  let barCount = 0;
  let barWidth = 8;

  let allBars = document.getElementById("all-bars");
  allBars.innerHTML = "";

  let width = window.innerWidth;

  for (let i = 0; i < (width * 0.8) / 10 - 1; i++) {
    let bar = document.createElement("div");

    bar.style.height = String(Math.floor(Math.random() * 450 + 10)) + "px";
    bar.style.width = `${String(barWidth)}px`;
    bar.classList.add("bar");

    allBars.appendChild(bar);
    barCount += 1;
  }

  bars = Array.from(allBars.children);

  console.log("Clicked new array button,", "barCount = ", barCount);
};

const onResize = () => {
  window.location.href = window.location.href;
};

const enableBtns = (enable = true) => {
  let allBtns = document.getElementsByClassName("sortBtn");
  allBtns = Array.from(allBtns);

  if (enable) {
    allBtns.forEach((element) => {
      element.disabled = false;
      element.classList.remove("button-disabled");
    });
  } else {
    allBtns.forEach((element) => {
      element.disabled = true;
      element.classList.add("button-disabled");
    });
  }
};

const swap = (el1, el2) => {
  const style1 = window.getComputedStyle(el1);
  const style2 = window.getComputedStyle(el2);

  const transform1 = style1.getPropertyValue("height");
  const transform2 = style2.getPropertyValue("height");

  el1.style.height = transform2;
  el2.style.height = transform1;
};

function waitForIt(millisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, millisec);
  });
}

let newArrayButton = document.getElementById("newArrayBtn");
newArrayButton.addEventListener("click", setup);

window.addEventListener("resize", onResize);
setup();
