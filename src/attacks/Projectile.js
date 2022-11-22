import Phaser from "phaser";

class Projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 300;
        this.maximumDistance = 200;
        this.travelledDistance = 0;
    }

    fire() {
        this.setVelocityX(this.speed);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.travelledDistance += this.body.deltaAbsX();

        if(this.travelledDistance > this.maximumDistance) {
            this.destroy();
        }
    }
}

export default Projectile;