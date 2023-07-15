import React, { createContext, useState, useMemo, useEffect } from "react";
import { Metaplex, type Metadata, walletAdapterIdentity } from "@metaplex-foundation/js";
import type KnightNFT from "types/KnightNFT";
import { useFirestore } from "./useFirestore";
import { encode } from "bs58";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";

export interface Solana {
  publicKey: string | null;
  metaplex: Metaplex | null;
  ownedKnights: KnightNFT[] | [];
}

interface SolanaContextType {
  solana: Solana;
  setSolana: React.Dispatch<React.SetStateAction<Solana>>;
  solanaFunctions: {
    getPublicKey: () => void;
    getSignature: (message: string) => void;
    getAuthSignature: (userName: string) => Promise<void>;
    getOwnedKnights: () => Promise<void>;
  };
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
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [metaplex, setMetaplex] = useState<Metaplex | null>(null);
  const [ownedKnights, setOwnedKnights] = useState<KnightNFT[]>([defaultKnight]);
  const [solana, setSolana] = useState<Solana>({
    publicKey,
    metaplex,
    ownedKnights
  });
  const { firestoreCallableFunctions, firestoreFunctions } = useFirestore();

  const candyMachineCollection = import.meta.env.VITE_CM_COLLECTION;

  const getPublicKey = () => {
    const xnft = window?.xnft;
    if (!xnft) {
      return;
    }
    const userName = xnft?.metadata?.userId;
    if (userName === "" || userName == null) {
      return;
    }
    axios
      .get("https://xnft-api-server.xnfts.dev/v1/users", { params: { user_id: userName } })
      .then((res) => {
        const data = res.data;
        if (data?.user?.publicKeys == null) {
          throw new Error("No public key found");
        }
        const solanaPubkey = data?.user?.publicKeys?.map((publicKey: any) => {
          if (publicKey.blockchain === "solana") {
            return publicKey.publicKey;
          }
          return null;
        });
        if (solanaPubkey == null) {
          throw new Error("No public key found");
        } else {
          setPublicKey(solanaPubkey[0]);
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const getMetaplex = () => {
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      return;
    }
    const connection = xnftSolana?.connection;
    if (!connection) {
      return;
    }
    if (!publicKey) {
      return;
    }
    const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(xnftSolana));
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
    if (!publicKey) {
      return;
    }
    const pubkey = new PublicKey(publicKey);
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

  const getSignature = async (message: string) => {
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      throw new Error("No solana provider found");
    }
    const connection = xnftSolana?.connection;
    if (!connection) {
      throw new Error("No connection found");
    }
    if (!publicKey) {
      return;
    }
    const pubkey = new PublicKey(publicKey);
    const messageBuffer = Buffer.from(message);
    const signature = await xnftSolana?.signMessage(messageBuffer, pubkey).catch((err: any) => {
      console.log("Signature error: ", JSON.stringify(err));
    });
    return signature;
  };

  const getAuthSignature = async (userName: string) => {
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      return;
    }
    const connection = xnftSolana?.connection;
    if (!connection) {
      return;
    }
    if (!publicKey) {
      return;
    }
    await firestoreCallableFunctions
      ?.getAuthMessage(userName, publicKey)
      .then(async (messageData: any) => {
        const message = messageData.message;
        if (!message) {
          throw new Error("No message found");
        }
        await getSignature(message)
          .then(async (signature) => {
            signature = encode(signature);
            await firestoreCallableFunctions
              ?.getAuthToken(userName, publicKey, signature, messageData.signatureID)
              .then(async (token: any) => {
                await firestoreFunctions?.signInWithToken(token);
              })
              .catch((err: any) => {
                throw new Error(err.message);
              });
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      })
      .catch((err: any) => {
        throw new Error("Auth error: " + err.message);
      });
  };

  useMemo(() => {
    if (!metaplex) {
      getMetaplex();
    } else {
      getOwnedKnights().catch((err) => {
        console.log("Unable to get owned NFTs: ", err);
      });
    }
  }, [publicKey]);

  useMemo(() => {
    if (!metaplex) return;
    getOwnedKnights().catch((err) => {
      console.log("Unable to get owned NFTs: ", err);
    });
  }, [metaplex]);

  useMemo(() => {
    if (!metaplex) return;
    setSolana({
      publicKey,
      metaplex,
      ownedKnights
    });
  }, [publicKey, metaplex, ownedKnights]);

  useEffect(() => {
    window?.xnft?.solana?.on("connect", () => {
      getMetaplex();
    });
  }, []);

  const solanaFunctions = {
    getPublicKey,
    getSignature,
    getAuthSignature,
    getOwnedKnights
  };

  return <SolanaContext.Provider value={{ solana, setSolana, solanaFunctions }}>{children}</SolanaContext.Provider>;
};
export default SolanaProvider;
