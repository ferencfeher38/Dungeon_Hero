import Phaser from "phaser";

class Play extends Phaser.Scene {

    constructor() {
        super("PlayScene");
    }

    create() {
        const map = this.make.tilemap({key: "map"});
        const tileset1 = map.addTilesetImage("forest_tiles", "tiles-1");

        map.createStaticLayer("platforms", tileset1);
    }

}

export default Play;