// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore } from "firebase/firestore";
import { GoogleAuthProvider,getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMa62X-xnepuc_kgsX8Fn7KSE9SizPb6Q",
  authDomain: "academy-auth-nextjs.firebaseapp.com",
  projectId: "academy-auth-nextjs",
  storageBucket: "academy-auth-nextjs.appspot.com",
  messagingSenderId: "23617844258",
  appId: "1:23617844258:web:d45a42e6f1be5a78a9867b",
  measurementId: "G-89LN55D4GR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider =  new GoogleAuthProvider();
const auth = getAuth(app);
auth.settings.appVerificationDisabledForTesting = true;
const db = getFirestore(app);

export { app , auth, googleProvider, db}
