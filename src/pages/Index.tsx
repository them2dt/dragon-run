import React, { useEffect } from 'react';
import * as Phaser from 'phaser';
import PhaserGame from '../components/phaser/PhaserGame';
import { useOverlay } from '../context/useOverlay';
import OverlayKeys from '../consts/OverlayKeys';
import Home from '../components/overlays/Home';
import Game from '../components/overlays/Game';
import EventKeys from '@consts/EventKeys';
import eventsCenter from '../events/eventsCenter';
import GameOver from 'components/overlays/GameOver';
import Loading from 'components/overlays/Loading';

export default function Index(): JSX.Element {
  const { overlay, setOverlay } = useOverlay();

  useEffect(() => {
    console.log(Phaser.Scene.name);
    eventsCenter.on(EventKeys.Preloader, () => {
      console.log('preloaded');
      setOverlay(OverlayKeys.Home);
    });
    eventsCenter.on(EventKeys.Home, () => {
      console.log('home');
    });
    eventsCenter.on(EventKeys.Game, () => {
      console.log('game');
      setOverlay(OverlayKeys.Game);
    });
    eventsCenter.on(EventKeys.GameOver, () => {
      console.log('game-over');
      setOverlay(OverlayKeys.GameOver);
    });
  }, []);

  return (
    <>
      {overlay === OverlayKeys.None && null}
      {overlay === OverlayKeys.Preloader ? <Loading /> : null}
      {overlay === OverlayKeys.Home ? <Home /> : null}
      {overlay === OverlayKeys.Game ? <Game /> : null}
      {overlay === OverlayKeys.GameOver ? <GameOver/> : null}
      <PhaserGame />
    </>
  );
}
