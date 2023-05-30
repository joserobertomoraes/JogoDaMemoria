const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

// Carregar todas as fotos!
const character = [
    'circulo',
    'pentagano',
    'quadrado',
    'retangulo',
    'triangulo',
];

// Funcao criar elemento qualquer
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

// Função de verificação se o jogo terminou - Jogo termina quando todas as cartas
// foram desabilitas, ou seja, acertadas
checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disableCard');
    if (disableCards.length === 10) {
        setTimeout(() => { 
            clearInterval(this.loop);
            abrirModalComVideo();
        }, 500);
    }
}

// Função de verificação se as duas cartas viradas são iguais ou não
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secundCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secundCharacter) {
        firstCard.firstChild.classList.add('disableCard');
        secondCard.firstChild.classList.add('disableCard');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    } else {
        setTimeout(() => { 
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

}

const createCard = (character) => {
    // Criar o Card
    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('../img/${character}.svg')`;

    // Adicionando Frente e Verso como filhos da div Card
    card.appendChild(front);
    card.appendChild(back);

    // Adicionando a carta dentro do grid
    grid.appendChild(card);
    // Adicionando função de revelar carta ao clicar no Card na Div
    card.addEventListener('click', revealCard);
    // Adicionando dados da carta no atributo da Div 
    card.setAttribute('data-character', character);

    return card;
}

// Funcao para gerar o jogo
const loadGame = () => {
    // Duplicando cartas
    const duplicateCharacter = [...character, ...character];
    // Sorteando a ordem das cartas
    const shuffledArray = duplicateCharacter.sort(() => Math.random() - 0.5);
    // Iterando encima das cartas sorteadas, criando cada carta e adicionando
    // ao grid do jogo
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

const abrirModalComVideo = () => {
    modal.classList.add('active');
    videoModal.play();
    // Depois de 5 segundos, reseta o jogo e redireciona para a view de Login
    setTimeout(() => {
        window.location = '../index.html';
    }, 5000);
}

window.onload = () => {
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame();
}
