import { SHIPS } from "./ship.js";
import {
  angle,
  renderHitMsgAI,
  renderGameOver,
  renderHitMsg,
} from "./render.js";

const width = 10;
const carrier = new SHIPS("carrier", 5);
const battleship = new SHIPS("battleship", 4);
const cruiser = new SHIPS("cruiser", 3);
const submarine = new SHIPS("submarine", 3);
const destroyer = new SHIPS("destroyer", 2);
let PLAYER_SHIPS = [carrier, battleship, cruiser, submarine, destroyer];
let AI_SHIPS = [carrier, battleship, cruiser, submarine, destroyer];

const ships = [carrier, battleship, cruiser, submarine, destroyer];
let notDropped = undefined;

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

  let validStart = isHorizontal
    ? startIndex <= width * width - ship.length
      ? startIndex
      : width * width - ship.length
    : // handle vertical
    startIndex <= width * width - width * ship.length
    ? startIndex
    : startIndex - ship.length * width + width;

  let shipBlocks = [];

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

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  } else {
    if (user === "computer") addShipPiece(user, ship, start_id);
    if (user === "player") notDropped = true;
  }
}

let draggedShip;
export function dragShipToPlace(e) {
  notDropped = false;
  draggedShip = e.target;
}

export function dragOver(e) {
  e.preventDefault();
}

export function dropShip(e) {
  const start_id = Number(e.target.id);
  const ship = ships[draggedShip.id];
  addShipPiece("player", ship, start_id);

  if (!notDropped) {
    const ship_img = document.getElementById(`${ship.name}`);
    ship_img.classList.add("blur");
    draggedShip.remove();
  }
}

export function hit(e) {
  const playerCells = document.querySelectorAll(".cell");
  const msgBox = document.getElementById("message-box");
  let shipName = undefined;
  const cell = e.target;

  if (cell.classList.contains("taken")) {
    cell.classList.add("hit");
    shipName = cell.classList[1];
    renderHitMsg(true, shipName);
    let index = findShip(shipName, AI_SHIPS);
    hitShip_sunk(AI_SHIPS, index);
    console.log(AI_SHIPS.length);
    isGameOver("computer", AI_SHIPS);
  } else {
    cell.classList.add("miss");
    renderHitMsg(false);
  }

  setTimeout(() => {
    msgBox.textContent = "AI is thinking";
  }, 1000);

  setTimeout(() => {
    aiAttack(playerCells, PLAYER_SHIPS);
  }, 2000);

  setTimeout(() => {
    msgBox.textContent = "Your turn!";
  }, 3000);
}

function findShip(shipName, shipArray) {
  const index = shipArray.findIndex((index) => {
    return index.name === shipName;
  });

  return index;
}

function hitShip_sunk(shipArray, index) {
  shipArray[index].length--;

  if (shipArray[index].length <= 0) {
    shipArray.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

function isGameOver(shipArray, user) {
  if (shipArray.length < 1 && user === "player") {
    renderGameOver("lost");
    return true;
  } else if (shipArray.length < 1 && user === "computer") {
    renderGameOver("Won");
    return true;
  } else {
    return false;
  }
}

function aiAttack(playerCells, ships, counter = 1) {
  let playerCellsArray = Array.from(playerCells);
  let index = undefined;
  let shipIndex = undefined;
  let cellsArrayFiltered = playerCellsArray.filter((cell) => {
    return !cell.classList.contains("miss") && !cell.classList.contains("hit");
  });

  const randomNr = Math.floor(Math.random() * cellsArrayFiltered.length);

  if (cellsArrayFiltered[randomNr].classList.contains("taken")) {
    index = findId(playerCells, cellsArrayFiltered[randomNr].id);
    playerCells[index].classList.add("hit");
    shipIndex = findShip(playerCells[index].classList[1], ships);
    hitShip_sunk(ships, shipIndex);
    isGameOver(ships, "player");
    renderHitMsgAI(true, ships[shipIndex].name);
    return;
  } else {
    index = findId(playerCells, cellsArrayFiltered[randomNr].id);
    playerCells[index].classList.add("miss");
    renderHitMsgAI(false);
    if (counter > 0) {
      aiAttack(playerCells, ships, (counter = 0));
    }
  }
}

function findId(nodeArray, id) {
  let index = Array.from(nodeArray).findIndex((node) => {
    return node.id === id;
  });

  return index;
}
