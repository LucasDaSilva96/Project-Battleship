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
      length: 5,
      numberOfHits: 0,
      sunk: false,
    };

    this.battleship = {
      length: 4,
      numberOfHits: 0,
      sunk: false,
    };

    this.cruiser = {
      length: 3,
      numberOfHits: 0,
      sunk: false,
    };

    this.submarine = {
      length: 3,
      numberOfHits: 0,
      sunk: false,
    };

    this.destroyer = {
      length: 2,
      numberOfHits: 0,
      sunk: false,
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
}
