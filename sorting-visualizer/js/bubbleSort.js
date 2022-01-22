async function bubbleSort() {
  console.log("Clicked bubble sort button");
  bubbleSortButton.classList.add("button-clicked");

  if (bars.length === 0) {
    return;
  }

  enableBtns(false);

  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      if (bars[j].offsetHeight > bars[j + 1].offsetHeight) {

        bars[j].style.background = blue;
        bars[j + 1].style.background = blue;

        await waitForIt(delay);

        swap(bars[j], bars[j + 1]);

        bars[j].style.background = white;
        bars[j + 1].style.background = white;

      }
    }
    bars[bars.length - 1 - i].style.background = green;
  }

  bubbleSortButton.classList.remove("button-clicked");
  enableBtns(true);
}

let bubbleSortButton = document.getElementById("bubbleBtn");
bubbleSortButton.addEventListener("click", bubbleSort);
