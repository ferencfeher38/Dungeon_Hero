import Phaser from "phaser";
import Player from "../entities/Player";

class Play extends Phaser.Scene {

    constructor(config) {
        super("PlayScene");
        this.config = config;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones.start);
        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });

        this.setupFollowupCameraOn(player);
        this.createEndOfLevel(playerZones.end, player);
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
        const playerZones = map.getObjectLayer("player_zones");
        platformsColliders.setVisible(false);
        platformsColliders.setCollisionByProperty({collides: true});

        return {environment, platforms, platformsColliders, playerZones};
    }

    createPlayer(start) {
        return new Player(this, start.x, start.y);
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

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === "startZone"),
            end: playerZones.find(zone => zone.name === "endZone")
        }
    }

    createEndOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, "end")
            .setAlpha(0)
            .setSize(5, this.config.height)
            .setOrigin(0.5, 1);

        const endOfLevelOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            endOfLevelOverlap.active = false;
            console.log("Player has won!");
        });
    }
}

export default Play;