import { Sprite, Polygon, Graphics, Container, Point, Matrix } from 'pixi.js';
import 'pixi.js/math-extras';

export default class TileDrawing
{
    static RECT_WIDTH = 100;
    static RECT_HEIGHT = 100;
    static RECT_PADDING = 10;
    static ORIGIN_POINT = new Point(0, 0);
    static i1 = new Point(1, 0.5).normalize();
    static j1 = new Point(1, -0.5).normalize();
    static baseMatrix = new Matrix(
        TileDrawing.i1.x,   TileDrawing.i1.y,   // a, b
        TileDrawing.j1.x,   TileDrawing.j1.y,   // c, d
        0,                  0                   // tx, ty
    )


    static DEBUG = false;

    constructor({width = TileDrawing.RECT_WIDTH, height = TileDrawing.RECT_HEIGHT, padding = TileDrawing.RECT_PADDING, gridPoint = new Point(0, 0)} = {})
    {
        this.width = width;
        this.height = height;
        this.padding = padding;
        // whole number of the position in the grid
        this.gridPoint = gridPoint;
    }

    drawTile(texture) {

        let point1 = new Point();
        const dimensions = new Point(this.height / 2, this.width / 2);
        const padding = new Point(this.padding, this.padding);


        // this.gridPoint.multiply(dimensions.add(padding)).add(TileDrawing.ORIGIN_POINT);

        // mátrix művelet lesz 
        point1 = TileDrawing.baseMatrix.apply(this.gridPoint.multiply(dimensions.add(padding))).add(TileDrawing.ORIGIN_POINT);



        // console.log(`x, y: ${this.gridPoint.x}, ${this.gridPoint.y}`);

        // const point = new Point(x, y);
        const point = point1;

        const container = new Container();
        const sprite = new Sprite(texture);

        container.position.set(point.x, point.y);

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