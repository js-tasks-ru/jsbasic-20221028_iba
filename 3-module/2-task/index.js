function filterRange(arr, a, b) {
  let newArr = arr.filter((i) => a <= i && i <= b);
    return newArr;
}
