import React from "react";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import OverlayWrapper from "components/OverlayWrapper";
import AnimatedOnViewTitleLg from "components/animated/AnimatedOnViewTitleLg";
import AnimatedOnViewTitleMd from "components/animated/AnimatedOnViewTitleMd";
import AnimatedPageDelayed from "components/animated/AnimatedPageDelayed";
import AnimatedNewHighScoreTitle from "components/animated/AnimatedNewHighScoreTitle";
import { Typography, useTheme } from "@mui/material";
import { SquareButton } from "components/styled/SquareButton";

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
            <AnimatedOnViewTitleLg
              text="Game Over"
              className="mx-auto py-0 mt-6 mb-10 text-3xl xs:text-5xl sm:text-7xl md:text-8xl"
              delay={0}
            />
            <SquareButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: muiTheme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main
                },
                width: "200px",
                height: "70px",
                [muiTheme.breakpoints.up("sm")]: { width: "300px", height: "80px" },
                [muiTheme.breakpoints.up("md")]: { width: "500px", height: "100px" }
              }}
              onClick={() => eventsCenter.emit(EventKeys.RestartGame)}
            >
              <Typography variant="h3">Play</Typography>
            </SquareButton>
            <AnimatedOnViewTitleMd
              text="Press SPACE to Play Again"
              className="mx-auto py-0 text-gray-300 text-sm sm:text-xl md:text-xl mt-4 md:mt-8"
              delay={0}
            />
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
