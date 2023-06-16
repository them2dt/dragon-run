import React, { useState } from 'react';
import logo from '@assets/Dragon_Run_Logo_Cropped.png';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import Leaderboard from 'components/leaderboard/LeaderboardMenu';
import SettingsMenu from 'components/SettingsMenu';
import { Grid, Typography, useTheme } from '@mui/material';
import HomeNavBar from 'components/HomeNavBar';
import theme from 'theme/theme';
import { SquareButton } from 'components/styled/SquareButton';
import ChooseCharacterDialog from 'components/choose-character/ChooseCharacterDialog';

export default function Home() {
  const muiTheme = useTheme();
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chooseCharacterOpen, setChooseCharacterOpen] = useState(false);

  const openLeaderboard = () => {
    setLeaderboardOpen(true);
  };

  const closeLeaderboard = () => {
    setLeaderboardOpen(false);
  };

  const openSettings = () => {
    setSettingsOpen(true);
  };

  const closeSettings = () => {
    setSettingsOpen(false);
  };

  const openChooseCharacter = () => {
    setChooseCharacterOpen(true);
    eventsCenter.emit(EventKeys.GoToChooseCharacter);
  };

  const closeChooseCharacter = () => {
    setChooseCharacterOpen(false);
  };

  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <Leaderboard leaderboardOpen={leaderboardOpen} closeLeaderboard={closeLeaderboard} />
        <SettingsMenu settingsOpen={settingsOpen} closeSettings={closeSettings} />
        <ChooseCharacterDialog
          chooseCharacterOpen={chooseCharacterOpen}
          closeChooseCharacter={closeChooseCharacter}
          openSettings={openSettings}
        />
        <HomeNavBar openSettings={openSettings} />
        <div className="w-full mx-auto h-full flex flex-col max-w-[1240px]">
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
              <SquareButton
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: theme.colors.cD,
                  '&:hover': { backgroundColor: muiTheme.palette.text.secondary, color: theme.colors.cD }
                }}
                fullWidth
                onClick={() => eventsCenter.emit(EventKeys.GoToStore)}
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    [muiTheme.breakpoints.up('sm')]: { fontSize: '1.2rem' },
                    [muiTheme.breakpoints.up('md')]: { fontSize: '2rem' }
                  }}
                  fontWeight={400}
                  component="h5"
                >
                  Store
                </Typography>
              </SquareButton>
            </Grid>
            <Grid item xs={6}>
              <SquareButton
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: theme.colors.cD,
                  '&:hover': { backgroundColor: muiTheme.palette.text.secondary, color: theme.colors.cD }
                }}
                fullWidth
                onClick={openLeaderboard}
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    [muiTheme.breakpoints.up('sm')]: { fontSize: '1.2rem' },
                    [muiTheme.breakpoints.up('md')]: { fontSize: '2rem' }
                  }}
                  fontWeight={400}
                  component="h5"
                >
                  Leaderboard
                </Typography>
              </SquareButton>
            </Grid>
            <Grid item xs={12}>
              <SquareButton
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: muiTheme.palette.secondary.main,
                  '&:hover': {
                    backgroundColor: muiTheme.palette.text.secondary,
                    color: muiTheme.palette.secondary.main
                  }
                }}
                fullWidth
                onClick={openChooseCharacter}
              >
                <Typography
                  sx={{ fontSize: '1.8rem', [muiTheme.breakpoints.up('md')]: { fontSize: '3rem' } }}
                  fontWeight={400}
                  component="h3"
                >
                  Play
                </Typography>
              </SquareButton>
            </Grid>
          </Grid>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
