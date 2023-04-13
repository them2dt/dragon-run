import Phaser from 'phaser'

import TextureKeys from '../../consts/TextureKeys'
import SceneKeys from '../../consts/SceneKeys'
import Player from '../game/Player'
import LaserObstacle from '../game/LaserObstacle'

export default class GameScene extends Phaser.Scene
{

	private laserObstacle!: LaserObstacle
	private coins!: Phaser.Physics.Arcade.StaticGroup

	private scoreLabel!: Phaser.GameObjects.Text
	private score = 0

	private player!: Player

	private ground!: Phaser.Tilemaps.TilemapLayer
	private map!: Phaser.Tilemaps.Tilemap

	constructor()
	{
		super(SceneKeys.GameScene)
	}

	init()
	{
		this.score = 0
	}

	create()
	{
		const width = this.scale.width
		const height = this.scale.height

		this.map = this.make.tilemap({ key: TextureKeys.CaveMap })

		this.map.addTilesetImage('cave', TextureKeys.CaveTiles)

		this.ground = this.map.createLayer('Ground', this.map.getTileset('cave'), 0, 0)
		this.ground.setCollisionByProperty({ collides: true })

		const debugGraphics = this.add.graphics().setAlpha(0.75)
		this.ground.renderDebug(debugGraphics, {
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
			faceColor: new Phaser.Display.Color(40, 39, 37, 255)
		})


		this.player = new Player(this, width * 0.5, height - 30)
		this.add.existing(this.player)
		
		const body = this.player.body as Phaser.Physics.Arcade.Body
		body.setCollideWorldBounds(true)
		body.setBounce(0.1, 0.1)

		this.physics.add.collider(this.player, this.ground)

		this.scoreLabel = this.add.text(10, 10, `Score: ${this.score}`, {
			fontSize: '24px',
			color: '#080808',
			backgroundColor: '#F8E71C',
			shadow: { fill: true, blur: 0, offsetY: 0 },
			padding: { left: 15, right: 15, top: 10, bottom: 10 }
		})
		.setScrollFactor(0)

		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55)

		this.cameras.main.startFollow(this.player)
		this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)

	}



	update(t: number, dt: number)
	{
		
	}

	


}
