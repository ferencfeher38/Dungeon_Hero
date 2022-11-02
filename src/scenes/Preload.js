import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.tilemapTiledJSON("map", "assets/forest_map.json");
        this.load.image("tiles-1", "assets/forest_tiles.png");
    }

    create() {
        this.scene.start("PlayScene");
    }

}

export default Preload;