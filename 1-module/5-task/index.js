function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str
  } else {
    let newStr = str.substring(0, maxlength - 1) + '…';
    return newStr
  }
}