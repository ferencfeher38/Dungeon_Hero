import Phaser from 'phaser';
import { ENEMY_TYPES } from '../types';
import Collidable from "../mixins/Collidable";

class Enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        Object.assign(this, Collidable);
    }

    getTypes() {
        return ENEMY_TYPES;
    }
}

export default Enemies;