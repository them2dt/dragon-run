import { FirebaseApp, initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { Analytics, getAnalytics } from 'firebase/analytics';

const jsonClientCredentials = import.meta.env.VITE_FIREBASE_CONFIG as unknown as string;

const clientCredentials = JSON.parse(jsonClientCredentials);

const firebase: FirebaseApp = initializeApp(clientCredentials);
const analytics: Analytics = getAnalytics(firebase);

export { analytics };

export default firebase;
