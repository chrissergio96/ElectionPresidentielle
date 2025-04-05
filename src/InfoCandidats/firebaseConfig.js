import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: " AIzaSyBTfO862kHXjobmKUOWLKlPbseI6F2ObZ4",
  authDomain: "ElectionPresidentielle.firebaseapp.com",
  databaseURL: "https://TON_PROJET-default-rtdb.firebaseio.com",
  projectId: "electionpresidentielle-d8bef",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "Make It So AI!",
  appId: "1:641821975706:web:ed0561baedc39b98c5ab23"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
