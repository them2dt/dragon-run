import { useContext } from 'react';
import { SolanaContext } from './SolanaProvider';

export function useSolana() {
  return useContext(SolanaContext);
}
