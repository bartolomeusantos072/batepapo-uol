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







function abrirMenu() {
  document.querySelector(".sobreposicao").style.display = "flex";
}

function clicaSobreposicao() {
  document.querySelector(".sobreposicao").style.display = "none";
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

    // setInterval(
    // axios({
    //   method: 'post',
    //   url: 'https://mock-api.driven.com.br/api/v4/uol/status',
    //   data: {
    //     name: usuario.name,
    //   }
    // }),5000);
    
    // setTimeout(function () {
    //   window.location.reload(1);
    // }, 3000);

  }

}
function tratarErro(erro) {
  console.error(erro);
}


//avisar que estou online

