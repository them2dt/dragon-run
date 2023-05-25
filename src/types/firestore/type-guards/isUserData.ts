import UserData from '@firestore/UserData';

function isUserData(data: any): data is UserData {
  try {
    if ((data as UserData).userName !== undefined) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export default isUserData;
