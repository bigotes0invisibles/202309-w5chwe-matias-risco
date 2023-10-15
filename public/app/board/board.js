import SquareNeighbors from "../square_neighbors/square_neighbors.js";

class Board {
  sizeX;
  sizeY;
  cells;

  constructor(sizeX, sizeY, probability = 0.3, opcional = true) {
    if (sizeX <= 2 || sizeY <= 2)
      throw new Error(
        "You give the constructor of class Board a sizeX or sizeY are less than 3",
      );

    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.cells = {};
    if (opcional) this.setUpCells(probability);
  }

  setUpCells(probability = 0.3) {
    const cells = {};

    for (let positionY = 0; positionY < this.sizeY; positionY++)
      for (let positionX = 0; positionX < this.sizeX; positionX++)
        if (probability > Math.random()) {
          if (cells[positionY] === undefined) cells[positionY] = {};

          cells[positionY][positionX] = new SquareNeighbors(
            positionX,
            positionY,
          );
        }

    this.cells = cells;
  }

  resetNeighbors() {
    for (const cellY of Object.keys(this.cells))
      for (const cellX of Object.keys(this.cells[cellY]))
        this.cells[cellY][cellX].resetNeighbors();
  }

  calculateCellsNeighbors() {
    for (const cellY of Object.keys(this.cells))
      for (const cellX of Object.keys(this.cells[cellY]))
        if (this.cells[cellY][cellX].alive)
          this.cells[cellY][cellX].acknowledgeSelfToNeighbors(
            this.sizeX,
            this.sizeY,
            this.cells,
          );
  }

  calculateCellsAlive() {
    for (const cellY of Object.keys(this.cells))
      for (const cellX of Object.keys(this.cells[cellY])) {
        this.cells[cellY][cellX].isAlive();
      }
  }

  deleteDeadcell() {
    for (const cellY of Object.keys(this.cells))
      for (const cellX of Object.keys(this.cells[cellY])) {
        if (!this.cells[cellY][cellX].alive) {
          Reflect.deleteProperty(this.cells[cellY], cellX);
          if (Object.keys(this.cells[cellY]).length === 0)
            Reflect.deleteProperty(this.cells, cellY);
        }
      }
  }

  step() {
    this.resetNeighbors();
    this.calculateCellsNeighbors();
    this.calculateCellsAlive();
    this.deleteDeadcell();
  }

  isCellsAlive() {
    return Object.keys(this.cells).length !== 0;
  }
}

export default Board;
