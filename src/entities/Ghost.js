import Enemy from "./Enemy";
import InitializeAnimations from "../animations/GhostAnimations";
import Projectiles from "../attacks/Projectiles";

class Ghost extends Enemy {
  constructor(scene, x, y) {
    super(
      scene,
      x,
      y,
      "ghost_walk_animation",
      "ghost_hurt_animation",
      "ghost_death_animation",
      "ghost_attack_animation",
      "ghost_projectile_attack_animation"
    );

    InitializeAnimations(scene.anims);
  }

  initialize() {
    super.initialize();
    this.enemyVelocity = 30;
    this.damage = 30;
    this.health = 100;
    this.maxPatrolDistance = 200;
    this.raylength = 55;
    this.setBodySize(50, 75);
    this.attackDelay = this.getAttackDelay();
    this.projectiles = new Projectiles(this.scene, "ghost-projectile-attack");
  }

  update(time, delta) {
    super.update(time, delta);

    if(!this.active || !this.body) {
      return;
  }


    if (this.timeFromLastAttack + this.attackDelay <= time) {
      this.play("ghost-attack", true);
      this.projectiles.fireProjectile(this, "ghost-projectile-attack");
      this.timeFromLastAttack = time;
      this.attackDelay = this.getAttackDelay();
    }

    if (this.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
      this.setOffset(40, 30);
    } else {
      this.setOffset(10, 30);
    }


    if (
      this.isPlayingAnimation("ghost-hurt") ||
      this.isPlayingAnimation("ghost-death") ||
      this.isPlayingAnimation("ghost-attack")
    ) {
      return;
    }

    this.play("ghost-walk", true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("ghost-hurt", true);

    if (this.health <= 0) {
      window.score += 15;
      this.play("ghost-death", true);
      this.setTint(0xff0000);
      this.setVelocity(0, -200);
      this.body.checkCollision.none = true;
      this.setCollideWorldBounds(false);
      setTimeout(() => this.setVisible(false), 2000);
    }
  }
}

export default Ghost;
