function merge(arr, low, mid, high) {
    let b = [];
    let i, j, k;

    i = low;
    j = mid + 1;
    k = low;

    while (i <= mid && j <= high) {
        if (arr[i] < arr[j]) {
            b[k] = arr[i];
            i++;
            k++;
        }
        else {
            b[k] = arr[j];
            j++;
            k++;
        }
    }
    while (i <= mid) {
        b[k] = arr[i];
        i++;
        k++;
    }
    while (j <= high) {
        b[k] = arr[j];
        j++;
        k++;
    }
    for (let i = low; i <= high; i++) {
        arr[i] = b[i];
    }
}

function mergeSort(arr, low, high) {
    if (low < high) {
        let mid = (low + high) / 2;
        mergeSort(arr, low, mid);
        mergeSort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }
}

let arr = [4, 2, 6, 5, 3, 0, 9, -1, 20, 14];
console.log(arr);
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
