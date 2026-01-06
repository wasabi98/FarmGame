import FarmLandTile from "./FarmLandTile.js";

export default class GridManager {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array(width).fill().map((_, col) => Array(height).fill().map((_, row) => new FarmLandTile(col, row)));
  }
}
