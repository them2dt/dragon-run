import Phaser from 'phaser'

import TextureKeys from '../../consts/TextureKeys'
import SceneKeys from '../../consts/SceneKeys'
import Player from '../game/Player'

export default class GameScene extends Phaser.Scene
{

	private player!: Player

	private ground!: Phaser.Tilemaps.TilemapLayer
	private map!: Phaser.Tilemaps.Tilemap

	constructor()
	{
		super(SceneKeys.GameScene)
	}

	resize (gameSize: any, baseSize: any, displaySize: any, resolution: any)
    {
        const width = gameSize.width;
        const height = gameSize.height;

		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

		this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

		this.cameras.main.zoom = 0.8 + (width / 2000)


    }

	create()
	{
		const width = this.scale.width
		const height = this.scale.height

		this.map = this.make.tilemap({ key: TextureKeys.CaveMap })
		this.map.addTilesetImage('cave', TextureKeys.CaveTiles)
		
		this.ground = this.map.createLayer('Ground', this.map.getTileset('cave'), 0, 0)
		this.ground.setCollisionByProperty({ collides: true })
		this.ground.setSize(width, height)
		this.ground.scale = 2.4
		
		/*
		const debugGraphics = this.add.graphics().setAlpha(0.7)
		this.ground.renderDebug(debugGraphics, {
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
			faceColor: new Phaser.Display.Color(40, 39, 37, 255)
		})
		*/
		
		
		this.player = new Player(this, 0, 0)
		this.add.existing(this.player)
		
		const body = this.player.body as Phaser.Physics.Arcade.Body

		body.setCollideWorldBounds(true)
		
		this.physics.add.collider(this.player, this.ground)

		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

		this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
		
		this.cameras.main.startFollow(this.player, true, 1, 1, 0, 300)
		this.cameras.main.zoom = 0.8 + (width / 2000)


		
		this.scale.on('resize', this.resize, this);

	}



	update(t: number, dt: number)
	{
		
	}

	


}
