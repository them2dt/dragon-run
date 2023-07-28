import React, { createContext, useEffect, useMemo, useState } from "react";
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
  updateDoc,
  onSnapshot
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
    initializeUserData: (userName: string) => void;
    getUserData: (userName?: string) => void;
    getLeaderboard: () => void;
    newHighScore: (score: number) => void;
    levelComplete: (levelNumber: number) => void;
    signInWithToken: (token: string) => Promise<void>;
    signOut: () => void;
  };
  firestoreCallableFunctions: FirestoreCallableFunctions | null;
  setFirestoreData: React.Dispatch<React.SetStateAction<FirestoreData>>;
}

interface FirestoreProviderProps {
  children: React.ReactNode;
}

const defaultFirestoreData: FirestoreData = {
  userData: null,
  leaderboard: null
};

export const FirestoreContext = createContext<FirestoreContextType | null>(null);

export const FirestoreProvider = ({ children }: FirestoreProviderProps) => {
  const [firestoreData, setFirestoreData] = useState<FirestoreData>(defaultFirestoreData);
  const [firestoreCallableFunctions, setFirestoreCallableFunctions] = useState<FirestoreCallableFunctions | null>(null);

  const db = getFirestore(firestore);

  const signInWithToken = async (token: string) => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(async () => {
        await signInWithCustomToken(auth, token)
          .then((userCredential) => {
            const userName = userCredential.user.uid;
            console.log("Signed in as: " + userName);
            initializeUserData(userName).catch((err) => {
              throw new Error(err.message);
            });
          })
          .catch((err) => {
            throw new Error(err.message);
          });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const signOut = async () => {
    const auth = getAuth();
    auth.signOut().catch((err) => {
      throw new Error(err.message);
    });
  };

  const getUserData = async (userName?: string) => {
    if (userName === "") {
      return;
    }
    if (userName == null) {
      userName = firestoreData?.userData?.userName;
    }
    if (userName == null) {
      throw new Error("Failed to get user data: userName is null");
    }
    const auth = getAuth();
    const user = auth.currentUser;
    if (user == null) {
      return;
    }
    const uid = user.uid;
    if (uid === "") {
      throw new Error("Failed to get user data: User is not signed in!");
    } else if (uid !== userName) {
      await signOut();
      throw new Error("Failed to get user data: Signed in user does not match user name!");
    }
    const userDataDoc = doc(db, "users", userName);
    const userData = await getDoc(userDataDoc);
    if (userData == null) {
      return;
    }
    setFirestoreData({
      userData: userData.data() as UserData,
      leaderboard: firestoreData?.leaderboard ?? null
    });
  };

  const getLeaderboard = async () => {
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
      userData: firestoreData?.userData ?? null,
      leaderboard
    });
  };

  const initializeUserData = async (userName: string) => {
    if (userName === "" || userName == null) {
      return;
    }
    if (firestoreData?.userData?.userName === userName) {
      return;
    }
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q).catch((err) => {
      throw new Error(err.message);
    });
    if (querySnapshot.size === 0) {
      console.log("No user with name: " + userName + " found!");
      await createUser(userName);
      return;
    }

    await getUserData(userName);
  };

  const createUser = async (userName: string) => {
    if (userName === "" || userName == null) {
      throw new Error("Failed to create user: userName is null!");
    }
    const auth = getAuth();
    const user = auth.currentUser;
    if (user == null) {
      throw new Error("Failed to create user: User is not signed in!");
    }
    const uid = user.uid;
    if (uid === "") {
      throw new Error("Failed to create user: User is not signed in!");
    } else if (uid !== userName) {
      await signOut();
      throw new Error("Failed to create user: Signed in user does not match user name!");
    }
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userName", "==", userName));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size >= 1) {
      console.log("Failed to create user: User already exists!");
    } else if (querySnapshot.size === 0) {
      const newUser: UserData = {
        userName,
        createdAt: Timestamp.now(),
        highScore: 0,
        scoredAt: Timestamp.now(),
        levelsCompleted: 0
      };
      await setDoc(doc(db, "users", userName), newUser);
    }
  };

  const newHighScore = async (highScore: number) => {
    if (firestoreData?.userData == null) {
      throw new Error("Failed to update high score: userData is null");
    }
    if (firestoreData?.userData?.userName == null) {
      throw new Error("Failed to update high score: userName is null");
    }
    if (highScore === 0) {
      throw new Error("Failed to update high score: highScore cannot be 0");
    }
    if (firestoreData?.userData?.highScore === null) {
      throw new Error("Failed to update high score: highScore is null");
    }
    if (highScore <= firestoreData?.userData?.highScore) {
      console.log("Failed to update high score: New high score is not higher than current high score");
    }
    const userName = firestoreData?.userData?.userName;
    const auth = getAuth();
    const user = auth.currentUser;
    if (user == null) {
      throw new Error("Failed to update high score: User is not signed in!");
    }
    const uid = user.uid;
    if (uid === "") {
      throw new Error("Failed to update high score: User is not signed in!");
    } else if (uid !== userName) {
      await signOut();
      throw new Error("Failed to update high score: Signed in user does not match user name!");
    }
    const updatedData = {
      highScore,
      scoredAt: Timestamp.now()
    };
    await updateDoc(doc(db, "users", userName), updatedData);
  };

  const levelComplete = async (levelNumber: number) => {
    console.log("levelComplete ", levelNumber);
    console.log("firestoreData ", firestoreData);
    if (firestoreData?.userData?.userName == null) {
      throw new Error("Failed to update completed levels: userName is null");
    }
    if (firestoreData?.userData?.levelsCompleted === null) {
      throw new Error("Failed to update completed levels: levelsCompleted is null");
    }
    if (firestoreData?.userData?.levelsCompleted >= levelNumber) {
      console.log("Failed to update completed levels: Already completed this level");
      return;
    }
    const userName = firestoreData?.userData?.userName;
    const auth = getAuth();
    const user = auth.currentUser;
    if (user == null) {
      throw new Error("Failed to update completed levels: User is not signed in!");
    }
    const uid = user.uid;
    if (uid === "") {
      throw new Error("Failed to update completed levels: User is not signed in!");
    } else if (uid !== userName) {
      await signOut();
      throw new Error("Failed to update completed levels: Signed in user does not match user name!");
    }
    console.log("Updating levelsCompleted to ", levelNumber);
    const updatedData = {
      levelsCompleted: levelNumber
    };
    await updateDoc(doc(db, "users", userName), updatedData);
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
      if (userName === "" || userName == null) {
        throw new Error("userName is empty");
      }
      if (pubkey === "" || pubkey == null) {
        throw new Error("pubkey is empty");
      }
      console.log("getAuthMessage ", userName, pubkey);
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

  useMemo(() => {
    if (firestoreData?.userData?.userName == null) {
      return;
    }
    const userName = firestoreData?.userData?.userName;
    onSnapshot(doc(db, "users", userName), (doc) => {
      if (!doc.exists()) {
        console.log("User document doesn't exist!");
        return;
      }
      const userData = doc.data() as UserData;
      if (userData == null) {
        return;
      }
      setFirestoreData({
        userData,
        leaderboard: firestoreData?.leaderboard ?? null
      });
    });
  }, [firestoreData?.userData?.userName]);

  useEffect(() => {
    onSnapshot(doc(db, "leaderboard", "highScores"), () => {
      getLeaderboard().catch((err) => {
        console.log("Error getting leaderboard: ", err.message);
      });
    });
  }, []);

  const firestoreFunctions = {
    initializeUserData,
    getUserData,
    getLeaderboard,
    newHighScore,
    levelComplete,
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
