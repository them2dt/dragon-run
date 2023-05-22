import React from 'react';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import OverlayWrapper from 'components/OverlayWrapper';
import AnimatedOnViewTitleLg from 'components/animated/AnimatedOnViewTitleLg';
import AnimatedOnViewTitleMd from 'components/animated/AnimatedOnViewTitleMd';
import AnimatedPageDelayed from 'components/animated/AnimatedPageDelayed';

export default function GameOver() {
  return (
    <AnimatedPageDelayed>
      <OverlayWrapper className=" bg-black overflow-hidden">
        <div className="w-full h-full m-auto flex flex-col pb-4 pt-10 md:pt-14 lg:pt-16 max-w-[1240px] text-center">
          <div className="mx-auto mt-auto">
            <AnimatedOnViewTitleLg
              text="Game Over"
              className="mx-auto mt-auto text-3xl xs:text-5xl sm:text-7xl md:text-8xl"
              delay={0}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 p-4 mb-auto mt-2 sm:mt-4 md:mt-6 lg:mt-8 mx-auto text-center min-h-[30%] ">
            <AnimatedButton
              text="Play Again"
              className="m-auto w-full col-span-2 md:py-5 text-xl md:text-5xl px-4 md:px-6"
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            />
            <AnimatedOnViewTitleMd
              text="Press SPACE to Play Again"
              className="mx-auto text-gray-300 text-sm sm:text-xl md:text-xl col-span-2"
              delay={0}
            />
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPageDelayed>
  );
}
