import * as Phaser from 'phaser';
import SceneKeys from '../../constants/SceneKeys';
import eventsCenter from '../../utils/eventsCenter';
import EventKeys from 'constants/EventKeys';

export default class EnterScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.EnterScene);
  }

  create() {
    const keyboard = this.input.keyboard;

    if (!keyboard) {
      return;
    }
    keyboard.once('keydown-ENTER', () => {
      this.scene.stop(SceneKeys.EnterScene);
      eventsCenter.emit(EventKeys.GoToHome);
    });
    keyboard.once('keydown-SPACE', () => {
      this.scene.stop(SceneKeys.EnterScene);
      eventsCenter.emit(EventKeys.GoToHome);
    });

  }
}
