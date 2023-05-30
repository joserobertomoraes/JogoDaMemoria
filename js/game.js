const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
// carregar todas as fotos!
const character = [
'circulo',
'pentagano',
'quadrado',
'retangulo',
'triangulo',


];



//funcao criar elemento qualquer
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


let firstCard ='';
let secundCard ='';




checkEndGame= () =>{
    
    const disableCards = document.querySelectorAll('.disableCard');
    if(disableCards.length === 10){
        setTimeout(() =>{ 
            clearInterval(this.loop);
            
            abrirModalComVideo();

       } ,500);
       
    }
}

const checkCards = ()=>{
const firstCharacter = firstCard.getAttribute('data-character');
const secundCharacter = secundCard.getAttribute('data-character');

if(firstCharacter === secundCharacter){
firstCard.firstChild.classList.add('disableCard');
secundCard.firstChild.classList.add('disableCard');

firstCard ='';
secundCard ='';

checkEndGame();
}else{
    setTimeout(() =>{ 
     firstCard.classList.remove('reveal-card');
    secundCard.classList.remove('reveal-card');

     firstCard ='';
     secundCard ='';
} ,500);
}
}
const revealCard = ({ target}) =>{
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if(secundCard === ''){
        target.parentNode.classList.add('reveal-card');
        secundCard = target.parentNode;

        checkCards();
    }

}

const createCard = (character) => {

    //criar a div
    const card =createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('../img/${character}.svg')`;
    
   
    // adicionando front e back como filha da div card
    card.appendChild(front);
    card.appendChild(back);

    //adicionando a carta dentro do grid!
    grid.appendChild(card);

    card.addEventListener('click', revealCard);
        
    card.setAttribute('data-character',character);
    return card;
}

//funcao para gerar o jogo
const loadGame = () =>{
    const duplicateCaracter = [...character,...character];
    const shuffledArray = duplicateCaracter.sort(() =>   Math.random() - 0.5);

  
    shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
    })
}

const startTimer = () =>{
    this.loop = setInterval(() =>{
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    },1000);


}


function abrirModalComVideo() {
    modal.classList.add('active');
    videoModal.play();
    setTimeout(()=>{window.location = '../index.html';},5000);
  }

window.onload = () => {
   
    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame();
}
