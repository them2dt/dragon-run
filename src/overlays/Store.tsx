import React from 'react';
import logo from '@assets/Dragon_Run_Logo.png';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import { Button, Grid } from '@mui/material';

export default function Store() {
  return (
    <AnimatedPage>
      <OverlayWrapper>
        <div className="w-full h-full m-auto flex flex-col py-10 max-w-[1240px]">
          <img src={logo} alt="logo" className="m-auto" />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={() => eventsCenter.emit(EventKeys.GoToGame)}>
                Play
              </Button>
            </Grid>
            <AnimatedButton
              text="Leaderboard"
              className="m-auto w-full col-span-1 bg-cD"
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            />
            <AnimatedButton
              text="Play"
              className="m-auto w-full col-span-2"
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            />
          </Grid>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
