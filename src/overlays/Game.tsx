import React, { useEffect, useState } from 'react';
import menu from '@assets/icons/menu.png';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import GameNavBar from 'components/GameNavBar';
import GameMenu from 'components/GameMenu';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import LeaderboardMenu from 'components/LeaderboardMenu';

export default function Game() {
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
          <button className="w-auto flex fixed z-40 left-0 pointer-events-auto bg-none m-3 lg:m-5" onClick={openMenu}>
            <img src={menu} alt="logo" className="my-auto w-auto h-10 md:h-14 lg:h-16 rendering-pixelated" />
          </button>
          <h1 className="flex w-max mx-auto my-auto text-cC text-2xl sm:text-2xl md:text-4xl">Score: {score}</h1>
        </GameNavBar>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
