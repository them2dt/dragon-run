import { FirebaseApp, initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { Analytics, getAnalytics } from 'firebase/analytics';

const clientCredentials = import.meta.env.VITE_FIREBASE_CONFIG;

const firebase: FirebaseApp = initializeApp(clientCredentials);
const analytics: Analytics = getAnalytics(firebase);

export { analytics };

export default firebase;
