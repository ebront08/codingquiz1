// var quizBody = document.getElementById("quiz");

var finalScoreEl = document.getElementById("finalScore");
var quizEndedDiv = document.getElementById("quizEnded");

var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startBtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");

// Prompt Questions
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizBody = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var quizQuestions = [
  {
    question: "What does CSS stand for?",
    optionA: "Cascading Style Studio",
    optionB: "Cresting Style Sheets",
    optionC: "Caligraphy Standard Style",
    optionD: "Cascading Style Sheets",
    correctAnswer: "d",
  },
  {
    question: "What is NOT a main language of Web Development?",
    optionA: "Microsoft",
    optionB: "JavaScript",
    optionC: "CSS",
    optionD: "HTML",
    correctAnswer: "a",
  },
  {
    question: "Can you build a responsive quiz with just HTML & CSS?",
    optionA: "Yes, always",
    optionB: "No, never",
    optionC: "It depends on web builder",
    optionD: "Only when using HTML & CSS together",
    correctAnswer: "b",
  },
  {
    question: "JavaScript is a case senstive language?",
    optionA: "It depends on how it is used",
    optionB: "It is not a language",
    optionC: "True",
    optionD: "False",
    correctAnswer: "c",
  },
  {
    question: "What does HTML stand for?",
    optionA: "HyperText Marketing Language",
    optionB: "HighTime Markup Language",
    optionC: "HeroText Markdown Language",
    optionD: "None of the above",
    correctAnswer: "d",
  },
];

// Score
var quizTimer = document.getElementById("timer");
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 40;
var timerInterval;
var score = 0;
var correct;

function generateQuizQuestion() {
  quizEndedDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.optionA;
  buttonB.innerHTML = currentQuestion.optionB;
  buttonC.innerHTML = currentQuestion.optionC;
  buttonD.innerHTML = currentQuestion.optionD;
}

// Start Quiz
function startQuiz() {
  quizEndedDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();

  // Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    quizTimer.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizBody.style.display = "block";
}

function selectAnswer(userAnswer) {
  if (userAnswer === quizQuestions[questionNumber].correct) {
    instantResult.textContent = "Correct!";
    userScore++;
  } else {
    timeLeft -= -10;
    instantResult.textContent = "Wrong!";
  }
  setTimeout(function () {
    questionNumber++;
    if (quizQuestions.length > questionNumber) {
      getQuestion();
    } else {
      quizEnd();
    }
  }, 1000);
}

var resultsEl = document.getElementById("result");
function showScore() {
  quizBody.style.display = "none";
  quizEndedDiv.style.display = "flex";
  clearInterval(timerInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore() {
  if (highscoreInputName.value === "") {
    alert("Please Enter Initials (REQUIRED)");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    quizEndedDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

function generateHighscores() {
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highscoreDisplayName.appendChild(newNameSpan);
    highscoreDisplayScore.appendChild(newScoreSpan);
  }
}

function showHighscore() {
  startQuizDiv.style.display = "none";
  quizEndedDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

function clearScore() {
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

function replayQuiz() {
  highscoreContainer.style.display = "none";
  quizEndedDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 40;
  score = 0;
  currentQuestionIndex = 0;
}

function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("Correct!");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert("Incorrect");
    currentQuestionIndex++;
    generateQuizQuestion();
  } else {
    showScore();
  }
}

startQuizButton.addEventListener("click", startQuiz);
