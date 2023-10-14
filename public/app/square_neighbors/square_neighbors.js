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
    const rigth = positionX + 1 > sizeX ? 0 : positionX + 1;
    const up = positionY - 1 < 0 ? sizeY - 1 : positionY - 1;
    const down = positionY + 1 > sizeY ? 0 : positionY + 1;

    const row = [left, positionX, rigth];
    const colum = [up, positionY, down];

    for (let locationX = 0; locationX < row.length; locationX++)
      for (let locationY = 0; locationY < colum.length; locationY++) {
        if (!cells[row[locationY]]) cells[row[locationY]] = {};

        if (cells[row[locationY]][colum[locationX]] === undefined)
          cells[row[locationY]][colum[locationX]] = new SquareNeighbors(
            row[locationY],
            colum[locationX],
            false,
            1,
          );
        else if (
          this.alive &&
          (positionX !== row[locationY] || positionY !== colum[locationX])
        )
          cells[row[locationY]][colum[locationX]].neighbors++;
      }
  }
}

export default SquareNeighbors;
