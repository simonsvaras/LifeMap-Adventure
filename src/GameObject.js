import {Vector2} from "./Vector2.js";
import {events} from "./Events.js";

/**
 * Class representing a game object.
 */
export class GameObject {
    /**
     * Create a game object.
     * @param {Object} options - The options for the game object.
     * @param {Vector2} [options.position] - The initial position of the game object.
     */
    constructor({position}) {
        this.position = position ?? new Vector2(0, 0);
        this.children = [];
        this.parent = null;
    }

    /**
     * The first entry point of the loop. Takes delta time from the game loop.
     * @param {number} delta - The time elapsed since the last frame.
     * @param {Object} root - The root game object.
     */
    stepEntry(delta, root) {
        // Call updates on all children first
        this.children.forEach((child) => child.stepEntry(delta, root));

        // Call any implemented step code
        this.step(delta, root);
    }

    /**
     * Called once every frame.
     * @param {number} _delta - The time elapsed since the last frame.
     */
    step(_delta) {
        // Override this method in subclasses to implement specific behaviors
    }

    /**
     * Draw entry method.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} x - The x-coordinate to draw the game object.
     * @param {number} y - The y-coordinate to draw the game object.
     */
    draw(ctx, x, y) {
        const drawPosX = x + this.position.x;
        const drawPosY = y + this.position.y;

        // Do the actual rendering for images
        this.drawImage(ctx, drawPosX, drawPosY);

        // Pass on to children
        this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
    }

    /**
     * Draw the image of the game object.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {number} drawPosX - The x-coordinate to draw the image.
     * @param {number} drawPosY - The y-coordinate to draw the image.
     */
    drawImage(ctx, drawPosX, drawPosY) {
        // Override this method in subclasses to implement specific rendering
    }

    /**
     * Remove the game object from the tree and destroy it.
     */
    destroy() {
        this.children.forEach(child => {
            child.destroy();
        });
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    /**
     * Add a child game object to this game object.
     * @param {GameObject} gameObject - The game object to add as a child.
     */
    addChild(gameObject) {
        gameObject.parent = this;
        this.children.push(gameObject);
    }

    /**
     * Checks if a child with the given id exists.
     * @param {number} id - The id of the child to check.
     * @returns {boolean} True if the child exists, false otherwise.
     */
    isExist(id) {
        return this.children.some(child => child.id === id);
    }

    /**
     * Remove a child game object from this game object.
     * @param {GameObject} gameObject - The game object to remove.
     */
    removeChild(gameObject) {
        events.unsubscribe(gameObject);
        this.children = this.children.filter(g => {
            return gameObject !== g;
        });
    }
}
