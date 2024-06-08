// Constants for directions and actions that can be checked from anywhere
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const UP = "UP";
export const DOWN = "DOWN";
export const ENTER = "ENTER";

/**
 * Class representing user input.
 */
export class Input {
    /**
     * Create an Input handler.
     */
    constructor() {
        // List of currently held directions
        this.heldDirections = [];

        // Event listeners for keydown and keyup events
        document.addEventListener("keydown", (e) => {
            // Check for direction keys
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowPressed(UP);
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowPressed(DOWN);
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowPressed(LEFT);
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowPressed(RIGHT);
            }
            if (e.code === "Enter") {
                this.onArrowPressed(ENTER);
            }
        });

        document.addEventListener("keyup", (e) => {
            // Check for direction keys
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.onArrowReleased(UP);
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.onArrowReleased(DOWN);
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.onArrowReleased(LEFT);
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.onArrowReleased(RIGHT);
            }
        });
    }

    /**
     * Get the current direction being held.
     * @returns {string} The current direction.
     */
    get direction() {
        return this.heldDirections[0];
    }

    /**
     * Handle the event when an arrow key is pressed.
     * @param {string} direction - The direction of the arrow key.
     */
    onArrowPressed(direction) {
        // Add this direction to the queue if it's not already present
        if (this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.unshift(direction);
        }
    }

    /**
     * Handle the event when an arrow key is released.
     * @param {string} direction - The direction of the arrow key.
     */
    onArrowReleased(direction) {
        const index = this.heldDirections.indexOf(direction);
        if (index === -1) {
            return;
        }
        // Remove this direction from the list
        this.heldDirections.splice(index, 1);
    }
}
