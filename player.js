function updatePlayer() {
  document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('player'));
  const cell = document.querySelector(`[data-x="${playerPos.x}"][data-y="${playerPos.y}"]`);
  cell.classList.add('player');
}

function markExit() {
  const exitCell = document.querySelector(`[data-x="${gridSize - 1}"][data-y="${gridSize - 1}"]`);
  exitCell.classList.add('exit');
}

function updateStats() {
  document.getElementById('score').textContent = score;
  document.getElementById('health').textContent = health;
  if (health <= 0) {
    alert('Game Over!');
    score = 0;
    health = 100;
    playerPos = { x: 0, y: 0 };
    createMaze();
    updateStats();
  }
}
