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
    const values = this.sys.getData().values;
    let characterLink = null;
    if (values?.characterLink) {
      characterLink = values.characterLink;
    }
    if (this.textures.exists(TextureKeys.Character)) {
      this.cache.json.remove(TextureKeys.Character);
      this.cache.bitmapFont.remove(TextureKeys.Character);
      this.textures.remove(TextureKeys.Character);
      this.load.aseprite(
        TextureKeys.Character,
        characterLink || 'game-assets/characters/default-character.png',
        'game-assets/characters/default-character.json'
      );
    } else {
      this.load.aseprite(
        TextureKeys.Character,
        characterLink || 'game-assets/characters/default-character.png',
        'game-assets/characters/default-character.json'
      );
    }
  }

  create() {
    const values = this.sys.getData().values;
    if (values?.nextEvent) {
      const nextEvent = values.nextEvent;
      eventsCenter.emit(EventKeys.CharacterLoaded);
      eventsCenter.emit(nextEvent);
    } else {
      eventsCenter.emit(EventKeys.CharacterLoaded);
    }
  }
}
