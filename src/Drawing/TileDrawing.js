import { Sprite, Polygon, Graphics, Container } from 'pixi.js';

export default class TileDrawing
{
    static RECT_WIDTH = 100;
    static RECT_HEIGHT = 100;
    static RECT_PADDING = 10;
    static X_ORIGIN = 0;
    static Y_ORIGIN = 0;
    
    static DEBUG = false;

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
        const container = new Container();
        const sprite = new Sprite(texture);

        container.position.set(x, y);

        sprite.width = this.width;
        sprite.height = this.height;
        sprite.alpha = 0.0;

        container.eventMode = 'static';
        container.cursor = 'pointer';
       
        const romboid = [
            this.width * 0.5,    this.height * 0.25,
            this.width,          this.height * 0.5 ,
            this.width * 0.5,    this.height * 0.75,
            0,                   this.height * 0.5 
        ];

        const poly =  new Polygon(romboid);
        container.hitArea = poly;

        container.addChild(sprite);
        container.sprite = sprite;

        if(TileDrawing.DEBUG){
            console.log('Debug');
            let g = new Graphics();
            g.poly(romboid).fill({ color: 0x00ff00, alpha: 0.2 });
            
            container.addChild(g);
        }
        
        return container;
    }
}