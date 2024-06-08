/**
 * Converts a number of grid cells to pixels.
 * @param {number} n - The number of grid cells.
 * @returns {number} The equivalent number of pixels.
 */
export const gridCells = n => {
    return n * 16;
}

/**
 * Converts a pixel value to the equivalent number of grid cells.
 * @param {number} n - The number of pixels.
 * @returns {number} The equivalent number of grid cells.
 */
export const toGrid = n => {
    return n / 16;
}

/**
 * Checks if a given space is free (i.e., not occupied by a wall).
 * @param {Set<string>} walls - A set of wall coordinates.
 * @param {number} x - The x-coordinate to check.
 * @param {number} y - The y-coordinate to check.
 * @returns {boolean} True if the space is free, false otherwise.
 */
export const isSpaceFree = (walls, x, y) => {
    // Convert to string format for easy lookup
    const str = `${x},${y}`;
    // Check if walls has an entry at this spot
    const isWallPresent = walls.has(str);
    return !isWallPresent;
}

/**
 * Prints the grid coordinates of a given pixel position.
 * @param {number} x - The x-coordinate in pixels.
 * @param {number} y - The y-coordinate in pixels.
 */
export const printGrid = (x, y) => {
    console.log(x / 16 + " " + y / 16);
}
