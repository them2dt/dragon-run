import React, { createContext, useState } from "react";

export interface Alert {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
  hideDuration?: number | null;
}

interface AlertContextType {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
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

  return <AlertContext.Provider value={{ alert, setAlert }}>{children}</AlertContext.Provider>;
};
export default AlertProvider;
