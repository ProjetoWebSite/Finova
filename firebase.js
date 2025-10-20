import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDJQVrycX_HWzFA7ZskxGpMwauPsNdsqhA",
  authDomain: "finova-136f2.firebaseapp.com",
  projectId: "finova-136f2",
  storageBucket: "finova-136f2.firebasestorage.app",
  messagingSenderId: "890607367661",
  appId: "1:890607367661:web:74f17a34b203f2d94de3e4",
  measurementId: "G-T2E8QHEBD9"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços de autenticação e banco
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("🔥 Firebase carregado com sucesso!");