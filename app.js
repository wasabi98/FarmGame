import { Application, Assets, Container, Sprite, Ticker, Graphics  } from "pixi.js";
import GridManager from "./gridManager.js";
import WheatCrop from "./WheatCrop.js";
import FarmLandTile from "./FarmLandTile.js";

(async () => 
{

    const app = new Application();

    await app.init({
        resizeTo: window,
        backgroundColor: 0x330111,
    });

    app.canvas.style.position = 'absolute';

    document.body.appendChild(app.canvas);

    let gridManager = new GridManager(4, 7);

    gridManager.grid.forEach(i => {
        i.forEach( j => {
           //j.setCrop(new WheatCrop(j));
           j.crop = new WheatCrop(j);
        })
    });

    gridManager.grid.forEach(i => {
        i.forEach( j => {
            /*setTimeout(() =>  {
            console.log( j.x + ' ' + j.y + ' id updated');
            //console.log( message + ' id updated;');
            }, 1000);*/
            j.crop.update(1);
            
        })
    });

    const texture = await Assets.load('./kaposzta.png');

    const RECT_WIDTH = 100;
    const RECT_HEIGHT = 100;
    const RECT_PADDING = 10;
    const X_ORIGIN = (app.renderer.width / 2) - (RECT_WIDTH * gridManager.grid.length + RECT_PADDING * (gridManager.grid.length - 1)) / 2;
    const Y_ORIGIN = (app.renderer.height / 2) - (RECT_HEIGHT * gridManager.grid[0].length + RECT_PADDING * (gridManager.grid[0].length - 1)) / 2;
    const container = new Container();
    gridManager.grid.forEach(i => {
        i.forEach( j => {
            const x = (j.x * (RECT_WIDTH + RECT_PADDING)) + X_ORIGIN;
            const y = (j.y * (RECT_HEIGHT + RECT_PADDING)) + Y_ORIGIN;
            
            // const graphic = new Graphics();
            // graphic.x = x;  // Position the graphics object
            // graphic.y = y;
            // graphic.rect(0, 0, RECT_WIDTH, RECT_HEIGHT).fill([0, 0, 0]);
            // container.addChild(graphic);

            const sprite = new Sprite(texture);

            sprite.x = x;
            sprite.y = y;
            /*
            console.log('x is: ' + x);
            console.log('y is: ' + y);
            console.log('---------');
            */
            sprite.width = RECT_WIDTH;
            sprite.height = RECT_HEIGHT;
            sprite.alpha = 0.0;

            sprite.eventMode = 'static';
            sprite.cursor = 'pointer';

            sprite.on ('pointerdown', (event) =>
            {
                console.log("clicked");
                sprite.alpha = 0.0;
                let crop = j.crop;
                crop.status = 'growing';
                crop.growthTimeLeft = crop.growthTime;

                console.log('x is: ' + sprite.x);
                console.log('y is: ' + sprite.y);
                console.log('---------');
            });

            container.addChild(sprite);
        })
    });
    app.stage.addChild(container);

    console.log(gridManager.grid[0].length);

    /*const container = new Container();
    for(let i = 0; i < 3; i++)
    {
        const graphic = new Graphics().rect(i*110+ 50,50,100,100).fill(0xFFFFFF);
        container.addChild(graphic);
    }
    app.stage.addChild(container);*/

    /*const texture = await Assets.load('./kaposzta.png');

    const container = new Container();

    for (let i = 0; i < gridManager.grid.length; i++) 
    {
        for (let j = 0; j < gridManager.grid[i].length; j++) 
        {
            const sprite = new Sprite(texture);
            sprite.x += sprite.width * i;
            sprite.y += sprite.height * j;
            sprite.pivot.x = sprite.height / 2;
            sprite.pivot.y = sprite.width / 2;

            container.addChild(sprite);
        }
    }
    app.stage.addChild(container);*/

    let timer = 0;
    

    let fl = new FarmLandTile(0, 0);
    let wc = new WheatCrop(fl);
    fl.setCrop(wc);

    

    app.ticker.add((time) => {
        timer += app.ticker.deltaMS;
        
        if (timer >= 1000) {
            //wc.update(1);
            let alpha;
            for (let i = 0; i < gridManager.grid.length; i++) 
            {
                for (let j = 0; j < gridManager.grid[i].length; j++) 
                {
                        let crop = gridManager.grid[i][j].crop;
                        
                        crop.update(1);
                        //console.log(crop);

                        // green value based on how ripe the crop is (between 0-255)
                        alpha = (crop.growthTime - crop.growthTimeLeft) / crop.growthTime;
                        //console.log(color);
                        // 2d grid index to 1d container index
                        let index = j + (i * gridManager.grid[i].length);
                        let child = container.getChildAt(index);

                        child.alpha = alpha;
                        //child.clear();
                        //child.rect(0, 0, RECT_WIDTH, RECT_HEIGHT).fill([0,color,0]); 
                }
            }
            
            timer = 0;
        }

        /*
        setTimeout(() =>  {
            console.log( message + ' id updated');
            //console.log( message + ' id updated;');
            }, 1000);
        */

        /*container.children.forEach(element =>  {
            element.rotation -= 0.01 * time.deltaTime;
        })*/
    });
    

})();