import {GameObject} from "./GameObject.js";
import {events} from "./Events.js";
import {Vector2} from "./Vector2.js";

/**
 * Class representing a Camera that follows a hero.
 * @extends GameObject
 */
export class Camera extends GameObject {
    /**
     * Create a Camera.
     */
    constructor() {
        super({});

        // Event listener for the hero's position
        events.on("HERO_POSITION", this, heroPosition => {
            // Create a new position based on the hero's position
            const personHalf = 8;
            const canvasWidth = 480;
            const canvasHeight = 240;
            const halfWidth = -personHalf + canvasWidth / 2;
            const halfHeight = -personHalf + canvasHeight / 2;
            this.position = new Vector2(
                -heroPosition.x + halfWidth,
                -heroPosition.y + halfHeight,
            );
        });
    }
}
