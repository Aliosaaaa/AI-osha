// ============================================================
// FIREBASE CONFIGURATION — AI Osha
// Sostituisci questi valori con quelli del tuo progetto Firebase
// Firebase Console → Project Settings → Your apps → Web app
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDnKTDMJYJ5RqSjspon-AYkGB_xzgrPd98",
    authDomain: "ai-osha.firebaseapp.com",
    projectId: "ai-osha",
    storageBucket: "ai-osha.firebasestorage.app",
    messagingSenderId: "1015761750441",
    appId: "1:1015761750441:web:fc3f54a6d46298569e5cb8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
