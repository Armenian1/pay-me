import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "../config.js";

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: "payme-3ac5a.firebaseapp.com",
  projectId: "payme-3ac5a",
  storageBucket: "payme-3ac5a.appspot.com",
  messagingSenderId: "893758527834",
  appId: "1:893758527834:web:069d85e1dc02253c13fb63",
  measurementId: "G-7EV37K2LM6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();
