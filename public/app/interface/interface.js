import Board from "../board/board.js";
class Interface extends Board {
  show() {
    const { cells } = this;
    for (let positionY = 0; positionY < this.sizeY; positionY++) {
      let showString = "";
      for (let positionX = 0; positionX < this.sizeX; positionX++)
        if (cells[positionY] === undefined) showString += "-";
        else if (cells[positionY][positionX] === undefined) showString += "-";
        else showString += "0";

      console.log(showString);
    }
  }

  cleargame() {
    console.clear();
  }
}

export default Interface;
