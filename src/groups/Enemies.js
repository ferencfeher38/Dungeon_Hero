import Phaser from 'phaser';
import { ENEMY_TYPES } from '../types';
import Collidable from "../mixins/Collidable";

class Enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        Object.assign(this, Collidable);
    }

    getWeaponColliders() {
        const weaponColliders = new Phaser.GameObjects.Group();
        
        this.getChildren().forEach(enemy => {
            enemy.weaponColliders && weaponColliders.add(enemy.weaponColliders);
        });

        return weaponColliders;
    }

    getTypes() {
        return ENEMY_TYPES;
    }
}

export default Enemies;