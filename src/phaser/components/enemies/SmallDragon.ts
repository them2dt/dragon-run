import Phaser from 'phaser'
import AnimationKeys from '../../../consts/AnimationKeys'
import TextureKeys from '../../../consts/TextureKeys'

enum DragonState {
	Alive,
	Killed
}

enum DragonDirection {
	Left,
	Right
}

export default class SmallDragon extends Phaser.GameObjects.Container {

	private smallDragon!: Phaser.GameObjects.Sprite
	private dragonState: DragonState = DragonState.Alive
	private dragonDirection: DragonDirection = DragonDirection.Right
	private dragonSpeed: number = 14	

	public groundChecker!: Phaser.GameObjects.Rectangle
	public groundCheckerBody!: Phaser.Physics.Arcade.Body

	private groundCheckerTimer: number = 0
	private deadTimer: number = 0

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y)

		this.smallDragon = scene.add.sprite(0, 0, TextureKeys.SmallDragonOrange).setScale(2)

		this.add(this.smallDragon)

		this.smallDragon.play(AnimationKeys.SmallDragonOrangeRunningRight, true)

		scene.physics.add.existing(this)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(this.smallDragon.width * 0.63, this.smallDragon.height * 0.52)
		body.setOffset(this.width * 0.5 - 28, this.height * 0.5 + 14)
		
		this.groundChecker = scene.add.rectangle(40, 67, 10, 10)

		this.add(this.groundChecker)

		scene.physics.add.existing(this.groundChecker)

		this.groundCheckerBody = this.groundChecker.body as Phaser.Physics.Arcade.Body
		this.groundCheckerBody.setAllowGravity(true)

	}

	kill() {
		if (this.dragonState !== DragonState.Alive) {
			return
		}

		this.dragonState = DragonState.Killed

		this.smallDragon.play(AnimationKeys.SmallDragonOrangeIdleRight, true)

		const body = this.body as Phaser.Physics.Arcade.Body
		body.checkCollision.none = true
		body.setAccelerationY(0)
		body.setVelocityX(0)
		body.setVelocityY(-100)
		body.setGravityY(150)
		body.collideWorldBounds = false

	}

	swapDirection() {
		if (this.dragonDirection == DragonDirection.Left) {
			this.dragonDirection = DragonDirection.Right
		}
		else {
			this.dragonDirection = DragonDirection.Left
		}
		this.groundCheckerBody.velocity.y = 0
	}
	

	preUpdate(t: number, dt: number) {

		const body = this.body as Phaser.Physics.Arcade.Body

		switch (this.dragonState) {
			case DragonState.Alive: {
				if (this.dragonDirection == DragonDirection.Left) {
					body.setVelocityX(-this.dragonSpeed);
					this.smallDragon.play(AnimationKeys.SmallDragonOrangeRunningRight, true);
					this.smallDragon.setFlipX(true)
					this.groundCheckerBody.setOffset(-76, 0)
					console.log("ground checker: " + this.groundCheckerBody.velocity.y)
					console.log(body.velocity.y)
					if (t > this.groundCheckerTimer && body.velocity.y === 0 && this.groundCheckerBody.velocity.y !== 0) {
						this.swapDirection()
						this.groundCheckerTimer = t + 1000
					}
				}
				else if (this.dragonDirection == DragonDirection.Right) {
					body.setVelocityX(this.dragonSpeed);
					this.smallDragon.play(AnimationKeys.SmallDragonOrangeRunningRight, true);
					this.smallDragon.setFlipX(false)
					this.groundCheckerBody.setOffset(0, 0)
					if (t > this.groundCheckerTimer && body.velocity.y === 0 && this.groundCheckerBody.velocity.y !== 0) {
						this.swapDirection()
						this.groundCheckerTimer = t + 1000
					}
				}
				else {
					body.setVelocityX(0);
				}

				if (!body.blocked.down && body.velocity.x < 0) {
					this.smallDragon.play(AnimationKeys.SmallDragonOrangeIdleRight, true)
					this.smallDragon.setFlipX(true)

				}

				if (body.blocked.down && body.velocity.x == 0) {
					this.smallDragon.play(AnimationKeys.SmallDragonOrangeIdleRight, true)
				}

				break		
			}

			case DragonState.Killed: {
				// Remove from the game after 2 seconds
				if (this.deadTimer === 0) {
					this.deadTimer = t + 2000
				}
				else if (t > this.deadTimer) {
					this.destroy()
				}

				break
			}

		}

	}

	update(...args: any[]) {
		
	
	}

}
