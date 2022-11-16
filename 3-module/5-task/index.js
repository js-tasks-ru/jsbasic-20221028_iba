function getMinMax(str) {
    let result = {
        min: 0,
        max: 0,
    };
    let arr = str.split(' ').filter(i => parseFloat(i)).sort((a,b) => a - b);
    result.min = parseFloat(arr[0]);
    result.max = parseFloat(arr[arr.length - 1]);


    return result
}