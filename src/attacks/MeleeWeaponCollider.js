import Phaser from "phaser";
import EffectManager from '../effects/EffectManager';

class MeleeWeaponCollider extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, collider) {
        super(scene, x, y, collider);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.damage = 15;
        this.speed = 500;
        this.collider = collider;
        this.player = null;

        this.activateCollider(false);
        //this.setAlpha(0.5);
        this.setVisible(false);
        this.setOrigin(0.5, 1);
        this.effectManager  = new EffectManager(this.scene);
    }

    attack(player) {
        this.player = player;
        this.activateCollider(true);
        if(player.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.body.reset(player.x + 24, player.y);
        } else {
            this.body.reset(player.x - 24, player.y);
        }
    }

    deliversHit(target) {
        const impactPosition = { x: this.x , y: this.getRightCenter().y  };
        this.effectManager.playEffectOn("fire-attack-hit", target, impactPosition);
        this.body.checkCollision.none = true;
    }

    activateCollider(isActive) {
        this.setActive(isActive);
        //this.setVisible(isActive);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(!this.active) {
            return;
        }

        if(this.player.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.body.reset(this.player.x + 24, this.player.y);
        } else {
            this.body.reset(this.player.x - 24, this.player.y);
        }

        setTimeout(() => this.activateCollider(false), 300);
        setTimeout(() => this.body.reset(0, 0), 300);
        setTimeout(() => this.body.checkCollision.none = false, 300);
    }
}

export default MeleeWeaponCollider;