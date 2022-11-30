import Phaser from "phaser";
import PlayScene from "./scenes/Play";
import PreloadScene from "./scenes/Preload"
import MenuScene from "./scenes/Menu";
import MapScene from "./scenes/Maps";

const MAP_WIDTH = 25600;
const WIDTH = document.body.offsetWidth;
const HEIGHT = 1080;
const ZOOM_FACTOR = 1.0;

const SHARED_CONFIG = {
  mapOffsetWidth: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  debug: true,
}

const Scenes = [PreloadScene, MenuScene, MapScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  //pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug
    }
  },
  scene: initScenes()
}

new Phaser.Game(config);