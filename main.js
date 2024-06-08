import {resources} from "./src/Resource.js";
import {Sprite} from "./src/Sprite.js";
import {Vector2} from "./src/Vector2.js";
import {GameLoop} from "./src/GameLoop.js";
import {DOWN, Input, LEFT, RIGHT, UP} from "./src/Input.js";
import {gridCells, isSpaceFree} from "./src/helpers/grid.js";
import {GameObject} from "./src/GameObject.js";
import {Hero} from "./src/objects/hero/Hero.js";
import {Camera} from "./src/Camera.js";
import {Rod} from "./src/objects/Rod/Rod.js";
import {events} from "./src/Events.js";
import {loadMap} from "./loadNewMap.js";

// Global variable to track the current map
/**
 * @type {number}
 */
export let map = 1;

window.addEventListener('load', () => {
    /**
     * Event listener for the 'start-button' to start the game and play background music.
     */
    document.getElementById('start-button').addEventListener('click', () => {
        const backgroundMusic = document.getElementById('background-music');
        backgroundMusic.play().then(() => {
            document.getElementById('start-button').style.display = 'none';
            startGame();
        }).catch((error) => {
            console.error("Failed to play music: ", error);
        });
    });
});

/**
 * Initializes and starts the game.
 */
function startGame() {
    // Grabbing the canvas to draw on
    const canvas = document.querySelector("#game-canvas");
    const ctx = canvas.getContext("2d");

    // Drag & Drop zone
    const dropZone = document.getElementById('drop-zone');

    // Poster key
    const posterKey = "poster1";

    // Intro element
    const intro = document.getElementById('intro');

    // Form containers
    const formContainer = document.getElementById('formContainer');
    const formOne = document.getElementById('formOne');
    const formContainerTwo = document.getElementById('formContainerTwo');
    const formContainerThree = document.getElementById('formContainerThree');
    const complexFormContainer = document.getElementById('formContainerFour');
    const complexForm = document.getElementById('complexForm');

    // CSS article elements
    const cssAricle = document.getElementById('CCSSelector');
    const cssGrid = document.getElementById('CCSSelectorGrid');
    const cssStyle1 = document.querySelectorAll('.main-list > .item:first-child > .sub-list .sub-item:first-child');
    const selectorOneDescription = document.getElementById('selectorOneDescription');
    const cssStyle2 = document.querySelectorAll('.item ~ .item');
    const selectorTwoDescription = document.getElementById('selectorTwoDescription');
    const cssStyle3 = document.querySelectorAll('.highlight');
    const selectorThreeDescription = document.getElementById('selectorThreeDescription');
    const cssStyle4 = document.querySelectorAll('.main-list > .item:nth-child(odd) .sub-list .sub-item:not(.special):last-child');
    const selectorFourDescription = document.getElementById('selectorFourDescription');
    const cssStyle5 = document.querySelectorAll('.grid-container > .grid-item:nth-child(3n)');
    const selectorFiveDescription = document.getElementById('selectorFiveDescription');

    // Establish the root scene
    const mainScene = new GameObject({
        position: new Vector2(0, 0)
    });

    // Create sprites and add them to the scene
    const posterOne = new Sprite({});

    const groundSprite = new Sprite({
        resource: resources.images.home,
        frameSize: new Vector2(2000, 2000)
    });

    mainScene.addChild(groundSprite);

    // Create hero and add to scene
    const hero = new Hero(gridCells(35), gridCells(40));
    mainScene.addChild(hero);

    // Create camera and add to scene
    const camera = new Camera();
    mainScene.addChild(camera);

    // Create rods and add to scene
    const rod = new Rod(gridCells(45), gridCells(45));
    mainScene.addChild(rod);
    mainScene.addChild(new Rod(gridCells(45), gridCells(46)));
    mainScene.addChild(new Rod(gridCells(45), gridCells(47)));

    // Initialize input
    mainScene.input = new Input();

    /**
     * Update function to be called each frame.
     * @param {number} delta - Time elapsed since the last frame.
     */
    const update = (delta) => {
        mainScene.stepEntry(delta, mainScene);
    };

    /**
     * Draw function to render the scene each frame.
     */
    const draw = () => {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Save the current state (for the camera)
        ctx.save();

        // Offset by camera position
        ctx.translate(camera.position.x, camera.position.y);

        // Draw objects in the main scene
        mainScene.draw(ctx, 0, 0);

        // Draw map-specific text on the canvas
        if (map === 0) {
            ctx.font = '10px Arial';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';

            // Add text to canvas
            let text = 'Add posters';
            ctx.fillText(text, gridCells(15), gridCells(39));

            text = 'Del posters';
            ctx.fillText(text, gridCells(19), gridCells(39));

            text = 'Forms';
            ctx.fillText(text, gridCells(16), gridCells(49));

            text = 'CSS';
            ctx.fillText(text, gridCells(24), gridCells(49));

            ctx.font = '26px Tahoma';
            text = '->';
            ctx.fillText(text, gridCells(53), gridCells(44));

            text = '<-';
            ctx.fillText(text, gridCells(37), gridCells(42));
        }

        if (map === 1) {
            ctx.font = '12px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';

            let text = 'Teleport';
            ctx.fillText(text, gridCells(50), gridCells(39));

            text = 'main Map';
            ctx.fillText(text, gridCells(50), gridCells(40));
        }

        // Restore to original state
        ctx.restore();
    };

    // Start the game loop
    const gameLoop = new GameLoop(update, draw);
    gameLoop.start();

    // Event listeners for drag and drop functionality
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

                        if (resources.imageExists(posterKey)) {
                            mainScene.removeChild(posterOne);
                        }

                        // Add image to resources
                        resources.addImage(posterKey, img.src);

                        posterOne.resource = resources.images[posterKey];
                        posterOne.frameSize = new Vector2(img.width, img.height);
                        posterOne.position = new Vector2(gridCells(13), gridCells(35));
                        posterOne.cropX = newScaleX;
                        posterOne.cropY = newScaleY;

                        mainScene.addChild(posterOne);

                        // Hide drop zone
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

    // Event listeners for various events
    events.on("TELEPORT_HOME", null, () => {
        loadMap();
        groundSprite.resource = resources.images.home;

        map = 1;

        hero.position.x = gridCells(36);
        hero.position.y = gridCells(40);

        hero.destinationPosition.x = gridCells(36);
        hero.destinationPosition.y = gridCells(40);
    });

    events.on("TELEPORT_MAP1", null, () => {
        loadMap();
        groundSprite.resource = resources.images.ground;

        map = 0;

        hero.position.x = gridCells(44);
        hero.position.y = gridCells(43);

        hero.destinationPosition.x = gridCells(44);
        hero.destinationPosition.y = gridCells(43);
    });

    events.on("REMOVE_POSTER1", null, () => {
        mainScene.removeChild(posterOne);
    });

    events.on("SHOW_DRAG&DROP", null, () => {
        dropZone.style.display = 'block';
    });

    // Show intro screen
    events.on("SHOW_INTRO", null, () => {
        intro.classList.remove('fadeOut');
        intro.classList.add('fadeIn');
        intro.style.display = 'block';
    });

    // Hide intro screen
    events.on("HIDE_INTRO", null, () => {
        intro.classList.remove('fadeIn');
        intro.classList.add('fadeOut');
        intro.style.display = 'none';
    });

    // Show and hide form one
    events.on("SHOW_FORM_ONE", null, () => {
        formContainer.classList.remove('fadeOut');
        formContainer.classList.add('fadeIn');
        formContainer.style.display = 'block';
    });

    events.on("HIDE_FORM_ONE", null, () => {
        formContainer.classList.remove('fadeIn');
        formContainer.classList.add('fadeOut');
        formContainer.style.display = 'none';
        formOne.reset();
    });

    // Show and hide form two
    events.on("SHOW_FORM_TWO", null, () => {
        formContainerTwo.classList.remove('fadeOut');
        formContainerTwo.classList.add('rotateIn');
        formContainerTwo.style.display = 'block';
    });

    events.on("HIDE_FORM_TWO", null, () => {
        formContainerTwo.classList.remove('rotateIn');
        formContainerTwo.classList.add('fadeOut');
        formContainerTwo.style.display = 'none';
        formOne.reset();
    });

    // Show and hide form three
    events.on("SHOW_FORM_THREE", null, () => {
        formContainerThree.classList.add('D3Rotate');
        formContainerThree.style.display = 'block';
    });

    events.on("HIDE_FORM_THREE", null, () => {
        formContainerThree.classList.remove('D3Rotate');
        formContainerThree.style.display = 'none';
        formOne.reset();
    });

    // Show and hide complex form
    events.on("SHOW_COMPLEX_FORM", null, () => {
        complexFormContainer.classList.add('fadeIn');
        complexFormContainer.style.display = 'block';
    });

    events.on("HIDE_COMPLEX_FORM", null, () => {
        complexFormContainer.classList.remove('fadeOut');
        complexFormContainer.style.display = 'none';
        complexForm.reset();
    });

    // Show and hide CSS article
    events.on("SHOW_CSS_ARTICLE", null, () => {
        cssAricle.classList.remove('fadeOutCSS');
        cssAricle.classList.add('fadeInCSS');
        cssAricle.style.display = 'block';
    });

    events.on("HIDE_CSS_ARTICLE", null, () => {
        cssAricle.classList.remove('fadeInCSS');
        cssAricle.classList.add('fadeOutCSS');
        cssAricle.style.display = 'none';
    });

    // Show and hide CSS grid
    events.on("SHOW_CSS_GRID", null, () => {
        cssGrid.classList.remove('fadeOutCSS');
        cssGrid.classList.add('fadeInCSS');
        cssGrid.style.display = 'block';
    });

    events.on("HIDE_CSS_GRID", null, () => {
        cssGrid.classList.remove('fadeInCSS');
        cssGrid.classList.add('fadeOutCSS');
        cssGrid.style.display = 'none';
    });

    // Show and hide CSS styles
    events.on("SHOW_CSS_STYLE1", null, () => {
        selectorOneDescription.classList.remove('fadeOutCSS');
        selectorOneDescription.classList.add('fadeInCSS');
        selectorOneDescription.style.display = "block";

        cssStyle1.forEach(element => {
            element.dataset.originalColor = element.style.color;
            element.dataset.originalBackgroundColor = element.style.backgroundColor;

            element.style.color = 'red';
            element.style.backgroundColor = 'yellow';
        });
    });

    events.on("HIDE_CSS_STYLE1", null, () => {
        selectorOneDescription.classList.add('fadeOutCSS');
        selectorOneDescription.classList.remove('fadeInCSS');
        selectorOneDescription.style.display = "none";

        cssStyle1.forEach(element => {
            element.style.color = element.dataset.originalColor || '';
            element.style.backgroundColor = element.dataset.originalBackgroundColor || '';
        });
    });

    events.on("SHOW_CSS_STYLE2", null, () => {
        selectorTwoDescription.classList.remove('fadeOutCSS');
        selectorTwoDescription.classList.add('fadeInCSS');
        selectorTwoDescription.style.display = "block";

        cssStyle2.forEach(element => {
            element.dataset.originalColor = element.style.color;
            element.dataset.originalBackgroundColor = element.style.backgroundColor;

            element.style.color = 'red';
            element.style.backgroundColor = 'yellow';
        });
    });

    events.on("HIDE_CSS_STYLE2", null, () => {
        selectorTwoDescription.classList.add('fadeOutCSS');
        selectorTwoDescription.classList.remove('fadeInCSS');
        selectorTwoDescription.style.display = "none";

        cssStyle2.forEach(element => {
            element.style.color = element.dataset.originalColor || '';
            element.style.backgroundColor = element.dataset.originalBackgroundColor || '';
        });
    });

    events.on("SHOW_CSS_STYLE3", null, () => {
        selectorThreeDescription.classList.remove('fadeOutCSS');
        selectorThreeDescription.classList.add('fadeInCSS');
        selectorThreeDescription.style.display = "block";

        cssStyle3.forEach(element => {
            element.style.fontWeight = 'bold'
            element.classList.add('addStar');
        });
    });

    events.on("HIDE_CSS_STYLE3", null, () => {
        selectorThreeDescription.classList.add('fadeOutCSS');
        selectorThreeDescription.classList.remove('fadeInCSS');
        selectorThreeDescription.style.display = "none";

        cssStyle3.forEach(element => {
            element.style.fontWeight = 'normal'
            element.classList.remove('addStar');
        });
    });

    events.on("SHOW_CSS_STYLE4", null, () => {
        selectorFourDescription.classList.remove('fadeOutCSS');
        selectorFourDescription.classList.add('fadeInCSS');
        selectorFourDescription.style.display = "block";

        cssStyle4.forEach(element => {
            element.dataset.originalColor = element.style.color;
            element.dataset.originalBackgroundColor = element.style.backgroundColor;

            element.style.color = 'red';
            element.style.backgroundColor = 'yellow';
        });
    });

    events.on("HIDE_CSS_STYLE4", null, () => {
        selectorFourDescription.classList.add('fadeOutCSS');
        selectorFourDescription.classList.remove('fadeInCSS');
        selectorFourDescription.style.display = "none";

        cssStyle4.forEach(element => {
            element.style.color = element.dataset.originalColor || '';
            element.style.backgroundColor = element.dataset.originalBackgroundColor || '';
        });
    });

    events.on("SHOW_CSS_STYLE5", null, () => {
        selectorFiveDescription.classList.remove('fadeOutCSS');
        selectorFiveDescription.classList.add('fadeInCSS');
        selectorFiveDescription.style.display = "block";

        cssStyle5.forEach(element => {
            element.classList.add('addStarGrid');
        });
    });

    events.on("HIDE_CSS_STYLE5", null, () => {
        selectorFiveDescription.classList.add('fadeOutCSS');
        selectorFiveDescription.classList.remove('fadeInCSS');
        selectorFiveDescription.style.display = "none";

        cssStyle5.forEach(element => {
            element.classList.remove('addStarGrid');
        });
    });
}
