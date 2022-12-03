import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";
import InitializeAnimations from "../animations/HitAnimations";
import Collectables from "../groups/Collectables";
import Container from "../hud/Container";
import EventDispatcher from "../events/Dispatcher";

class Play extends Phaser.Scene {

    constructor(config) {
        super("PlayScene");
        this.config = config;
    }

    create({gameStatus}) {
        this.score = 0;
        this.container = new Container(this, 0, 0);

        const map = this.createMap();
        this.createBackground(map);
        InitializeAnimations(this.anims);
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones.start);
        const enemies = this.createEnemies(layers.enemySpawnpoints, layers.platformsColliders);
        const collectables = this.createCollectables(layers.collectables);
        this.pickupCrystalSound = this.sound.add("crystal-pickup-music", {volume: 0.05});

        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                weaponColliders: enemies.getWeaponColliders(),
                collectables,
                traps: layers.traps,
                projectiles: enemies.getProjectiles()
            }
        });

        this.createEnemyColliders(enemies, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                player
            }
        });

        this.playBackgroundMusic();
        this.createBackButton();
        this.setupFollowupCameraOn(player);
        this.createEndOfMap(playerZones.end, player);

        if(gameStatus == "PLAYER_LOSE") {
            return;
        }

        this.createGameEvents();
    }

    createMap() {
        const map = this.make.tilemap({key: `map_${this.getCurrentMap()}`});
        map.addTilesetImage("forest_tiles", "tiles-1");
        map.addTilesetImage("forest_objects", "tiles-2");
        map.addTilesetImage("colliders", "tiles-3");
        map.addTilesetImage("traps", "tiles-4")

        map.addTilesetImage("dungeon_tiles", "tiles-5")
        map.addTilesetImage("dungeon_objects", "tiles-6");
        
        return map;
    }

    createLayers(map) {
        const tileset1 = map.getTileset("forest_tiles");
        const tileset2 = map.getTileset("forest_objects");
        const tileset3 = map.getTileset("colliders");
        const tileset4 = map.getTileset("traps");

        const tileset5 = map.getTileset("dungeon_tiles");
        const tileset6 = map.getTileset("dungeon_objects");

        const platforms = map.createStaticLayer("platforms", [tileset1, tileset5]);
        const environment = map.createStaticLayer("environment", [tileset2, tileset6]);
        const platformsColliders = map.createStaticLayer("platforms_colliders", tileset3);
        const traps = map.createStaticLayer("traps", tileset4);

        const playerZones = map.getObjectLayer("player_zones");
        const enemySpawnpoints = map.getObjectLayer("enemy_spawnpoints");
        const collectables = map.getObjectLayer("collectables");

        traps.setCollisionByExclusion(-1);

        platformsColliders.setVisible(false);
        platformsColliders.setCollisionByProperty({collides: true});

        return {environment,
                platforms,
                platformsColliders,
                playerZones,
                enemySpawnpoints,
                collectables,
                traps};
    }

    playBackgroundMusic() {
        if(this.sound.get("background-music")) {
            return;
        }

       //this.sound.add("background-music", {loop: true, volume: 0.005}).play();
    }

    createCollectables(collectableLayer) {
        const collectables = new Collectables(this);
        collectables.addCollectablesFromLayer(collectableLayer);
        collectables.playAnimation("crystal");

        return collectables;
    }

    createGameEvents() {
        EventDispatcher.on("PLAYER_LOSE", () => {
            this.scene.restart({gameStatus: "PLAYER_LOSE"});
        });
    }

    createBackground(map) {
        const { height, width } = this.config;
        const backgroundObject = map.getObjectLayer("background").objects[0];
        if(this.getCurrentMap() === 1) {
            this.add.tileSprite(backgroundObject.x, backgroundObject.y, width, height, "forest-background")
            .setDepth(-10)
            .setOrigin(0, 1)
            .setScrollFactor(0, 1);
        } else {
            this.add.tileSprite(backgroundObject.x, backgroundObject.y, width, height, "dungeon-background")
            .setDepth(-10)
            .setOrigin(0, 1)
            .setScrollFactor(0, 1);
        }
    }

    createBackButton() {
        const backButton = this.add.image(10, 40, "back-button")
            .setOrigin(0)
            .setScrollFactor(0)
            .setScale(0.8)
            .setInteractive({draggable: false, cursor: "pointer"});

        backButton.on("pointerup", () => {
            this.scene.start("MenuScene");
        });
    }

    createPlayer(start) {
        return new Player(this, start.x, start.y);
    }

    createPlayerColliders(player, {colliders}) {
        player
            .addCollider(colliders.platformsColliders)
            .addOverlap(colliders.weaponColliders, this.onHit)
            .addOverlap(colliders.collectables, this.onCollect, this)
            .addCollider(colliders.traps, this.onHit)
            .addCollider(colliders.projectiles, this.onHit);
    }

    addCollectablesFromLayer(layer) {
        const {score:  defaultScore, type} = this.getMapProperties(layer.properties);
    
        layer.objects.forEach(collectableObject => {
            const collectable =  this.get(collectableObject.x, collectableObject.y, type);
            const objectProperties = this.getMapProperties(collectableObject.properties);
    
            collectable.score = objectProperties.score || defaultScore;
        });
      }

    createEnemies(spawnLayer, platformsColliders) {
        const enemies = new Enemies(this);
        const enemyTypes = enemies.getTypes();

        spawnLayer.objects.forEach(spawnPoint => {
            const enemyType = spawnPoint.properties.find(prop => prop.name == "Type");
            const enemy = new enemyTypes[enemyType.value](this, spawnPoint.x, spawnPoint.y);
            enemy.setPlatformColliders(platformsColliders);
            enemies.add(enemy);
        });

        return enemies; 
    }

    playerCollision(enemy, player) {
        player.takesHit(enemy);
    }

    onHit(entity, source) {
        entity.takesHit(source);
    }

    onCollect(entity, collectable) {
        this.score += collectable.score;
        this.container.updateScore(this.score);
        this.pickupCrystalSound.play();
        collectable.disableBody(true, true);
    }

    createEnemyColliders(enemies, {colliders}) {
        enemies
            .addCollider(colliders.platformsColliders)
            .addCollider(colliders.player, this.playerCollision)
            .addCollider(colliders.player.projectiles, this.onHit)
            .addOverlap(colliders.player.meleeWeaponCollider, this.onHit);
    }

    setupFollowupCameraOn(player) {
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

    getCurrentMap() {
        return this.registry.get("map") || 1;
    }

    createEndOfMap(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, "end")
            .setAlpha(0)
            .setSize(5, this.config.height)
            .setOrigin(0.5, 1);

        const endOfLevelOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            endOfLevelOverlap.active = false;

            if(this.registry.get("map") === this.config.lastMap) {
                this.scene.start("GameOverScene");
                return;
            }

            this.registry.inc("map", 1);
            this.registry.inc("unlocked-maps", 1);
            this.scene.restart({gameStatus: "MAP_COMPLETED"});
        });
    }

    update(enemies) {
        this.setCameraSize(this.cameras.main);
    }

    setCameraSize(camera) {
        const { height, width } = this.config;
        camera.setSize(window.innerWidth > width ? width : window.innerWidth, window.innerHeight > height ? height : window.innerHeight);
    }
}

export default Play;