import BaseMeleeWeaponCollider from "./BaseMeleeWeaponCollider";

class GoblinWeaponCollider extends BaseMeleeWeaponCollider {
    constructor(scene, x, y, collider) {
        super(scene, x, y, collider);
    }

    initialize() {
        super.initalize();
    }

    attack(entity) {
        this.entity = entity;
        this.activateCollider(true);
        if(entity.body.facing === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.body.reset(entity.x + 40, entity.y - 40);
        } else {
            this.body.reset(entity.x - 40, entity.y - 40);
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if(!this.entity.body) {
            return;
        }

        if(!this.active) {
            return;
        }

        if(this.entity.body.facing  === Phaser.Physics.Arcade.FACING_RIGHT) {
            this.body.reset(this.entity.x + 40, this.entity.y - 40);
        } else {
            this.body.reset(this.entity.x - 40, this.entity.y - 40);
        }

        setTimeout(() => this.activateCollider(false), 300);
        setTimeout(() => this.body.reset(0, 0), 300);
        setTimeout(() => this.body.checkCollision.none = false, 300);
    }
}

export default GoblinWeaponCollider