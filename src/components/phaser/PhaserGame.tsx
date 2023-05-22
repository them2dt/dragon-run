import React, { useEffect } from 'react';
import * as Phaser from 'phaser';
import { useOverlay } from '@context/useOverlay';
import Preloader from '../../phaser/scenes/Preloader';
import CaveScene from '../../phaser/scenes/CaveScene';
import GameOver from '../../phaser/scenes/GameOver';
import HomeScene from '../../phaser/scenes/HomeScene';
import eventsCenter from '@events-center';
import EventKeys from '@consts/EventKeys';
import SceneKeys from '@consts/SceneKeys';
import OverlayKeys from '@consts/OverlayKeys';

export default function PhaserGame() {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: false,
      },
    },
    scene: [Preloader, HomeScene, CaveScene, GameOver],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: '100%',
      height: '100%',
    },
    pixelArt: true,
  };

  const { setOverlay } = useOverlay();

  useEffect(() => {
    console.log('PhaserGame mounted');
    const phaserGame = new Phaser.Game(config);

    eventsCenter.on(EventKeys.GoToHome, () => {
      phaserGame.scene.stop(SceneKeys.GameOver);
      phaserGame.scene.stop(SceneKeys.CaveScene);
      phaserGame.sound.stopAll();

      console.log('Starting HomeScene');
      phaserGame.scene.start(SceneKeys.HomeScene);
      setOverlay(OverlayKeys.Home);
    });

    eventsCenter.on(EventKeys.GoToGame, () => {
      phaserGame.scene.stop(SceneKeys.HomeScene);
      phaserGame.scene.stop(SceneKeys.GameOver);
      phaserGame.sound.stopAll();
      console.log('Starting CaveScene');
      phaserGame.scene.start(SceneKeys.CaveScene);
      setOverlay(OverlayKeys.Game);
    });

    eventsCenter.on(EventKeys.GoToGameOver, () => {
      if (phaserGame.scene.isActive(SceneKeys.GameOver)) {
        console.log('GameOver is already active');
        return;
      }
      console.log('Starting GameOver');
      phaserGame.scene.start(SceneKeys.GameOver);
      setOverlay(OverlayKeys.GameOver);
    });

    eventsCenter.on(EventKeys.PauseGame, () => {
      console.log('Pausing CaveScene');
      phaserGame.scene.pause(SceneKeys.CaveScene);
      phaserGame.sound.pauseAll();
    });

    eventsCenter.on(EventKeys.ResumeGame, () => {
      console.log('Resuming CaveScene');
      phaserGame.scene.resume(SceneKeys.CaveScene);
      phaserGame.sound.resumeAll();
    });

    return () => {
      phaserGame.destroy(true);
      eventsCenter.removeAllListeners();
    };
  }, []);

  return <></>;
}
