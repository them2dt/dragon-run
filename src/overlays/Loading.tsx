import React from 'react';
import AnimatedPage from 'components/animated/AnimatedPage';
import OverlayWrapper from 'components/OverlayWrapper';
import LoadingSpinner from 'components/animated/LoadingSpinner';

export default function Loading() {
  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-gradient-to-b from-bg1 to-bg2 overflow-hidden">
        <LoadingSpinner className='m-auto'/>
      </OverlayWrapper>
    </AnimatedPage>
  );
}
