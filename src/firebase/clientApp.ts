import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const clientCredentials = import.meta.env.VITE_FIREBASE_CONFIG;

const firebase = initializeApp(clientCredentials);
const analytics = getAnalytics(firebase);

export { analytics };

export default firebase;
