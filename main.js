import {resources} from "/src/Resource.js";
import {Sprite} from "/src/Sprite.js";
import {Vector2} from "/src/Vector2.js";
import {GameLoop} from "/src/GameLoop.js";
import {DOWN, Input, LEFT, RIGHT, UP} from "/src/Input.js";
import {gridCells, isSpaceFree} from "/src/helpers/grid.js";
import {GameObject} from "./src/GameObject.js";
import {Hero} from "./src/objects/hero/Hero.js";
import {Camera} from "./src/Camera.js";
import {Rod} from "./src/objects/Rod/Rod.js";

window.addEventListener('load', () => {

    // Přidání event listeneru na tlačítko pro spuštění hry
    document.getElementById('start-button').addEventListener('click', () => {
        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.play().then(() => {
            // Skryjte tlačítko po spuštění hudby
            document.getElementById('start-button').style.display = 'none';
            startGame();
        }).catch((error) => {
            console.error("Failed to play music: ", error);
        });
    });
});


function startGame() {

// Grabbing the canvas to draw to
    const canvas = document.querySelector("#game-canvas");
    const ctx = canvas.getContext("2d");


// Establish the root scene
    const mainScene = new GameObject({
        position: new Vector2(0, 0)
    })

// Build up the scene by adding a sky, ground, and hero
    const skySprite = new Sprite({
        resource: resources.images.sky,
        frameSize: new Vector2(320, 180)
    })


    const groundSprite = new Sprite({
        resource: resources.images.ground,
        frameSize: new Vector2(1000, 1000)
    })

    mainScene.addChild(groundSprite);

    const hero = new Hero(gridCells(50), gridCells(50));
    mainScene.addChild(hero);

    const camera = new Camera();
    mainScene.addChild(camera);

    const rod = new Rod(gridCells(7), gridCells(6))
    mainScene.addChild(rod)


    mainScene.input = new Input();

// Establish update and draw main scene
    const update = (delta) => {
        mainScene.stepEntry(delta, mainScene);
    };


    const draw = () => {
        // Clear anything stale
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //skySprite.drawImage(ctx, 0, 0)

        // Save the current state (for the camera)
        ctx.save();

        // Offset by camera position
        ctx.translate(camera.position.x, camera.position.y);

        // Draw object in the mounted scene
        mainScene.draw(ctx, 0, 0);

        // Restore to origin state
        ctx.restore();
    }


// Start the game
    const gameLoop = new GameLoop(update, draw);
    gameLoop.start();
}