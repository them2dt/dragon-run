import React, {useState} from 'react';
import logo from '@assets/Dragon_Run_Logo_Cropped.png';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import Leaderboard from 'components/Leaderboard';

export default function Home() {
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const openLeaderboard = () => {
    setLeaderboardOpen(true);
  };

  const closeLeaderboard = () => {
    setLeaderboardOpen(false);
  };

  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <Leaderboard leaderboardOpen={leaderboardOpen} closeLeaderboard={closeLeaderboard} />
        <div className="w-full h-full m-auto flex flex-col py-4 max-w-[1240px]">
          <div className="h-auto my-auto">
            <img src={logo} alt="logo" className="m-auto lg:w-[600px] h-auto rendering-pixelated" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 p-4 mt-auto">
            <AnimatedButton text="Store" className="m-auto w-full col-span-1 bg-cD md:text-2xl line-through" />
            <AnimatedButton text="Leaderboard" className="m-auto w-full col-span-1 bg-cD md:text-2xl" onClick={openLeaderboard} />
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
