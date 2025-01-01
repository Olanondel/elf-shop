// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NUXT_ENV_API_KEY,
  authDomain: process.env.NUXT_ENV_AUTH_DOMAIN,
  projectId: process.env.NUXT_ENV_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_ENV_APP_ID,
  measurementId: process.env.NUXT_ENV_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
