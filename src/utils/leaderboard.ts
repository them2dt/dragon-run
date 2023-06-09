import type HighScoreData from '@firestore/HighScoreData';
import type LeaderboardMetadata from '@firestore/LeaderboardMetadata';
import type LeaderboardItem from '@firestore/LeaderboardItem';
import isLeaderboardMetadata from '@firestore/type-guards/isLeaderboardMetadata';
import type Leaderboard from '@firestore/Leaderboard';

const getLeaderboardDataFromLeaderboard = (
  leaderboard: Leaderboard
): { leaderboardMetadata: LeaderboardMetadata; leaderboardItems: LeaderboardItem[] } | null => {
  if (!isLeaderboardMetadata(leaderboard[0])) {
    console.log('leaderboard[0] is not LeaderboardMetadata: ', leaderboard[0]);
    return null;
  }
  const leaderboardMetadata: LeaderboardMetadata = leaderboard[0];
  const leaderboardItems: LeaderboardItem[] = [];
  for (let i = 1; i < leaderboard.length; i++) {
    const highScoreData = leaderboard[i] as HighScoreData;
    const leaderboardItem: LeaderboardItem = {
      rank: highScoreData.rank,
      name: highScoreData.userName,
      score: highScoreData.highScore
    };
    leaderboardItems.push(leaderboardItem);
  }
  return { leaderboardMetadata, leaderboardItems };
};

export { getLeaderboardDataFromLeaderboard };
