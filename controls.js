document.addEventListener('keydown', (e) => {
  const directions = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
  };

  if (directions[e.key]) {
    movePlayer(directions[e.key]);
  }
});

function movePlayer(dir) {
  const newX = playerPos.x + dir.x;
  const newY = playerPos.y + dir.y;

  if (newX < 0 || newY < 0 || newX >= gridSize || newY >= gridSize) return;

  const targetCell = document.querySelector(`[data-x="${newX}"][data-y="${newY}"]`);
  if (targetCell.classList.contains('wall')) {
    health -= 10;
    updateStats();
    return;
  }

  playerPos = { x: newX, y: newY };
  score += 1;
  updatePlayer();
  updateStats();

  if (targetCell.classList.contains('exit')) {
    alert('You escaped the maze!');
    createMaze();
    score += 50;
    health = 100;
    updateStats();
  }
}
