import React, { useState } from 'react';
import logo from '@assets/Dragon_Run_Logo_Cropped.png';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import SettingsMenu from 'components/SettingsMenu';
import { Grid, Button, Typography, useTheme, Box, Paper } from '@mui/material';
import StoreNavBar from 'components/StoreNavBar';
import theme from '@consts/theme/theme';

export default function Store() {
  const muiTheme = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const openSettings = () => {
    setSettingsOpen(true);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <SettingsMenu settingsOpen={settingsOpen} closeSettings={closeSettings} />
        <StoreNavBar openSettings={openSettings} />
        <Box sx={{ height: '100%', marginX: 'auto' }}>
          <img src={logo} alt="logo" className="m-auto lg:w-[600px] h-auto rendering-pixelated" />
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: 2,
              paddingX: 2,
              [muiTheme.breakpoints.up('lg')]: { marginBottom: 10, paddingX: 6 },
            }}
          >
            <Grid item xs={6}>
              <Paper sx={{ backgroundColor: theme.colors.cD, height: '100%' }}>
                <Typography variant="h4" align="center" sx={{}}>
                  1000
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
