import React from 'react';
import AnimatedButton from 'components/animated/AnimatedButton';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import AnimatedEnterTitle from 'components/animated/AnimatedEnterText';

interface EnterProps {
  userName: string;
}

export default function Enter({ userName }: EnterProps) {
  const handleEnterClick = () => {
    eventsCenter.emit(EventKeys.GoToHome);
  };
  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <div className="w-full h-full m-auto flex flex-col max-w-[1240px] text-center">
          <div className="h-auto my-auto">
            <AnimatedEnterTitle userName={userName} />
            <AnimatedButton
              text="Enter"
              className="m-auto w-auto py-3 px-5 md:py-5 md:px-10 text-4xl sm:text-5xl md:text-6xl"
              onClick={() => handleEnterClick()}
            />
          </div>
        </div>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
