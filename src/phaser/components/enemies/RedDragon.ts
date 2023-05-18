import * as Phaser from 'phaser';
import TextureKeys from '../../../consts/TextureKeys';
import AnimationKeys from '../../../consts/AnimationKeys';
import DragonState from '../../../consts/enemies/DragonState';
import EnemySoundEffectKeys from '../../../consts/audio/EnemySoundEffectKeys';

export default class RedDragon extends Phaser.GameObjects.Container {
  private redDragon: Phaser.GameObjects.Sprite;
  public redDragonBody!: Phaser.Physics.Arcade.Body;

  public dragonState: DragonState = DragonState.Idle;
  private dragonSize = 1.0;
  public dragonSpeed = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.redDragon = scene.add
      .sprite(0, 0, TextureKeys.RedDragon)
      .setOrigin(0.55, 1)
      .setScale(this.dragonSize * 2.4);

    this.add(this.redDragon);

    scene.physics.add.existing(this);

    this.redDragonBody = this.body as Phaser.Physics.Arcade.Body;

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.dragonSize * this.redDragon.width * 1.3, this.dragonSize * this.redDragon.height);
    body.setOffset(-this.redDragon.width, -this.redDragon.height - 60);
    body.setCollideWorldBounds(false);
    body.setAllowGravity(false);
    body.setDragX(0);
    body.setDragY(0);
  }

  public start() {
    this.dragonState = DragonState.Chasing;
    this.scene.sound.play(EnemySoundEffectKeys.DragonRoar1, { volume: 0.7 });
    this.scene.sound.play(EnemySoundEffectKeys.DragonWings1, { loop: true, volume: 0.6 });
  }

  public kill() {
    if (this.dragonState !== DragonState.Chasing) {
      return;
    }

    this.dragonState = DragonState.Dead;

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.checkCollision.none = true;
    body.setAccelerationY(0);
    body.setVelocityX(0);
    body.setVelocityY(-200);
    body.setGravityY(150);
  }

  public attackPlayer() {
    if (this.dragonState !== DragonState.Chasing) {
      return;
    }

    this.dragonState = DragonState.Attacking;

    this.redDragon.play(AnimationKeys.RedDragonAttackRight, true);

    this.scene.sound.play(EnemySoundEffectKeys.DragonRoar2, { volume: 0.9 });

    this.scene.time.addEvent({
      delay: 200, // ms
      callback: () => this.scene.sound.play(EnemySoundEffectKeys.DragonBurn1, { volume: 1 }),
      repeat: 0,
    });
  }

  public followY(y: number, offset: number) {
    const body = this.body as Phaser.Physics.Arcade.Body;

    const redDragonY = body.y + body.height;

    if (this.dragonState === DragonState.Chasing) {
      if (redDragonY < y - offset) {
        body.setVelocityY(100 * (y - redDragonY) * 0.05);
      } else {
        body.setVelocityY(-100 * (redDragonY - y) * 0.05);
      }
    }
  }

  public preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    switch (this.dragonState) {
      case DragonState.Idle: {
        body.setVelocityX(50);

        body.setVelocityY(0);

        break;
      }

      case DragonState.Chasing: {
        this.redDragon.play(AnimationKeys.RedDragonFlyingRight, true);

        body.setVelocityX(this.dragonSpeed);

        break;
      }

      case DragonState.Attacking: {
        body.setVelocityX(50);

        break;
      }

      case DragonState.Dead: {
        break;
      }
    }
  }
}
