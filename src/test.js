import { SHIPS } from "./ship.js";
import { GAME_BOARD } from "./gameBoard.js";
let ship = new SHIPS();

ship.hit(ship.destroyer.type);
ship.hit(ship.destroyer.type);
ship.isSunk(ship.destroyer.type);

test("Destroyer hit", () => {
  expect(ship.destroyer.numberOfHits).toBe(2);
});

test("Destroyer sunk", () => {
  expect(ship.destroyer.sunk).toBe(true);
});

// Example usage
const rows = 10;
const columns = 10;
const battleshipBoard = new GAME_BOARD(rows, columns);

// Create a battleship
const battleship = {
  name: "Battleship",
  length: 4,
  numberOfHits: 0,
};

// Place the battleship on the board
battleshipBoard.placeShip(battleship, 2, 3, "horizontal");

test("Attack a position on board, test-1", () => {
  expect(battleshipBoard.receiveAttack(2, 3)).toBe("hit");
});

test("Attack a position on board, test-2", () => {
  expect(battleshipBoard.receiveAttack(2, 4)).toBe("hit");
});

test("Attack a position on board, test-3", () => {
  expect(battleshipBoard.receiveAttack(2, 5)).toBe("hit");
});

test("Attack a position on board, test-4", () => {
  expect(battleshipBoard.receiveAttack(5, 6)).toBe("miss");
});
