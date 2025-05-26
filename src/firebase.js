// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB8-aOlYVwQkaoly8RgHOFtlmfW_24clw",
  authDomain: "fintech-8cb07.firebaseapp.com",
  projectId: "fintech-8cb07",
  storageBucket: "fintech-8cb07.firebasestorage.app",
  messagingSenderId: "155010596603",
  appId: "1:155010596603:web:8062259676e4967eaafa5e",
  measurementId: "G-NNQMC8SKPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, analytics, auth };