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

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  attack(x, y) {
    if (!this.active) {
      return;
    }
    this.body.reset(x, y);
    this.activateCollider(true);
    setTimeout(() => this.activateCollider(false), 400);
    setTimeout(() => this.body.reset(0, 0), 400);
    setTimeout(() => (this.body.checkCollision.none = false), 400);
  }

  deliversHit(target) {
    const impactPosition = { x: this.x, y: this.y };
    //this.effectManager.playEffectOn("fire-attack-hit", target, impactPosition);
  }

  activateCollider(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }
}

export default GoblinWeaponCollider;
