export class GAME_BOARD {
  constructor(rows, columns, board) {
    this.rows = rows;
    this.columns = columns;
    this.board = board;
  }

  // Function to place a ship on the board
  placeShip(ship, row, col, orientation) {
    // Check if the ship can be placed in the given position
    if (orientation === "horizontal") {
      if (col + ship.length > this.columns) {
        // TODO******
        // console.log("Ship cannot fit horizontally at the specified position.");
        return false;
      }
      for (let i = col; i < col + ship.length; i++) {
        if (!this.board[row][i].className === "cell empty") {
          // console.log("There is already a ship in the specified position.");
          return false;
        }
      }
      // Place the ship horizontally
      for (let i = col; i < col + ship.length; i++) {
        this.board[row][i].className = "cell";
        this.board[row][i] = ship;
        return true;
      }
    } else if (orientation === "vertical") {
      if (row + ship.length > this.rows) {
        // console.log("Ship cannot fit vertically at the specified position.");
        return false;
      }
      for (let i = row; i < row + ship.length; i++) {
        if (!this.board[row][i].className === "cell empty") {
          // console.log("There is already a ship in the specified position.");
          return false;
        }
      }
      // Place the ship vertically
      for (let i = row; i < row + ship.length; i++) {
        this.board[row][i].className = "cell";
        this.board[i][col] = ship;
      }
      return true;
    }
  }

  // Function to attack a position on the board
  receiveAttack(row, col, player) {
    if (this.board[row][col].className === "cell") {
      this.board[row][col].className = "cell miss";
      return "miss";
    } else if (this.board[row][col].className === "cell hit") {
      console.log("You already hit this position");
    } else {
      player.hit(this.board[row][col].type);
      player.isSunk(this.board[row][col].type);
      player.isGameOver();
      this.board[row][col].className = "cell hit";
      return "hit";
    }
    if (this.board[row][col].numberOfHits === this.board[row][col].length) {
      console.log("You sank a ship!");
      return "You sank a ship!";
    }
  }
}

// Create a 2D array to represent the game board
export function createGameBoard() {
  const gameBoardArray = [];
  // The game board container
  const gameBoardContainer = document.querySelector(".place-ships-game-board");
  // All rows within the game board
  const rows = gameBoardContainer.querySelectorAll(".col");
  // Iterate through the rows
  rows.forEach((colElement) => {
    // Create an array to represent a row
    const rowArray = [];

    // Select all cells within the row
    const cells = colElement.querySelectorAll(".cell");

    // Iterate through the cells in the row
    cells.forEach((cellElement) => {
      cellElement.className = "cell empty";
      // Add each cell to the row array
      rowArray.push(cellElement);
    });

    // Add the row array to the game board array
    gameBoardArray.push(rowArray);
  });

  return gameBoardArray;
}
