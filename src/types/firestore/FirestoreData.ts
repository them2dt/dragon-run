import type UserData from '@firestore/UserData';
import type Leaderboard from '@firestore/Leaderboard';
import type { Firestore } from 'firebase/firestore';

interface FirestoreData {
  firestore: Firestore | null;
  userData: UserData | null;
  leaderboard: Leaderboard | null;
}

export default FirestoreData;
