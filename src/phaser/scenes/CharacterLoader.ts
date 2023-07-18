import * as Phaser from "phaser";
import TextureKeys from "../../constants/TextureKeys";
import SceneKeys from "../../constants/SceneKeys";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";

export default class CharacterLoader extends Phaser.Scene {
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
        characterLink || "game-assets/characters/default-character.png",
        "game-assets/characters/default-character.json"
      );
    } else {
      this.load.aseprite(
        TextureKeys.Character,
        characterLink || "game-assets/characters/default-character.png",
        "game-assets/characters/default-character.json"
      );
    }
  }

  create() {
    const values = this.sys.getData().values;
    if (values?.nextEventKey && values?.nextEventProps) {
      eventsCenter.emit(EventKeys.CharacterLoaded);
      eventsCenter.emit(values.nextEventKey, values.nextEventProps);
    } else if (values?.nextEventKey) {
      const nextEvent = values.nextEventKey;
      eventsCenter.emit(EventKeys.CharacterLoaded);
      eventsCenter.emit(nextEvent);
    } else {
      eventsCenter.emit(EventKeys.CharacterLoaded);
    }
  }
}
