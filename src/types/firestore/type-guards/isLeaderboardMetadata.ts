import type LeaderboardMetadata from '@firestore/LeaderboardMetadata';

function isLeaderboardMetadata(data: any): data is LeaderboardMetadata {
  try {
    if ((data as LeaderboardMetadata).nextUpdateAt !== undefined) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export default isLeaderboardMetadata;
