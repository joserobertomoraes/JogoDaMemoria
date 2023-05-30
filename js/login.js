const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');
//função para validar input
const validateInput = ({target})=>{
  if(target.value.length > 2){
    button.removeAttribute('disabled');
    return;
  }
    button.setAttribute('disabled', '');
  
}

const handleSubmit =(event) =>{
event.preventDefault();
//salvar no browser
  localStorage.setItem('player', input.value);
  // encaminhar para outra pagina
window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);