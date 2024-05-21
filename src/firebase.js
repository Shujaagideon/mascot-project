// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD0nWqIpPzN1KAO0dXcGG8AI9tu0QcsXzk',
  authDomain: 'mascot-27c8b.firebaseapp.com',
  projectId: 'mascot-27c8b',
  storageBucket: 'mascot-27c8b.appspot.com',
  messagingSenderId: '287410263402',
  appId: '1:287410263402:web:67abd1bf76b123ac574113',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app as firebaseApp, db, storage, auth };
