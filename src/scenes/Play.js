import Phaser from "phaser";

class Play extends Phaser.Scene {

    constructor() {
        super("PlayScene");
    }

    create() {
        this.add.image(0, 0, "forest").setOrigin(0);
        const map = this.make.tilemap({ key: "map" })
        const tileset1 = map.addTilesetImage("forest_tiles", "tiles-1");
        const tileset2 = map.addTilesetImage("forest_objects", "tiles-2");

        map.createStaticLayer("platforms", tileset1);
        map.createStaticLayer("environment", tileset2);
    }

}

export default Play;