import Phaser from "phaser";
import InitializeAnimations from "../animations/AttackAnimations";
import EffectManager from "../effects/EffectManager";

class GoblinWeaponCollider extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    InitializeAnimations(this.scene.anims);

    this.effectManager = new EffectManager(this.scene);
    this.damage = 10;
  }


  attack(x, y, timeout) {
    this.body.reset(x, y);
    this.activateCollider(true);
    setTimeout(() => this.activateCollider(false), timeout);
    setTimeout(() => this.body.reset(0, 0), timeout);
    setTimeout(() => (this.body.checkCollision.none = false), timeout);
  }

  deliversHit(target) {
    const impactPosition = { x: this.x, y: this.y };
    //this.effectManager.playEffectOn("fire-attack-hit", target, impactPosition);
  }

  activateCollider(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }


  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }
}

export default GoblinWeaponCollider;
