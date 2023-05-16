import Phaser from 'phaser'

import Preloader from './Preloader'
import CaveScene from './scenes/CaveScene'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 },
			debug: false
		}
	},
	scene: [Preloader, CaveScene, GameOver],
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: '100%',
        height: '100%'
	},
	pixelArt: true,
}

export default new Phaser.Game(config)
