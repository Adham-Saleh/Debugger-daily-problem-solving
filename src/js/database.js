import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { FIREBASE_KEY } from "./config.js";

const firebaseConfig = {
  apiKey: `${FIREBASE_KEY}`,
  authDomain: "debugger-1513e.firebaseapp.com",
  projectId: "debugger-1513e",
  storageBucket: "debugger-1513e.appspot.com",
  messagingSenderId: "895408469393",
  appId: "1:895408469393:web:2f9a4587546dd1f70ad630",
  measurementId: "G-Z190GR86C6",
};
initializeApp(firebaseConfig);
export const db = getFirestore();

export const colRef = collection(db, "users");
export const docRef = collection(db, "submissions");
export const getPrevDay = collection(db, "newDay");
export const currentProblem = collection(db, "dailyProblem");
