const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeSize = 20;
let snake = [{ x: 0, y: canvas.height - snakeSize }];
let direction = { x: 0, y: 0 };
let gameSpeed = 2;
let interval;
let isPaused = false;

const lines = [
    { x: 0, y: 440, width: 360 }, { x: 0, y: 390, width: 100 },
    { x: 140, y: 390, width: canvas.width }, { x: 40, y: 340, width: canvas.width },
    { x: 0, y: 290, width: 250 }, { x: 290, y: 290, width: 120 },
    { x: 0, y: 240, width: 350 }, { x: 0, y: 190, width: 100 },
    { x: 140, y: 190, width: 280 }, { x: 0, y: 140, width: 340 },
    { x: 0, y: 90, width: 200 }, { x: 250, y: 90, width: 150 },
    { x: 0, y: 40, width: 30 }, { x: 70, y: 40, width: 360 }
];

function startGame() {
    drawStartFinishLines();
    drawLines();
    drawSnake();
    interval = setInterval(updateGame, 1000 / gameSpeed);
    window.addEventListener("keydown", changeDirection);
    canvas.addEventListener("click", togglePause);
}

function drawStartFinishLines() {
    ctx.fillStyle = "red";
    ctx.font = "10px Arial";
    ctx.fillText("START", 25, canvas.height - 15);
    ctx.fillStyle = "green";
    ctx.fillText("FINISH", canvas.width - 50, 25);
}

function drawLines() {
    ctx.fillStyle = "red";
    lines.forEach(line => {
        ctx.fillRect(line.x, line.y, line.width, 5);
    });
}

function drawSnake() {
    ctx.fillStyle = "blue";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

function updateGame() {
    if (isPaused) return;
    moveSnake();
    if (checkCollision()) {
        gameOver();
        return;
    }
    checkWin();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStartFinishLines();
    drawLines();
    drawSnake();
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * snakeSize, y: snake[0].y + direction.y * snakeSize };
    snake.unshift(head);
    snake.pop();
}

function changeDirection(e) {
    switch (e.key) {
        case "ArrowUp": direction = { x: 0, y: -1 }; break;
        case "ArrowRight": direction = { x: 1, y: 0 }; break;
        case "ArrowDown": direction = { x: 0, y: 1 }; break;
        case "ArrowLeft": direction = { x: -1, y: 0 }; break;
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return lines.some(line => {
        return head.x >= line.x && head.x < line.x + line.width && head.y >= line.y && head.y < line.y + 5;
    });
}

function checkWin() {
    const head = snake[0];
    if (head.x >= canvas.width - 50 && head.y <= 30) {
        clearInterval(interval);
        alert("Good Game! You Win!");
    }
}

function gameOver() {
    clearInterval(interval);
    alert("Game Over!");
}

function togglePause() {
    isPaused = !isPaused;
}

window.onload = startGame;
