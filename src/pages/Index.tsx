import React, { useState, useMemo, useEffect } from "react";
import PhaserGame from "../components/phaser/PhaserGame";
import { useOverlay } from "../context/useOverlay";
import OverlayKeys from "../constants/OverlayKeys";
import Home from "../overlays/Home";
import Game from "../overlays/Game";
import GameOver from "overlays/GameOver";
import Loading from "overlays/Loading";
import { useFirestore } from "@context/useFirestore";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "@consts/EventKeys";
import Enter from "overlays/Enter";
import LevelComplete from "overlays/LevelComplete";
import type LevelCompleteData from "types/LevelCompleteData";
import { useGameData } from "@context/useGameData";
import BottomAlert from "components/alerts/Alert";

export default function Index(): JSX.Element {
  const { overlay } = useOverlay();
  const { firestoreData, firestoreFunctions } = useFirestore();
  const { userName } = useGameData();
  const [highScore, setHighScore] = useState<number>(0);
  const [newScore, setNewScore] = useState<number>(0);
  const [newHighScore, setNewHighScore] = useState<number>(0);
  const [scoreBeforeBonus, setScoreBeforeBonus] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [timeBonus, setTimeBonus] = useState<number>(0);
  const [levelCompleted, setLevelCompleted] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (firestoreData?.leaderboard == null) {
      firestoreFunctions.getLeaderboard();
    }
  }, [firestoreData?.leaderboard]);

  useMemo(() => {
    const initializeUserData = () => {
      if (userName === "") {
        return;
      }
      const currentUserName = firestoreData?.userData?.userName;
      if (userName !== currentUserName) {
        firestoreFunctions.initializeUserData(userName);
      }
      const updatedHighScore = firestoreData?.userData?.highScore;
      if (updatedHighScore !== undefined) {
        setHighScore(updatedHighScore);
      }
    };
    initializeUserData();
  }, [firestoreData?.userData, userName]);

  useMemo(() => {
    if (newScore > highScore) {
      firestoreFunctions.newHighScore(newScore);
      setNewHighScore(newScore);
    }
  }, [newScore]);

  useEffect(() => {
    eventsCenter.on(EventKeys.LoadingProgress, (progress: number) => {
      setProgress(progress * 100);
    });
    eventsCenter.on(EventKeys.UpdateEndScore, (score: number) => {
      setNewScore(score);
    });
    eventsCenter.on(
      EventKeys.UpdateLevelCompleteData,
      ({ level, score, time, timeBonus, total }: LevelCompleteData) => {
        setLevelCompleted(level);
        setScoreBeforeBonus(score);
        setTime(time);
        setTimeBonus(timeBonus);
        setNewScore(total);
      }
    );
    eventsCenter.on(EventKeys.GoToGame, () => {
      setNewHighScore(0);
    });
    return () => {
      eventsCenter.off(EventKeys.LoadingProgress);
      eventsCenter.off(EventKeys.UpdateEndScore);
      eventsCenter.off(EventKeys.UpdateLevelCompleteData);
      eventsCenter.off(EventKeys.GoToGame);
    };
  }, []);

  return (
    <>
      {overlay === OverlayKeys.None && null}
      {overlay === OverlayKeys.Preloader ? (
        <Loading progress={progress} loadingDescription="Preparing the Dragons..." />
      ) : null}
      {overlay === OverlayKeys.Enter ? <Enter userName={userName} /> : null}
      {overlay === OverlayKeys.Home ? <Home /> : null}
      {overlay === OverlayKeys.Game || overlay === OverlayKeys.GameOver || overlay === OverlayKeys.LevelComplete ? (
        <Game />
      ) : null}
      {overlay === OverlayKeys.GameOver ? <GameOver newHighScore={newHighScore} /> : null}
      {overlay === OverlayKeys.LevelComplete ? (
        <LevelComplete
          scoreBeforeBonus={scoreBeforeBonus}
          time={time}
          timeBonus={timeBonus}
          newHighScore={newHighScore}
          levelCompleted={levelCompleted}
        />
      ) : null}
      <PhaserGame />
      <BottomAlert />
    </>
  );
}
