import Phaser from "phaser";
import GoblinWeaponCollider from "./GoblinWeaponCollider";
import OrcWeaponCollider from "./OrcWeaponCollider";
import SkeletonWeaponCollider from "./SkeletonWeaponCollider";

class WeaponColliders extends Phaser.Physics.Arcade.Group {
  constructor(scene, key, type) {
    super(scene.physics.world, scene);

    this.createMultiple({
      type,
      frameQuantity: 1,
      active: false,
      visible: false,
      key,
      classType: GoblinWeaponCollider, OrcWeaponCollider, SkeletonWeaponCollider
    });

    this.initialize(type);
  }
  
  initialize(type) {
    this.setAlpha(0.5);

    if(type === "goblin") {
      this.scaleXY(0);
    } else if(type === "orc") {
      this.scaleXY(0, 0.5);
    } else if(type == "skeleton") {
      this.scaleXY(0, 0);
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }


  attackCollider(entity, classType) {
    if(classType === "GoblinWeaponCollider") {
      const goblinCollider = this.getFirstDead(false);

      if (!goblinCollider) {
        return;
      }

      let positionX = 0;
      let positionY = 0;
  
      if (entity.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
        positionX = entity.x + 50;
        positionY = entity.y - 70;
      } else {
        positionX = entity.x - 50;
        positionY = entity.y - 70;
      }
  
      goblinCollider.attack(positionX, positionY, 400);
      
    } else if(classType === "OrcWeaponCollider") {
      const orcCollider = this.getFirstDead(false);

      if (!orcCollider) {
        return;
      }

      let positionX = 0;
      let positionY = 0;
  
  
      if (entity.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
        positionX = entity.x + 85;
        positionY = entity.y - 57;
      } else {
        positionX = entity.x - 85;
        positionY = entity.y - 57;
      }
      
      orcCollider.attack(positionX, positionY, 400);

    } else if(classType === "SkeletonWeaponCollider") {
      const skeletonCollider = this.getFirstDead(false);

      if (!skeletonCollider) {
        return;
      }

      let positionX = 0;
      let positionY = 0;
  
      if (entity.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
        positionX = entity.x + 60;
        positionY = entity.y - 57;
      } else {
        positionX = entity.x - 60;
        positionY = entity.y - 57;
      }
      
      skeletonCollider.attack(positionX, positionY, 400);
    }
  }
}

export default WeaponColliders;
