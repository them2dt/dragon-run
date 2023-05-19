import React from 'react';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from '@events-center';
import EventKeys from '@consts/EventKeys';

export default function GameOver() {
  return (
    <div className="home">
      <div className="home-buttons">
        <AnimatedButton text="Play Again" onClick={() => eventsCenter.emit(EventKeys.GoToGame)} />
      </div>
    </div>
  );
}
