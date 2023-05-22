import React, { createContext, useState } from 'react';
import FirestoreData from '@consts/firestore/FirestoreData';
import UserData from '@consts/firestore/UserData';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import firestore from '../firebase/clientApp';

type FirestoreContextType = {
  firestoreData: FirestoreData | null;
  firestoreFunctions: {
    initializeFirestore: () => void;
    getUserData: (userName: string) => void;
  };
  setFirestoreData: React.Dispatch<React.SetStateAction<FirestoreData>>;
};

type FirestoreProviderProps = {
  children: React.ReactNode;
};

const defaultFirestoreData: FirestoreData = {
  firestore: null,
  userData: null,
  leaderboard: null,
};

export const FirestoreContext = createContext<FirestoreContextType | null>(null);

export const FirestoreProvider = ({ children }: FirestoreProviderProps) => {
  const [firestoreData, setFirestoreData] = useState<FirestoreData>(defaultFirestoreData);

  const initializeFirestore = async () => {
    if (firestoreData) {
      console.log('Firestore is already initialized!');
    }
    const db = getFirestore(firestore);
    if (!db) {
      console.log("Couldn't get Firestore instance!");
      return;
    }
    setFirestoreData({
      firestore: db,
      userData: firestoreData?.userData ?? null,
      leaderboard: firestoreData?.leaderboard ?? null,
    });
    console.log('Firestore initialized!');
  };

  const getUserData = async (userName: string) => {
    let db = firestoreData?.firestore;
    if (!db) {
      console.log('Firestore is not initialized!');
      initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (!db) {
      console.log("Couldn't get Firestore instance!");
      return;
    }
    const userDataDoc = doc(db, 'users', userName);
    const userData = await getDoc(userDataDoc);
    if (!userData) {
      console.log('User does not exist!');
      return;
    }
    setFirestoreData({
      firestore: firestoreData?.firestore ?? null,
      userData: userData.data() as UserData,
      leaderboard: firestoreData?.leaderboard ?? null,
    });
  };

  const firestoreFunctions = {
    initializeFirestore,
    getUserData,
  };

  return (
    <FirestoreContext.Provider value={{ firestoreData, firestoreFunctions, setFirestoreData }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
