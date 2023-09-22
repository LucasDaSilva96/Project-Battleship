import { SHIPS } from "./ship.js";
let ship = new SHIPS();

ship.hit("destroyer");
ship.hit("destroyer");
ship.isSunk("destroyer");

test("Destroyer hit", () => {
  expect(ship.destroyer.numberOfHits).toBe(2);
});

test("Destroyer sunk", () => {
  expect(ship.destroyer.sunk).toBe(true);
});
