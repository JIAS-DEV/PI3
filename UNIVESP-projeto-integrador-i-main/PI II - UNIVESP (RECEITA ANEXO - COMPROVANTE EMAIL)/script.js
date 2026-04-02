(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
        } else {
          inserir();
          form.classList.remove("was-validated");
          form.reset();
        }
        event.preventDefault();
        event.stopPropagation();
      },
      false
    );
  });
})();

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("bd_medicamentos")) ?? [];
}

function setLocalStorage(bd_medicamentos) {
  localStorage.setItem("bd_medicamentos", JSON.stringify(bd_medicamentos));
}

function limparTabela() {
  var elemento = document.querySelector("#tabela>tbody");
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function atualizarTabela() {
  limparTabela();
  const bd_medicamentos = getLocalStorage();
  let index = 0;
  for (medicamento of bd_medicamentos) {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
        <th scope="row">${index}</th>
        <td>${medicamento.nome}</td>
        <td>${medicamento.endereco}</td>
        <td>${medicamento.numero}</td>
        <td>${medicamento.telefone}</td>
        <td>${medicamento.medicamentos}</td>
				<td>${medicamento.quantidade}</td>
				<td>${medicamento.renda}</td>
        <td>
            <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
        </td>
    `;
    document.querySelector("#tabela>tbody").appendChild(novaLinha);
    index++;
  }
}

function inserir() {
  const medicamento = {
    nome: document.getElementById("nome").value,
    endereco: document.getElementById("endereco").value,
    numero: document.getElementById("numero").value,
    telefone: document.getElementById("telefone").value,
    medicamentos: document.getElementById("medicamentos").value,
    quantidade: document.getElementById("quantidade").value,
    renda: document.getElementById("renda").value,
  };
  const bd_medicamentos = getLocalStorage();
  bd_medicamentos.push(medicamento);
  setLocalStorage(bd_medicamentos);
  atualizarTabela();
}

function excluir(index) {
  const bd_medicamentos = getLocalStorage();
  bd_medicamentos.splice(index, 1);
  setLocalStorage(bd_medicamentos);
  atualizarTabela();
}

function validarEndereco() {
  const bd_medicamentos = getLocalStorage();
  for (medicamento of bd_medicamentos) {
    if (endereco.value == medicamento.endereco) {
      endereco.setCustomValidity("Este endereco já existe!");
      feedbackEndereco.innerText = "Este endereco já existe!";
      return false;
    } else {
      endereco.setCustomValidity("");
      feedbackEndereco.innerText = "Informe o seu endereço corretamente.";
    }
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form[name='form1']");
  const notificacao = document.getElementById("notificacao");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Formulário válido: mostra a notificação
    notificacao.textContent = "Informações enviadas com sucesso!";
    notificacao.classList.remove("d-none");

    form.reset();
    form.classList.remove("was-validated");
  });
});


atualizarTabela();
const endereco = document.getElementById("endereco");
const feedbackEndereco = document.getElementById("feedbackEndereco");
endereco.addEventListener("input", validarEndereco);
