import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnGCPeaXU66pfPLryntI3wVmRVxEkmXIY",
  authDomain: "miniblog-82cc9.firebaseapp.com",
  projectId: "miniblog-82cc9",
  storageBucket: "miniblog-82cc9.appspot.com",
  messagingSenderId: "14812943690",
  appId: "1:14812943690:web:0ad42543c41b4867f75db3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
