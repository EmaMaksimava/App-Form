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
  }
}

