import SquareNeighbors from "../square_neighbors/square_neighbors.js";

class Board {
  sizeX;
  sizeY;
  cells;

  constructor(sizeX, sizeY, probability = 0.3) {
    if (sizeX <= 2 || sizeY <= 2)
      throw new Error(
        "You give the constructor of class Board a sizeX or sizeY are less than 3",
      );

    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.setUpCells(probability);
  }

  setUpCells(probability = 0.3) {
    const cells = {};

    for (let positionY = 0; positionY < this.sizeX; positionY++)
      for (let positionX = 0; positionX < this.sizeY; positionX++)
        if (probability > Math.random()) {
          if (cells[positionY] === undefined) cells[positionY] = {};

          if (cells[positionY][positionX] === undefined)
            cells[positionY][positionX] = {};

          cells[positionY][positionX] = new SquareNeighbors(
            positionY,
            positionX,
          );
        }

    this.cells = cells;
  }

  resetNeighbors() {
    for (const cellY of Object.keys(this.cells))
      for (const cellX of Object.keys(this.cells[cellY]))
        this.cells[cellY][cellX].neighbors = 0;
  }

  calculateCellsNeighbors() {
    for (const cellY of Object.keys(this.cells))
      for (const cellX of Object.keys(this.cells[cellY]))
        this.cells[cellY][cellX].acknowledgeSelfToNeighbors(
          this.sizeX,
          this.sizeY,
          this.cells,
        );
  }

  calculateCellsAlive() {
    for (const cellY of Object.keys(this.cells))
      for (const cellX of Object.keys(this.cells[cellY]))
        this.cells[cellY][cellX].alive =
          (this.cells[cellY][cellX].alive &&
            this.cells[cellY][cellX].neighbors === 2) ||
          this.cells[cellY][cellX].neighbors === 3;
  }

  deleteDeadcell() {
    let alpha = 0;
    for (const cellY of Object.keys(this.cells))
      for (const cellX of Object.keys(this.cells[cellY])) {
        if (!this.cells[cellY][cellX].alive) {
          alpha++;
          Reflect.deleteProperty(this.cells[cellY], cellX);
          if (Object.keys(this.cells[cellY]).length === 0)
            Reflect.deleteProperty(this.cells, cellY);
        }
      }

    return alpha;
  }

  step() {
    this.resetNeighbors();
    this.calculateCellsNeighbors();
    this.calculateCellsAlive();
    const alpha = this.deleteDeadcell();
    return alpha;
  }

  getCells() {
    return this.cells;
  }
}

export default Board;
