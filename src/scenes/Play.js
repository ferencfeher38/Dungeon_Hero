import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";

class Play extends Phaser.Scene {

    constructor(config) {
        super("PlayScene");
        this.config = config;
    }

    create() {
        const map = this.createMap();
        this.createBackground(map);
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);

        const player = this.createPlayer(playerZones.start);
        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });

        const enemies= this.createEnemies(layers.enemySpawnpoints, layers.platformsColliders);
        this.createEnemyColliders(enemies, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                player
            }
        });

        this.setupFollowupCameraOn(player);
        this.createEndOfLevel(playerZones.end, player);
    }

    finishDrawing(pointer, layer) {
        this.line.x2 = pointer.worldX;
        this.line.y2 = pointer.worldY;

        this.graphics.clear();
        this.graphics.strokeLineShape(this.line);

        this.tileHits = layer.getTilesWithinShape(this.line);

        if(this.tileHits.length > 0) {
            this.tileHits.forEach(tile => {
                if(tile.index !== -1) {
                    tile.setCollision(true);
                }
            });
        }

        this.drawDebug(layer);

        this.plotting = false;
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
        const enemySpawnpoints = map.getObjectLayer("enemy_spawnpoints");
        platformsColliders.setVisible(false);
        platformsColliders.setCollisionByProperty({collides: true});

        return {environment, platforms, platformsColliders, playerZones, enemySpawnpoints};
    }

    createBackground(map) {
        const { height, width } = this.config;
        const backgroundObject = map.getObjectLayer("background").objects[0];
        this.add.tileSprite(backgroundObject.x, backgroundObject.y, width, height, "forest-background")
            .setDepth(-10)
            .setOrigin(0, 1)
            .setScrollFactor(0, 1);
    }

    createPlayer(start) {
        return new Player(this, start.x, start.y);
    }

    createPlayerColliders(player, {colliders}) {
        player
            .addCollider(colliders.platformsColliders);
    }

    createEnemies(spawnLayer, platformsColliders) {
        const enemies = new Enemies(this);
        const enemyTypes = enemies.getTypes();

        spawnLayer.objects.forEach(spawnPoint => {
            const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
            enemy.setPlatformColliders(platformsColliders);
            enemies.add(enemy);
        });

        return enemies; 
    }

    playerCollision(enemy, player) {
        player.takesHit(enemy);
    }

    createEnemyColliders(enemies, {colliders}) {
        enemies
            .addCollider(colliders.platformsColliders)
            .addCollider(colliders.player, this.playerCollision);
    }

    setupFollowupCameraOn(player, ca) {
        const { height, width, mapOffsetWidth, zoomFactor} = this.config;
        this.physics.world.setBounds(0, 0, width + mapOffsetWidth, height);
        this.cameras.main
            .setZoom(zoomFactor)
            .startFollow(player)
            .setBounds(0, 0, width + mapOffsetWidth, height)
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

    update() {
        this.setCameraSize(this.cameras.main);
    }

    setCameraSize(camera) {
        const { height, width, mapOffsetWidth, zoomFactor} = this.config;
        camera.setSize(window.innerWidth > width ? width : window.innerWidth, window.innerHeight > height ? height : window.innerHeight);
    }
}

export default Play;