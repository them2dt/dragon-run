
import Phaser from 'phaser'

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super('home');
  }

  create() {

    const logo = this.add.image(400, -200, 'logo').setOrigin(0, 0);

    this.tweens.add({
      targets: logo,
      y: 10,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    });

    this.createEmitter();
  }

  createEmitter() {



  }
}