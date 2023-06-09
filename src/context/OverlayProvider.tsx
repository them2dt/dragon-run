import React, { createContext, useState } from 'react';
import OverlayKeys from '../constants/OverlayKeys';

interface OverlayContextType {
  overlay: OverlayKeys;
  setOverlay: React.Dispatch<React.SetStateAction<OverlayKeys>>;
}

interface OverlayProviderProps {
  children: React.ReactNode;
}

export const OverlayContext = createContext<OverlayContextType | null>(null);

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [overlay, setOverlay] = useState<OverlayKeys>(OverlayKeys.Preloader);

  return <OverlayContext.Provider value={{ overlay, setOverlay }}>{children}</OverlayContext.Provider>;
};
export default OverlayProvider;
