import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useWallet } from "./useWallet";
import { type CandyMachine } from "@metaplex-foundation/js";
import { getCandyMachine } from "../utils/candyMachine";

export const useCandyMachine = (reload?: number) => {
  const [cm, setCm] = useState<CandyMachine>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { publicKey } = useWallet();

  const { connection } = useConnection();

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      setError(false);

      try {
        const cm = await getCandyMachine(import.meta.env.VITE_CM, connection);
        setCm(cm);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    console.log("fetching nfts");
    fetchNFTs().catch(console.error);
  }, [connection, publicKey, reload]);

  return { cm, loading, error };
};
