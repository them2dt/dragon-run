import React, { createContext, useState, useMemo, useEffect } from "react";
import { Metaplex, type Metadata } from "@metaplex-foundation/js";
import type KnightNFT from "types/KnightNFT";
import axios from "axios";

export interface Solana {
  metaplex: Metaplex | null;
  ownedKnights: KnightNFT[] | [];
}

interface SolanaContextType {
  solana: Solana;
  setSolana: React.Dispatch<React.SetStateAction<Solana>>;
}

interface SolanaProviderProps {
  children: React.ReactNode;
}

export const SolanaContext = createContext<SolanaContextType | null>(null);

const defaultKnight: KnightNFT = {
  name: "Default",
  image: "",
  spritesheet: "",
  traits: { head: "", arms: "", torso: "", legs: "" }
};

export const SolanaProvider = ({ children }: SolanaProviderProps) => {
  const [metaplex, setMetaplex] = useState<Metaplex | null>(null);
  const [ownedKnights, setOwnedKnights] = useState<KnightNFT[]>([defaultKnight]);
  const [solana, setSolana] = useState<Solana>({
    metaplex,
    ownedKnights
  });

  const candyMachineCollection = import.meta.env.VITE_CM_COLLECTION;

  const getMetaplex = () => {
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      return;
    }
    const connection = xnftSolana?.connection;
    if (!connection) {
      return;
    }
    const pubkey = xnftSolana?.publicKey?.toString();
    if (!pubkey) {
      return;
    }
    const metaplex = Metaplex.make(connection);
    if (!metaplex) {
      return;
    }
    setMetaplex(metaplex);
  };

  const getOwnedKnights = async () => {
    if (!metaplex) {
      return;
    }
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      return;
    }
    const pubkey = xnftSolana?.publicKey?.toString();
    if (!pubkey) {
      return;
    }
    let ownedNFTs = await metaplex.nfts().findAllByOwner({
      owner: pubkey
    });
    ownedNFTs = ownedNFTs.filter((nft) => nft.collection?.address.toBase58() === candyMachineCollection) as Metadata[];
    const nfts: KnightNFT[] = [defaultKnight];
    ownedNFTs.map(async (nft) => {
      await axios.get(nft.uri).then((res) => {
        const data: KnightNFT = {
          name: res.data?.name,
          image: res.data?.properties?.files[0]?.uri,
          spritesheet: res.data?.properties?.files[1]?.uri,
          traits: {
            head: res.data?.attributes[2]?.value,
            arms: res.data?.attributes[0]?.value,
            torso: res.data?.attributes[5]?.value,
            legs: res.data?.attributes[3]?.value
          }
        };
        nfts.push(data);
      });
    });
    setOwnedKnights(nfts);
  };

  const getSigniature = async () => {
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      return;
    }
    const connection = xnftSolana?.connection;
    if (!connection) {
      return;
    }
    const pubkey = xnftSolana?.publicKey;
    if (!pubkey) {
      return;
    }
    const message = Buffer.from("Sign in with Backpack");
    const signiature = await xnftSolana?.signMessage(message, pubkey).catch((err: any) => {
      console.log("Unable to sign message: ", err);
    });
    console.log("signiature: ", signiature);
  };

  useMemo(() => {
    if (!metaplex) return;
    getOwnedKnights().catch((err) => {
      console.log("Unable to get owned NFTs: ", err);
    });
  }, [metaplex]);

  useMemo(() => {
    if (!metaplex) return;
    setSolana({
      metaplex,
      ownedKnights
    });
  }, [metaplex, ownedKnights]);

  useEffect(() => {
    window?.xnft?.solana?.on("connect", () => {
      getMetaplex();
      getSigniature().catch((err) => {
        console.log("Unable to get signiature: ", err);
      });
    });
    window?.xnft?.solana?.on("publicKeyUpdate", () => {
      getMetaplex();
    });
    window?.xnft?.solana?.on("connectionUpdate", () => {
      getMetaplex();
    });
  }, []);

  return <SolanaContext.Provider value={{ solana, setSolana }}>{children}</SolanaContext.Provider>;
};
export default SolanaProvider;
