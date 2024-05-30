import {resources} from "/src/Resource.js";
import {Sprite} from "/src/Sprite.js";
import {Vector2} from "/src/Vector2.js";
import {GameLoop} from "/src/GameLoop.js";
import {DOWN, Input, LEFT, RIGHT, UP} from "/src/Input.js";
import {gridCells, isSpaceFree} from "/src/helpers/grid.js";
import {moveTowards} from "/src/helpers/moveToward.js";
import {walls} from "/src/levels/level1.js";
import {FrameIndexPattern} from "/src/FrameIndexPattern.js";
import {STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP} from "/src/objects/hero/heroAnimation.js";
import {Animations} from "/src/Animations.js";


const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320,180)
})

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320,180)
})

const shadow = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32,32),
})

const hero = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(32,32),
    hFrames: 3,
    vFrames: 8,
    frame: 1,
    position: new Vector2(gridCells(6), gridCells(5)),
    animation: new Animations({
        walkUp: new FrameIndexPattern(WALK_UP),
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standUp: new FrameIndexPattern(STAND_UP),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
    })
})

// For grid movement
const heroDestinationPosition = hero.position.duplicate();
let heroFacing = DOWN;


const input = new Input();

const update = (delta) => {

    const distance = moveTowards(hero, heroDestinationPosition, 1) ;
    const hasArrived = distance <= 1;
    // Attempt to move again if the hero is at his position
    if(hasArrived){
        tryMove();
    }

    // Work on hero animations
    hero.step(delta);
};

const tryMove = () => {

    if(!input.direction){
        if(heroFacing === LEFT) { hero.animation.play("standLeft")}
        if(heroFacing === RIGHT) { hero.animation.play("standRight")}
        if(heroFacing === UP) { hero.animation.play("standUp")}
        if(heroFacing === DOWN) { hero.animation.play("standDown")}


        return;
    }

    let nextX = heroDestinationPosition.x;
    let nextY = heroDestinationPosition.y;
    const gridSize = 16;

    // Updating entities in the game
    if(input.direction === DOWN){
        nextY += gridSize;
        hero.animation.play("walkDown");
    }
    if(input.direction === LEFT){
        nextX -= gridSize;
        hero.animation.play("walkLeft");
    }
    if(input.direction === UP){
        nextY -= gridSize;
        hero.animation.play("walkUp");
    }
    if(input.direction === RIGHT){
        nextX += gridSize;
        hero.animation.play("walkRight");
    }
    heroFacing = input.direction ?? heroFacing;

    // Validating if the next destination is free
    if(isSpaceFree(walls, nextX, nextY)) {
        heroDestinationPosition.x = nextX;
        heroDestinationPosition.y = nextY;
    }
}

const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0,0);

    // Centre the hero in the cell
    const heroOffset = new Vector2(-8,-21);
    const heroPosX = hero.position.x + heroOffset.x;
    const heroPosY = hero.position.y + heroOffset.y;


    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
}



const gameLoop = new GameLoop(update,  draw);
gameLoop.start();