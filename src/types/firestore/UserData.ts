import { Timestamp } from 'firebase/firestore';

interface UserData {
  userName: string;
  createdAt: Timestamp;
  highScore: number;
  scoredAt: Timestamp;
  unbanAt: Timestamp;
}

export default UserData;
