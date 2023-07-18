import React, { useMemo } from "react";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import OverlayWrapper from "components/OverlayWrapper";
import AnimatedPageDelayed from "components/animated/AnimatedPageDelayed";
import AnimatedNewHighScoreTitle from "components/animated/AnimatedNewHighScoreTitle";
import { Typography, useTheme, Box } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";
import { grey } from "@mui/material/colors";
import { useFirestore } from "@context/useFirestore";

interface LevelCompleteProps {
  scoreBeforeBonus: number;
  time: number;
  timeBonus: number;
  newHighScore: number;
  levelCompleted: number;
}

export default function LevelComplete({
  newHighScore,
  scoreBeforeBonus,
  time,
  timeBonus,
  levelCompleted
}: LevelCompleteProps): JSX.Element {
  const muiTheme = useTheme();
  const { firestoreFunctions } = useFirestore();

  useMemo(() => {
    firestoreFunctions.levelComplete(levelCompleted);
  }, [levelCompleted]);

  return (
    <AnimatedPageDelayed>
      <OverlayWrapper className=" bg-black overflow-hidden">
        <div className="w-full h-full m-auto flex flex-col pb-4 pt-10 md:pt-14 lg:pt-16 max-w-[1240px] text-center">
          <div className="mx-auto my-auto">
            {newHighScore > 0 && <AnimatedNewHighScoreTitle text="New High Score!!!" className="mx-auto" />}
            <Typography variant="h2" sx={{ color: muiTheme.palette.secondary.main, my: 2 }}>
              Level {levelCompleted} Complete!
            </Typography>
            <Box sx={{ my: 1 }}>
              <Typography variant="h6" sx={{ color: grey[200] }}>
                Score: {scoreBeforeBonus}
              </Typography>
              <Typography variant="h6" sx={{ color: grey[200] }}>
                Time: {time}s
              </Typography>
              <Typography variant="h6" sx={{ color: grey[200] }}>
                Time Bonus: {timeBonus}
              </Typography>
              <Typography variant="h4" sx={{ mt: 0.6, color: "#a3e635" }}>
                Total Score: {scoreBeforeBonus + timeBonus}
              </Typography>
            </Box>
            <SquareButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: muiTheme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main
                },
                my: 1,
                minWidth: "200px",
                minHeight: "70px",
                py: "10px",
                px: "20px",
                [muiTheme.breakpoints.up("sm")]: { minWidth: "300px", minHeight: "80px", px: "30px" },
                [muiTheme.breakpoints.up("md")]: { minWidth: "400px", px: "40px" },
                [muiTheme.breakpoints.up("lg")]: { mt: 3 }
              }}
              onClick={() => eventsCenter.emit(EventKeys.RestartGame)}
            >
              <Typography variant="h3" noWrap>
                Play Again
              </Typography>
            </SquareButton>
            <Typography variant="body1" sx={{ color: grey[400] }}>
              Press SPACE to Play Again
            </Typography>
          </div>
          <div className="mx-auto mb-4">
            <SquareButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: muiTheme.palette.background.light,
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.background.light
                },
                width: "160px",
                height: "40px",
                [muiTheme.breakpoints.up("sm")]: { width: "200px", height: "50px" },
                [muiTheme.breakpoints.up("md")]: { width: "300px", height: "60px" }
              }}
              onClick={() => eventsCenter.emit(EventKeys.GoToHome)}
            >
              <Typography variant="h4">Home</Typography>
            </SquareButton>
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPageDelayed>
  );
}
