import UserData from '@firestore/UserData';
import Leaderboard from '@firestore/Leaderboard';
import { Firestore } from 'firebase/firestore';

interface FirestoreData {
  firestore: Firestore | null;
  userData: UserData | null;
  leaderboard: Leaderboard | null;
}

export default FirestoreData;
