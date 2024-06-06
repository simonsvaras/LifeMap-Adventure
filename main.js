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
import {events} from "./src/Events.js";

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

// Drag & Drop
    const dropZone = document.getElementById('drop-zone');

// Posters
    const posterKey = "poster1";

// Forms
    const formContainer = document.getElementById('formContainer');
    const formOne = document.getElementById('formOne');
    const formContainerTwo = document.getElementById('formContainerTwo');

// CSS article
    const cssAricle = document.getElementById('CCSSelector');

// Establish the root scene
    const mainScene = new GameObject({
        position: new Vector2(0, 0)
    })

    const posterOne = new  Sprite({});

// Build up the scene by adding a sky, ground, and hero
    const skySprite = new Sprite({
        resource: resources.images.sky,
        frameSize: new Vector2(320, 180)
    })


    const groundSprite = new Sprite({
        resource: resources.images.ground,
        frameSize: new Vector2(2000, 2000)
    })

    mainScene.addChild(groundSprite);

    const hero = new Hero(gridCells(40), gridCells(40));
    mainScene.addChild(hero);

    const camera = new Camera();
    mainScene.addChild(camera);

    const rod = new Rod(gridCells(45), gridCells(45))
    mainScene.addChild(rod)

    mainScene.addChild(new Rod(gridCells(45), gridCells(46)));
    mainScene.addChild(new Rod(gridCells(45), gridCells(47)));



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

        // Nastavení stylu textu
        ctx.font = '10px Arial';
        ctx.fillStyle = 'red'; // Barva textu
        ctx.textAlign = 'center'; // Zarovnání textu na střed

        // Přidání textu na canvas
        let text = 'Add posters';
        ctx.fillText(text, gridCells(15), gridCells(40)); // Vykreslení textu uprostřed canvasu

        // Nastavení stylu textu
        ctx.font = '10px Arial';
        ctx.fillStyle = 'red'; // Barva textu
        ctx.textAlign = 'center'; // Zarovnání textu na střed

        // Přidání textu na canvas
        text = 'Del posters';
        ctx.fillText(text, gridCells(19), gridCells(40)); // Vykreslení textu uprostřed canvasu

        // Restore to origin state
        ctx.restore();
    }


// Start the game
    const gameLoop = new GameLoop(update, draw);
    gameLoop.start();

    // Event listener for drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#333';
        dropZone.style.color = '#333';
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        dropZone.style.color = '#999';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ccc';
        dropZone.style.color = '#999';

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                if (typeof event.target.result === 'string') {
                    const img = new Image();
                    img.onload = () => {

                        const newWidth = gridCells(7);
                        const newHeight = gridCells(4);

                        const newScaleX = newWidth / img.width;
                        const newScaleY = newHeight / img.height;

                        if (resources.imageExists(posterKey)){
                            mainScene.removeChild(posterOne);
                        }

                        // Přidání obrázku do resources
                        resources.addImage(posterKey, img.src);

                        // Synchronizace s herním cyklem
                        /*
                        const newSprite = new Sprite({
                            resource: resources.images[poster1],
                            frameSize: new Vector2(img.width, img.height),
                            position: new Vector2(gridCells(21), gridCells(36)),
                            scale: newScale
                        });

                         */

                        posterOne.resource = resources.images[posterKey];
                        posterOne.frameSize = new Vector2(img.width, img.height);
                        posterOne.position = new Vector2(gridCells(13), gridCells(35));
                        posterOne.cropX = newScaleX;
                        posterOne.cropY = newScaleY;

                        mainScene.addChild(posterOne);

                        // Skrýt drop zone
                        dropZone.style.display = 'none';
                    };

                    img.src = event.target.result;
                    console.log("Image source:", img.src);
                } else {
                    console.error("FileReader result is not a string");
                }
            };

            reader.readAsDataURL(file);
        }
    });




// EVENTS

    // Zobrazení drop zone při události SHOW_FORM
    events.on("SHOW_DRAG&DROP", null, () => {
        dropZone.style.display = 'block';
    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("REMOVE_POSTER1", null, () => {
        mainScene.removeChild(posterOne);
    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("SHOW_FORM_ONE", null, () => {
        formContainer.classList.remove('fadeOut');
        formContainer.classList.add('fadeIn');

        formContainer.style.display = 'block';

    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("HIDE_FORM_ONE", null, () => {
        formContainer.classList.remove('fadeIn');

        formContainer.classList.add('fadeOut');
        formContainer.style.display = 'none';
        formOne.reset();

    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("SHOW_FORM_TWO", null, () => {
        formContainerTwo.classList.remove('fadeOut');
        formContainerTwo.classList.add('rotateIn');
        formContainerTwo.style.display = 'block';

    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("HIDE_FORM_TWO", null, () => {
        formContainerTwo.classList.remove('rotateIn');
        formContainerTwo.classList.add('fadeOut');
        formContainerTwo.style.display = 'none';
        //formOne.reset();

    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("SHOW_FORM_THREE", null, () => {
        formContainerTwo.classList.remove('fadeOut');
        formContainerTwo.classList.add('D3Rotate');
        formContainerTwo.style.display = 'block';

    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("HIDE_FORM_THREE", null, () => {
        formContainerTwo.classList.remove('D3Rotate');
        formContainerTwo.classList.add('fadeOut');
        formContainerTwo.style.display = 'none';
        //formOne.reset();

    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("SHOW_CSS_ARTICLE", null, () => {
        cssAricle.classList.remove('fadeOut');
        cssAricle.classList.add('fadeIn');
        cssAricle.style.display = 'block';

    });

    // Zobrazení drop zone při události SHOW_FORM
    events.on("HIDE_CSS_ARTICLE", null, () => {
        cssAricle.classList.remove('fadeIn');
        cssAricle.classList.add('fadeOut');
        cssAricle.style.display = 'none';
        //formOne.reset();

    });



}

