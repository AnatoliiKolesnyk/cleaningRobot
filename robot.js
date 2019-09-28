/**
 * Cleaning robot prototype. The solution is to go through the list
 * of commands and add all the coordinates that robot moves through
 * to the HashSet using hash function that gives unique key
 * for any new coordinate (but the same key for equal coordinates).
 * The JavaScript Set data structure is a great match for this.
 *
 * When all commands are executed, we can just return the size of the HashSet.
 */
export class Robot {
  /**
   * Just initializing internal state properties
   */
  constructor() {
    this.x = null;
    this.y = null;
    this.uniqueCoords = new Set();
  }

  /**
   * Main function, starts the cleaning process
   * @param numOfCommands
   * @param x Start position, x coord
   * @param y Start position, y coord
   * @param commands
   * @return {string} The number of unique places the robot visited
   * formatted as a string
   */
  clean(numOfCommands, x, y, ...commands) {
    this.x = x;
    this.y = y;

    for (let i = 0; i < numOfCommands; i++) {
      const [direction, numOfSteps] = commands[i];
      const coordToChange = this.getCoordToChange(direction);
      const stepIncrement = this.getCoordIncrement(direction);
      const finalCoord = this[coordToChange] + numOfSteps * stepIncrement;

      while (this[coordToChange] !== finalCoord) {
        this.storeCurrentPositionIfUnique();
        this[coordToChange] += stepIncrement;
      }
      // Store the last position of the command, since that won't
      // be stored in a loop since it doesn't execute on the last position
      // (because of the condition in the loop (coord !== finalCoord)
      this.storeCurrentPositionIfUnique();
    }

    return `==> Cleaned: ${this.getUniquePlacesCount()}`;
  }

  /**
   * Stores current coordinates to the HashSet, the data
   * structure will ignore any duplicates
   */
  storeCurrentPositionIfUnique() {
    const hashKey = this.getHashKey(...this.getCoords());
    this.uniqueCoords.add(hashKey);
  }

  /**
   * @param direction {'E', 'S', 'W', 'N'} The letter describing
   * compass direction
   * @return {'x', 'y'} The coord name that needs to be changed
   * accordingly to the command
   */
  getCoordToChange(direction) {
    return ['E', 'W'].includes(direction) ? 'x' : 'y';
  }

  /**
   * @param direction {'E', 'S', 'W', 'N'} The letter describing
   * compass direction
   * @return {number} The increment value of every step (1 or -1)
   */
  getCoordIncrement(direction) {
    return ['S', 'E'].includes(direction) ? 1 : -1;
  }

  /**
   * @return number[] Current coordinates
   */
  getCoords() {
    return [this.x, this.y];
  }

  /**
   * @param coords Coordinates for which hash key is needed
   * @return {string} Hash key for the passed in coordinates
   */
  getHashKey(...coords) {
    return coords.toString();
  }

  /**
   * @return {number} Number of uniques places that robot visited
   */
  getUniquePlacesCount() {
    return this.uniqueCoords.size;
  }
}
