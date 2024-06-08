/**
 * Class representing a set of animations.
 */
export class Animations {
    /**
     * Create animations.
     * @param {Object} patterns - An object containing animation patterns.
     */
    constructor(patterns) {
        this.patterns = patterns;
        this.activeKey = Object.keys(this.patterns)[0]; // Set the default active animation
    }

    /**
     * Get the current frame of the active animation.
     * @returns {number} The current frame of the active animation.
     */
    get frame() {
        return this.patterns[this.activeKey].frame;
    }

    /**
     * Play a specific animation.
     * @param {string} key - The key of the animation to play.
     * @param {number} [startAtTime=0] - The time to start the animation at (default is 0).
     */
    play(key, startAtTime = 0) {
        // If the requested animation is already playing, do nothing
        if (this.activeKey === key) {
            return;
        }
        // Switch to the new animation
        this.activeKey = key;
        this.patterns[this.activeKey].currentTime = startAtTime;
    }

    /**
     * Update the current animation based on the time elapsed.
     * @param {number} delta - The time elapsed since the last update.
     */
    step(delta) {
        this.patterns[this.activeKey].step(delta);
    }
}
