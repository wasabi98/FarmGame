import { Sprite, Polygon } from 'pixi.js';

export default class TileDrawing
{
    
    static RECT_WIDTH = 100;
    static RECT_HEIGHT = 100;
    static RECT_PADDING = 10;
    static X_ORIGIN = 0;
    static Y_ORIGIN = 0;
    
    constructor({width = TileDrawing.RECT_WIDTH, height = TileDrawing.RECT_HEIGHT, padding = TileDrawing.RECT_PADDING, x = 0, y = 0} = {})
    {
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.x = x;
        this.y = y;
    }

    drawTile(texture) {
        const x = (this.x * (this.width + this.padding)) + TileDrawing.X_ORIGIN;
        const y = (this.y * (this.height + this.padding)) + TileDrawing.Y_ORIGIN;

        const sprite = new Sprite(texture);

        sprite.x = x;
        sprite.y = y;

        sprite.width = this.width;
        sprite.height = this.height;
        sprite.alpha = 0.0;

        sprite.eventMode = 'static';
        sprite.cursor = 'pointer';

        const romboid = {
            a: {x: this.width * 0.5,    y: this.height * 0.25   },
            b: {x: this.width,          y: this.height * 0.5    },
            c: {x: this.width * 0.5,    y: this.height * 0.75   },
            d: {x: 0,                   y: this.height * 0.5    }
        };
        const poly =  new Polygon(
            [
                romboid.a.x, romboid.a.y,
                romboid.b.x, romboid.b.y,
                romboid.c.x, romboid.c.y,
                romboid.d.x, romboid.d.y
            ]);

        sprite.hitArea = poly;
        return sprite;
    }
}