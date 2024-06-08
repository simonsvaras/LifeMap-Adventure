import {gridCells} from "./helpers/grid.js";

/**
 * Class representing a 2D vector.
 */
export class Vector2 {
    /**
     * Create a 2D vector.
     * @param {number} [x=0] - The x-coordinate of the vector.
     * @param {number} [y=0] - The y-coordinate of the vector.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Create a duplicate of this vector.
     * @returns {Vector2} A new vector with the same x and y values.
     */
    duplicate() {
        return new Vector2(this.x, this.y);
    }

    /**
     * Check if the vector's position is within a specified rectangular area.
     * @param {Vector2} areaTopLeft - The top-left corner of the area.
     * @param {Vector2} areaBottomRight - The bottom-right corner of the area.
     * @returns {boolean} True if the position is within the area, false otherwise.
     */
    checkPositionInArea(areaTopLeft, areaBottomRight) {
        const xMin = areaTopLeft.x;
        const xMax = areaBottomRight.x;
        const yMin = areaTopLeft.y;
        const yMax = areaBottomRight.y;

        return this.x >= xMin && this.x <= xMax && this.y >= yMin && this.y <= yMax;
    }
}
