import type HighScoreData from "@firestore/HighScoreData";
import type LeaderboardMetadata from "@firestore/LeaderboardMetadata";

type Leaderboard = Array<LeaderboardMetadata | HighScoreData> | [];

export default Leaderboard;
