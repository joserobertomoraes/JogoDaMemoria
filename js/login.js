const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');
// Função para validar input - Nome deverá ter 3 ou mais caracteres
const validateInput = ({ target })=>{
  if (target.value.length > 2) {
    button.removeAttribute('disabled');
    return;
  }
  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  event.preventDefault();
  // Salvar no browser
  localStorage.setItem('player', input.value);
  // Encaminhar para outra pagina
  window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);