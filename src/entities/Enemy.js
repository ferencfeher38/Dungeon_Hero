import Phaser from "phaser";
import Collidable from "../mixins/Collidable";

class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        Object.assign(this, Collidable);

        this.config = scene.config;
        
        this.initialize();
        this.initializeEvents();
    }

    initialize() {
        this.gravity = 700;
        this.enemyVelocity = 50;
        this.timeFromLastTurn = 0;
        this.maxPatrolDistance = 400;
        this.currentPatrolDistance = 0;
        this.damage = 10;
        this.platformsCollidersLayer = null;
        this.rayGraphics = this.scene.add.graphics({lineStyle: {
            width: 2,
            color: 0xaa00aa
        }});
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
        this.setBodySize(50, 55);
        this.setOffset(35, 34);
        this.setImmovable(true);
        this.setVelocityX(this.enemyVelocity);
    }

    initializeEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time, delta) {
        this.patrol(time);
    }

    patrol(time) {
        if(!this.body || !this.body.onFloor()) {
            return;
        }

        this.currentPatrolDistance += Math.abs(this.body.deltaX());

        const { ray, hasHit } = this.raycast(this.body, this.platformsCollidersLayer, {
            raylength: 30,
            precision: 1,
            steepness: 0.5
        });

        if((!hasHit || this.currentPatrolDistance >= this.maxPatrolDistance) && this.timeFromLastTurn + 100 < time) {
            this.setFlipX(!this.flipX);
            this.setVelocityX(this.enemyVelocity = -this.enemyVelocity);
            this.timeFromLastTurn = time;
            this.currentPatrolDistance = 0;
        }

        if(this.config.debug && ray) {
            this.rayGraphics.clear();
            this.rayGraphics.strokeLineShape(ray);
        }
    }

    setPlatformColliders(platformsCollidersLayer) {
        this.platformsCollidersLayer = platformsCollidersLayer;
    }
}

export default Enemy;