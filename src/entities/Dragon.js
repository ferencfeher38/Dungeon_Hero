import Enemy from "./Enemy";
import InitializeAnimations from "../animations/DragonAnimations";
import Projectiles from "../attacks/Projectiles";

class Orc extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "dragon_walk_animation",
                           "dragon_hurt_animation",
                           "dragon_death_animation",
                           "dragon_attack_animation");

        InitializeAnimations(scene.anims);
    }

    initialize() {
        super.initialize();
        this.enemyVelocity = 20;
        this.damage = 40;
        this.health = 150;
        this.maxPatrolDistance = 300;
        this.raylength = 55;;
        this.setBodySize(150, 80);
        this.setOffset(0, 110);
        this.attackDelay = this.getAttackDelay();
        this.projectiles = new Projectiles(this.scene, "fire-attack");
        this.lastDirection = null;
    }

    update(time, delta) {
        super.update(time,delta);

        if(!this.active || !this.body) {
            return;
        }

        if(this.body.velocity.x > 0) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
        } else {
            this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
        }

        if(this.timeFromLastAttack + this.attackDelay <= time) {
            this.projectiles.fireProjectile(this, "fire-attack");
            this.play("dragon-attack", true);
            this.timeFromLastAttack = time;
            this.attackDelay = this.getAttackDelay();
        }

        if(this.isPlayingAnimation("dragon-attack")) {
            this.raylength = 150;
            this.setBodySize(100, 130);
            if(this.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
                this.setOffset(60, 60);
            } else {
                this.setOffset(30, 60);
            }
        }

        if(this.isPlayingAnimation("dragon-hurt") || this.isPlayingAnimation("dragon-death") || this.isPlayingAnimation("dragon-attack")) {
            return;
        }

        this.raylength = 55;
        this.setBodySize(150, 80);
        if(this.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.setOffset(60, 110);
        } else {
            this.setOffset(0, 110);
        }
        this.play("dragon-walk", true);
    }

    takesHit(source) {
        super.takesHit(source);
        this.play("dragon-hurt", true);

        if(this.health <= 0) {
            this.play("dragon-death", true);
            this.setTint(0xff0000);
            this.setVelocity(0, -200);
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
            setTimeout(() => this.setVisible(false), 2000);
        }
    }
}

export default Orc;