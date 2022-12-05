import Enemy from "./Enemy";
import InitializeAnimations from "../animations/SkeletonDragonAnimations";
import Projectiles from "../attacks/Projectiles";

class SkeletonDragon extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "skeleton_dragon_walk_animation",
                           "skeleton_dragon_hurt_animation",
                           "skeleton_dragon_death_animation",
                           "skeleton_dragon_attack_animation");

        InitializeAnimations(scene.anims);
    }

    initialize() {
        super.initialize();
        this.enemyVelocity = 30;
        this.damage = 50;
        this.health = 200;
        this.maxPatrolDistance = 300;
        this.raylength = 55;
        this.attackDelay = this.getAttackDelay();
        this.setBodySize(140, 70);
        this.attackDelay = this.getAttackDelay();
        this.projectiles = new Projectiles(this.scene, "fire-attack");
        this.lastDirection = null;
    }

    update(time, delta) {
        super.update(time,delta);


        if(!this.active || !this.body) {
            return;
        }

        if(this.timeFromLastAttack + this.attackDelay <= time) {
            this.projectiles.fireProjectile(this, "fire-attack");
            this.play("skeleton-dragon-attack", true);
            this.timeFromLastAttack = time;
            this.attackDelay = this.getAttackDelay();
        }

        if(this.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.setOffset(45, 90);
        } else {
            this.setOffset(25, 90);
        }

        if(this.isPlayingAnimation("skeleton-dragon-hurt") || this.isPlayingAnimation("skeleton-dragon-death") || this.isPlayingAnimation("skeleton-dragon-attack")) {
            return;
        }


        this.play("skeleton-dragon-walk", true);
    }

    takesHit(source) {
        super.takesHit(source);
        this.play("skeleton-dragon-hurt", true);

        if(this.health <= 0) {
            window.score += 200;
            this.play("skeleton-dragon-death", true);
            this.setTint(0xff0000);
            this.setVelocity(0, -200);
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
            setTimeout(() => this.setVisible(false), 2000);
        }
    }
}

export default SkeletonDragon;