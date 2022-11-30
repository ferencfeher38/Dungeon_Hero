import Phaser from "phaser";

class EventDispatcher extends Phaser.Events.EventEmitter {
    constructor() {
        super();
    }
}

export default new EventDispatcher();