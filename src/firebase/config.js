// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwf50gr1D6BXIgqscS_kKy_s7JAtxfAdU",
  authDomain: "react-curso-61bcd.firebaseapp.com",
  projectId: "react-curso-61bcd",
  storageBucket: "react-curso-61bcd.appspot.com",
  messagingSenderId: "52386702819",
  appId: "1:52386702819:web:cdaef06b0e5ef650aeecd6",
  measurementId: "G-JJTLY78DWQ"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
 