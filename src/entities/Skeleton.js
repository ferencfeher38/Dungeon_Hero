import Enemy from "./Enemy";
import InitializeAnimations from "../animations/SkeletonAnimations";
import WeaponColliders from "../attacks/WeaponColliders";

class Skeleton extends Enemy {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "skeleton_walk_animation",
      "skeleton_hurt_animation",
      "skeleton_death_animation",
      "skeleton_attack_animation"
    );

    InitializeAnimations(scene.anims);
  }

  initialize() {
    super.initialize();
    this.enemyVelocity = 20;
    this.health = 50;
    this.damage = 20;
    this.maxPatrolDistance = 500;
    this.raylength = 55;
    this.setBodySize(50, 75);
    this.weaponColliders = new WeaponColliders(
      this.scene,
      "full_attack_collider",
      "skeleton"
    );
    this.attackDelay = this.getAttackDelay();
  }

  update(time, delta) {
    super.update(time, delta);

    if(!this.active || !this.body) {
      return;
  }

    if (this.timeFromLastAttack + this.attackDelay <= time) {
      this.play("skeleton-attack", true);
      this.weaponColliders.attackCollider(this, "SkeletonWeaponCollider");
      this.timeFromLastAttack = time;
      this.attackDelay = this.getAttackDelay();
    }

    if (this.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setOffset(10, 25);
    } else {
      this.setOffset(35, 25);
    }

    if (
      this.isPlayingAnimation("skeleton-hurt") ||
      this.isPlayingAnimation("skeleton-death") ||
      this.isPlayingAnimation("skeleton-attack")
    ) {
      return;
    }

    this.play("skeleton-walk", true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("skeleton-hurt", true);

    if (this.health <= 0) {
      window.score += 10;
      this.play("skeleton-death", true);
      this.setTint(0xff0000);
      this.setVelocity(0, -200);
      this.body.checkCollision.none = true;
      this.setCollideWorldBounds(false);
      setTimeout(() => this.setVisible(false), 2000);
    }
  }
}

export default Skeleton;
