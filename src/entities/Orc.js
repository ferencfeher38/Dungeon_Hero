import Enemy from "./Enemy";
import InitializeAnimations from "../animations/OrcAnimations";
import WeaponColliders from "../attacks/WeaponColliders";

class Orc extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "orc_walk_animation",
                           "orc_hurt_animation",
                           "orc_death_animation",
                           "orc_attack_animation");

        InitializeAnimations(scene.anims);
    }

    initialize() {
        super.initialize();
        this.enemyVelocity = 20;
        this.damage = 30;
        this.health = 100;
        this.maxPatrolDistance = 500;
        this.raylength = 55;
        this.setBodySize(75, 100);
        this.weaponColliders = new WeaponColliders(this.scene, "orc_attack_collider", "orc");
        this.attackDelay = this.getAttackDelay();
    }

    update(time, delta) {
        super.update(time,delta);

        if(!this.active || !this.body) {
            return;
        }

        if(this.timeFromLastAttack + this.attackDelay <= time) {
            this.play("orc-attack", true);
            this.weaponColliders.attackCollider(this, "OrcWeaponCollider");
            this.timeFromLastAttack = time;
            this.attackDelay = this.getAttackDelay();
        }

        if(this.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.setOffset(60, 93);
        } else {
            this.setOffset(40, 93);
        }

        if(this.isPlayingAnimation("orc-hurt") || this.isPlayingAnimation("orc-death") || this.isPlayingAnimation("orc-attack")) {
            return;
        }

        this.play("orc-walk", true);
    }

    takesHit(source) {
        super.takesHit(source);
        this.play("orc-hurt", true);

        if(this.health <= 0) {
            this.play("orc-death", true);
            this.setTint(0xff0000);
            this.setVelocity(0, -200);
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
            setTimeout(() => this.setVisible(false), 2000);
        }
    }
}

export default Orc;