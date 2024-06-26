import * as Phaser from "phaser";
import SceneKeys from "constants/SceneKeys";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import MusicKeys from "@consts/audio/MusicKeys";
import SoundFade from "phaser3-rex-plugins/plugins/soundfade.js";

export default class HomeScene extends Phaser.Scene {
  public music!: Phaser.Sound.BaseSound;

  constructor() {
    super(SceneKeys.HomeScene);
  }

  create() {
    this.music = this.sound.add(MusicKeys.HomeScene1, { loop: true });

    SoundFade.fadeIn(this.music, 10000, 0.4);
    eventsCenter.emit(EventKeys.HomeLoaded);

    const keyboard = this.input.keyboard;

    if (!keyboard) {
      return;
    }
    keyboard.on("keydown-ENTER", () => {
      eventsCenter.emit(EventKeys.OpenChooseCharacter);
    });
    keyboard.on("keydown-SPACE", () => {
      eventsCenter.emit(EventKeys.OpenChooseCharacter);
    });
  }
}
