import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBlc7TGYfJ6ExEJkNWdDsc5xTkG-QsVIdo",
  authDomain: "wander-india-cf43c.firebaseapp.com",
  projectId: "wander-india-cf43c",
  storageBucket: "wander-india-cf43c.firebasestorage.app",
  messagingSenderId: "611311969587",
  appId: "1:611311969587:web:1774cd5c0f22a08cde4a46"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)