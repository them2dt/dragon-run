import AlertSeverityKeys from "@consts/AlertSeverityKeys";
import React, { createContext, useState } from "react";

export interface Alert {
  open: boolean;
  message: string;
  severity: AlertSeverityKeys;
  hideDuration?: number;
  copyText?: string;
}

interface AlertContextType {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
  newAlert: (message: string, severity: AlertSeverityKeys, hideDuration?: number) => void;
}

interface AlertProviderProps {
  children: React.ReactNode;
}

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<Alert>({
    open: false,
    message: "",
    severity: AlertSeverityKeys.Info,
    hideDuration: 3000,
    copyText: ""
  });

  const newAlert = (message: string, severity: AlertSeverityKeys, hideDuration?: number, copyText?: string) => {
    if (hideDuration === undefined) {
      hideDuration = 3000;
    }
    if (copyText === undefined) {
      copyText = "";
    }
    setAlert({
      open: true,
      message,
      severity,
      hideDuration,
      copyText
    });
  };

  return <AlertContext.Provider value={{ alert, setAlert, newAlert }}>{children}</AlertContext.Provider>;
};
export default AlertProvider;
