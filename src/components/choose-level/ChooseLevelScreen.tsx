import React from "react";
import { useTheme, Grid, Card, Typography, Zoom, Box } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";
import levels from "@consts/data/Levels";
import ChooseLevelItem from "./ChooseLevelItem";
import type SceneKeys from "@consts/SceneKeys";

interface ChooseLevelScreenProps {
  active: boolean;
  handleContinue: (levelNumber?: number, levelSceneKey?: SceneKeys) => void;
  levelsCompleted: number;
  highestUnlockedLevel: number;
}

export default function ChooseLevelScreen({
  active,
  handleContinue,
  levelsCompleted,
  highestUnlockedLevel
}: ChooseLevelScreenProps) {
  const muiTheme = useTheme();

  return (
    <Zoom in={active} style={{ transitionDelay: active ? "200ms" : "0ms" }} unmountOnExit>
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          component={Card}
          elevation={0}
          sx={{
            mx: "auto",
            mt: 2,
            mb: 4,
            height: "100%",
            [muiTheme.breakpoints.up("xl")]: {
              mt: 6,
              mb: 6,
              maxWidth: 1300,
              mx: "auto"
            }
          }}
        >
          {levels.map((level) => (
            <ChooseLevelItem
              number={level.number}
              sceneKey={level.sceneKey}
              image={level.image}
              comingSoon={level.comingSoon}
              completed={levelsCompleted >= level.number}
              selectLevel={handleContinue}
              locked={level.number > highestUnlockedLevel}
              key={level.number}
            />
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mb: 6,
            [muiTheme.breakpoints.up("xl")]: {
              mb: 10
            }
          }}
        >
          <SquareButton
            sx={{
              paddingY: 1.4,
              paddingX: 4,
              [muiTheme.breakpoints.up("lg")]: {
                paddingY: 2
              },
              color: muiTheme.palette.text.secondary,
              background: muiTheme.palette.secondary.main,
              "&:hover": {
                backgroundColor: muiTheme.palette.text.secondary,
                color: muiTheme.palette.secondary.main
              }
            }}
            onClick={() => {
              handleContinue();
            }}
          >
            <Typography variant="h4">Continue</Typography>
          </SquareButton>
        </Box>
      </Box>
    </Zoom>
  );
}
