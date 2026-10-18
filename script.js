
const botaoSim = document.getElementById("sim");
const botaoNao = document.getElementById("nao");
const botaoVoltar = document.getElementById("voltar");

const telaPergunta = document.getElementById("tela-pergunta");
const telaErro = document.getElementById("tela-erro");
const telaSim = document.getElementById("tela-sim");

const mensagemErro = document.getElementById("mensagem-erro");
const areaCoracoes = document.getElementById("coracoes");

const mensagens = [
    "Erro 404: A opção 'Não' não foi encontrada! 💜",
    "Erro 403: Você não tem permissão para recusar esse amor! 💕",
    "Erro 500: O sistema não consegue processar um 'Não'! 💍"
];

let contador = 0;
let animacaoFinalizada = false;

// Cria os corações que flutuam pelo fundo
function criarCoracao() {

    if (animacaoFinalizada) {
        return;
    }

    const coracao = document.createElement("span");

    coracao.textContent = "💜";
    coracao.classList.add("coracao");

    coracao.style.left = Math.random() * 100 + "%";
    coracao.style.fontSize = (15 + Math.random() * 25) + "px";
    coracao.style.animationDuration = (5 + Math.random() * 5) + "s";

    areaCoracoes.appendChild(coracao);

    coracao.addEventListener("animationend", function() {
        coracao.remove();
    });
}

// Cria corações continuamente
const intervaloCoracoes = setInterval(criarCoracao, 500);

// Botão Não
botaoNao.addEventListener("click", function() {

    let i = 0;

    while (i < mensagens.length) {

        if (i === contador) {
            mensagemErro.textContent = mensagens[i];
            break;
        }

        i++;
    }

    contador++;

    if (contador === mensagens.length) {
        contador = 0;
    }

    telaPergunta.classList.add("oculto");
    telaErro.classList.remove("oculto");
});

// Botão Voltar
botaoVoltar.addEventListener("click", function() {
    telaErro.classList.add("oculto");
    telaPergunta.classList.remove("oculto");
});

// Botão Sim
botaoSim.addEventListener("click", function() {

    // Impede novos cliques durante a animação
    botaoSim.disabled = true;

    // Para a criação de corações flutuantes
    clearInterval(intervaloCoracoes);
    animacaoFinalizada = true;

    // Remove os corações antigos
    areaCoracoes.innerHTML = "";

    // Esconde a pergunta
    telaPergunta.classList.add("oculto");

    // Inicia a explosão
    explosaoCoracoes();

    // Aguarda a animação terminar
    setTimeout(function() {

        // Remove os corações da explosão
        areaCoracoes.innerHTML = "";

        // Exibe somente a mensagem romântica
        telaSim.classList.remove("oculto");

    }, 2200);
});

// Explosão de corações
function explosaoCoracoes() {

    let quantidade = 0;

    while (quantidade < 100) {

        const coracao = document.createElement("span");

        coracao.textContent = "💜";
        coracao.classList.add("coracao-explosao");

        const angulo = Math.random() * Math.PI * 2;
        const distancia = 150 + Math.random() * 700;

        const movimentoX = Math.cos(angulo) * distancia;
        const movimentoY = Math.sin(angulo) * distancia;

        coracao.style.setProperty("--x", movimentoX + "px");
        coracao.style.setProperty("--y", movimentoY + "px");

        coracao.style.fontSize = (18 + Math.random() * 35) + "px";
        coracao.style.animationDelay = Math.random() * 0.3 + "s";

        areaCoracoes.appendChild(coracao);

        quantidade++;
    }
}
