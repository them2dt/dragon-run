import React, { useState } from 'react';
import menu from '@assets/icons/menu.png';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import { useTheme } from '@mui/material';
import GameNavBar from 'components/GameNavBar';
import GameMenu from 'components/GameMenu';

export default function Game() {

  const [menuOpen, setMenuOpen] = useState(false);

  const theme = useTheme();

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <AnimatedPage>
      <OverlayWrapper>
        <GameMenu menuOpen={menuOpen} closeMenu={closeMenu} />
        <GameNavBar>
          <button className="w-full mx-auto flex flex-col align-top self-start" onClick={openMenu}>
            <img src={menu} alt="logo" className="m-auto w-auto h-10 md:h-14 lg:h-16 rendering-pixelated" />
          </button>
        </GameNavBar>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
