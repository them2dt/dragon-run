import { StakePool, PoolStateEnum } from "@builderz/sporting-f1-sdk";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { Config } from "../types/types";
import { sortConfigsByStatus } from "../utils";

export const useConfig = () => {
  const [config, setConfig] = useState<Config>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { connection } = useConnection();

  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      try {
        let config: Config = await (await fetch("/race_list.json")).json();
        const updatedConfig = await Promise.all(
          config.map(async (race) => {
            if (race.poolAddress) {
              const stakePool = await StakePool.fromAccountAddress(
                connection,
                new PublicKey(race.poolAddress)
              );
              // Add new properties to the race object
              race.staked = Number(stakePool.totalStaked);
              race.status = PoolStateEnum[stakePool.poolState];
            }
            return race;
          })
        );

        const sortedConfig = sortConfigsByStatus(updatedConfig);

        setConfig(sortedConfig);
      } catch (error) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    };
    // Fetching config
    fetchConfig();
  }, []);

  return { config, loading, error };
};
