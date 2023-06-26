import { useContext } from "react";
import { SolanaContext } from "./SolanaProvider";

export function useSolana() {
  const context = useContext(SolanaContext);

  if (context == null) {
    throw new Error("useFirestore has to be used within <SolanaContext.Provider>");
  }
  return context;
}
