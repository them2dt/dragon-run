import React, { createContext, useState, useMemo } from 'react';
import { Metaplex, bundlrStorage, keypairIdentity } from '@metaplex-foundation/js';

export interface Solana {
  metaplex: Metaplex | null;
  ownedNFTs: null;
}

interface SolanaContextType {
  solana: Solana | null;
  setSolana: React.Dispatch<React.SetStateAction<Solana | null>>;
}

interface SolanaProviderProps {
  children: React.ReactNode;
}

export const SolanaContext = createContext<SolanaContextType | null>(null);

export const SolanaProvider = ({ children }: SolanaProviderProps) => {
  const [metaplex, setMetaplex] = useState<Metaplex | null>(null);

  useMemo(() => {
    const xnftSolana = window?.xnft?.solana;
    if (!xnftSolana) {
      console.log('xnft Solana not found');
      return;
    }
    const connection = xnftSolana?.connection;
    if (!connection) {
      console.log('xnft Solana connection not found');
      return;
    }
    const pubkey = xnftSolana?.publicKey?.toString();
    if (!pubkey) {
      console.log('xnft Solana pubkey not found');
      return;
    }
    console.log('xnft Solana pubkey: ', pubkey);
    const metaplex = Metaplex.make(connection).use(keypairIdentity(pubkey)).use(bundlrStorage());
    if (!metaplex) {
      console.log('Unable to create Metaplex instance');
      return;
    }
    console.log('Metaplex instance created: ', metaplex);
    setMetaplex(metaplex);
  }, [window?.xnft?.solana?.isConnected, window?.xnft?.solana?.publicKey]);

  const [solana, setSolana] = useState<Solana | null>({
    metaplex,
    ownedNFTs: null
  });

  useMemo(() => {
    setSolana({
      metaplex,
      ownedNFTs: null
    });
  }, [metaplex]);

  return <SolanaContext.Provider value={{ solana, setSolana }}>{children}</SolanaContext.Provider>;
};
export default SolanaProvider;
