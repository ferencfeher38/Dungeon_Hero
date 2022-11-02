import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.tilemapTiledJSON("map", "assets/forest_map.json");
        this.load.image("tiles-1", "assets/forest_tiles.png");
        this.load.image("tiles-2", "assets/forest_objects.png");
        this.load.image("forest", "assets/forest.png");
    }

    create() {
        this.scene.start("PlayScene");
    }

}

export default Preload;