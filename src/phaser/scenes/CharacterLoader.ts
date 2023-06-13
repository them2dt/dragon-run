import * as Phaser from 'phaser';
import TextureKeys from '../../constants/TextureKeys';
import SceneKeys from '../../constants/SceneKeys';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';

export default class CharacterLoader extends Phaser.Scene {
  // "https://bafybeiabmrvyz7ibdxc72hyxru5wbw2naix44wwtiqxuno7xf6go3gj5dq.ipfs.nftstorage.link/14.png"
  constructor() {
    super(SceneKeys.CharacterLoader);
  }

  preload() {
    console.log('Actual Data: ', this.sys.getData());
    if (this.sys.getData().values?.characterLink) {
      console.log('Got character link: ', this.sys.getData().values?.characterLink);
      this.load.aseprite(
        TextureKeys.Character,
        this.sys.getData().values?.characterLink,
        'game-assets/characters/default-character.json'
      );
    } else {
      console.log('Character link empty');
    }
  }

  create() {
    eventsCenter.emit(EventKeys.GoToHome);
  }
}
