import React from "react";
import { Typography, useTheme, Box } from "@mui/material";
import FullscreenDialog from "components/FullscreenDialog";
import ChooseLevelSection from "./ChooseLevelSection";

interface ChooseLevelDialogProps {
  chooseLevelOpen: boolean;
  closeChooseLevel: () => void;
}

export default function InventoryDialog({ chooseLevelOpen, closeChooseLevel }: ChooseLevelDialogProps) {
  const muiTheme = useTheme();

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
          <ChooseLevelSection />
        </Box>
      </Box>
    </FullscreenDialog>
  );
}
