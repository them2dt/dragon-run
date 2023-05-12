import Phaser from 'phaser'
import TextureKeys from '../../../consts/TextureKeys'
import AnimationKeys from '../../../consts/AnimationKeys'
import SceneKeys from '../../../consts/SceneKeys'
import GameScene from '../../scenes/GameScene'

enum DragonState {
	Alive,
	Killed,
	Dead
}

export default class RedDragon extends Phaser.GameObjects.Container {

	private redDragon: Phaser.GameObjects.Sprite
	public redDragonBody!: Phaser.Physics.Arcade.Body

	private dragonState: DragonState = DragonState.Alive
	private dragonSpeed: number = 210
	private dragonSize: number = 1.0
	

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y)

		this.redDragon = scene.add.sprite(0, 0, TextureKeys.RedDragon).setOrigin(0.55, 1).setScale(this.dragonSize * 1.5)

		this.add(this.redDragon)

		scene.physics.add.existing(this)

		this.redDragonBody = this.body as Phaser.Physics.Arcade.Body

		const body = this.body as Phaser.Physics.Arcade.Body
		body.setSize(this.dragonSize * this.redDragon.width, this.dragonSize * this.redDragon.height)
		body.setOffset(-this.redDragon.width + 26, -this.redDragon.height - 40)
		body.setCollideWorldBounds(false)
        body.setAllowGravity(false)
		body.setDragX(0)
		body.setDragY(0)
		body.setFrictionX(0)
		body.setFrictionY(0)


	}

	kill() {
		if (this.dragonState !== DragonState.Alive) {
			return
		}

		this.dragonState = DragonState.Killed

		const body = this.body as Phaser.Physics.Arcade.Body
		body.checkCollision.none = true
		body.setAccelerationY(0)
		body.setVelocityX(0)
		body.setVelocityY(-200)
		body.setGravityY(150)
	}

	preUpdate(t: number, dt: number) {
		const body = this.body as Phaser.Physics.Arcade.Body

		switch (this.dragonState) {
			case DragonState.Alive: {
                body.setVelocityX(this.dragonSpeed)
				
				break		
			}

			case DragonState.Killed: {
				
				break
			}

			case DragonState.Dead: {

				break
			}
		}
	}

}
