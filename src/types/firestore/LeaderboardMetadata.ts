import { Timestamp } from '@firebase/firestore-types';

interface LeaderboardMetadata {
  updatedAt: Timestamp | Date;
  nextUpdateAt: Timestamp | Date;
  ranks: number;
}

export default LeaderboardMetadata;
