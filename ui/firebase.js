// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCbF-hjpnl7L3SGTQdm2jchxZI33OjsoxI",
  authDomain: "clicka-50280.firebaseapp.com",
  projectId: "clicka-50280",
  storageBucket: "clicka-50280.appspot.com",
  messagingSenderId: "868613634026",
  appId: "1:868613634026:web:abcdef123456",
};

// אתחול Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // יצירת אובייקט auth

// אתחול Firebase Auth



export {auth, signInWithEmailAndPassword };
