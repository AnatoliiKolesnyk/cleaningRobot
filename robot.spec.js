import {Robot} from "./robot";

let robot;

beforeEach(() => {
  robot = new Robot();
});

describe('Robot prototype', () => {
  it ('Should move in east direction when asked', () => {
    robot.clean(1, 0, 0, ['E', 10]);
    expect(robot.getCoords()).toEqual([10, 0]);
    expect([...robot.uniqueCoords]).toEqual(
      ['0,0', '1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0', '9,0', '10,0']
    );
  });

  it ('Should move in west direction when asked', () => {
    robot.clean(1, 10, 0, ['W', 10]);
    expect(robot.getCoords()).toEqual([0, 0]);
    expect([...robot.uniqueCoords]).toEqual(
      ['10,0', '9,0', '8,0', '7,0', '6,0', '5,0', '4,0', '3,0', '2,0', '1,0', '0,0']
    );
  });

  it ('Should move in south direction when asked', () => {
    robot.clean(1, 0, 0, ['S', 10]);
    expect(robot.getCoords()).toEqual([0, 10]);
    expect([...robot.uniqueCoords]).toEqual(
      ['0,0', '0,1', '0,2', '0,3', '0,4', '0,5', '0,6', '0,7', '0,8', '0,9', '0,10']
    );
  });

  it ('Should move in north direction when asked', () => {
    robot.clean(1, 0, 10, ['N', 10]);
    expect(robot.getCoords()).toEqual([0, 0]);
    expect([...robot.uniqueCoords]).toEqual(
      ['0,10', '0,9', '0,8', '0,7', '0,6', '0,5', '0,4', '0,3', '0,2', '0,1', '0,0']
    );
  });

  it ('Should start from initial position', () => {
    robot.clean(0, 0, 0);
    expect(robot.getCoords()).toEqual([0, 0]);
  });

  it ('Should track its position while cleaning', () => {
    robot.clean(2, 10, 10, ['E', 10], ['S', 10]);
    expect(robot.getCoords()).toEqual([20, 20]);
  });

  describe('Clean method', () => {
    it ('Should return string starting with "==> Cleaned: "', () => {
      expect(
        robot.clean(0, 0, 0)
      ).toMatch(/^==> Cleaned: /);
    });

    it ('Should return 0 if no commands were given', () => {
      expect(
        robot.clean(0, 0, 0)
      ).toBe('==> Cleaned: 0');
    });

    it ('Should count visited places', () => {
      expect(
        robot.clean(1, 0, 0, ['S', 2])
      ).toBe('==> Cleaned: 3');
    });

    it ('Should count only unique places', () => {
      expect(
        robot.clean(
          4,
          0,
          0,
          ['E', 2],
          ['W', 2],
          ['S', 2],
          ['N', 2],
        )
      ).toBe('==> Cleaned: 5');
    });
  });
});
