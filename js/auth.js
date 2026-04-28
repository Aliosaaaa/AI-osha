// ============================================================
// AUTH UTILITIES — AI Osha
// Importa questo file nelle pagine che richiedono autenticazione
// ============================================================

import { auth } from "./firebase-config.js";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Guard: reindirizza al login se l'utente non è autenticato
// Usare nelle pagine private (es. area-clienti)
export function requireAuth(redirectTo = "/login.html") {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (!user) {
                window.location.href = redirectTo;
            } else {
                resolve(user);
            }
        });
    });
}

// Guard: reindirizza alla dashboard se l'utente è GIÀ autenticato
// Usare nella pagina login per non mostrare il form a chi è già loggato
export function redirectIfAuth(redirectTo = "/area-clienti/") {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                window.location.href = redirectTo;
            } else {
                resolve(null);
            }
        });
    });
}

// Login con email e password
export async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Logout
export async function logout() {
    return signOut(auth);
}

// Reset password via email
export async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
}

// Osserva lo stato dell'utente (callback)
export function watchAuth(callback) {
    return onAuthStateChanged(auth, callback);
}

// Aggiorna la nav in base allo stato di autenticazione
export function updateNavAuth(user) {
    const navLink = document.getElementById("nav-auth-link");
    if (!navLink) return;
    if (user) {
        navLink.textContent = "Area Clienti";
        navLink.href = "/area-clienti/";
    } else {
        navLink.textContent = "Accedi";
        navLink.href = "/login.html";
    }
}
