import { useEffect } from "react";
import phaserGame from '../phaser/phaserGame'
import HomeScene from '../scenes/HomeScene'
import { useOverlay } from "../context/useOverlay";

export default function Index() {

  const { overlay } = useOverlay();

  useEffect(() => {
    console.log("Creating emitter");
    const scene = phaserGame.scene.keys.home as HomeScene;
    scene.createEmitter();
  }, [])

  return (
    <>
      {overlay}
    </>
    
  );
}
