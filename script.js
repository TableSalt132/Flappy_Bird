const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let bird = {
  x: 80,
  y: 150,
  width: 30,
  height: 30,
  gravity: 0.6,
  lift: -10,
  velocity: 0
};

let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver = true;
  }
}

function flap() {
  console.log("Flap!"):
  bird.velocity = bird.lift;
}

function createPipe() {
  let gap = 120;
  let top = Math.random() * (canvas.height / 2);
  pipes.push({
    x: canvas.width,
    top,
    bottom: top + gap,
    width: 40
  });
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
  });
}

function updatePipes() {
  pipes.forEach(pipe => {
    pipe.x -= 2;

    // Check collision
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
    ) {
      gameOver = true;
    }

    if (pipe.x + pipe.width < 0) {
      pipes.shift();
      score++;
    }
  });
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function loop() {
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", 100, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  updateBird();

  if (frame % 100 === 0) createPipe();

  drawPipes();
  updatePipes();

  drawScore();

  frame++;
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", flap);
document.addEventListener("touchstart", flap);  // For mobile
document.addEventListener("mousedown", flap);   // For desktop click
loop();
    
