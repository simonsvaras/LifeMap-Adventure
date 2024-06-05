import {Vector2} from "./Vector2.js";
import {GameObject} from "/LifeMap-Adventure/src/GameObject.js";
import {printGrid} from "./helpers/grid.js";


export class Sprite extends GameObject {
    constructor({
        resource, // Image we want to draw
        frameSize, // Size of the crop of the image
        hFrames, // How sprite arranged horizontally
        vFrames, // How sprite arranged vertically
        frame, // which frame we want to show
        scale, // How large to draw this image
        position,
        animation,
        }) {
        super({});
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16,16);
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0,0);
        this.animation = animation ?? null;
        this.cropY = 1;
        this.cropX = 1;
        this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0;
        for (let v=0; v<this.vFrames; v++) {
            for (let h=0; h<this.hFrames; h++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x * h, this.frameSize.y * v)
                )
                frameCount++;
            }
        }
    }

    step(delta){
        if(!this.animation){
            return
        }
        this.animation.step(delta);
        this.frame = this.animation.frame;
    }

    drawImage(ctx,x, y){
        if(!this.resource.isLoaded){
            return;
        }

        // Find the correct sprite sheer frame to use
        let frameCoordX = 0;
        let frameCoordY = 0;
        const frame = this.frameMap.get(this.frame);
        if(frame) {
            frameCoordX = frame.x;
            frameCoordY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;


        if (this.scale !== 1) {
            this.cropX = this.scale;
            this.cropY = this.scale;
        }

        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY, // Top Y corner of frame
            frameSizeX, // How much to crop from the sprite sheet(x)
            frameSizeY, // How much to crop from the sprite sheet(y)
            x, // Where to place this on canvas tag X
            y, // Where to place this on canvas tag Y
            frameSizeX * this.cropX, // How large to scale it (X)
            frameSizeY * this.cropY, // How large to scale it (Y)
        );
        //console.log("Drawing image at position:", printGrid(x,y));
    }

}