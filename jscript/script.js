// Variáveis principais
let usuario = {};
let mensagens = [];
let destinatario = "Todos";
let visibilidade = "message";

// Entrar no chat
document.getElementById("botao").onclick = function () {
  const nome = document.getElementById("nome").value.trim();
  if (!nome) return alert("Digite um nome válido.");

  usuario.name = nome;

  axios
    .post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario)
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
      alert("Este nome já está em uso. Tente outro.");
      document.getElementById("nome").value = "";
    });
};

function iniciarChat() {
  listarMensagens();
  listarContatos();
  setInterval(() => axios.post("https://mock-api.driven.com.br/api/v4/uol/status", usuario), 5000);
  setInterval(listarMensagens, 3000);
  setInterval(listarContatos, 10000);
}

// Listar mensagens
function listarMensagens() {
  axios
    .get("https://mock-api.driven.com.br/api/v4/uol/messages")
    .then((res) => {
      mensagens = res.data;
      renderizarMensagens();
    });
}

function renderizarMensagens() {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  mensagens.forEach((msg) => {
    if (msg.type === "private_message" && msg.to !== usuario.name && msg.from !== usuario.name) return;

    ul.innerHTML += `
      <li class="${msg.type}" data-identifier="message">
        <p><span>(${msg.time})</span> <strong>${msg.from}</strong> para <strong>${msg.to}</strong>: ${msg.text}</p>
      </li>
    `;
  });

  ul.lastElementChild?.scrollIntoView();
}

// Enviar mensagem
function enviarMensagem() {
  const texto = document.querySelector("textarea").value.trim();
  if (!texto) return;

  const msg = {
    from: usuario.name,
    to: destinatario,
    text: texto,
    type: visibilidade,
  };

  axios
    .post("https://mock-api.driven.com.br/api/v4/uol/messages", msg)
    .then(listarMensagens)
    .catch(() => window.location.reload());

  document.querySelector("textarea").value = "";
}

// Participantes
function listarContatos() {
  axios.get("https://mock-api.driven.com.br/api/v4/uol/participants").then(renderizarContatos);
}

function renderizarContatos(res) {
  const lista = document.querySelector(".contatos");
  const contatos = res.data;
  lista.innerHTML = "";

  lista.innerHTML += `
    <li class="person" onclick="selecionarContato(this)" data-identifier="participant">
      <span><ion-icon name="people"></ion-icon></span>
      <div class="name">
        <span>Todos</span>
        <span class="checkmark">${destinatario === "Todos" ? "<ion-icon name='checkmark-outline'></ion-icon>" : ""}</span>
      </div>
    </li>
  `;

  contatos.forEach((c) => {
    if (c.name === usuario.name) return;
    lista.innerHTML += `
      <li class="person" onclick="selecionarContato(this)" data-identifier="participant">
        <span><ion-icon name="person-circle"></ion-icon></span>
        <div class="name">
          <span>${c.name}</span>
          <span class="checkmark">${destinatario === c.name ? "<ion-icon name='checkmark-outline'></ion-icon>" : ""}</span>
        </div>
      </li>
    `;
  });
}

function selecionarContato(el) {
  destinatario = el.querySelector(".name span").innerText;
  renderizarContatos({ data: [...mensagens.map(m => ({ name: m.from }))] });
  atualizarDestinatarioInfo();
}

function selecionarVisibilidade(el) {
  const tipo = el.innerText.includes("Reservadamente") ? "private_message" : "message";
  visibilidade = tipo;

  document.querySelectorAll("[data-identifier='visibility'] .checkmark").forEach(el => el.innerHTML = "");
  el.querySelector(".checkmark").innerHTML = "<ion-icon name='checkmark-outline'></ion-icon>";

  atualizarDestinatarioInfo();
}

function atualizarDestinatarioInfo() {
  const info = document.querySelector(".destinatario-info");
  info.innerText = `Enviando para ${destinatario} (${visibilidade === "private_message" ? "reservadamente" : "público"})`;
}

function abrirMenu() {
  document.querySelector(".sobreposicao").style.display = "flex";
  listarContatos();
}

function sobrePosicao() {
  document.querySelector(".sobreposicao").style.display = "none";
}

// Enviar com Enter
document.querySelector("textarea").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    enviarMensagem();
  }
});
