let usuario = {};
let destinatario = "Todos";
let visibilidade = "message";

async function registrarUsuario() {
  const nome = document.getElementById("nome").value.trim();
  if (!nome) return;

  usuario.name = nome;

  try {
    const response = await fetch("https://mock-api.driven.com.br/api/v4/uol/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      alert("Nome já em uso. Escolha outro.");
      document.getElementById("nome").value = "";
      document.getElementById("nome").focus();
      return;
    }

    document.querySelector(".tela-login").style.display = "none";
    document.querySelector(".tela-carregando").style.display = "flex";

    setTimeout(() => {
      document.querySelector(".tela-carregando").style.display = "none";
      document.querySelector("header").style.display = "flex";
      document.querySelector("footer").style.display = "flex";

      iniciarSessaoDeChat();
    }, 2000);
  } catch (error) {
    alert("Erro na conexão. Tente novamente.");
    console.error(error);
  }
}

function iniciarSessaoDeChat() {
  atualizarMensagens();
  atualizarParticipantes();
  setInterval(atualizarMensagens, 3000);
  setInterval(manterConexaoAtiva, 15000);
  setInterval(atualizarParticipantes, 10000);
}

async function manterConexaoAtiva() {
  try {
    await fetch("https://mock-api.driven.com.br/api/v4/uol/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
  } catch (error) {
    console.error("Erro ao manter conexão:", error);
    window.location.reload();
  }
}

async function atualizarMensagens() {
  try {
    const response = await fetch("https://mock-api.driven.com.br/api/v4/uol/messages");
    const mensagens = await response.json();
    exibirMensagens(mensagens);
  } catch (error) {
    console.error("Erro ao listar mensagens:", error);
  }
}

function exibirMensagens(mensagens) {
  const listaMensagens = document.querySelector("ul");
  listaMensagens.innerHTML = "";

  mensagens.forEach(m => {
    if (m.type === "private_message" && m.to !== usuario.name && m.from !== usuario.name) return;

    let classe = m.type.toLowerCase();
    let conteudo = "";

    if (classe === "status") {
      conteudo = `<strong>${m.from}</strong> ${m.text}`;
    } else if (classe === "message") {
      conteudo = `<strong>${m.from}</strong> para <strong>${m.to}</strong>: ${m.text}`;
    } else {
      conteudo = `<strong>${m.from}</strong> reservadamente para <strong>${m.to}</strong>: ${m.text}`;
    }

    listaMensagens.innerHTML += `
      <li class="${classe}" data-identifier="message">
        <p><span class="horario">(${m.time})</span> ${conteudo}</p>
      </li>`;
  });

  listaMensagens.lastElementChild?.scrollIntoView();
}

async function enviarNovaMensagem() {
  const inputMensagem = document.querySelector("textarea");
  const textoMensagem = inputMensagem.value.trim();
  if (!textoMensagem) return;

  // Verifica se o destinatário é o próprio usuário e se a visibilidade é privada
  if (destinatario === usuario.name && visibilidade === "private_message") {
    alert("Você não pode enviar mensagens privadas para si mesmo.");
    return;
  }

  const mensagem = {
    from: usuario.name,
    to: destinatario,
    text: textoMensagem,
    type: visibilidade,
  };

  try {
    const response = await fetch("https://mock-api.driven.com.br/api/v4/uol/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mensagem),
    });

    if (!response.ok) {
      window.location.reload();
      return;
    }

    atualizarMensagens();
    inputMensagem.value = "";
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    window.location.reload();
  }
}


async function atualizarParticipantes() {
  try {
    const response = await fetch("https://mock-api.driven.com.br/api/v4/uol/participants");
    const listaParticipantes = await response.json();
    exibirContatos(listaParticipantes);
  } catch (error) {
    console.error("Erro ao buscar participantes:", error);
  }
}

function exibirContatos(lista) {
  const listaContatos = document.querySelector(".contatos");
  listaContatos.innerHTML = "";

  const todosContatos = `
    <li class="person" onclick="selecionarContato(this)" data-identifier="participant">
      <span><ion-icon name="people"></ion-icon></span>
      <div class="name">
        <span>Todos</span>
        <span class="checkmark"><ion-icon name="checkmark-outline"></ion-icon></span>
      </div>
    </li>`;
  listaContatos.innerHTML = todosContatos;

  lista.forEach(p => {
    if (p.name !== "Todos") {
      listaContatos.innerHTML += `
        <li class="person" onclick="selecionarContato(this)" data-identifier="participant">
          <span><ion-icon name="person-circle"></ion-icon></span>
          <div class="name">
            <span>${p.name}</span>
            <span class="checkmark"><ion-icon name="checkmark-outline"></ion-icon></span>
          </div>
        </li>`;
    }
  });

  atualizarCheckmarks(".contatos .person", destinatario);
}

function selecionarContato(elemento) {
  const nomeSelecionado = elemento.querySelector(".name span").innerText;
  
  // Impede que o usuário selecione a si mesmo
  if (nomeSelecionado === usuario.name) {
    alert("Você não pode enviar mensagens privadas para si mesmo.");
    return;
  }

  destinatario = nomeSelecionado;
  atualizarCheckmarks(".contatos .person", destinatario);
  atualizarTextoDestinatario();

  fecharMenuDeContatos();
  
  setTimeout(() => {
    const listaMensagens = document.querySelector("ul");
    listaMensagens.lastElementChild?.scrollIntoView();
  }, 100);
}


function fecharMenuDeContatos() {
  document.querySelector(".sobreposicao").style.display = "none";
}

function selecionarVisibilidade(elemento) {
  const textoVisibilidade = elemento.querySelector(".name span").innerText;
  visibilidade = textoVisibilidade === "Reservadamente" ? "private_message" : "message";
  atualizarCheckmarks(".opcoes-visibilidade .person", textoVisibilidade);
  atualizarTextoDestinatario();
}

function atualizarCheckmarks(seletor, nome) {
  document.querySelectorAll(seletor).forEach(el => {
    const check = el.querySelector(".checkmark");
    const nomeItem = el.querySelector(".name span").innerText;
    check.style.display = nomeItem === nome ? "inline" : "none";
  });
}

function atualizarTextoDestinatario() {
  const priv = visibilidade === "private_message" ? " (reservadamente)" : "";
  document.querySelector(".destinatario-info").innerText = `Enviando para ${destinatario}${priv}`;
}

function abrirMenu() {
  document.querySelector(".sobreposicao").style.display = "flex";
  atualizarParticipantes();
}

function fecharMenu() {
  document.querySelector(".sobreposicao").style.display = "none";
}

async function logout() {
  try {
    // Envia a requisição para a API informando que o usuário saiu
    await fetch("https://mock-api.driven.com.br/api/v4/uol/status", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: usuario.name })
    });

    // Mostra novamente a tela de login e esconde o conteúdo do chat
    document.querySelector(".tela-login").style.display = "flex";
    document.querySelector("header").style.display = "none";
    document.querySelector("footer").style.display = "none";
    document.querySelector(".tela-carregando").style.display = "none";
    document.querySelector(".tela-login").style.display = "flex";

    // Limpar o estado do usuário
    usuario = {};
    destinatario = "Todos";
    visibilidade = "message";

    alert("Você saiu com sucesso.");
  } catch (error) {
    console.error("Erro ao tentar fazer logout:", error);
    alert("Erro ao tentar sair. Tente novamente.");
  }
}

window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".tela-carregando").style.display = "none";
    document.querySelector(".tela-login").style.display = "flex";
  }, 1000);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botao").addEventListener("click", registrarUsuario);
  document.querySelector("textarea").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      enviarNovaMensagem();
    }
  });
});
