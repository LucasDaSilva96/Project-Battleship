/*
Carrier: 5 holes,
Battleship: 4 holes,
Cruiser: 3 holes,
Submarine: 3 holes,
Destroyer: 2 holes
*/

export class SHIPS {
  constructor() {
    // The ships objects
    this.carrier = {
      type: "carrier",
      length: 5,
      numberOfHits: 0,
      sunk: false,
      amountOfShips: 1,
    };

    this.battleship = {
      type: "battleship",
      length: 4,
      numberOfHits: 0,
      sunk: false,
      amountOfShips: 1,
    };

    this.cruiser = {
      type: "cruiser",
      length: 3,
      numberOfHits: 0,
      sunk: false,
      amountOfShips: 1,
    };

    this.submarine = {
      type: "submarine",
      length: 3,
      numberOfHits: 0,
      sunk: false,
      amountOfShips: 1,
    };

    this.destroyer = {
      type: "destroyer",
      length: 2,
      numberOfHits: 0,
      sunk: false,
      amountOfShips: 1,
    };
  }
  // Methods
  hit(shipName) {
    return this[shipName].numberOfHits++;
  }

  isSunk(shipName) {
    if (this[shipName].numberOfHits >= this[shipName].length) {
      return (this[shipName].sunk = true);
    }
  }

  // should be able to report whether or not all of the ships have been sunk.
  isGameOver() {
    if (
      this.carrier.sunk === true &&
      this.battleship.sunk === true &&
      this.cruiser.sunk === true &&
      this.submarine.sunk === true &&
      this.destroyer.sunk === true
    ) {
      return true;
    }
    return false;
  }

  // Update the number of ships for a specific category available
  updateNumberOfShips(shipName) {
    return this[shipName].amountOfShips--;
  }
}
