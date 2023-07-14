import React from "react";
import AnimatedPage from "components/animated/AnimatedPage";
import OverlayWrapper from "components/OverlayWrapper";
import LoadingSpinner from "components/loading/LoadingSpinner";

export default function Loading() {
  return (
    <AnimatedPage>
      <OverlayWrapper className="bg-bg3 overflow-hidden">
        <LoadingSpinner className="m-auto" />
      </OverlayWrapper>
    </AnimatedPage>
  );
}
