import Phaser from "phaser";
import PlayScene from "./scenes/Play";
import PreloadScene from "./scenes/Preload"

const MAP_WIDTH = 25600;
const MAP_HEIGHT = 1080;
const HEIGHT = window.innerHeight;
const WIDTH = document.body.offsetWidth;

const SHARED_CONFIG = {
  mapOffsetWidth: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  mapOffsetHeight: MAP_HEIGHT > HEIGHT ? MAP_HEIGHT - HEIGHT : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: 1.4
}

const Scenes = [PreloadScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#E8F9FD",
  ...SHARED_CONFIG,
  //pixelArt: true,
  scrollbars: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);