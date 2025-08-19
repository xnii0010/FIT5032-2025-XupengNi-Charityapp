// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3uZtfAtyeAeTtL20ptZRfxKQzHhp5fNQ",
  authDomain: "charityapp-226a6.firebaseapp.com",
  projectId: "charityapp-226a6",
  storageBucket: "charityapp-226a6.firebasestorage.app",
  messagingSenderId: "904669786898",
  appId: "1:904669786898:web:2935aa36531f040dbf39cb",
  measurementId: "G-04VC41EW3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
