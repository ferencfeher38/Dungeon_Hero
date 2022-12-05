import Phaser from "phaser";

class HealthBar {
    constructor(scene, x, y, scale = 1, health) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x / scale;
        this.y = y / scale;
        this.scale = scale;
        this.value = health;

        this.size = {
            width: 300,
            height: 25
        }

        this.pixelPerHealth = this.size.width / this.value;

        scene.add.existing(this.bar);
        this.draw(this.x, this.y, this.scale);
    }

    decrease(quantity) {
        if(quantity <= 0) {
            this.value = 0;
        } else {
            this.value = quantity;
        }
        this.draw(this.x, this.y, this.scale);
    }

    draw(x, y, scale) {
        this.bar.clear();
        const { width, height } = this.size;

        const margin = 5;

        this.bar.fillStyle(0x3C2317);
        this.bar.fillRect(x, y, width + margin, height + margin);

        this.bar.fillStyle(0xFFFFFF);
        this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

        const healthWidth = Math.floor(this.value * this.pixelPerHealth);
        
        if(healthWidth <= this.size.width / 3) {
            this.bar.fillStyle(0xBD251A);
        } else {
            this.bar.fillStyle(0x4DD65E);
        }

        if(healthWidth > 0) {
            this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin);
        }

        return this.bar.setScrollFactor(0, 0).setScale(scale);
    }
}

export default HealthBar;