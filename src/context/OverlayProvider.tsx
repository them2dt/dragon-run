import { createContext, useState} from 'react';
import Home from '../overlays/Home';

type Overlay = {
  overlay: string;
}

type OverlayContextType = {
  overlay: string;
  setOverlay: React.Dispatch<React.SetStateAction<string>>;
}

type OverlayProviderProps = {
  children: React.ReactNode;
}

export const OverlayContext = createContext<OverlayContextType>(null!);

export const OverlayProvider = ({ children }: OverlayProviderProps) => {

  const [overlay, setOverlay] = useState<string>("Home");

  return (
    <OverlayContext.Provider value={{overlay, setOverlay}}>
      {children} 
    </OverlayContext.Provider>
  );
}
export default OverlayProvider;