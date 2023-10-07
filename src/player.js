import { SHIPS } from "./ship.js";
import {
  angle,
  renderHitMsgAI,
  renderGameOver,
  renderHitMsg,
  renderSunkShip,
} from "./render.js";

const width = 10;
const carrier = new SHIPS("carrier", 5);
const battleship = new SHIPS("battleship", 4);
const cruiser = new SHIPS("cruiser", 3);
const submarine = new SHIPS("submarine", 3);
const destroyer = new SHIPS("destroyer", 2);

// *** AI
const carrier_AI = new SHIPS("carrier", 5);
const battleship_AI = new SHIPS("battleship", 4);
const cruiser_AI = new SHIPS("cruiser", 3);
const submarine_AI = new SHIPS("submarine", 3);
const destroyer_AI = new SHIPS("destroyer", 2);

let PLAYER_SHIPS = [carrier, battleship, cruiser, submarine, destroyer];
let AI_SHIPS = [
  carrier_AI,
  battleship_AI,
  cruiser_AI,
  submarine_AI,
  destroyer_AI,
];

const ships = [carrier, battleship, cruiser, submarine, destroyer];
let notDropped = undefined;

// Function to add a ship piece to the game board
export function addShipPiece(user, ship, start_id) {
  let CELLS;
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = user === "player" ? angle === 0 : randomBoolean;
  if (user === "computer") {
    CELLS = document.querySelectorAll(".ai-cell");
  } else if (user === "player") {
    CELLS = document.querySelectorAll(".cell");
  }

  let randomStartIndex = Math.floor(Math.random() * width * width);

  let startIndex = start_id ? start_id : randomStartIndex;
  // Calculate a valid starting position for the ship
  let validStart = isHorizontal
    ? startIndex <= width * width - ship.length
      ? startIndex
      : width * width - ship.length
    : // handle vertical
    startIndex <= width * width - width * ship.length
    ? startIndex
    : startIndex - ship.length * width + width;

  let shipBlocks = [];
  // Collect the cells that the ship will occupy
  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(CELLS[Number(validStart) + i]);
    } else {
      shipBlocks.push(CELLS[Number(validStart) + i * width]);
    }
  }

  let valid;

  if (isHorizontal) {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid =
          Number(shipBlocks[0].id) % width !==
          width - (shipBlocks.length - (index + 1)))
    );
  } else {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid = Number(shipBlocks[0].id) < 90 + (width * index + 1))
    );
  }

  const notTaken = shipBlocks.every(
    (block) => !block.classList.contains("taken")
  );

  // Add the ship to the game board
  if (valid && notTaken && user === "player") {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
    // Add the ship to the AI game board with transparency
  } else if (valid && notTaken && user === "computer") {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
      shipBlock.classList.add("transparent");
    });
    // Handle cases where ship placement is not valid
  } else {
    if (user === "computer") addShipPiece(user, ship, start_id);
    if (user === "player") notDropped = true;
  }
}

let draggedShip;
// Function to handle ship dragging
export function dragShipToPlace(e) {
  notDropped = false;
  draggedShip = e.target;
}

// Function to handle dragover event
export function dragOver(e) {
  e.preventDefault();
}

// Function to drop a ship on the game board
export function dropShip(e) {
  const start_id = Number(e.target.id);
  const ship = ships[draggedShip.id];
  addShipPiece("player", ship, start_id);

  // Handle cases where the ship is dropped
  if (!notDropped) {
    const ship_img = document.getElementById(`${ship.name}`);
    ship_img.classList.add("blur");
    let p = document.createElement("p");
    p.textContent = "Empty";
    draggedShip.appendChild(p);
    draggedShip.setAttribute("draggable", false);
    const ship_id = document.getElementById(
      `${draggedShip.className.split(" ")[1]}`
    );
    ship_id.previousElementSibling.textContent = "Empty";
  }
}

// Function to handle player's attack
export function hit(e) {
  console.log("PLAYER-ARRAY: ", PLAYER_SHIPS);
  console.log("AI-ARRAY: ", AI_SHIPS);
  const playerCells = document.querySelectorAll(".cell");
  const msgBox = document.getElementById("message-box");
  let shipName = undefined;
  const cell = e.target;
  let index = undefined;

  // Handle a hit on an opponent's ship
  if (cell.classList.contains("taken")) {
    cell.classList.add("hit");
    shipName = cell.classList[1];
    renderHitMsg(true, shipName);
    index = findShip(shipName, AI_SHIPS);
    hitOnShip("computer", index);
    if (hitShip_sunk("computer")) {
      isGameOver("computer");
    }
  } else if (
    cell.classList.contains("hit") ||
    cell.classList.contains("miss")
  ) {
    return;
    // Handle a miss
  } else {
    cell.classList.add("miss");
    renderHitMsg(false);
  }

  setTimeout(() => {
    if (!hitShip_sunk("computer")) {
      msgBox.textContent = "AI is thinking...";
    }
  }, 1000);

  setTimeout(() => {
    if (!hitShip_sunk("computer")) {
      aiAttack(playerCells, PLAYER_SHIPS);
    }
  }, 3000);

  setTimeout(() => {
    if (!hitShip_sunk("computer")) {
      msgBox.textContent = "Your turn!";
    }
  }, 4000);
}

// Function to find the index of a ship in an array
function findShip(shipName, shipArray) {
  const index = shipArray.findIndex((index) => {
    return index.name === shipName;
  });

  return index;
}

// Function to check if a ship is sunk and update the game state
function hitShip_sunk(user) {
  if (user === "computer") {
    if (remove_AI_ship()) {
      return true;
    }
    return false;
  } else if (user === "computer" && AI_SHIPS.length < 1) {
    return true;
  } else if (user === "player") {
    if (remove_PLAYER_ship()) {
      return true;
    }
    return false;
  } else if (user === "player" && PLAYER_SHIPS.length < 1) {
    return true;
  }

  return false;
}

// Function to handle game over
function isGameOver(user) {
  if (user === "player") {
    renderGameOver("lost");
    return true;
  } else if (user === "computer") {
    renderGameOver("Won");
    return true;
  }
}

// Function for AI's attack logic
function aiAttack(playerCells, ships, counter = 1) {
  let playerCellsArray = Array.from(playerCells);
  let index = undefined;
  let shipIndex = undefined;
  let cellsArrayFiltered = playerCellsArray.filter((cell) => {
    return !cell.classList.contains("miss") && !cell.classList.contains("hit");
  });

  const randomNr = Math.floor(Math.random() * cellsArrayFiltered.length);

  // Handle a hit on the player's ship
  if (cellsArrayFiltered[randomNr].classList.contains("taken")) {
    index = findId(playerCells, cellsArrayFiltered[randomNr].id);
    playerCells[index].classList.add("hit");
    shipIndex = findShip(playerCells[index].classList[1], ships);
    hitOnShip("player", shipIndex);
    if (hitShip_sunk("player")) {
      isGameOver("player");
    }
    renderHitMsgAI(true, ships[shipIndex].name);
    return;
    // Handle a miss
  } else {
    index = findId(playerCells, cellsArrayFiltered[randomNr].id);
    playerCells[index].classList.add("miss");
    renderHitMsgAI(false);
    if (counter > 0) {
      aiAttack(playerCells, ships, (counter = 0));
    }
  }
}

// Function to find the index of an element in an array by ID
function findId(nodeArray, id) {
  let index = Array.from(nodeArray).findIndex((node) => {
    return node.id === id;
  });

  return index;
}
// Function to remove a ship from the AI's array when it's sunk
function remove_AI_ship() {
  AI_SHIPS = AI_SHIPS.filter((ship) => ship.length > 0);
  if (AI_SHIPS.length > 0) {
    return false;
  } else {
    return true;
  }
}
// Function to remove a ship from the player's array when it's sunk
function remove_PLAYER_ship() {
  PLAYER_SHIPS = PLAYER_SHIPS.filter((ship) => ship.length > 0);
  if (PLAYER_SHIPS.length > 0) {
    return false;
  } else {
    return true;
  }
}

// Function to handle reducing the length of a ship when hit
function hitOnShip(user, index) {
  if (index < 0 || index === undefined || index === null) {
    return;
  }

  if (user === "computer" && AI_SHIPS[index].length > 0) {
    AI_SHIPS[index].length--;
    if (AI_SHIPS[index].length < 1) {
      renderSunkShip(user, AI_SHIPS[index].name);
    }
  }

  if (user === "player" && PLAYER_SHIPS[index].length > 0) {
    PLAYER_SHIPS[index].length--;
    if (PLAYER_SHIPS[index].length < 1) {
      renderSunkShip(user, PLAYER_SHIPS[index].name);
    }
  }
}
