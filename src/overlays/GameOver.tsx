import React from "react";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import OverlayWrapper from "components/OverlayWrapper";
import AnimatedPageDelayed from "components/animated/AnimatedPageDelayed";
import AnimatedNewHighScoreTitle from "components/animated/AnimatedNewHighScoreTitle";
import { Typography, useTheme } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";
import { grey } from "@mui/material/colors";

interface GameOverProps {
  newHighScore: number;
}

export default function GameOver({ newHighScore }: GameOverProps): JSX.Element {
  const muiTheme = useTheme();
  return (
    <AnimatedPageDelayed>
      <OverlayWrapper className=" bg-black overflow-hidden">
        <div className="w-full h-full m-auto flex flex-col pb-4 pt-10 md:pt-14 lg:pt-16 max-w-[1240px] text-center">
          <div className="mx-auto my-auto">
            {newHighScore > 0 && <AnimatedNewHighScoreTitle text="New High Score!!!" className="mx-auto" />}
            <Typography
              variant="h1"
              sx={{ color: muiTheme.palette.secondary.main, my: 2, [muiTheme.breakpoints.up("md")]: { my: 4 } }}
            >
              Game Over
            </Typography>
            <SquareButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: muiTheme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main
                },
                mb: 1,
                mt: 2,
                minWidth: "200px",
                minHeight: "70px",
                py: "10px",
                px: "20px",
                [muiTheme.breakpoints.up("sm")]: { minWidth: "300px", minHeight: "80px" },
                [muiTheme.breakpoints.up("md")]: { minWidth: "400px", px: "40px" }
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
