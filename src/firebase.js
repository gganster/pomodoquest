// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCertGORZk--B0XuhT2EdKtHQxi_lkcI3M",
  authDomain: "pomodoquest.firebaseapp.com",
  projectId: "pomodoquest",
  storageBucket: "pomodoquest.appspot.com",
  messagingSenderId: "532906848387",
  appId: "1:532906848387:web:dbfdf390f612992964ebb6",
  measurementId: "G-BXF08EDKJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };