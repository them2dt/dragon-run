import Phaser from 'phaser'
import TextureKeys from '../../../consts/TextureKeys'
import AnimationKeys from '../../../consts/AnimationKeys'
import SceneKeys from '../../../consts/SceneKeys'
import CaveScene from '../../scenes/CaveScene'
import CameraFollowing from '../../../consts/CameraFollowing'
import PlayerState from '../../../consts/players/PlayerState'
import DragonState from '../../../consts/enemies/DragonState'
import MusicKeys from '../../../consts/audio/MusicKeys'
import PlayerSoundEffectKeys from '../../../consts/audio/PlayerSoundEffectKeys'


export default class Player extends Phaser.GameObjects.Container {

	private currentScene!: SceneKeys
	
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private fireKeyOne!: Phaser.Input.Keyboard.Key
	private firekeyTwo!: Phaser.Input.Keyboard.Key
	private wKey!: Phaser.Input.Keyboard.Key
	private aKey!: Phaser.Input.Keyboard.Key
	private sKey!: Phaser.Input.Keyboard.Key
	private dKey!: Phaser.Input.Keyboard.Key

	private defaultCharacter: Phaser.GameObjects.Sprite

	private fireballs?: Phaser.Physics.Arcade.Group
	private fireballSpeed: number = 450
	private fireballCooldown: number = 200
	private fireballTimer: number = 0

	public playerState: PlayerState = PlayerState.Alive
	private playerSpeed: number = 210
	private playerJump: number = -300
	private playerSize: number = 1.0
	

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y)

		if (this.scene.scene.isActive(SceneKeys.CaveScene)) {
			this.currentScene = SceneKeys.CaveScene
		}

		this.defaultCharacter = scene.add.sprite(0, 0, TextureKeys.DefaultCharacter).setOrigin(0.55, 1).setScale(this.playerSize * 1.5)

		this.add(this.defaultCharacter)

		scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(this.playerSize * this.defaultCharacter.width * 0.43, this.playerSize * this.defaultCharacter.height * 0.75)
		body.setOffset(this.defaultCharacter.width * -0.29, -this.defaultCharacter.height + 1)
		body.setCollideWorldBounds(true)
		body.setDragX(0)
		body.setDragY(0)
		body.setFrictionX(0)
		body.setFrictionY(0)

		this.cursors = scene.input.keyboard.createCursorKeys()
		this.fireKeyOne = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
		this.firekeyTwo = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD)
		this.wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
	}

	public setFireballs(fireballs: Phaser.Physics.Arcade.Group) {
		this.fireballs = fireballs
	}

	private throwFireball() {

		const playerBody = this.body as Phaser.Physics.Arcade.Body

		if (!this.fireballs) {
			return
		}

		const fireball = this.fireballs.get(this.x, this.y - (playerBody.height * 0.8), TextureKeys.Fireball) as Phaser.Physics.Arcade.Image
		if (!fireball) {
			return
		}

		const vec = new Phaser.Math.Vector2(0, 0)

		
		if (this.defaultCharacter.flipX) {
			fireball.x -= 16
			vec.x = -1
		}
		else {
			vec.x = 1
		}

		vec.y = 0.4

		const fireballBody = fireball.body as Phaser.Physics.Arcade.Body
		fireballBody.setSize(8, 8)

		fireball.setScale(2)
		fireball.setOrigin(0.5, 0.5)
		fireball.setBounceY(0.98)
		fireball.setBounceX(0)
		fireball.setMaxVelocity(300)

		fireball.x += vec.x * 16
		fireball.y += vec.y * 16
		fireball.setVelocity(vec.x * this.fireballSpeed, vec.y * this.fireballSpeed)

		this.scene.sound.play(PlayerSoundEffectKeys.PlayerFireballThrow1, { volume: 0.5 })

	}

	public kill() {

		if (this.scene.scene.isActive(SceneKeys.CaveScene)) {
			this.currentScene = SceneKeys.CaveScene
		}

		if (this.playerState !== PlayerState.Alive) {
			return
		}

		this.playerState = PlayerState.Killed

		this.defaultCharacter.play(AnimationKeys.DefaultCharacterDeadRight, true)

		this.scene.sound.play(PlayerSoundEffectKeys.PlayerDeath1, { volume: 0.5 })

		this.scene.time.addEvent({
			delay: 1000,                // ms
			callback: () => this.scene.sound.play(PlayerSoundEffectKeys.PlayerDeath2, { volume: 1 }),
			repeat: 1
		})

		if (this.currentScene === SceneKeys.CaveScene) {
			const caveScene = this.scene as CaveScene
			const cameraFollowing = caveScene.cameraFollowing

			if (caveScene.redDragon.dragonState === DragonState.Chasing) {
				caveScene.redDragon.dragonState = DragonState.Idle
			}
			
			if (cameraFollowing === CameraFollowing.Player) {
				this.scene.cameras.main.stopFollow()
			}
		}

		this.scene.cameras.main.fade(2000, 0, 0, 0)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.checkCollision.none = true
		body.setAccelerationY(0)
		body.setVelocityX(0)
		body.setVelocityY(-200)
		body.setGravityY(150)
		body.collideWorldBounds = false
	}

	public preUpdate(t: number, dt: number) {
		const body = this.body as Phaser.Physics.Arcade.Body

		switch (this.playerState) {
			case PlayerState.Alive: {
				if (this.cursors.left.isDown || this.aKey.isDown) {
					body.setVelocityX(-this.playerSpeed);
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterRunningRight, true);
					this.defaultCharacter.setFlipX(true)
				}
				else if (this.cursors.right.isDown || this.dKey.isDown) {
					body.setVelocityX(this.playerSpeed);
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterRunningRight, true);
					this.defaultCharacter.setFlipX(false)
				}
				else {
					body.setVelocityX(0);
				}

				if (this.cursors.up.isDown && body.blocked.down || this.wKey.isDown && body.blocked.down || this.cursors.space.isDown && body.blocked.down) {
					body.setVelocityY(this.playerJump);
					this.scene.sound.play(PlayerSoundEffectKeys.PlayerJump1, { volume: 0.8 })
				}

				if (!body.blocked.down && body.velocity.x < 0) {
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterJumpingRight, true)
					this.defaultCharacter.setFlipX(true)
				} else if (!body.blocked.down && body.velocity.x > 0) {
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterJumpingRight, true)
					this.defaultCharacter.setFlipX(false)
				} else if (!body.blocked.down && body.velocity.x === 0) {
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterJumpingRight, true)
				}

				if (Phaser.Input.Keyboard.JustDown(this.fireKeyOne) || Phaser.Input.Keyboard.JustDown(this.firekeyTwo)) {
					if (t < this.fireballTimer) {
						return
					}
					this.throwFireball()
					this.fireballTimer = t + this.fireballCooldown
				}

				if (body.blocked.down && body.velocity.x == 0) {
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterIdleRight, true)
				}

				if (
					this.cursors.left.isDown  && body.velocity.x < 0 && body.blocked.down || 
					this.aKey.isDown && body.velocity.x < 0 && body.blocked.down || 
					this.cursors.right.isDown && body.velocity.x > 0 && body.blocked.down ||
					this.dKey.isDown && body.velocity.x > 0 && body.blocked.down
				) {
					if (!this.scene.sound.get(PlayerSoundEffectKeys.PlayerRun1)) {
					this.scene.sound.play(PlayerSoundEffectKeys.PlayerRun1, {rate: 1.2, volume: 0.3 })
					}
				}
					

				break		
			}

			case PlayerState.Killed: {
				body.velocity.x *= 0.99
				if (body.velocity.x <= 5) {
					this.playerState = PlayerState.Dead
				}
				break
			}

			case PlayerState.Dead: {
				if (this.scene.scene.isActive(SceneKeys.GameOver)) {
					break
				}

				if (this.scene.scene.isActive(SceneKeys.CaveScene)) {
					this.scene.sound.removeByKey(MusicKeys.CaveScene1)
				}

				this.scene.scene.run(SceneKeys.GameOver)
				break
			}
		}
	}

}
