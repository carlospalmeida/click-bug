/*
-------------------------------------------------
 Funçôes
-------------------------------------------------
*/

/*Função para posicionar o elemento na tela,
Recebe o parametro el que informa qual elemento,
qual o elemento se desloca*/
const posicElemento = (el) => {
    //sorteia um numero p/ os posicionamentos
    let posX = Math.floor(Math.random() * 960 + 40)
    let posY = Math.floor(Math.random() * alturaQuadro / 2 + 40)

    //Posiciona o elemento na tela
    el.style.position = 'absolute'
    el.style.left = -posX + 'px'
    el.style.top = posY + 'px'
}

/*Funçâo para deslocar os elementos na tela
Paramentros de elemento, velocidade e incremendo */
const moveElemento = (el, veloc, inc) => {
    //setInterval - repete funçâo constantemente
    const anima = setInterval(() => {
        veloc = veloc + inc
        el.style.left = veloc + 'px'

        //verfica se sai da tela e faz o retorno
        //Tbm verifica se possui a classe "morto" e ent executa o comando acima ^
        if (veloc > larguraQuadro || el.classList.contains("morto")) {
            //Redefine a velocidade e incremento
            veloc = -Math.random() * 400 + 80
            inc = Math.random() * 20 + 5
            posicElemento(el)
            //remove a classe "morto" do elemento
            el.classList.remove('morto')
        }
        //Adiciona atributo "velocidade"
        //aos elementos com o valor de incremento
        el.setAttribute('velocidade', inc)

    }, 40)

    //parar interval
    //clearInterval(anima)

}



// Função para clicar no elemento - matar o elemento
const clickBug = (el) => {

    let splash = document.getElementById('splash')

    //captura posição do inseto ao ser clicado
    let left = el.style.left
    let top = el.style.top

    //posiciona o splash no mesmo lugar
    splash.style.left = left
    splash.style.top = top
    //recarrega o GIF animado
    splash.src = `${splash.src}?v${Math.random()}`
    
    let ponto = 10
    // se a velocidade for maior que 20
    // ponto vale 100 e mostra a imagem "+100"
    if(el.getAttribute('velocidade') > 20){
        ponto = 100
    }

    //soma na pontuaçâo geral e remove da tela
    //adiciona a classe "morto"
    score += ponto
    el.classList.add('morto')
    document.getElementById('score').innerText = score
}





/*
-------------------------------------------------
 Variaveis, eventos e execuçôes automaticas
-------------------------------------------------
*/

//Variavel com a lista de invasores (baseado na classe "invasor")
let invasores = document.querySelectorAll('.invasor')

//Variavel com a lista de bonzinhos (baseado na classe "bonzinho")
let bonzinhos = document.querySelectorAll('.bonzinho')

//Variavel do score
let score = 0

//Tempo para a rodada, modifique a duração do jogo neste local
let tempoRestante = 30

//Largura do quadro, verifica se o elemento sai do quadro
let larguraQuadro = document.getElementById('quadro').offsetWidth

//Altura do quadro
let alturaQuadro = document.getElementById('quadro').offsetHeight

//Comportamento Invasores
for (const inv of invasores) {
    let velocInicio = Math.floor(Math.random() * 50 + 5)
    let incInicio = Math.floor(Math.random() * 10 + 5)
    posicElemento(inv)
    moveElemento(inv, velocInicio, incInicio)
    inv.addEventListener('click', () => { clickBug(inv) })
}


//Comportamento Bonzinhos
for (const bom of bonzinhos) {
    let velocInicio = Math.floor(Math.random() * 50 + 5)
    let incInicio = Math.floor(Math.random() * 10 + 5)
    posicElemento(bom)
    moveElemento(bom, velocInicio, incInicio)
    bom.addEventListener('click', () => { clickBug(bom) })
}

