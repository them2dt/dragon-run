import { Timestamp } from "firebase/firestore";

interface UserData {
    userName: string;
    createdAt: Timestamp;
    highScore: number;
    rank: number;
    unbanAt: Timestamp;
}

export default UserData;