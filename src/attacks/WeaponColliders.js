import Phaser from "phaser";
import GoblinWeaponCollider from "./GoblinWeaponCollider";

class WeaponColliders extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 1,
      active: false,
      visible: false,
      key: "collider",
      classType: GoblinWeaponCollider,
    });

    this.setAlpha(0.5);
  }

  attackCollider(entity) {
    const collider = this.getFirstDead(false);
    let positionX = 0;

    if (!collider) {
      return;
    }

    if (entity.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
      positionX = entity.x;
    } else {
      positionX = entity.x - 105;
    }

    collider.attack(positionX, entity.y);
  }
}

export default WeaponColliders;
