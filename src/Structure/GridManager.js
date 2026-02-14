import FarmLandTile from "./FarmLandTile.js";
import WheatCrop from "./WheatCrop.js";
import { Point } from 'pixi.js';

export default class GridManager 
{
  constructor(width, height) 
  {
    this.width = width;
    this.height = height;
    this.grid = Array(width).fill().map((_, col) => Array(height).fill().map((_, row) => new FarmLandTile(new Point(col, row))));
  }
  fill()
  {
    this.grid.forEach(i => {
        i.forEach( j => {
            j.crop = new WheatCrop(j);
        })
    });
  }
}
