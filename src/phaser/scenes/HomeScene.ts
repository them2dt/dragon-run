import * as Phaser from 'phaser';
import SceneKeys from 'constants/SceneKeys';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.HomeScene);
  }
  create() {
    eventsCenter.emit(EventKeys.HomeLoaded);
  }
}
