import SceneKeys from "@consts/SceneKeys";
import CaveScene from "./CaveScene";

export default class Level1Scene extends CaveScene {
  constructor() {
    super(SceneKeys.Level1Scene);
    this.levelCompleteX = 4850;
    this.maxCompleteTime = 220;
    this.minCompleteTime = 250;
    this.scoreMultiplier = 1;
    this.playerSpawnX = 134;
  }
}
