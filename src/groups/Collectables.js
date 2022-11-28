import Phaser from "phaser";
import Collectable from "../collectables/Collectable";

class Collectables extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createFromConfig({
      classType: Collectable,
    });
  }

  getMapProperties(propertiesList) {
    if(!propertiesList || propertiesList.length === 0) {
      return {};
    }

    return propertiesList.reduce((map, obj) => {
      map[obj.name] = obj.value;
      return map;
    }, {});
  }

  addCollectablesFromLayer(layer) {
    const {score:  defaultScore, type} = this.getMapProperties(layer.properties);

    layer.objects.forEach(collectableObject => {
        const collectable =  this.get(collectableObject.x, collectableObject.y, type);
        const objectProperties = this.getMapProperties(collectableObject.properties);

        collectable.score = objectProperties.score || defaultScore;
    });
  }
}

export default Collectables;
