import Phaser from "phaser";
import EffectManager from '../effects/EffectManager';

class BaseMeleeWeaponCollider extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, collider) {
        super(scene, x, y, collider);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.collider = collider;

        this.initalize();
    }

    initalize() {
        this.damage = 20;
        this.speed = 500;
        this.entity = null;

        this.activateCollider(false);
        this.setAlpha(0.5);
        this.setVisible(false);
        this.setOrigin(0.5, 1);
        this.effectManager  = new EffectManager(this.scene);
    }

    attack(entity) {
        this.entity = entity;
        this.activateCollider(true);
        if(entity.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.body.reset(entity.x + 24, entity.y);
        } else {
            this.body.reset(entity.x - 24, entity.y);
        }
    }

    deliversHit(target) {
        const impactPosition = { x: this.x , y: this.getRightCenter().y  };
        this.effectManager.playEffectOn("fire-attack-hit", target, impactPosition);
        this.body.checkCollision.none = true;
    }

    activateCollider(isActive) {
        this.setActive(isActive);
        this.setVisible(isActive);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(!this.active) {
            return;
        }

        if(this.entity.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.body.reset(this.entity.x + 24, this.entity.y);
        } else {
            this.body.reset(this.entity.x - 24, this.entity.y);
        }

        setTimeout(() => this.activateCollider(false), 300);
        setTimeout(() => this.body.reset(0, 0), 300);
        setTimeout(() => this.body.checkCollision.none = false, 300);
    }
}

export default BaseMeleeWeaponCollider;