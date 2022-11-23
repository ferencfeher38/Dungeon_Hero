import Phaser from 'phaser';
import Projectile from './Projectile';
import { getTimestamp } from '../utilities/HelperFunctions';

class Projectiles extends Phaser.Physics.Arcade.Group {

  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: 'fire-attack',
      classType: Projectile
    })

    this.timeFromLastProjectile = null;
    this.speed = 1000;
  }

  fireProjectile(initiator) {
    const projectile = this.getFirstDead(false);

    if (!projectile) { return; }

    if(this.timeFromLastProjectile && this.timeFromLastProjectile + projectile.cooldown > getTimestamp()) {
        return;
    }

    const center = initiator.getCenter();
    let centerX;
    let centerY = center.y + 25;

    if(initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
        projectile.speed = Math.abs(projectile.speed);
        projectile.setFlipX(false);
        centerX = center.x + 75;
    } else {
        projectile.speed = -Math.abs(projectile.speed);
        projectile.setFlipX(true);
        centerX = center.x - 75;
    }

    projectile.fire(centerX, centerY);
    this.timeFromLastProjectile = getTimestamp();
  }

}

export default Projectiles;