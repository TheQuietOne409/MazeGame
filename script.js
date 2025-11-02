// script.js
const maze = document.getElementById('maze');
const gridSize = 10;
let playerPos = { x: 0, y: 0 };
let score = 0;
let health = 100;

function createMaze() {
  maze.innerHTML = '';
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      // Randomly add walls
      if (Math.random() < 0.2 && !(x === 0 && y === 0) && !(x === gridSize - 1 && y === gridSize - 1)) {
        cell.classList.add('wall');
      }

      maze.appendChild(cell);
    }
  }

  updatePlayer();
  markExit();
}
