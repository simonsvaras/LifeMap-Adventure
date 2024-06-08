export const gridCells = n => {
    return n * 16;
}

export const toGrid = n => {
    return n/16;
}

export const isSpaceFree = (walls, x, y) => {
    // Convert to string format for easy lookup
    const str = `${x},${y}`;
    // Check if walls has an entry at this spot
    const isWallPresent = walls.has(str);
    return !isWallPresent;
}

export const printGrid = (x,y) => {
    console.log(x/16 + " " + y/16);
}