import React, { useState } from 'react';
import logo from '@assets/Dragon_Run_Logo_Cropped.png';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import SettingsMenu from 'components/SettingsMenu';
import { Grid, Typography, useTheme, Box, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import StoreNavBar from 'components/StoreNavBar';
import theme from 'theme/theme';
import { Shop } from '@mui/icons-material';

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
        <Box sx={{ height: '100%', marginX: 'auto', width: '100%', maxWidth: '1240px' }}>
          <img src={logo} alt="logo" className="m-auto lg:w-[600px] h-auto rendering-pixelated" />
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: 2,
              paddingX: 2,
              [muiTheme.breakpoints.up('lg')]: { marginBottom: 10, paddingX: 6 }
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
          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
              maxWidth: '1240px',
              [muiTheme.breakpoints.up('sm')]: { fontSize: '1.2rem' },
              [muiTheme.breakpoints.up('md')]: { fontSize: '2rem' }
            }}
            elevation={3}
          >
            <BottomNavigation showLabels sx={{ width: '100%', backgroundColor: 'background.light' }}>
              <BottomNavigationAction label="Sell" icon={<Shop />} sx={{ width: '100%', minWidth: '50%' }} />
              <BottomNavigationAction label="Buy" icon={<Shop />} sx={{ width: '100%', minWidth: '50%' }} />
            </BottomNavigation>
          </Paper>
        </Box>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
