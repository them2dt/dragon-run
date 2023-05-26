import React, { createContext, useState } from 'react';
import FirestoreData from '@firestore/FirestoreData';
import UserData from '@firestore/UserData';
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import firestore from '../firebase/clientApp';
import isHighScoresDoc from '@firestore/type-guards/isHighScoresDoc';
import HighScoresDoc from '@firestore/HighScoresDoc';
import Leaderboard from '@firestore/Leaderboard';

type FirestoreContextType = {
  firestoreData: FirestoreData | null;
  firestoreFunctions: {
    initializeFirestore: () => void;
    initializeUserData: (userName: string) => void;
    getUserData: (userName: string) => void;
    getLeaderboard: () => void;
    newHighScore: (score: number) => void;
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
    if (firestoreData && firestoreData.firestore) {
      console.log('Firestore is already initialized at initializeFirestore!');
      return;
    }
    const db = await getFirestore(firestore);
    if (!db) {
      console.log("Couldn't get Firestore instance at initializeFirestore!");
      return;
    }
    if (firestoreData) {
      setFirestoreData({
        firestore: db,
        userData: firestoreData?.userData ?? null,
        leaderboard: firestoreData?.leaderboard ?? null,
      });
      console.log('Firestore initialized: ' + db);
    }
  };

  const getUserData = async (userName: string) => {
    if (userName === '') {
      console.log('userName is empty!');
      return;
    }
    let db = firestoreData?.firestore;
    if (!db) {
      console.log('Firestore is not initialized at getUserData!');
      await initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (!db) {
      console.log("Couldn't get Firestore instance at getUserData!");
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
    console.log('Fetching leaderboard...');
    const db = firestoreData?.firestore;
    if (db === null) {
      console.log('Firestore is not initialized at getLeaderboard!');
      await initializeFirestore();
    }
    if (!db) {
      console.log("Couldn't get Firestore instance at getLeaderboard!");
      return;
    }
    console.log('Getting leaderboard from Firestore...');
    const highScoresDocRef = doc(db, 'leaderboard', 'highScores');
    const highScoresDoc = await getDoc(highScoresDocRef);
    if (!isHighScoresDoc(highScoresDoc.data())) {
      console.log('highScoresDoc is not a HighScoresDoc!');
      return;
    }
    const highScores: HighScoresDoc = highScoresDoc.data() as HighScoresDoc;
    const leaderboard: Leaderboard = highScores.highScoresArray;
    console.log('Leaderboard fetched!' + leaderboard);
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

  const initializeUserData = async (userName: string) => {
    if (userName === '') {
      console.log('userName is empty!');
      return;
    }
    let db = firestoreData?.firestore;
    if (!db) {
      console.log('Firestore is not initialized at initializeUserData!');
      await initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (!db) {
      console.log("Couldn't get Firestore instance at initializeUserData!");
      return;
    }
    if (firestoreData?.userData?.userName === userName) {
      console.log('userData is already initialized!');
      return;
    }
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userName', '==', userName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      console.log('User does not exist!');
      await createUser(userName);
      return;
    } else if (querySnapshot.size > 1) {
      console.log('More than one user with the same userName!');
      return;
    }

    await getUserData(userName);
  };

  const createUser = async (userName: string) => {
    if (userName === '') {
      console.log('userName is empty!');
      return;
    }
    let db = firestoreData?.firestore;
    if (!db) {
      console.log('Firestore is not initialized at createUser!');
      await initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (!db) {
      console.log("Couldn't get Firestore instance at createUser!");
      return;
    }
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('userName', '==', userName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size >= 1) {
      console.log('User already exists!');
      return;
    } else if (querySnapshot.size === 0) {
      console.log('User does not exist!');
      const newUser: UserData = {
        userName: userName,
        createdAt: Timestamp.now(),
        highScore: 0,
        scoredAt: Timestamp.now(),
      };

      await setDoc(doc(db, 'users', userName), newUser);

      await getUserData(userName);
    }
  };

  const newHighScore = async (highScore: number) => {
    if (!firestoreData?.userData) {
      console.log('userData is not initialized!');
      return;
    }
    if (!firestoreData?.userData?.userName) {
      console.log('userName is empty!');
      return;
    }
    if (highScore <= firestoreData?.userData?.highScore) {
      console.log('highScore is not a new high score!');
      return;
    }
    let db = firestoreData?.firestore;
    if (!db) {
      console.log('Firestore is not initialized!');
      initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (!db) {
      console.log("Couldn't get Firestore instance at newHighscore!");
      return;
    }
    const userName = firestoreData?.userData?.userName;
    const updatedData = {
      highScore: highScore,
      scoredAt: Timestamp.now(),
    };
    await updateDoc(doc(db, 'users', userName), updatedData);

    await getUserData(userName);
  };

  const firestoreFunctions = {
    initializeFirestore,
    initializeUserData,
    getUserData,
    getLeaderboard,
    newHighScore,
  };

  return (
    <FirestoreContext.Provider value={{ firestoreData, firestoreFunctions, setFirestoreData }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
