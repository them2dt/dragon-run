import Phaser from 'phaser'

import TextureKeys from '../../consts/TextureKeys'
import SceneKeys from '../../consts/SceneKeys'
import Player from '../components/players/Player'
import SmallDragon from '../components/enemies/SmallDragon'
import RedDragon from '../components/enemies/RedDragon'
import { AnimatedTile, TilesetTileData} from '../components/AnimatedTile'
import Device from '../../consts/Device'
import CameraFollowing from '../../consts/CameraFollowing'
import TiledLayerKeys from '../../consts/TiledLayerKeys'
import PlayerState from '../../consts/players/PlayerState'
import DragonState from '../../consts/enemies/DragonState'
import MusicKeys from '../../consts/audio/MusicKeys'
import SoundFade from 'phaser3-rex-plugins/plugins/soundfade.js';
import EnvironmentSoundEffectKeys from '../../consts/audio/EnvironmentSoundEffectKeys'
import EnemySoundEffectKeys from '../../consts/audio/EnemySoundEffectKeys'
import PlayerSoundEffectKeys from '../../consts/audio/PlayerSoundEffectKeys'

export default class CaveScene extends Phaser.Scene
{

	private device:Device = Device.Desktop

	public volume: number = 1
	public music!: Phaser.Sound.BaseSound

	private player!: Player
	private smallDragons!: Phaser.GameObjects.Group

	public redDragon!: RedDragon
	private redDragonSpeed: number = 200

	private playerFireballs!: Phaser.Physics.Arcade.Group
	private playerFireballsMaxAmount: number = 20

	private lavaballs!: Phaser.Physics.Arcade.Group
	private lavaballSpeed: number = 450

	private tilemap!: Phaser.Tilemaps.Tilemap
	private ground!: Phaser.Tilemaps.TilemapLayer
	private lava!: Phaser.Tilemaps.TilemapLayer
	private animatedTiles!: AnimatedTile[]
	private tileset!: Phaser.Tilemaps.Tileset
	private playerLayer!: Phaser.Tilemaps.ObjectLayer
	private enemiesLayer!: Phaser.Tilemaps.ObjectLayer
	private lavaballsLayer!: Phaser.Tilemaps.ObjectLayer

	private mapOffsetX: number = -100
	private mapOffsetY: number = -1500

	private objectsLayerOffsetX: number = -80
	private objectsLayerOffsetY: number = 0

	private bg1!: Phaser.GameObjects.Image
	private bg2!: Phaser.GameObjects.Image
	private bg3!: Phaser.GameObjects.Image

	private mainScale: number = 2.4
	private defaultZoom: number = 1
	private zoom: number = 1

	public cameraFollowing: CameraFollowing = CameraFollowing.Player
	private dragonCameraOffset!: number


	constructor() {
		super(SceneKeys.CaveScene)
		this.animatedTiles = []
	}

	public resize () {

		this.handleZoom()

		this.bg1.scale = 4 * (this.defaultZoom + this.zoom)

    }

	public create() {

		this.anims.createFromAseprite(TextureKeys.RedDragon)
		this.anims.createFromAseprite(TextureKeys.SmallDragonOrange)
		this.anims.createFromAseprite(TextureKeys.DefaultCharacter)

		this.music = this.sound.add(MusicKeys.CaveScene1, { loop: true })

		SoundFade.fadeIn(this.music, 10000, 0.5)

		this.sound.play(EnvironmentSoundEffectKeys.LavaBackground1, { loop: true, volume: 0.2 })

		this.sound.volume = this.volume


		const width = this.scale.width
		const height = this.scale.height

		this.bg1 = this.add.image(0, -10, TextureKeys.Background1)
		this.bg1.setSize(width, height)
		this.bg1.setOrigin(0, 0)
		this.bg1.setScrollFactor(0.2, 0.1)
		this.bg1.scale = 4 * (this.defaultZoom + this.zoom)
		
		this.tilemap = this.make.tilemap({ key: TextureKeys.CaveMap })
		this.tileset = this.tilemap.addTilesetImage('cave-tileset', TextureKeys.CaveTiles, 16, 16, 1, 2)

		this.playerLayer = this.tilemap.getObjectLayer(TiledLayerKeys.Player)
		this.enemiesLayer = this.tilemap.getObjectLayer(TiledLayerKeys.Enemies)
		this.lavaballsLayer = this.tilemap.getObjectLayer(TiledLayerKeys.Lavaballs)
		
		this.ground = this.tilemap.createLayer('Ground', this.tilemap.getTileset('cave-tileset'), this.mapOffsetX, this.mapOffsetY)
		this.ground.setCullPadding(10)
		this.ground.setCollisionByProperty({ collides: true })
		this.ground.setSize(width, height)
		this.ground.scale = 2.4
		
		this.lava = this.tilemap.createLayer('Lava', this.tilemap.getTileset('cave-tileset'), this.mapOffsetX, this.mapOffsetY)
		this.lava.setCollisionByProperty({ collides: true })
		this.lava.setCullPadding(10)
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
					)
				}
				})
			})
			})
		}

		this.spawnRedDragon()
		this.redDragon.depth = 1000
		this.redDragon.dragonSpeed = this.redDragonSpeed
		this.redDragon.start()

		this.spawnEnemies()

		this.spawnPlayer()

		this.createPlayerFireballs()

		this.createLavaballs()
		this.throwLavaballs()

		this.time.addEvent({
			delay: 3000,                // ms
			callback: this.throwLavaballs,
			repeat: -1
		})
		
		this.cameras.main.startFollow(this.player, false, 0.9, 0.1, 0, 100)
		
		this.physics.world.setBounds(-100, -100, this.tilemap.widthInPixels * this.mainScale, this.tilemap.heightInPixels * this.mainScale)
		
		this.cameras.main.removeBounds()
		this.handleZoom()

		this.physics.add.collider(this.player, this.ground)
		this.physics.add.collider(this.player, this.lava, () => {
			this.sound.play(EnvironmentSoundEffectKeys.LavaBurn1, { volume: 0.4 })
			this.player.kill()
		})

		this.physics.add.collider(this.smallDragons, this.player, (object1: Phaser.GameObjects.GameObject, object2: Phaser.GameObjects.GameObject) => {
			const player = object1 as Player
			const playerBody = object1.body as Phaser.Physics.Arcade.Body
			const smallDragon = object2 as SmallDragon
	
			if (playerBody.touching.down) {
				playerBody.setVelocityY(-220)
				smallDragon.kill()
			} else {
				this.sound.play(EnemySoundEffectKeys.EnemyBite1, { volume: 0.4 })
				player.kill()
			}
	
		})
		this.physics.add.collider(this.smallDragons, this.ground)

		this.scale.on('resize', this.resize, this);

	}

	public update(time: number, delta: number): void {
		this.animatedTiles.forEach(tile => tile.update(delta/2))

		const playerBody = this.player.body as Phaser.Physics.Arcade.Body

		if (this.player.playerState === PlayerState.Alive) {

			if (this.redDragon.dragonState !== DragonState.Chasing) {
				return
			}

			this.redDragon.followY(playerBody.position.y + playerBody.halfHeight - 37, 100)
		}

		if (this.redDragon.x > this.player.x - 140 && this.player.playerState === PlayerState.Alive) {
			this.redDragon.attackPlayer()

			this.time.addEvent({
				delay: 200,                // ms
				callback: () => this.player.kill(),
				repeat: 0
			})
			
		}

		this.handleCameraFollow()

	}

	private createPlayerFireballs = () => {
		this.playerFireballs = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Image,
			maxSize: this.playerFireballsMaxAmount,
			createCallback: (go) => {
				const fireballBody = go.body as Phaser.Physics.Arcade.Body
				fireballBody.onCollide = true
				go.on('destroy', () => {
					this.sound.play(PlayerSoundEffectKeys.PlayerFireballBurn1, { volume: 0.6 })
				})
				this.physics.add.collider(go, this.ground, (object1, object2) => {
					const fireball = object1 as Phaser.Physics.Arcade.Image
					const fireballBody = fireball.body as Phaser.Physics.Arcade.Body
					if (!fireballBody) {
						return
					}
					if (fireballBody.velocity.x === 0) {
					fireball.destroy()
					}
				})
				this.physics.add.collider(go, this.lava, (object1, object2) => {
					const fireball = object1 as Phaser.Physics.Arcade.Image
					fireball.destroy()
				})
				this.physics.add.collider(go, this.smallDragons, (object1, object2) => {
					const fireball = object1 as Phaser.Physics.Arcade.Image
					const smallDragon = object2 as SmallDragon
					fireball.destroy()
					smallDragon.kill()
				})
			}
		})

		this.player.setFireballs(this.playerFireballs)
	}

	private createLavaballs = () => {
		
		this.lavaballs = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Image,
			createCallback: (go) => {
				const lavaballBody = go.body as Phaser.Physics.Arcade.Body
				lavaballBody.onCollide = true
				lavaballBody.pushable = false
				this.physics.add.collider(go, this.player, () => {
					this.sound.play(EnvironmentSoundEffectKeys.LavaBurn1, { volume: 0.3 })
					this.player.kill()
				})
				this.physics.add.collider(go, this.lava, (object1, object2) => {
					const lavaball = object1 as Phaser.Physics.Arcade.Image
					this.sound.play(EnvironmentSoundEffectKeys.LavaPlop1, { volume: 0.1 })
					lavaball.destroy()
				})
			}
		})
	}

	private throwLavaballs = () => {

		if (!this.lavaballs) {
			return
		}
		if (!this.lavaballsLayer) {
			return
		}

		this.lavaballsLayer.objects.forEach(lavaballObject => {
			const lavaball = this.lavaballs.get(lavaballObject.x! * this.mainScale + this.objectsLayerOffsetX, (lavaballObject.y! * 2.4) - 1520, TextureKeys.Fireball) as Phaser.Physics.Arcade.Image
			
			const vec = new Phaser.Math.Vector2(0, 0)

			vec.y = 2

			const lavaballBody = lavaball.body as Phaser.Physics.Arcade.Body
			this.add.existing(lavaball)
			this.lavaballs.add(lavaball)
			lavaballBody.setSize(8, 8)
			lavaballBody.setAllowGravity(true)
			lavaballBody.setVelocityY(-this.lavaballSpeed)
			lavaball.setScale(2)
			
		})

		this.sound.play(EnvironmentSoundEffectKeys.LavaballThrow1, { volume: 0.3 })
		
	}

	public spawnRedDragon = () => {
		this.redDragon = new RedDragon(this, 100, 100)
		this.add.existing(this.redDragon)
	}

	public spawnPlayer = () => {
		this.playerLayer.objects.forEach(playerObject => {
			this.player = new Player(this, playerObject.x! * this.mainScale + this.objectsLayerOffsetX, playerObject.y! * 0.5,)
			this.add.existing(this.player)
		})
	}

	public spawnEnemies = () => {

		this.smallDragons = this.physics.add.group({
			classType: SmallDragon,
			createCallback: (go) => {
				const enemyGo = go as SmallDragon
				const enemyBody = enemyGo.body as Phaser.Physics.Arcade.Body
				enemyBody.onCollide = true
				enemyGo.groundCheckerBody.onCollide = true
				this.physics.add.collider(enemyGo.groundChecker, this.ground)

			}
		})

		this.enemiesLayer.objects.forEach(enemyObject => {
			const enemy = new SmallDragon(this, enemyObject.x! * this.mainScale + this.objectsLayerOffsetX, enemyObject.y! * 0.45 - 80)
			this.add.existing(enemy)
			this.smallDragons.add(enemy)
		})
		
	}

	public handleCameraFollow = () => {

		if (!this.redDragon || !this.player || this.cameraFollowing === CameraFollowing.None) {
			return
		}

		const redDragonBody = this.redDragon.body as Phaser.Physics.Arcade.Body

		const distanceBetweenPlayerAndRedDragonX = Phaser.Math.Distance.Between(this.player.body.position.x, 0, redDragonBody.position.x, 0)

		if (distanceBetweenPlayerAndRedDragonX < -this.dragonCameraOffset + redDragonBody.width * 0.5 + 10 && this.cameraFollowing === CameraFollowing.Player) {
			this.cameraFollowing = CameraFollowing.RedDragon
			this.cameras.main.startFollow(this.redDragon, false, 0.9, 0.1, this.dragonCameraOffset, redDragonBody.height * 0.5)
		} else if (distanceBetweenPlayerAndRedDragonX >= -this.dragonCameraOffset + redDragonBody.width * 0.5 + 10 && this.cameraFollowing === CameraFollowing.RedDragon) {
			this.cameraFollowing = CameraFollowing.Player
			this.cameras.main.startFollow(this.player, false, 0.9, 0.1, 0, 100)
		}
	}

	public handleZoom = () => {
		const width = this.scale.width
		const height = this.scale.height

		if ( width >= 1000) {
			this.device = Device.Desktop
			switch (true) {
				case width < 1200:
					this.zoom = 0.6
					break;
				case width < 1400:
					this.zoom = 0.6
					break;
				case width < 1600:
					this.zoom = 0.7
					break;
				case width >= 1600:
					this.zoom = 0.7
					break;
			}
		} else if ( width < height ) {
			this.device = Device.MobilePortrait
			switch (true) {
				case width < 400:
					this.zoom = 0
					break;
				case width < 500:
					this.zoom = 0.2
					break;
				case width < 600:
					this.zoom = 0.5
					break;
				case width < 1000:
					this.zoom = 0.7
					break;
			}
		} else {
			this.device = Device.MobileLandscape
			switch (true) {
				case height < 300:
					this.zoom = -0.2
					break;
				case height < 400:
					this.zoom = -0.1
					break;
				case height < 500:
					this.zoom = 0
					break;
				case height < 600:
					this.zoom = 0.1
					break;
				case height < 800:
					this.zoom = 0.2
					break;
				case height < 1000:
					this.zoom = 0.3
					break;
				case height < 1200:
					this.zoom = 0.3
					break;
				case height < 1400:
					this.zoom = 0.4
					break;
				case height < 1600:
					this.zoom = 0.5
					break;
				case height >= 1600:
					this.zoom = 0.6
					break;
			}
		}

		switch (this.device) {
			case Device.MobilePortrait:
				this.dragonCameraOffset = - (width * 0.3) + (-200 + (210 * (this.defaultZoom + this.zoom) ))
				break;
				case Device.MobileLandscape:
				this.dragonCameraOffset = - (width * 0.5) + (-240 + (380 * (this.defaultZoom + this.zoom) ))
				break;
			case Device.Desktop:
				this.dragonCameraOffset = - (width * 0.3) + (-200 + (210 * (this.defaultZoom + this.zoom) ))
		}

		this.cameras.main.setZoom(this.defaultZoom + this.zoom)
	}

}
