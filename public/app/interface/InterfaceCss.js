import Board from "../board/board.js";

class InterfaceCss extends Board {
  elements;
  styleSheet;

  constructor(sizeX, sizeY, probability = 0.3, opcional = true) {
    super(sizeX, sizeY, probability, opcional);

    const styleEl = document.createElement("style");
    document.head.appendChild(styleEl);
    this.styleSheet = styleEl.sheet;
    const selector = ".game";
    let ruleString = "";
    ruleString += `grid-template-columns: repeat(${sizeX}, 1fr)`;
    ruleString += `grid-template-rows: repeat(${sizeY}, 1fr)`;

    const classCss = `${selector}{${ruleString}}`;
    this.styleSheet.insertRule(classCss);
  }

  getElements() {
    if (this.elements === undefined) {
      const elements = {};
      for (const cellY of Object.keys(this.cells))
        for (const cellX of Object.keys(this.cells[cellY])) {
          if (elements[cellY] === undefined) elements[cellY] = {};
          if (this.cells[cellY][cellX].getStatus() === true) {
          }

          this.cells[cellY][cellX].resetNeighbors();
        }

      return this.elements;
    }
  }
}

export default InterfaceCss;
