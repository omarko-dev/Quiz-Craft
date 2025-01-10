document.getElementById('start-game-button').addEventListener('click', function() {
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('game-interface').style.display = 'block';
  const backgroundMusic = document.getElementById('background-music');
  backgroundMusic.volume = 0.4;
  backgroundMusic.play();
});

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


function checkAnswer(isCorrect) {
  if (isCorrect) {
    updateScore(10);
  }
}


document.getElementById('submit-button').addEventListener('click', function() {
  const isCorrect = true;
  checkAnswer(isCorrect);
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
