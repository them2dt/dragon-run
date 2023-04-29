import Phaser from 'phaser'
import TextureKeys from '../../consts/TextureKeys'
import AnimationKeys from '../../consts/AnimationKeys'
import SceneKeys from '../../consts/SceneKeys'

enum PlayerState {
	Alive,
	Killed,
	Dead
}

export default class Player extends Phaser.GameObjects.Container {
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private defaultCharacter: Phaser.GameObjects.Sprite

	private playerState: PlayerState = PlayerState.Alive
	private playerSpeed: number = 210
	private playerJump: number = -300
	private playerSize: number = 1.0
	

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y)

		this.defaultCharacter = scene.add.sprite(0, 0, TextureKeys.DefaultCharacter).setOrigin(0.55, 1).setScale(this.playerSize * 1.5)

		this.add(this.defaultCharacter)

		scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(this.playerSize * this.defaultCharacter.width * 0.43, this.playerSize * this.defaultCharacter.height * 0.83)
		body.setOffset(this.defaultCharacter.width * -0.29, -this.defaultCharacter.height - 7)
		body.setCollideWorldBounds(true)
		body.setDragX(0)
		body.setDragY(0)
		body.setFrictionX(0)
		body.setFrictionY(0)

		this.cursors = scene.input.keyboard.createCursorKeys()
	}

	kill() {
		if (this.playerState !== PlayerState.Alive) {
			return
		}

		this.playerState = PlayerState.Killed

		this.defaultCharacter.play(AnimationKeys.DefaultCharacterDeadRight, true)

		this.scene.cameras.main.stopFollow()
		this.scene.cameras.main.fade(2000, 0, 0, 0)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.checkCollision.none = true
		body.setAccelerationY(0)
		body.setVelocityX(0)
		body.setVelocityY(-200)
		body.setGravityY(150)
		body.collideWorldBounds = false
	}

	preUpdate() {
		const body = this.body as Phaser.Physics.Arcade.Body

		switch (this.playerState) {
			case PlayerState.Alive: {
				if (this.cursors.left.isDown) {
					body.setVelocityX(-this.playerSpeed);
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterRunningRight, true);
					this.defaultCharacter.setFlipX(true)
				}
				else if (this.cursors.right.isDown) {
					body.setVelocityX(this.playerSpeed);
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterRunningRight, true);
					this.defaultCharacter.setFlipX(false)
				}
				else {
					body.setVelocityX(0);
				}

				if (this.cursors.up.isDown && body.blocked.down) {
					body.setVelocityY(this.playerJump);
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

				if (body.blocked.down && body.velocity.x == 0) {
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterIdleRight, true)
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

				this.scene.scene.run(SceneKeys.GameOver)
				break
			}
		}
	}

}
