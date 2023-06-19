import React, { useEffect, useState } from 'react';
import logo from '@assets/Dragon_Run_Logo_Cropped.png';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import Leaderboard from 'components/leaderboard/LeaderboardMenu';
import SettingsMenu from 'components/SettingsMenu';
import { Grid, Typography, useTheme } from '@mui/material';
import HomeNavBar from 'components/HomeNavBar';
import { SquareButton } from 'components/styled/SquareButton';
import ChooseCharacterDialog from 'components/choose-character/ChooseCharacterDialog';
import InventoryDialog from 'components/inventory/InventoryDialog';

export default function Home() {
  const muiTheme = useTheme();
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chooseCharacterOpen, setChooseCharacterOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<number | undefined>(undefined); // 0 = Knights, 1 = Crates, 2 = Shop

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
    if (chooseCharacterOpen) return;
    eventsCenter.emit(EventKeys.OpenChooseCharacter);
  };
  const closeChooseCharacter = () => {
    if (!chooseCharacterOpen) return;
    eventsCenter.emit(EventKeys.CloseChooseCharacter);
  };

  const openInventory = () => {
    setDefaultTab(undefined);
    setInventoryOpen(true);
  };
  const closeInventory = () => {
    setInventoryOpen(false);
  };

  const openShop = () => {
    setDefaultTab(2);
    setInventoryOpen(true);
  };

  useEffect(() => {
    eventsCenter.on(EventKeys.OpenChooseCharacter, () => {
      setChooseCharacterOpen(true);
    });
    eventsCenter.on(EventKeys.CloseChooseCharacter, () => {
      setChooseCharacterOpen(false);
    });
    return () => {
      eventsCenter.off(EventKeys.OpenChooseCharacter);
      eventsCenter.off(EventKeys.CloseChooseCharacter);
    };
  }, []);

  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <Leaderboard leaderboardOpen={leaderboardOpen} closeLeaderboard={closeLeaderboard} />
        <SettingsMenu settingsOpen={settingsOpen} closeSettings={closeSettings} />
        <ChooseCharacterDialog
          chooseCharacterOpen={chooseCharacterOpen}
          closeChooseCharacter={closeChooseCharacter}
          openShop={openShop}
        />
        <InventoryDialog inventoryOpen={inventoryOpen} closeInventory={closeInventory} defaultTab={defaultTab} />
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
                  backgroundColor: muiTheme.palette.fourth.main,
                  '&:hover': { backgroundColor: muiTheme.palette.text.secondary, color: muiTheme.palette.fourth.main }
                }}
                fullWidth
                onClick={openInventory}
              >
                <Typography variant="h6">Inventory</Typography>
              </SquareButton>
            </Grid>
            <Grid item xs={6}>
              <SquareButton
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: muiTheme.palette.fourth.main,
                  '&:hover': { backgroundColor: muiTheme.palette.text.secondary, color: muiTheme.palette.fourth.main }
                }}
                fullWidth
                onClick={openLeaderboard}
              >
                <Typography variant="h6">Leaderboard</Typography>
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
                <Typography variant="h3">Play</Typography>
              </SquareButton>
            </Grid>
          </Grid>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
