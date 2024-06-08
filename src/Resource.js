/**
 * Class representing a resource loader for images.
 */
class Resource {
    constructor() {
        /**
         * An object containing the paths to the images to be loaded.
         * @type {Object}
         */
        this.toLoad = {
            sky: "/LifeMap-Adventure/public/sprites/sky.png",
            ground: "/LifeMap-Adventure/public/sprites/mapV1.png",
            home: "/LifeMap-Adventure/public/sprites/mapV2.png",
            hero: "/LifeMap-Adventure/public/sprites/hero-sheet.png",
            shadow: "/LifeMap-Adventure/public/sprites/shadow.png",
            rod: "/LifeMap-Adventure/public/sprites/rod.png",
            arrow: "/LifeMap-Adventure/public/sprites/arrow.jpg",
        };

        /**
         * An object to store the loaded images.
         * @type {Object}
         */
        this.images = {};

        // Load each image
        Object.keys(this.toLoad).forEach(key => {
            this.loadImage(key, this.toLoad[key]);
        });
    }

    /**
     * Load an image and store it in the images object.
     * @param {string} key - The key to identify the image.
     * @param {string} src - The source path of the image.
     */
    loadImage(key, src) {
        if (this.images[key]) {
            delete this.images[key];
        }

        const img = new Image();
        img.src = src;
        this.images[key] = {
            image: img,
            isLoaded: false
        };
        img.onload = () => {
            this.images[key].isLoaded = true;
        };
    }

    /**
     * Add an image to the resources.
     * @param {string} key - The key to identify the image.
     * @param {string} src - The source path of the image.
     */
    addImage(key, src) {
        this.loadImage(key, src);
    }

    /**
     * Check if an image with the given key exists in the resources.
     * @param {string} key - The key to identify the image.
     * @returns {boolean} True if the image exists, false otherwise.
     */
    imageExists(key) {
        return this.images.hasOwnProperty(key);
    }
}

/** The singleton instance of the Resource class. */
export const resources = new Resource();
