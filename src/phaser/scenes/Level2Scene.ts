import SceneKeys from "@consts/SceneKeys";
import CaveScene from "./CaveScene";
import TextureKeys from "@consts/TextureKeys";

export default class Level2Scene extends CaveScene {
  constructor() {
    super(SceneKeys.Level2Scene);
    this.levelCompleteX = 1800;
    this.minCompleteTime = 75;
    this.maxCompleteTime = 96;
    this.scoreMultiplier = 1.1;
    this.playerSpawnX = 134;
    this.levelNumber = 2;
    this.redDragonSpawn = 300;
    this.mapKey = TextureKeys.Level2;
  }
}
