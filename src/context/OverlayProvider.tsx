import { createContext, useState} from 'react';
import Home from '../overlays/Home';



type OverlayContextType = {
  overlay: JSX.Element;
  setOverlay: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

type OverlayProviderProps = {
  children: React.ReactNode;
}

export const OverlayContext = createContext<OverlayContextType>(null!);

export const OverlayProvider = ({ children }: OverlayProviderProps) => {

  const [overlay, setOverlay] = useState<JSX.Element>(<Home />);

  return (
    <OverlayContext.Provider value={{overlay, setOverlay}}>
      {children} 
    </OverlayContext.Provider>
  );
}
export default OverlayProvider;