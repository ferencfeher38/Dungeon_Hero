import BaseScene from './Base';

class MapScene extends BaseScene {

  constructor(config) {
    super('MapScene', {...config, canGoBack: true});
  }

  create() {
    super.create();

    this.menu= [];
    const maps = this.registry.get("unlocked-maps");

    for(let i = 1; i <= maps; i++) {
      this.menu.push({
        scene: "PlayScene", text: `Map ${i}`, map: i
      });
    }

    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on('pointerover', () => {
      textGO.setStyle({fill: '#ff0'});
    })

    textGO.on('pointerout', () => {
      textGO.setStyle({fill: '#fff'});
    })

    textGO.on('pointerup', () => {
      if(menuItem.scene) {
        this.registry.set("map", menuItem.map);
        this.scene.start(menuItem.scene);
      }

      if (menuItem.text === 'Exit') {
        this.game.destroy(true);
      }
    })
  }
}

export default MapScene;