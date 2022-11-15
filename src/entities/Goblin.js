import Enemy from "./Enemy";
import InitializeAnimations from "../animations/GoblinAnimations";

class Goblin extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "goblin_animations");

        InitializeAnimations(scene.anims);
    }

    update(time, delta) {
        super.update(time,delta);
        this.play("goblin-walk", true);
    }
}

export default Goblin;