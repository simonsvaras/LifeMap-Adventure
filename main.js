import {resources} from "/src/Resource.js";
import {Sprite} from "/src/Sprite.js";
import {Vector2} from "/src/Vector2.js";
import {GameLoop} from "/src/GameLoop.js";
import {DOWN, Input, LEFT, RIGHT, UP} from "/src/Input.js";
import {gridCells, isSpaceFree} from "/src/helpers/grid.js";
import {GameObject} from "./src/GameObject.js";
import {Hero} from "./src/objects/hero/Hero.js";
import {Camera} from "./src/Camera.js";

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


const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320,180)
})

mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(4), gridCells(4));
mainScene.addChild(hero);

const  camera = new Camera();
mainScene.addChild(camera);


mainScene.input = new Input();

// Establish update and draw main scene
const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
};



const draw = () => {
    // Clear anything stale
    ctx.clearRect(0,0, canvas.width, canvas.height);

    skySprite.drawImage(ctx,0,0)

    // Save the current state (for the camera)
    ctx.save();

    // Offset by camera position
    ctx.translate(camera.position.x, camera.position.y);

    // Draw object in the mounted scene
    mainScene.draw(ctx, 0,0);

    // Restore to origin state
    ctx.restore();
}



// Start the game
const gameLoop = new GameLoop(update,  draw);
gameLoop.start();