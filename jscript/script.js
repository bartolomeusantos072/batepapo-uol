let usuario = {};
let destinatario = "Todos";
let visibilidade = "message"; // ou "private_message"

function entrarNaSala() {
  const nome = document.getElementById("nome").value.trim();
  if (!nome) return;

  usuario.name = nome;

  axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario)
    .then(() => {
      document.querySelector(".tela-login").style.display = "none";
      document.querySelector(".tela-carregando").style.display = "flex";

      setTimeout(() => {
        document.querySelector(".tela-carregando").style.display = "none";
        document.querySelector("header").style.display = "flex";
        document.querySelector("footer").style.display = "flex";

        iniciarChat();
      }, 2000);
    })
    .catch(() => {
      alert("Nome já em uso. Escolha outro.");
      document.getElementById("nome").value = "";
    });
}

function iniciarChat() {
  listarMensagens();
  buscarParticipantes();
  setInterval(listarMensagens, 3000);
  setInterval(manterConexao, 5000);
  setInterval(buscarParticipantes, 10000);
}

function manterConexao() {
  axios.post("https://mock-api.driven.com.br/api/v4/uol/status", usuario);
}

function listarMensagens() {
  axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")
    .then(response => renderizarMensagens(response.data));
}

function renderizarMensagens(mensagens) {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  mensagens.forEach(m => {
    if (m.type === "private_message" && m.to !== usuario.name && m.from !== usuario.name) return;

    let classe = m.type;
    let conteudo = "";

    if (classe === "status") {
      conteudo = `<strong>${m.from}</strong> ${m.text}`;
    } else if (classe === "message") {
      conteudo = `<strong>${m.from}</strong> para <strong>${m.to}</strong>: ${m.text}`;
    } else {
      conteudo = `<strong>${m.from}</strong> reservadamente para <strong>${m.to}</strong>: ${m.text}`;
    }

    ul.innerHTML += `
      <li class="${classe}" data-identifier="message">
        <p><span class="horario">(${m.time})</span> ${conteudo}</p>
      </li>`;
  });

  ul.lastElementChild?.scrollIntoView();
}

function enviarMensagem() {
  const input = document.querySelector("textarea");
  const texto = input.value.trim();
  if (!texto) return;

  const mensagem = {
    from: usuario.name,
    to: destinatario,
    text: texto,
    type: visibilidade
  };

  axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagem)
    .then(listarMensagens)
    .catch(() => window.location.reload());

  input.value = "";
}

function buscarParticipantes() {
  axios.get("https://mock-api.driven.com.br/api/v4/uol/participants")
    .then(response => renderizarContatos(response.data));
}

function renderizarContatos(lista) {
  const ul = document.querySelector(".contatos");
  ul.innerHTML = "";

  const todos = `
    <li class="person" onclick="selecionarContato(this)" data-identifier="participant">
      <span><ion-icon name="people"></ion-icon></span>
      <div class="name">
        <span>Todos</span>
        <span class="checkmark"><ion-icon name="checkmark-outline"></ion-icon></span>
      </div>
    </li>
  `;
  ul.innerHTML = todos;

  lista.forEach(p => {
    if (p.name !== "Todos") {
      ul.innerHTML += `
        <li class="person" onclick="selecionarContato(this)" data-identifier="participant">
          <span><ion-icon name="person-circle"></ion-icon></span>
          <div class="name">
            <span>${p.name}</span>
            <span class="checkmark"><ion-icon name="checkmark-outline"></ion-icon></span>
          </div>
        </li>
      `;
    }
  });

  atualizarCheckmarks(".contatos .person", destinatario);
}

function selecionarContato(elemento) {
  destinatario = elemento.querySelector(".name span").innerText;
  atualizarCheckmarks(".contatos .person", destinatario);
  atualizarDestinatarioTexto();
}

function selecionarVisibilidade(elemento) {
  const texto = elemento.querySelector(".name span").innerText;
  visibilidade = texto === "Reservadamente" ? "private_message" : "message";
  atualizarCheckmarks(".opcoes-visibilidade .person", texto);
  atualizarDestinatarioTexto();
}

function atualizarCheckmarks(selector, nome) {
  document.querySelectorAll(selector).forEach(el => {
    const check = el.querySelector(".checkmark");
    const nomeItem = el.querySelector(".name span").innerText;
    check.style.display = nomeItem === nome ? "inline" : "none";
  });
}

function atualizarDestinatarioTexto() {
  const priv = visibilidade === "private_message" ? " (reservadamente)" : "";
  document.querySelector(".destinatario-info").innerText = `Enviando para ${destinatario}${priv}`;
}

function abrirMenu() {
  document.querySelector(".sobreposicao").style.display = "flex";
  buscarParticipantes();
}

function sobrePosicao() {
  document.querySelector(".sobreposicao").style.display = "none";
}

// Atalho: enviar com Enter
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botao").addEventListener("click", entrarNaSala);
  document.querySelector("textarea").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarMensagem();
    }
  });
});
