import React, { useEffect, useState } from "react";
import AnimatedPage from "components/animated/AnimatedPage";
import OverlayWrapper from "components/OverlayWrapper";
import GameNavBar from "components/game-menu/GameNavBar";
import GameMenu from "components/game-menu/GameMenu";
import eventsCenter from "utils/eventsCenter";
import EventKeys from "constants/EventKeys";
import LeaderboardMenu from "components/leaderboard/LeaderboardMenu";
import { Button, useTheme } from "@mui/material";
import AnimatedRunText from "components/animated/AnimatedRunText";
import SettingsMenu from "components/SettingsMenu";
import InventoryDialog from "components/inventory/InventoryDialog";
import ControlsTutorial from "components/ControlsTutorial";
import ShopDialog from "components/shop/ShopDialog";

export default function Game() {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<number | undefined>(undefined);
  const [score, setScore] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showRun, setShowRun] = useState(false);

  useEffect(() => {
    eventsCenter.on(EventKeys.UpdateScore, (score: number) => {
      setScore(score);
    });
    eventsCenter.on(EventKeys.StartGame, () => {
      setShowControls(false);
    });
    eventsCenter.on(EventKeys.GoToGame, () => {
      setShowControls(true);
    });
    eventsCenter.on(EventKeys.Run, () => {
      setShowRun(true);
      setTimeout(() => {
        setShowRun(false);
      }, 2000);
    });
    return () => {
      eventsCenter.off(EventKeys.UpdateScore);
    };
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    eventsCenter.emit(EventKeys.PauseGame);
  };
  const closeMenu = () => {
    setMenuOpen(false);
    eventsCenter.emit(EventKeys.ResumeGame);
  };

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

  const openInventory = () => {
    setInventoryOpen(true);
  };
  const closeInventory = () => {
    setInventoryOpen(false);
  };

  const openShop = () => {
    setDefaultTab(undefined);
    setShopOpen(true);
  };
  const closeShop = () => {
    setShopOpen(false);
  };

  const goToShop = () => {
    setDefaultTab(0);
    setShopOpen(true);
  };

  return (
    <AnimatedPage>
      <OverlayWrapper className="z-50 fixed top-0 left-0 pointer-events-none">
        <GameMenu
          menuOpen={menuOpen}
          closeMenu={closeMenu}
          openLeaderboard={openLeaderboard}
          openSettings={openSettings}
          openInventory={openInventory}
          openShop={openShop}
        />
        <LeaderboardMenu leaderboardOpen={leaderboardOpen} closeLeaderboard={closeLeaderboard} />
        <SettingsMenu settingsOpen={settingsOpen} closeSettings={closeSettings} />
        <ShopDialog shopOpen={shopOpen} closeShop={closeShop} defaultTab={defaultTab} />
        <InventoryDialog inventoryOpen={inventoryOpen} closeInventory={closeInventory} openShop={goToShop} />
        <GameNavBar>
          <div className="fixed z-40 left-[16px] top-[12px] h-[32px] w-[60px]">
            <Button
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 6,
                color: "#000000",
                pointerEvents: "auto",
                ":hover": { backgroundColor: theme.palette.secondary.main }
              }}
              onClick={openMenu}
            >
              Menu
            </Button>
          </div>
          <h1 className="flex w-max mx-auto mt-[12px] text-cC text-2xl sm:text-2xl md:text-4xl">Score: {score}</h1>
        </GameNavBar>
        <div className="fixed z-10 w-full h-full">{showRun && <AnimatedRunText />}</div>
        {showControls && <ControlsTutorial />}
      </OverlayWrapper>
    </AnimatedPage>
  );
}
