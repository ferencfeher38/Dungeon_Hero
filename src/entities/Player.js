import Phaser from "phaser";
import InitializeAnimations from "../animations/PlayerAnimations";
import HealthBar from "../hud/HealthBar";
import Collidable from "../mixins/Collidable";
import Projectiles from "../attacks/Projectiles";
import Anims from "../mixins/Anims";
import MeleeWeaponCollider from "../attacks/MeleeWeaponCollider";
import { getTimestamp } from "../utilities/HelperFunctions";
import Projectile from "../attacks/Projectile";

class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "knight_idle_animation",
                           "knight_run_animation",
                           "knight_jump_animation",
                           "knight_throw_attack_animation",
                           "knight_sword_attack_animation");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        Object.assign(this, Collidable);
        Object.assign(this, Anims);
        
        this.initialize();
        this.initializeEvents();
    }

    initialize() {
        this.gravity = 700;
        this.playerVelocity = 140;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.hasBeenHit = false;
        this.bounceVelocity = 200;
        this.health = 100;

        this.healthBar = new HealthBar(
            this.scene,
            0,
            0,
            1,
            this.health
        );

        this.keyboards = this.scene.input.keyboard.createCursorKeys();
        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
        this.setBodySize(40, 55);
        this.setOffset(26, 55);
        InitializeAnimations(this.scene.anims);

        this.lastDirection =  Phaser.Physics.Arcade.FACING_RIGHT;
        this.projectiles = new Projectiles(this.scene);
        this.meleeWeaponCollider = new MeleeWeaponCollider(this.scene, 0, 0, "collider");
        this.timeFromLastAttack = null;
        this.scene.input.keyboard.on('keydown-Q', () => {
            if(this.timeFromLastAttack && this.timeFromLastAttack + this.projectiles.speed > getTimestamp()) {
                return;
            }

            this.play("throw", true)
            this.projectiles.fireProjectile(this);
            this.timeFromLastAttack = getTimestamp();
        });

        this.scene.input.keyboard.on('keydown-E', () => {
            if(this.timeFromLastAttack && this.timeFromLastAttack + this.meleeWeaponCollider.speed > getTimestamp()) {
                return;
            }

            this.play("sword", true);
            this.meleeWeaponCollider.attack(this);
            this.timeFromLastAttack = getTimestamp();
        });

        this.setDepth(10);
    }

    initializeEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if(this.hasBeenHit) {
            return;
        }
        const { left, right, space, up } = this.keyboards;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isSpaceUpDown = Phaser.Input.Keyboard.JustDown(up);
        const onFloor = this.body.onFloor();

        if(left.isDown) {
            this.lastDirection =  Phaser.Physics.Arcade.FACING_LEFT;
            this.setVelocityX(-this.playerVelocity);
            this.setFlipX(true);
        } else if(right.isDown) {
            this.lastDirection =  Phaser.Physics.Arcade.FACING_RIGHT;
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

        if(this.isPlayingAnimation("throw")) {
            this.throwBounceOff();
            return;
        }

        if(this.isPlayingAnimation("sword")) {
            if(this.lastDirection === Phaser.Physics.Arcade.FACING_LEFT) {
                this.setOffset(60, 55);
            }
            return;
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

        this.setBodySize(40, 55);
        this.setOffset(26, 55);
    }

    throwBounceOff() {
        if(this.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.setVelocityX(-60);
        } else {
            this.setVelocityX(60);
        }
    }

    bounceOff() {
        if(this.body.touching.right) {
            this.setVelocityX(-this.bounceVelocity);
        } else {
            this.setVelocityX(this.bounceVelocity);
        }

        setTimeout(() => this.setVelocityY(-this.bounceVelocity), 0);
        this.play("hurt", true);
    }

    takesHit(enemy) {
        if(this.hasBeenHit) {
            return;
        }
        this.hasBeenHit = true;
        this.bounceOff();
    
        this.health -= enemy.damage;
        this.healthBar.decrease(this.health);
    
        this.scene.time.delayedCall(700, () => this.hasBeenHit = false);
    }
}

export default Player;