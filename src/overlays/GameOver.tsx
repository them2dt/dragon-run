import React from 'react';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import OverlayWrapper from 'components/OverlayWrapper';
import AnimatedOnViewTitleLg from 'components/animated/AnimatedOnViewTitleLg';
import AnimatedOnViewTitleMd from 'components/animated/AnimatedOnViewTitleMd';
import AnimatedPageDelayed from 'components/animated/AnimatedPageDelayed';
import AnimatedNewHighScoreTitle from 'components/animated/AnimatedNewHighScoreTitle';
import { Button, Typography, useTheme } from '@mui/material';


interface GameOverProps {
  newHighScore: number;
}

export default function GameOver({ newHighScore }: GameOverProps): JSX.Element {
  const muiTheme = useTheme();
  console.log('GameOver: ', newHighScore);
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
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: muiTheme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main,
                },
                width: '200px',
                height: '70px',
                [muiTheme.breakpoints.up('sm')]: { width: '300px', height: '80px' },
                [muiTheme.breakpoints.up('md')]: { width: '500px', height: '100px' },
              }}
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            >
              <Typography
                sx={{ fontSize: '2.2rem', [muiTheme.breakpoints.up('md')]: { fontSize: '3rem' } }}
                fontWeight={400}
                component="h3"
              >
                Play
              </Typography>
            </Button>
            <AnimatedOnViewTitleMd
              text="Press SPACE to Play Again"
              className="mx-auto py-0 text-gray-300 text-sm sm:text-xl md:text-xl mt-4 md:mt-8"
              delay={0}
            />
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPageDelayed>
  );
}
