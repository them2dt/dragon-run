import { PublicKey } from "@solana/web3.js";
import axios from "axios";

export type checkNftRes = {
  mint: string;
  royaltiesPaid: boolean;
  royaltiesToPay: number;
  royaltiesPaidAmount: number;
  status: string;
};

export const getNfts = async (owner: PublicKey) => {
  const nfts = [];

  try {
    const url = `${
      import.meta.env.VITE_RPC_URL
    }/v0/addresses/${owner.toBase58()}/nfts?pageNumber=1`;

    const { data } = await axios.get(url);
    nfts.push(...data.nfts);

    for (let index = 2; index < data.numberOfPages + 1; index++) {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_RPC_URL
        }/v0/addresses/${owner.toBase58()}/nfts?pageNumber=${index}`
      );
      nfts.push(...data.nfts);
    }

    return nfts;
  } catch (error) {
    throw error;
  }
};
