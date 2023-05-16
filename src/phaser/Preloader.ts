import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
import MusicKeys from '../consts/audio/MusicKeys'
import EnemySoundEffectKeys from '../consts/audio/EnemySoundEffectKeys'
import PlayerSoundEffectKeys from '../consts/audio/PlayerSoundEffectKeys'
import EnvironmentSoundEffectKeys from '../consts/audio/EnvironmentSoundEffectKeys'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Preloader)
	}

	preload()
	{	
		
		this.load.image(TextureKeys.Background1, 'game-assets/backgrounds/volcano-bg1.png')
		this.load.image(TextureKeys.Background2, 'game-assets/backgrounds/volcano-bg2.png')
		this.load.image(TextureKeys.Background3, 'game-assets/backgrounds/volcano-bg3.png')

		this.load.image(TextureKeys.CaveTiles, 'game-assets/tiles/cave-tileset-extruded.png')
		this.load.tilemapTiledJSON(TextureKeys.CaveMap, 'game-assets/tiles/cave-map.json')

		this.load.image(TextureKeys.Fireball, 'game-assets/misc/fireball.png')
		this.load.image(TextureKeys.Lavaball, 'game-assets/misc/lavaball.png')

		this.load.aseprite(TextureKeys.RedDragon, 'game-assets/characters/red-dragon.png', 'game-assets/characters/red-dragon.json')
		this.load.aseprite(TextureKeys.DefaultCharacter, 'game-assets/characters/default-character.png', 'game-assets/characters/default-character.json')
		this.load.aseprite(TextureKeys.SmallDragonOrange, 'game-assets/characters/small-dragon-orange.png', 'game-assets/characters/small-dragon-orange.json')
		this.load.aseprite(TextureKeys.SmallDragonGreen, 'game-assets/characters/small-dragon-green.png', 'game-assets/characters/small-dragon-green.json')

		this.load.audio(EnvironmentSoundEffectKeys.LavaBackground1, 'game-assets/sound-effects/environment/lava-background-1.mp3')
		this.load.audio(EnvironmentSoundEffectKeys.LavaBurn1, 'game-assets/sound-effects/environment/lava-burn-1.mp3')
		this.load.audio(EnemySoundEffectKeys.DragonRoar1, 'game-assets/sound-effects/enemies/dragon-roar-1.mp3')
		this.load.audio(EnemySoundEffectKeys.DragonRoar2, 'game-assets/sound-effects/enemies/dragon-roar-2.mp3')
		this.load.audio(EnemySoundEffectKeys.EnemyDeath1, 'game-assets/sound-effects/enemies/enemy-death-1.mp3')
		this.load.audio(EnemySoundEffectKeys.EnemyDeath2, 'game-assets/sound-effects/enemies/enemy-death-2.mp3')
		this.load.audio(PlayerSoundEffectKeys.PlayerDeath1, 'game-assets/sound-effects/players/player-death-1.mp3')
		this.load.audio(PlayerSoundEffectKeys.PlayerJump1, 'game-assets/sound-effects/players/player-jump-1.mp3')
		this.load.audio(PlayerSoundEffectKeys.PlayerLand1, 'game-assets/sound-effects/players/player-land-1.mp3')
		this.load.audio(PlayerSoundEffectKeys.PlayerWalk1, 'game-assets/sound-effects/players/player-walk-1.mp3')
		this.load.audio(PlayerSoundEffectKeys.PlayerRun1, 'game-assets/sound-effects/players/player-run-1.mp3')
		this.load.audio(MusicKeys.CaveScene1, 'game-assets/music/cave-scene-1.mp3')
		this.load.audio(MusicKeys.HomeScene1, 'game-assets/music/home-scene-1.mp3')

	}

	create()
	{	
		this.scene.start(SceneKeys.CaveScene)
	}
}
