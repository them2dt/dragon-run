import HighScoreData from '@firestore/HighScoreData';
import LeaderboardMetadata from '@firestore/LeaderboardMetadata';

type Leaderboard = Array<LeaderboardMetadata | HighScoreData> | [];

export default Leaderboard;
