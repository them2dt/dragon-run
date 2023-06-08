import React, { createContext, useState, useMemo } from 'react';
import eventsCenter from 'utils/eventsCenter';
import EventKeys from 'constants/EventKeys';

type SettingsContextType = {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

type SettingsProviderProps = {
  children: React.ReactNode;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [volume, setVolume] = useState<number>(50);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useMemo(() => {
    eventsCenter.emit(EventKeys.ChangeVolume, volume)
  }, [volume]);

  return <SettingsContext.Provider value={{ volume, setVolume, fullscreen, setFullscreen }}>{children}</SettingsContext.Provider>;
};
export default SettingsProvider;
