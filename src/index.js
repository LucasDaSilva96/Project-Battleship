import "./style.css";
import { renderPlaceShipsSection, flip, renderPlaySection } from "./render.js";
import { dragShipToPlace, dragOver, dropShip, hit } from "./player.js";
renderPlaceShipsSection();

window.addEventListener("DOMContentLoaded", fixID);

const flip_btn = document.getElementById("flip");
flip_btn.addEventListener("click", flip);

const ready_btn = document.getElementById("ready");
ready_btn.addEventListener("click", renderPlaySection);

const ships_element = Array.from(document.querySelectorAll(".ship"));
ships_element.forEach((ship) =>
  ship.addEventListener("dragstart", dragShipToPlace)
);

const playerBlocks = document.querySelectorAll(".cell");
playerBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", dragOver);
  playerBlock.addEventListener("drop", dropShip);
});

const ai_cells = document.querySelectorAll(".ai-cell");
ai_cells.forEach((el) => {
  el.addEventListener("click", hit);
});

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
