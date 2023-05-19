import React from 'react';
import logo from '@assets/Dragon_Run_Logo.png';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from '@events-center';
import EventKeys from '@consts/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';

export default function Home() {
  return (
    <AnimatedPage>
      <OverlayWrapper>
        <div className="w-full h-full max-h-screen m-auto flex flex-col py-4 max-w-[1240px]">
          <div className="h-full max-h-[70%]">
            <img src={logo} alt="logo" className="m-auto w-auto h-full md:px-20 rendering-pixelated" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 p-4">
            <AnimatedButton
              text="Store"
              className="m-auto w-full col-span-1 bg-cD md:text-2xl line-through"
            />
            <AnimatedButton
              text="Leaderboard"
              className="m-auto w-full col-span-1 bg-cD md:text-2xl line-through"
            />
            <AnimatedButton
              text="Play"
              className="m-auto w-full col-span-2 py-5 text-3xl md:text-5xl"
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            />
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
