async function selectionSort() {

    console.log("Clicked selection sort button");
    selectionSortBtn.classList.add('button-clicked');

    if (bars.length === 0) {
        return;
    }

    enableBtns(false);

    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        bars[i].style.background = blue;

        for (j = i + 1; j < bars.length; j++) {

            bars[j].style.background = red;

            await waitForIt(delay);

            if (bars[j].offsetHeight < bars[minIndex].offsetHeight) {
                bars[j].style.background = blue;

                if (minIndex != i) {
                    bars[minIndex].style.background = white;
                }

                minIndex = j;

            } else {
                bars[j].style.background = white;
            }

        }
        await waitForIt(delay);
        swap(bars[i], bars[minIndex]);

        bars[minIndex].style.background = white;
        bars[i].style.background = green;
    }
    bars[bars.length - 1].style.background = green;

    selectionSortBtn.classList.remove('button-clicked');
    enableBtns(true);
}

let selectionSortBtn = document.getElementById("selectionBtn");
selectionSortBtn.addEventListener("click", selectionSort);