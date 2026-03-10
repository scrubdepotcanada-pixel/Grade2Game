let score = 0;
let lives = 3;
let currentAnswer = null;
let gameStarted = false;

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const startBtn = document.getElementById("startBtn");

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function generateQuestion() {
  const a = randomNumber(20);
  const b = randomNumber(20);
  currentAnswer = a + b;
  questionEl.textContent = `${a} + ${b} = ?`;
}

function updateUI() {
  scoreEl.textContent = score;
  livesEl.textContent = lives;
}

function startGame() {
  score = 0;
  lives = 3;
  gameStarted = true;
  feedbackEl.textContent = "";
  updateUI();
  generateQuestion();
  answerInput.value = "";
  answerInput.focus();
}

function submitAnswer() {
  if (!gameStarted) return;

  const userAnswer = Number(answerInput.value);

  if (userAnswer === currentAnswer) {
    score++;
    feedbackEl.textContent = "Correct!";
  } else {
    lives--;
    feedbackEl.textContent = `Oops! The correct answer was ${currentAnswer}.`;
  }

  updateUI();

  if (lives <= 0) {
    questionEl.textContent = "Game Over!";
    feedbackEl.textContent += ` Final score: ${score}`;
    gameStarted = false;
    return;
  }

  generateQuestion();
  answerInput.value = "";
  answerInput.focus();
}

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", submitAnswer);
answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitAnswer();
});
