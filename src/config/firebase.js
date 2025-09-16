// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, where, enableNetwork, disableNetwork } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6bWg8Ut0DslhPga_12zns95NcPdsuzl8",
  authDomain: "resume-portfolio-de77c.firebaseapp.com",
  projectId: "resume-portfolio-de77c",
  storageBucket: "resume-portfolio-de77c.firebasestorage.app",
  messagingSenderId: "874735398272",
  appId: "1:874735398272:web:f96ea2dc1a21e02e78e565",
  measurementId: "G-ZNXS01BHK8"
};

// Initialize Firebase with error handling
const app = initializeApp(firebaseConfig);

// Initialize analytics with error handling
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn('Analytics initialization failed:', error);
  analytics = null;
}

// Initialize auth and database
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Firestore with network enabled for proper database operations
console.log('Firestore initialized with network enabled');

export { 
  app, 
  analytics, 
  auth, 
  db,
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where
}; 