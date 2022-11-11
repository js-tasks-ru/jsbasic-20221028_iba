function checkSpam(str) {
  let newStr = '';
  for (let i = 0; i <= str.length - 1; i++) {
    newStr += (str[i].toLowerCase());
  }
  if (newStr.includes('1xbet') || newStr.includes('xxx')) {
    return true
  } else {
    return false
  }
}