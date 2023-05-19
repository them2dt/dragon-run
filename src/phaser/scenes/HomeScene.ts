import * as Phaser from 'phaser';
import SceneKeys from '@consts/SceneKeys';
import eventsCenter from '@events-center';
import EventKeys from '@consts/EventKeys';

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.HomeScene);
  }
  create() {
    eventsCenter.emit(EventKeys.HomeLoaded);
  }
}
