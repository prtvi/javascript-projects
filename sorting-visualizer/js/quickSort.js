async function partition(start, end) {
    pivotIndex = start;
    pivot = bars[pivotIndex];

    let i = start;
    let j = end;
    
    // bars[pivotIndex].style.background = red;
    
    bars[i].style.background = blue;
    bars[j].style.background = blue;

    while (i < j) {
        while (i < bars.length && bars[i] <= pivot) {
            i++;
        }
        while (j < bars.length && bars[j] > pivot) {
            j--;
        }

        if (i < j) {
            // let temp = bars[i];
            // bars[i] = bars[j];
            // bars[j] = temp;
            bars[i].style.background = blue;
            bars[j].style.background = blue;

            await waitForIt(delay);

            swap(bars[i], bars[j]);

            bars[i].style.background = white;
            bars[j].style.background = white;

        }
    }

    let temp = bars[j];
    bars[j] = bars[pivotIndex];
    bars[pivotIndex] = temp;

    return j;
}


function quickSort(start, end) {
    if (start < end) {
        let p = partition(start, end);

        quickSort(start, p - 1);
        quickSort(p + 1, end);
    }
}

function qSort(){
    console.log("Clicked quick sort button");

    quickSortButton.classList.add("button-clicked");
    enableBtns(false);

    quickSort(0, bars.length -1);

    quickSortButton.classList.remove("button-clicked");
    enableBtns(true);
}

// let arr = [4, 2, 2, 4, 6, 5, 3, 0, 9, -1, 20, 14];
// console.log(arr);
// quickSort(arr, 0, arr.length - 1);
// console.log(arr);

let quickSortButton = document.getElementById("quickBtn");
quickSortButton.addEventListener("click", qSort);

