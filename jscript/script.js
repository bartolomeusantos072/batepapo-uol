function abrirMenu() {
  // document.classList.remove(".ocultar");
  contatos();
  document.querySelector(".sobreposicao").style.display = "flex";


}

function clicaSobreposicao() {
  document.querySelector(".sobreposicao").style.display = "none";
}

let usuario;
login();

function login() {
  usuario = {
    name: prompt("Qual o seu nome?")
  };
  const entrar = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario)
    .then(loginOK)
    .catch(loginError);

}

function loginOK(response) {
  alert("Entrada com sucesso");
  listarMensagem();

}

function loginError(erro) {
  alert("Este nome já esta sendo utilizado");
  login();
}



function listarMensagem() {
  const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
  promessa.then(processarResposta);
  promessa.catch(tratarErro);
}


function processarResposta(response) {
  const mensagem = response.data;
  renderizarMensagens(mensagem);

}

function renderizarMensagens(mensagem) {

  for (let i = 0; i < mensagem.length; i++) {

    let montarTexto = `<li class=${mensagem[i].type}> <p>`
    if (mensagem[i].type == "status") {
      montarTexto += `
            <span>(${mensagem[i].time})</span><strong>${mensagem[i].from}</strong> ${mensagem[i].text}`

    }

    if (mensagem[i].type == "message") {
      montarTexto += `
            <span>(${mensagem[i].time})</span><strong>${mensagem[i].from}</strong> para <strong>${mensagem[i].to}</strong>: ${mensagem[i].text}`
    }

    if (mensagem[i].type == "private-mensagem") {

      montarTexto += `
            <span>(${mensagem[i].time})</span><strong>${mensagem[i].from}</strong> reservadamente para < strong > ${mensagem[i].to}</strong >: ${mensagem[i].text}`
    }
    montarTexto += `</p ></li > `;

    document.querySelector("ul").innerHTML += montarTexto;

    const elementoQueQueroQueApareca = document.querySelector('ul').lastElementChild;
    elementoQueQueroQueApareca.scrollIntoView();

    setInterval(estouOnline(), 5000);
    // setTimeout(function () {
    //   window.location.reload(1);
    // }, 3000);

  }

}
function tratarErro(erro) {
  console.error(erro);
}


//avisar que estou online

function estouOnline() {
  const online = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", usuario);
}


//enviar mensagem


function enviarMensagem() {
  let texto = document.querySelector("textarea").value;
  if (texto) {
    const mensagem = {
      from: usuario.name,
      to: 'Todos',
      text: texto,
      type: "message",
    };
    // console.log(mensagem);
    const chat = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagem)
    chat.then(mensagemOK);
    chat.catch(mensagemErro);

  } else {
    alert("Você não escreveu nenhuma mensagem");
  }
  document.querySelector("textarea").value = "";
}

function mensagemOK() {
  listarMensagem();
}

function mensagemErro(erro) {
  alert("Não foi possivel enviar a mensagem");
  console.erro(erro);
}



function contatos() {
  const participante = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
  // participante.then(listarParticipantes); 
  participante.then(listarContatos);
}

function listarContatos(response) {
  const pessoas = response.data;
  renderizarContatos(pessoas);
}

function renderizarContatos(pessoas) {
  for (let i = 0; i < pessoas.length; i++) {

    let montarContatos = `
      <div class="person">
        <span><ion-icon name="person-circle"></ion-icon></span>
        <div class="name">
           <span>${pessoas[i].name}</span>
           <span></span>
        </div>
      </div>
      `;

    document.querySelector(".contatos").innerHTML += montarContatos;

    const elementoQueQueroQueApareca = document.querySelector('.contatos').lastElementChild;
    elementoQueQueroQueApareca.scrollIntoView();

    setInterval(estouOnline(), 5000);

  }
}