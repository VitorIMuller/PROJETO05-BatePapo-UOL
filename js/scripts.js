const input = document.querySelector(".mensagem");



const name = prompt("Qual seu nome?");
const CadastroNome = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants' , {name});
CadastroNome.then(deuCerto);
CadastroNome.catch(tratarErro);

function deuCerto(){
     alert("Usuario Cadastrado, bem vindo, " + name +"!");

     recarregaMsg();
}

let mensagem = {};
function enviarMensagem(){
    console.log(input.value)
    let mensagem = 
    {
        from: name, 
        to: "Todos", 
        text: input.value, 
        type: "message"
    }
        const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages' ,mensagem);

        promessa.then(recarregaMsg);
        promessa.catch(msgErro);
}


function tratarErro(){
    alert("nome ja cadastrado");

    const name = prompt("Qual seu nome?");
    const CadastroNome = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants' , {name});
    alert("Usuario Cadastrado, bem vindo, " + name +"!");
    CadastroNome.then(recarregaMsg);
    CadastroNome.catch(tratarErro);
}


setInterval(manterOnline, 5000);
function manterOnline(){
     const promessaonline = axios.post('https://mock-api.driven.com.br/api/v4/uol/status' ,{name});
    promessaonline.then(console.log("online"));
    promessaonline.catch(msgErro);
}

setInterval(recarregaMsg, 3000);
 function recarregaMsg(){
        const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
        promessa.then(ServerMessages);
    
  }

function ServerMessages(resposta)  {
    console.log("mensagem carregada");
    const carregaMsg = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');

    const tipoMsg = resposta.data

    let caixaMsg = document.querySelector('ul');

    for(let i = 0; i<tipoMsg.length; i++ ){
        let mensagem = tipoMsg[i];

        if(mensagem.type === "status"){
            const ServerMessage = `<li class = "msgStatus"  data-identifier="message" >
            <span class = "hora"> (${mensagem.time})</span>
            <span class = "sMsg">  ${mensagem.from}  ${mensagem.text} </span>
            </li>`
        caixaMsg.innerHTML += ServerMessage;
     
        }
        if(mensagem.type === "message"){
            const ServerMessage = `<li class = "msgMessage" data-identifier="message">
            <span class = "hora"> (${mensagem.time})</span>
            <span class = "sMsg">  ${mensagem.from} <span class: "normal"> para </span> Todos: </span>
            <span class = "Msg">   ${mensagem.text} </span>
            </li>`
        caixaMsg.innerHTML += ServerMessage;

        }
        if(mensagem.type === "private_message"){
            const ServerMessage = `<li class = "msgPrivateMessage" data-identifier="message">
            <span class = "hora"> (${mensagem.time})</span>
            <span class = "sMsg">  ${mensagem.from}  "para"  ${mensagem.to} </span>
            <span class = "Msg">   ${mensagem.text} </span>
            </li>`
        caixaMsg.innerHTML += ServerMessage;

        }
        
    }

        const elementoQueQueroQueApareca = document.querySelector('ul li:last-child');
        elementoQueQueroQueApareca.scrollIntoView(true);
    
}

function msgErro(){

    alert("voce nao está mais online, faça login novamente!");

    setInterval(window.location.reload(true), 3000);
}