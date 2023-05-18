import React from 'react';
import { useOverlay } from '@context/useOverlay';
import OverlayKeys from '@consts/OverlayKeys';

export default function Loading() {
  const { setOverlay } = useOverlay();

  return (
    <div className="home">
      <div className="home-buttons">
        <button className="home-button">
          Loading
        </button>
      </div>
    </div>
  );
}
