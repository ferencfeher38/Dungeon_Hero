import SpriteEffect from "./SpriteEffects";

class EffectManager{
    constructor(scene) {
        this.scene = scene;
    }

    playEffectOn(effectName, target) {
        const effect = new SpriteEffect(this.scene, 0, 0, effectName);
        effect.playEffect(target);
    }
}

export default EffectManager;