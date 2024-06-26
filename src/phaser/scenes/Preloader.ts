import * as Phaser from "phaser";
import TextureKeys from "../../constants/TextureKeys";
import SceneKeys from "../../constants/SceneKeys";
import MusicKeys from "../../constants/audio/MusicKeys";
import EnemySoundEffectKeys from "../../constants/audio/EnemySoundEffectKeys";
import PlayerSoundEffectKeys from "../../constants/audio/PlayerSoundEffectKeys";
import EnvironmentSoundEffectKeys from "../../constants/audio/EnvironmentSoundEffectKeys";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import MiscSoundEffectKeys from "@consts/audio/MiscSoundEffectKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    this.load.on("progress", (value: number) => {
      eventsCenter.emit(EventKeys.LoadingProgress, value);
    });

    this.load.image(TextureKeys.Background1, "game-assets/backgrounds/volcano-bg1.png");
    this.load.image(TextureKeys.Background2, "game-assets/backgrounds/volcano-bg2.png");
    this.load.image(TextureKeys.Background3, "game-assets/backgrounds/volcano-bg3.png");

    this.load.image(TextureKeys.CaveTiles, "game-assets/tiles/cave-tileset-extruded.png");
    this.load.tilemapTiledJSON(TextureKeys.CaveMap, "game-assets/tiles/cave-map.json");
    this.load.tilemapTiledJSON(TextureKeys.Level1, "game-assets/tiles/level-1.json");
    this.load.tilemapTiledJSON(TextureKeys.Level2, "game-assets/tiles/level-2.json");
    this.load.tilemapTiledJSON(TextureKeys.Level3, "game-assets/tiles/level-3.json");

    this.load.image(TextureKeys.Fireball, "game-assets/misc/fireball.png");
    this.load.image(TextureKeys.Lavaball, "game-assets/misc/lavaball.png");

    this.load.aseprite(
      TextureKeys.RedDragon,
      "game-assets/characters/red-dragon.png",
      "game-assets/characters/red-dragon.json"
    );
    this.load.aseprite(
      TextureKeys.SmallDragonOrange,
      "game-assets/characters/small-dragon-orange.png",
      "game-assets/characters/small-dragon-orange.json"
    );
    this.load.aseprite(
      TextureKeys.SmallDragonGreen,
      "game-assets/characters/small-dragon-green.png",
      "game-assets/characters/small-dragon-green.json"
    );

    this.load.audio(
      EnvironmentSoundEffectKeys.LavaBackground1,
      "game-assets/sound-effects/environment/lava-background-1.mp3"
    );
    this.load.audio(EnvironmentSoundEffectKeys.LavaBurn1, "game-assets/sound-effects/environment/lava-burn-1.mp3");
    this.load.audio(
      EnvironmentSoundEffectKeys.LavaballThrow1,
      "game-assets/sound-effects/environment/lavaball-throw-1.mp3"
    );
    this.load.audio(EnvironmentSoundEffectKeys.LavaPlop1, "game-assets/sound-effects/environment/lava-plop-1.mp3");

    this.load.audio(EnemySoundEffectKeys.DragonRoar1, "game-assets/sound-effects/enemies/dragon-roar-1.mp3");
    this.load.audio(EnemySoundEffectKeys.DragonRoar2, "game-assets/sound-effects/enemies/dragon-roar-2.mp3");
    this.load.audio(EnemySoundEffectKeys.DragonRoar3, "game-assets/sound-effects/enemies/dragon-roar-3.mp3");
    this.load.audio(EnemySoundEffectKeys.DragonWings1, "game-assets/sound-effects/enemies/dragon-wings-1.mp3");
    this.load.audio(EnemySoundEffectKeys.DragonBurn1, "game-assets/sound-effects/enemies/dragon-burn-1.mp3");

    this.load.audio(EnemySoundEffectKeys.EnemyDeath1, "game-assets/sound-effects/enemies/enemy-death-1.mp3");
    this.load.audio(EnemySoundEffectKeys.EnemyDeath2, "game-assets/sound-effects/enemies/enemy-death-2.mp3");
    this.load.audio(EnemySoundEffectKeys.EnemyBite1, "game-assets/sound-effects/enemies/enemy-bite-1.mp3");

    this.load.audio(PlayerSoundEffectKeys.PlayerDeath1, "game-assets/sound-effects/players/player-death-1.mp3");
    this.load.audio(PlayerSoundEffectKeys.PlayerDeath2, "game-assets/sound-effects/players/player-death-2.mp3");
    this.load.audio(PlayerSoundEffectKeys.PlayerJump1, "game-assets/sound-effects/players/player-jump-1.mp3");
    this.load.audio(PlayerSoundEffectKeys.PlayerLand1, "game-assets/sound-effects/players/player-land-1.mp3");
    this.load.audio(PlayerSoundEffectKeys.PlayerWalk1, "game-assets/sound-effects/players/player-walk-1.mp3");
    this.load.audio(PlayerSoundEffectKeys.PlayerRun1, "game-assets/sound-effects/players/player-run-1.mp3");
    this.load.audio(
      PlayerSoundEffectKeys.PlayerFireballThrow1,
      "game-assets/sound-effects/players/player-fireball-throw-1.mp3"
    );
    this.load.audio(
      PlayerSoundEffectKeys.PlayerFireballBurn1,
      "game-assets/sound-effects/players/player-fireball-burn-1.mp3"
    );

    this.load.audio(MiscSoundEffectKeys.Run, "game-assets/sound-effects/misc/run.mp3");
    this.load.audio(MiscSoundEffectKeys.LevelComplete, "game-assets/sound-effects/misc/level-complete.mp3");

    this.load.audio(MusicKeys.CaveScene1, "game-assets/music/cave-scene-1.mp3");
    this.load.audio(MusicKeys.HomeScene1, "game-assets/music/home-scene-1.mp3");
  }

  create() {
    eventsCenter.emit(EventKeys.GoToEnter);
  }
}
