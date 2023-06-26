import type HighScoresDoc from "@firestore/HighScoresDoc";

function isHighScoresDoc(data: any): data is HighScoresDoc {
  try {
    if ((data as HighScoresDoc).highScoresArray !== undefined) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export default isHighScoresDoc;
