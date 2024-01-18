//let titulo = document.querySelector('h1');    // comando para selecionar alguma parte do html, document.querySelector('colocar o nome da Tag aqui')
//titulo.innerHTML = 'Jogo do número secreto';  // innerHTML tradução literaria seria "HTML interno" ou sejá dentro do HTML no caso h1

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDenumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //responsiveVoice não é nativo do JS, ele está na linhja 7 do HTML
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute() { // funcionation = fazer alguma ação na aplicação
    let chute = document.querySelector('input').value; //value pegar o valor que foi colocado nesse campo
    
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}! `;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //getElementById pega o elemendo id no HTML
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1); //return serve para retorna a informação nesse caso retorna um número aleatorio
    let quantidadeDeElementosNaLista = listaDenumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDenumerosSorteados = [];
    }
    if (listaDenumerosSorteados.includes(NumeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDenumerosSorteados.push(NumeroEscolhido);
        return NumeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}