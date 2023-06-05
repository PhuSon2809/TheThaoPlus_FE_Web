import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAXTnEv0drL0lud2s-Fw9iaSBjCL_DjOkg',
  authDomain: 'thethaoplus-4d4e2.firebaseapp.com',
  projectId: 'thethaoplus-4d4e2',
  storageBucket: 'thethaoplus-4d4e2.appspot.com',
  messagingSenderId: '64250269951',
  appId: '1:64250269951:web:87885b1e75a447a6353cca',
  measurementId: 'G-JGF3B9QH9N',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
