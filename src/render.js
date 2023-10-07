import { SHIPS } from "./ship.js";
import { addShipPiece } from "./player.js";
// DOM elements
const play_button = document.getElementById("play-btn");
const place_ships_section = document.querySelector(".ships-to-place-container");
const play_button_box = document.querySelector(".play-btn-box");
const title = document.getElementById("title");

// This is for rendering the place ships section
export function renderPlaceShipsSection() {
  play_button.addEventListener("click", play_event);
}

// This is for hiding the play button box and show the place ships section
function play_event() {
  place_ships_section.classList.toggle("hidden");
  play_button_box.classList.toggle("hidden");
  title.classList.toggle("hidden");
  document.querySelector("footer").classList.add("hidden");
  document.querySelector(".player-container").classList.remove("hidden");
  document.querySelector(".quit-box").classList.toggle("hidden");
}

const ships_draggable = document.querySelectorAll(".ship");
// Initialize angle for ship rotation
export let angle = 0;
// Function to toggle ship rotation
export function flip() {
  angle = angle === 0 ? 90 : 0;

  ships_draggable.forEach(
    (ship) => (ship.style.transform = `rotate(${angle}deg)`)
  );
}

// Function to render the play section
export function renderPlaySection() {
  const msgBox = document.getElementById("message-box");
  const ships_container = document.querySelector(".ships-container");
  const ai_board_container = document.querySelector(
    ".place-ships-Ai-game-board"
  );
  ships_container.classList.add("hidden");
  ai_board_container.classList.remove("hidden");
  msgBox.textContent = "You turn!";
  // Define AI's ships
  const carrier = new SHIPS("carrier", 5);
  const battleship = new SHIPS("battleship", 4);
  const cruiser = new SHIPS("cruiser", 3);
  const submarine = new SHIPS("submarine", 3);
  const destroyer = new SHIPS("destroyer", 2);
  // Add AI's ships to the board
  let AI_SHIPS = [carrier, battleship, cruiser, submarine, destroyer];
  AI_SHIPS.forEach((ship) => addShipPiece("computer", ship));
}

// Function to render game over message
export function renderGameOver(message) {
  const message_H1 = document.getElementById("modal-heading");
  const inGameSection = document.querySelector(".ships-to-place-container");
  const playerBoard = document.querySelector(".place-ships-game-board");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  // Show game over modal after a delay
  setTimeout(() => {
    inGameSection.classList.add("hidden");
    playerBoard.classList.add("hidden");
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    message_H1.textContent = `You ${message}`.toUpperCase();
  }, 2000);
  // Handle play again button click
  const play_again_btn = document.getElementById("play-again");
  play_again_btn.addEventListener("click", function () {
    renderPlayAgain();
  });
}

// Function to render hit or miss message
export function renderHitMsg(boolean, _shipName) {
  const msgBox = document.getElementById("message-box");

  if (boolean) {
    msgBox.textContent = `HIT! on ship: [ ${_shipName} ]`;
  } else {
    msgBox.textContent = "MISS";
  }
}
// Function to render AI's hit or miss message
export function renderHitMsgAI(boolean, _shipName) {
  const msgBox = document.getElementById("message-box");

  if (boolean) {
    msgBox.textContent = `AI hit your ${_shipName}`;
  } else {
    msgBox.textContent = `AI missed your ships`;
  }
}

// Function to render sunk ship message
export function renderSunkShip(user, ship) {
  const msgDiv = document.querySelector(".place-ships-heading-box");
  const msgBox = document.getElementById("message-box");
  if (user === "player") {
    msgBox.textContent = `AI sunk your ${ship}`;
    msgDiv.classList.add("hitMsgBox");
  } else if (user === "computer") {
    msgBox.textContent = `You sunk the AI's ${ship}`;
    msgDiv.classList.add("hitMsgBox");
  }

  setTimeout(() => {
    msgDiv.classList.remove("hitMsgBox");
  }, 1000);
}
// Function to reload the page for a new game
export function renderPlayAgain() {
  window.location.reload();
}
