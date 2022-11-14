import Phaser from "phaser";
import Collidable from "../mixins/Collidable";

class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        Object.assign(this, Collidable);
        
        this.initialize();
    }

    initialize() {
        this.gravity = 700;
        this.enemyVelocity = 140;
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
        this.setImmovable(true);
    }
}

export default Enemy;