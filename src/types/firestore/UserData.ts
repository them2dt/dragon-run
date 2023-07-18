import type { Timestamp } from "firebase/firestore";

interface UserData {
  userName: string;
  createdAt: Timestamp;
  highScore: number;
  scoredAt: Timestamp;
  levelsCompleted: number;
}

export default UserData;
