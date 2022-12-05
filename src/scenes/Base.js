import Phaser from 'phaser';

class BaseScene extends Phaser.Scene {

  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, (config.height / 2) - 100];
    this.lineHeight = 110;
    this.fontOptions = {font: "45px Arial", fill: "#ffffff"};
  }

  create() {
    this.add.image(0, 0, "menu-background").setOrigin(0).setDepth(-2);
    if (this.config.canGoBack) {
      const backButton = this.add.image((this.config.width / 2), (this.config.height / 2) + 150, 'back-button')
        .setOrigin(0.5)
        .setInteractive({draggable: false, cursor: "pointer"});

      backButton.on('pointerup', () => {
        this.scene.start('MenuScene');
      });
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    })
  }
}

export default BaseScene;