import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/GameScene'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: true
		}
	},
	scene: [Preloader, Game, GameOver],
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: '100%',
        height: '100%'
	}
}

export default new Phaser.Game(config)
