import Phaser from "phaser";
import InitializeAnimations from "../entities/PlayerAnimations";
import Collidable from "../mixins/Collidable";

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "knight_idle_animation",
                           "knight_run_animation",
                           "knight_jump_animation");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        Object.assign(this, Collidable);
        
        this.initialize();
        this.initializeEvents();
    }

    initialize() {
        this.gravity = 700;
        this.playerVelocity = 140;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.keyboards = this.scene.input.keyboard.createCursorKeys();
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
        this.setBodySize(40, 55);
        this.setOffset(26, 55);
        InitializeAnimations(this.scene.anims);
    }

    initializeEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        const { left, right, space, up } = this.keyboards;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isSpaceUpDown = Phaser.Input.Keyboard.JustDown(up);
        const onFloor = this.body.onFloor();

        if(left.isDown) {
            this.setVelocityX(-this.playerVelocity);
            this.setFlipX(true);
        } else if(right.isDown) {
            this.setVelocityX(this.playerVelocity);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0)
        }

        if((isSpaceJustDown || isSpaceUpDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.playerVelocity * 3.4);
            this.jumpCount++;
        }

        if(onFloor) {
            this.jumpCount = 0;
        }

        if(onFloor) {
            if(this.body.velocity.x !== 0) {
                this.play("run", true);
            } else {
                this.play("idle", true);
            }
        } else {
            this.play("jump", true);
        }
    }
}

export default Player;