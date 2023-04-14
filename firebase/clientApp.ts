import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
const app = initializeApp(clientCredentials);
const db = getFirestore(app);
const storage = getStorage(app);
const inventoryRef = ref(storage, "inventory");
const satRef = ref(inventoryRef, "R451158693/65satellite_01.jpg");

export { db, storage, inventoryRef };
