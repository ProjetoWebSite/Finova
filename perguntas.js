import { db } from './firebase.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const auth = getAuth();
const form = document.getElementById('dadosForm');

// 1️⃣ Inicializa todos os inputs condicionais ocultos
document.querySelectorAll('.conditional-input').forEach(input => {
  input.style.display = 'none';
});

// 2️⃣ Mostrar/ocultar inputs condicionais ao selecionar Sim/Não
document.querySelectorAll('.simnao').forEach(select => {
  select.addEventListener('change', function() {
    const target = document.querySelector(`[name="${this.dataset.target}"]`);
    if(this.value === 'sim') {
      target.style.display = 'block';
    } else {
      target.style.display = 'none';
      target.value = '';
    }
  });
});

// 3️⃣ Captura envio do formulário e salva/calcula
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if(!user) {
    alert("Você precisa estar logado para salvar os dados!");
    return;
  }

  // Pega todos os campos do formulário
  const formData = new FormData(form);
  let gastos = {};
  for (let [key, value] of formData.entries()) {
    gastos[key] = parseFloat(value) || 0;
  }

  // Salva no Firestore
  try {
    await setDoc(doc(db, 'gastos', user.uid), gastos);
    alert("Dados salvos com sucesso! Veja o gráfico dos gastos no perfil");
  } catch (error) {
    console.error("Erro ao salvar gastos:", error);
    alert("Ocorreu um erro ao salvar os gastos.");
  }

  // Calcula total de gastos e investimento possível
  let totalGastos = 0;
  const renda = gastos.renda || 0;
  const outraRenda = gastos.outra_renda_valor || 0;

  const camposValores = [
    'contas',
    'alimentacao',
    'plano_saude_valor',
    'medicamentos_valor',
    'cursos_valor',
    'lazer_valor',
    'assinaturas_valor',
    'dividas_valor'
  ];

  camposValores.forEach(campo => {
    totalGastos += gastos[campo] || 0;
  });

  // Atualiza resultados na página
  document.getElementById('resultado-gastos').innerHTML = 
    `<strong>Total de gastos:</strong> R$ ${totalGastos.toFixed(2)}`;

  const investimentoPossivel = (renda * 0.3 + outraRenda) - totalGastos;
  if (investimentoPossivel > 0) {
    document.getElementById('resultado-investimentos').innerHTML = 
      `<p>Você pode investir aproximadamente: <strong>R$ ${investimentoPossivel.toFixed(2)}</strong> por mês.</p>`;
  } else {
    document.getElementById('resultado-investimentos').innerHTML = 
      `<p><strong>Não é possível investir no momento.</strong></p>`;
  }
});