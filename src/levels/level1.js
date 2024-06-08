/**
 * A set to store wall coordinates.
 * @type {Set<string>}
 */
export const walls = new Set();

/**
 * Adds a wall at the specified coordinates.
 * @param {number} x - The x-coordinate of the wall.
 * @param {number} y - The y-coordinate of the wall.
 */
const addWall = (x, y) => walls.add(`${x},${y}`);

/**
 * Adds a horizontal wall spanning from startX to endX at the specified y-coordinate.
 * @param {number} startX - The starting x-coordinate.
 * @param {number} endX - The ending x-coordinate.
 * @param {number} y - The y-coordinate.
 * @param {number} [step=16] - The step size between each wall segment.
 */
const addHorizontalWall = (startX, endX, y, step = 16) => {
    if (startX < endX) {
        for (let x = startX; x <= endX; x += step) {
            addWall(x, y);
        }
    } else {
        for (let x = startX; x >= endX; x -= step) {
            addWall(x, y);
        }
    }
};

/**
 * Adds a vertical wall spanning from startY to endY at the specified x-coordinate.
 * @param {number} x - The x-coordinate.
 * @param {number} startY - The starting y-coordinate.
 * @param {number} endY - The ending y-coordinate.
 * @param {number} [step=16] - The step size between each wall segment.
 */
const addVerticalWall = (x, startY, endY, step = 16) => {
    if (startY < endY) {
        for (let y = startY; y <= endY; y += step) {
            addWall(x, y);
        }
    } else {
        for (let y = startY; y >= endY; y -= step) {
            addWall(x, y);
        }
    }
};

/**
 * Fetches wall coordinates from a JSON file and adds them to the walls set.
 */
fetch('../../LifeMap-Adventure/public/walls/mapV2.json')
    .then(response => response.json())
    .then(data => {
        data.walls.forEach(wall => {
            if (Array.isArray(wall)) {
                const [type, start, end, constant] = wall;
                if (type === 'horizontal') {
                    addHorizontalWall(start, end, constant);
                } else if (type === 'vertical') {
                    addVerticalWall(start, end, constant);
                }
            } else {
                const [x, y] = wall.split(',').map(Number);
                addWall(x, y);
            }
        });
    })
    .catch(error => {
        console.error('Error loading walls:', error);
    });
