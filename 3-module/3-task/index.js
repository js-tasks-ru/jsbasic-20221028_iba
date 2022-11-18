function camelize(str) {
  let arr = str.split('-').map((i, num) => (num > 0) ? i[0].toUpperCase() + i.substring(1) : i).join('');

  return arr;
}
