import { authWithEmailAndPassword, getAuthForm } from './auth';
import { Question } from './question';
import './style.css';
import { createModal, isValid } from './utils';

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('#label-question');
const btnSubmit = form.querySelector('#submit');

//Events

modalBtn.addEventListener('click', openModal);
window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHeandler);
input.addEventListener('input', () => {
  btnSubmit.disabled = !isValid(input.value);
})

//Functions

function submitFormHeandler(event){
  event.preventDefault();

  if(isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }

    btnSubmit.disabled = true;
    // Async request to server to save question
    Question.create(question).then(clearForm());


  };
}

function clearForm() {
  input.value = '';
  input.className = '';
  btnSubmit.disabled = true;
}

function openModal() {
  createModal("Autorization", getAuthForm());
  document.getElementById('auth-form').addEventListener('submit', authFormHandler, {once:true})
}

function authFormHandler(event) {
  event.preventDefault();

  const authBtn = event.target.querySelector('button');
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  authBtn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => authBtn.disabled = false)
}

function renderModalAfterAuth(content){
  if (typeof content === 'string'){
    createModal('Error', 'Wrong email or password!')
  } else {
    createModal('List of your questions:', Question.createHTMLList(content));
  }
}