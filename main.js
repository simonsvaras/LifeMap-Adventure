import {resources} from "/src/Resource.js";
import {Sprite} from "/src/Sprite.js";
import {Vector2} from "/src/Vector2.js";
import {GameLoop} from "/src/GameLoop.js";
import {DOWN, Input, LEFT, RIGHT, UP} from "/src/Input.js";
import {gridCells, isSpaceFree} from "/src/helpers/grid.js";
import {GameObject} from "./src/GameObject.js";
import {Hero} from "./src/objects/hero/Hero.js";

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

// Establish the root scene
const mainScene = new GameObject({
    position: new Vector2(0,0)
})

// Build up the scene by adding a sky, ground, and hero
const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320,180)
})

mainScene.addChild(skySprite);

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320,180)
})

mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(4), gridCells(4));
mainScene.addChild(hero);


mainScene.input = new Input();

// Establish update and draw main scene
const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
};



const draw = () => {
    mainScene.draw(ctx,0,0)
}



// Start the game
const gameLoop = new GameLoop(update,  draw);
gameLoop.start();