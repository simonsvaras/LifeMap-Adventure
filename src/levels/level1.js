export const walls = new Set();

const addWall = (x, y) => walls.add(`${x},${y}`);

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

// Načtení souřadnic ze souboru
fetch('../../public/walls/mapV2.json')
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
