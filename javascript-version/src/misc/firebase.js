import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDioFvP3zjPXWPP6Bo_GcLCKeX7Maw3zjM",
  authDomain: "oculus-2023.firebaseapp.com",
  projectId: "oculus-2023",
  storageBucket: "oculus-2023.appspot.com",
  messagingSenderId: "1032911689693",
  appId: "1:1032911689693:web:7e4e21bf1da82fcc278834",
  measurementId: "G-2E2MH9MS9B"
};

const app = initializeApp(firebaseConfig);
export default app;