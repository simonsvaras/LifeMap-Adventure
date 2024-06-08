/**
 * Helper function to create walking animation frames.
 * @param {number} [rootFrames=0] - The starting frame for the walking animation.
 * @returns {Object} An object representing the walking animation frames and duration.
 */
const makeWalkingFrames = (rootFrames = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrames + 1
            },
            {
                time: 100,
                frame: rootFrames
            },
            {
                time: 200,
                frame: rootFrames + 1
            },
            {
                time: 300,
                frame: rootFrames + 2
            },
        ]
    };
};

/**
 * Helper function to create standing animation frames.
 * @param {number} [rootFrame=0] - The frame for the standing animation.
 * @returns {Object} An object representing the standing animation frame and duration.
 */
const makeStandingFrames = (rootFrame = 0) => {
    return {
        duration: 400,
        frames: [
            {
                time: 0,
                frame: rootFrame,
            }
        ]
    };
};

/** Standing animation frames for facing down. */
export const STAND_DOWN = makeStandingFrames(1);
/** Standing animation frames for facing right. */
export const STAND_RIGHT = makeStandingFrames(4);
/** Standing animation frames for facing up. */
export const STAND_UP = makeStandingFrames(7);
/** Standing animation frames for facing left. */
export const STAND_LEFT = makeStandingFrames(10);

/** Walking animation frames for facing down. */
export const WALK_DOWN = makeWalkingFrames(0);
/** Walking animation frames for facing right. */
export const WALK_RIGHT = makeWalkingFrames(3);
/** Walking animation frames for facing up. */
export const WALK_UP = makeWalkingFrames(6);
/** Walking animation frames for facing left. */
export const WALK_LEFT = makeWalkingFrames(9);

/** Animation frames for picking up an item while facing down. */
export const PICK_UP_DOWN = {
    duration: 400,
    frames: [
        {
            time: 0,
            frame: 12
        }
    ]
};
