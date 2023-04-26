import Phaser from 'phaser'

import TextureKeys from '../../consts/TextureKeys'
import SceneKeys from '../../consts/SceneKeys'
import Player from '../components/Player'
import { AnimatedTile, TilesetTileData, TileAnimationData } from '../components/AnimatedTile'

export default class GameScene extends Phaser.Scene
{

	private player!: Player

	private tilemap!: Phaser.Tilemaps.Tilemap
	private ground!: Phaser.Tilemaps.TilemapLayer
	private lava!: Phaser.Tilemaps.TilemapLayer
	private animatedTiles!: AnimatedTile[]
	private tileset!: Phaser.Tilemaps.Tileset
	private tileData!: TilesetTileData

	private bg1!: Phaser.GameObjects.Image
	private bg2!: Phaser.GameObjects.Image
	private bg3!: Phaser.GameObjects.Image


	constructor()
	{
		super(SceneKeys.GameScene)
		this.animatedTiles = []
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
	

		this.bg1 = this.add.image(0, 50, TextureKeys.Background1)
		this.bg1.setSize(width, height)
		this.bg1.setOrigin(0, 0)
		this.bg1.setScrollFactor(0.2, 0.2)
		this.bg1.scale = 7
		
		this.tilemap = this.make.tilemap({ key: TextureKeys.CaveMap })
		this.tileset = this.tilemap.addTilesetImage('cave-tileset', TextureKeys.CaveTiles, 16, 16, 1, 2)
		
		this.ground = this.tilemap.createLayer('Ground', this.tilemap.getTileset('cave-tileset'), 0, -1500)
		this.ground.setCollisionByProperty({ collides: true })
		this.ground.setSize(width, height)
		this.ground.scale = 2.4
		
		this.lava = this.tilemap.createLayer('Lava', this.tilemap.getTileset('cave-tileset'), 0, -1500)
		this.lava.setSize(width, height)
		this.lava.scale = 2.4


		const tileData = this.tileset.tileData as TilesetTileData;
		for (let tileid in tileData) {
			this.tilemap.layers.forEach(layer => {
			if (layer.tilemapLayer.type === "StaticTilemapLayer") return;
			layer.data.forEach(tileRow => {
				tileRow.forEach(tile => {
				if (tile.index - this.tileset.firstgid === parseInt(tileid, 10)) {
					this.animatedTiles.push(
					new AnimatedTile(
						tile,
						tileData[tileid].animation!,
						this.tileset.firstgid
					)
					);
				}
				});
			});
			});
		}


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
		
		this.cameras.main.startFollow(this.player, true, 1, 1, 0, 200)
		this.cameras.main.zoom = 0.8 + (width / 2000)


		
		this.scale.on('resize', this.resize, this);

	}



	public update(time: number, delta: number): void {
		this.animatedTiles.forEach(tile => tile.update(delta/2));
	  }

	


}
