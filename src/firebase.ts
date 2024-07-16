import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_URI,
  authDomain: "x-clone-next-7e9b1.firebaseapp.com",
  projectId: "x-clone-next-7e9b1",
  storageBucket: "x-clone-next-7e9b1.appspot.com",
  messagingSenderId: "326046216490",
  appId: "1:326046216490:web:f96d0ec72b25e9e483ae53",
};

export const app = initializeApp(firebaseConfig);
// const fireDB = getFirestore();

// export { fireDB };