import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado:", userCred.user);

      alert("Login realizado com sucesso!");
      window.location.href = "perguntas.html";
    } catch (err) {
      console.error("Erro no login:", err);
      
      if (err.code === "auth/invalid-credential") {
        alert("Usuário não encontrado! Verifique seus dados ou cadastre-se.");
      } else if (err.code === "auth/wrong-password") {
        alert("Senha incorreta!");
      } else if (err.code === "auth/invalid-email") {
        alert("E-mail inválido!");
      } else {
        alert("Erro ao fazer login: " + err.message);
      }
    }
  });
});