import type { Timestamp } from '@firebase/firestore-types';

interface HighScoreData {
  updatedAt: Timestamp;
  userName: string;
  highScore: number;
  scoredAt: Timestamp;
  rank: number;
}

export default HighScoreData;
