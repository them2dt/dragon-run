import React, { useEffect, useState } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faRankingStar, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import EventKeys from "constants/EventKeys";
import eventsCenter from "utils/eventsCenter";
import OverlayWrapper from "components/OverlayWrapper";
import logo from "@assets/Dragon_Run_Logo_Transparent.png";
import AnimatedPage from "components/animated/AnimatedPage";
import HomeNavBar from "components/HomeNavBar";
import SettingsMenu from "components/SettingsMenu";
import { SquareButton } from "components/styled/SquareButton";
import Leaderboard from "components/leaderboard/LeaderboardMenu";
import ShopDialog from "components/shop/ShopDialog";
import InventoryDialog from "components/inventory/InventoryDialog";
import ChooseCharacterDialog from "components/choose-character/ChooseCharacterDialog";

export default function Home() {
  const muiTheme = useTheme();
  const [shopOpen, setShopOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [chooseCharacterOpen, setChooseCharacterOpen] = useState(false);
  // 0 = Shop, 1 = Mint
  const [defaultTab, setDefaultTab] = useState<number | undefined>(undefined);

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

  const openLeaderboard = () => {
    setLeaderboardOpen(true);
  };
  const closeLeaderboard = () => {
    setLeaderboardOpen(false);
  };

  const openShop = () => {
    setDefaultTab(undefined);
    setShopOpen(true);
  };
  const closeShop = () => {
    setShopOpen(false);
  };
  const openInventory = () => {
    setDefaultTab(undefined);
    setInventoryOpen(true);
  };
  const closeInventory = () => {
    setInventoryOpen(false);
  };

  const goToShop = () => {
    setDefaultTab(1);
    setShopOpen(true);
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
          openShop={goToShop}
        />
        <InventoryDialog inventoryOpen={inventoryOpen} closeInventory={closeInventory} openShop={goToShop} />
        <ShopDialog shopOpen={shopOpen} closeShop={closeShop} defaultTab={defaultTab} />
        <HomeNavBar openSettings={openSettings} />
        <div className="w-full mx-auto h-full flex flex-col max-w-[1240px]">
          <img src={logo} alt="logo" className="m-auto px-5 lg:w-[560px] h-auto rendering-pixelated" />
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
                onClick={openLeaderboard}
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
                onClick={openInventory}
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
                onClick={openShop}
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
