import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmUnQoB7oIKL6zC1Si9sH1kAEGtF72no4",
  authDomain: "kashio-dev-db9da.firebaseapp.com",
  projectId: "kashio-dev-db9da",
  storageBucket: "kashio-dev-db9da.firebasestorage.app",
  messagingSenderId: "421260480761",
  appId: "1:421260480761:web:49590a979714747aa3d228",
  measurementId: "G-DLHHNTH97Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
