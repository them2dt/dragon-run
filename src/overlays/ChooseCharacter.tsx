import React from 'react';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import { Typography, useTheme } from '@mui/material';
import { SquareButton } from 'components/styled/SquareButton';
import loadCharacter from 'utils/loadCharacter';
import AnimatedOnViewTitleMd from 'components/animated/AnimatedOnViewTitleMd';

export default function ChooseCharacter() {
  const muiTheme = useTheme();
  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <div className="w-full h-full m-auto flex flex-col max-w-[1240px] text-center">
          <div className="h-auto my-auto">
            <AnimatedOnViewTitleMd text="Choose character:" delay={0} className="" />
            <SquareButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: muiTheme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main
                },
                width: '200px',
                height: '70px',
                [muiTheme.breakpoints.up('sm')]: { width: '300px', height: '80px' },
                [muiTheme.breakpoints.up('md')]: { width: '500px', height: '100px' }
              }}
              onClick={() => {
                loadCharacter(null, EventKeys.GoToGame);
              }}
            >
              <Typography
                sx={{ fontSize: '2.2rem', [muiTheme.breakpoints.up('md')]: { fontSize: '3rem' } }}
                fontWeight={400}
                component="h3"
              >
                Default
              </Typography>
            </SquareButton>
            <SquareButton
              variant="contained"
              size="large"
              sx={{
                backgroundColor: muiTheme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: muiTheme.palette.text.secondary,
                  color: muiTheme.palette.secondary.main
                },
                width: '200px',
                height: '70px',
                [muiTheme.breakpoints.up('sm')]: { width: '300px', height: '80px' },
                [muiTheme.breakpoints.up('md')]: { width: '500px', height: '100px' }
              }}
              onClick={() => {
                loadCharacter(
                  'https://bafybeiabmrvyz7ibdxc72hyxru5wbw2naix44wwtiqxuno7xf6go3gj5dq.ipfs.nftstorage.link/14.png',
                  EventKeys.GoToGame
                );
              }}
            >
              <Typography
                sx={{ fontSize: '2.2rem', [muiTheme.breakpoints.up('md')]: { fontSize: '3rem' } }}
                fontWeight={400}
                component="h3"
              >
                Custom
              </Typography>
            </SquareButton>
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
