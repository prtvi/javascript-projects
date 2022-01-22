async function insertionSort() {

    console.log("Clicked insertion sort button");
    insertionSortButton.classList.add('button-clicked');

    if (bars.length === 0) {
        return;
    }

    enableBtns(false);

    bars[0].style.background = green;
    for (let i = 1; i < bars.length; i++) {
        let currentHeight = bars[i].style.height;

        bars[i].style.background = blue;
        let j = i - 1;

        await waitForIt(delay);

        while (j >= 0 && (parseInt(currentHeight) < parseInt(bars[j].style.height))) {

            bars[j].style.background = blue;

            // shift
            bars[j + 1].style.height = bars[j].style.height;
            j--;

            await waitForIt(delay);

            for (let k = i; k >= 0; k--) {
                bars[k].style.background = green;
            }
        }
        bars[j + 1].style.height = currentHeight;

        bars[i].style.background = green;
    }

    insertionSortButton.classList.remove('button-clicked');
    enableBtns(true);
}

let insertionSortButton = document.getElementById("insertionBtn");
insertionSortButton.addEventListener("click", insertionSort);
