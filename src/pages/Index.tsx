import React from 'react';
import PhaserGame from '../components/phaser/PhaserGame';
import { useOverlay } from '../context/useOverlay';
import OverlayKeys from '../consts/OverlayKeys';
import Home from '../components/overlays/Home';
import Game from '../components/overlays/Game';

export default function Index(): JSX.Element {
  const { overlay } = useOverlay();

  return (
    <>
      {overlay === OverlayKeys.None && null}
      {overlay === OverlayKeys.Home ? <Home /> : null}
      {overlay === OverlayKeys.Game ? <Game /> : null}
      <PhaserGame />
    </>
  );
}
