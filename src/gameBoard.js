export class GAME_BOARD {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.board = [];
    // Initialize the board with empty cells
    for (let i = 0; i < rows; i++) {
      this.board.push(Array(columns).fill("empty"));
    }
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
        if (this.board[row][i] !== "empty") {
          // console.log("There is already a ship in the specified position.");
          return false;
        }
      }
      // Place the ship horizontally
      for (let i = col; i < col + ship.length; i++) {
        this.board[row][i] = ship;
        return true;
      }
    } else if (orientation === "vertical") {
      if (row + ship.length > this.rows) {
        // console.log("Ship cannot fit vertically at the specified position.");
        return false;
      }
      for (let i = row; i < row + ship.length; i++) {
        if (this.board[i][col] !== "empty") {
          // console.log("There is already a ship in the specified position.");
          return false;
        }
      }
      // Place the ship vertically
      for (let i = row; i < row + ship.length; i++) {
        this.board[i][col] = ship;
      }
      return true;
    }
  }

  // Function to attack a position on the board
  receiveAttack(row, col, player) {
    if (this.board[row][col] === "empty") {
      this.board[row][col] = "miss";
      return "miss";
    } else if (this.board[row][col] === "hit") {
      console.log("You already hit this position");
    } else {
      player.hit(this.board[row][col].type);
      player.isSunk(this.board[row][col].type);
      player.isGameOver();
      this.board[row][col] = "hit";
      return "hit";
    }
    if (this.board[row][col].numberOfHits === this.board[row][col].length) {
      console.log("You sank a ship!");
      return "You sank a ship!";
    }
  }
}
