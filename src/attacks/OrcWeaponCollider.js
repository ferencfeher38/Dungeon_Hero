import Phaser from 'phaser';
import InitializeAnimations from "../animations/AttackAnimations";
import EffectManager from '../effects/EffectManager';

class OrcWeaponCollider extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "collider");
    
        scene.add.existing(this);
        scene.physics.add.existing(this);
  
        InitializeAnimations(this.scene.anims);

        this.effectManager  = new EffectManager(this.scene);
        this.damage = 10;
      }
    
      preUpdate(time, delta) {
        super.preUpdate(time, delta);
      }
    
      attack(x, y) {
        this.body.reset(x + 50, y - 67);
        this.activateCollider(true);
        setTimeout(() => this.activateCollider(false), 400);
        setTimeout(() => this.body.reset(0, 0), 400);
        setTimeout(() => this.body.checkCollision.none = false, 400);
      }
    
      deliversHit(target) {
        const impactPosition = { x: this.x , y: this.y };
        //this.effectManager.playEffectOn("fire-attack-hit", target, impactPosition);
      }
    
      activateCollider(isActive) {
        this.setActive(isActive);
        this.setVisible(isActive);
      }
}

export default OrcWeaponCollider