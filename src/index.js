import "./style.css";
import { renderPlaceShipsSection } from "./render.js";
import { flip, renderPlaySection } from "./render.js";
import { createGameBoard, createGameBoardAI } from "./gameBoard.js";
import { addShipPiece, dragShipToPlace, dragOver, dropShip } from "./player.js";
import { SHIPS } from "./ship.js";
renderPlaceShipsSection();

const flip_btn = document.getElementById("flip");
flip_btn.addEventListener("click", flip);

const ready_btn = document.getElementById("ready");
ready_btn.addEventListener("click", renderPlaySection);

const PLAYER_BOARD = createGameBoard();
const AI_BOARD = createGameBoardAI();

const carrier = new SHIPS("carrier", 5);
const battleship = new SHIPS("battleship", 4);
const cruiser = new SHIPS("cruiser", 3);
const submarine = new SHIPS("submarine", 3);
const destroyer = new SHIPS("destroyer", 2);

const ships = [carrier, battleship, cruiser, submarine, destroyer];

ships.forEach((ship) => addShipPiece("computer", ship));

const ships_element = Array.from(document.querySelectorAll(".ship"));
ships_element.forEach((ship) =>
  ship.addEventListener("dragstart", dragShipToPlace)
);

const playerBlocks = document.querySelectorAll(".cell");
playerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", dragOver);
  playerBlock.addEventListener("drop", dropShip);
});
