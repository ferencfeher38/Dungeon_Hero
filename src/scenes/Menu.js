import BaseScene from './Base';

class MenuScene extends BaseScene {

  constructor(config) {
    super('MenuScene', config);

    this.config = config;

    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'MapScene', text: 'Maps' },
      { scene: "ScoreScene", text: "Best Score" },
      { scene: null, text: 'Exit' },
    ]
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    this.add.image(this.config.width / 2, this.config.height / 2, "beige-border")
      .setDepth(-1)
      .setScale(1.8);

    this.add.image(this.config.width / 2, (this.config.height / 2) - 280, "tape").setScale(3, 2);
    this.add.text((this.config.width / 2), (this.config.height / 2) - 278, "Dungeon Hero", { font: "55px Arial"}).setOrigin(0.5);
    const mapsButton = this.add.image(this.config.width / 2, (this.config.height / 2) - 15, "button")
    .setOrigin(0.5)
    .setDepth(-1)
    .setScale(3, 2.5)
    .setInteractive({ draggable: false, cursor: "pointer" });
    mapsButton.on("pointerup", () => {
      this.scene.start("MapScene");
    });

    const playButton = this.add.image(this.config.width / 2, (this.config.height / 2) - 125, "button")
    .setOrigin(0.5)
    .setDepth(-1)
    .setScale(3, 2.5)
    .setInteractive({ draggable: false, cursor: "pointer" });
    playButton.on("pointerup", () => {
      this.scene.start("PlayScene");
    });

    const bestScoreButton = this.add.image(this.config.width / 2, (this.config.height / 2) + 95, "button")
    .setOrigin(0.5)
    .setDepth(-1)
    .setScale(3, 2.5)
    .setInteractive({ draggable: false, cursor: "pointer" });
    bestScoreButton.on("pointerup", () => {
      this.scene.start("ScoreScene");
    });

    const exitButton = this.add.image(this.config.width / 2, (this.config.height / 2) + 205, "button")
    .setOrigin(0.5)
    .setDepth(-1)
    .setScale(3, 2.5)
    .setInteractive({ draggable: false, cursor: "pointer" });
    exitButton.on("pointerup", () => {
      this.game.destroy(true);
    });
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive({ draggable: false, cursor: "pointer" });

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#F3E9DD" });
    })

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#fff" });
    })

    textGO.on("pointerup", () => {
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === "Exit") {
        this.game.destroy(true);
      }
    })
  }
}

export default MenuScene;