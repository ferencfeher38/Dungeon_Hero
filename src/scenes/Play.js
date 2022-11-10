import Phaser, { Display } from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {

    constructor(config) {
        super("PlayScene");
        this.config = config;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const player = this.createPlayer();
        
        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });

        this.setupFollowupCameraOn(player);
    }

    createMap() {
        const map = this.make.tilemap({key: "map"});
        map.addTilesetImage("forest_tiles", "tiles-1");
        map.addTilesetImage("forest_objects", "tiles-2");
        map.addTilesetImage("collider", "tiles-3");
        map.addTilesetImage("test", "tiles-4");
        return map;
    }

    createLayers(map) {
        const tileset1 = map.getTileset("forest_tiles");
        const tileset2 = map.getTileset("forest_objects");
        const tileset3 = map.getTileset("collider");
        const tileset4 = map.getTileset("test");
        const platforms = map.createStaticLayer("platforms", [tileset1, tileset4]);
        const environment = map.createStaticLayer("environment", tileset2);
        const platformsColliders = map.createStaticLayer("platforms_colliders", tileset3);
        platformsColliders.setVisible(false);
        platformsColliders.setCollisionByProperty({collides: true});

        return {environment, platforms, platformsColliders};
    }

    createPlayer() {
        return new Player(this, 100, 250);
    }

    createPlayerColliders(player, {colliders}) {
        player
            .addCollider(colliders.platformsColliders);
    }

    setupFollowupCameraOn(player) {
        const { height, width, mapOffsetWidth, mapOffsetHeight, zoomFactor } = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffsetWidth, height + mapOffsetHeight);
        this.cameras.main.setBounds(0, 0, width + mapOffsetWidth, height + mapOffsetHeight).setZoom(zoomFactor);
        this.cameras.main.startFollow(player);
    }
}

export default Play;