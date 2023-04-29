import Phaser from 'phaser'
import TextureKeys from '../../../consts/TextureKeys'
import AnimationKeys from '../../../consts/AnimationKeys'
import SceneKeys from '../../../consts/SceneKeys'

enum DragonState {
	Alive,
	Killed,
	Dead
}

enum DragonDirection {
	Left,
	Right
}

export default class SmallDragon extends Phaser.Physics.Arcade.Sprite {

	private dragonState: DragonState = DragonState.Alive
	private dragonDirection: DragonDirection = DragonDirection.Right
	private dragonSpeed: number = 14	

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
		super(scene, x, y, texture, frame)

		this.scale = 2

		this.play(AnimationKeys.SmallDragonOrangeRunningRight, true)

		scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(28, 24)
		body.setOffset(this.width * 0.5 - 13, this.height * 0.5 + 7.6)

	}

	kill() {
		if (this.dragonState !== DragonState.Alive) {
			return
		}

		this.dragonState = DragonState.Killed

		this.play(AnimationKeys.SmallDragonOrangeIdleRight, true)
		this.setFlipY(true)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setAccelerationY(0)
		body.setVelocityY(0)
		body.setVelocityX(0)
		body.collideWorldBounds = false

	}
	

	preUpdate(t: number, dt: number) {

		super.preUpdate(t, dt)

		const body = this.body as Phaser.Physics.Arcade.Body

		switch (this.dragonState) {
			case DragonState.Alive: {
				if (this.dragonDirection == DragonDirection.Left) {
					body.setVelocityX(-this.dragonSpeed);
					this.play(AnimationKeys.SmallDragonOrangeRunningRight, true);
					this.setFlipX(true)
				}
				else if (this.dragonDirection == DragonDirection.Right) {
					body.setVelocityX(this.dragonSpeed);
					this.play(AnimationKeys.SmallDragonOrangeRunningRight, true);
					this.setFlipX(false)
				}
				else {
					body.setVelocityX(0);
				}

				if (!body.blocked.down && body.velocity.x < 0) {
					this.play(AnimationKeys.SmallDragonOrangeIdleRight, true)
					this.setFlipX(true)

				}

				if (body.blocked.down && body.velocity.x == 0) {
					this.play(AnimationKeys.SmallDragonOrangeIdleRight, true)
				}

				break		
			}

			case DragonState.Killed: {
				body.velocity.x *= 0.99
				if (body.velocity.x <= 5) {
					this.dragonState = DragonState.Dead
				}
				break
			}

			case DragonState.Dead: {
				if (this.scene.scene.isActive(SceneKeys.GameOver)) {
					break
				}

				body.setVelocity(0, 0)
				this.scene.scene.run(SceneKeys.GameOver)
				break
			}
		}

	}

	update(...args: any[]) {
		
	
	}

}
