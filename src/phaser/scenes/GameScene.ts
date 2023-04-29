import Phaser from 'phaser'

import TextureKeys from '../../consts/TextureKeys'
import SceneKeys from '../../consts/SceneKeys'
import Player from '../components/Player'
import SmallDragon from '../components/enemies/SmallDragon'
import { AnimatedTile, TilesetTileData} from '../components/AnimatedTile'

export default class GameScene extends Phaser.Scene
{

	private player!: Player
	private playerBody!: Phaser.Physics.Arcade.Body
	private playerGroundCollider!: Phaser.Physics.Arcade.Collider
	private playerLavaCollider!: Phaser.Physics.Arcade.Collider

	private SmallDragonsOrange!: Phaser.Physics.Arcade.Group

	private tilemap!: Phaser.Tilemaps.Tilemap
	private ground!: Phaser.Tilemaps.TilemapLayer
	private lava!: Phaser.Tilemaps.TilemapLayer
	private animatedTiles!: AnimatedTile[]
	private tileset!: Phaser.Tilemaps.Tileset

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

		this.anims.createFromAseprite(TextureKeys.SmallDragonOrange)

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
		this.lava.setCollisionByProperty({ collides: true })
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

		this.spawnEnemies()

		this.spawnPlayer()
		
		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)		
		
		this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
		this.cameras.main.startFollow(this.player, true, 1, 1, 0, 200)
		this.cameras.main.zoom = 0.8 + (width / 2000)
		
		this.playerGroundCollider = this.physics.add.collider(this.player, this.ground)
		this.playerLavaCollider = this.physics.add.collider(this.player, this.lava, () => {
			this.killPlayer()
		})

		this.physics.add.collider(this.SmallDragonsOrange, this.ground)

		
		this.scale.on('resize', this.resize, this);

	}

	public update(time: number, delta: number): void {
		this.animatedTiles.forEach(tile => tile.update(delta/2));
	}

	spawnPlayer = () => {
		this.player = new Player(this, 0, 0)
		this.add.existing(this.player)
	}


	spawnEnemies = () => {
		this.SmallDragonsOrange = this.physics.add.group({
			classType: SmallDragon,
			createCallback: (gO) => {
				const SmallDragonGO = gO as SmallDragon
				SmallDragonGO.body.onCollide = true
			}
		})

		const SmallDragonsOrangeLayer = this.tilemap.getObjectLayer('Enemies')
		SmallDragonsOrangeLayer.objects.forEach(enemyObject => {
			this.SmallDragonsOrange.get(enemyObject.x! * 2.4, enemyObject.y! * 0.4, TextureKeys.SmallDragonOrange)
		})
	}


	killPlayer = () => {
		this.cameras.main.stopFollow()
		this.physics.world.removeCollider(this.playerLavaCollider)
		this.physics.world.removeCollider(this.playerGroundCollider)
		this.player.kill()
		this.cameras.main.fade(2000, 0, 0, 0)

		/*
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
			this.scene.restart()
		})
		*/
	}

	


}
