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
        const crystalboard = this.createCrystalboard();
        this.add(crystalboard);

        const scoreboard = this.createScoreboard();
        this.add(scoreboard);
    }

    createCrystalboard() {
        const crystalText = this.scene.add.text(0, 1, "0", {font: "30px Arial", fill: "#ffffff"});
        const crystalImage = this.scene.add.image(crystalText.x - 40, 0, "crystal").setOrigin(0);
        const crystalboard = this.scene.add.container(0, 0, [crystalText, crystalImage]);
        crystalboard.setName("crystalboard");

        return crystalboard;
    }

    
    updateCrystal(amount) {
        const [crystalText] = this.getByName("crystalboard").list;
        crystalText.setText(amount);
    }


    
    createScoreboard() {
        const scoreText = this.scene.add.text(505, 1, "Score:", {font: "30px Arial", fill: "#ffffff"});
        const score = this.scene.add.text(scoreText.x + 95, 2, "0", {font: "30px Arial", fill: "#ffffff"});
        const bestScore = localStorage.getItem('bestScore');
        const bestScoreText = this.scene.add.text(480, 40, `Best Score: ${bestScore}`, {font: "25px Arial", fill: "#ffffff"});
        const scoreboard = this.scene.add.container(0, 0, [score, scoreText, bestScoreText]);
        scoreboard.setName("scoreboard");

        return scoreboard;
    }

    updateScore(amount) {
        const [score] = this.getByName("scoreboard").list;
        score.setText(amount);
    }
}

export default Container;