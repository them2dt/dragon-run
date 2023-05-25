import HighScoreData from '@firestore/HighScoreData';
import LeaderboardMetadata from '@firestore/LeaderboardMetadata';
import LeaderboardItem from '@firestore/LeaderboardItem';
import isLeaderboardMetadata from '@firestore/type-guards/isLeaderboardMetadata';
import Leaderboard from '@firestore/Leaderboard';

const getLeaderboardDataFromLeaderboard = (
  leaderboard: Leaderboard,
): { leaderboardMetadata: LeaderboardMetadata; leaderboardItems: LeaderboardItem[] } | null => {
  if (!isLeaderboardMetadata(leaderboard[0])) {
    console.log('leaderboard[0] is not LeaderboardMetadata!');
    return null;
  }
  const leaderboardMetadata: LeaderboardMetadata = leaderboard.shift() as LeaderboardMetadata;
  const leaderboardItems = leaderboard.map((highScoreData) => {
    const highScoreItem = highScoreData as HighScoreData;
    const leaderboardItem: LeaderboardItem = {
      rank: highScoreItem.rank,
      name: highScoreItem.userName,
      score: highScoreItem.highScore,
    };
    return leaderboardItem;
  });
  return { leaderboardMetadata, leaderboardItems };
};

export { getLeaderboardDataFromLeaderboard };
