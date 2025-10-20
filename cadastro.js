// cadastro.js
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCadastro");

   if (!form) {
    console.error("⚠️ Formulário não encontrado!");
    return;
  }

form.addEventListener ("submit", async (e) => {
  e.preventDefault();

console.log("Evento de envio acionado!");

  const nome = document.getElementById("nomecompleto").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = userCred.user.uid;

    
    await setDoc(doc(db, "relatorios", uid), {
      uid,
      nome,
      email,
      criadoEm: new Date()
    });

    alert("Cadastro realizado! Você será redirecionado para o login.");
    window.location.href = "index.html";
  
    } catch (err) {
  console.error("❌ Erro no cadastro:", err);
  
  if (err.code === "auth/weak-password") {
    alert("A senha deve ter pelo menos 6 caracteres!");
  } else if (err.code === "auth/email-already-in-use") {
    alert("Este e-mail já está cadastrado!");
  } else if (err.code === "auth/invalid-email") {
    alert("O e-mail informado é inválido!");
  } else {
    alert("Erro ao cadastrar: " + err.message);
  }
}
});
});