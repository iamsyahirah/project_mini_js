const questions = [
  {
    question: "How can you detect the client's browser name?",
    answers: [
      { text: "browser.name", correct: false },
      { text: "client.navName", correct: false },
      { text: "navigator.appName", correct: true },
    ],
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answers: [
      { text: "myFunction()", correct: true },
      { text: "call function myFunction()", correct: false },
      { text: "call myFunction()", correct: false },
    ],
  },
  {
    question: "JavaScript is the same as Java.",
    answers: [
      { text: "False", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      { text: "alert('Hello World');", correct: true },
      { text: "msg('Hello World');", correct: false },
      { text: "msgBox('Hello World');", correct: false },
      { text: "alertBox('Hello World');", correct: false },
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function = myFunction()", correct: false },
      { text: "function:myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
    ],
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answers: [
      { text: "Math.round(7.25)", correct: true },
      { text: "md(7.25)", correct: false },
      { text: "Math.md(7.25)", correct: false },
      { text: "round(7.25)", correct: false },
    ],
  },
  {
    question: "How do you declare a JavaScript variable?",
    answers: [
      { text: "var carName", correct: true },
      { text: "variable carName", correct: false },
      { text: "v carName", correct: false },
    ],
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      { text: "onclick", correct: true },
      { text: "onmouseclick", correct: false },
      { text: "onmouseover", correct: false },
      { text: "onchangrr", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

startQuiz();
