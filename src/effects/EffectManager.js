import SpriteEffect from "./SpriteEffects";

class EffectManager{
    constructor(scene) {
        this.scene = scene;
    }

    playEffectOn(effectName, target, impactPosition) {
        const effect = new SpriteEffect(this.scene, 0, 0, effectName, impactPosition);
        effect.playEffect(target);
    }
}

export default EffectManager;