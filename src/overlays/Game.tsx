import React, { useState } from 'react';
import menu from '@assets/icons/menu.png';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import GameNavBar from 'components/GameNavBar';
import GameMenu from 'components/GameMenu';

export default function Game() {

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <AnimatedPage>
      <OverlayWrapper className='z-50 fixed top-0 left-0 pointer-events-none'>
        <GameMenu menuOpen={menuOpen} closeMenu={closeMenu} />
        <GameNavBar>
          <button className="w-full mx-auto flex flex-col align-top self-start pointer-events-auto bg-none" onClick={openMenu}>
            <img src={menu} alt="logo" className="m-auto w-auto h-10 md:h-14 lg:h-16 rendering-pixelated" />
          </button>
        </GameNavBar>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
