import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {DOWN, LEFT, RIGHT, UP} from "../../Input.js";
import {gridCells, isSpaceFree} from "../../helpers/grid.js";
import {walls} from "../../levels/level1.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resource.js";
import {Animations} from "../../Animations.js";
import {FrameIndexPattern} from "../../FrameIndexPattern.js";
import {
    PICK_UP_DOWN,
    STAND_DOWN,
    STAND_LEFT,
    STAND_RIGHT,
    STAND_UP,
    WALK_DOWN,
    WALK_LEFT,
    WALK_RIGHT,
    WALK_UP
} from "./heroAnimation.js";
import {moveTowards} from "../../helpers/moveToward.js";
import {events} from "../../Events.js";

export class Hero extends GameObject {
    constructor(x,y) {
        super({
            position: new Vector2(x,y)
        });

        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32,32),
            position: new Vector2(-8, -16),
        })
        this.addChild(shadow);


         this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32,32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8, -17),
            animation: new Animations({
                walkUp: new FrameIndexPattern(WALK_UP),
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standUp: new FrameIndexPattern(STAND_UP),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
                pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
            })
        })

        this.addChild(this.body);


        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.itemPickupTime = 0;
        this.itemPickupShell = null;

        this.stepSound = document.getElementById('step-effect');

        events.on("HERO_PICKS_UP_ITEM", this, data => {
            this.onPickUpItem(data);
        })
    }


    step(delta, root) {
        if(this.itemPickupTime > 0){
            this.workOnItemPickup(delta);
            return
        }

        const distance = moveTowards(this, this.destinationPosition, 1.5) ;
        const hasArrived = distance <= 0;
        // Attempt to move again if the hero is at his position
        if(hasArrived){
            this.tryMove(root);
        }

        this.tryEmitPosition()

    }

    tryEmitPosition(){
        if (this.lastX === this.position.x && this.lastY === this.position.y) {
            return;
        }
        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("HERO_POSITION", this.position)
    }

    tryMove (root) {
        const {input} = root;

        if(!input.direction){
            if(this.facingDirection === LEFT) { this.body.animation.play("standLeft")}
            if(this.facingDirection === RIGHT) { this.body.animation.play("standRight")}
            if(this.facingDirection === UP) { this.body.animation.play("standUp")}
            if(this.facingDirection === DOWN) { this.body.animation.play("standDown")}

            return;
        }

        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = 16;

        // Updating entities in the game
        if(input.direction === DOWN){
            nextY += gridSize;
            this.body.animation.play("walkDown");
            this.stepSound.play();
        }
        if(input.direction === LEFT){
            nextX -= gridSize;
            this.body.animation.play("walkLeft");
            this.stepSound.play();
        }
        if(input.direction === UP){
            nextY -= gridSize;
            this.body.animation.play("walkUp");
            this.stepSound.play();
        }
        if(input.direction === RIGHT){
            nextX += gridSize;
            this.body.animation.play("walkRight");
            this.stepSound.play();
        }
        this.facingDirection = input.direction ?? this.facingDirection;

        // Validating if the next destination is free
        if(isSpaceFree(walls, nextX, nextY)) {
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;
        }
    }

    onPickUpItem({ image, position }) {
        // Make sure we land right on the item
        this.destinationPosition = position.duplicate();

        // Start the pickup animation
        this.itemPickupTime = 500; // ms

        this.itemPickupShell = new GameObject({});
        this.itemPickupShell.addChild(new Sprite({
            resource: image,
            position: new Vector2(0, -18)
        }))
        this.addChild(this.itemPickupShell);
    }

    workOnItemPickup(delta) {
        this.itemPickupTime -= delta;
        this.body.animation.play("pickUpDown")

        // Remove the item being held overhead
        if (this.itemPickupTime <= 0) {
            this.itemPickupShell.destroy();
        }

    }
}