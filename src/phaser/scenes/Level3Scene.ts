import SceneKeys from "@consts/SceneKeys";
import CaveScene from "./CaveScene";
import TextureKeys from "@consts/TextureKeys";

export default class Level2Scene extends CaveScene {
  constructor() {
    super(SceneKeys.Level3Scene);
    this.levelCompleteX = 4850;
    this.minCompleteTime = 220;
    this.maxCompleteTime = 250;
    this.scoreMultiplier = 1.2;
    this.playerSpawnX = 134;
    this.levelNumber = 3;
    this.mapKey = TextureKeys.Level3;
  }
}
