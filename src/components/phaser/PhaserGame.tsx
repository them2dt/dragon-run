import React, { useEffect } from "react";
import * as Phaser from "phaser";
import { useOverlay } from "@context/useOverlay";
import Preloader from "../../phaser/scenes/Preloader";
import GameOver from "../../phaser/scenes/GameOver";
import HomeScene from "../../phaser/scenes/HomeScene";
import Level1Scene from "phaser/scenes/Level1Scene";
import CharacterLoader from "phaser/scenes/CharacterLoader";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import SceneKeys from "constants/SceneKeys";
import OverlayKeys from "constants/OverlayKeys";
import EnterScene from "phaser/scenes/EnterScene";
import type LoadCharacterProps from "types/LoadCharacterProps";

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
    scene: [Preloader, CharacterLoader, EnterScene, HomeScene, Level1Scene, GameOver],
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
      phaserGame.scene.start(SceneKeys.CharacterLoader, data);
      phaserGame.scene.stop(SceneKeys.HomeScene);
    });

    eventsCenter.on(EventKeys.GoToEnter, () => {
      phaserGame.scene.start(SceneKeys.EnterScene);
      setOverlay(OverlayKeys.Enter);
    });

    eventsCenter.on(EventKeys.GoToHome, () => {
      phaserGame.scene.scenes.forEach((scene) => {
        phaserGame.scene.stop(scene.scene.key);
      });
      phaserGame.sound.stopAll();

      phaserGame.scene.start(SceneKeys.HomeScene);
      setOverlay(OverlayKeys.Home);
    });

    eventsCenter.on(
      EventKeys.GoToGame,
      ({ levelNumber, levelSceneKey }: { levelNumber: number; levelSceneKey: SceneKeys }) => {
        phaserGame.scene.stop(SceneKeys.HomeScene);
        phaserGame.sound.stopAll();
        // Fixes animation error
        const phaserAnimations: Phaser.Types.Animations.JSONAnimations = phaserGame.anims.toJSON();
        phaserAnimations.anims.forEach((animation) => {
          phaserGame.anims.remove(animation.key);
        });
        console.log("Going to level: ", levelNumber);
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
      phaserGame.scene.pause(SceneKeys.CaveScene);
      phaserGame.sound.pauseAll();
    });

    eventsCenter.on(EventKeys.ResumeGame, () => {
      phaserGame.scene.resume(SceneKeys.CaveScene);
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
