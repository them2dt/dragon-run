import * as Phaser from 'phaser';
import SceneKeys from '../../consts/SceneKeys';
import eventsCenter from '../../events/eventsCenter';
import EventKeys from '@consts/EventKeys';

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
      this.scene.stop(SceneKeys.GameOver);
      eventsCenter.emit(EventKeys.GoToGame);
    });
  }
}
