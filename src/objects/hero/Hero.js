import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {DOWN, LEFT, RIGHT, UP} from "../../Input.js";
import {gridCells, isSpaceFree, printGrid} from "../../helpers/grid.js";
import {walls} from "../../levels/level1.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resource.js";
import {Animations} from "../../Animations.js";
import {FrameIndexPattern} from "../../FrameIndexPattern.js";
import {
    PICK_UP_DOWN,
    STAND_DOWN,
    STAND_LEFT,
    STAND_RIGHT,
    STAND_UP,
    WALK_DOWN,
    WALK_LEFT,
    WALK_RIGHT,
    WALK_UP
} from "./heroAnimation.js";
import {moveTowards} from "../../helpers/moveToward.js";
import {events} from "../../Events.js";
import {map} from "../../../main.js";

/**
 * Represents the Hero character in the game.
 * @extends GameObject
 */
export class Hero extends GameObject {
    /**
     * Creates an instance of Hero.
     * @param {number} x - The x-coordinate of the hero's initial position.
     * @param {number} y - The y-coordinate of the hero's initial position.
     */
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });

        // Add a shadow sprite
        const shadow = new Sprite({
            resource: resources.images.shadow,
            frameSize: new Vector2(32, 32),
            position: new Vector2(-8, -16),
        });
        this.addChild(shadow);

        // Add the hero's body sprite with animations
        this.body = new Sprite({
            resource: resources.images.hero,
            frameSize: new Vector2(32, 32),
            hFrames: 3,
            vFrames: 8,
            frame: 1,
            position: new Vector2(-8, -17),
            animation: new Animations({
                walkUp: new FrameIndexPattern(WALK_UP),
                walkDown: new FrameIndexPattern(WALK_DOWN),
                walkLeft: new FrameIndexPattern(WALK_LEFT),
                walkRight: new FrameIndexPattern(WALK_RIGHT),
                standUp: new FrameIndexPattern(STAND_UP),
                standDown: new FrameIndexPattern(STAND_DOWN),
                standLeft: new FrameIndexPattern(STAND_LEFT),
                standRight: new FrameIndexPattern(STAND_RIGHT),
                pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
            })
        });

        this.addChild(this.body);

        // Initialize hero properties
        this.facingDirection = DOWN;
        this.destinationPosition = this.position.duplicate();
        this.itemPickupTime = 0;
        this.itemPickupShell = null;

        this.stepSound = document.getElementById('step-effect');

        // Initialize visibility flags for UI elements
        this.isIntroVisible = false;
        this.isFormOneVisible = false;
        this.isFormTwoVisible = false;
        this.isFormThreeVisible = false;
        this.isComplexFormVisible = false;
        this.isCSSArticeleVisivle = false;
        this.isCSSArcticelStyle1Visible = false;
        this.isCSSArcticelStyle2Visible = false;
        this.isCSSArcticelStyle3Visible = false;
        this.isCSSArcticelStyle4Visible = false;
        this.isCSSArcticelStyle5Visible = false;

        // Define areas for specific actions
        this.CSSArticleTopLeft = new Vector2(gridCells(14), gridCells(54));
        this.CSSArticleBottomRight = new Vector2(gridCells(22), gridCells(58));

        // Teleport map area
        this.teleportMAP1TopLeft = new Vector2(gridCells(48), gridCells(38));
        this.teleportMAP1BottomRight = new Vector2(gridCells(52), gridCells(40));

        // Set up event listener for item pickup
        events.on("HERO_PICKS_UP_ITEM", this, data => {
            this.onPickUpItem(data);
        });
    }

    /**
     * Updates the hero's position and state each frame.
     * @param {number} delta - The time elapsed since the last frame.
     * @param {GameObject} root - The root game object.
     */
    step(delta, root) {
        if (this.itemPickupTime > 0) {
            this.workOnItemPickup(delta);
            return;
        }

        const distance = moveTowards(this, this.destinationPosition, 2.5);
        const hasArrived = distance <= 0;

        // Attempt to move again if the hero is at his position
        if (hasArrived) {
            this.checkEvents();
            this.tryMove(root);
            printGrid(this.position.x, this.position.y);
        }

        this.tryEmitPosition();
    }

    /**
     * Emits the hero's current position if it has changed.
     */
    tryEmitPosition() {
        if (this.lastX === this.position.x && this.lastY === this.position.y) {
            return;
        }
        this.lastX = this.position.x;
        this.lastY = this.position.y;
        events.emit("HERO_POSITION", this.position);
    }

    /**
     * Attempts to move the hero based on the current input direction.
     * @param {GameObject} root - The root game object.
     */
    tryMove(root) {
        const {input} = root;

        if (!input.direction) {
            if (this.facingDirection === LEFT) { this.body.animation.play("standLeft"); }
            if (this.facingDirection === RIGHT) { this.body.animation.play("standRight"); }
            if (this.facingDirection === UP) { this.body.animation.play("standUp"); }
            if (this.facingDirection === DOWN) { this.body.animation.play("standDown"); }

            return;
        }

        let nextX = this.destinationPosition.x;
        let nextY = this.destinationPosition.y;
        const gridSize = 16;

        // Update the hero's position based on input direction
        if (input.direction === DOWN) {
            nextY += gridSize;
            this.body.animation.play("walkDown");
            this.stepSound.play();
        }
        if (input.direction === LEFT) {
            nextX -= gridSize;
            this.body.animation.play("walkLeft");
            this.stepSound.play();
        }
        if (input.direction === UP) {
            nextY -= gridSize;
            this.body.animation.play("walkUp");
            this.stepSound.play();
        }
        if (input.direction === RIGHT) {
            nextX += gridSize;
            this.body.animation.play("walkRight");
            this.stepSound.play();
        }
        this.facingDirection = input.direction ?? this.facingDirection;

        // Validate if the next destination is free
        if (isSpaceFree(walls, nextX, nextY)) {
            this.destinationPosition.x = nextX;
            this.destinationPosition.y = nextY;
        }
    }

    /**
     * Handles the event when the hero picks up an item.
     * @param {Object} data - Data containing the item's image and position.
     * @param {string} data.image - The image resource of the item.
     * @param {Vector2} data.position - The position of the item.
     */
    onPickUpItem({image, position}) {
        // Set the destination to the item's position
        this.destinationPosition = position.duplicate();

        // Start the pickup animation
        this.itemPickupTime = 500; // ms

        // Create a shell for the item being picked up
        this.itemPickupShell = new GameObject({});
        this.itemPickupShell.addChild(new Sprite({
            resource: image,
            position: new Vector2(0, -18)
        }));
        this.addChild(this.itemPickupShell);
    }

    /**
     * Handles the item pickup animation and timing.
     * @param {number} delta - The time elapsed since the last frame.
     */
    workOnItemPickup(delta) {
        this.itemPickupTime -= delta;
        this.body.animation.play("pickUpDown");

        // Remove the item being held overhead
        if (this.itemPickupTime <= 0) {
            this.itemPickupShell.destroy();
        }
    }

    /**
     * Checks for and triggers specific game events based on the hero's position.
     */
    checkEvents() {
        if (map === 0) {
            // Teleport home
            if (this.position.x === gridCells(54) && this.position.y === gridCells(43)) {
                this.destinationPosition.y += gridCells(1);
                events.emit("TELEPORT_HOME");
            }

            // Remove poster
            if (this.position.x === gridCells(18) && this.position.y === gridCells(39)) {
                console.log("remove poster1");
                events.emit("REMOVE_POSTER1");
            }

            // Show drag and drop
            if (this.position.x === gridCells(14) && this.position.y === gridCells(39)) {
                this.destinationPosition.y += gridCells(1);
                events.emit("SHOW_DRAG&DROP");
            }

            // Forms events
            this.toggleFormVisibility(gridCells(14), gridCells(47), "SHOW_FORM_ONE", "HIDE_FORM_ONE", 'isFormOneVisible');
            this.toggleFormVisibility(gridCells(17), gridCells(47), "SHOW_FORM_TWO", "HIDE_FORM_TWO", 'isFormTwoVisible');
            this.toggleFormVisibility(gridCells(20), gridCells(47), "SHOW_FORM_THREE", "HIDE_FORM_THREE", 'isFormThreeVisible');
            this.toggleFormVisibility(gridCells(11), gridCells(47), "SHOW_COMPLEX_FORM", "HIDE_COMPLEX_FORM", 'isComplexFormVisible');

            // CSS Selectors
            this.toggleCSSVisibility(this.CSSArticleTopLeft, this.CSSArticleBottomRight, "SHOW_CSS_ARTICLE", "HIDE_CSS_ARTICLE", 'isCSSArticeleVisivle');
            this.toggleCSSStyleVisibility(gridCells(20), gridCells(56), "SHOW_CSS_STYLE1", "HIDE_CSS_STYLE1", 'isCSSArcticelStyle1Visible');
            this.toggleCSSStyleVisibility(gridCells(18), gridCells(56), "SHOW_CSS_STYLE2", "HIDE_CSS_STYLE2", 'isCSSArcticelStyle2Visible');
            this.toggleCSSStyleVisibility(gridCells(16), gridCells(56), "SHOW_CSS_STYLE3", "HIDE_CSS_STYLE3", 'isCSSArcticelStyle3Visible');
            this.toggleCSSStyleVisibility(gridCells(14), gridCells(56), "SHOW_CSS_STYLE4", "HIDE_CSS_STYLE4", 'isCSSArcticelStyle4Visible');
            this.toggleCSSStyleVisibility(gridCells(12), gridCells(56), ["SHOW_CSS_GRID", "SHOW_CSS_STYLE5"], ["HIDE_CSS_GRID", "HIDE_CSS_STYLE5"], 'isCSSArcticelStyle5Visible');
        }

        if (map === 1) {
            // Show intro
            this.toggleFormVisibility(gridCells(35), gridCells(40), "SHOW_INTRO", "HIDE_INTRO", 'isIntroVisible');

            // Teleport map area
            const isInArea = this.position.checkPositionInArea(this.teleportMAP1TopLeft, this.teleportMAP1BottomRight);
            if (isInArea && !this.isCSSArticeleVisivle) {
                console.log("Show form 1");
                events.emit("TELEPORT_MAP1");
                this.isCSSArticeleVisivle = true;
            }
        }
    }

    /**
     * Toggles visibility of a form based on the hero's position.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @param {string} showEvent - The event to show the form.
     * @param {string} hideEvent - The event to hide the form.
     * @param {string} visibilityFlag - The visibility flag to update.
     */
    toggleFormVisibility(x, y, showEvent, hideEvent, visibilityFlag) {
        if (!this[visibilityFlag]) {
            if (this.position.x === x && this.position.y === y) {
                console.log(`Show form: ${showEvent}`);
                events.emit(showEvent);
                this[visibilityFlag] = true;
            }
        } else {
            if (this.position.x !== x || this.position.y !== y) {
                console.log(`Hide form: ${hideEvent}`);
                events.emit(hideEvent);
                this[visibilityFlag] = false;
            }
        }
    }

    /**
     * Toggles visibility of a CSS area based on the hero's position.
     * @param {Vector2} topLeft - The top left corner of the area.
     * @param {Vector2} bottomRight - The bottom right corner of the area.
     * @param {string} showEvent - The event to show the CSS area.
     * @param {string} hideEvent - The event to hide the CSS area.
     * @param {string} visibilityFlag - The visibility flag to update.
     */
    toggleCSSVisibility(topLeft, bottomRight, showEvent, hideEvent, visibilityFlag) {
        const isInArea = this.position.checkPositionInArea(topLeft, bottomRight);
        if ((isInArea && !this[visibilityFlag]) || (this.position.x === gridCells(23) && this.position.y === gridCells(56))) {
            console.log(`Show CSS: ${showEvent}`);
            events.emit(showEvent);
            this[visibilityFlag] = true;
        } else if ((!isInArea && this[visibilityFlag]) && (this.position.x !== gridCells(23) || this.position.y !== gridCells(56))) {
            console.log(`Hide CSS: ${hideEvent}`);
            events.emit(hideEvent);
            this[visibilityFlag] = false;
        }
    }

    /**
     * Toggles visibility of a CSS style based on the hero's position.
     * @param {number} x - The x-coordinate to check.
     * @param {number} y - The y-coordinate to check.
     * @param {string|Array} showEvent - The event(s) to show the CSS style.
     * @param {string|Array} hideEvent - The event(s) to hide the CSS style.
     * @param {string} visibilityFlag - The visibility flag to update.
     */
    toggleCSSStyleVisibility(x, y, showEvent, hideEvent, visibilityFlag) {
        if (!this[visibilityFlag]) {
            if (this.position.x === x && this.position.y === y) {
                console.log(`Show CSS Style: ${showEvent}`);
                if (Array.isArray(showEvent)) {
                    showEvent.forEach(event => events.emit(event));
                } else {
                    events.emit(showEvent);
                }
                this[visibilityFlag] = true;
            }
        } else {
            if (this.position.x !== x || this.position.y !== y) {
                console.log(`Hide CSS Style: ${hideEvent}`);
                if (Array.isArray(hideEvent)) {
                    hideEvent.forEach(event => events.emit(event));
                } else {
                    events.emit(hideEvent);
                }
                this[visibilityFlag] = false;
            }
        }
    }
}
