const playerBoard = document.querySelector(".place-ships-game-board");
const aiBoard = document.querySelector(".place-ships-Ai-game-board");

let ID = 0;
export function createGameBoard() {
  ID = 0;
  const cells = Array.from(playerBoard.children);

  const gameBoardArray = [];

  cells.forEach((cell) => {
    ID++;
    cell.id = ID;
    gameBoardArray.push(cell);
  });

  return gameBoardArray;
}

export function createGameBoardAI() {
  const cells = Array.from(aiBoard.children);

  const gameBoardArray = [];

  ID = 0;

  cells.forEach((cell) => {
    ID++;
    cell.id = ID;
    gameBoardArray.push(cell);
  });

  return gameBoardArray;
}
