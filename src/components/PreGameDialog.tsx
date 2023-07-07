import React, { useEffect, useState } from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FullscreenDialog from "components/FullscreenDialog";
import ChooseLevelScreen from "./choose-level/ChooseLevelScreen";
import ChooseCharacterScreen from "./choose-character/ChooseCharacterScreen";

interface PreGameDialogProps {
  preGameOpen: boolean;
  closePreGame: () => void;
  openShop: () => void;
}

enum PreGameScreens {
  ChooseLevel,
  ChooseCharacter
}

export default function PreGameDialog({ preGameOpen, closePreGame, openShop }: PreGameDialogProps) {
  const muiTheme = useTheme();
  const [screen, setScreen] = useState(PreGameScreens.ChooseLevel);
  const [screenTitle, setScreenTitle] = useState("Choose Level");

  useEffect(() => {
    if (screen === PreGameScreens.ChooseLevel) {
      setScreenTitle("Choose Level");
    } else if (screen === PreGameScreens.ChooseCharacter) {
      setScreenTitle("Choose Character");
    }
  }, [screen]);

  const handleClose = () => {
    setScreen(PreGameScreens.ChooseLevel);
    closePreGame();
  };

  return (
    <FullscreenDialog dialogOpen={preGameOpen} closeDialog={handleClose}>
      <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        {screenTitle}
      </Typography>
      <Box
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          my: "auto"
        }}
      >
        <Box sx={{ minHeight: "100vh" }}>
          <ChooseLevelScreen
            active={screen === PreGameScreens.ChooseLevel}
            openChooseCharacter={() => {
              setScreen(PreGameScreens.ChooseCharacter);
            }}
          />
          <ChooseCharacterScreen active={screen === PreGameScreens.ChooseCharacter} openShop={openShop} />
        </Box>
      </Box>
    </FullscreenDialog>
  );
}
