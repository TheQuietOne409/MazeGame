const maze = document.getElementById('maze');
const scoreDisplay = document.getElementById('score');
const healthDisplay = document.getElementById('health');
const timerDisplay = document.getElementById('timer');
const highScoresList = document.getElementById('high-scores');

let player = { x: 0, y: 0 };
let score = 0;
let health = 100;
let timeLeft = 60;
let timer;

function createMaze() {
  maze.innerHTML = '';
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (Math.random() < 0.2 && !(x === 0 && y === 0) && !(x === 9 && y === 9)) {
        cell.classList.add('wall');
      }

      maze.appendChild(cell);
    }
  }

  markExit();
  placePlayer();
  startTimer();
}

function placePlayer() {
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('player'));
  const cell = document.querySelector(`[data-x="${player.x}"][data-y="${player.y}"]`);
  cell.classList.add('player');
}

function markExit() {
  const exit = document.querySelector(`[data-x="9"][data-y="9"]`);
  exit.classList.add('exit');
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      health = 0;
      updateStats();
    }
  }, 1000);
}

function updateStats() {
  scoreDisplay.textContent = score;
  healthDisplay.textContent = health;

  if (health <= 0) {
    alert('Game Over!');
    saveHighScore(score);
    resetGame();
  }
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;

  if (newX < 0 || newY < 0 || newX > 9 || newY > 9) return;

  const target = document.querySelector(`[data-x="${newX}"][data-y="${newY}"]`);
  if (target.classList.contains('wall')) {
    health -= 10;
    updateStats();
    return;
  }

  player.x = newX;
  player.y = newY;
  score += 1;
  placePlayer();
  updateStats();

  if (target.classList.contains('exit')) {
    clearInterval(timer);
    const bonus = timeLeft * 2;
    score += 50 + bonus;
    alert(`You escaped! Bonus: ${bonus} points`);
    saveHighScore(score);
    resetGame();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') movePlayer(0, -1);
  if (e.key === 'ArrowDown') movePlayer(0, 1);
  if (e.key === 'ArrowLeft') movePlayer(-1, 0);
  if (e.key === 'ArrowRight') movePlayer(1, 0);
});

function saveHighScore(score) {
  const scores = JSON.parse(localStorage.getItem('mazeScores')) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  localStorage.setItem('mazeScores', JSON.stringify(scores.slice(0, 5))); //JSON.stringify = object->string
  showHighScores();
}

function showHighScores() {
  const scores = JSON.parse(localStorage.getItem('mazeScores')) || []; //JSON.parse = string-> object
  highScoresList.innerHTML = '';
  scores.forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = `#${i + 1}: ${s} pts`;
    highScoresList.appendChild(li);
  });
}

function resetGame() {
  player = { x: 0, y: 0 };
  score = 0;
  health = 100;
  createMaze();
  updateStats();
}

showHighScores();
createMaze();
updateStats();
