import Phaser from 'phaser'
import TextureKeys from '../../consts/TextureKeys'
import AnimationKeys from '../../consts/AnimationKeys'
import SceneKeys from '../../consts/SceneKeys'

enum MouseState
{
	Running,
	Killed,
	Dead
}

export default class RocketMouse extends Phaser.GameObjects.Container
{
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private defaultCharacter: Phaser.GameObjects.Sprite

	private mouseState = MouseState.Running

	constructor(scene: Phaser.Scene, x: number, y: number)
	{
		super(scene, x, y)

		scene.anims.createFromAseprite(TextureKeys.DefaultCharacter)

		this.defaultCharacter = scene.add.sprite(0, 0, TextureKeys.DefaultCharacter).setOrigin(0.55, 1).setScale(1.5)

		this.add(this.defaultCharacter)

		scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(this.defaultCharacter.width * 0.4, this.defaultCharacter.height * 0.86)
		body.setOffset(this.defaultCharacter.width * -0.25, -this.defaultCharacter.height - 6)

		this.cursors = scene.input.keyboard.createCursorKeys()
	}

	kill()
	{
		if (this.mouseState !== MouseState.Running)
		{
			return
		}

		this.mouseState = MouseState.Killed

		this.defaultCharacter.play(AnimationKeys.DefaultCharacterIdleLeft, true)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setAccelerationY(0)
		body.setVelocity(1000, 0)
	}

	preUpdate()
	{
		const body = this.body as Phaser.Physics.Arcade.Body

		switch (this.mouseState)
		{
			case MouseState.Running:
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

			case MouseState.Killed:
			{
				body.velocity.x *= 0.99
				if (body.velocity.x <= 5)
				{
					this.mouseState = MouseState.Dead
				}
				break
			}

			case MouseState.Dead:
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
