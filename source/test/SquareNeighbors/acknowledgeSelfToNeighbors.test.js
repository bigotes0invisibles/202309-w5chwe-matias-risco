import SquareNeighbors from "../../../public/app/SquareNeighbors/SquareNeighbors.js";

describe("Given the funtion acknowledgeSelfToNeighbors in the class SquareNeighbors", () => {
  describe("When it receves (3, 3,cells)", () => {
    test("then it should create 6 cell dead and add one to all neighbors", () => {
      const expectedValue = { dead: 6, neighbors: 8 };
      const actualValue = { dead: 0, neighbors: 0 };
      const cells = {};
      cells[1] = {};
      cells[2] = {};
      cells[1][1] = new SquareNeighbors(1, 1);
      cells[2][1] = new SquareNeighbors(1, 2);
      cells[2][2] = new SquareNeighbors(0, 2);

      cells[1][1].acknowledgeSelfToNeighbors(3, 3, cells);

      for (const cellY of Object.keys(this.cells))
        for (const cellX of Object.keys(this.cells[cellY])) {
          if (!this.cells[cellY][cellX].getStatus()) {
            actualValue.dead++;
          }

          actualValue.neighbors++;
        }

      expect(actualValue).toEqual(expectedValue);
    });
  });
});
