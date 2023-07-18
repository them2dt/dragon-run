import React, { useEffect, useState, useRef, useMemo } from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FullscreenDialog from "components/FullscreenDialog";
import ChooseLevelScreen from "./choose-level/ChooseLevelScreen";
import ChooseCharacterScreen from "./choose-character/ChooseCharacterScreen";
import LoadingScreen from "./loading/LoadingScreen";
import PreGameScreens from "constants/PreGameScreens";
import SceneKeys from "@consts/SceneKeys";
import { useFirestore } from "@context/useFirestore";
import levels from "@consts/data/Levels";

interface PreGameDialogProps {
  preGameOpen: boolean;
  closePreGame: () => void;
  openShop: () => void;
  equippedKnight: string;
  equipKnight: (knight: string) => void;
}

export default function PreGameDialog({
  preGameOpen,
  closePreGame,
  openShop,
  equippedKnight,
  equipKnight
}: PreGameDialogProps) {
  const muiTheme = useTheme();
  const { firestoreData } = useFirestore();
  const [screen, setScreen] = useState(PreGameScreens.ChooseLevel);
  const [screenTitle, setScreenTitle] = useState("Choose Level");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedSceneKey, setSelectedSceneKey] = useState<SceneKeys>(SceneKeys.Level1Scene);
  const [levelsCompleted, setLevelsCompleted] = useState<number>(0);
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState<number>(1);

  const handleContinue = (levelNumber?: number, levelSceneKey?: SceneKeys) => {
    if (levelNumber === undefined) {
      levelNumber = highestUnlockedLevel;
    }
    if (levelSceneKey === undefined) {
      levelSceneKey = levels[highestUnlockedLevel - 1].sceneKey;
    }
    setSelectedLevel(levelNumber);
    setSelectedSceneKey(levelSceneKey);
    handleOpenScreen(PreGameScreens.ChooseCharacter);
  };

  useEffect(() => {
    if (screen === PreGameScreens.ChooseLevel) {
      setScreenTitle("Choose Level");
    } else if (screen === PreGameScreens.ChooseCharacter) {
      setScreenTitle("Choose Character");
    } else if (screen === PreGameScreens.Loading) {
      setScreenTitle("Loading...");
    }
  }, [screen]);

  const handleClose = () => {
    setScreen(PreGameScreens.ChooseLevel);
    closePreGame();
  };

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const handleOpenScreen = (nextScreen: PreGameScreens) => {
    scrollToTop();
    setScreen(nextScreen);
  };

  const handleLoading = () => {
    scrollToTop();
    handleOpenScreen(PreGameScreens.Loading);
  };

  const scrollToTop = () => {
    scrollBoxRef.current?.scrollTo({
      top: 0
    });
  };

  useMemo(() => {
    if (firestoreData) {
      const levelsCompleted = firestoreData.userData?.levelsCompleted;
      if (levelsCompleted) {
        setLevelsCompleted(levelsCompleted);
        const nextLevelComingSoon = levels[levelsCompleted + 1].comingSoon;
        if (nextLevelComingSoon) {
          setHighestUnlockedLevel(levelsCompleted);
        } else {
          setHighestUnlockedLevel(levelsCompleted + 1);
        }
      }
    }
  }, [firestoreData?.userData?.levelsCompleted]);

  return (
    <FullscreenDialog dialogOpen={preGameOpen} closeDialog={handleClose}>
      <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        {screenTitle}
      </Typography>
      <Box
        ref={scrollBoxRef}
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          my: "auto"
        }}
      >
        <Box sx={{ minHeight: "100vh" }}>
          <ChooseLevelScreen
            active={screen === PreGameScreens.ChooseLevel}
            handleContinue={handleContinue}
            levelsCompleted={levelsCompleted}
            highestUnlockedLevel={highestUnlockedLevel}
          />
          <ChooseCharacterScreen
            active={screen === PreGameScreens.ChooseCharacter}
            openShop={openShop}
            handleLoading={handleLoading}
            equippedKnight={equippedKnight}
            equipKnight={equipKnight}
            selectedLevel={selectedLevel}
            selectedSceneKey={selectedSceneKey}
          />
          <LoadingScreen active={screen === PreGameScreens.Loading} />
        </Box>
      </Box>
    </FullscreenDialog>
  );
}
