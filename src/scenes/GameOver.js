import BaseScene from './Base';

class GameOverScene extends BaseScene {

  constructor(config) {
    super('GameOverScene', {...config, canGoBack: true});
  }

  create() {
    super.create();

    this.add.image(this.config.width / 2, this.config.height / 2, "beige-border")
    .setDepth(-1)
    .setScale(1.7, 1);

    this.add.image(this.config.width / 2, (this.config.height / 2) - 220, "knight-tape")
    .setScale(1.7, 1.2);

    this.add.text((this.config.width / 2), (this.config.height / 2), "You won!", { font: "55px Arial", fill: "#3C2317"}).setOrigin(0.5);
  }
}

export default GameOverScene;