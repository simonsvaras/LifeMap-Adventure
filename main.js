import {resources} from "/src/Resource.js";
import {Sprite} from "/src/Sprite.js";
import {Vector2} from "/src/Vector2.js";
import {GameLoop} from "/src/GameLoop.js";


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
    frame: 1
})

const heroPos = new Vector2(16 * 10, 16 * 5);

const update = () => {
    // Updating entities in the game
    heroPos.x += 1;
}

const draw = () => {
    skySprite.drawImage(ctx, 0, 0);
    groundSprite.drawImage(ctx, 0,0);

    // Centre the hero in the cell
    const heroOffset = new Vector2(-8,-21);
    const heroPosX = heroPos.x + heroOffset.x;
    const heroPosY = heroPos.y + heroOffset.y;


    shadow.drawImage(ctx, heroPosX, heroPosY);
    hero.drawImage(ctx, heroPosX, heroPosY);
}



const gameLoop = new GameLoop(update,  draw);
gameLoop.start();