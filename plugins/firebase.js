// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAluC8hdPdZeUUQ_2_n_JVPZ3nEQlW-lJI",
  authDomain: "elf-bar-shop.firebaseapp.com",
  projectId: "elf-bar-shop",
  storageBucket: "elf-bar-shop.appspot.com",
  messagingSenderId: "730862033307",
  appId: "1:730862033307:web:b1545f2967f9383fe2a93e",
  measurementId: "G-YW45ZEG3JZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
