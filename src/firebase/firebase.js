// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdlnw5TIfZU5paoonpUzr8lnAlxOGvnsQ",
  authDomain: "show-and-tell-c79bd.firebaseapp.com",
  projectId: "show-and-tell-c79bd",
  storageBucket: "show-and-tell-c79bd.appspot.com",
  messagingSenderId: "367483512020",
  appId: "1:367483512020:web:e727ada89d2e878fa74741",
  measurementId: "G-1FV8YP8HFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)


const db = getFirestore(app)


export { app, auth, db };