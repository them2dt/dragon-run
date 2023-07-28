import React from "react";
import AnimatedPage from "components/animated/AnimatedPage";
import OverlayWrapper from "components/OverlayWrapper";
import LoadingFullScreen from "components/loading/LoadingFullScreen";

interface LoadingProps {
  progress?: number;
  loadingDescription?: string;
}

export default function Loading({ progress, loadingDescription }: LoadingProps) {
  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <LoadingFullScreen active={true} progress={progress} description={loadingDescription} />
      </OverlayWrapper>
    </AnimatedPage>
  );
}
