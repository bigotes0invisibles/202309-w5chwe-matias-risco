import Interface from "./interface/interface.js";
import SquareNeighbors from "./square_neighbors/square_neighbors.js";

const game = (board) => {
  board.cleargame();
  board.show();
  board.step();
};

const board = new Interface(20, 6, 0.1, false);

const tableot = {};

tableot["0"] = {};
tableot["1"] = {};
tableot["2"] = {};
tableot["3"] = {};
tableot["0"]["0"] = 0;
tableot["0"]["1"] = 1;
tableot["0"]["2"] = 0;
tableot["0"]["3"] = 0;
tableot["0"]["4"] = 1;
tableot["1"]["0"] = 1;
tableot["1"]["1"] = 0;
tableot["1"]["2"] = 0;
tableot["1"]["3"] = 0;
tableot["1"]["4"] = 0;
tableot["2"]["0"] = 1;
tableot["2"]["1"] = 0;
tableot["2"]["2"] = 0;
tableot["2"]["3"] = 0;
tableot["2"]["4"] = 1;
tableot["3"]["0"] = 1;
tableot["3"]["1"] = 1;
tableot["3"]["2"] = 1;
tableot["3"]["3"] = 1;
tableot["3"]["4"] = 0;

for (let indexX = 0; indexX < 5; indexX++) {
  for (let indexY = 0; indexY < 4; indexY++) {
    if (tableot[indexY][indexX] === 1) {
      if (board.cells[indexY] === undefined) board.cells[indexY] = {};
      board.cells[indexY][indexX] = new SquareNeighbors(indexX, indexY);
    }
  }
}

// If (!board.isCellsAlive()) board.setUpCells();
setInterval(game, 100, board);
