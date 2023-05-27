import React, { useState, useMemo, useEffect } from 'react';
import PhaserGame from '../components/phaser/PhaserGame';
import { useOverlay } from '../context/useOverlay';
import OverlayKeys from '../constants/OverlayKeys';
import Home from '../overlays/Home';
import Game from '../overlays/Game';
import GameOver from 'overlays/GameOver';
import Loading from 'overlays/Loading';
import { useFirestore } from '@context/useFirestore';

export default function Index(): JSX.Element {
  const { overlay } = useOverlay();
  const { firestoreData, firestoreFunctions } = useFirestore();
  const [userName, setUserName] = useState('');

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
      const newUserName = firestoreData?.userData?.userName;
      if (newUserName != null) {
        setUserName(newUserName);
      }
    };
    initializeUserData();
    console.log(userName)
  }, [firestoreData?.userData, userName]);

  useEffect(() => {
    if (window.xnft.metadata == null) {
      return;
    }
    const username = window.xnft.metadata.username
    if (username != null) {
      setUserName(username);
    }
  }, [window.xnft.metadata]);


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
