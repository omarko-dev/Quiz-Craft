document.getElementById('start-game-button').addEventListener('click', function() {
  startGame('crafting');
});

document.getElementById('start-guess-item-button').addEventListener('click', function() {
  startGame('guessItem');
});

document.getElementById('back-to-menu-button').addEventListener('click', function() {
  document.getElementById('game-interface').style.display = 'none';
  document.getElementById('main-menu').style.display = 'flex';
  const backgroundMusic = document.getElementById('background-music');
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
});

function startGame(mode) {
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('game-interface').style.display = 'flex';
  const backgroundMusic = document.getElementById('background-music');
  backgroundMusic.volume = 0.4;
  backgroundMusic.play();
  game.setMode(mode);
}

const phrases = [
  "Crafting Fun!",
  "Quiz Time!",
  "Are you ready?",
  "Let's craft!",
  "Test your skills!"
];

function displayRandomPhrase() {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  const randomPhrase = phrases[randomIndex];
  document.getElementById('random-phrase').textContent = randomPhrase;
}

displayRandomPhrase();

let score = 0;

function updateScore(points) {
  score += points;
  document.getElementById('score').textContent = score;
}

function resetScore() {
  score = 0;
  document.getElementById('score').textContent = score;
}

function checkAnswer(isCorrect) {
  if (isCorrect) {
    updateScore(1);
  }
}

document.getElementById('submit-button').addEventListener('click', function() {
  const isCorrect = game.checkAnswer();
  checkAnswer(isCorrect);
});

document.getElementById('skip-button').addEventListener('click', function() {
  resetScore();
  game.showCorrectAnswer();
});

const volumeToggle = document.getElementById('volume-toggle');
const volumeIcon = document.getElementById('volume-icon');
const backgroundMusic = document.getElementById('background-music');

volumeToggle.addEventListener('click', function() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    volumeIcon.src = './assets/volume.png';
  } else {
    backgroundMusic.pause();
    volumeIcon.src = './assets/no-volume.png';
  }
});
