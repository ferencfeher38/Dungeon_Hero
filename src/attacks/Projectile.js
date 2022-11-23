import Phaser from 'phaser';
import InitializeAnimations from "../animations/AttackAnimations";
import EffectManager from '../effects/EffectManager';

class Projectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "fire_attack_animation");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 300;
    this.maxDistance = 1200;
    this.traveledDistance = 0;
    this.cooldown = 1000;
    this.damage = 10;
    this.setSize(50, 50);
    this.setOffset(60,45);
    this.effectManager  = new EffectManager(this.scene);
    InitializeAnimations(this.scene.anims);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.traveledDistance += this.body.deltaAbsX();

    if (this.isOutOfRange()) {
      this.body.reset(0, 0);
      this.activateProjectile(false);
      this.traveledDistance = 0;
    }
  }

  fire(x, y) {
    this.activateProjectile(true);
    this.body.reset(x, y);
    this.setVelocityX(this.speed);
    this.play("fire-attack", true);
  }

  deliversHit(target) {
    this.activateProjectile(false);
    this.traveledDistance = 0;
    const impactPosition = { x: this.x , y: this.y };
    this.body.reset(0, 0);
    this.effectManager.playEffectOn("fire-attack-hit", target, impactPosition);
  }

  activateProjectile(isActive) {
    this.setActive(isActive);
    this.setVisible(isActive);
  }

  isOutOfRange() {
    return this.traveledDistance && this.traveledDistance >= this.maxDistance;
  }

}

export default Projectile;