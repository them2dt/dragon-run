import Phaser from 'phaser'
import TextureKeys from '../../consts/TextureKeys'
import AnimationKeys from '../../consts/AnimationKeys'
import SceneKeys from '../../consts/SceneKeys'

enum PlayerState
{
	Running,
	Killed,
	Dead
}

export default class Player extends Phaser.GameObjects.Container
{
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private defaultCharacter: Phaser.GameObjects.Sprite

	private playerState: PlayerState = PlayerState.Running
	private playerSpeed: number = 1.0
	private playerJump: number = 1.0
	private playerSize: number = 1.0
	

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y)

		scene.anims.createFromAseprite(TextureKeys.DefaultCharacter)

		this.defaultCharacter = scene.add.sprite(0, 0, TextureKeys.DefaultCharacter).setOrigin(0.55, 1).setScale(this.playerSize * 1.5)

		this.add(this.defaultCharacter)

		scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(this.playerSize * this.defaultCharacter.width * 0.43, this.playerSize * this.defaultCharacter.height * 0.83)
		body.setOffset(this.defaultCharacter.width * -0.29, -this.defaultCharacter.height - 7)


		this.cursors = scene.input.keyboard.createCursorKeys()
	}

	kill() {
		if (this.playerState !== PlayerState.Running) {
			return
		}

		this.playerState = PlayerState.Killed

		this.defaultCharacter.play(AnimationKeys.DefaultCharacterIdleLeft, true)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setAccelerationY(0)
		body.setVelocity(1000, 0)
	}

	preUpdate()
	{
		const body = this.body as Phaser.Physics.Arcade.Body

		switch (this.playerState)
		{
			case PlayerState.Running:
			{
				if (this.cursors.left.isDown) {
					body.setVelocityX(this.playerSpeed * -210);
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterRunningRight, true);
					this.defaultCharacter.setFlipX(true)
				}
				else if (this.cursors.right.isDown) {
					body.setVelocityX(this.playerSpeed * 210);
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterRunningRight, true);
					this.defaultCharacter.setFlipX(false)
				}
				else {
					body.setVelocityX(0);
				}

				if (this.cursors.up.isDown && body.blocked.down) {
					body.setVelocityY(this.playerJump * -190);
				}

				if (!body.blocked.down && body.velocity.x < 0) {
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterJumpingRight, true)
					this.defaultCharacter.setFlipX(true)

				} else if (!body.blocked.down && body.velocity.x >= 0) {
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterJumpingRight, true)
					this.defaultCharacter.setFlipX(false)
				} 

				if (body.blocked.down && body.velocity.x == 0) {
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterIdleRight, true)
				}

				break		
			}

			case PlayerState.Killed:
			{
				body.velocity.x *= 0.99
				if (body.velocity.x <= 5)
				{
					this.playerState = PlayerState.Dead
				}
				break
			}

			case PlayerState.Dead:
			{
				if (this.scene.scene.isActive(SceneKeys.GameOver))
				{
					break
				}

				body.setVelocity(0, 0)
				this.scene.scene.run(SceneKeys.GameOver)
				break
			}
		}
	}

}
