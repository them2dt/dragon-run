import React, { useEffect, useState } from "react";
// 3rd-parties
import { Grid, Typography, useTheme } from "@mui/material";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
//
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
// locals
import EventKeys from "constants/EventKeys";
import eventsCenter from "utils/eventsCenter";
import HomeNavBar from "components/HomeNavBar";
import SettingsMenu from "components/SettingsMenu";
import OverlayWrapper from "components/OverlayWrapper";
import logo from "@assets/Dragon_Run_Logo_Transparent.png";
import AnimatedPage from "components/animated/AnimatedPage";
import { SquareButton } from "components/styled/SquareButton";
import Leaderboard from "components/leaderboard/LeaderboardMenu";
import InventoryDialog from "components/inventory/InventoryDialog";
import ChooseCharacterDialog from "components/choose-character/ChooseCharacterDialog";

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
        <Leaderboard
          leaderboardOpen={leaderboardOpen}
          closeLeaderboard={closeLeaderboard}
        />
        <SettingsMenu
          settingsOpen={settingsOpen}
          closeSettings={closeSettings}
        />
        <ChooseCharacterDialog
          chooseCharacterOpen={chooseCharacterOpen}
          closeChooseCharacter={closeChooseCharacter}
          openShop={openShop}
        />
        <InventoryDialog
          inventoryOpen={inventoryOpen}
          closeInventory={closeInventory}
          defaultTab={defaultTab}
        />
        <HomeNavBar openSettings={openSettings} />
        <div className="w-full mx-auto h-full flex flex-col max-w-[1240px]">
          <img
            src={logo}
            alt="logo"
            className="m-auto px-5 lg:w-[560px] h-auto rendering-pixelated"
          />
          <Grid
            container
            spacing={2}
            sx={{
              marginBottom: 2,
              paddingX: 2,
              [muiTheme.breakpoints.up("lg")]: {
                marginBottom: 10,
                paddingX: 6
              }
            }}
          >
            <Grid item xs={4}>
              <SquareButton
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: muiTheme.palette.fourth.main,
                  "&:hover": {
                    backgroundColor: muiTheme.palette.text.secondary,
                    color: muiTheme.palette.fourth.main
                  }
                }}
                fullWidth
                onClick={openInventory}
              >
                <Typography variant="h6">
                  <FontAwesomeIcon icon={faRankingStar} />
                </Typography>
              </SquareButton>
            </Grid>
            <Grid item xs={4}>
              <SquareButton
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: muiTheme.palette.fourth.main,
                  "&:hover": {
                    backgroundColor: muiTheme.palette.text.secondary,
                    color: muiTheme.palette.fourth.main
                  }
                }}
                fullWidth
                onClick={openLeaderboard}
              >
                <Typography variant="h6">
                  <FontAwesomeIcon icon={faBox} />
                </Typography>
              </SquareButton>
            </Grid>
            <Grid item xs={4}>
              <SquareButton
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: muiTheme.palette.fourth.main,
                  "&:hover": {
                    backgroundColor: muiTheme.palette.text.secondary,
                    color: muiTheme.palette.fourth.main
                  }
                }}
                fullWidth
                onClick={openLeaderboard}
              >
                <Typography variant="h6">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Typography>
              </SquareButton>
            </Grid>
            <Grid item xs={12}>
              <SquareButton
                size="large"
                sx={{
                  backgroundColor: muiTheme.palette.secondary.main,
                  "&:hover": {
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
