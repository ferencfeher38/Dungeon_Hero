import Enemy from "./Enemy";
import InitializeAnimations from "../animations/GoblinAnimations";
import WeaponColliders from "../attacks/WeaponColliders";

class Goblin extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "goblin_animations");

        InitializeAnimations(scene.anims);
    }

    initialize() {
        super.initialize();
        this.health = 50;
        this.damage = 20;
        this.attackDelay = this.getAttackDelay()
        this.weaponColliders = new WeaponColliders(this.scene, "collider", "goblin");
        this.enemyVelocity = 35;
    }
    
    update(time, delta) {
        super.update(time,delta);

        if(!this.active || !this.body) {
            return;
        }

        if(this.timeFromLastAttack + this.attackDelay <= time) {
            this.play("goblin-attack", true);
            this.weaponColliders.attackCollider(this, "GoblinWeaponCollider");
            this.timeFromLastAttack = time;
            this.attackDelay = this.getAttackDelay();
        }

        if(this.isPlayingAnimation("goblin-hurt") || this.isPlayingAnimation("goblin-death") || this.isPlayingAnimation("goblin-attack")) {
            return;
        }

        this.play("goblin-walk", true);
    }

    takesHit(source) {
        super.takesHit(source);
        this.play("goblin-hurt", true);

        if(this.health <= 0) {
            window.score += 5;
            this.play("goblin-death", true);
            this.setTint(0xff0000);
            this.setVelocity(0, -200);
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
            setTimeout(() => this.setVisible(false), 2000);
        }
    }

    getAttackDelay() {
        super.getAttackDelay();
        return Phaser.Math.Between(1000, 5000);
    }
}

export default Goblin;