function camelize(str) {
  let arr = str.split("-");
    let upperCaseArr = arr.map((i, num) => {
        if (num > 0) {
            return i[0].toUpperCase() + i.substring(1);
        } else {
            return i;
        }
    });

    let newStr = upperCaseArr.join("");
    return newStr;
}
