import React, { createContext, useState } from 'react';
import FirestoreData from '@firestore/FirestoreData';
import UserData from '@firestore/UserData';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import firestore from '../firebase/clientApp';
import isHighScoresDoc from '@firestore/type-guards/isHighScoresDoc';
import HighScoresDoc from '@firestore/HighScoresDoc';
import Leaderboard from '@firestore/Leaderboard';

type FirestoreContextType = {
  firestoreData: FirestoreData | null;
  firestoreFunctions: {
    initializeFirestore: () => void;
    getUserData: (userName: string) => void;
    getLeaderboard: () => void;
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

  const getLeaderboard = async () => {
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
    const highScoresDocRef = doc(db, 'leaderboard', 'highScores');
    const highScoresDoc = await getDoc(highScoresDocRef);
    if (!isHighScoresDoc(highScoresDoc.data())) {
      console.log('highScoresDoc is not a HighScoresDoc!');
      return;
    }
    const highScores: HighScoresDoc = highScoresDoc.data() as HighScoresDoc;
    const leaderboard: Leaderboard = highScores.highScoresArray;
    if (!leaderboard) {
      console.log('highScoresArray does not exist!');
      return;
    }
    if (leaderboard.length === 0) {
      console.log('highScoresArray is empty!');
      return;
    }

    setFirestoreData({
      firestore: firestoreData?.firestore ?? null,
      userData: firestoreData?.userData ?? null,
      leaderboard: leaderboard,
    });
  };

  const firestoreFunctions = {
    initializeFirestore,
    getUserData,
    getLeaderboard,
  };

  return (
    <FirestoreContext.Provider value={{ firestoreData, firestoreFunctions, setFirestoreData }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
