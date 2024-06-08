/**
 * Moves a person towards a destination position at a specified speed.
 * @param {Object} person - The object representing the person to move. Must have a `position` property with `x` and `y` coordinates.
 * @param {Object} destinationPosition - The destination position to move towards. Must have `x` and `y` coordinates.
 * @param {number} speed - The speed at which to move towards the destination.
 * @returns {number} The remaining distance to the destination after moving.
 */
export function moveTowards(person, destinationPosition, speed) {
    let distanceToTravelX = destinationPosition.x - person.position.x;
    let distanceToTravelY = destinationPosition.y - person.position.y;

    // Calculate the distance to the destination
    let distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);

    if (distance <= speed) {
        // If we're close enough, just move directly to the destination
        person.position.x = destinationPosition.x;
        person.position.y = destinationPosition.y;
    } else {
        // Otherwise, move by the specified speed in the direction of the destination
        let normalizedX = distanceToTravelX / distance;
        let normalizedY = distanceToTravelY / distance;

        person.position.x += normalizedX * speed;
        person.position.y += normalizedY * speed;

        // Recalculate remaining distance after the move
        distanceToTravelX = destinationPosition.x - person.position.x;
        distanceToTravelY = destinationPosition.y - person.position.y;
        distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
    }

    return distance;
}
