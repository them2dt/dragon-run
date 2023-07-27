import React, { createContext, useState, useMemo } from "react";
import SceneKeys from "@consts/SceneKeys";
import levels from "@consts/data/Levels";
import { useFirestore } from "@context/useFirestore";

interface GameDataContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  selectedLevel: number;
  selectedSceneKey: SceneKeys;
  levelsCompleted: number;
  highestUnlockedLevel: number;
  selectLevel: (levelNumber?: number, levelSceneKey?: SceneKeys) => void;
  equippedKnight: { name: string; spritesheet: string };
  equipKnight: (name: string, spritesheet: string) => void;
}

interface GameDataProviderProps {
  children: React.ReactNode;
}

export const GameDataContext = createContext<GameDataContextType | null>(null);

export const GameDataProvider = ({ children }: GameDataProviderProps) => {
  const { firestoreData, firestoreFunctions } = useFirestore();
  const [userName, setUserName] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedSceneKey, setSelectedSceneKey] = useState<SceneKeys>(SceneKeys.Level1Scene);
  const [levelsCompleted, setLevelsCompleted] = useState<number>(0);
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<number>(1);
  const [equippedKnight, setEquippedKnight] = useState({ name: "", spritesheet: "" });

  const equipKnight = (name: string, spritesheet: string) => {
    setEquippedKnight({ name, spritesheet });
    localStorage.setItem("equippedKnight", JSON.stringify({ name, spritesheet, userName }));
  };

  const selectLevel = (levelNumber?: number, levelSceneKey?: SceneKeys) => {
    if (levelNumber === undefined) {
      levelNumber = highestUnlockedLevel;
    }
    if (levelSceneKey === undefined) {
      levelSceneKey = levels[highestUnlockedLevel - 1].sceneKey;
    }
    setSelectedLevel(levelNumber);
    setSelectedSceneKey(levelSceneKey);
  };

  useMemo(() => {
    if (firestoreData) {
      const levelsCompleted = firestoreData.userData?.levelsCompleted;
      if (levelsCompleted) {
        setLevelsCompleted(levelsCompleted);
        const nextLevelComingSoon = levels[levelsCompleted].comingSoon;
        if (nextLevelComingSoon) {
          setHighestUnlockedLevel(levelsCompleted);
        } else {
          setHighestUnlockedLevel(levelsCompleted + 1);
        }
      }
    }
  }, [firestoreData?.userData?.levelsCompleted]);

  useMemo(() => {
    const equippedKnight = localStorage.getItem("equippedKnight");
    if (equippedKnight) {
      const equippedKnightParsed = JSON.parse(equippedKnight);
      if (equippedKnightParsed.userName === userName && equippedKnightParsed.name && equippedKnightParsed.spritesheet) {
        setEquippedKnight({ name: equippedKnightParsed.name, spritesheet: equippedKnightParsed.spritesheet });
      }
    }
    if (userName !== "") {
      firestoreFunctions?.getUserData(userName);
    }
  }, [userName]);

  return (
    <GameDataContext.Provider
      value={{
        userName,
        setUserName,
        selectedLevel,
        selectedSceneKey,
        levelsCompleted,
        highestUnlockedLevel,
        selectLevel,
        equippedKnight,
        equipKnight
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};
export default GameDataProvider;
