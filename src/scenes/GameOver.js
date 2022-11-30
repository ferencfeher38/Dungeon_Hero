import BaseScene from './Base';

class GameOverScene extends BaseScene {

  constructor(config) {
    super('GameOverScene', {...config, canGoBack: true});

    this.menu = [
      {scene: null, text: 'Game Over'}
    ]
  }

  create() {
    super.create();
    this.createMenu(this.menu, () => {});
  }
}

export default GameOverScene;