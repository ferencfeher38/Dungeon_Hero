import Phaser from "phaser";

class Play extends Phaser.Scene {

    constructor() {
        super("PlayScene");
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const player = this.createPlayer();
        this.physics.add.collider(player, layers.platformsColliders);
    }

    createMap() {
        const map = this.make.tilemap({key: "map"});
        map.addTilesetImage("forest_tiles", "tiles-1");
        map.addTilesetImage("forest_objects", "tiles-2");
        map.addTilesetImage("collider", "tiles-3");
        return map;
    }

    createLayers(map) {
        const tileset1 = map.getTileset("forest_tiles");
        const tileset2 = map.getTileset("forest_objects");
        const tileset3 = map.getTileset("collider");
        const platforms = map.createStaticLayer("platforms", tileset1);
        const environment = map.createStaticLayer("environment", tileset2);
        const platformsColliders = map.createStaticLayer("platforms_colliders", tileset3);
        platformsColliders.setVisible(false);
        platformsColliders.setCollisionByProperty({collides: true});

        return {environment, platforms, platformsColliders};
    }

    createPlayer() {
        const player = this.physics.add.sprite(100, 250, "knight");
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true);
        player.body.setOffset(0, -18);

        return player;
    }
}

export default Play;