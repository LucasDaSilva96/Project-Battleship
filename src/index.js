import "./style.css";
import {
  renderPlaceShipsSection,
  flip,
  renderPlaySection,
  renderPlayAgain,
} from "./render.js";
import { dragShipToPlace, dragOver, dropShip, hit } from "./player.js";
// Initialize the game by rendering the place ships section
renderPlaceShipsSection();
// Fix IDs for cells to ensure they have unique IDs
fixID();

// Event listener for the flip button to toggle ship rotation
const flip_btn = document.getElementById("flip");
flip_btn.addEventListener("click", flip);

// Event listener for the ready button to start the game
const ready_btn = document.getElementById("ready");
ready_btn.addEventListener("click", renderPlaySection);

// Event listeners for dragging ships
const ships_element = Array.from(document.querySelectorAll(".ship"));
ships_element.forEach((ship) =>
  ship.addEventListener("dragstart", dragShipToPlace)
);

// Event listeners for dropping ships onto the player's board
const playerBlocks = document.querySelectorAll(".cell");
playerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", dragOver);
  playerBlock.addEventListener("drop", dropShip);
});
// Event listeners for clicking on AI cells to make a move
const ai_cells = document.querySelectorAll(".ai-cell");
ai_cells.forEach((el) => {
  el.addEventListener("click", hit);
});

// Function to fix IDs for player and AI cells
function fixID() {
  const player_cells = document.querySelectorAll(".cell");
  const ai_cells = document.querySelectorAll(".ai-cell");

  let player_id = 0;
  let ai_id = 0;
  player_cells.forEach((cell) => {
    player_id++;
    cell.id = player_id;
  });

  ai_cells.forEach((cell) => {
    ai_id++;
    cell.id = ai_id;
  });
}
// Event listener for the "Play Again" button to restart the game
const play_again_btn = document.getElementById("play-again");
play_again_btn.addEventListener("click", function () {
  renderPlayAgain();
});

// Event listener for the "Quit" button to reload the page
const quit_btn = document.getElementById("quit");
quit_btn.addEventListener("click", () => window.location.reload());
