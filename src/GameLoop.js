/**
 * Class representing a game loop that handles updating and rendering at a fixed time step.
 */
export class GameLoop {
    /**
     * Create a game loop.
     * @param {Function} update - The update function to call each frame.
     * @param {Function} render - The render function to call each frame.
     */
    constructor(update, render) {
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 frames per second

        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }

    /**
     * The main loop function that updates and renders the game.
     * @param {number} timestamp - The current time.
     */
    mainLoop = (timestamp) => {
        if (!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // Accumulate all the time since the last frame.
        this.accumulatedTime += deltaTime;

        // Fixed time step updates.
        // If there's enough accumulated time to run one or more fixed updates, run them.
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep); // Here, we pass the fixed time step size.
            this.accumulatedTime -= this.timeStep;
        }

        // Render
        this.render();

        // Unique identification
        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    /**
     * Start the game loop.
     */
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }

    /**
     * Stop the game loop.
     */
    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}
