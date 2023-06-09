import { Metaplex } from '@metaplex-foundation/js';
import { PublicKey, type Connection } from '@solana/web3.js';

export const getCandyMachine = async (cmAddress: string, connection: Connection) => {
  const metaplex = new Metaplex(connection);

  const cm = await metaplex.candyMachines().findByAddress({ address: new PublicKey(cmAddress) });

  return cm;
};
