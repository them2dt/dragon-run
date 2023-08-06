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
import PreGameDialog from "components/PreGameDialog";
import { useSolana } from "@context/useSolana";
import HomeScreen from "@assets/home-screen.png";
import HomeScreenSquare from "@assets/home-screen-square.png";

export default function Home(): JSX.Element {
  const muiTheme = useTheme();
  const { solanaFunctions } = useSolana();
  const [shopOpen, setShopOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [preGameOpen, setPreGameOpen] = useState(false);
  // 0 = Mint, 1 = Shop
  const [defaultTab, setDefaultTab] = useState<number | undefined>(undefined);

  const openSettings = () => {
    setSettingsOpen(true);
  };
  const closeSettings = () => {
    setSettingsOpen(false);
  };

  const openChooseCharacter = () => {
    if (preGameOpen) return;
    eventsCenter.emit(EventKeys.OpenChooseCharacter);
  };
  const closeChooseCharacter = () => {
    if (!preGameOpen) return;
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
    setDefaultTab(0);
    setShopOpen(true);
  };

  useEffect(() => {
    eventsCenter.on(EventKeys.OpenChooseCharacter, () => {
      setPreGameOpen(true);
    });
    eventsCenter.on(EventKeys.CloseChooseCharacter, () => {
      setPreGameOpen(false);
    });
    return () => {
      eventsCenter.off(EventKeys.OpenChooseCharacter);
      eventsCenter.off(EventKeys.CloseChooseCharacter);
    };
  }, []);

  useEffect(() => {
    solanaFunctions.getOwnedKnights().catch((err) => {
      console.log("Unable to get owned NFTs: ", err);
    });
  }, [shopOpen]);

  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-x-hidden">
          <img
            src={HomeScreen}
            className="absolute top-0 left-0 w-full h-full object-cover rendering-pixelated block md:hidden"
          />
          <img
            src={HomeScreenSquare}
            className="absolute top-0 left-0 w-full h-full object-cover rendering-pixelated hidden md:block"
          />
        </div>
        <Leaderboard leaderboardOpen={leaderboardOpen} closeLeaderboard={closeLeaderboard} />
        <SettingsMenu settingsOpen={settingsOpen} closeSettings={closeSettings} />
        <PreGameDialog preGameOpen={preGameOpen} closePreGame={closeChooseCharacter} openShop={goToShop} />
        <InventoryDialog inventoryOpen={inventoryOpen} closeInventory={closeInventory} openShop={goToShop} />
        <ShopDialog shopOpen={shopOpen} closeShop={closeShop} defaultTab={defaultTab} />
        <HomeNavBar openSettings={openSettings} />
        <div className="w-full mx-auto h-full flex flex-col max-w-[1240px] z-50">
          <img src={logo} alt="logo" className="m-auto pb-16 lg:pb-20 px-5 lg:w-[560px] h-auto rendering-pixelated" />
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
