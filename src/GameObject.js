import {Vector2} from "./Vector2.js";

export class GameObject{
    constructor({position}) {
        this.position = position ?? new Vector2(0,0)
        this.children = [];
    }


    // First entry point of the loop
    // Take delta time from the game loop
    stepEntry(delta, root) {

        // Call updates on all children first
        this.children.forEach((child) => child.stepEntry(delta,root));

        // Call any implemented Step code
        this.step(delta,root);
    }

    // Called once every frame
    step(_delta){
        //
    }

    /* draw entry */
    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        // Do the actual rendering for Images
        this.drawImage(ctx, drawPosX, drawPosY);

        // Pass on to children
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }

    drawImage(ctx, drawPosX, drawPosY){
        //...
    }


    /* Other Game Objects are nestable inside this one */
    addChild(gameObject){
        this.children.push(gameObject);
    }

    removeChild(gameObject){
        this.children = this.children.filter(g => {
            return gameObject !== g;
        })
    }
}