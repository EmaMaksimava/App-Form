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