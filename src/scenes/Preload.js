import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        this.load.tilemapTiledJSON("map_1", "assets/maps/forest/forest_map.json");
        this.load.tilemapTiledJSON("map_2", "assets/maps/dungeon/dungeon_map.json");

        this.load.image("tiles-1", "assets/maps/forest/forest_tiles.png");
        this.load.image("tiles-2", "assets/maps/forest/forest_objects.png");
        this.load.image("tiles-3", "assets/maps/colliders.png");
        this.load.image("tiles-4", "assets/traps/trap1.png");

        this.load.image("tiles-5", "assets/maps/dungeon/dungeon_tiles.png");
        this.load.image("tiles-6", "assets/maps/dungeon/dungeon_objects.png");

        this.load.image("forest-background", "assets/maps/forest/forest_background.jpg");
        this.load.image("dungeon-background", "assets/maps/dungeon/dungeon_background.png");


        this.load.image("menu-background", "assets/gui/menu_background.png");
        this.load.image("back-button", "assets/gui/back_button.png");
        this.load.image("beige-border", "assets/gui/beige_border.png");
        this.load.image("tape", "assets/gui/tape.png");
        this.load.image("knight-tape", "assets/gui/knight_tape.png");
        this.load.image("button", "assets/gui/button.png");

    
        this.load.image("crystal", "assets/collectables/crystal1.png");
        this.load.spritesheet("crystal_animation", "assets/collectables/crystal_animation.png", {
            frameWidth: 32,
            frameHeight: 32
        })

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

        this.load.spritesheet("full_attack_collider", "assets/maps/collider.png", {
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

        // DRAGON ANIMATIONS
        this.load.spritesheet("dragon_walk_animation", "assets/enemies/bosses/dragon/dragon_walk_animation.png", {
            frameWidth: 210,
            frameHeight: 200,
            spacing:46
        })

        this.load.spritesheet("dragon_hurt_animation", "assets/enemies/bosses/dragon/dragon_hurt_animation.png", {
            frameWidth: 210,
            frameHeight: 200,
            spacing:46
        })

        this.load.spritesheet("dragon_death_animation", "assets/enemies/bosses/dragon/dragon_death_animation.png", {
            frameWidth: 210,
            frameHeight: 200,
            spacing:46
        })

        this.load.spritesheet("dragon_attack_animation", "assets/enemies/bosses/dragon/dragon_attack_animation.png", {
            frameWidth: 195,
            frameHeight: 200,
            spacing: 61
        })

        this.load.spritesheet("dragon_fire_animation", "assets/enemies/bosses/dragon/dragon_fire_animation.png", {
            frameWidth: 128,
            frameHeight: 128
        })

        // SKELETON ANIMATIONS
        this.load.spritesheet("skeleton_walk_animation", "assets/enemies/skeleton/skeleton_walk_animation.png", {
            frameWidth: 100,
            frameHeight: 128,
            spacing: 28
        })

        this.load.spritesheet("skeleton_attack_animation", "assets/enemies/skeleton/skeleton_attack_animation.png", {
            frameWidth: 120,
            frameHeight: 128,
            spacing: 8
        })

        this.load.spritesheet("skeleton_hurt_animation", "assets/enemies/skeleton/skeleton_hurt_animation.png", {
            frameWidth: 100,
            frameHeight: 128,
            spacing: 28
        })

        this.load.spritesheet("skeleton_death_animation", "assets/enemies/skeleton/skeleton_death_animation.png", {
            frameWidth: 100,
            frameHeight: 128,
            spacing: 28
        })

        //GHOST ANIMATIONS
        this.load.spritesheet("ghost_walk_animation", "assets/enemies/ghost/ghost_walk_animation.png", {
            frameWidth: 100,
            frameHeight: 128,
            spacing: 28
        })

        this.load.spritesheet("ghost_attack_animation", "assets/enemies/ghost/ghost_attack_animation.png", {
            frameWidth: 120,
            frameHeight: 128,
            spacing: 8
        })

        this.load.spritesheet("ghost_hurt_animation", "assets/enemies/ghost/ghost_hurt_animation.png", {
            frameWidth: 100,
            frameHeight: 128,
            spacing: 28
        })

        this.load.spritesheet("ghost_death_animation", "assets/enemies/ghost/ghost_death_animation.png", {
            frameWidth: 100,
            frameHeight: 128,
            spacing: 28
        })

        this.load.spritesheet("ghost_projectile_attack_animation", "assets/enemies/ghost/ghost_projectile_attack_animation.png", {
            frameWidth: 128,
            frameHeight: 128,
        })

        // SKELETON DRAGON ANIMATIONS
        this.load.spritesheet("skeleton_dragon_walk_animation", "assets/enemies/bosses/skeleton_dragon/skeleton_dragon_walk_animation.png", {
            frameWidth: 210,
            frameHeight: 200,
            spacing:46
        })

        this.load.spritesheet("skeleton_dragon_hurt_animation", "assets/enemies/bosses/skeleton_dragon/skeleton_dragon_hurt_animation.png", {
            frameWidth: 210,
            frameHeight: 200,
            spacing:46
        })

        this.load.spritesheet("skeleton_dragon_death_animation", "assets/enemies/bosses/skeleton_dragon/skeleton_dragon_death_animation.png", {
            frameWidth: 210,
            frameHeight: 200,
            spacing:46
        })

        this.load.spritesheet("skeleton_dragon_attack_animation", "assets/enemies/bosses/skeleton_dragon/skeleton_dragon_attack_animation.png", {
            frameWidth: 230,
            frameHeight: 200,
            spacing: 26
        })


        // PLAYER AUDIO
        this.load.audio("background-music", "assets/music/background_music.wav");
        this.load.audio("projectile-attack-music", "assets/music/projectile_attack_music.wav");
        this.load.audio("run-music", "assets/music/run_music.wav");
        this.load.audio("jump-music", "assets/music/jump_music.wav");
        this.load.audio("crystal-pickup-music", "assets/music/crystal_pickup_music.wav");
        this.load.audio("sword-attack-music", "assets/music/sword_attack_music.wav");

        this.load.once("complete", () => {
            this.startGame();
        });
    }

    startGame() {
        this.registry.set("map", 1);
        this.registry.set("unlocked-maps", 1);
        this.scene.start("MenuScene");
    }
}

export default Preload;