/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render;
  }

  get render() {
    this.elem = document.createElement('table');
    this.elem.innerHTML = `<thead>
                              <tr>
                                  <th>Имя</th>
                                  <th>Возраст</th>
                                  <th>Зарплата</th>
                                  <th>Город</th>
                                  <th></th>
                              </tr>
                              <tbody>
                              </tbody>
                          </thead>`;
    const tableBody = this.elem.querySelector('tbody');
    tableBody.innerHTML = this.rows
      .map(({name, age, salary, city}) => {
        let tableRow = `<tr>
                          <td>${name}</td>
                          <td>${age}</td>
                          <td>${salary}</td>
                          <td>${city}</td>
                          <td><button>X</button></td>
                      </tr>`
        return tableRow
      }) 
      .join('');

      this.elem.addEventListener('click', this.onClick);

    return this.elem;
  }

  onClick(event) {
    if (event.target.tagName === 'BUTTON') {
      event.target.closest('TR').remove();
    }
  }
}
