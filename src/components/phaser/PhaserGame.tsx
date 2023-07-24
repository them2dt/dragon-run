import React, { useEffect } from "react";
import * as Phaser from "phaser";
import { useOverlay } from "@context/useOverlay";
import Preloader from "../../phaser/scenes/Preloader";
import HomeScene from "../../phaser/scenes/HomeScene";
import Level1Scene from "phaser/scenes/Level1Scene";
import Level2Scene from "phaser/scenes/Level2Scene";
import CharacterLoader from "phaser/scenes/CharacterLoader";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import SceneKeys from "constants/SceneKeys";
import OverlayKeys from "constants/OverlayKeys";
import EnterScene from "phaser/scenes/EnterScene";
import type LoadCharacterProps from "types/LoadCharacterProps";
import CaveScene from "phaser/scenes/CaveScene";

export default function PhaserGame() {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 500 },
        debug: false
      }
    },
    scene: [Preloader, CharacterLoader, EnterScene, HomeScene, CaveScene, Level1Scene, Level2Scene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: "100%",
      height: "100%"
    },
    plugins: {
      scene: [
        {
          key: "data",
          plugin: Phaser.Data.DataManagerPlugin,
          start: true,
          mapping: "character"
        }
      ]
    },
    pixelArt: true
  };

  const { setOverlay } = useOverlay();

  const stopAllScenes = (phaserGame: Phaser.Game) => {
    phaserGame.scene.scenes.forEach((scene) => {
      if (scene.scene.key === SceneKeys.CharacterLoader || scene.scene.key === SceneKeys.Preloader) {
        return;
      }
      if (phaserGame.scene.isActive(scene.scene.key) || phaserGame.scene.isPaused(scene.scene.key)) {
        phaserGame.scene.stop(scene.scene.key);
      }
    });
  };

  const pauseAllScenes = (phaserGame: Phaser.Game) => {
    phaserGame.scene.scenes.forEach((scene) => {
      if (scene.scene.key === SceneKeys.CharacterLoader || scene.scene.key === SceneKeys.Preloader) {
        return;
      }
      if (phaserGame.scene.isActive(scene.scene.key)) {
        phaserGame.scene.pause(scene.scene.key);
      }
    });
  };

  const resumeAllScenes = (phaserGame: Phaser.Game) => {
    phaserGame.scene.scenes.forEach((scene) => {
      if (scene.scene.key === SceneKeys.CharacterLoader || scene.scene.key === SceneKeys.Preloader) {
        return;
      }
      if (phaserGame.scene.isActive(scene.scene.key) || phaserGame.scene.isPaused(scene.scene.key)) {
        phaserGame.scene.resume(scene.scene.key);
      }
    });
  };

  useEffect(() => {
    const phaserGame = new Phaser.Game(config);

    eventsCenter.on(EventKeys.LoadCharacter, ({ characterLink, nextEventKey, nextEventProps }: LoadCharacterProps) => {
      const data = {
        values: {
          characterLink,
          nextEventKey,
          nextEventProps
        }
      };
      stopAllScenes(phaserGame);
      phaserGame.sound.stopAll();
      phaserGame.scene.start(SceneKeys.CharacterLoader, data);
    });

    eventsCenter.on(EventKeys.GoToEnter, () => {
      phaserGame.scene.start(SceneKeys.EnterScene);
      setOverlay(OverlayKeys.Enter);
    });

    eventsCenter.on(EventKeys.GoToHome, () => {
      stopAllScenes(phaserGame);
      phaserGame.sound.stopAll();
      phaserGame.scene.start(SceneKeys.HomeScene);
      setOverlay(OverlayKeys.Home);
    });

    eventsCenter.on(
      EventKeys.GoToGame,
      ({ levelNumber, levelSceneKey }: { levelNumber: number; levelSceneKey: SceneKeys }) => {
        phaserGame.scene.stop(SceneKeys.HomeScene);
        // Fixes animation error
        const phaserAnimations: Phaser.Types.Animations.JSONAnimations = phaserGame.anims.toJSON();
        phaserAnimations.anims.forEach((animation) => {
          phaserGame.anims.remove(animation.key);
        });
        phaserGame.scene.start(levelSceneKey);
        setOverlay(OverlayKeys.Game);
      }
    );

    eventsCenter.on(EventKeys.GoToGameOver, () => {
      setOverlay(OverlayKeys.GameOver);
    });

    eventsCenter.on(EventKeys.GoToLevelComplete, () => {
      setOverlay(OverlayKeys.LevelComplete);
    });

    eventsCenter.on(EventKeys.RestartGame, () => {
      setOverlay(OverlayKeys.Game);
    });

    eventsCenter.on(EventKeys.PauseGame, () => {
      pauseAllScenes(phaserGame);
      phaserGame.sound.pauseAll();
    });

    eventsCenter.on(EventKeys.ResumeGame, () => {
      resumeAllScenes(phaserGame);
      phaserGame.sound.resumeAll();
    });

    eventsCenter.on(EventKeys.ChangeVolume, (volume: number) => {
      phaserGame.sound.volume = volume / 100;
    });

    return () => {
      phaserGame.destroy(true);
      eventsCenter.removeAllListeners();
    };
  }, []);

  return <></>;
}
