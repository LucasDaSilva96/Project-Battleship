export function position_AI_Ship(ai_player, ai_game_board, row, col) {
  let ship = findShip(ai_player);
  // Attempt to place the ship in random positions until successful
  while (true) {
    let ROW = generateRadomRowCol(row).row;
    let COL = generateRadomRowCol(col).col;
    let orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

    if (ai_game_board.placeShip(ship, ROW, COL, orientation)) {
      return true;
    }
  }
}

function findShip(ai_ship) {
  let ship = undefined;
  Object.values(ai_ship).forEach((val) => {
    if (val.amountOfShips > 0) {
      return (ship = val);
    }
  });
  ai_ship.updateNumberOfShips(ship.type);
  return ship;
}

function generateRadomRowCol(rows) {
  let row = generateRadomNr(rows);
  let column = generateRadomNr(rows);
  if (row === column) {
    return generateRadomRowCol(rows);
  }

  return {
    row: row,
    col: column,
  };
}

function generateRadomNr(max) {
  return Math.floor(Math.random() * max);
}
