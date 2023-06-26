import { useContext } from "react";
import { OverlayContext } from "./OverlayProvider";

export function useOverlay() {
  const context = useContext(OverlayContext);

  if (context == null) {
    throw new Error("useOverlay has to be used within <OverlayContext.Provider>");
  }
  return context;
}
