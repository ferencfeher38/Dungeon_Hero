import Phaser from "phaser";

class Container extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.x = x;
        this.y = y;

        scene.add.existing(this);

        this.setPosition(this.x + 360, this.y);
        this.setUpContainer();
        this.setScrollFactor(0);
    }

    setUpContainer() {
        const scoreboard = this.createScoreboard();
        this.add(scoreboard);
    }

    createScoreboard() {
        const scoreText = this.scene.add.text(0, 1, "0", {font: "30px Arial", fill: "#ffffff"});
        const scoreImage = this.scene.add.image(scoreText.x - 40, 0, "crystal").setOrigin(0);
        const scoreboard = this.scene.add.container(0, 0, [scoreText, scoreImage]);
        scoreboard.setName("scoreboard");

        return scoreboard;
    }

    updateScore(score) {
        const [scoreText] = this.getByName("scoreboard").list;
        scoreText.setText(score);
    }
}

export default Container;