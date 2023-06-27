import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { getAssetsByOwner } from "../utils/nfts";
import { useWallet } from "./useWallet";
import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID, StakeEntry } from "@builderz/sporting-f1-sdk";
import { getPlayersByNftMints } from "@builderz/sporting-f1-sdk";
import axios from "axios";

export const useNFTs = (reload?: number, poolAddress?: string) => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      setError(false);

      try {
        let filtered = (await getAssetsByOwner(publicKey.toBase58())).filter(
          (nft: any) =>
            nft.grouping[0]?.group_value ===
            "Et9ckpQCXFN5PsiYN781AczSVuQYyGEdDEPDJ7jrxz4c"
        );

        console.log("filtered: ", filtered);

        filtered = await Promise.all(
          filtered.map(async (nft: any) => {
            if (!nft.content.metadata.attributes) {
              console.log("fetching separate");
              const { data } = await axios.get(nft.content.json_uri);

              return {
                ...nft,
                content: {
                  ...nft.content,
                  metadata: {
                    ...nft.content.metadata,
                    attributes: data.attributes,
                  },
                  files: [...nft.content.files, { uri: data.image }],
                },
              };
            }

            return nft;
          })
        );

        // const nfts = await getNfts(publicKey);
        // //filtering NFT's to only load items from the sporting collection
        // const filtered = [];
        // for (let i = 0; i < nfts.length; i++) {
        //   if (
        //     nfts[i].collectionAddress ==
        //     "Et9ckpQCXFN5PsiYN781AczSVuQYyGEdDEPDJ7jrxz4c"
        //   ) {
        //     filtered.push(nfts[i]);
        //   }
        // }

        const playerAccounts = await getPlayersByNftMints(
          connection,
          filtered.map((nft: any) => new PublicKey(nft.id))
        );

        const withPoints = filtered.map((nft: any) => {
          const playerAccount = playerAccounts.find(
            (account) => account?.carMint.toBase58() === nft.id
          );

          return {
            ...nft,
            points: Number(playerAccount?.points) || 0,
          };
        });

        if (poolAddress) {
          const withStakingData = await Promise.all(
            withPoints.map(async (nft: any) => {
              const [stakeEntryPda] = PublicKey.findProgramAddressSync(
                [
                  Buffer.from("stake-entry"),
                  new PublicKey(poolAddress).toBuffer(),
                  new PublicKey(nft.id).toBuffer(),
                  publicKey.toBuffer(),
                ],
                PROGRAM_ID
              );

              try {
                const stakeEntry = await StakeEntry.fromAccountAddress(
                  connection,
                  stakeEntryPda
                );
                return { ...nft, stakeEntry };
              } catch (error) {
                return { ...nft, stakeEntry: null };
              }
            })
          );

          setNfts(withStakingData);
        } else {
          setNfts(withPoints);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    if (publicKey) {
      console.log("fetching nfts");
      fetchNFTs();
    }
  }, [connection, publicKey, poolAddress, reload]);

  return { nfts, loading, error };
};
