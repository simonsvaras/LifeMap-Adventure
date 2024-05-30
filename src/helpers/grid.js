export  const  gridCells = n => {
    return n * 16;
}

// Takes list of wall, x and y and says if anything is there or not 
export const isSpaceFree = (walls, x, y) => {
    // Convert to string format for easy lookup
    const str = `${x},${y}`;
    // Check if walls has an entry at this spot
    const isWallPresent = walls.has(str);
    return !isWallPresent;
}