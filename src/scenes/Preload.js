import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.tilemapTiledJSON("map", "assets/maps/forest/forest_map.json");
        this.load.image("tiles-1", "assets/maps/forest/forest_tiles.png");
        this.load.image("tiles-2", "assets/maps/forest/forest_objects.png");
        this.load.image("tiles-3", "assets/maps/collider.png");
        this.load.image("forest-background", "assets/maps/forest/forest_background.jpg");
        this.load.spritesheet("knight_idle_animation", "assets/knight/knight_idle_animation.png", {
            frameWidth: 93,
            frameHeight: 110,
            spacing: 35
        })

        this.load.spritesheet("knight_run_animation", "assets/knight/knight_run_animation.png", {
            frameWidth: 93,
            frameHeight: 110,
            spacing: 35
        })

        this.load.spritesheet("knight_jump_animation", "assets/knight/knight_jump_animation.png", {
            frameWidth: 93,
            frameHeight: 110,
            spacing: 35
        })

        this.load.spritesheet("knight_hurt_animation", "assets/knight/knight_hurt_animation.png", {
            frameWidth: 93,
            frameHeight: 110,
            spacing: 35
        })

        this.load.spritesheet("knight_throw_attack_animation", "assets/knight/knight_throw_attack_animation.png", {
            frameWidth: 93,
            frameHeight: 110,
            spacing: 35
        })

        this.load.spritesheet("knight_sword_attack_animation", "assets/knight/knight_sword_attack_animation.png", {
            frameWidth: 128,
            frameHeight: 110,
        })

        this.load.spritesheet("fire_attack_animation", "assets/knight/fire_attack_animation.png", {
            frameWidth: 128,
            frameHeight: 128
        })

        this.load.spritesheet("fire_attack_hit_animation", "assets/knight/fire_attack_animation.png", {
            frameWidth: 118,
            frameHeight: 118,
            spacing: 10
        })

        this.load.spritesheet("collider", "assets/maps/collider.png", {
            frameWidth: 40,
            frameHeight: 55
        })

        this.load.spritesheet("orc_attack_collider", "assets/maps/collider.png", {
            frameWidth: 64,
            frameHeight: 64
        })

        this.load.spritesheet("goblin_animations", "assets/enemies/goblin/goblin_animations.png", {
            frameWidth: 128,
            frameHeight: 128
        })

        this.load.spritesheet("orc_walk_animation", "assets/enemies/orc/orc_walk_animation.png", {
            frameWidth: 170,
            frameHeight: 200,
            spacing: 86
        })

        this.load.spritesheet("orc_hurt_animation", "assets/enemies/orc/orc_hurt_animation.png", {
            frameWidth: 170,
            frameHeight: 200,
            spacing: 86
        })

        this.load.spritesheet("orc_death_animation", "assets/enemies/orc/orc_death_animation.png", {
            frameWidth: 256,
            frameHeight: 200,
        })

        this.load.spritesheet("orc_attack_animation", "assets/enemies/orc/orc_attack_animation.png", {
            frameWidth: 190,
            frameHeight: 200,
            spacing: 66
        })
    }

    create() {
        this.scene.start("PlayScene");
    }

}

export default Preload;