import {gridCells} from "./helpers/grid.js";

export class Vector2{
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    duplicate(){
        return new Vector2(this.x,this.y);
    }

    checkPositionInArea(areaTopLeft, areaBottomRight){
        const xMin = areaTopLeft.x;
        const xMax = areaBottomRight.x;
        const yMin = areaTopLeft.y;
        const yMax = areaBottomRight.y;

        return this.x >= xMin && this.x <= xMax && this.y >= yMin && this.y <= yMax;


    }
}