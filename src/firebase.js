// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC5BOwWo3VWfRKUhWRsXmec8nZ2LoJTs0",
  authDomain: "suraksha-84726.firebaseapp.com",
  databaseURL: "https://suraksha-84726-default-rtdb.firebaseio.com",
  projectId: "suraksha-84726",
  storageBucket: "suraksha-84726.appspot.com",
  messagingSenderId: "855265923556",
  appId: "1:855265923556:web:a5c81274a7508d51adb7f1",
  measurementId: "G-1C4F9PL6QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
