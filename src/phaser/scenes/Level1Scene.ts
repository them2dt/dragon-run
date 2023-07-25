import SceneKeys from "@consts/SceneKeys";
import CaveScene from "./CaveScene";
import TextureKeys from "@consts/TextureKeys";

export default class Level1Scene extends CaveScene {
  constructor() {
    super(SceneKeys.Level1Scene);
    this.levelCompleteX = 550;
    this.minCompleteTime = 18;
    this.maxCompleteTime = 28;
    this.scoreMultiplier = 1;
    this.playerSpawnX = 134;
    this.levelNumber = 1;
    this.mapKey = TextureKeys.Level1;
    this.redDragonSpawn = 500;
    this.redDragonSpeed = 220;
  }
}
