import { SHIPS } from "./ship.js";
import { angle } from "./render.js";

const width = 10;
const carrier = new SHIPS("carrier", 5);
const battleship = new SHIPS("battleship", 4);
const cruiser = new SHIPS("cruiser", 3);
const submarine = new SHIPS("submarine", 3);
const destroyer = new SHIPS("destroyer", 2);

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
