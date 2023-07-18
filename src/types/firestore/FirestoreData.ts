import type UserData from "@firestore/UserData";
import type Leaderboard from "@firestore/Leaderboard";

interface FirestoreData {
  userData: UserData | null;
  leaderboard: Leaderboard | null;
}

export default FirestoreData;
