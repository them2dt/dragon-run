import React, { useEffect, useState } from 'react';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import GameNavBar from 'components/GameNavBar';
import GameMenu from 'components/GameMenu';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import LeaderboardMenu from 'components/LeaderboardMenu';
import { Button, useTheme } from '@mui/material';

export default function Game() {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    eventsCenter.on(EventKeys.UpdateScore, (score: number) => {
      setScore(score);
    });
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

  return (
    <AnimatedPage>
      <OverlayWrapper className="z-50 fixed top-0 left-0 pointer-events-none">
        <GameMenu menuOpen={menuOpen} closeMenu={closeMenu} openLeaderboard={openLeaderboard} />
        <LeaderboardMenu leaderboardOpen={leaderboardOpen} closeLeaderboard={closeLeaderboard} />
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
      </OverlayWrapper>
    </AnimatedPage>
  );
}
