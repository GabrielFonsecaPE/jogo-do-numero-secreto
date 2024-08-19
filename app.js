//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 à 10';
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
mensagemInicial();

//função com parametro. exibe algo específico mas não nos devolve nenhuma informação.
function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak( texto , 'Brazilian Portuguese Female' , {rate:1.2});
}

function mensagemInicial(){
exibirTextoNaTela ('h1', 'Jogo do número secreto');
exibirTextoNaTela ('p', 'Digite um número de 1 a 10');
}

//função sem parametros e sem retorno. executa um comando.
function verificarChute(){
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemAcerto = `Você encontrou o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p', mensagemAcerto);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
        exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior');
    }
    
    limparCampo();
    }
    tentativas++;
}

// essa função não tem parametros, mas nos retorna uma informação e guarda na sua respectiva variavel.
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() *numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido
    }
    
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}