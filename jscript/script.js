
function abrirMenu(){
    document.querySelector(".sobreposicao").style.display = "flex";
}

function clicaSobreposicao(){
    document.querySelector(".sobreposicao").style.display = "none";
}

/*entrar na sala */
const entrarNaSala = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',
 { name: prompt("Qual o seu nome?") });
 entrarNaSala.then(sucessoAoEntraNaSala);
 entrarNaSala.catch(erroAoEntrarNaSala);


 function sucessoAoEntraNaSala(response){
    alert("nome adicionado com sucesso");
    console.log(response);
  } 
  function erroAoEntrarNaSala(erro) {
    alert(error);
  }


// const permanecerNaSala = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', { name: 'João brabao' })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.error(error);
// });





const promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages",{name: 'João' });

promessa.then(processarResposta);
promessa.catch(tratarErro);


 function processarResposta(response){
     const mensagem = response.data;
     renderizarMensagem(mensagem);
    }
    
 function renderizarMensagem(mensagem){
    let elementoHora =document.querySelector(".horario");
    let elementoNome =document.querySelector(".nome-user");
    let elementoParaQuem = document.querySelector(".paraquem");
    let elementoMensagem = document.querySelector(".mensagem");
    


    for(let i=0; i < 100;i++){
        document.querySelector("ul").innerHTML += 
        `<li> 
            <span class="horario">(${elementoHora.innerHTML = mensagem[i].time})&nbsp</span>
            
            <span class="nome-user">${elementoNome.innerHTML = mensagem[i].from} </span>
            <span>&nbsp para &nbsp</span> 
            <span class="paraquem">${elementoParaQuem.innerHTML = mensagem[i].to}</span>
            <span>:&nbsp</span>
          <span class="mensagem">${elementoMensagem.innerHTML = mensagem[i].text}</span>
        </li>`;
          
    }  
    console.log(document.querySelector("ul"));
    
 }

 function tratarErro(error){
     console.log(error);
 }


