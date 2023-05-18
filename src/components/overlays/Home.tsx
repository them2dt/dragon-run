import React from 'react';
import logo from '../../assets/logo.png';
import { useOverlay } from '../../context/useOverlay';
import OverlayKeys from '../../consts/OverlayKeys';

export default function Home() {
  const { setOverlay } = useOverlay();

  return (
    <div className="home">
      <div className="home-title">
        <img src={logo} alt="logo" />
      </div>
      <div className="home-buttons">
        <button className="home-button" onClick={() => setOverlay(OverlayKeys.Game)}>
          Play
        </button>
      </div>
    </div>
  );
}
