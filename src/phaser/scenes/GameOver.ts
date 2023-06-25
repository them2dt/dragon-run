import * as Phaser from 'phaser';
import SceneKeys from '../../constants/SceneKeys';
import eventsCenter from '../../utils/eventsCenter';
import EventKeys from 'constants/EventKeys';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameOver);
  }

  create() {
    eventsCenter.emit(EventKeys.GameOverLoaded);

    const keyboard = this.input.keyboard;

    if (!keyboard) {
      return;
    }
    keyboard.once('keydown-SPACE', () => {
      this.sound.stopAll();
      this.sound.removeAll();
      this.scene.stop(SceneKeys.GameOver);
      eventsCenter.emit(EventKeys.GoToGame);
    });
  }
}
