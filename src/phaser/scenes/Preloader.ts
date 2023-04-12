import Phaser from 'phaser'

import TextureKeys from '../../consts/TextureKeys'
import SceneKeys from '../../consts/SceneKeys'
import AnimationKeys from '../../consts/AnimationKeys'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Preloader)
	}

	preload()
	{
		this.load.image(TextureKeys.Background, 'game-assets/house/bg_repeat_340x640.png')
		this.load.image(TextureKeys.MouseHole, 'game-assets/house/object_mousehole.png')
		this.load.image(TextureKeys.Window1, 'game-assets/house/object_window1.png')
		this.load.image(TextureKeys.Window2, 'game-assets/house/object_window2.png')

		this.load.image(TextureKeys.Bookcase1, 'game-assets/house/object_bookcase1.png')
		this.load.image(TextureKeys.Bookcase2, 'game-assets/house/object_bookcase2.png')

		this.load.image(TextureKeys.LaserEnd, 'game-assets/house/object_laser_end.png')
		this.load.image(TextureKeys.LaserMiddle, 'game-assets/house/object_laser.png')

		this.load.image(TextureKeys.Coin, 'game-assets/house/object_coin.png')

		this.load.aseprite(TextureKeys.DefaultCharacter, 'game-assets/characters/default-character.png', 'game-assets/characters/default-character.json')
	}

	create()
	{
		this.scene.start(SceneKeys.GameScene)
	}
}
