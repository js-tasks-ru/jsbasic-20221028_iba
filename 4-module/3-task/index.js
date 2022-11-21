function highlight(table) {
  const lines = table.querySelectorAll('tbody tr');

  // tr tags
  lines.forEach(line => {
    const cells = line.querySelectorAll('td');
    const age = cells[1];
    const sex = cells[2];
    const availability = cells[3];

    // Добавить inline-стиль style="text-decoration: line-through", если значение ячейки Age меньше 18.
    if (parseFloat(age.textContent) < 18) {line.style.textDecoration = 'line-through'};

    // Проставить класс male/female в зависимости от содержимого ячейки Gender. Если её значение m – класс male, Если её значение f – класс female.
    if (sex.textContent.includes('m')) {line.classList.add('male')} else if (sex.textContent.includes('f')) {line.classList.add('female')};

    //Проставить атрибут hidden, если атрибута data-available нет вообще.
    if (availability.dataset.available === undefined) {
      line.hidden = true;
      // Проставить класс available/unavailable в зависимости от значения атрибута data-available у ячейки Status. Если её значение true – класс available, если её значение false – класс unavailable.
    } else if (availability.dataset.available === 'true') {
      line.classList.add('available');
    } else if (availability.dataset.available === 'false') {
      line.classList.add('unavailable');
    }
  });
}
