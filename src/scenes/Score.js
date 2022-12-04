import BaseScene from './Base';

class Score extends BaseScene {

  constructor(config) {
    super('ScoreScene', {...config, canGoBack: true});

  }

  create() {
    super.create();

    const bestScore = localStorage.getItem('bestScore');
    this.add.text(...this.screenCenter, `Best Score: ${bestScore || 0}`, {font: "50px Arial", fill: "#ffffff"}).setOrigin(0.5);
  }
}

export default Score;