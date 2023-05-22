import React from 'react';
import logo from '@assets/Dragon_Run_Logo.png';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';

export default function Store() {
  return (
    <AnimatedPage>
      <OverlayWrapper>
        <div className="w-full h-full m-auto flex flex-col py-10 max-w-[1240px]">
          <img src={logo} alt="logo" className="m-auto" />
          <div className="grid grid-cols-2 gap-4 p-4 h-80">
            <AnimatedButton
              text="Store"
              className="m-auto w-full col-span-1 bg-cA"
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            />
            <AnimatedButton
              text="Leaderboard"
              className="m-auto w-full col-span-1 bg-cD"
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            />
            <AnimatedButton
              text="Play"
              className="m-auto w-full col-span-2"
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            />
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
