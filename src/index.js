import "./style.css";
import { GAME_BOARD } from "./gameBoard.js";
import { SHIPS } from "./ship.js";

const rows = 10;
const columns = 10;
const battleshipBoard = new GAME_BOARD(rows, columns);

const PLAYER = new SHIPS();

// console.log(battleshipBoard);

// Place the battleship on the board
battleshipBoard.placeShip(PLAYER.destroyer, 4, 3, "horizontal");
battleshipBoard.receiveAttack(4, 3, PLAYER);
battleshipBoard.receiveAttack(4, 4, PLAYER);
// console.log(PLAYER.destroyer);

// ***
const AI_GAME_BOARD = new GAME_BOARD(10, 10);
const AI_SHIPS = new SHIPS();

console.log(AI_GAME_BOARD);
import { position_AI_Ship } from "./player.js";

for (let i = 0; i < 5; i++) {
  position_AI_Ship(AI_SHIPS, AI_GAME_BOARD, rows, columns);
}

console.log(AI_GAME_BOARD.receiveAttack(4, 5, AI_SHIPS));
console.log(AI_GAME_BOARD.receiveAttack(0, 1, AI_SHIPS));
