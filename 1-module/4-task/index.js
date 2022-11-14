function checkSpam(str) {
  let newStr = '';
  for (let i = 0; i <= str.length - 1; i++) {
    newStr += (str[i].toLowerCase());
  }
  return newStr.includes('1xbet') || newStr.includes('xxx')
}