import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resource.js";
import {events} from "../../Events.js";

export class Rod extends GameObject {
    constructor(x,y) {
        super({
            position: new Vector2(x,y)
        });
        const sprite = new Sprite({
            resource: resources.images.rod,
            position: new Vector2(0, -5)
        })
        this.addChild(sprite);

        events.on("HERO_POSITION", this, pos => {
            // detect overlap
            const roundedHeroX = Math.round(pos.x);
            const roundedHeroY = Math.round(pos.y);
            if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
               // Overlap!
                this.onCollideWithHero();
            }
        })
    }

    onCollideWithHero() {
        // Remove this instance from the screen
        this.destroy()
        // Alert other things that we picked up a rod
        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.rod,
            position: this.position
        })
    }
}