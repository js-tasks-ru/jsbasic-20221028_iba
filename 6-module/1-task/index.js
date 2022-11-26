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
  }

  createRow(tbody) {
    this.rows.forEach(row => {
      // линия tr
      const tableLine = document.createElement('tr');
      const removeButton = `<button type="button">X</button>`;
      tbody.append(tableLine);
      row.button = removeButton;

      // ячейки td
      this.createCell(row, tableLine);
    });
  }

  createCell(row, tableLine) {
    // ячейки td
    Object.values(row).forEach(cell => {
      const tableCell = document.createElement('td');
      tableLine.append(tableCell);
      tableCell.innerHTML = cell;
    });
  }

  remove(tbody) {
    tbody.addEventListener('click', function(event) {
      event.preventDefault();
      if (event.target.tagName === 'BUTTON') {
        event.target.parentNode.parentNode.remove();
      }
    })
  }

  get elem() {
    const tableLayout = document.createElement('table');
    const tableHead = `
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>`;
    tableLayout.innerHTML = tableHead;
    const tbody = document.createElement('tbody');
    document.body.append(tableLayout);
    tableLayout.append(tbody);

    this.createRow(tbody);
    this.remove(tbody);
    return tableLayout
  }
}
