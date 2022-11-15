function showSalary(users, age) {
  let str = '';
  let filterArr = users.filter(user => (user.age <= age) ? user : false);

  filterArr.forEach((element) => str += `${element.name}, ${element.balance}\n`);
  return str.slice(0, -1)
}
