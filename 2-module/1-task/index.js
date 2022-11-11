function sumSalary(salaries) {
  let salariesSumm = 0;
  Object.values(salaries).forEach((salary) => {
    
    if (typeof salary === 'number' && !isNaN(salary) && salary !== Infinity && salary !== -Infinity) {
      salariesSumm += salary
    }
  });
  return salariesSumm
}
