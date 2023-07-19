import { useContext } from "react";
import { GameDataContext } from "@context/GameDataProvider";

export function useGameData() {
  const context = useContext(GameDataContext);

  if (context == null) {
    throw new Error("useGameData has to be used within <GameDataContext.Provider>");
  }
  return context;
}
