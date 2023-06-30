import React, { useState, useMemo, useEffect } from "react";
import PhaserGame from "../components/phaser/PhaserGame";
import { useOverlay } from "../context/useOverlay";
import OverlayKeys from "../constants/OverlayKeys";
import Home from "../overlays/Home";
import Game from "../overlays/Game";
import GameOver from "overlays/GameOver";
import Loading from "overlays/Loading";
import { useFirestore } from "@context/useFirestore";
import { useSolana } from "@context/useSolana";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "@consts/EventKeys";
import { onSnapshot, doc } from "firebase/firestore";
import Enter from "overlays/Enter";

export default function Index(): JSX.Element {
  const { overlay } = useOverlay();
  const { firestoreData, firestoreFunctions } = useFirestore();
  const { solanaFunctions } = useSolana();
  const [userName, setUserName] = useState("");
  const [highScore, setHighScore] = useState<number>(0);
  const [newScore, setNewScore] = useState<number>(0);
  const [newHighScore, setNewHighScore] = useState<number>(0);

  useEffect(() => {
    const initializeFirestore = () => {
      if (firestoreData?.firestore == null) {
        firestoreFunctions.initializeFirestore();
      }
    };
    initializeFirestore();
  }, [firestoreData?.firestore]);

  useEffect(() => {
    if (firestoreData?.leaderboard == null) {
      firestoreFunctions.getLeaderboard();
    }
  }, [firestoreData?.firestore, firestoreData?.leaderboard]);

  useMemo(() => {
    const initializeUserData = () => {
      if (userName === "") {
        return;
      }
      const currentUserName = firestoreData?.userData?.userName;
      if (userName !== currentUserName) {
        firestoreFunctions.initializeUserData(userName);
      }
      const updatedUserName = firestoreData?.userData?.userName;
      if (updatedUserName != null) {
        setUserName(updatedUserName);
      }
      const updatedHighScore = firestoreData?.userData?.highScore;
      if (updatedHighScore !== undefined) {
        setHighScore(updatedHighScore);
      }
    };
    initializeUserData();
  }, [firestoreData?.userData, userName]);

  useEffect(() => {
    const getAuthSignature = async (username: string, pubkey: string) => {
      if (username != null && pubkey != null) {
        await solanaFunctions.getAuthSignature(username, pubkey);
        setUserName(username);
      }
    };
    if (window?.xnft == null || window?.xnft?.metadata == null || window?.xnft?.metadata?.username == null) {
      console.log("Please open in Backpack!");
      return;
    }
    const username = window?.xnft?.metadata?.username;
    const pubkey = window?.xnft?.solana.publicKey?.toString();
    getAuthSignature(username, pubkey).catch((error) => {
      console.log(error);
    });
  }, [window?.xnft?.metadata]);

  useMemo(() => {
    if (newScore > highScore) {
      firestoreFunctions.newHighScore(newScore);
      setNewHighScore(newScore);
    }
  }, [newScore]);

  useEffect(() => {
    eventsCenter.on(EventKeys.UpdateEndScore, (score: number) => {
      setNewScore(score);
    });
    eventsCenter.on(EventKeys.GoToGame, () => {
      setNewHighScore(0);
    });
    return () => {
      eventsCenter.off(EventKeys.UpdateEndScore);
      eventsCenter.off(EventKeys.GoToGame);
    };
  }, []);

  useEffect(() => {
    if (firestoreData?.firestore == null) {
      return;
    }
    const unsubscribe = onSnapshot(doc(firestoreData?.firestore, "leaderboard", "highScores"), () => {
      firestoreFunctions.getLeaderboard();
    });
    return () => {
      unsubscribe();
    };
  }, [firestoreData?.firestore]);

  return (
    <>
      {overlay === OverlayKeys.None && null}
      {overlay === OverlayKeys.Preloader ? <Loading /> : null}
      {overlay === OverlayKeys.Enter ? <Enter userName={userName} /> : null}
      {overlay === OverlayKeys.Home ? <Home /> : null}
      {overlay === OverlayKeys.Game || overlay === OverlayKeys.GameOver ? <Game /> : null}
      {overlay === OverlayKeys.GameOver ? <GameOver newHighScore={newHighScore} /> : null}
      <PhaserGame />
    </>
  );
}
