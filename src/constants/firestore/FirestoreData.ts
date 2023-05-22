import UserData from "@consts/firestore/UserData";
import Leaderboard from "@consts/firestore/Leaderboard";
import { Firestore } from "firebase/firestore";

interface FirestoreData {
    firestore: Firestore | null;
    userData: UserData | null;
    leaderboard: Leaderboard | null;
}

export default FirestoreData;