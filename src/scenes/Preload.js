import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.tilemapTiledJSON("map", "assets/forest_map.json");
        this.load.image("tiles-1", "assets/forest_tiles.png");
        this.load.image("tiles-2", "assets/forest_objects.png");
        this.load.image("tiles-3", "assets/collider.png");
        this.load.image("knight", "assets/idle1.png");
    }

    create() {
        this.scene.start("PlayScene");
    }

}

export default Preload;