import type HighScoreData from "@firestore/HighScoreData";

function isHighScoreData(data: any): data is HighScoreData {
  try {
    if ((data as HighScoreData).rank !== undefined) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export default isHighScoreData;
