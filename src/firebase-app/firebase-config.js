import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU3lEn-OhLHLrgC2n8Uc4pvayo02lmF50",
  authDomain: "react-blogging-601f8.firebaseapp.com",
  projectId: "react-blogging-601f8",
  storageBucket: "react-blogging-601f8.appspot.com",
  messagingSenderId: "283158442737",
  appId: "1:283158442737:web:83cdd55c93b181064e2f50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
