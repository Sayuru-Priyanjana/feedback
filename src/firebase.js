// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  databaseURL: "https://task-app-85e6d-default-rtdb.asia-southeast1.firebasedatabase.app/",
  apiKey: "AIzaSyDsAdsMhgYXkKqYi7xaoDGUWKJ45RvE9C8",
  authDomain: "task-app-85e6d.firebaseapp.com",
  databaseURL: "https://task-app-85e6d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "task-app-85e6d",
  storageBucket: "task-app-85e6d.firebasestorage.app",
  messagingSenderId: "547028898766",
  appId: "1:547028898766:web:3738577a724522f198519f"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);