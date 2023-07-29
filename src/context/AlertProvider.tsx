import type AlertSeverityKeys from "@consts/AlertSeverityKeys";
import React, { createContext, useState } from "react";

export interface Alert {
  open: boolean;
  message: string;
  severity: AlertSeverityKeys | undefined;
  hideDuration?: number | null;
}

interface AlertContextType {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
  newAlert: (message: string, severity: AlertSeverityKeys, hideDuration?: number | null) => void;
}

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<Alert>({
    open: false,
    message: "",
    severity: undefined,
    hideDuration: null
  });

  const newAlert = (message: string, severity: AlertSeverityKeys, hideDuration?: number | null) => {
    setAlert({
      open: true,
      message,
      severity,
      hideDuration
    });
  };

  return <AlertContext.Provider value={{ alert, setAlert, newAlert }}>{children}</AlertContext.Provider>;
};
export default AlertProvider;
