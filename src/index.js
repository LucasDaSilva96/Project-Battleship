import "./style.css";
import { GAME_BOARD } from "./gameBoard.js";
import { SHIPS } from "./ship.js";
import { renderPlaceShipsSection } from "./render.js";
import { createGameBoard } from "./gameBoard.js";
import { position_AI_Ship } from "./player.js";

const rows = 10;
const columns = 10;
let GAME_BOARD_ARRAY_PLAYER = new GAME_BOARD(rows, columns, createGameBoard());
let GAME_BOARD_ARRAY_AI = new GAME_BOARD(rows, columns, createGameBoard());

const PLAYER_SHIPS = new SHIPS();

// Place the battleship on the board
GAME_BOARD_ARRAY_PLAYER.placeShip(PLAYER_SHIPS.destroyer, 4, 3, "horizontal");
// battleshipBoard.receiveAttack(4, 3, PLAYER);
// battleshipBoard.receiveAttack(4, 4, PLAYER);
// console.log(PLAYER.destroyer);

// ***
const AI_SHIPS = new SHIPS();

function place_ai_ships() {
  for (let i = 0; i < 5; i++) {
    position_AI_Ship(AI_SHIPS, GAME_BOARD_ARRAY_AI, rows, columns);
  }
}
place_ai_ships();

// console.log(AI_GAME_BOARD.receiveAttack(4, 5, AI_SHIPS));
// console.log(AI_GAME_BOARD.receiveAttack(0, 1, AI_SHIPS));

renderPlaceShipsSection();

const ship_img_box = document.querySelectorAll(".ship-img-box");

function test() {
  ship_img_box.forEach((el) => {
    el.addEventListener("click", function () {
      reset();
      el.classList.add("selected");
      el.dataset.isempty = "true";
    });
  });
}
test();

function reset() {
  ship_img_box.forEach((el) => {
    el.classList.remove("selected");
  });
}
