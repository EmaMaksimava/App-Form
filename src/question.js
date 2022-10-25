export class Question {
  static create(question) {
    return fetch('https://podcast-questions-app-8133c-default-rtdb.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      question.id = response.name;
      return question
    })
    .then(addToLocalStorage)
    .then(Question.renderList)
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error">У вас нет токена</p>')
    }
    return fetch(`https://podcast-questions-app-8133c-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
    .then(response => response.json())
    .then(response => {
      if (response && response.error) {
        return `<p class="error">${response.error}</p>`
      }

      return response ? Object.keys(response).map(key => ({
        ...response[key],
        id: key
      })) : []
    })
  }

  static renderList() {
    const questions = getQuestionsFromLocalStorage()

    const html = questions.length
    ? questions.map(toCard).join('')
    : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`

    addToMainList(html);
  }

  static createHTMLList(questions){
    return questions.length
    ? `<ol>${questions.map((elem) => `<li class="list-item">${elem.text}</li>`).join('')} </ol>`
    : 'Вопросов пока нет.'
  }
}

function addToLocalStorage(question) {
  const allQuestions = getQuestionsFromLocalStorage();
  allQuestions.push(question);
  localStorage.setItem('questions', JSON.stringify(allQuestions));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
  return `
  <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}
  </div>
  <div class="mui--text-headline">${question.text}</div>
  <br>`
}

function addToMainList(item) {
  const mainList = document.getElementById('list');
  mainList.innerHTML = item;
}