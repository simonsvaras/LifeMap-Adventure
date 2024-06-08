class Resource {
    constructor() {
        // Everything we want to download
        this.toLoad = {
            sky: "/public/sprites/sky.png",
            ground: "/public/sprites/mapV1.png",
            home: "/public/sprites/mapV2.png",
            hero: "/public/sprites/hero-sheet.png",
            shadow: "/public/sprites/shadow.png",
            rod: "/public/sprites/rod.png",
            arrow: "/public/sprites/arrow.jpg",
        };
        // A bucket to keep all of our images
        this.images = {};

        // Load each image
        Object.keys(this.toLoad).forEach(key => {
            this.loadImage(key, this.toLoad[key]);
        });
    }

    loadImage(key, src) {
        if (this.images[key]) {
            delete this.images[key];
        }

        const img = new Image();
        img.src = src;
        this.images[key] = {
            image: img,
            isLoaded: false
        }
        img.onload = () => {
            this.images[key].isLoaded = true;
        }
    }

    addImage(key, src) {
        this.loadImage(key, src);
    }

    imageExists(key) {
        return this.images.hasOwnProperty(key);
    }
}

// Create one instance for the whole app to use
export const resources = new Resource();