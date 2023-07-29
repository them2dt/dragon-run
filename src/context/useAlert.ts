import { useContext } from "react";
import { AlertContext } from "./AlertProvider";

export function useAlert() {
  const context = useContext(AlertContext);

  if (context == null) {
    throw new Error("useAlert has to be used within <AlertContext.Provider>");
  }
  return context;
}
