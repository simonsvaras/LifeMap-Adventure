/**
 * Class representing a frame index pattern for animations.
 */
export class FrameIndexPattern {
    /**
     * Create a frame index pattern.
     * @param {Object} animationConfig - The configuration object for the animation.
     * @param {Array} animationConfig.frames - An array of frames with time and frame number.
     * @param {number} [animationConfig.duration=500] - The duration of the animation in milliseconds.
     */
    constructor(animationConfig) {
        this.currentTime = 0;
        this.animationConfig = animationConfig;
        this.duration = animationConfig.duration ?? 500;
    }

    /**
     * Get the current frame based on the current time.
     * @returns {number} The current frame.
     * @throws Will throw an error if the current time is before the first keyframe.
     */
    get frame() {
        const {frames} = this.animationConfig;
        for (let i = frames.length - 1; i >= 0; i--) {
            if (this.currentTime >= frames[i].time) {
                return frames[i].frame;
            }
        }
        throw "Time is before the first keyframe";
    }

    /**
     * Update the current time and reset if it exceeds the duration.
     * @param {number} delta - The time elapsed since the last update.
     */
    step(delta) {
        this.currentTime += delta;
        if (this.currentTime >= this.duration) {
            this.currentTime = 0;
        }
    }
}
