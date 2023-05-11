import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'

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

		this.load.aseprite(TextureKeys.DefaultCharacter, 'game-assets/characters/default-character.png', 'game-assets/characters/default-character.json')
		this.load.aseprite(TextureKeys.SmallDragonOrange, 'game-assets/characters/small-dragon-orange.png', 'game-assets/characters/small-dragon-orange.json')
		this.load.aseprite(TextureKeys.SmallDragonGreen, 'game-assets/characters/small-dragon-green.png', 'game-assets/characters/small-dragon-green.json')
	}

	create()
	{	
		this.scene.start(SceneKeys.GameScene)
	}
}
