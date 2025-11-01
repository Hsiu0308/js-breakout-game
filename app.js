const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
const startButton = document.getElementById("startButton");

let circleX = 160;
let circleY = 60;
let radius = 20;
let xSeed = 15;
let ySeed = 15;
let groundX = 100;
let groundY = 500;
let groundHeight = 5;
let groundWidth = 200;
let isDragging = false;

let brickArray = [];
let count = 0;
let game;

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    brickArray.push(this);
    this.visible = true;
  }

  drawBrick() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchCircle(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}

function resetGame() {
  if (game) {
    clearInterval(game);
  }

  circleX = 160;
  circleY = 60;
  xSeed = 15;
  ySeed = 15;
  groundX = 100;
  groundY = 500;
  isDragging = false;
  count = 0;

  brickArray = [];
  for (let i = 0; i < 10; i++) {
    new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
  }
}

for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

c.addEventListener("mousemove", (e) => {
  const rect = c.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  groundX = Math.max(
    0,
    Math.min(canvasWidth - groundWidth, Math.round(mx - groundWidth / 2))
  );

  if (isDragging) {
    groundY = Math.max(
      0,
      Math.min(canvasHeight - groundHeight, Math.round(my))
    );
  }
});

c.addEventListener("mousedown", (e) => {
  isDragging = true;
});

window.addEventListener("mouseup", (e) => {
  isDragging = false;
});

function drawElements() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  brickArray.forEach((brick) => {
    if (brick.visible) {
      brick.drawBrick();
    }
  });

  ctx.fillStyle = "orange";
  ctx.fillRect(groundX, groundY, 200, groundHeight);

  ctx.beginPath();
  ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

function gameLoop() {
  brickArray.forEach((brick, index) => {
    if (brick.visible && brick.touchCircle(circleX, circleY)) {
      count++;
      console.log(count);
      brick.visible = false;

      if (circleY >= brick.y + brick.height || circleY <= brick.y) {
        ySeed = -ySeed;
      }
      if (circleX <= brick.x || circleX >= brick.x + brick.width) {
        xSeed = -xSeed;
      }

      if (count == 10) {
        alert("You win!");
        clearInterval(game);
        startButton.style.display = "block";
      }
    }
  });

  if (
    circleX >= groundX - radius &&
    circleX <= groundX + 200 + radius &&
    circleY >= groundY - radius &&
    circleY <= groundY + radius
  ) {
    if (ySeed > 0) {
      circleY -= 40;
    } else {
      circleY += 40;
    }
    ySeed = -ySeed;
  }

  if (circleX >= canvasWidth - radius) {
    circleX = canvasWidth - radius;
    xSeed = -xSeed;
  } else if (circleX <= radius) {
    circleX = radius;
    xSeed = -xSeed;
  }

  if (circleY >= canvasHeight - radius) {
    circleY = canvasHeight - radius;
    ySeed = -ySeed;
  } else if (circleY <= radius) {
    circleY = radius;
    ySeed = -ySeed;
  }

  circleX += xSeed;
  circleY += ySeed;

  drawElements();
}

drawElements();

startButton.addEventListener("click", () => {
  resetGame();
  drawElements();
  game = setInterval(gameLoop, 25);
  startButton.style.display = "none";
});
