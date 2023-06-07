import React from 'react';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import OverlayWrapper from 'components/OverlayWrapper';
import AnimatedOnViewTitleLg from 'components/animated/AnimatedOnViewTitleLg';
import AnimatedOnViewTitleMd from 'components/animated/AnimatedOnViewTitleMd';
import AnimatedPageDelayed from 'components/animated/AnimatedPageDelayed';
import AnimatedNewHighScoreTitle from 'components/animated/AnimatedNewHighScoreTitle';

interface GameOverProps {
  newHighScore: number;
}

export default function GameOver({ newHighScore }: GameOverProps): JSX.Element {
  console.log('GameOver: ', newHighScore);
  return (
    <AnimatedPageDelayed>
      <OverlayWrapper className=" bg-black overflow-hidden">
        <div className="w-full h-full m-auto flex flex-col pb-4 pt-10 md:pt-14 lg:pt-16 max-w-[1240px] text-center">
          <div className="mx-auto my-auto">
            {newHighScore > 0 && <AnimatedNewHighScoreTitle text="New High Score!!!" className="mx-auto" />}
            <AnimatedOnViewTitleLg
              text="Game Over"
              className="mx-auto py-0 mt-8 mb-2 text-3xl xs:text-5xl sm:text-7xl md:text-8xl"
              delay={0}
            />
            <AnimatedButton
              text="Play Again"
              className="m-auto w-full md:py-5 text-xl md:text-5xl px-4 md:px-6"
              onClick={() => eventsCenter.emit(EventKeys.GoToGame)}
            />
            <AnimatedOnViewTitleMd
              text="Press SPACE to Play Again"
              className="mx-auto py-0 text-gray-300 text-sm sm:text-xl md:text-xl mt-4"
              delay={0}
            />
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPageDelayed>
  );
}
