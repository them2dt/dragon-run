import { useEffect } from "react";
import phaserGame from '../phaser/PhaserGame'
import { useOverlay } from "../context/useOverlay";
import GameScene from "../phaser/scenes/GameScene";
import Home from "../overlays/Home";
import Preloader from "../phaser/Preloader";

export default function Game() {

  const { overlay } = useOverlay();

  useEffect(() => {
    console.log("Setting up scene...");
    const scene = phaserGame.scene.keys.preloader as Preloader;
  }, [])

  return (
    <>
      {overlay === "" && null}
      {overlay === "Home" ? <Home /> : null}
    </>
    
  );
}
