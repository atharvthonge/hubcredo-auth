import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTVmGkF-Af4NF1SYaJNrSNhn5ehBpnwA0",
  authDomain: "hubcredo-auth.firebaseapp.com",
  projectId: "hubcredo-auth",
  storageBucket: "hubcredo-auth.firebasestorage.app",
  messagingSenderId: "172257165228",
  appId: "1:172257165228:web:6d7c6ffc4c9040cf51c409",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
