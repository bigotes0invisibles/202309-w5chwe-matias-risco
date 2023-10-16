import SquareNeighbors from "../../../public/app/SquareNeighbors/SquareNeighbors.js";

describe("Given the constructor in the class SquareNeighbors", () => {
  describe("When it receves (3, 4)", () => {
    test("then it should have {positionX=3, positionY=4, alive = true, neighbors = 0}", () => {
      const expectedValue = {
        positionX: 3,
        positionY: 4,
        alive: true,
        neighbors: 0,
      };

      const actualValue = new SquareNeighbors(3, 4);

      expect(actualValue).toEqual(expectedValue);
    });
  });

  describe("When it receves (-1, -3, false, -1)", () => {
    test("then it should have {-1, -3, alive = false, neighbors = -1}", () => {
      const expectedValue = {
        positionX: -1,
        positionY: -3,
        alive: false,
        neighbors: -1,
      };

      const actualValue = new SquareNeighbors(-1, -3, false, -1);

      expect(actualValue).toEqual(expectedValue);
    });
  });
});
