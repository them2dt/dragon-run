import { useEffect } from "react";
import phaserGame from '../phaser/phaserGame'
import { useOverlay } from "../context/useOverlay";
import HomeScene from '../scenes/HomeScene'
import Home from "../overlays/Home";

export default function Game() {

  const { overlay } = useOverlay();

  useEffect(() => {
    console.log("Setting up scene...");
    const scene = phaserGame.scene.keys.home as HomeScene;
  }, [])

  return (
    <>
      {overlay === "" && null}
      {overlay === "Home" ? <Home /> : null}
    </>
    
  );
}
