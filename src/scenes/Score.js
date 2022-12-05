import BaseScene from './Base';

class Score extends BaseScene {

  constructor(config) {
    super('ScoreScene', {...config, canGoBack: true});

  }

  create() {
    super.create();

    const bestScore = localStorage.getItem('bestScore');
    this.add.text(...this.screenCenter, `Best Score: ${bestScore || 0}`, {font: "50px Arial", fill: "#ffffff"}).setOrigin(0.5);

    this.add.image(this.config.width / 2, this.config.height / 2, "beige-border")
    .setDepth(-1)
    .setScale(1.8);
  }
}

export default Score;