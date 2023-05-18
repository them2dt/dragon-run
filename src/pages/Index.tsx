import React, { useEffect } from 'react';
import * as Phaser from 'phaser';
import PhaserGame from '../components/phaser/PhaserGame';
import { useOverlay } from '../context/useOverlay';
import OverlayKeys from '../consts/OverlayKeys';
import Home from '../components/overlays/Home';
import Game from '../components/overlays/Game';
import EventKeys from '@consts/EventKeys';
import eventsCenter from '../events/eventsCenter';

export default function Index(): JSX.Element {
  const { overlay } = useOverlay();

  useEffect(() => {
    console.log(Phaser.Scene.name);
    eventsCenter.on(EventKeys.GameOver, () => {
      console.log('game-over');
    });
  }, []);

  return (
    <>
      {overlay === OverlayKeys.None && null}
      {overlay === OverlayKeys.Home ? <Home /> : null}
      {overlay === OverlayKeys.Game ? <Game /> : null}
      <PhaserGame />
    </>
  );
}
