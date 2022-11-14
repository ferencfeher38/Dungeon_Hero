import Enemy from "./Enemy";

class Goblin extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, "goblin_animations");
    
        this.init();
    }

    init() {
        this.setBodySize(50, 55);
        this.setOffset(35, 35);
    }
}

export default Goblin;