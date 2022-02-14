let destinatario;

function abrirMenu() {
  // document.classList.remove(".ocultar");
  contatos();
  document.querySelector(".sobreposicao").style.display = "flex";


}

function clicaSobreposicao() {
  document.querySelector(".sobreposicao").style.display = "none";
}

let usuario;
document.getElementById("botao").onclick = function login() {
  nome = document.getElementById("nome").value;
  usuario = {
    name: nome,
  };
 
  const entrar = axios
    .get(
      "https://mock-api.driven.com.br/api/v4/uol/participants",
      usuario
    )
    .then(function (response) {
      document.querySelector(".tela-login").style.display = "none";
      setTimeout(function () {
        document.querySelector(".tela-carregando").style.display = "none";
        document.querySelector("header").style.display="flex";
        document.querySelector("footer").style.display="flex";
        listarMensagem();
      }, 2000);
      
      
      console.log(response);
    })
    .catch(function (error) {
      alert(error);
      alert("Este nome já esta sendo utilizado");
      document.getElementById("nome").value="";
      login();
      
    });
};



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

    if (mensagem[i].type == "private_message") {

      montarTexto += `
            <span>(${mensagem[i].time})</span><strong>${mensagem[i].from}</strong> reservadamente para < strong > ${mensagem[i].to}</strong >: ${mensagem[i].text}`
    }
    montarTexto += `</p ></li > `;

    document.querySelector("ul").innerHTML += montarTexto;

    const elementoQueQueroQueApareca = document.querySelector('ul').lastElementChild;
    elementoQueQueroQueApareca.scrollIntoView();

    // setInterval(estouOnline(), 5000);
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
  setInterval(listarMensagem(),3000);

}

function mensagemErro(erro) {
  window.location.reload();
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
      <div class="person" onclick="selecionarContato(this)">
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

function selecionarContato(contato){
  destinatario = document.querySelector(".name span").innerHTML;;
  // console.log("Isso é:"+destinatario);
  clicaSobreposicao();
}
