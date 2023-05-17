import React, { useEffect } from 'react'
import { useOverlay } from '../../context/useOverlay'
import Phaser from 'phaser'
import Preloader from '../../phaser/scenes/Preloader'
import CaveScene from '../../phaser/scenes/CaveScene'
import GameOver from '../../phaser/scenes/GameOver'
import HomeScene from '../../phaser/scenes/HomeScene'
import OverlayKeys from '../../consts/OverlayKeys'
import SceneKeys from '../../consts/SceneKeys'

export default function PhaserGame() {

	const { overlay } = useOverlay()

	const config: Phaser.Types.Core.GameConfig = {
		type: Phaser.AUTO,
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 500 },
				debug: false
			}
		},
		scene: [Preloader, HomeScene, CaveScene, GameOver],
		scale: {
			mode: Phaser.Scale.RESIZE,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: '100%',
			height: '100%'
		},
		pixelArt: true,
	}

	const [game, setGame] = React.useState<Phaser.Game | null>(null)

	useEffect(() => {
		console.log('PhaserGame mounted')
		const phaserGame = new Phaser.Game(config)
		setGame(phaserGame)
		return () => {
			phaserGame.destroy(true)
		}
	}, [])

	if (game !== null) {
		const phaserGame = game as Phaser.Game
		if (overlay === OverlayKeys.Home) {
			phaserGame.scene.run(SceneKeys.HomeScene)
		} else if (overlay === OverlayKeys.Game) {
			phaserGame.scene.run(SceneKeys.CaveScene)
		}
	}

	return (
		<></>
	)
}
