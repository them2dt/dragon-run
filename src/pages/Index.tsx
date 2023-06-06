import React, { useState, useMemo, useEffect } from 'react';
import PhaserGame from '../components/phaser/PhaserGame';
import { useOverlay } from '../context/useOverlay';
import OverlayKeys from '../constants/OverlayKeys';
import Home from '../overlays/Home';
import Game from '../overlays/Game';
import GameOver from 'overlays/GameOver';
import Loading from 'overlays/Loading';
import { useFirestore } from '@context/useFirestore';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from '@consts/EventKeys';

export default function Index(): JSX.Element {
  const { overlay } = useOverlay();
  const { firestoreData, firestoreFunctions } = useFirestore();
  const [userName, setUserName] = useState('');
  const [highScore, setHighScore] = useState<number>(0);
  const [newScore, setNewScore] = useState<number>(0);

  useMemo(() => {
    console.log('Initializing firestore');
    const initializeFirestore = async () => {
      if (firestoreData?.firestore == null) {
        await firestoreFunctions.initializeFirestore();
      }
    };
    initializeFirestore();
  }, [firestoreData?.firestore]);

  useMemo(() => {
    if (firestoreData?.leaderboard == null) {
      firestoreFunctions.getLeaderboard();
    }
  }, [firestoreData?.firestore, firestoreData?.leaderboard]);

  useMemo(() => {
    const initializeUserData = async () => {
      if (userName === '') {
        return;
      }
      const currentUserName = firestoreData?.userData?.userName;
      if (userName !== currentUserName) {
        await firestoreFunctions.initializeUserData(userName);
      }
      const updatedUserName = firestoreData?.userData?.userName;
      if (updatedUserName != null) {
        setUserName(updatedUserName);
        console.log('updatedUserName: ', updatedUserName);
      }
      const updatedHighScore = firestoreData?.userData?.highScore;
      if (updatedHighScore != undefined) {
        setHighScore(updatedHighScore);
        console.log('updatedHighScore: ', updatedHighScore);
      }
    };
    initializeUserData();
  }, [firestoreData?.userData, userName]);

  useEffect(() => {
    if (window.xnft.metadata == null) {
      console.log('Please open in Backpack!');
      return;
    }
    const username = window.xnft.metadata.username;
    if (username != null) {
      setUserName(username);
    }
  }, [window.xnft.metadata]);

  useMemo(() => {
    if (newScore > highScore) {
      firestoreFunctions.newHighScore(newScore);
    }
  }, [newScore]);

  useEffect(() => {
    eventsCenter.on(EventKeys.UpdateEndScore, (score: number) => {
      setNewScore(score);
    });
    return () => {
      eventsCenter.off(EventKeys.UpdateEndScore);
    }
  }, []);

  return (
    <>
      {overlay === OverlayKeys.None && null}
      {overlay === OverlayKeys.Preloader ? <Loading /> : null}
      {overlay === OverlayKeys.Home ? <Home /> : null}
      {overlay === OverlayKeys.Game || overlay === OverlayKeys.GameOver ? <Game /> : null}
      {overlay === OverlayKeys.GameOver ? <GameOver /> : null}
      <PhaserGame />
    </>
  );
}
