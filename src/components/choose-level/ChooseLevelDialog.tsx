import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FullscreenDialog from "components/FullscreenDialog";
import ChooseLevelSection from "./ChooseLevelSection";
import { useGameData } from "@context/useGameData";
import type SceneKeys from "@consts/SceneKeys";

interface ChooseLevelDialogProps {
  chooseLevelOpen: boolean;
  closeChooseLevel: () => void;
}

export default function ChooseLevelDialog({ chooseLevelOpen, closeChooseLevel }: ChooseLevelDialogProps) {
  const muiTheme = useTheme();
  const { selectLevel } = useGameData();

  const handleContinue = (levelNumber?: number, levelSceneKey?: SceneKeys) => {
    selectLevel(levelNumber, levelSceneKey);
  };

  return (
    <FullscreenDialog dialogOpen={chooseLevelOpen} closeDialog={closeChooseLevel}>
      <Typography align="center" sx={{ px: 5, my: 3 }} variant="h3" color={muiTheme.palette.text.secondary}>
        Choose Level
      </Typography>
      <Box
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          my: "auto"
        }}
      >
        <Box sx={{ minHeight: "100vh" }}>
          <ChooseLevelSection handleContinue={handleContinue} />
        </Box>
      </Box>
    </FullscreenDialog>
  );
}
