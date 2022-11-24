import Enemy from "./Enemy";
import InitializeAnimations from "../animations/GoblinAnimations";
import GoblinWeaponCollider from "../attacks/GoblinWeaponCollider";
import Projectiles from "../attacks/Projectiles";

class Goblin extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "goblin_animations");

        InitializeAnimations(scene.anims);
    }

    initialize() {
        super.initialize();
        this.health = 10;
        this.attackDelay = this.getAttackDelay()
        this.goblinWeaponCollider = new GoblinWeaponCollider(this.scene, 0, 0, "collider");
    }
    
    update(time, delta) {
        super.update(time,delta);

        if(this.timeFromLastAttack + this.attackDelay <= time) {
            this.play("goblin-attack", true);
            this.goblinWeaponCollider.attack(this);
            this.timeFromLastAttack = time;
            this.attackDelay = this.getAttackDelay();
        }

        if(!this.active) { 
            return;
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