import './style.css';
import { isValid } from './utils';

const form = document.getElementById('form');
const input = form.querySelector('#label-question');
const btnSubmit = form.querySelector('#submit');


form.addEventListener('submit', submitFormHeandler);
input.addEventListener('input', () => {
  btnSubmit.disabled = !isValid(input.value);
})

function submitFormHeandler(event){
  event.preventDefault();

  if(isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }

    btnSubmit.disabled = true;
    // Async request to server to save question

    console.log('Question', question);

    clearForm();
  };
}

function clearForm() {
  input.value = '';
  input.className = '';
  btnSubmit.disabled = true;
}