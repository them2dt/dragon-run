import React, { useEffect, useState } from 'react';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import GameNavBar from 'components/GameNavBar';
import GameMenu from 'components/GameMenu';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import LeaderboardMenu from 'components/LeaderboardMenu';
import { Button, useTheme } from '@mui/material';
import AnimatedRunText from 'components/animated/AnimatedRunText';
import SettingsMenu from 'components/SettingsMenu';

export default function Game() {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [showRun, setShowRun] = useState(false);

  useEffect(() => {
    eventsCenter.on(EventKeys.UpdateScore, (score: number) => {
      setScore(score);
    });
    eventsCenter.on(EventKeys.Run, () => {
      setShowRun(true);
      setTimeout(() => {
        setShowRun(false);
      } , 2000);
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

  return (
    <AnimatedPage>
      <OverlayWrapper className="z-50 fixed top-0 left-0 pointer-events-none">
        <GameMenu menuOpen={menuOpen} closeMenu={closeMenu} openLeaderboard={openLeaderboard} openSettings={openSettings} />
        <LeaderboardMenu leaderboardOpen={leaderboardOpen} closeLeaderboard={closeLeaderboard} />
        <SettingsMenu menuOpen={settingsOpen} closeMenu={closeSettings} />
        <GameNavBar>
          <div className="fixed z-40 left-[16px] top-[12px] h-[32px] w-[60px]">
            <Button
              sx={{
                backgroundColor: '#ffffff',
                borderRadius: 6,
                color: '#000000',
                pointerEvents: 'auto',
                ':hover': { backgroundColor: theme.palette.secondary.main },
              }}
              onClick={openMenu}
            >
              Menu
            </Button>
          </div>
          <h1 className="flex w-max mx-auto mt-[12px] text-cC text-2xl sm:text-2xl md:text-4xl">Score: {score}</h1>
        </GameNavBar>
        <div className="fixed z-10 w-full h-full">{showRun && <AnimatedRunText className="" />}</div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
