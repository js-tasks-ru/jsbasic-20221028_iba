function makeDiagonalRed(table) {
  const rows = Array.from(table.rows);

  rows.forEach((row, rowNumber) => {
    const cells = Array.from(row.cells);

    cells.forEach((cell, cellNumber) => {
      if (rowNumber === cellNumber) {
        cell.style.backgroundColor = 'red';
      }
    });
  });
}
