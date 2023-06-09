import { useContext } from 'react';
import { SettingsContext } from '@context/SettingsProvider';

export function useSettings() {
  const context = useContext(SettingsContext);

  if (context == null) {
    throw new Error('useSettings has to be used within <SettingsContext.Provider>');
  }
  return context;
}
