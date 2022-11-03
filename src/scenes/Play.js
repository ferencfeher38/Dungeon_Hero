import Phaser from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {

    constructor() {
        super("PlayScene");
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        this.player = this.createPlayer();
        this.playerSpeed = 200;
        this.physics.add.collider(this.player, layers.platformsColliders);
        this.keyboards = this.input.keyboard.createCursorKeys();
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
        const player = new Player(this, 100, 250);
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true);
        player.body.setOffset(0, -18);

        return player;
    }

    update() {
        const { left, right } = this.keyboards;

        if(left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if(right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        } else {
            this.player.setVelocityX(0)
        }
    }
}

export default Play;