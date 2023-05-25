import Leaderboard from '@firestore/Leaderboard';

function isLeaderboard(data: Array<any>): data is Leaderboard {
  try {
    if ((data as Leaderboard)[0].updatedAt !== undefined) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export default isLeaderboard;
