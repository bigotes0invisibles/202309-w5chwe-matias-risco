class SquareNeighbors {
  positionX;
  positionY;
  neighbors;
  alive;

  constructor(positionX, positionY, alive = true, neighbors = 0) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.neighbors = neighbors;
    this.alive = alive;
  }

  acknowledgeSelfToNeighbors(sizeX, sizeY, cells) {
    const { positionX } = this;
    const { positionY } = this;
    const left = positionX - 1 < 0 ? sizeX - 1 : positionX - 1;
    const rigth = positionX + 1 >= sizeX ? 0 : positionX + 1;
    const up = positionY - 1 < 0 ? sizeY - 1 : positionY - 1;
    const down = positionY + 1 >= sizeY ? 0 : positionY + 1;

    const row = [left, positionX, rigth];
    const colum = [up, positionY, down];

    for (let locationY = 0; locationY < colum.length; locationY++)
      for (let locationX = 0; locationX < row.length; locationX++) {
        if (cells[colum[locationY]] === undefined) cells[colum[locationY]] = {};

        if (cells[colum[locationY]][row[locationX]] === undefined)
          cells[colum[locationY]][row[locationX]] = new SquareNeighbors(
            row[locationX],
            colum[locationY],
            false,
            1,
          );
        else if (
          this.alive &&
          !(positionX === row[locationX] && positionY === colum[locationY])
        )
          cells[colum[locationY]][row[locationX]].addNeighbors();
      }
  }

  isAlive() {
    let { alive } = this;
    const { neighbors } = this;
    alive = (alive && neighbors === 2) || neighbors === 3;
    this.alive = alive;
  }

  resetNeighbors() {
    this.neighbors = 0;
  }

  addNeighbors() {
    this.neighbors++;
  }
}

export default SquareNeighbors;
