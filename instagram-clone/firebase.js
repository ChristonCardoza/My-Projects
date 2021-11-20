import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtIxQd311hvfO9RArb03rYagrxlNDs844",
  authDomain: "instagram-clone-cbaf2.firebaseapp.com",
  projectId: "instagram-clone-cbaf2",
  storageBucket: "instagram-clone-cbaf2.appspot.com",
  messagingSenderId: "668318502234",
  appId: "1:668318502234:web:24e2b6cbfe06370f237763"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };