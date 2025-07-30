import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4fzPTbOVZ01Pa5Eqn9Vu9WnfejJ8KnMY",
  authDomain: "mulmet-5cb6b.firebaseapp.com",
  projectId: "mulmet-5cb6b",
  storageBucket: "mulmet-5cb6b.firebasestorage.app",
  messagingSenderId: "477863304191",
  appId: "1:477863304191:web:e7f676b207bd2ff65965ca",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

const db = getFirestore(app); // If you need Firestore, import and initialize it as well

export { app, auth, db };
