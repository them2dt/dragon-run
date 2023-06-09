import type Leaderboard from '@firestore/Leaderboard';

interface HighScoresDoc {
  highScoresArray: Leaderboard;
}

export default HighScoresDoc;
