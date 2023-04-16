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

	private playerState = PlayerState.Running

	constructor(scene: Phaser.Scene, x: number, y: number)
	{
		super(scene, x, y)

		scene.anims.createFromAseprite(TextureKeys.DefaultCharacter)

		this.defaultCharacter = scene.add.sprite(0, 0, TextureKeys.DefaultCharacter).setOrigin(0.55, 1).setScale(1.5)

		this.add(this.defaultCharacter)

		scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(this.defaultCharacter.width * 0.4, this.defaultCharacter.height * 0.8)
		body.setOffset(this.defaultCharacter.width * -0.25, -this.defaultCharacter.height - 4)


		this.cursors = scene.input.keyboard.createCursorKeys()
	}

	kill()
	{
		if (this.playerState !== PlayerState.Running)
		{
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
				if (this.cursors.space?.isDown)
				{
					body.setAccelerationY(-600)

					this.defaultCharacter.play(AnimationKeys.DefaultCharacterJumpingRight, true)
				}
				else if (this.cursors.left?.isDown)
				{	
					
					body.setVelocityX(-600)

					this.defaultCharacter.play(AnimationKeys.DefaultCharacterRunningLeft, true)
					
				}
				else if (this.cursors.right?.isDown)
				{	
					
					body.setVelocityX(600)

					this.defaultCharacter.play(AnimationKeys.DefaultCharacterRunningRight, true)
					
				}
				else
				{
					body.setAccelerationY(0)
				}

				if (body.blocked.down)
				{
				}
				else if (body.velocity.y > 0)
				{
					this.defaultCharacter.play(AnimationKeys.DefaultCharacterJumpingRight, true)
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
