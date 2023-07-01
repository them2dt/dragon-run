import React, { createContext, useMemo, useState } from "react";
import type FirestoreData from "@firestore/FirestoreData";
import type UserData from "@firestore/UserData";
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
  updateDoc
} from "firebase/firestore";
import { browserLocalPersistence, getAuth, setPersistence, signInWithCustomToken } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import firestore from "../firebase/clientApp";
import isHighScoresDoc from "@firestore/type-guards/isHighScoresDoc";
import type HighScoresDoc from "@firestore/HighScoresDoc";
import type Leaderboard from "@firestore/Leaderboard";

interface FirestoreCallableFunctions {
  getAuthMessage: (userName: string, pubkey: string) => any;
  getAuthToken: (userName: string, pubkey: string, signature: string, signatureID: string) => any;
}

interface FirestoreContextType {
  firestoreData: FirestoreData | null;
  firestoreFunctions: {
    initializeFirestore: () => void;
    initializeUserData: (userName: string) => void;
    getUserData: (userName: string) => void;
    getLeaderboard: () => void;
    newHighScore: (score: number) => void;
    signInWithToken: (token: string) => void;
    signOut: () => void;
  };
  firestoreCallableFunctions: FirestoreCallableFunctions | null;
  setFirestoreData: React.Dispatch<React.SetStateAction<FirestoreData>>;
}

interface FirestoreProviderProps {
  children: React.ReactNode;
}

const defaultFirestoreData: FirestoreData = {
  firestore: null,
  userData: null,
  leaderboard: null
};

export const FirestoreContext = createContext<FirestoreContextType | null>(null);

export const FirestoreProvider = ({ children }: FirestoreProviderProps) => {
  const [firestoreData, setFirestoreData] = useState<FirestoreData>(defaultFirestoreData);
  const [firestoreCallableFunctions, setFirestoreCallableFunctions] = useState<FirestoreCallableFunctions | null>(null);

  const initializeFirestore = async () => {
    if (firestoreData?.firestore != null) {
      return;
    }
    const db = getFirestore(firestore);
    if (db == null) {
      return;
    }
    if (firestoreData != null) {
      setFirestoreData({
        firestore: db,
        userData: firestoreData?.userData ?? null,
        leaderboard: firestoreData?.leaderboard ?? null
      });
    }
  };

  const signInWithToken = async (token: string) => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        signInWithCustomToken(auth, token)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    const auth = getAuth();
    auth.signOut().catch((error) => {
      console.log(error);
    });
  };

  const getUserData = async (userName: string) => {
    if (userName === "") {
      return;
    }
    let db = firestoreData?.firestore;
    if (db == null) {
      await initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (db == null) {
      return;
    }
    const userDataDoc = doc(db, "users", userName);
    const userData = await getDoc(userDataDoc);
    if (userData == null) {
      return;
    }
    setFirestoreData({
      firestore: firestoreData?.firestore ?? null,
      userData: userData.data() as UserData,
      leaderboard: firestoreData?.leaderboard ?? null
    });
  };

  const getLeaderboard = async () => {
    const db = firestoreData?.firestore;
    if (db == null) {
      await initializeFirestore();
    }
    if (db == null) {
      return;
    }
    const highScoresDocRef = doc(db, "leaderboard", "highScores");
    const highScoresDoc = await getDoc(highScoresDocRef);
    if (!isHighScoresDoc(highScoresDoc.data())) {
      return;
    }
    const highScores: HighScoresDoc = highScoresDoc.data() as HighScoresDoc;
    const leaderboard: Leaderboard = highScores.highScoresArray;
    if (leaderboard == null) {
      return;
    }
    if (leaderboard.length === 0) {
      return;
    }

    setFirestoreData({
      firestore: firestoreData?.firestore ?? null,
      userData: firestoreData?.userData ?? null,
      leaderboard
    });
  };

  const initializeUserData = async (userName: string) => {
    if (userName === "") {
      return;
    }
    let db = firestoreData?.firestore;
    if (db == null) {
      await initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (db == null) {
      return;
    }
    if (firestoreData?.userData?.userName === userName) {
      return;
    }
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      await createUser(userName);
      return;
    } else if (querySnapshot.size > 1) {
      return;
    }

    await getUserData(userName);
  };

  const createUser = async (userName: string) => {
    if (userName === "") {
      return;
    }
    let db = firestoreData?.firestore;
    if (db == null) {
      await initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (db == null) {
      return;
    }
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size >= 1) {
      console.log("User already exists!");
    } else if (querySnapshot.size === 0) {
      const newUser: UserData = {
        userName,
        createdAt: Timestamp.now(),
        highScore: 0,
        scoredAt: Timestamp.now()
      };

      await setDoc(doc(db, "users", userName), newUser);

      await getUserData(userName);
    }
  };

  const newHighScore = async (highScore: number) => {
    let db = firestoreData?.firestore;
    if (db == null) {
      await initializeFirestore();
      db = firestoreData?.firestore;
    }
    if (db == null) {
      return;
    }
    if (firestoreData?.userData == null) {
      return;
    }
    if (firestoreData?.userData?.userName == null) {
      return;
    }
    if (highScore === 0) {
      return;
    }
    if (firestoreData?.userData?.highScore === null) {
      return;
    }
    if (highScore <= firestoreData?.userData?.highScore) {
      return;
    }
    const userName = firestoreData?.userData?.userName;
    const updatedData = {
      highScore,
      scoredAt: Timestamp.now()
    };
    await updateDoc(doc(db, "users", userName), updatedData);

    await getUserData(userName);
  };

  useMemo(() => {
    const functions = getFunctions();
    if (functions == null) {
      return;
    }
    const getAuthMessageCallable = httpsCallable(functions, "getAuthMessage");
    if (getAuthMessageCallable == null) {
      console.log("getAuthMessageCallable is null");
      return;
    }
    const getAuthMessage = async (userName: string, pubkey: string) => {
      return await getAuthMessageCallable({ userName, pubkey })
        .then((result) => {
          return result.data;
        })
        .catch((error) => {
          throw error;
        });
    };
    const getAuthTokenCallable = httpsCallable(functions, "getAuthToken");
    if (getAuthTokenCallable == null) {
      console.log("getAuthTokenCallable is null");
      return;
    }
    const getAuthToken = async (userName: string, pubkey: string, signature: string, signatureID: string) => {
      return await getAuthTokenCallable({ userName, pubkey, signature, signatureID })
        .then((result) => {
          return result.data;
        })
        .catch((error) => {
          throw error;
        });
    };
    const firestoreFunctions = {
      getAuthMessage,
      getAuthToken
    };
    setFirestoreCallableFunctions(firestoreFunctions);
  }, []);

  const firestoreFunctions = {
    initializeFirestore,
    initializeUserData,
    getUserData,
    getLeaderboard,
    newHighScore,
    signInWithToken,
    signOut
  };

  return (
    <FirestoreContext.Provider
      value={{ firestoreData, firestoreFunctions, firestoreCallableFunctions, setFirestoreData }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreProvider;
