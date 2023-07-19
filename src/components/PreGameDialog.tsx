import React, { useEffect, useState, useRef } from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FullscreenDialog from "components/FullscreenDialog";
import ChooseLevelScreen from "./choose-level/ChooseLevelScreen";
import ChooseCharacterScreen from "./choose-character/ChooseCharacterScreen";
import LoadingScreen from "./loading/LoadingScreen";
import PreGameScreens from "constants/PreGameScreens";
import type SceneKeys from "@consts/SceneKeys";
import { useGameData } from "@context/useGameData";

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
  const [screen, setScreen] = useState(PreGameScreens.ChooseLevel);
  const [screenTitle, setScreenTitle] = useState("Choose Level");
  const { selectLevel } = useGameData();

  const handleContinue = (levelNumber?: number, levelSceneKey?: SceneKeys) => {
    selectLevel(levelNumber, levelSceneKey);
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
          <ChooseLevelScreen active={screen === PreGameScreens.ChooseLevel} handleContinue={handleContinue} />
          <ChooseCharacterScreen
            active={screen === PreGameScreens.ChooseCharacter}
            openShop={openShop}
            handleLoading={handleLoading}
            equippedKnight={equippedKnight}
            equipKnight={equipKnight}
          />
          <LoadingScreen active={screen === PreGameScreens.Loading} />
        </Box>
      </Box>
    </FullscreenDialog>
  );
}
