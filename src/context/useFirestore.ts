import { useContext } from 'react';
import { FirestoreContext } from '@context/FirestoreProvider';

export function useFirestore() {
    const context = useContext(FirestoreContext);

    if (!context) {
        throw new Error(
          "useFirestore has to be used within <FirestoreContext.Provider>"
        );
      }
  return context;
}
