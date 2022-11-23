import Enemy from "./Enemy";
import InitializeAnimations from "../animations/GoblinAnimations";

class Goblin extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "goblin_animations");

        InitializeAnimations(scene.anims);
    }

    update(time, delta) {
        super.update(time,delta);

        if(!this.active) { 
            return;
        }

        if(this.isPlayingAnimation("goblin-hurt") || this.isPlayingAnimation("goblin-death")) {
            return;
        }

        this.play("goblin-walk", true);
    }

    takesHit(source) {
        super.takesHit(source);
        this.play("goblin-hurt", true);

        if(this.health <= 0) {
            this.play("goblin-death", true);
            this.setTint(0xff0000);
            this.setVelocity(0, -200);
            this.body.checkCollision.none = true;
            this.setCollideWorldBounds(false);
            setTimeout(() => this.setVisible(false), 1000);
        }
    }
}

export default Goblin;